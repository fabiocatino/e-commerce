import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import React from 'react';
import EditAddressModal from './EditAddressModal';
import RemoveAddressModal from './RemoveAddressModal';
import CheckIcon from '@mui/icons-material/Check';
import { useUpdateUserAddressMutation } from '../../services/userApi';

export default function AddressCard(props) {
	const [updateUserAddress, { data, isLoading, isSuccess, error }] =
		useUpdateUserAddressMutation();
	const onUpdateUserAddress = async () => {
		try {
			await updateUserAddress({
				...props,
				_id: props._id,
				isDefault: true,
			}).unwrap();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card
			sx={{
				minWidth: 275,
				minHeight: '186.89px',
				border: '1px solid #b7b9bb',
				borderRadius: '8px',
			}}
		>
			<CardContent>
				{error && (
					<Alert sx={{ marginBottom: 1 }} severity="error">
						Something went wrong.
					</Alert>
				)}
				<Typography sx={{ fontSize: 14, fontWeight: 'bold' }} gutterBottom>
					{props.firstName} {props.lastName}
				</Typography>
				<Typography variant="body2" component="div">
					{props.address}
				</Typography>
				<Typography variant="body2" component="div">
					{props.address2}
				</Typography>
				<Typography variant="body2" component="div">
					{props.city}
				</Typography>
				<Typography> {props.country} </Typography>
				<Typography variant="body2">
					Phone Number: {props.phoneNumber}
				</Typography>
			</CardContent>
			<CardActions sx={{ padding: 0 }}>
				<EditAddressModal {...props}></EditAddressModal>
				<RemoveAddressModal {...props}></RemoveAddressModal>
				<Button size="small" onClick={() => onUpdateUserAddress()}>
					primary
					{props.isDefault === true && (
						<span style={{ color: 'green', marginLeft: 10 }}>
							<CheckIcon></CheckIcon>
						</span>
					)}
				</Button>
			</CardActions>
		</Card>
	);
}
