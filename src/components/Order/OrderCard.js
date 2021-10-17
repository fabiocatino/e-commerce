import {
	CardActionArea,
	Card,
	CardContent,
	Typography,
	Avatar,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import styles from './OrderCard.module.css';

const OrderCard = (props) => {
	const { data: session } = useSession();
	return (
		<Card className={styles.card}>
			<CardActionArea>
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
						<li> {session.user.name}</li>
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
							<Avatar
								alt={item.name}
								sx={{ width: 40, height: 40 }}
								variant="square"
								src={item.image}
							></Avatar>
							{item.name}
						</div>
					))}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default OrderCard;
