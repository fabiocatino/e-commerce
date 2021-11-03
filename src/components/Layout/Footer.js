import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import RoomIcon from '@mui/icons-material/Room';
import SendIcon from '@mui/icons-material/Send';
import {
	Alert,
	Box,
	Button,
	Container,
	CssBaseline,
	Link as MLink,
	Typography
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './Footer.module.css';

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
	const [showAlert, setShowAlert] = useState(false);
	const [email, setEmail] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		setShowAlert(true);
		setEmail('');
	};

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
					<div className={styles['first-column']}>
						<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
							Your Account
						</Typography>
						<Link href="/user/account/details/" target="_blank" passHref={true}>
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
					<div className={styles['second-column']}>
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
					<div className={styles['third-column']}>
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
					<div className={styles['fourth-column-container']}>
						<div className={styles['fourth-column']}>
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
									<Typography variant="body1">+447593644112</Typography>
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
						</div>
					</div>
					<div className={styles['fifth-column']}>
						<div className={styles['fifth-column-icon']}>
							<MarkunreadOutlinedIcon
								sx={{ fontSize: '50px !important' }}
							></MarkunreadOutlinedIcon>
						</div>
						<div className={styles['fifth-column-text']}>
							<Typography variant="h6">Newsletter</Typography>
							<Typography color="text.secondary" variant="body1">
								Enter your email to stay up to date.
							</Typography>
						</div>
						<div className={styles['fifth-column-form']}>
							{showAlert && (
								<div style={{ paddingBottom: 15 }}>
									<Alert
										className={styles.alert}
										severity="success"
										onClose={() => setShowAlert(false)}
									>
										Signed up!
									</Alert>
								</div>
							)}
							<form onSubmit={submitHandler}>
								<input
									autoComplete="email"
									required
									id="email-footer"
									label="Email"
									placeholder="Email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className={styles.input}
								></input>
								<Button type="submit" className={styles['input-button']}>
									<SendIcon />
								</Button>
							</form>
						</div>
						<div className={styles['fifth-column-social']}>
							<Link
								href="https://www.linkedin.com/in/fabio-catino/"
								passHref={true}
							>
								<MLink target="_blank" rel="noopener noreferrer">
									<LinkedInIcon sx={{ color: '#2867B2 !important' }} />
								</MLink>
							</Link>
							<Link href="https://www.facebook.com/r.riven" passHref={true}>
								<MLink target="_blank" rel="noopener noreferrer">
									<FacebookRoundedIcon sx={{ color: '#3b5999 !important' }} />
								</MLink>
							</Link>
							<Link
								href="https://www.instagram.com/fabiocatino/"
								passHref={true}
							>
								<MLink target="_blank" rel="noopener noreferrer">
									<InstagramIcon sx={{ color: '#cc2366 !important' }} />
								</MLink>
							</Link>
						</div>
					</div>
				</Container>
				<div className={styles.copyright}>
					<Copyright />
				</div>
			</Box>
		</Box>
	);
}
