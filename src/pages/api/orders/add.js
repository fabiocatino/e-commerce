import nc from 'next-connect';
import db from '../../../utils/db';
import Order from '../../../models/Order';
import Cors from 'cors';
import { getSession } from 'next-auth/react';
import User from '../../../models/User';

const handler = nc().use(Cors());

handler.post(async (req, res) => {
	const session = await getSession({ req });
	if (session) {
		//
	} else {
		console.log('Not authenticated.');
		res.status(401);
	}
	const email = session.user.email;
	if (req.method === 'POST') {
		await db.connect();
		const exsistingUser = await User.findOne({ email: email });
		if (!exsistingUser) {
			db.disconnect();
			throw new Error('No user associated with this email address.');
		}

		const _id = exsistingUser._id;
		const newOrder = new Order({
			...req.body,
			user: _id,
		});
		const order = await newOrder.save();

		await res.send(order);
		db.disconnect();
		res.end();
	}
});

export default handler;
