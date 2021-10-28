import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
	Container,
	Collapse,
	List,
	ListItemButton,
	ListItemText,
	Button,
} from '@mui/material';
import ModifyDetailsForm from '../../../src/components/User/ModifyDetailsForm';
import ModifyPasswordForm from '../../../src/components/User/ModifyPasswordForm';
import styles from './Details.module.css';
import Spinner from '../../../src/components/Layout/Spinner';

export default function Details() {
	const [openAccountInfo, setOpenAccountInfo] = useState(true);
	const [openChangePassword, setOpenChangePassword] = useState(true);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session && status !== 'loading') {
			router.push('/user/login');
		}
	}, [status, router, session]);

	const changeInfoHandler = () => {
		setOpenAccountInfo(!openAccountInfo);
	};

	const changePasswordHandler = () => {
		setOpenChangePassword(!openChangePassword);
	};

	return (
		<Container className={styles.container}>
			{status === 'loading' && <Spinner />}
			{status === 'authenticated' && (
				<List
					className={styles.list}
					component="nav"
					aria-labelledby="nested-list-subheader"
				>
					<Button
						onClick={changeInfoHandler}
						variant="contained"
						sx={{ backgroundColor: '#4F108A', color: 'white' }}
					>
						<ListItemText
							primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }}
							primary="EDIT YOUR ACCOUNT INFORMATION"
						/>
						{openAccountInfo ? <ExpandLess /> : <ExpandMore />}
					</Button>
					<Collapse in={openAccountInfo} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ModifyDetailsForm onSubmit={() => setOpenAccountInfo(false)} />
						</List>
					</Collapse>

					<Button
						onClick={changePasswordHandler}
						variant="contained"
						sx={{ backgroundColor: '#4F108A', color: 'white' }}
					>
						<ListItemText
							primaryTypographyProps={{
								variant: 'body1',
								fontWeight: 'bold',
								color: 'white',
							}}
							primary="CHANGE YOUR PASSWORD"
						/>
						{openChangePassword ? <ExpandLess /> : <ExpandMore />}
					</Button>
					<Collapse in={openChangePassword} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ModifyPasswordForm
								onSubmit={() => setOpenChangePassword(false)}
							/>
						</List>
					</Collapse>
				</List>
			)}
		</Container>
	);
}
