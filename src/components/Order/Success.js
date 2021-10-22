import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cartActions,
	useCartItems,
	useTotalPrice,
} from '../../services/cartSlice';
import { checkoutAction } from '../../services/checkoutSlice';

const Success = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);

	// useEffect(() => {
	// 	dispatch(checkoutAction.nextStep(step - 3));
	// }, []);

	return <div>Success</div>;
};

export default Success;
