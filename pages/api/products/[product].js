import Cors from 'cors';
import nc from 'next-connect';
import Product from '../../../src/models/Product';
import db from '../../../src/utils/db';

const handler = nc().use(Cors());

handler.get(async (req, res) => {

	await db.connect();
	const product = await Product.findOne({ _id: req.query.product });
	res.send(product);
});
export default handler;
