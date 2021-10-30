import Cors from 'cors';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import User from '../../../src/models/User';
import { HashPassword, verifyPassword } from '../../../src/utils/auth';
import db from '../../../src/utils/db';

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

		res.status(200).send({ message: 'Password updated.' });
	}
});

export default handler;
