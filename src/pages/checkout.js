import { Grid } from '@mui/material';
import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import styles from './Checkout.module.css';

const Checkout = () => {
	return (
		<Grid container className={styles.container}>
			<Grid item xs={12} sm={12} md={12} lg={6}>
				<div className={styles.left}>
					<h3>Billing Details</h3>
					<CheckoutForm></CheckoutForm>
				</div>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={5}>
				<OrderSummary></OrderSummary>
			</Grid>
		</Grid>
	);
};

export default Checkout;
