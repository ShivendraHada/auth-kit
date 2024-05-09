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
              return { error: "Please verify your email address" };

            case "Inactive":
              return { error: "Your account is currently inactive" };

            case "Disabled":
              return { error: "Your account has been disabled" };

            case "Active":
              const isValidPassword = await bcrypt.compare(
                password,
                hashedPassword
              );
              if (!isValidPassword) {
                return { error: "Password is invalid" };
              }
              return user;

            default:
              return { error: "Error fetching data!" };
          }
        } catch (error) {
          throw new Error((error as Error).message);
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
