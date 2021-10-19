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
		// signingKey: {
		// 	kty: "oct",
		// 	kid: "9esMHG2p8vUkwOHNeeTNaGtIaC4MEJeQBt4sAlD72B0",
		// 	alg: "HS512",
		// 	k: "zhiQ6XmVdJ2_HOrOAFyxUCnAGmibKLHY5LkAYd3HDwcPKPojkcpMZWfc9UrevU8x8pB3RMhwujjNn2vikbTxSw",
		// },
	},

	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const exsistingUser = await User.findOne({ email: credentials.email });
				if (!exsistingUser) {
					throw new Error('No user associated with this email address.');
				}

				const isValid = await verifyPassword(
					credentials.password,
					exsistingUser.password
				);

				if (!isValid) {
					throw new Error('Invalid password.');
				}

				return {
					name: exsistingUser.name,
					email: exsistingUser.email,
				};
			},
		}),
	],
});
