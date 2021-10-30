import nc from 'next-connect';
import db from '../../../src/utils/db';
import Order from '../../../src/models/Order';
import Cors from 'cors';
import { getSession } from 'next-auth/react';
import User from '../../../src/models/User';

const handler = nc().use(Cors());

handler.post(async (req, res) => {
	const session = await getSession({ req });

	if (req.method === 'POST') {
		await db.connect();

		if (session) {
			console.log('session');
			const email = session.user.email;

			const existingUser = await User.findOne({ email: email });
			
			if (!existingUser) {
				throw new Error('No user associated with this email address.');
			}
			const _id = existingUser._id;

			const newOrder = new Order({
				...req.body,
				user: _id,
			});
			const order = await newOrder.save();

			await res.send(order);

		} else {
		
			const newOrder = new Order({
				...req.body,
			});
			const order = await newOrder.save();

			await res.send(order);
		}
	}
});

export default handler;
