import { Alert, Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useUpdateUserInfoMutation } from '../../services/userApi';
import styles from './ModifyDetailsForm.module.css';

const ModifyDetailsForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [updateUserInfo, { isLoading, isSuccess, error, data }] =
		useUpdateUserInfoMutation();

	async function submitHandler(e) {
		e.preventDefault();

		try {
			await updateUserInfo({
				name,
				email,
			}).unwrap();
		} catch (error) {
			console.log(error.data);
		}
	}

	return (
		<Container className={styles.main}>
			<form onSubmit={submitHandler} className={styles.form}>
				{error && <Alert severity="error">{error.data.message}</Alert>}
				{data && isSuccess && <Alert severity="success">{data.message}</Alert>}
				<TextField
					autoComplete="given-name"
					type="text"
					required
					id="name"
					label="Name"
					placeholder="Name"
					variant="outlined"
					className={styles.textfield}
					onChange={(e) => setName(e.target.value)}
				></TextField>
				<TextField
					autoComplete="email"
					type="email"
					required
					id="email"
					label="Email"
					placeholder="Email"
					variant="outlined"
					pattern="/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,4}/"
					className={styles.textfield}
					onChange={(e) => setEmail(e.target.value.toLowerCase())}
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

export default ModifyDetailsForm;
