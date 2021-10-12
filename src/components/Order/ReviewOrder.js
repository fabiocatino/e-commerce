import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutAction } from '../../services/checkoutSlice';

const ReviewOrder = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.step.currentStep);

	return (
		<div>
			Review Order
		</div>
	);
};

export default ReviewOrder;
