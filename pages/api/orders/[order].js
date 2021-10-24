import Cors from 'cors';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import Order from '../../../src/models/Order';
import User from '../../../src/models/User';
import db from '../../../src/utils/db';

const handler = nc().use(Cors());

handler.get(async (req, res) => {
	// const session = await getSession({ req });

	// if (!session || req.method !== 'GET') {
	// 	return;
	// }

	// const user = await User.findOne({ email: session.user.email });

	// const _id = user._id;

	await db.connect();
	const order = await Order.findOne({ _id: req.query.order });
	// .sort({ createdAt: -1 })
	// .limit(1);

	res.send(order);
});
export default handler;
