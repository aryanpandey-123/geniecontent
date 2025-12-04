import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import type { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) return false;

      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email));

      if (!existing.length) {
        await db.insert(users).values({
          email: user.email,
          name: user.name ?? "",
          image: user.image ?? null,
        });
      }

      return true;
    },

    async session({ session }) {
      if (!session.user?.email) return session;

      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email));

      if (existing.length > 0) {
        session.user.id = existing[0].id;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
