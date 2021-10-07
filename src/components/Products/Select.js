import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetProductQuery } from '../../services/productsApi';
import { useRouter } from 'next/router';

export default function BasicSelect(props) {
	const router = useRouter();
	const itemId = router.query.product;
	const { data } = useGetProductQuery(itemId);

	const [number, setNumber] = useState(0);

	const handleChange = (e) => {
		props.onGetQuantity(e.target.value);
		setNumber(e.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Quantity</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={number}
					label="Quantity"
					onChange={handleChange}
				>
					{[...Array(data.countInStock).keys()].map((item) => (
						<MenuItem key={item + 1} value={item ? item + 1 : 0}>
							{item + 1}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}
