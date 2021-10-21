import { Avatar, NoSsr, Typography } from '@mui/material';
import React from 'react';
import { useCartItems, useTotalPrice } from '../../services/cartSlice';
import styles from './OrderSummary.module.css';

const OrderSummary = () => {
	const cart = useCartItems();
	const totalPrice = useTotalPrice();
	const cartItems = useCartItems();
	const paymentMethod = cartItems[0].paymentMethod;

	return (
		<div>
			<h3>Your order</h3>

			<div className={styles.summary}>
				<div className={styles.header}>
					<ul>
						<li>
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Products
							</Typography>
						</li>
						<li>
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Total
							</Typography>
						</li>
					</ul>
				</div>
				<NoSsr>
					<div className={styles.products}>
						{cart.map((item) => (
							<ul key={item._id}>
								<div className={styles['product-description']}>
									<li>
										<Avatar src={item.image} variant="square"></Avatar>
									</li>
									<li>
										<Typography variant="body1">{item.name}</Typography>
									</li>
								</div>
								<li>
									<Typography variant="body1">£{item.price}</Typography>
								</li>
							</ul>
						))}
					</div>
				</NoSsr>
				<div className={styles.shipping}>
					<ul>
						<li>
							<Typography variant="h6" sx={{ fontWeight: 400 }}>
								Shipping
							</Typography>
						</li>
						<li>
							<Typography variant="body1">Free Shipping</Typography>
						</li>
					</ul>
				</div>
				<div className={styles.total}>
					<ul>
						<li>
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Total
							</Typography>
						</li>
						<li>
							<Typography variant="body1">£{totalPrice.toFixed(2)}</Typography>
						</li>
					</ul>
				</div>
				<div className={styles.payment}>
					<ul>
						<li>
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Payment method: {paymentMethod}
							</Typography>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
