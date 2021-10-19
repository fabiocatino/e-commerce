import { Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Spinner from '../../src/components/Layout/Spinner';
import OrderCard from '../../src/components/Order/OrderCard';
import { useGetAllOrdersQuery } from '../../src/services/ordersApi';
import styles from './Orders.module.css';

const Orders = () => {
	const { data: orders, isLoading, error } = useGetAllOrdersQuery({});
	const { data: session, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (!session && status !== 'loading') {
			router.push('/');
		}
	}, [session]);

	return (
		<>
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
						<OrderCard key={order._id} {...order}></OrderCard>
					))}
				</Container>
			)}
		</>
	);
};

export default Orders;

// export async function getServerSideProps(req) {
// 	const session = await getSession(req);

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {},
// 	};
// }
