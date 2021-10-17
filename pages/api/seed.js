import nc from 'next-connect';
import db from '../../src/utils/db';
import Product from '../../src/models/Product';
import bcrypt from 'bcryptjs';
import User from '../../src/models/User';
import Order from '../../src/models/Order';

const handler = nc();

const products = [
	{
		name: 'Phone',
		image: '/images/4177FAVpp2L._AC_.jpg',
		brand: 'OnePlus',
		category: 'Mobile Phones',
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
		category: 'TVs',
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
		category: 'Desktop and Laptops',
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
		category: 'Consoles',
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

const users = [
	{
		name: 'admin',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('admin'),
		isAdmin: true,
	},
	{
		name: 'Summer',
		email: 'Summer@gmail.com',
		password: bcrypt.hashSync('summer'),
		isAdmin: false,
	},
];

const order = [
	{
		user: '6162b72f3a582dc631d513ac',
		orderItems: [
			{
				name: ' Playstation 5',
				image: '/images/ps5-1060x663.jpg',
				price: 499.0,
			},
		],
		shippingInfo: {
			firstName: 'Fabio',
			lastName: 'Catino',
			email: 'fabivs9@gmail.com',
			phoneNumber: '07593644412',
			address: 'Torre Tresca',
			city: 'Bari',
			postCode: '70124',
			country: 'Italy',
		},
		totalPrice: 200.55,
		paymentMethod: 'Credit Card',
		isPaid: true,
		isDelivered: true,
	},
];

handler.get(async (req, res) => {
	await db.connect();
	await Product.deleteMany();
	await Product.insertMany(products);
	await User.deleteMany();
	await User.insertMany(users);
	await Order.deleteMany();
	await Order.insertMany(order);
	await db.disconnect();
	res.send({ message: 'seeded successfully' });
});

export default handler;
