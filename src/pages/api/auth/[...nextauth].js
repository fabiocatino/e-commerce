import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../../utils/db';
import User from '../../../models/User';
import { verifyPassword } from '../../../utils/auth';

export default NextAuth({
	sessions: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const exsistingUser = await User.findOne({ email: credentials.email });

				if (!exsistingUser) {
					db.disconnect();
					throw new Error('No user associated with this email address.');
				}

				const isValid = await verifyPassword(
					credentials.password,
					exsistingUser.password
				);

				if (!isValid) {
					db.disconnect();
					throw new Error('Invalid password.');
				}

				db.disconnect();

				return {
					name: exsistingUser.name.split(' ')[0],
					email: exsistingUser.email,
				};
			},
		}),
	],
});
