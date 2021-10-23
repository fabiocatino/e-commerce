import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderQuery } from '../../services/ordersApi';
import Spinner from '../Layout/Spinner';
import OrderSummary from './OrderSummary';
import styles from './Success.module.css';
import { useRouter } from 'next/router';
import { checkoutAction } from '../../services/checkoutSlice';

const Success = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);

	useEffect(() => {
		console.log('loading');
		const handleStart = (url) => {
			dispatch(checkoutAction.currStep(0));
		};

		router.events.on('routeChangeStart', handleStart);

		return () => {
			router.events.off('routeChangeStart', handleStart);
		};
	}, [router.events]);

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
									We&apos;ve received your order, and will contact you as sooon
									as your package is shipped. You can find your purchase
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
						<div style={{ width: 1000 }}>
							<OrderSummary
								totalPrice={data[0].totalPrice}
								cartItems={data[0].orderItems}
							></OrderSummary>
						</div>
					</div>
					<div className={styles['delivery-section']}>
						<Typography variant="h4">Billing and Shipping</Typography>
					</div>
					<div className={styles['delivery-container']}>
						<Box className={styles['billing-section']}>
							{data[0].billingInfo && (
								<>
									<Typography variant="h5" sx={{ marginBottom: 1 }}>
										Billing
									</Typography>
									<div>
										{data[0].billingInfo.firstName}{' '}
										{data[0].billingInfo.lastName}
									</div>
									<div>
										{data[0].billingInfo.address}
										{data[0].billingInfo.address2
											? data[0].billingInfo.address2
											: null}
									</div>
									<div>{data[0].billingInfo.city}</div>
									<div>{data[0].billingInfo.postCode}</div>
									<div>{data[0].billingInfo.country}</div>
								</>
							)}

							<Typography variant="h5" sx={{ marginTop: 2 }}>
								Payment Method
							</Typography>
							<div>{data[0].paymentMethod}</div>
						</Box>

						<Box className={styles['shipping-section']}>
							<Typography variant="h5" sx={{ marginBottom: 1 }}>
								Shipping
							</Typography>
							<div>
								{data[0].shippingInfo.firstName} {data[0].shippingInfo.lastName}
							</div>
							<div>{data[0].shippingInfo.address} </div>
							<div>
								{data[0].shippingInfo.address2
									? data[0].shippingInfo.address2
									: null}
							</div>
							<div>{data[0].shippingInfo.city}</div>
							<div>{data[0].shippingInfo.postCode}</div>
							<div>{data[0].shippingInfo.country}</div>
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
