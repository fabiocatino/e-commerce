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
			city: { type: String, required: true },
			postCode: { type: String, required: true },
			country: { type: String, required: true },
			phoneNumber: { type: Number, required: true },
			email: { type: String, required: true },
		},
		totalPrice: { type: Number, required: true },
		// paymentMethod: { type: String, required: true },
		// isPaid: { type: Boolean, required: true },
		paidAt: { type: Date },
		// isDelivered: { type: Boolean, required: true },
		deliveredAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
