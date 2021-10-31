import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useDispatch } from 'react-redux';
import Spinner from '../../src/components/Layout/Spinner';
import ProductRating from '../../src/components/Products/ProductRating';
import BasicSelect from '../../src/components/Products/Select';
import TabPanel from '../../src/components/Products/Tabs';
import { cartActions } from '../../src/services/cartSlice';
import { useGetProductQuery } from '../../src/services/productsApi';
import styles from './Product.module.css';

const Product = () => {
	const router = useRouter();
	const itemId = router.query.product;
	const { data, isLoading, error } = useGetProductQuery(itemId);
	const [quantity, setQuantity] = useState(0);
	const dispatch = useDispatch();

	const setItemQuantity = (quantity) => {
		setQuantity((prevQuantity) => prevQuantity + quantity);
	};

	const addToCartHandler = () => {
		dispatch(
			cartActions.addItem({ ...data, quantity: quantity === 0 ? 1 : quantity })
		);
	};

	return (
		<Container maxWidth="lg">
			{error && <p>Something went wrong. Try again later.</p>}
			{isLoading && <Spinner />}
			{!isLoading && !error && (
				<Grid container className={styles.container}>
					<Grid item xs={12} sm={12} md={4} lg={5} className={styles.left}>
						<div className={styles.gallery}>
							<ImageGallery
								originalAlt="product"
								thumbnailAlt="product"
								showBullets={true}
								showFullscreenButton={false}
								showNav={true}
								showPlayButton={false}
								items={data.secondary_images.map((image) => ({
									original: image,
									thumbnail: image,
									originalWidth: 300,
									originalHeight: 300,
								}))}
							></ImageGallery>
						</div>
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
						<Stack direction="row" spacing={2}>
							<Button
								variant="contained"
								className={styles['add-to-cart-button']}
								size="large"
								sx={{ borderRadius: 50 }}
								onClick={addToCartHandler}
							>
								ADD TO CART
							</Button>
						</Stack>
					</Grid>
					<Container className={styles['bottom-section']}>
						<TabPanel data={data}></TabPanel>
					</Container>
				</Grid>
			)}
		</Container>
	);
};

export default Product;
