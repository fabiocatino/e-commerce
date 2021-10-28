import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Link as MLink } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import RoomIcon from '@mui/icons-material/Room';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary">
			{'Copyright © '}
			<Link color="inherit" href="https://www.linkedin.com/in/fabio-catino/">
				Fabio Catino
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function StickyFooter() {
	return (
		<Box className={styles.main}>
			<CssBaseline />
			<Container
				component="main"
				sx={{ mt: 8, mb: 2 }}
				maxWidth="sm"
			></Container>
			<Box
				component="footer"
				className={styles.footer}
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[200]
							: theme.palette.grey[800],
				}}
			>
				<Container className={styles['footer-content']}>
					<div className={styles['footer-grid']}>
						<div className={styles['first-column']}>
							<div style={{ display: 'flex', gap: 10 }}>
								<RoomIcon />
								<div>
									<Typography variant="h6">Location </Typography>
									<Typography variant="body1">London, UK</Typography>
								</div>
							</div>
							<div style={{ display: 'flex', gap: 10 }}>
								<ContactPhoneIcon />
								<div>
									<Typography variant="h6">Contact Us </Typography>
									<Typography variant="body1">12345678</Typography>
								</div>
							</div>

							<Link href="mailto:fabivs9@gmail.com" passHref={true}>
								<MLink
									target="_blank"
									rel="noopener noreferrer"
									underline="none"
									color="inherit"
									variant="subtitle2"
								>
									<div style={{ display: 'flex', gap: 10 }}>
										<EmailIcon />
										<div>
											<Typography variant="h6">Email</Typography>
											<Typography variant="body1">fabivs9@gmail.com</Typography>
										</div>
									</div>
								</MLink>
							</Link>

							<Copyright />
						</div>

						<div className={styles['second-column']}>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Your Account
							</Typography>
							<Link
								href="/user/account/details/"
								target="_blank"
								passHref={true}
							>
								<MLink
									target="_blank"
									rel="noopener noreferrer"
									underline="hover"
									color="inherit"
									variant="subtitle2"
								>
									Personal info
								</MLink>
							</Link>
							<Link href="/user/account/orders/" passHref={true}>
								<MLink
									underline="hover"
									target="_blank"
									rel="noopener noreferrer"
									color="inherit"
									variant="subtitle2"
								>
									Orders
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Credit slips
								</MLink>
							</Link>
							<Link href="/user/account/addresses/" passHref={true}>
								<MLink
									underline="hover"
									target="_blank"
									rel="noopener noreferrer"
									color="inherit"
									variant="subtitle2"
								>
									Addresses
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									My Wishlists
								</MLink>
							</Link>
						</div>
						<div className={styles['third-column']}>
							<Typography variant="h6">Information</Typography>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Delivery
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									About Us
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Secure Payment
								</MLink>
							</Link>
							<Link href="mailto:fabivs9@gmail.com" passHref={true}>
								<MLink
									target="_blank"
									rel="noopener noreferrer"
									underline="hover"
									color="inherit"
									variant="subtitle2"
								>
									Contact Us
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Legal Notice
								</MLink>
							</Link>
						</div>
						<div className={styles['fourth-column']}>
							<Typography variant="h6">Product</Typography>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Price Drops
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									New Products
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Best Sales
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Returns
								</MLink>
							</Link>
							<Link href="#" passHref={true}>
								<MLink underline="hover" color="inherit" variant="subtitle2">
									Stores
								</MLink>
							</Link>
						</div>
					</div>
				</Container>
			</Box>
		</Box>
	);
}
