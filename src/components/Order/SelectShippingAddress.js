import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAddressesQuery } from '../../../src/services/userApi';
import { checkoutAction } from '../../services/checkoutSlice';

export default function SelectShippingAddress() {
	const router = useRouter();
	const { data, isError, isLoading } = useGetAddressesQuery();
	const [address, setAddress] = useState('');
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);

	const changeHandler = (event) => {
		setAddress(event.target.value);
	};

	const addressHandler = async (address) => {
		router.push('/order/checkout', '/order/checkout/step=2');
		dispatch(checkoutAction.nextStep(step + 1));
		dispatch(
			checkoutAction.addShippingInfo({
				shippingInfo: address,
			})
		);
	};
	return (
		<>
			{!isLoading && (
				<div>
					<FormControl sx={{ m: 1, minWidth: 120, width: 320 }}>
						<Select
							onChange={changeHandler}
							value={address}
							displayEmpty
							inputProps={{ 'aria-label': 'Choose saved address' }}
						>
							<MenuItem disabled value="">
								<em>Choose saved address</em>
							</MenuItem>
							{data.map((address) => (
								<MenuItem
									onClick={() => addressHandler(address)}
									key={address._id}
									value={address.address}
								>
									{address.firstName} {address.lastName}, {address.address}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			)}
		</>
	);
}
