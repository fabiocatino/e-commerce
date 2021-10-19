import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import ModifyDetailsForm from '../../src/components/User/ModifyDetailsForm';
import ModifyPasswordForm from '../../src/components/User/ModifyPasswordForm';
import styles from './Details.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../../src/components/Layout/Spinner';

export default function Details() {
	const [openAccountInfo, setOpenAccountInfo] = useState(true);
	const [openChangePassword, setOpenChangePassword] = useState(true);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session && status !== 'loading') {
			router.push('/user/login');
		}
	}, [status]);

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
					<ListItemButton
						onClick={changeInfoHandler}
						sx={{ backgroundColor: '#0090f0' }}
					>
						<ListItemText
							primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }}
							primary="EDIT YOUR ACCOUNT INFORMATION"
						/>
						{openAccountInfo ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openAccountInfo} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ModifyDetailsForm onSubmit={() => setOpenAccountInfo(false)} />
						</List>
					</Collapse>

					<ListItemButton
						onClick={changePasswordHandler}
						sx={{ backgroundColor: '#0090f0' }}
					>
						<ListItemText
							primaryTypographyProps={{ variant: 'body1', fontWeight: 'bold' }}
							primary="CHANGE YOUR PASSWORD"
						/>
						{openChangePassword ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
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
