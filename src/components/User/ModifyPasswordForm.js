import { Alert, Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useUpdateUserPasswordMutation } from '../../services/userApi';
import styles from './ModifyPasswordForm.module.css';

const ModifyPasswordForm = () => {
	const [oldPassword, setOldPassword] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');

	const [updateUserPassword, { isLoading, isSuccess, error, data }] =
		useUpdateUserPasswordMutation();

	async function submitHandler(e) {
		e.preventDefault();

		try {
			await updateUserPassword({
				oldPassword,
				password1,
			}).unwrap();
		} catch (error) {
			//
		}
	}
	return (
		<Container className={styles.main}>
			<form onSubmit={submitHandler} className={styles.form}>
				{error && <Alert severity="error">{error.data.message}</Alert>}
				{data && isSuccess && <Alert severity="success">{data.message}</Alert>}
				<TextField
					required
					id="old-password"
					label="Old Password"
					placeholder="Old Password"
					variant="outlined"
					type="password"
					className={styles.textfield}
					onChange={(e) => setOldPassword(e.target.value)}
				></TextField>
				<TextField
					required
					id="new-password"
					label="New Password"
					placeholder="New Password"
					variant="outlined"
					type="password"
					className={styles.textfield}
					onChange={(e) => setPassword1(e.target.value)}
					helperText={'Password must be at least 7 characters.'}
				></TextField>
				<TextField
					required
					id="password2"
					label="Confirm your password"
					placeholder="Confirm your password"
					variant="outlined"
					type="password"
					autoComplete="current-password"
					className={styles.textfield}
					onChange={(e) => setPassword2(e.target.value)}
				></TextField>
				<Button
					type="submit"
					variant="contained"
					color="success"
					size="large"
					className={styles.button}
				>
					Submit
				</Button>
			</form>
		</Container>
	);
};

export default ModifyPasswordForm;
