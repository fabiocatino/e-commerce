import React, { useState } from 'react';
import {
	TextField,
	Container,
	Typography,
	Button,
	Link as Mlink,
	Alert,
} from '@mui/material';
import styles from './LoginForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { result } from 'lodash';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	async function submitHandler(e) {
		e.preventDefault();

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (!result.error) {
			router.replace('/');
		} else if (result.error) {
			setError(result.error);
		}
	}

	return (
		<Container className={styles.main}>
			<form onSubmit={submitHandler} className={styles.form}>
				{error && <Alert severity="error">{error}</Alert>}
				<TextField
					autoComplete="true"
					required
					id="email"
					label="Email"
					placeholder="Email"
					variant="outlined"
					className={styles.textfield}
					onChange={(e) => setEmail(e.target.value.toLowerCase())}
				></TextField>
				<TextField
					required
					id="password"
					label="Password"
					placeholder="Password"
					variant="outlined"
					type="password"
					className={styles.textfield}
					onChange={(e) => setPassword(e.target.value)}
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
				<Typography variant="subtitle1" className={styles.subtitle}>
					Don&apos;t have an account yet?
					<Link href="/user/signup" passHref={true}>
						<Mlink>Sign up</Mlink>
					</Link>
				</Typography>
			</form>
		</Container>
	);
};

export default LoginForm;
