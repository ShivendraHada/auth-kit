import CredentialsProvider from "next-auth/providers/credentials";
import { userService } from "./services/userService";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
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
        username: { label: "Username", type: "text", placeholder: "jdoe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        return userService.authenticate(username, password); //(5)
      },
    }),
  ],
};

// import User from "@/models/UserModel";
// import { DBConnect } from "@/utils/DBConnect";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// async function login(credentials: any) {
//   try {
//     await DBConnect();
//     const user = await User.findOne({ email: credentials.email });
//     if (!user) throw new Error("Invalid Credentials");
//     const isValid = await bcrypt.compare(
//       credentials.password,
//       user.get("password")
//     );
//     if (!isValid) throw new Error("Invalid Credentials");
//     return user;
//   } catch (error) {
//     throw new Error("Something Went Wrong!");
//   }
// }
// const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);
//           return user;
//         } catch (error: any) {
//           console.error("Error: ", error.message);
//         }
//         return null;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET as string,
//   session: {
//     strategy: "jwt",
//     maxAge: 5 * 60 * 60,
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.name = user.name;
//         token.email = user.email;
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user = token;
//       }
//       return session;
//     },
//   },
// };
