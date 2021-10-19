import nc from 'next-connect';
import db from '../../../src/utils/db';
import User from '../../../src/models/User';
import { HashPassword } from '../../../src/utils/auth';
import Cors from 'cors';
import { getSession } from 'next-auth/react';

const handler = nc().use(Cors());

handler.patch(async (req, res) => {
	if (req.method === 'PATCH') {
		const session = await getSession({ req });
		const { email } = session.user;

		const filter = { email };
		const update = { name: req.body.name, email: req.body.email };

		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'Invalid email address.' });
			return;
		}

		await db.connect();

		const exsistingEmail = await User.findOne({ email: email });

		if (exsistingEmail.email === req.body.email) {
			res.status(422).json({ message: 'Email already exists.' });
			return;
		}

		const exsistingUser = await User.findOneAndUpdate(filter, update);

		res.status(201).json({ message: 'Name and/or password updated.' });
	}
});

export default handler;
