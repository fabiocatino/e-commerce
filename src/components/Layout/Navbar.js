import { Typography, Link as MLink } from '@mui/material';
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
				<Link href="/cart" passHref={true}>
				<MLink underline="hover" color="none">
					<Typography variant="h6">
						<CustomizedBadges value={cartItems}></CustomizedBadges>
					</Typography>
					</MLink>
				</Link>
				<Link href="/login" passHref={true}>
					<MLink underline="hover" color="none">
						<Typography variant="h6">
							<PersonIcon /> Login
						</Typography>
					</MLink>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
