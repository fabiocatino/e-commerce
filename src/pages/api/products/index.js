import nc from 'next-connect';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import Cors from 'cors';

const handler = nc().use(Cors());

handler.get(async (req, res) => {
	await db.connect();
	const products = await Product.find({});
	await db.disconnect();
	res.send(products);
});

export default handler;
