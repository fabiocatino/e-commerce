import {
	Autocomplete,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutAction } from '../../services/checkoutSlice';
import { useAddAddressMutation } from '../../services/userApi';
import styles from './CheckoutForm.module.css';
import SelectShippingAddress from './SelectShippingAddress';

export default function CheckoutForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);
	const [checked, setChecked] = useState(false);
	const [addAddress, { data, error }] = useAddAddressMutation();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		router.push('/order/checkout');
		dispatch(checkoutAction.nextStep(step + 1));
		dispatch(
			checkoutAction.addShippingInfo({
				shippingInfo: data,
			})
		);
		if (checked) {
			try {
				await addAddress({
					...data,
				}).unwrap();
			} catch (error) {
				console.log(error);
			}
		}
	};

	//CHECKBOX

	const checkboxHandler = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<Grid className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{step === 0 && (
					<>
						<div>
							<h3>Billing Details</h3>

							<SelectShippingAddress />
						</div>
						<Grid item sm={12} mg={12} lg={12}>
							<Controller
								defaultValue=""
								name="firstName"
								control={control}
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
										autoComplete="given-name"
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
										autoComplete="family-name"
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
										id="address-line-1"
										type="text"
										fullWidth
										placeholder="Address line 1"
										autoComplete="shipping address-line1"
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
								name="address2"
								control={control}
								defaultValue=""
								rules={{
									required: false,
								}}
								render={({ field }) => (
									<TextField
										id="address2"
										type="text"
										fullWidth
										placeholder="Address line 2"
										autoComplete="shipping address-line2"
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
										autoComplete="shipping address-level2"
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
										autoComplete="shipping postal-code"
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

						<Autocomplete
							id="country-select-demo"
							options={countries}
							autoHighlight
							isOptionEqualToValue={(option, value) =>
								option.label === value.label
							}
							getOptionLabel={(option) => option.label}
							renderOption={(props, option) => (
								<Box
									component="li"
									sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
									{...props}
								>
									<img
										loading="lazy"
										width="20"
										src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
										srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
										alt=""
									/>
									{option.label} ({option.code})
								</Box>
							)}
							renderInput={(params) => (
								<TextField
									{...register('country')}
									{...params}
									required
									placeholder="Country"
									fullWidth
									id="country"
									type="text"
									autoComplete="country"
									inputProps={{
										...params.inputProps,
										autoComplete: 'country',
									}}
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
						<div className={styles.checkbox}>
							<FormControlLabel
								control={
									<Checkbox checked={checked} onChange={checkboxHandler} />
								}
								label="Save address"
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
					REVIEW YOUR ORDER
				</Button>
			</form>
		</Grid>
	);
}

const countries = [
	{ code: 'GB', label: 'United Kingdom' },
	{ code: 'IT', label: 'Italy' },
];
