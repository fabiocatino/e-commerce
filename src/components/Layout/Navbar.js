import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CustomizedBadges from '../Products/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { useSession, signOut } from 'next-auth/react';
import {
	Typography,
	Link as MLink,
	Menu,
	MenuItem,
	Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from './Navbar.module.css';
import { useTotalQuantity } from '../../services/cartSlice';

const Navbar = () => {
	const itemsQuantity = useTotalQuantity();
	const { data: session, status } = useSession();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		signOut();
	};


	return (
		<nav className={styles.navbar}>
			<Link href="/" passHref={true}>
				<MLink underline="hover" color="none">
					<Typography variant="h5">SHOP</Typography>
				</MLink>
			</Link>
			<Link href="/products" passHref={true}>
				<MLink underline="hover" color="none">
					<Typography variant="h5">PRODUCTS</Typography>
				</MLink>
			</Link>
			<ul className={styles['navbar-items']}>
				{!session && status !== 'loading' && (
					<Link href="/login" passHref={true}>
						<MLink underline="hover" color="none">
							<Typography variant="h6">
								<PersonIcon /> Login
							</Typography>
						</MLink>
					</Link>
				)}

				{session && (
					<>
						<Button
							disableElevation={true}
							color="inherit"
							onClick={handleMenu}
						>
							<Typography variant="h6">Hello, {session.user.name}</Typography>
						</Button>
						<Menu
							sx={{ marginTop: 7 }}
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</Menu>{' '}
					</>
				)}
				<Link href="/cart" passHref={true}>
					<MLink underline="hover" color="none">
						<Typography variant="h6">
							<CustomizedBadges></CustomizedBadges>
						</Typography>
					</MLink>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
