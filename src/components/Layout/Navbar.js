import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CustomizedBadges from '../Products/Badge';
import { useSelector } from 'react-redux';
import { useSession, signOut } from 'next-auth/client';

import {
	Typography,
	Link as MLink,
	Menu,
	MenuItem,
	Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from './Navbar.module.css';


const Navbar = () => {
	const items = useSelector((state) => state.cart.cart.cartItems);
	const [cartItems, setCartItems] = useState(0);
	const [session, loading] = useSession();
	const [anchorEl, setAnchorEl] = React.useState(null);

	useEffect(() => {
		let temp = 0;
		items.map((item) => {
			temp += [item].reduce((a, c) => a + c.quantity, 0);
		});
		setCartItems(temp);
	}, [items, cartItems]);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		signOut()
	}

	return (
		<nav className={styles.navbar}>
			<Link href="/" passHref={true}>
				<MLink underline="hover" color="none">
					<Typography variant="h5" className={styles['navbar-logo']}>
						SHOP
					</Typography>
				</MLink>
			</Link>
			<Link href="/products" passHref={true}>
				<MLink underline="hover" color="none">
					<Typography variant="h5" className={styles['navbar-logo']}>
						PRODUCTS
					</Typography>
				</MLink>
			</Link>
			<ul className={styles['navbar-items']}>
				{!session && !loading && (
					<Link href="/login" passHref={true}>
						<MLink underline="hover" color="none">
							<Typography variant="h6">
								<PersonIcon /> Login
							</Typography>
						</MLink>
					</Link>
				)}
				{/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> */}
				{session && (
					<>
						<Button
							disableElevation={true}
							color="inherit"
							onClick={handleMenu}
							// onMouseOver={() => setAnchorEl(true)}
						>
							<Typography variant="h6">Hello, {session.user.name}</Typography>
						</Button>
						<Menu
							sx={{marginTop: 7}}
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
							<CustomizedBadges value={cartItems}></CustomizedBadges>
						</Typography>
					</MLink>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
