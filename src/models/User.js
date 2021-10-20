import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		addresses: [
			{
				firstName: { type: String, required: false },
				lastName: { type: String, required: false },
				address: { type: String, required: false },
				city: { type: String, required: false },
				postCode: { type: String, required: false },
				country: { type: String, required: false },
				phoneNumber: { type: Number, required: false },
				isDefault: { type: Boolean, required: false, default: false },
				// email: { type: String, required: false },
			},
		],

		isAdmin: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
