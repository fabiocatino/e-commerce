import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../src/models/User';
import { verifyPassword } from '../../../src/utils/auth';
import db from '../../../src/utils/db';

export default NextAuth({
	sessions: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},
	jwt: {
		secret: `${process.env.SECRET}`,
		signingKey: `{"kty":"oct","kid":"${process.env.JWT_KID}","alg":"HS512","k":"${process.env.JWT_K}"}`,
	},

	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const existingUser = await User.findOne({ email: credentials.email });
				if (!existingUser) {
					throw new Error('No user associated with this email address.');
				}

				const isValid = await verifyPassword(
					credentials.password,
					existingUser.password
				);

				if (!isValid) {
					throw new Error('Invalid password.');
				}

				return {
					name: existingUser.name,
					email: existingUser.email,
				};
			},
		}),
	],
});
