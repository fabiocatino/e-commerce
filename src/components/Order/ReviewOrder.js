import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cartActions,
	useCartItems,
	useTotalPrice,
} from '../../services/cartSlice';
import { useAddOrderMutation } from '../../services/ordersApi';
import styles from './ReviewOrder.module.css';
import { checkoutAction } from '../../services/checkoutSlice';

const ReviewOrder = () => {
	const totalPrice = useTotalPrice();
	const router = useRouter();
	const dispatch = useDispatch();
	const [addOrder, { isLoading }] = useAddOrderMutation();
	const step = useSelector((state) => state.checkout.currentStep);
	const orderItems = useCartItems();

	const submitOrderHandler = async () => {
		try {
			await addOrder({
				orderItems: [...orderItems],
				totalPrice,
			}).unwrap();
			dispatch(cartActions.deleteCart());
		} catch (error) {
			console.log(error);
		}
		router.replace('/order/success');
		dispatch(checkoutAction.currStep(0));
	};

	return (
		<div>
			Review Order
			<Button
				onClick={submitOrderHandler}
				type="submit"
				variant="contained"
				color="success"
				className={styles['submit-button']}
				size="large"
			>
				PLACE ORDER
			</Button>
		</div>
	);
};

export default ReviewOrder;
