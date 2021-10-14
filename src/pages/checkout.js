import { Grid } from '@mui/material';
import React from 'react';
import CheckoutForm from '../components/Order/CheckoutForm';
import OrderSummary from '../components/Order/OrderSummary';
import HorizontalLinearStepper from '../components/Order/Stepper';
import styles from './Checkout.module.css';
import { useSelector } from 'react-redux';
import Payment from '../components/Order/Payment';
import ReviewOrder from '../components/Order/ReviewOrder';
import { useTotalQuantity, useTotalPrice, useCartItems } from '../services/cartSlice';

const Checkout = () => {
	const step = useSelector((state) => state.checkout.step.currentStep);
	const cartItems = useCartItems()

	return (
		<div>
			{cartItems <= 0 && <p>No items in your basket.</p>}
			{cartItems.length > 0 && (
				<Grid container className={styles.container}>
					<HorizontalLinearStepper></HorizontalLinearStepper>

					<Grid item xs={12} sm={12} md={12} lg={6}>
						<div className={styles.left}>
							{step === 0 && <CheckoutForm />}
							{step === 1 && <Payment />}
							{step === 2 && <ReviewOrder />}
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={5}>
						<OrderSummary></OrderSummary>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default Checkout;
