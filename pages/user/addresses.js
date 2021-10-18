import { Container, Grid } from '@mui/material';
import React from 'react';
import AddressCard from '../../src/components/User/AddressCard';
import AddressForm from '../../src/components/User/AddressForm';
import { useGetAddressesQuery } from '../../src/services/userApi';
import styles from './Addresses.module.css';
import Spinner from '../../src/components/Layout/Spinner';

const Addresses = () => {
	const { data, isError, isLoading } = useGetAddressesQuery();

	return (
		<>
			{isError && <p>Something went wrong. Please try again.</p>}
			{isLoading && <Spinner />}
			{!isLoading && !isError && (
				<Container className={styles.container}>
					<div className={styles.title}>
						<h3>Your Addresses</h3>
					</div>

					<div className={styles.form}>
						<AddressForm className={styles.address} />
					</div>
					<div className={styles.card}>
						<AddressCard />
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
