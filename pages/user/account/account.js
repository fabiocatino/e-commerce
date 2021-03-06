import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import { Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Spinner from '../../../src/components/Layout/Spinner';
import UserCard from '../../../src/components/User/Card';
import styles from './Account.module.css';

const Account = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session && status !== 'loading') {
			router.push('/user/login');
		}
	}, [status, router, session]);

	return (
		<Container className={styles.main}>
			{status === 'loading' && <Spinner />}
			{status === 'authenticated' && (
				<>
					<div className={styles.title}>
						{status === 'authenticated' && (
							<Typography className={styles.title} variant="h4">
								YOUR ACCOUNT, {session.user.name.toUpperCase()}
							</Typography>
						)}
					</div>
					<div className={styles.container}>
						{cardInfo.map((card) => (
							<div key={card.title}>
								<UserCard {...card}></UserCard>
							</div>
						))}
					</div>
				</>
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
		link: '/user/account/orders/',
	},
	{
		title: 'ACCOUNT DETAILS',
		description: 'Manage your details, password and email.',
		icon: <ListIcon sx={{ color: 'white' }} fontSize="large" />,
		link: '/user/account/details/',
	},
	{
		title: 'ADDRESS BOOK',
		description: 'Manage your billing and delivery addresses.',
		icon: <HomeIcon sx={{ color: 'white' }} fontSize="large" />,
		link: '/user/account/addresses/',
	},
];

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 3000,
	};
}
