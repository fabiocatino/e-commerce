import Image from 'next/image';
import ImageCarousel from '../src/components/Products/ImageCarousel';
import styles from './Home.module.css';



const IndexPage = () => {

	return (
		<div className={styles.container}>
			 <ImageCarousel ></ImageCarousel>
	 </div>
	);
};

export default IndexPage;
