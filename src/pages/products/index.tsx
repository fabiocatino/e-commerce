import { Container, Grid } from '@mui/material';
import React from 'react';
import MediaCard from '../../components/Products/Card';
import style from './Index.module.css';
import type { NextPage } from 'next';
import Product from '../../models/product-model';
import { useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../../services/productsApi';
import Spinner from '../../components/Layout/Spinner';


const Index: NextPage | React.FC<Product> = () => {
	const { data, isFetching, error } = useGetAllProductsQuery('');
	return (
		<Container>
			{error && <p>Something went wrong. Try again later.</p>}
			{isFetching && <Spinner/>}
			{!isFetching && !error && (
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
							<MediaCard
								id={item._id}
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
