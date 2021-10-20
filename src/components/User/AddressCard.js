import {
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
import {
	useAddAddressMutation,
	useUpdateUserAddressMutation,
} from '../../services/userApi';

export default function AddressCard(props) {
	const [
		updateUserAddress,
		{
			data: updatedAddressData,
			isLoading: isUpdatedAddressLoading,
			isSuccess: isSuccessUpdatedAddress,
			error: isErrorUpdatedAddress,
		},
	] = useUpdateUserAddressMutation();
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

	// const editHandler = (index) => () => {
	// 	console.log(index);
	// };

	return (
		<Card
			sx={{
				minWidth: 275,
				height: '186.89px',
				border: '1px solid #b7b9bb',
				borderRadius: '8px',
			}}
		>
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
