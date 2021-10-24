import { Avatar, Button, Divider, NoSsr, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './OrderSummary.module.css';
import PayPalButton from './PayPalButton';

const OrderSummary = (props) => {
	const router = useRouter();

	const checkoutHandler = () => {
		router.push('/order/checkout');
	};
	const step = useSelector((state) => state.checkout.currentStep);
	return (
		<>
			{!props && 'loading'}
			{props && (
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
								{props.cartItems
									? props.cartItems.map((item) => (
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
									  ))
									: null}
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
									<Typography variant="body1">
										£{props.totalPrice ? props.totalPrice.toFixed(2) : null}
									</Typography>
								</li>
							</ul>
						</div>
						<div className={styles.payment}>
							{router.pathname === '/user/cart' && (
								<ul className={styles['payment-section']}>
									<li>
										<div className={styles['payment-section']}>
											<Typography variant="h6" sx={{ fontWeight: 600 }}>
												Payment method
											</Typography>
											<Button
												sx={{ marginTop: 2, borderRadius: '23px' }}
												size="large"
												color="success"
												variant="contained"
												onClick={checkoutHandler}
											>
												PROCEED TO BILLING DETAILS
											</Button>
											<Divider sx={{ paddingTop: 2, paddingBottom: 2 }}>
												<Typography
													sx={{ fontWeight: 'bold' }}
													variant="subtitle1"
												>
													OR PAY WITH
												</Typography>
											</Divider>
											<div>
												<PayPalButton />
											</div>
										</div>
									</li>
								</ul>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OrderSummary;
