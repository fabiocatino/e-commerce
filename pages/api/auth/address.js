import nc from 'next-connect';
import db from '../../../src/utils/db';
import User from '../../../src/models/User';
import Cors from 'cors';
import { getSession } from 'next-auth/react';
import { compareSync } from 'bcryptjs';

const handler = nc().use(Cors());
handler.post(async (req, res) => {
	const session = await getSession({ req });

	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		await db.connect();

		const {
			firstName,
			lastName,
			address,
			city,
			postCode,
			country,
			phoneNumber,
		} = req.body;

		const exsistingUser = await User.findOne({ email: session.user.email });
		const addresses = exsistingUser.addresses;

		const user = await User.findOneAndUpdate(
			{ email: session.user.email },

			{
				addresses: [
					...addresses,
					{
						firstName,
						lastName,
						address,
						city,
						postCode,
						country,
						phoneNumber,
					},
				],
			}
		);

		await res.send({
			user,
		});

		await user.save();

		res.status(201).json({ message: 'Address added.' });
		res.end('Address added.');
	}
});

handler.get(async (req, res) => {
	const session = await getSession({ req });

	if (req.method === 'GET') {
		await db.connect();
		const userAddresses = await User.find({ email: session.user.email });
		res.send(userAddresses[0].addresses);
	}
});

handler.delete(async (req, res) => {
	const session = await getSession({ req });
	const email = session.user.email;

	if (req.method === 'DELETE') {
		await db.connect();
		
		const user = await User.findOne({ email });
		await user.addresses.id(req.body._id).remove();

		res.status(201).json({ message: 'Address deleted.' });
		await user.save();
		res.end('Address deleted.');
	}
});

export default handler;
