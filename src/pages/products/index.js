import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import MediaCard from '../../components/Products/Card';
import style from './Index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../../services/productsApi';
import Spinner from '../../components/Layout/Spinner';
import { cartActions } from '../../services/cartSlice';

const Index = () => {
	const dispatch = useDispatch();

	const { data, isLoading, error } = useGetAllProductsQuery('');
	return (
		<Container>
			{error && <p>Something went wrong. Try again later.</p>}
			{isLoading && <Spinner />}
			{!isLoading && !error && (
				<Grid container className={style.main}>
					{data.map((item, index) => (
						<Grid
							item
							xs={6}
							sm={5}
							md={3}
							lg={3}
							key={item._id}
							className={style.card}
						>
							<MediaCard
								_id={item._id}
								image={item.image}
								title={item.name}
								description={item.description}
								price={item.price}
								rating={item.rating}
							></MediaCard>
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
};

// export async function getStaticProps() {

// 	return {
// 		props: {
// 			products: data,
// 		},
// 		revalidate: 1,
// 	};
// }

export default Index;
