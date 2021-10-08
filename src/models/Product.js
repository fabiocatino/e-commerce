import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		brand: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		rating: { type: Number, required: true, default: 0 },
		numReviews: { type: Number, required: true, default: 0 },
		price: { type: Number, required: true },
		countInStock: { type: Number, required: true, default: 0 },
	},
	{
		timestamps: true,
	}
);

const Product =
	mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
