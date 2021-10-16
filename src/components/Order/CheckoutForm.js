import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutAction } from '../../services/checkoutSlice';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm() {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		dispatch(checkoutAction.nextStep(step + 1));
		dispatch(
			checkoutAction.addShippingInfo({
				shippingInfo: data,
			})
		);
	};

	return (
		<Grid className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{step === 0 && (
					<>
						<h3>Billing Details</h3>
						<Grid item sm={12} mg={12} lg={12}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										required
										id="first-name"
										type="text"
										fullWidth
										placeholder="First Name"
										error={Boolean(errors.firstName)}
										helperText={
											errors.firstName
												? errors.firstName.type === 'minLength'
													? 'First Name too short.'
													: 'First Name required'
												: ''
										}
										{...field}
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										required
										id="last-name"
										type="text"
										fullWidth
										placeholder="Last Name"
										error={Boolean(errors.lastName)}
										helperText={
											errors.lastName
												? errors.lastName.type === 'minLength'
													? 'Last Name too short.'
													: 'Last Name required'
												: ''
										}
										{...field}
									/>
								)}
							/>
						</Grid>
						<div>
							<Controller
								name="address"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										required
										id="street-address"
										type="text"
										fullWidth
										placeholder="Street Address"
										error={Boolean(errors.address)}
										helperText={
											errors.address
												? errors.address.type === 'minLength'
													? 'Please, insert a valid address.'
													: 'Address required.'
												: ''
										}
										{...field}
									/>
								)}
							/>
						</div>
						<div>
							<Controller
								name="city"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										required
										placeholder="Town/City"
										fullWidth
										id="city"
										type="text"
										error={Boolean(errors.city)}
										helperText={
											errors.city
												? errors.city.type === 'minLength'
													? 'Please, insert a valid city.'
													: 'City required.'
												: ''
										}
										{...field}
									/>
								)}
							/>
						</div>
						<div>
							<Controller
								name="postCode"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										required
										placeholder="Postcode / ZIP"
										fullWidth
										id="postCode"
										type="text"
										error={Boolean(errors.postCode)}
										helperText={
											errors.postCode
												? errors.postCode.type === 'minLength'
													? 'Please, insert a valid post code.'
													: 'Postcode required.'
												: ''
										}
										{...field}
									/>
								)}
							/>
						</div>
						<Controller
							name="country"
							control={control}
							defaultValue=""
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									required
									placeholder="State / Country"
									fullWidth
									id="country"
									type="text"
									error={Boolean(errors.country)}
									helperText={
										errors.country
											? errors.country.type === 'minLength'
												? 'Please, insert a valid Country.'
												: 'Country required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						<div>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
								}}
								render={({ field }) => (
									<TextField
										required
										type="tel"
										placeholder="Phone Number"
										fullWidth
										id="phoneNumber"
										error={Boolean(errors.phoneNumber)}
										helperText={
											errors.phoneNumber
												? errors.phoneNumber.type === 'pattern'
													? 'Invalid phone number.'
													: 'Phone number required'
												: ''
										}
										{...field}
									/>
								)}
							/>

							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 2,
									pattern: /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,4}/,
								}}
								render={({ field }) => (
									<TextField
										required
										type="email"
										placeholder="Email Address"
										fullWidth
										id="email"
										error={Boolean(errors.email)}
										helperText={
											errors.email
												? errors.email.type === 'pattern'
													? 'Invalid email address.'
													: 'Email required.'
												: ''
										}
										{...field}
									/>
								)}
							/>
						</div>
					</>
				)}
				<Button
					type="submit"
					variant="contained"
					color="success"
					className={styles['submit-button']}
					size="large"
				>
					SELECT PAYMENT METHOD
				</Button>
			</form>
			{/* // 	type="submit"
				// 	variant="contained"
				// 	color="success"
				// 	className={styles['submit-button']}
				// 	size="large"
				// >
				// 	PLACE YOUR ORDER
				// </Button>  */}
		</Grid>
	);
}