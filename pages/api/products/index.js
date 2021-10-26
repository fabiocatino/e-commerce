import nc from 'next-connect';
import db from '../../../src/utils/db';
import Product from '../../../src/models/Product';
import Cors from 'cors';

const handler = nc().use(Cors());
handler.get(async (req, res) => {
	await db.connect();

	if (req.query.category.length === 0) {
		const products = await Product.paginate(
			{},
			{ page: req.query.page, limit: 9 }
		);
		res.send(products);
		
	} else {
		const products = await Product.paginate(
			{ category: req.query.category },
			{ page: req.query.page, limit: 9 }
		);
		res.send(products);
	}
});

export default handler;
