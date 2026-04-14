import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { dbConnection } from "@/libs/dbConnection";
import User from "@/model/user/user.model";

const handler = NextAuth({
  providers: [
    // ✅ Google
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),

    // ✅ Credentials
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await dbConnection();
        const user = await User.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error("USER_NOT_FOUND");
        }

        if (!user.isVerified) {
          throw new Error("USER_NOT_VERIFIED");
        }

        if (!user.password) {
          throw new Error("USE_GOOGLE_LOGIN");
        }

        // check password
        const isMatch = await bcrypt.compare(
          credentials!.password,
          user.password,
        );

        if (!isMatch) {
          throw new Error("INVALID_PASSWORD");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // ✅ since we are using custom model
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      await dbConnection();

      // 👉 If Google login
      if (account?.provider === "google") {
        let existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          // create new user
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            provider: "google",
            isVerified: true,
          });
        }
        user.id = existingUser?._id.toString() || user.id; // set the id for the session callback
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
