import nc from 'next-connect';
import db from '../../../src/utils/db';
import User from '../../../src/models/User';
import { HashPassword } from '../../../src/utils/auth';
import Cors from 'cors';

const handler = nc().use(Cors());

handler.post(async (req, res) => {
	if (req.method === 'POST') {
		const { email, password1 } = req.body;

		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'Invalid email address.' });
			return;
		} else if (!password1 || password1.trim().length < 7) {
			res
				.status(422)
				.json({ message: 'Password should be at least 7 characters.' });
			return;
		}

		await db.connect();

		const exsistingUser = await User.findOne({ email: email });

		if (exsistingUser) {
			res.status(422).json({ message: 'User already exists.' });
			db.disconnect();
			return;
		}

		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: HashPassword(req.body.password1),
			isAdmin: false,
		});

		await res.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});

		await user.save();

		db.disconnect();
		res.status(201).json({ message: 'User created.' });
		res.end('User created');
	}
});

export default handler;
