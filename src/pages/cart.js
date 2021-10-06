import React, { useState, useEffect, useCallBack } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import styles from './Cart.module.css';
import EnhancedTable from '../components/Table';
import { useSelector } from 'react-redux';

const Cart = () => {
	const [total, setTotal] = useState({});

	const myTotal = useSelector((state) => {
		let totalPrice = 0;
		let totalQuantity = 0;
		for (let item in state.cart.cart.cartItems) {
			totalPrice += state.cart.cart.cartItems[item].price;
			totalQuantity += state.cart.cart.cartItems[item].quantity;
		}
		return { totalPrice, totalQuantity };
	});

	useEffect(() => {
		setTotal(myTotal);
	}, []);

	const pluralize = (val, word, plural = word + 's') => {
		const _pluralize = (num, word, plural = word + 's') =>
			[1, -1].includes(Number(num)) ? word : plural;
		if (typeof val === 'object')
			return (num, word) => _pluralize(num, word, val[word]);
		return _pluralize(val, word, plural);
	};

	return (
		<Container>
			<section className={styles.title}>
				<Typography variant="h3">Shopping Cart</Typography>
			</section>
			<section className={styles.checkout}>
				<EnhancedTable></EnhancedTable>

				<Box className={styles['checkout-box']}>
					<Typography variant="h5">
						{`Subtotal (${pluralize(total.totalQuantity, 'item')}):  £${
							total.totalPrice
						}`}
					</Typography>
					<Button
						className={styles['checkout-button']}
						variant="contained"
						color="success"
					>
						Checkout
					</Button>
				</Box>
			</section>
		</Container>
	);
};

export default Cart;
