import {
	Container,
	Grid,
	Pagination,
	PaginationItem,
	Link,
} from '@mui/material';
import React, { useState } from 'react';
import Spinner from '../../src/components/Layout/Spinner';
import MediaCard from '../../src/components/Products/Card';
import { useGetProductsByPageQuery } from '../../src/services/productsApi';
import styles from './Index.module.css';
import { useRouter } from 'next/router';

const Index = () => {
	const router = useRouter();

	const [page, setPage] = useState(1);
	const { data, isLoading, error } = useGetProductsByPageQuery(page);

	const handlePaginationChange = (e, value) => {
		e.preventDefault();
		setPage(value);
		router.push(`/products?page=${value}`);
	};

	return (
		<Container>
			{error && <p>Something went wrong. Try again later.</p>}
			{isLoading && <Spinner />}
			{!isLoading && !error && (
				<>
					<Grid container className={styles.main}>
						{data.docs.map((item) => (
							<Grid
								item
								xs={6}
								sm={5}
								md={3}
								lg={3}
								key={item._id}
								className={styles.card}
							>
								<MediaCard {...item}></MediaCard>
							</Grid>
						))}
					</Grid>
					<div className={styles.pagination}>
						<Pagination
							color="primary"
							page={page}
							onChange={handlePaginationChange}
							count={data.totalPages}
							variant="outlined"
							renderItem={(item) => (
								<PaginationItem
									component={Link}
									href={`/products${
										item.page === 1 ? '' : `?page=${item.page}`
									}`}
									{...item}
								/>
							)}
						></Pagination>
					</div>
				</>
			)}
		</Container>
	);
};

export default Index;

// export async function getServerSideProps(req) {
// 	const { pageNumber = 1 } = req.query;
// 	// console.log(parseInt(page));

// 	return {
// 		props: {
// 			pageNumber,
// 		},
// 	};
// }
