import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import AddressForm from './AddressForm';
import styles from './EditAddressModal.module.css';

export default function EditAddressModal(props) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={styles.container}>
					<AddressForm
						_id={props._id}
						onClose={handleClose}
						isEditing={true}
					></AddressForm>
				</Box>
			</Modal>
			<Button size="small" onClick={handleOpen}>
				Edit
			</Button>
		</div>
	);
}
