import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import authConfig from "@/config/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 4 * 60 * 60 },
  ...authConfig,
  callbacks: {
    /** jwt() se ejecuta cada vez que se crea o actualiza un token JWT, aquí puedes agregar información adicional al token */
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        if (!user.id) {
          throw new Error("User ID is missing");
        }
        token.id = user.id;
      }
      return token;
    },
    /** session() se utiliza para agregar la información del token a la sesión del usuario, lo que hace que esté disponible en el cliente */
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id; // Aseguramos que el ID esté disponible en la sesión del cliente
      }
      return session;
    },
  },
});
