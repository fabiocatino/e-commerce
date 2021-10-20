import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './RemoveAddressModal.module.css';
import { useDeleteAddressMutation } from '../../services/userApi';
import Spinner from '../Layout/Spinner';

export default function RemoveAddressModal(props) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [deleteAddress, { data, isLoading, isSuccess, error }] =
		useDeleteAddressMutation();

	const deleteAddressHandler = (_id) => async () => {
		try {
			await deleteAddress({
				_id,
			}).unwrap();
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{isLoading && <Spinner></Spinner>}
			{!isLoading && !error && (
				<>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box className={styles.container}>
							<div className={styles.header}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									You are about to delete the following address:
								</Typography>
							</div>
							<div className={styles['modal-body']}>
								<Typography
									sx={{ fontSize: 14, fontWeight: 'bold' }}
									gutterBottom
								>
									{props.firstName} {props.lastName}
								</Typography>
								<Typography variant="body1" component="div">
									{props.address}
								</Typography>
								<Typography> {props.country} </Typography>
								<Typography variant="body1">
									Phone Number: {props.phoneNumber}
								</Typography>
							</div>
							<div className={styles.buttons}>
								<Button
									variant="contained"
									size="large"
									color="primary"
									onClick={handleClose}
								>
									Go Back
								</Button>
								<Button
									variant="contained"
									size="large"
									sx={{ backgroundColor: 'red' }}
									onClick={deleteAddressHandler(props._id)}
								>
									Proceed
								</Button>
							</div>
						</Box>
					</Modal>
					<Button size='small' onClick={handleOpen}>Remove</Button>
				</>
			)}
		</div>
	);
}
