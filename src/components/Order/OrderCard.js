import { Avatar, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import styles from './OrderCard.module.css';

const OrderCard = (props) => {
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
							<Typography variant="body1">ORDER #{props._id} </Typography>{' '}
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
						</div>
					))}
				</CardContent>
			</CardContent>
		</Card>
	);
};

export default OrderCard;
