import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGetProductByNameQuery } from '../../services/productsApi';
import styles from './SearchBar.module.css';

export default function SearchBar() {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [productName, setProductName] = useState('');
	const [search, setSearch] = useState('');
	const loading = open && options.length === 0;
	const {
		data: products,
		error,
		isLoading,
	} = useGetProductByNameQuery(productName, {
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (isLoading) {
			setOptions([]);
		} else {
			setOptions(products || []);
		}
	}, [isLoading, products]);

	useEffect(() => {
		const identifier = setTimeout(() => {
			setProductName(search);
		}, 300);

		return () => {
			clearTimeout(identifier);
		};
	}, [search]);

	return (
		<Autocomplete
			classes={{ root: styles.main, inputRoot: styles.input }}
			id="asynchronous-demo"
			sx={{ width: 300 }}
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			options={options}
			loading={loading}
			renderOption={(props, option) => (
				<Link passHref={true} href={`/products/${option._id}`}>
					<li {...props}>{option.name}</li>
				</Link>
			)}
			renderInput={(params) => (
				<TextField
					fullWidth={true}
					onChange={(e) => setSearch(e.target.value)}
					{...params}
					label="Search"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
}
