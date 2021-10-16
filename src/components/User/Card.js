import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from './Card.module.css';

export default function UserCard(props) {
	return (
		<Card className={styles.card}>
			<CardActionArea>
				<CardContent className={styles['top-card']}>
					{props.icon}
					<Typography variant="body1">
						<strong>{props.title}</strong>
					</Typography>
				</CardContent>
				<CardContent className={styles['bottom-card']}>
					<Typography variant="body2">{props.description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
