import { Typography } from '@mui/material';
import React from 'react';
import styles from './Navbar.module.css';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

const Navbar: React.FC = () => {
	return (
		<nav className={styles.navbar}>
			<Link href="/">
				<Typography variant="h5" className={styles['navbar-logo']}>
					SHOP
				</Typography>
			</Link>
			<ul className={styles['navbar-items']}>
				<Link href="/">
					<Typography variant="h6">
						<ShoppingBasketIcon /> Cart
					</Typography>
				</Link>
				<Link href="/">
					<Typography variant="h6">
						<PersonIcon /> Login
					</Typography>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
