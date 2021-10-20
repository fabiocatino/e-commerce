import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './EditAddressModal.module.css';
import AddressForm from './AddressForm';

export default function EditAddressModal(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>Edit</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={styles.container}>
					<AddressForm _id={props._id} isEditing={true}></AddressForm>
					{/* <Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography> */}
				</Box>
			</Modal>
		</div>
	);
}
