import {
	Container,
	Grid,
	Link,
	Pagination,
	PaginationItem,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState, Suspense } from 'react';
import Spinner from '../../src/components/Layout/Spinner';
import MediaCard from '../../src/components/Products/Card.client';
import { useGetProductsByPageQuery } from '../../src/services/productsApi';
import styles from './Index.module.css';

function Items() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const { data, isLoading, error } = useGetProductsByPageQuery({
		page: 1,
		category: '',
	});

	const handlePaginationChange = (e, value) => {
		e.preventDefault();
		setPage(value);
		router.push(`/products?page=${value}`);
	};

	return (
		<Container>
			{/* {error && <p>Something went wrong. Try again later.</p>}
			{isLoading && <Spinner />} */}
			{!isLoading && !error && (
				<>
					<Grid container className={styles.main}>
						{data.docs.map((item) => (
							<Suspense key={item._id} fallback={<Spinner />}>
								<div key={item._id} className={styles.card}>
									<MediaCard {...item}></MediaCard>
								</div>
							</Suspense>
						))}
					</Grid>
					<div className={styles.pagination}>
						<Pagination
							color="primary"
							page={parseInt(page)}
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
}

export default function Index() {
	return (
		<Suspense fallback={<Spinner />}>
			<Items />
		</Suspense>
	);
}
// export async function getServerSideProps(req) {
// 	const pageNumber = req.query.page ?? 1;
// 	const category = req.query.category ?? '';

// 	return {
// 		props: {
// 			pageNumber,
// 			category,
// 		},
// 	};
// }
