import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import EnhancedTable from '../components/Order/Table';
import {
	cartActions,
	useTotalQuantity,
	useTotalPrice,
} from '../services/cartSlice';
import styles from './Cart.module.css';

const Cart = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const itemsQuantity = useTotalQuantity();
	const totalPrice = useTotalPrice();

	const checkoutHandler = () => {
		router.push('/checkout');
	};

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
			{itemsQuantity === 0 && (
				<Typography variant="h3">Your basket is empty.</Typography>
			)}

			{itemsQuantity >= 1 && (
				<div className={styles.checkout}>
					<EnhancedTable></EnhancedTable>

					<Box className={styles['checkout-box']}>
						<Typography variant="h5">
							{`Subtotal (${itemsQuantity} ${' '} ${pluralize(
								itemsQuantity,
								'item'
							)}):  £${totalPrice.toFixed(2)}`}
						</Typography>
						<Button
							className={styles['checkout-button']}
							variant="contained"
							color="success"
							onClick={checkoutHandler}
						>
							Checkout
						</Button>
					</Box>
				</div>
			)}
		</div>
	);
};

export default Cart;
