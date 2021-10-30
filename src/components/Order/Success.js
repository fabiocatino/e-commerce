import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../services/cartSlice';
import { checkoutAction } from '../../services/checkoutSlice';
import { useGetOrderQuery } from '../../services/ordersApi';
import Spinner from '../Layout/Spinner';
import OrderSummary from './OrderSummary';
import styles from './Success.module.css';

const Success = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const orderID = useSelector((state) => state.order.orderID);
	const { data, isLoading, error } = useGetOrderQuery(orderID);

	useEffect(() => {
		dispatch(cartActions.deleteCart());
		const handleRouteChange = (url) => {
			if (url === '/order/checkout/step=success') {
				return;
			} else {
				dispatch(checkoutAction.currStep(0));
			}
		};

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [dispatch, router.events]);

	return (
		<>
			{isLoading && <Spinner />}
			{error && <p>Something went wrong.</p>}
			{!isLoading && !error && (
				<Container className={styles.container}>
					<div className={styles.main}>
						<div className={styles.message}>
							<Typography variant="h3">ORDER CONFIRMATION</Typography>
							<Typography variant="subtitle2">#{data._id}</Typography>
						</div>
						<div>
							<Typography variant="h5">
								{data.shippingInfo.firstName}, thank you for your order!
							</Typography>
						</div>
						<div>
							<Typography variant="body1">
								We&apos;ve received your order, and will contact you as soon as
								your package is shipped. You can find your purchase information
								below.
							</Typography>
						</div>
					</div>

					<div className={styles['order-summary']}>
						<div>
							<Typography variant="h4">Order Summary</Typography>
						</div>
						<div>
							<Typography variant="h5">
								{new Date(data.createdAt).toLocaleString('en-US', {
									month: 'long',
								}) +
									' ' +
									new Date(data.createdAt).getDate() +
									', ' +
									new Date(data.createdAt).getFullYear()}
							</Typography>
						</div>
						<div style={{ width: '100%' }}>
							<OrderSummary
								totalPrice={data.totalPrice}
								cartItems={data.orderItems}
							></OrderSummary>
						</div>
					</div>
					<div className={styles['delivery-section']}>
						<Typography variant="h4">Billing and Shipping</Typography>
					</div>
					<div className={styles['delivery-container']}>
						<Box className={styles['billing-section']}>
							{data.billingInfo && (
								<>
									<Typography variant="h5" sx={{ marginBottom: 1 }}>
										Billing
									</Typography>
									<div>
										{data.billingInfo.firstName} {data.billingInfo.lastName}
									</div>
									<div>
										{data.billingInfo.address}
										{data.billingInfo.address2
											? data.billingInfo.address2
											: null}
									</div>
									<div>{data.billingInfo.city}</div>
									<div>{data.billingInfo.postCode}</div>
									<div>{data.billingInfo.country}</div>
								</>
							)}

							<Typography variant="h5" sx={{ marginTop: 2 }}>
								Payment Method
							</Typography>
							<div>{data.paymentMethod}</div>
						</Box>

						<Box className={styles['shipping-section']}>
							<Typography variant="h5" sx={{ marginBottom: 1 }}>
								Shipping
							</Typography>
							<div>
								{data.shippingInfo.firstName} {data.shippingInfo.lastName}
							</div>
							<div>{data.shippingInfo.address} </div>
							<div>
								{data.shippingInfo.address2 ? data.shippingInfo.address2 : null}
							</div>
							<div>{data.shippingInfo.city}</div>
							<div>{data.shippingInfo.postCode}</div>
							<div>{data.shippingInfo.country}</div>

							<Typography variant="h5" sx={{ marginTop: 2 }}>
								Shipping Method
							</Typography>
							<div>Standard Shipping</div>
						</Box>
					</div>
				</Container>
			)}
		</>
	);
};

export default Success;
