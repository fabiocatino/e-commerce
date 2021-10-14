import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, useCartItems, useTotalPrice } from '../../services/cartSlice';
import { checkoutAction } from '../../services/checkoutSlice';
import { useAddOrderMutation } from '../../services/ordersApi';
import styles from './ReviewOrder.module.css';

const ReviewOrder = () => {
	const totalPrice = useTotalPrice()		
	const router = useRouter();
	const dispatch = useDispatch();
	const [addOrder, { isLoading }] = useAddOrderMutation();
	const shippingInfo = useSelector(
		(state) => state.checkout.shipping.shippingInfo.shippingInfo
	);
	const orderItems = useCartItems()

	const submitOrderHandler = async () => {
		try {
			await addOrder({
				shippingInfo,
				...orderItems,
				totalPrice,
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
