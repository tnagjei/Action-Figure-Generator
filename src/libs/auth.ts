import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "test-account",
      name: "Test Account",
      credentials: {},
      async authorize() {
        // 返回测试账号
        return {
          id: "test-user",
          name: "Test User",
          email: "test@example.com",
          image: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        };
      }
    })
  ],
  secret: "test-secret",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
}; 