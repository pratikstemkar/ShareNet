import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const loginUserSchema = z.object({
	email: z.string().min(10).max(20),
	password: z.string().min(8).max(20),
});

export const options: NextAuthOptions = {
	// adapter: PrismaAdapter(prisma),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email:",
					type: "text",
					placeholder: "your-cool-email",
				},
				password: {
					label: "Password:",
					type: "password",
					placeholder: "your-cool-password",
				},
			},
			async authorize(credentials, req) {
				const { email, password } = loginUserSchema.parse(credentials);
				// const user = await prisma.user.findUnique({
				// 	where: { email },
				// });
				// if (!user) {
				// 	return null;
				// }

				// const isPasswordValid = await bcrypt.compare(password, user.password);
				// if (!isPasswordValid) {
				// 	return null;
				// }
				const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		session({ session, token, user }) {
			session.user.id = token.id;
			return session;
		},
		async jwt({ token, account, user, profile }) {
			if (account) {
				token.accessToken = account.access_token;
				token.id = user.id;
				token.email = user.email;
				console.log({ user });
			}
			return token;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.JWT_SECRET,
};
