import nc from 'next-connect';
import db from '../../../src/utils/db';
import User from '../../../src/models/User';
import { HashPassword } from '../../../src/utils/auth';
import Cors from 'cors';
import { getSession } from 'next-auth/react';
import { verifyPassword } from '../../../src/utils/auth';

const handler = nc().use(Cors());

handler.patch(async (req, res) => {
	if (req.method === 'PATCH') {
		const session = await getSession({ req });
		const email = session.user.email;
		const { oldPassword, password1 } = req.body;

		if (!password1 || password1.trim().length < 7) {
			res
				.status(422)
				.json({ message: 'Password should be at least 7 characters.' });
			return;
		}

		await db.connect();
		const existingUser = await User.findOne({ email });

		const isValid = await verifyPassword(oldPassword, existingUser.password);

		if (!isValid) {
			res.status(403).json({ message: 'Invalid password.' });
			return;
		}
		const hashedPassword = HashPassword(password1);

		const newPassword = await User.updateOne(
			{ email },
			{ password: hashedPassword }
		);

		// await res.send({
		// 	newPassword,
		// });
		res.status(200).json({ message: 'Password updated.' });

		res.end();
	}
});

export default handler;
