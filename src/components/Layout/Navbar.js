import PersonIcon from '@mui/icons-material/Person';
import {
	Button,
	Link as MLink,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import CustomizedBadges from '../Products/Badge';
import CategoriesMenu from './CategoriesMenu';
import styles from './Navbar.module.css';
import SearchBar from './SearchBar';

const Navbar = () => {
	const { data: session, status } = useSession();
	const [anchorEl, setAnchorEl] = useState(null);

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
			<div className={styles.leftSide}>
				<Link href="/" passHref={true}>
					<MLink variant="h5" underline="none" color="none">
						SHOP
					</MLink>
				</Link>
				<CategoriesMenu></CategoriesMenu>
				<Link href="/" passHref={true}>
					<MLink variant="body1" underline="none" color="none">
						<strong>Contact Us</strong>
					</MLink>
				</Link>
			</div>

			<div className={styles.searchbar}>
				<SearchBar />
			</div>
			<ul className={styles['navbar-items']}>
				{!session && status !== 'loading' && (
					<Link href="/user/login" passHref={true}>
						<MLink variant="h6" underline="none" color="none">
							<PersonIcon /> Login
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
							<Typography sx={{ textTransform: 'capitalize' }} variant="body1">
								Hello, {session.user.name}
							</Typography>
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
							<MenuItem>
								<Link href="/user/account"> My account</Link>
							</MenuItem>
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</Menu>
					</>
				)}
				<Link href="/user/cart" passHref={true}>
					<MLink underline="hover" color="none">
						<CustomizedBadges></CustomizedBadges>
					</MLink>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
