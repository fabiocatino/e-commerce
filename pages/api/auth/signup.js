import Cors from 'cors';
import nc from 'next-connect';
import User from '../../../src/models/User';
import { HashPassword } from '../../../src/utils/auth';
import db from '../../../src/utils/db';

const handler = nc().use(Cors());

handler.post(async (req, res) => {
	if (req.method === 'POST') {
	
		const { email, password1, password2 } = req.body;

		if (!email || !email.includes('@')) {
			res.status(422).json({ ciao: 'Invalid email address.' });
			return;
		} else if (!password1 || password1.trim().length < 7) {
			res
				.status(422)
				.json({ ciao: 'Password should be at least 7 characters.' });
			return;
		} else if (password1 !== password2) {
			res.status(422).json({ ciao: 'Passwords do not match.' });
			return;
		}

		await db.connect();

		const existingUser = await User.findOne({ email: email });

		if (existingUser) {
			res.status(422).json({ ciao: 'User already exists.' });
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

		res.status(201).json({ ciao: 'User created.' });
		res.end('User created');
	}
});

export default handler;