import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAddressesQuery } from '../../../src/services/userApi';
import { checkoutAction } from '../../services/checkoutSlice';

export default function SelectShippingAddress() {
	const { data, isError, isLoading } = useGetAddressesQuery();
	const [address, setAddress] = useState('');
	const dispatch = useDispatch();
	const step = useSelector((state) => state.checkout.currentStep);

	const addressHandler = async (address) => {
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
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<Select
							value={address}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
						>
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
						<FormHelperText>Choose saved address</FormHelperText>
					</FormControl>
				</div>
			)}
		</>
	);
}
