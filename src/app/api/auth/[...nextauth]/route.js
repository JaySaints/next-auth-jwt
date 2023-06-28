import connectToDB from "@/infra/database";
import UserModel, { comparePassword } from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await connectToDB();

        const user = await UserModel.findOne({ email });
        if (!user) throw Error("email/password mismatch!");

        // Compare the password
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) throw Error("email/password mismatch!");

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
