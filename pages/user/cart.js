import { Button, Grid, NoSsr, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import OrderSummary from '../../src/components/Order/OrderSummary';
import EnhancedTable from '../../src/components/Order/Table';
import {
	useCartItems,
	useTotalPrice,
	useTotalQuantity,
} from '../../src/services/cartSlice';
import styles from './Cart.module.css';

const Cart = () => {
	const router = useRouter();
	const itemsQuantity = useTotalQuantity();
	const totalPrice = useTotalPrice();
	const cartItems = useCartItems();

	return (
		<NoSsr>
			<div className={styles.container}>
				<section className={styles.title}>
					<Typography variant="h3">Shopping Cart</Typography>
					<Button onClick={() => router.back()}>Go back</Button>
				</section>
				{itemsQuantity === 0 && (
					<Typography variant="h3">Your basket is empty.</Typography>
				)}

				{itemsQuantity >= 1 && (
					<div className={styles.checkout}>
						<Grid item xs={12} sm={12} md={12} lg={7}>
							<EnhancedTable sx={{ maxWidth: 500 }}></EnhancedTable>
						</Grid>
						<Grid sx={{ width: 500 }} item xs={8} sm={8} md={8} lg={4}>
							<OrderSummary
								totalPrice={totalPrice}
								cartItems={cartItems}
							></OrderSummary>
						</Grid>
					</div>
				)}
			</div>
		</NoSsr>
	);
};

export default Cart;
