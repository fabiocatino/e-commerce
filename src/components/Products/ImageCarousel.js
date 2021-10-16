import React from 'react';
import ImageGallery from 'react-image-gallery';
import styles from './ImageCarousel.module.css';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
	{
		original: '/images/ps5-1060x663.jpg',
	},
	{
		original: '/images/three-dimensional-image-computer_53876-1610.jpg',
	},
];

const ImageCarousel = () => {
	return (
		<div className={styles.container}>
			<ImageGallery
				className={styles.carousel}
				showBullets={true}
				showFullscreenButton={false}
				showNav={false}
				items={images}
				showPlayButton={false}
				autoPlay={true}
				slideDuration={500}
			/>
		</div>
	);
};

export default ImageCarousel;
