import CheckIcon from '@mui/icons-material/Check';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { Container, Typography } from '@mui/material';
import Card from '../src/components/Products/Card';
import ImageCarousel from '../src/components/Products/ImageCarousel';
import { useGetProductsByPageQuery } from '../src/services/productsApi';
import styles from './Home.module.css';

const IndexPage = () => {
	const { data, isLoading, error } = useGetProductsByPageQuery({
		page: 1,
		category: '',
		limit: 3,
	});

	return (
		<div>
			<div className={styles.container}>
				{/* <ImageCarousel></ImageCarousel> */}
			</div>
			<Container className={styles['second-section']}>
				<div>
					<div className={styles.info}>
						<LocalShippingIcon
							sx={{ fontSize: 50, color: '#fd1557', alignSelf: 'center' }}
						/>
						<Typography variant="h6">Free Shipping</Typography>
						<Typography color="text.secondary" variant="caption">
							On all orders in the UK
						</Typography>
					</div>
				</div>
				<div>
					<div className={styles.info}>
						<CheckIcon sx={{ fontSize: 50, color: '#fd1557' }} />
						<Typography variant="h6">Free Returns</Typography>
						<Typography color="text.secondary" variant="caption">
							Returns are free within 30 days
						</Typography>
					</div>
				</div>
				<div>
					<div className={styles.info}>
						<PaymentIcon sx={{ fontSize: 50, color: '#fd1557' }} />
						<Typography variant="h6">100% Payment Secure</Typography>
						<Typography color="text.secondary" variant="caption">
							Your payment is safe with us
						</Typography>
					</div>
				</div>
				<div>
					<div className={styles.info}>
						<LiveHelpIcon sx={{ fontSize: 50, color: '#fd1557' }} />
						<Typography variant="h6">Support 24/7</Typography>
						<Typography color="text.secondary" variant="caption">
							Contact us 24 hours a day
						</Typography>
					</div>
				</div>
			</Container>
			<div className={styles['third-section-title']}>
				<Typography variant="h4">Explore more items</Typography>
			</div>

			{!isLoading && !error && (
				<Container className={styles['third-section']}>
					{data?.docs.map((item) => (
						<Card key={item._id} {...item}></Card>
					))}
				</Container>
			)}
		</div>
	);
};

export default IndexPage;

export async function getStaticProps(context) {
	return {
		props: {},
		revalidate: 10,
	};
}
