import React from 'react';
import { useForm } from 'react-hook-form';
import {
	TextField,
	Typography,
	Select,
	Container,
	Grid,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data);
	console.log(errors);

	return (
		// <Container>
		<Grid className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid item sm={12} mg={12} lg={12}>
					<TextField
						id="firstd-name"
						label="First Name"
						type="text"
						fullWidth
						placeholder="First Name"
						{...register('First Name', { required: true })}
					/>
					<TextField
						id="last-name"
						label="Last Name"
						type="text"
						fullWidth
						placeholder="Last Name"
						{...register('Last Name', { required: true })}
					/>
					{/* </div> */}
				</Grid>
				<div>
					<Grid item sm={12} mg={12} lg={12}>
						<FormControl fullWidth className={styles.select}>
							<InputLabel id="demo-simple-select-autowidth-label">
								Select a Country
							</InputLabel>
							<Select
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value=""
								// onChange={handleChange}
								fullWidth={true}
								label="Select a Country"
							>
								<MenuItem value=""></MenuItem>
								<MenuItem value={10}>Twenty</MenuItem>
								<MenuItem value={21}>Twenty one</MenuItem>
								<MenuItem value={22}>Twenty one and a half</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</div>
				<div>
					<TextField
						type="text"
						placeholder="Streed Address"
						fullWidth
						{...register('Streed Address', { required: true })}
					/>
				</div>
				<div>
					<TextField
						type="text"
						placeholder="Town/City"
						fullWidth
						{...register('Town/City', { required: true })}
					/>
				</div>
				<TextField
					type="text"
					placeholder="State / County"
					fullWidth
					{...register('State / County', { required: true })}
				/>
				<div>
					<TextField
						type="text"
						placeholder="Postcode / ZIP"
						fullWidth
						{...register('Postcode / ZIP', { required: true })}
					/>
				</div>
				<div>
					<TextField
						type="tel"
						placeholder="Mobile number"
						fullWidth
						{...register('Mobile number', {
							required: true,
							minLength: 6,
							maxLength: 12,
						})}
					/>
					<TextField
						type="email"
						placeholder="Email Address"
						fullWidth
						{...register('Email Address', { required: true })}
					/>
				</div>
				<TextField type="submit" />
			</form>
		</Grid>
		// </Container> */
	);
}
