import {
	Alert,
	Button,
	Container,
	Link as Mlink,
	TextField,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAddUserMutation } from '../../services/userApi';
import styles from './SignupForm.module.css';
import { signIn } from 'next-auth/react';
import Spinner from '../Layout/Spinner';

const SignupForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState(undefined);
	const router = useRouter();

	const [addUser, { isError, error, isLoading }] = useAddUserMutation();

	async function submitHandler(e) {
		e.preventDefault();

		try {
			await addUser({
				name,
				email,
				password1,
				password2,
			}).unwrap();
			await signIn('credentials', {
				callbackUrl: '/',
				redirect: true,
				email,
				password: password1,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function loginAfterSignginIn() {
		try {
			await signIn('credentials', {
				callbackUrl: '/',
				redirect: true,
				email,
				password: password1,
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		loginAfterSignginIn();
	}, [isLoading, error]);

	return (
		<Container className={styles.main}>
			<form onSubmit={submitHandler} className={styles.form}>
				{isLoading && <Spinner />}
				{!isLoading && isError && (
					<Alert severity="error">{error.data.message}</Alert>
				)}
				<TextField
					autoComplete="given-name"
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
					required
					id="email"
					label="Email"
					placeholder="Email"
					variant="outlined"
					className={styles.textfield}
					onChange={(e) => setEmail(e.target.value.toLowerCase())}
				></TextField>
				<TextField
					autoComplete="new-password"
					required
					id="password1"
					label="Password"
					placeholder="Password"
					variant="outlined"
					type="password"
					helperText={'Password must be at least 7 characters.'}
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
					size="large"
					className={styles.button}
				>
					Submit
				</Button>
				<Typography variant="subtitle1" className={styles.subtitle}>
					Already have an account?
					<Link href="/user/login" passHref={true}>
						<Mlink>Log in</Mlink>
					</Link>
				</Typography>
			</form>
		</Container>
	);
};

export default SignupForm;
