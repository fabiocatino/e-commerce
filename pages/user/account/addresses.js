import HomeIcon from '@mui/icons-material/Home';
import { Button, Card, Container, Grid, Typography } from '@mui/material';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import Spinner from '../../../src/components/Layout/Spinner';
import AddressCard from '../../../src/components/User/AddressCard';
import AddressForm from '../../../src/components/User/AddressForm';
import { useGetAddressesQuery } from '../../../src/services/userApi';
import styles from './Addresses.module.css';

const Addresses = () => {
	const { data, isError, isLoading } = useGetAddressesQuery();
	const [displayForm, setDisplayForm] = useState(false);

	return (
		<>
			{isError && (
				<Typography className={styles['error-message']} variant="h5">
					Something went wrong. Please try again.
				</Typography>
			)}
			{isLoading && <Spinner />}
			{!isLoading && !isError && (
				<Container className={styles.container}>
					<div className={styles.title}>
						<h1>Your Addresses</h1>
					</div>
					<div className={displayForm ? styles.form : styles['no-form']}>
						<AddressForm
							onSubmit={(option) => setDisplayForm(option)}
							className={styles.address}
							onClose={() => setDisplayForm(false)}
						/>
					</div>

					<div className={styles.cards}>
						<Card className={styles['add-address-card']}>
							<HomeIcon color="primary" sx={{ fontSize: 35 }} />
							<Button onClick={() => setDisplayForm(true)}>
								Add new address
							</Button>
						</Card>
						{data.map((address, index) => (
							<Grid key={address._id} item xs={6} sm={6} md={4} lg={3}>
								<AddressCard {...address} index={index} />
							</Grid>
						))}
					</div>
				</Container>
			)}
		</>
	);
};

export default Addresses;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
