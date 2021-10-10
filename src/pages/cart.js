import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import styles from './Cart.module.css';
import EnhancedTable from '../components/Table';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { cartActions } from '../services/cartSlice';

const Cart = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(null);
	const [cartItems, setCartItems] = useState([]);

	const items = useSelector((state) => state.cart.cart.cartItems);

	useEffect(() => {
		setCartItems(items);
		setTotalPrice(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
		setTotalQuantity(cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [totalPrice, totalQuantity, cartItems, items]);

	const checkoutHandler = () => {
		router.push('/checkout');
		dispatch(cartActions.addItem({...cartItems[0],  totalPrice: totalPrice }));
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
			{totalQuantity === 0 && (
				<Typography variant="h3">Your basket is empty.</Typography>
			)}

			{totalQuantity >= 1 && (
				<div className={styles.checkout}>
					<EnhancedTable></EnhancedTable>

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
