import React from 'react';
import styles from './OrderCard.module.css';
import {
	Avatar,
	Button,
	Card,
	CardContent,
	Link as MLink,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { checkoutAction } from '../../services/checkoutSlice';
import { useDispatch } from 'react-redux';
import { orderAction } from '../../services/orderSlice';

const OrderCard = (props) => {
	const dispatch = useDispatch();

	const onClickHandler = () => {
		dispatch(orderAction.addOrderID(props._id));
		dispatch(checkoutAction.currStep(2));
	};

	return (
		<Card className={styles.card}>
			<CardContent className={styles['card-content']}>
				<CardContent className={styles['top-card']}>
					<ul>
						<li>
							<Typography variant="body1"> ORDER PLACED </Typography>
						</li>
						<li> {new Date(props.createdAt).toLocaleDateString()}</li>
					</ul>

					<ul>
						<li>
							<Typography variant="body1">TOTAL </Typography>
						</li>
						<li>£{props.totalPrice.toFixed(2)}</li>
					</ul>

					<ul>
						<li>
							<Typography variant="body1"> DISPATCH TO </Typography>
						</li>
						<li>
							{props.shippingInfo.firstName} {props.shippingInfo.lastName}
						</li>
					</ul>

					<ul>
						<li>
							<Typography variant="body1">ORDER #{props._id} </Typography>
						</li>
						<li>
							<Link
								href="/order/checkout"
								as="/order/checkout/step=success"
								passHref={true}
							>
								<MLink
									onClick={onClickHandler}
									variant="contained"
									underline="always"
									color="inherit"
								>
									View order details
								</MLink>
							</Link>
						</li>
					</ul>
				</CardContent>
				<CardContent className={styles['bottom-card']}>
					{props.orderItems.map((item) => (
						<div key={item._id} className={styles.item}>
							<div className={styles.left}>
								<Avatar
									alt={item.name}
									sx={{ width: 40, height: 40 }}
									variant="square"
									src={item.image}
								></Avatar>
								{item.name}
							</div>
							<div> £{item.price}</div>
							<div className={styles.button}>
								<Button variant="outlined">Leave a review</Button>
							</div>
						</div>
					))}
				</CardContent>
			</CardContent>
		</Card>
	);
};

export default OrderCard;
