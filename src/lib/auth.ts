import NextAuth, { NextAuthConfig } from "next-auth";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ request }) => {
      const isTryingToAccess = request.nextUrl.pathname.includes("/app");
      if (isTryingToAccess) {
        return true;
      } else {
        return true;
      }
    },
  },
  providers: [], // rest of your config
} satisfies NextAuthConfig;

// Use it in server contexts
export const { auth } = NextAuth(config);
