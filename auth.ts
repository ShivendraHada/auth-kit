import CredentialsProvider from "next-auth/providers/credentials";
import { userService } from "./services/userService";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { username, password } = credentials;
        const user = await userService.authenticate(username, password);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
