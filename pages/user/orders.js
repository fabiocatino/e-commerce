import { Container } from '@mui/material';
import { getSession } from 'next-auth/react';
import React from 'react';
import Spinner from '../../src/components/Layout/Spinner';
import OrderCard from '../../src/components/Order/OrderCard';
import { useGetAllOrdersQuery } from '../../src/services/ordersApi';
import styles from './Orders.module.css';

const Orders = () => {
	const { data: orders, isLoading, error } = useGetAllOrdersQuery();

	return (
		<>
			{error && (
				<p style={{ display: 'flex', justifyContent: 'center' }}>
					Something went wrong. Please, try again.
				</p>
			)}
			{isLoading && <Spinner />}
			{!isLoading && !error && (
				<Container className={styles.container}>
					{orders.map((order) => (
						<OrderCard key={order._id} {...order}></OrderCard>
					))}
				</Container>
			)}
		</>
	);
};

export default Orders;

export async function getServerSideProps(req) {
	const session = await getSession(req);

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
