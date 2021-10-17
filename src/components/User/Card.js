import Link from 'next/link';
import {
	CardActionArea,
	Link as MLink,
	Card,
	CardContent,
	Typography,
} from '@mui/material';

import * as React from 'react';
import styles from './Card.module.css';

export default function UserCard(props) {
	return (
		<Card className={styles.card}>
			<CardActionArea>
				<CardContent className={styles['top-card']}>
					{props.icon}
					<Link passHref={true} href={props.link}>
						<MLink color="white" underline="hover" variant="body1">
							<strong>{props.title}</strong>
						</MLink>
					</Link>
				</CardContent>
				<CardContent className={styles['bottom-card']}>
					<Typography variant="body2">{props.description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
