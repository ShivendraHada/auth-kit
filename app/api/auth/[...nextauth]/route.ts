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
        try {
          await DBConnect();

          const { email, password } = credentials || {};
          if (!email || !password) {
            return { error: "Email and password are required" };
          }

          const { BASE_URL } = getEnv();
          const user = await User.findOne({ email });

          if (!user) {
            return { error: "No user found with the email" };
          }

          const { status, name, password: hashedPassword } = user;

          switch (status) {
            case "NotConfirmed":
              const newConfirmationCode = nanoid(12);
              const confirmationLink = new URL(
                `${BASE_URL}/api/confirm-email?email=${email}&code=${newConfirmationCode}`
              );
              await user.updateOne({ confirmationCode: newConfirmationCode });
              await sendConfirmationEmail({
                email,
                confirmationLink,
                userName: name.split(" ")[0],
              });
              console.log("NOt confirmedddd....");
              return { error: "Please verify your email address", status: 404 };

            case "Inactive":
              return {
                error: "Your account is currently inactive",
                status: 403,
              };

            case "Disabled":
              return { error: "Your account has been disabled", status: 403 };

            case "Active":
              const isValidPassword = await bcrypt.compare(
                password,
                hashedPassword
              );
              if (!isValidPassword) {
                return { error: "Password is invalid", status: 401 };
              }
              return user;

            default:
              return { error: "Error fetching data!", status: 500 };
          }
        } catch (error) {
          return { error: (error as Error).message, status: 500 };
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
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
