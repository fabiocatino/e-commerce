import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import RemoveAddressModal from './RemoveAddressModal';

const editHandler = (index) => () => {
	console.log(index);
};

export default function AddressCard(props) {
	return (
		<Card sx={{ minWidth: 275, border: '1px solid #b7b9bb'}}>
			<CardContent>
				<Typography sx={{ fontSize: 14, fontWeight: 'bold' }} gutterBottom>
					{props.firstName} {props.lastName}
				</Typography>
				<Typography variant="body1" component="div">
					{props.address}
				</Typography>
				<Typography> {props.country} </Typography>
				<Typography variant="body1">
					Phone Number: {props.phoneNumber}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={editHandler(props.index)}>
					Edit
				</Button>
				<RemoveAddressModal {...props}></RemoveAddressModal>
			</CardActions>
		</Card>
	);
}
