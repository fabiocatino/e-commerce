import { Grid, NoSsr } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from '../../src/components/Order/CheckoutForm';
import OrderSummary from '../../src/components/Order/OrderSummary';
import Payment from '../../src/components/Order/Payment';
import ReviewOrder from '../../src/components/Order/ReviewOrder';
import HorizontalLinearStepper from '../../src/components/Order/Stepper';
import { useCartItems } from '../../src/services/cartSlice';
import styles from './Checkout.module.css';
import { getSession } from 'next-auth/react';

const Checkout = () => {
	const step = useSelector((state) => state.checkout.currentStep);
	const cartItems = useCartItems();

	return (
		<NoSsr>
			<div>
				{cartItems <= 0 && <p>No items in your basket.</p>}
				{cartItems?.length > 0 && (
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
		</NoSsr>
	);
};

export default Checkout;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: '/user/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
