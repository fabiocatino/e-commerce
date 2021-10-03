import { Container, Grid } from '@mui/material';
import React from 'react';
import MediaCard from '../../components/Products/Card';
import style from './Index.module.css';
import type { NextPage } from 'next';
import Product from '../../models/product-model';

const Index:
	| NextPage
	| React.FC<{
			img: string;
			title: string;
			description: string;
			price: number;
			rating: number;
	  }> = (props) => {
	return (
		<Container>
			<Grid container className={style.main}>
				{props.products.map((item) => (
					<Grid
						item
						xs={6}
						sm={5}
						md={3}
						lg={3}
						key={item.id}
						className={style.card}
					>
						<MediaCard
							img={item.img}
							title={item.name}
							description={item.description}
							price={item.price}
							rating={item.rating}
						></MediaCard>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Index;

export async function getStaticProps(context) {
	const products: {
		id: number;
		img: string;
		name: string;
		description: string;
		price: number;
		rating: number;
	}[] = [
		{
			id: 1,
			img: 'https://m.media-amazon.com/images/I/4177FAVpp2L._AC_.jpg',
			name: 'Phone',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
			price: 199.99,
			rating: 4,
		},
		{
			id: 2,
			img: 'https://images.samsung.com/is/image/samsung/p6pim/it/ue32t5372cuxzt/gallery/it-fhd-t5300-ue32t5372cuxzt-416407914?$684_547_PNG$',
			name: 'TV',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
			price: 2100,
			rating: 3,
		},
		{
			id: 3,
			img: 'https://image.freepik.com/free-psd/three-dimensional-image-computer_53876-1610.jpg',
			name: 'Computer',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
			price: 499.99,
			rating: 2,
		},
		{
			id: 4,
			img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQ052?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1495129815011',
			name: 'Keyboard',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
			price: 50.99,
			rating: 1,
		},
		{
			id: 5,
			img: 'https://www.telefonino.net/app/uploads/2021/04/ps5-1060x663.jpg',
			name: 'Playstation 5',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
			price: 499,
			rating: 5,
		},
		{
			id: 6,
			img: 'https://realplaza.vtexassets.com/arquivos/ids/16611831-1200-auto?width=1200&height=auto&aspect=true',
			name: 'Mouse',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, excepturi?',
			price: 120,
			rating: 2,
		},
	];

	return {
		props: {
			products: products,
		},
		revalidate: 1,
	};
}
