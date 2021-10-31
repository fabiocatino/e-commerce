import { Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Spinner from '../../../src/components/Layout/Spinner';
import OrderCard from '../../../src/components/Order/OrderCard';
import { useGetAllOrdersQuery } from '../../../src/services/ordersApi';
import styles from './Orders.module.css';

const Orders = () => {
	const { data: orders, isLoading, error } = useGetAllOrdersQuery({});
	const { data: session, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (!session && status !== 'loading') {
			router.push('/');
		}
	}, [session, router, status]);

	return (
		<Container>
			{error && session && (
				<p style={{ display: 'flex', justifyContent: 'center' }}>
					Something went wrong. Please, try again.
				</p>
			)}
			{isLoading && <Spinner />}
			{!isLoading && !error && (
				<Container className={styles.container}>
					{orders.length <= 0 && (
						<Typography variant="h3" className={styles['no-order-message']}>
							No orders to display.
						</Typography>
					)}
					{orders.map((order) => (
						<div key={order._id} className={styles.card}>
							<OrderCard {...order}></OrderCard>
						</div>
					))}
				</Container>
			)}
		</Container>
	);
};

export default Orders;
