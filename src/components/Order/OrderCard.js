import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
							<Typography variant="body1">ORDER # {props.number} </Typography>{' '}
						</li>
					</ul>
				</CardContent>
				<CardContent className={styles['bottom-card']}>
					{/* <Typography variant="body2">{props.description}</Typography> */}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default OrderCard;
