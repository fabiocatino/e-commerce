import nc from 'next-connect';
import db from '../../../src/utils/db';
import Product from '../../../src/models/Product';
import Cors from 'cors';

const handler = nc().use(Cors());

handler.get(async (req, res) => {
	await db.connect();
	const product = await Product.findOne({ _id: req.query.product });
	await db.disconnect();
	res.send(product);
});

export default handler;
