import React from 'react';
import ImageGallery from 'react-image-gallery';
import styles from './ImageCarousel.module.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';

const images = [
	{
		original: '/images/-11598236451d0gwytkgrv.png',
		originalHeight: 400,
	},
	{
		original: '/images/4177FAVpp2L._AC_.png',
		originalHeight: 400,
	},
];

const ImageCarousel = () => {
	return (
		<div className={styles.container}>
			<div className={styles.transition}>
				<Typography color='white'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</Typography>
				<Link href="/products" passHref={true}>
					<Button className={styles.button} variant="contained">
						Shop now
					</Button>
				</Link>
			</div>
			<div className={styles['image-gallery']}>
				<ImageGallery
					showBullets={false}
					showFullscreenButton={false}
					showNav={false}
					items={images}
					showPlayButton={false}
					autoPlay={true}
					slideDuration={500}
					slideInterval={8000}
					disableSwipe={false}
				/>
			</div>
		</div>
	);
};

export default ImageCarousel;
