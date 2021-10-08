import nc from 'next-connect';
import db from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

const handler = nc();

handler.post(async (req, res) => {
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

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password1),
		isAdmin: false,
	});

	await res.send({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	});

	await user.save();
	await db.disconnect();

	res.status(201).json({ message: 'User created.' });
	res.end('User created');
});

export default handler;
