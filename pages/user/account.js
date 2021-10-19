import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import { Container, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import UserCard from '../../src/components/User/Card';
import styles from './Account.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../../src/components/Layout/Spinner';

const Account = () => {
	const { data: session, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (status !== 'loading' && !session) {
			router.push('/');
		} else {
			setIsLoading(false);
		}
	}, [session]);

	return (
		<Container>
			{isLoading && <Spinner />}
			{!isLoading && (
				<Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
					{status === 'authenticated' && (
						<Typography className={styles.title} variant="h4">
							YOUR ACCOUNT, {session.user.name.toUpperCase()}
						</Typography>
					)}
					<div className={styles.container}>
						{cardInfo.map((card) => (
							<Grid item key={card.title} xs={6} sm={6} md={4} lg={3}>
								<UserCard {...card}></UserCard>
							</Grid>
						))}
					</div>
				</Grid>
			)}
		</Container>
	);
};

export default Account;

const cardInfo = [
	{
		title: 'RECENT ORDERS',
		description: 'Check your recent orders here.',
		icon: <AccountCircleIcon sx={{ color: 'white' }} fontSize="large" />,
		link: '/user/orders/',
	},
	{
		title: 'ACCOUNT DETAILS',
		description: 'Manage your details, password and email.',
		icon: <ListIcon sx={{ color: 'white' }} fontSize="large" />,
		link: '/user/details/',
	},
	{
		title: 'ADDRESS BOOK',
		description: 'Manage your billing and delivery addresses.',
		icon: <HomeIcon sx={{ color: 'white' }} fontSize="large" />,
		link: '/user/addresses/',
	},
];

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 3000,
	};
}
