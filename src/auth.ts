import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/libs/prisma";
import authConfig from "@/config/auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    /** jwt() se ejecuta cada vez que se crea o actualia un token JWT, aqui puedes agregar informacion adicional al token */
    jwt({ token, user }) {
      if (user) token.role = user.role; // user is available during sign-in
      return token;
    },
    /** session() se utiliza para agregar la informacion del token a la session del usuario, lo que hace que este disponible en el cliente */
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role; // user is available during sign-in
      }
      return session;
    },
  },
});
