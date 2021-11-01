import { Container } from '@mui/material';
import { getSession } from 'next-auth/react';
import React from 'react';
import LoginForm from '../../src/components/User/LoginForm';

const Login = () => {
	return (
		<Container sx={{height: '100vh'}}>
			<LoginForm></LoginForm>
		</Container>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}

export default Login;
