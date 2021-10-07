import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import CustomizedBadges from '../Products/Badge';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const items = useSelector((state) => state.cart.cart.cartItems);
	const [cartItems, setCartItems] = useState(0);

	useEffect(() => {
		let temp = 0;
		items.map((item) => {
			temp += [item].reduce((a, c) => a + c.quantity, 0);
		});
		setCartItems(temp);
	}, [items, cartItems]);

	return (
		<nav className={styles.navbar}>
			<Link href="/">
				<Typography variant="h5" className={styles['navbar-logo']}>
					SHOP
				</Typography>
			</Link>
			<Link href="/products">
				<Typography variant="h5" className={styles['navbar-logo']}>
					PRODUCTS
				</Typography>
			</Link>
			<ul className={styles['navbar-items']}>
				<Link href="/cart">
					<Typography variant="h6">
						<CustomizedBadges value={cartItems}></CustomizedBadges>
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
