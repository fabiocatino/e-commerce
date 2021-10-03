import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './Card.module.css';
import ProductRating from './ProductRating';
import Product from '../../models/product-model';

const MediaCard: React.FC<{
	img: string;
	title: string;
	description: string;
	price: number;
	rating: number;
}> = (props) => {
	return (
		<Card elevation={1} sx={{ maxWidth: 300 }}>
			<CardMedia component="img" height="140" image={props.img} alt="img" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{props.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{props.description}
				</Typography>
				<div className={style.price}>
					<ProductRating rating={props.rating} />
					<Typography variant="h5" color="text.primary">
						£{props.price.toFixed(2)}
					</Typography>
				</div>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
				<Button size="small">ADD TO CART</Button>
			</CardActions>
		</Card>
	);
};

export default MediaCard;
