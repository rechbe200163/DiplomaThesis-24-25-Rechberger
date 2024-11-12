import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma/client';
import { compare } from 'bcryptjs';
import { Customer } from '@prisma/client';
import { JWT } from 'next-auth/jwt';
// Your own logic for dealing with plaintext password strings; be careful!

declare module 'next-auth' {
  interface Session {
    user: {
      id: Customer['customerId'];
      role: Customer['role'];
      firstName: Customer['firstName'];
      lastName: Customer['lastName'];
      customerReference: Customer['customerReference'];
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: Customer['customerId'];
    role: Customer['role'];
    firstName: Customer['firstName'];
    lastName: Customer['lastName'];
    customerReference: Customer['customerReference'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@test.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.customer.findUnique({
          where: {
            email: credentials.email?.toString(),
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password?.toString(),
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        if (user && isPasswordValid) {
          return {
            id: user.customerId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          };
        }

        return {
          id: user.customerId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          customerReference: user.customerReference,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + '/shop';
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.firstName && session.user) {
        session.user.firstName = token.firstName;
      }

      if (token.lastName && session.user) {
        session.user.lastName = token.lastName;
      }

      if (token.customerReference && session.user) {
        session.user.customerReference = token.customerReference;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const u = await prisma.customer.findUnique({
        where: {
          customerId: token.sub,
        },
      });

      if (!u) return token;

      token.role = u.role;
      token.sub = u.customerId;
      token.firstName = u.firstName;
      token.lastName = u.lastName;
      token.customerReference = u.customerReference;

      return token;
    },
  },
});
