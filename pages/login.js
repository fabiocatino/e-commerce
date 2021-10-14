import { Container } from '@mui/material';
import React from 'react';
import LoginForm from '../src/components/User/LoginForm';
import { getSession } from 'next-auth/react';

const Login = () => {
	return (
		<Container>
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
