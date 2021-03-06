import { Grid, NoSsr } from '@mui/material';
import { getSession } from 'next-auth/react';
import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from '../../src/components/Order/CheckoutForm';
import OrderSummary from '../../src/components/Order/OrderSummary';
import Payment from '../../src/components/Order/Payment';
import HorizontalLinearStepper from '../../src/components/Order/Stepper';
import Success from '../../src/components/Order/Success';
import { useCartItems, useTotalPrice } from '../../src/services/cartSlice';
import styles from './Checkout.module.css';

const Checkout = () => {
	const step = useSelector((state) => state.checkout.currentStep);
	const cartItems = useCartItems();
	const totalPrice = useTotalPrice();

	return (
		<NoSsr>
			<div style={{minHeight: '100vh' }}>
				{cartItems.length > 0 || step === 2 ? (
					<Grid container className={styles.container}>
						<HorizontalLinearStepper></HorizontalLinearStepper>

						<Grid item xs={12} sm={12} md={12} lg={6}>
							<div className={styles.left}>
								{step === 0 && <CheckoutForm />}
								{step === 1 && <Payment />}
							</div>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={5}>
							{step !== 2 && (
								<OrderSummary
									cartItems={cartItems}
									totalPrice={totalPrice}
								></OrderSummary>
							)}
						</Grid>
					</Grid>
				) : (
					<p>No items in your basket.</p>
				)}
				{step === 2 && <Success />}
			</div>
		</NoSsr>
	);
};

export default Checkout;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	const isGuestCheckOut = context.req.headers.referer.endsWith('/cart');
	const isGuestCheckOutDone = context.req.headers.referer.endsWith('/checkout');

	if (!session && !isGuestCheckOut && !isGuestCheckOutDone) {
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
