import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		secondary_images: [{ type: String, required: true }],
		brand: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		rating: { type: Number, required: true, default: 0 },
		numReviews: { type: Number, required: true, default: 0 },
		reviews: [{ type: String, required: false }],
		price: { type: Number, required: true },
		countInStock: { type: Number, required: true, default: 0 },
	},
	{
		timestamps: true,
	}
);

productSchema.plugin(mongoosePaginate);

const Product =
	mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
