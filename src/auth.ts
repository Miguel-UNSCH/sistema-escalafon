// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { User } from "next-auth";
import { AdapterUser } from "@auth/core/adapters";
import authConfig from "./config/auth.config";

// Define los tipos para las callbacks
interface SessionParams {
  session: Session;
  token: JWT;
  user?: User | AdapterUser;
  role?: string;
}

interface JWTParams {
  token: JWT;
  user?: User | AdapterUser;
  role?: string;
}

interface SignInParams {
  user: User | AdapterUser;
  email?: any;
  credentials?: any;
}

// Iniciamos Prisma fuera del middleware/edge runtime
const prisma = new PrismaClient();

// Sobrescribimos la función authorize con nuestra implementación
const { providers, ...restConfig } = authConfig;
const credentialsProvider = providers.find((provider) => provider.id === "credentials");

// Si encontramos el provider de credentials, sobrescribimos su authorize
if (credentialsProvider && "authorize" in credentialsProvider) {
  credentialsProvider.authorize = async (credentials) => {
    const { email, password } = credentials as {
      email: string;
      password: string;
    };

    if (!email || !password) return null;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) return null;

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error en authorize:", error);
      return null;
    }
  };
}

// Configuramos las callbacks que necesitan acceso a prisma
const callbacks = {
  ...restConfig.callbacks,
  async session({ session, token }: SessionParams) {
    if (token.sub) {
      session.user.id = token.sub;
      session.user.role = token.role; // Pasa el role a la sesión

      try {
        // Buscar sesiones del usuario
        const sessions = await prisma.session.findMany({
          where: { userId: token.sub },
        });
        session.user.sessions = sessions;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error al buscar sesiones:", error);
      }
    }
    return session;
  },
  async jwt({ token, user }: JWTParams) {
    if (user) {
      token.sub = user.id;
      token.role = (user as User).role; // Agrega el role al tokenk
    }
    return token;
  },
  async signIn({ user }: SignInParams) {
    if (!user.id) {
      throw new Error("No user ID found during sign-in");
    }

    try {
      await prisma.session.create({
        data: {
          sessionToken: crypto.randomUUID(),
          userId: user.id,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
          status: "active",
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error al crear sesión:", error);
    }

    return true;
  },
};

// Extender Session para incluir el campo sessions
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
      sessions?: any[]; // Puedes definir un tipo más específico si conoces la estructura
    };
  }
}

// Aplicar el adapter de Prisma y las callbacks modificadas
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...restConfig,
  providers,
  callbacks,
});
