import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import { Container, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import React, { useState } from 'react';
import ModifyDetailsForm from '../../src/components/User/ModifyDetailsForm';
import ModifyPasswordForm from '../../src/components/User/ModifyPasswordForm';
import styles from './Details.module.css';

export default function Details() {
	const [openAccoutInfo, setOpenAccountInfo] = useState(false);
	const [openChangePassword, setOpenChangePassword] = useState(false);

	const changeInfoHandler = () => {
		setOpenAccountInfo(!openAccoutInfo);
	};

	const changePasswordHandler = () => {
		setOpenChangePassword(!openChangePassword);
	};

	return (
		<Container className={styles.container}>
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
					{openAccoutInfo ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openAccoutInfo} timeout="auto" unmountOnExit>
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
						<ModifyPasswordForm onSubmit={() => setOpenChangePassword(false)} />
					</List>
				</Collapse>
			</List>
		</Container>
	);
}
