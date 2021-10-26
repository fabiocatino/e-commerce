import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		text: { type: string, required: true },
		rating: { type: Number, required: true, default: 0 },
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
