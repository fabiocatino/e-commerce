import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cartActions,
	useCartItems,
	useTotalPrice,
} from '../../services/cartSlice';
import { checkoutAction } from '../../services/checkoutSlice';
import { useGetOrderQuery } from '../../services/ordersApi';
import Spinner from '../Layout/Spinner';
import OrderSummary from './OrderSummary';
import styles from './Success.module.css';

const Success = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	// dispatch(checkoutAction.currStep(2));
	// useEffect(() => {
	// 	dispatch(checkoutAction.nextStep(step - 3));
	// }, []);
	const { data, isLoading, error } = useGetOrderQuery();
	return (
		<>
			{isLoading && <Spinner />}
			{error && <p>Something went wrong.</p>}
			{!isLoading && !error && (
				<Container className={styles.container}>
					<div className={styles.message}>
						<Typography className={styles.message} variant="h3">
							ORDER CONFIRMATION
							<div>
								<Typography variant="h5">
									{data[0].shippingInfo.firstName}, thank you for your order!
								</Typography>
							</div>
							<div>
								<Typography variant="body1">
									We've received your order, and will contact you as sooon as
									your package is shipped. You can find your purchase
									information below.
								</Typography>
							</div>
						</Typography>
					</div>

					<div className={styles['order-summary']}>
						<div>
							<Typography variant="h4">Order Summary</Typography>
						</div>
						<div>
							<Typography variant="h5">
								{new Date(data[0].createdAt).toLocaleString('en-US', {
									month: 'long',
								}) +
									' ' +
									new Date(data[0].createdAt).getDay() +
									', ' +
									new Date(data[0].createdAt).getFullYear()}
							</Typography>
						</div>
						<div style={{width: 1000}}>
							<OrderSummary totalPrice={data[0].totalPrice} cartItems={data[0].orderItems}></OrderSummary>
						</div>
					</div>
				</Container>
			)}
		</>
	);
};

export default Success;
