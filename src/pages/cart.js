import React, { useState, useEffect, useCallBack } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import styles from './Cart.module.css';
import EnhancedTable from '../components/Table';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Cart = () => {
	const router = useRouter();
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);

	const cartItems = useSelector((state) => state.cart.cart.cartItems);
	useEffect(() => {
		setTotalPrice(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
		setTotalQuantity(cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [totalPrice, totalQuantity, cartItems]);

	const pluralize = (val, word, plural = word + 's') => {
		const _pluralize = (num, word, plural = word + 's') =>
			[1, -1].includes(Number(num)) ? word : plural;
		if (typeof val === 'object')
			return (num, word) => _pluralize(num, word, val[word]);
		return _pluralize(val, word, plural);
	};

	return (
		<div className={styles.container}>
			<section className={styles.title}>
				<Typography variant="h3">Shopping Cart</Typography>
				<Button onClick={() => router.back()}>Go back</Button>
			</section>
			{totalQuantity === 0 && (
				<Typography variant="h3">Your basket is empty.</Typography>
			)}

			{totalQuantity >= 1 && (
				<div className={styles.checkout}>
					{/* <Grid item lg={8}> */}
					<EnhancedTable></EnhancedTable>
					{/* </Grid>
				<Grid item lg={12}> */}
					<Box className={styles['checkout-box']}>
						<Typography variant="h5">
							{`Subtotal (${totalQuantity} ${' '} ${pluralize(
								totalQuantity,
								'item'
							)}):  £${totalPrice}`}
						</Typography>
						<Button
							className={styles['checkout-button']}
							variant="contained"
							color="success"
						>
							Checkout
						</Button>
					</Box>
					{/* </Grid> */}
				</div>
			)}
		</div>
	);
};

export default Cart;
