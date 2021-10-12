import { Grid } from '@mui/material';
import React from 'react';
import CheckoutForm from '../components/Order/CheckoutForm';
import OrderSummary from '../components/Order/OrderSummary';
import HorizontalLinearStepper from '../components/Order/Stepper';
import styles from './Checkout.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutAction } from '../services/checkoutSlice';
import Payment from '../components/Order/Payment';
import ReviewOrder from '../components/Order/ReviewOrder';

const Checkout = () => {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.step.currentStep);

	return (
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
	);
};

export default Checkout;
