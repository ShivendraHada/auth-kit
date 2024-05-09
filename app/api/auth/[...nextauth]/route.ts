import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User from "../../../../models/User";
import DBConnect from "@/utils/DBConnect";
import sendConfirmationEmail from "@/utils/sendConfirmationEmail";
import getEnv from "@/utils/envConfig";
import { nanoid } from "nanoid";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await DBConnect();

        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const { BASE_URL } = getEnv();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with the email");
        }

        const { status, name, password: hashedPassword } = user;

        switch (status) {
          case "NotConfirmed":
            const newConfirmationCode = nanoid(12);
            await user.updateOne({ confirmationCode: newConfirmationCode });
            await sendConfirmationEmail({
              email,
              confirmationLink: new URL(
                `${BASE_URL}/api/confirm-email?email=${email}&code=${newConfirmationCode}`
              ),
              userName: name.split(" ")[0],
            });
            throw new Error(
              "Your account is not confirmed yet. Please check your email for the confirmation link."
            );

          case "Inactive":
            throw new Error(
              "Your account is currently inactive. Please contact the administrator."
            );

          case "Disabled":
            throw new Error(
              "Your account has been disabled. Please contact the administrator."
            );

          case "Active":
            const isValidPassword = await bcrypt.compare(
              password,
              hashedPassword
            );
            if (!isValidPassword) {
              throw new Error("Password is invalid");
            }
            return user;

          default:
            throw new Error("Invalid user status");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
