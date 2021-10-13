import { Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ReviewOrder.module.css';
import { checkoutAction } from '../../services/checkoutSlice';
import { cartActions } from '../../services/cartSlice';
import { useAddOrderMutation } from '../../services/ordersApi';
import { useRouter } from 'next/router';

const ReviewOrder = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [addOrder, { isLoading }] = useAddOrderMutation();
	const shippingInfo = useSelector(
		(state) => state.checkout.shipping.shippingInfo.shippingInfo
	);
	const orderItems = useSelector((state) => state.cart.cart.cartItems);

	const submitOrderHandler = async () => {
		try {
			await addOrder({
				shippingInfo,
				...orderItems,
				totalPrice: orderItems[0].totalPrice.toFixed(2),
				number: Math.random(),
			}).unwrap();
			dispatch(checkoutAction.deleteOrder());
			dispatch(cartActions.deleteCart());
		} catch (error) {
			console.log(error);
		}
		router.replace('/success');
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
