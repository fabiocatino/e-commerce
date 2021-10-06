import nc from 'next-connect';
import db from '../../utils/db';
import Product from '../../models/Product';

const handler = nc();

const products = [
	{
		name: 'Phone',
		image: '/images/4177FAVpp2L._AC_.jpg',
		brand: 'OnePlus',
		category: 'Mobile Phone',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
		rating: 4.0,
		numReviews: 0,
		price: 199.99,
		countInStock: 10,
	},
	{
		name: 'TV',
		image: '/images/it-fhd-t5300-ue32t5372cuxzt-416407914.webp',
		brand: 'Samsung',
		category: 'TV',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
		rating: 2.3,
		numReviews: 0,
		price: 2100.0,
		countInStock: 5,
	},
	{
		name: 'Computer',
		image: '/images/three-dimensional-image-computer_53876-1610.jpg',
		brand: 'MSI',
		category: 'Desktop and Laptop',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
		rating: 2.3,
		numReviews: 2,
		price: 499.99,
		countInStock: 2,
	},
	{
		name: 'Keyboard',
		image: '/images/MQ052.jpg',
		brand: 'Steelseries',
		category: 'Gaming Keyboards',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
		rating: 2.99,
		numReviews: 1,
		price: 50.99,
		countInStock: 15,
	},
	{
		name: ' Playstation 5',
		image: '/images/ps5-1060x663.jpg',
		brand: 'Sony',
		category: 'Console',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
		rating: 5.0,
		numReviews: 15,
		price: 499.0,
		countInStock: 45,
	},
	{
		name: 'Mouse',
		image: '/images/16611831-1200-auto.jpg',
		brand: 'Logitech',
		category: 'Mice',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
		rating: 4.0,
		numReviews: 2,
		price: 120.0,
		countInStock: 9,
	},
];

handler.get(async (req, res) => {
	await db.connect();
	await Product.deleteMany();
	await Product.insertMany(products);
	await db.disconnect();
	res.send({ message: 'seeded successfully' });
});

export default handler;
