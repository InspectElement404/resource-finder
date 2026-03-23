import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // This hints to Google to only show accounts from this domain
      authorization: {
        params: {
          hd: "lga.gov.ph",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // STRICT SECURITY: Check if the email ends with your domain
      const email = profile?.email?.toLowerCase();
      return !!(email && email.endsWith("@lga.gov.ph"));
    },
  },
  pages: {
    signIn: "/login", // We will create this custom page next
    error: "/login", // Redirect back to login on failure
  },
});

export { handler as GET, handler as POST };
