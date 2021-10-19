import HomeIcon from '@mui/icons-material/Home';
import { Button, Card, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import Spinner from '../../src/components/Layout/Spinner';
import AddressCard from '../../src/components/User/AddressCard';
import AddressForm from '../../src/components/User/AddressForm';
import { useGetAddressesQuery } from '../../src/services/userApi';
import styles from './Addresses.module.css';

const Addresses = () => {
	const { data, isError, isLoading } = useGetAddressesQuery();
	const [displayForm, setDisplayForm] = useState(false);

	return (
		<>
			{isError && <p>Something went wrong. Please try again.</p>}
			{isLoading && <Spinner />}
			{!isLoading && !isError && (
				<Container className={styles.container}>
					<div className={styles.title}>
						<h1>Your Addresses</h1>
					</div>

					<div className={displayForm ? styles.form : styles['no-form']}>
						<AddressForm
							onSubmit={() => setDisplayForm(false)}
							className={styles.address}
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
