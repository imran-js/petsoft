import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./db";

export const config = {
  pages: {
    signIn: "/login",
  },

  providers: [
    credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log(`No user found for ${email}`);
          return null;
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ], // rest of your config

  callbacks: {
    authorized: ({ auth, request }) => {
      const isLogedIn = Boolean(auth?.user);
      const isTryingToAccess = request.nextUrl.pathname.includes("/app");

      if (!isLogedIn && isTryingToAccess) {
        return false;
      }
      if (isLogedIn && isTryingToAccess) {
        return true;
      }

      if (isLogedIn && !isTryingToAccess) {
        return Response.redirect(
          new URL("/app/dashboard", request.nextUrl).toString()
        );
      }

      if (!isTryingToAccess) {
        return true;
      }
      if (!isLogedIn && !isTryingToAccess) {
        return true;
      }

      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user && typeof token.userId === "string") {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

// Use it in server contexts
export const { auth, signIn, signOut } = NextAuth(config);
