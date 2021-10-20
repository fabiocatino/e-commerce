import nc from 'next-connect';
import db from '../../../src/utils/db';
import User from '../../../src/models/User';
import Cors from 'cors';
import { getSession } from 'next-auth/react';

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

		const existingUser = await User.findOne({ email: session.user.email });
		const addresses = existingUser.addresses;

		if (addresses.length === 0) {
			const user = await User.findOneAndUpdate(
				{ email: session.user.email },

				{
					addresses: [
						{
							firstName,
							lastName,
							address,
							city,
							postCode,
							country,
							phoneNumber,
							isDefault: true,
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

		if (addresses.length > 0) {
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
	}
});

handler.patch(async (req, res) => {
	if (req.method === 'PATCH') {
		const session = await getSession({ req });
		await db.connect();

		if (req.body.isDefault === true) {
			const user = await User.findOne({ email: session.user.email });

			const oldDefaultAddress = await user.addresses.filter((address) => {
				return address.isDefault === true;
			});

			await oldDefaultAddress[0].set({
				isDefault: false,
			});

			const updatedAddress = await user.addresses.id(req.body._id);
			const addressInfo = await user.addresses.id(req.body._id);
			await updatedAddress.set({
				isDefault: true,
			});

			await user.save();

			res.status(201).json({ message: 'Address updated.' });
		} else {
			const {
				firstName,
				lastName,
				address,
				city,
				postCode,
				country,
				phoneNumber,
			} = req.body;

			const user = await User.findOne({ email: session.user.email });

			const updatedAddress = await user.addresses.id(req.body._id);
			await updatedAddress.set({
				firstName,
				lastName,
				address,
				city,
				postCode,
				country,
				phoneNumber,
			});

			await user.save();

			res.status(201).json({ message: 'Address updated.' });
		}
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
