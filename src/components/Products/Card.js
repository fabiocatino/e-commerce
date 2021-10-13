import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './Card.module.css';
import ProductRating from './ProductRating';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../services/cartSlice';
import { useGetProductQuery } from '../../services/productsApi';

const MediaCard = (props) => {
	const dispatch = useDispatch();
	const item = useGetProductQuery(props._id);
	const addToCartHandler = () => {
		dispatch(cartActions.addItem({ ...item.data, quantity: 1 }));
	};
	return (
		<Card elevation={1} sx={{ maxWidth: 300 }}>
			<CardMedia component="img" height="140" image={props.image} alt="img" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{props.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{props.description}
				</Typography>
				<div className={style.price}>
					<ProductRating readOnly={true} rating={parseFloat(props.rating)} />
					<Typography variant="h5" color="text.primary">
						£{props.price}
					</Typography>
				</div>
			</CardContent>
			<CardActions>
				<Link href={`/products/${props._id}`}>
					<Button size="small">Learn More</Button>
				</Link>
				<Button onClick={addToCartHandler} size="small">
					ADD TO CART
				</Button>
			</CardActions>
		</Card>
	);
};

export default MediaCard;
