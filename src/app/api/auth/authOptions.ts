import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/lib/mysql";
import * as bcrypt from "bcryptjs";

interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  institution: string | null;
  name: string | null;
  role: "admin" | "superAdmin";
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password || !credentials?.role) {
          return null;
        }

        const users = await query<DbUser>(
          "SELECT id, email, password_hash, institution, name, role FROM users WHERE email = ?",
          [credentials.username]
        );

        const user = users[0];
        if (!user) return null;

        if (user.role !== credentials.role) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          institution: user.institution,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.institution = user.institution;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.institution = token.institution as string;
      return session;
    },
  },
};
