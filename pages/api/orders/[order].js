import Cors from 'cors';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import Order from '../../../src/models/Order';
import User from '../../../src/models/User';
import db from '../../../src/utils/db';

const handler = nc().use(Cors());

handler.get(async (req, res) => {
	await db.connect();
	const order = await Order.findOne({ _id: req.query.order });

	res.send(order);
});
export default handler;
