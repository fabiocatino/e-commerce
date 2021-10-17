import Cors from 'cors';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import Order from '../../../src/models/Order';
import User from '../../../src/models/User';
import db from '../../../src/utils/db';

const handler = nc().use(Cors());

handler.get(async (req, res) => {
	const session = await getSession({ req });
	await db.connect();

	const user = await User.find({ email: session.user.email });
	const _id = user[0]._id;
	const orders = await Order.find({ user: _id });
	await db.disconnect();
	res.send(orders);
});

export default handler;
