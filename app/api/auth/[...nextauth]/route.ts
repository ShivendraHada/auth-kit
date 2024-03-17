import User from "@/models/UserModel";
import { DBConnect } from "@/utils/DBConnect";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const maxDuration = 300;

async function login(credentials: any) {
  try {
    await DBConnect();
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Invalid Credentials");
    const isValid = await bcrypt.compare(
      credentials.password,
      user.get("password")
    );
    if (!isValid) throw new Error("Invalid Credentials");
    return user;
  } catch (error) {
    throw new Error("Something Went Wrong!");
  }
}
const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error: any) {
          console.error("Error: ", error.message);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
