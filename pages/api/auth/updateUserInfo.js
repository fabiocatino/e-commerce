import Cors from 'cors';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import User from '../../../src/models/User';
import db from '../../../src/utils/db';

const handler = nc().use(Cors());

handler.patch(async (req, res) => {
	if (req.method === 'PATCH') {
		await db.connect();
		const session = await getSession({ req });
		const { email } = session.user;

		const filter = { email };
		const update = { name: req.body.name, email: req.body.email };

		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'Invalid email address.' });
			return;
		}


		const existingEmail = await User.findOne({ email: email });

		if (existingEmail.email === req.body.email) {
			res.status(422).json({ message: 'Email already exists.' });
			return;
		}

		const existingUser = await User.findOneAndUpdate(filter, update);

		res.status(201).send({ message: 'Name and/or password updated.' });
	}
});

export default handler;