import nc from 'next-connect';
import db from '../../src/utils/db';
import Product from '../../src/models/Product';
import bcrypt from 'bcryptjs';
import User from '../../src/models/User';
import Order from '../../src/models/Order';
import faker from 'faker';

const handler = nc();

const products = [];
const images = [
	'/images/4177FAVpp2L._AC_.jpg',
	'/images/three-dimensional-image-computer_53876-1610.jpg',
	'/images/MQ052.jpg',
	'/images/ps5-1060x663.jpg',
	'/images/16611831-1200-auto.jpg',
];

for (let i = 0; i < 50; i++) {
	products.push({
		name: faker.commerce.productName(),
		image: images[Math.floor(Math.random() * images.length)],
		secondary_images: [
			images[Math.floor(Math.random() * images.length)],
			images[Math.floor(Math.random() * images.length)],
			images[Math.floor(Math.random() * images.length)],
		],
		brand: 'Samsung',
		category: faker.commerce.department(),
		description: faker.commerce.productDescription(),
		rating: (Math.random() * (5 - 1) + 1).toFixed(2),
		numReviews: Math.floor(Math.random() * 30),
		reviews: [
			faker.lorem.paragraph(),
			faker.lorem.paragraph(),
			faker.lorem.paragraph(),
			faker.lorem.paragraph(),
			faker.lorem.paragraph(),
			faker.lorem.paragraph(),
		],
		price: faker.commerce.price(),
		countInStock: Math.floor(Math.random() * 100),
	});
}

// const products = [
// 	{
// 		name: 'Phone',
// 		image: '/images/4177FAVpp2L._AC_.jpg',
// 		brand: 'OnePlus',
// 		category: 'Mobile Phones',
// 		description:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
// 		rating: 4.0,
// 		numReviews: 0,
// 		price: 199.99,
// 		countInStock: 10,
// 		name: 'Phone',
// 		image: '/images/4177FAVpp2L._AC_.jpg',
// 		brand: 'OnePlus',
// 		category: 'Mobile Phones',
// 		description:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
// 		rating: 4.0,
// 		numReviews: 0,
// 		price: 199.99,
// 		countInStock: 10,
// 	},

// 	{
// 		name: faker.commerce.productName(),
// 		image: faker.image.image(),
// 		brand: 'Samsung',
// 		category: faker.commerce.department(),
// 		description: faker.commerce.productDescription(),
// 		rating: (Math.random() * (5 - 1) + 1).toFixed(2),
// 		numReviews: Math.floor(Math.random() * 30),
// 		price: faker.commerce.price(),
// 		countInStock: Math.floor(Math.random() * 100),
// 	},
// 	{
// 		name: 'Computer',
// 		image: '/images/three-dimensional-image-computer_53876-1610.jpg',
// 		brand: 'MSI',
// 		category: 'Desktop and Laptops',
// 		description:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
// 		rating: 2.3,
// 		numReviews: 2,
// 		price: 499.99,
// 		countInStock: 2,
// 	},
// 	{
// 		name: 'Keyboard',
// 		image: '/images/MQ052.jpg',
// 		brand: 'Steelseries',
// 		category: 'Gaming Keyboards',
// 		description:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
// 		rating: 2.99,
// 		numReviews: 1,
// 		price: 50.99,
// 		countInStock: 15,
// 	},
// 	{
// 		name: ' Playstation 5',
// 		image: '/images/ps5-1060x663.jpg',
// 		brand: 'Sony',
// 		category: 'Consoles',
// 		description:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
// 		rating: 5.0,
// 		numReviews: 15,
// 		price: 499.0,
// 		countInStock: 45,
// 	},
// 	{
// 		name: 'Mouse',

// 		image: '/images/16611831-1200-auto.jpg',
// 		brand: 'Logitech',
// 		category: 'Mice',
// 		description:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
// 		rating: 4.0,
// 		numReviews: 2,
// 		price: 120.0,
// 		countInStock: 9,
// 	},
// ];

// const users = [
// 	{
// 		name: 'admin',
// 		email: 'admin@gmail.com',
// 		password: bcrypt.hashSync('admin'),
// 		isAdmin: true,
// 		addresss: [{}],
// 	},
// 	{
// 		name: 'Summer',
// 		email: 'Summer@gmail.com',
// 		password: bcrypt.hashSync('summer'),
// 		isAdmin: false,
// 		addresss: [{}],
// 	},
// ];

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
			phoneNumber: '2123423423423',
			address: 'Torre Dello Schiamante',
			city: 'Rome',
			postCode: '70128',
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
	// await User.deleteMany();
	// await User.insertMany(users);
	// await Order.deleteMany();
	// await Order.insertMany(order);
	// await db.disconnect();
	res.send({ message: 'seeded successfully' });
});

export default handler;
