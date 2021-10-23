import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		orderItems: [
			{
				name: { type: String, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
			},
		],
		shippingInfo: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			address: { type: String, required: true },
			address2: { type: String, required: false },
			city: { type: String, required: true },
			postCode: { type: String, required: true },
			country: { type: String, required: true },
			phoneNumber: { type: Number, required: false },
			email: { type: String, required: true },
		},
		billingInfo: {
			firstName: { type: String, required: false },
			lastName: { type: String, required: false },
			address: { type: String, required: false },
			address2: { type: String, required: false },
			city: { type: String, required: false },
			postCode: { type: String, required: false },
			country: { type: String, required: false },
			phoneNumber: { type: Number, required: false },
			email: { type: String, required: false },
		},
		totalPrice: { type: Number, required: true },
		paymentMethod: { type: String, required: false },
		isPaid: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, required: true, default: false },
		deliveredAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
