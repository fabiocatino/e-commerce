import { Button, Container, Grid, NoSsr, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import OrderSummary from '../../src/components/Order/OrderSummary';
import EnhancedTable from '../../src/components/Order/Table';
import {
	useCartItems,
	useTotalPrice,
	useTotalQuantity,
} from '../../src/services/cartSlice';
import { useGetProductsByPageQuery } from '../../src/services/productsApi';
import Card from '../../src/components/Products/Card';
import styles from './Cart.module.css';

const Cart = () => {
	const router = useRouter();
	const itemsQuantity = useTotalQuantity();
	const totalPrice = useTotalPrice();
	const cartItems = useCartItems();
	const { data, isLoading, error } = useGetProductsByPageQuery({
		page: 1,
		category: '',
		limit: 6,
	});

	return (
		<NoSsr>
			<div className={styles.container}>
				<section className={styles.title}>
					<Typography variant="h3">Shopping Cart</Typography>
					<Button onClick={() => router.back()}>Go back</Button>
				</section>
				{itemsQuantity === 0 && (
					<>
						<Typography variant="h3">Your basket is empty.</Typography>

						<div className={styles['products-title']}>
							<Typography variant="h4">You might be interested in</Typography>
						</div>

						{!isLoading && !error && (
							<Container className={styles.products}>
								{data?.docs.map((item) => (
									<Card key={item._id} {...item}></Card>
								))}
							</Container>
						)}
					</>
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
