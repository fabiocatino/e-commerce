import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import {
	Button,
	Link as MLink,
	Menu,
	MenuItem,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import CustomizedBadges from '../Products/Badge';
import CategoriesMenu from './CategoriesMenu';
import styles from './Navbar.module.css';
import SearchBar from './SearchBar';
import Image from 'next/image';

const Navbar = () => {
	const { data: session, status } = useSession();
	const [anchorEl, setAnchorEl] = useState(null);
	const [menu, setMenu] = useState(null);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('lg'));

	const handleMenuList = (event) => {
		setMenu(event.currentTarget);
	};

	const handleMenuListClose = () => {
		setMenu(null);
	};

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
					<MLink variant="body1" underline="hover">
						<Image
							priority
							layout="fixed"
							alt="product"
							src="/images/d6f8b88c7ede480cabccbecaf5203237.png"
							height="200"
							width="150"
						></Image>
					</MLink>
				</Link>
				{matches && (
					<>
						<CategoriesMenu></CategoriesMenu>
						<Link href="/" passHref={true}>
							<MLink variant="body1" underline="hover" color="inherit">
								Contact Us
							</MLink>
						</Link>
					</>
				)}

				{!matches && (
					<div className={styles.hamburger}>
						<Button
							classes={{ root: styles['button-root'] }}
							disableElevation={true}
							color="inherit"
							onClick={handleMenuList}
						>
							<Typography className={styles['account-button']} variant="body1">
								<MenuIcon />
							</Typography>
						</Button>
						<Menu
							sx={{ marginTop: 7 }}
							id="menu-appbar"
							anchorEl={menu}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(menu)}
							onClose={handleMenuListClose}
							MenuListProps={{ onMouseLeave: handleMenuListClose }}
						>
							<MenuItem>
								<CategoriesMenu color="black"></CategoriesMenu>
							</MenuItem>
							<MenuItem>
								<Link href="/" passHref={true}>
									<MLink
										sx={{ color: 'black' }}
										variant="body1"
										underline="hover"
									>
										Contact Us
									</MLink>
								</Link>
							</MenuItem>
						</Menu>
					</div>
				)}
			</div>
			<div className={styles.searchbar}>{/* <SearchBar /> */}</div>

			<ul className={styles['navbar-items']}>
				{!session && status !== 'loading' && (
					<div className={styles.login}>
						<Link href="/user/login" passHref={true}>
							<MLink
								className={styles.login}
								variant="body1"
								underline="hover"
								color="inherit"
							>
								<PersonIcon /> Login
							</MLink>
						</Link>
					</div>
				)}

				{session && (
					<>
						<Button
							classes={{ root: styles['button-root'] }}
							disableElevation={true}
							color="inherit"
							onClick={handleMenu}
						>
							{matches ? (
								<Typography
									sx={{ marginRight: 3 }}
									className={styles['account-button']}
									variant="body1"
									color="#FFF"
								>
									Hello, {session.user.name.split(' ')[0]}
								</Typography>
							) : (
								<PersonIcon />
							)}
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
							MenuListProps={{ onMouseLeave: handleClose }}
						>
							<MenuItem>
								<Link href="/user/account/account"> My account</Link>
							</MenuItem>
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</Menu>
					</>
				)}
				<Link href="/user/cart" passHref={true}>
					<MLink underline="hover" color="#fff">
						<CustomizedBadges></CustomizedBadges>
					</MLink>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
