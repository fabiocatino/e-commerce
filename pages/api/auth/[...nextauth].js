import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../../src/utils/db';
import User from '../../../src/models/User';
import { verifyPassword } from '../../../src/utils/auth';

export default NextAuth({
	sessions: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},
	jwt: {
		secret: `${process.env.SECRET}`,
		signingKey: `{"kty":"oct","kid":"${process.env.JWT_KID}","alg":"HS512","k":"${process.env.JWT_K}"}`,
	},

	// callbacks: {
	// 	async signIn({ user, account, profile, email, credentials }) {
	// 		const isAllowedToSignIn = true;
	// 		if (isAllowedToSignIn) {
	// 			return true;
	// 		} else {
	// 			// Return false to display a default error message
	// 			return false;
	// 			// Or you can return a URL to redirect to:
	// 			// return '/unauthorized'
	// 		}
	// 	},
	// },

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
