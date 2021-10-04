import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Divider, Grid, Typography } from '@mui/material';
import Product from '../../models/product-model';
import Image from 'next/image';
import styles from './Product.module.css';
import ProductRating from '../../components/Products/ProductRating';
import TabPanel from '../../components/Products/Tabs';
import ColorButtons from '../../components/Button';
import { useGetProductQuery } from '../../services/productsApi';
import ImageGallery from 'react-image-gallery';
import Spinner from '../../components/Layout/Spinner';

const product: NextPage | React.FC<Product> = () => {
	const router = useRouter();
	const itemId: any = router.query.product;
	const { data, isFetching, error } = useGetProductQuery(itemId);
	return (
		<Container maxWidth="lg">
			{error && <p>Something went wrong. Try again later.</p>}
			{isFetching && <Spinner/>}
			{!isFetching && !error && (
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={6} className={styles.left}>
						<Image
							src={`http://127.0.0.1:8000${data.image}`}
							height={500}
							width={500}
						/>
						{/* <ImageGallery
							items={[{ original: `http://127.0.0.1:8000${data.image}` }]}
						></ImageGallery> */}
					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={6} className={styles.right}>
						<Typography className={styles['product-name']} variant="h4">
							{data.name}
						</Typography>
						<ProductRating
							readOnly={true}
							rating={parseFloat(data.rating)}
						></ProductRating>
						<Typography variant="h4">£{data.price}</Typography>
						<Typography variant="body1">{data.description}</Typography>
						{/* <Divider sx={{ paddingTop: 5 }} /> */}
						<ColorButtons></ColorButtons>
					</Grid>

					<Container className={styles['bottom-section']}>
						<TabPanel></TabPanel>
					</Container>
				</Grid>
			)}
		</Container>
	);
};

export default product;
