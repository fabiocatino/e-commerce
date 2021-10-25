import nc from 'next-connect';
import db from '../../../src/utils/db';
import Product from '../../../src/models/Product';
import Cors from 'cors';

const handler = nc().use(Cors());

handler.get(async (req, res) => {
	await db.connect();
	const products = await Product.find({});
	res.send(products);
});

export default handler;