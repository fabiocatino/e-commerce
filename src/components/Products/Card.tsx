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
import Link from 'next/link'

const MediaCard: React.FC<Product> = (props) => {
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
				<Link href={`/products/${props.id}`}><Button size="small">Learn More</Button></Link>
				<Button size="small">ADD TO CART</Button>
			</CardActions>
		</Card>
	);
};

export default MediaCard;
