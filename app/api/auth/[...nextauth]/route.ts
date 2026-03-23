import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          hd: "lga.gov.ph",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email?.toLowerCase();

      // ✅ allow:
      // - all @lga.gov.ph
      // - your personal email
      return !!(
        email &&
        (
          email.endsWith("@lga.gov.ph") ||
          email === "rcacaballero18@gmail.com " || 
          email === "markwenefredporazo@gmail.com " || 
        )
      );
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handler as GET, handler as POST };