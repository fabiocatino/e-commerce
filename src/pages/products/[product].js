import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './Product.module.css';
import ProductRating from '../../components/Products/ProductRating';
import TabPanel from '../../components/Products/Tabs';
import ColorButtons from '../../components/Button';
import { useGetProductQuery } from '../../services/productsApi';
import ImageGallery from 'react-image-gallery';
import Spinner from '../../components/Layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../services/cartSlice';
import BasicSelect from '../../components/Products/Select';

const product = () => {
	const router = useRouter();
	const itemId = router.query.product;
	const { data, isLoading, error } = useGetProductQuery(itemId);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const setItemQuantity = (quantity) => {
		setQuantity(quantity);
	};

	const addToCartHandler = () => {
		dispatch(cartActions.addItem({ ...data, quantity: quantity }));
	};

	return (
		<Container maxWidth="lg">
			{error && <p>Something went wrong. Try again later.</p>}
			{isLoading && <Spinner />}
			{!isLoading && !error && (
				<Grid container>
					<Grid item xs={12} sm={12} md={6} lg={6} className={styles.left}>
						<Image src={data.image} height={500} width={500} />
						{/* <ImageGallery
							items={[{ original: `http://127.0.0.1:8000${data.image}` }]}
						></ImageGallery> */}
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg={6} className={styles.right}>
						<Typography className={styles['product-name']} variant="h4">
							{data.name}
						</Typography>
						<ProductRating
							readOnly={true}
							rating={parseFloat(data.rating)}
						></ProductRating>
						<Typography variant="h4">£{data.price}</Typography>
						<Typography variant="body1">{data.description}</Typography>
						<BasicSelect
							onGetQuantity={setItemQuantity}
							stock={data.countInStock}
						></BasicSelect>
						<ColorButtons onClick={addToCartHandler}></ColorButtons>
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
