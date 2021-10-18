import { Container, Grid } from '@mui/material';
import React from 'react';
import MediaCard from '../../src/components/Products/Card';
import style from './Index.module.css';
import { useGetAllProductsQuery } from '../../src/services/productsApi';
import Spinner from '../../src/components/Layout/Spinner';

const Index = () => {
	const { data, isLoading, error } = useGetAllProductsQuery();

	return (
		<Container>
			{error && <p>Something went wrong. Try again later.</p>}
			{isLoading && <Spinner />}
			{!isLoading && !error && (
				<Grid container className={style.main}>
					{data.map((item) => (
						<Grid
							item
							xs={6}
							sm={5}
							md={3}
							lg={3}
							key={item._id}
							className={style.card}
						>
							<MediaCard {...item}></MediaCard>
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
};

export default Index;
