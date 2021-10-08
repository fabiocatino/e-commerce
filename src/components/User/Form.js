import React, { useState } from 'react';
import {
	TextField,
	Container,
	Typography,
	Button,
	Link as Mlink,
} from '@mui/material';
import styles from './Form.module.css';
import Link from 'next/link';
import { useAddUserMutation } from '../../services/userApi';

const Form = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState(undefined);

	const [addUser] = useAddUserMutation();
	function submitHandler(e) {
		e.preventDefault();
		addUser({
			name,
			email,
			password1,
		});
	}

	return (
		<Container className={styles.main}>
			<form onSubmit={submitHandler} className={styles.form}>
				<TextField
					required
					id="name"
					label="Name"
					placeholder="Name"
					variant="outlined"
					className={styles.textfield}
					onChange={(e) => setName(e.target.value)}
				></TextField>
				<TextField
					required
					id="email"
					label="Email"
					placeholder="Email"
					variant="outlined"
					className={styles.textfield}
					onChange={(e) => setEmail(e.target.value)}
				></TextField>
				<TextField
					required
					id="password1"
					label="Password"
					placeholder="Password"
					variant="outlined"
					type="password"
					className={styles.textfield}
					onChange={(e) => setPassword1(e.target.value)}
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
					disabled={password1 === password2 ? false : true}
					size="large"
					className={styles.button}
				>
					Submit
				</Button>
				<Typography variant="subtitle1" className={styles.subtitle}>
					Don't have an account?
					<Link href="/register" passHref={true}>
						<Mlink>Register</Mlink>
					</Link>
				</Typography>
			</form>
		</Container>
	);
};

export default Form;
