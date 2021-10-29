import MenuIcon from '@mui/icons-material/Menu';
import { Link as MLink, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGetProductCategoriesQuery } from '../../services/productsApi';
import styles from './CategoriesMenu.module.css';

export default function CategoriesMenu() {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState(null);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const open = Boolean(anchorEl);
	const { data: categories, isLoading, error } = useGetProductCategoriesQuery();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const categoryChoiceHandler = (index) => (e) => {
		router.push(`/products?category=${index}`);
	};

	useEffect(() => {
		let temp = [];

		categories?.map((item) => {
			temp.push(item.category);
			setFilteredCategories([...new Set(temp)].sort());
		});
	}, [categories, isLoading]);

	return (
		<>
			<div>
				<Button
					id="basic-button"
					aria-controls="basic-menu"
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
					color="inherit"
					sx={{ textTransform: 'capitalize' }}
				>
					<Typography color="#FFFF" variant="body1">
						Category
					</Typography>
				</Button>

				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onMouseLeave={handleClose}
					onClose={handleClose}
					classes={{ list: styles.menu }}
					MenuListProps={{
						onMouseLeave: handleClose,
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem divider={true}>
						<Link href="/products" passHref={true}>
							<MLink underline="none" color="none">
								All Products
							</MLink>
						</Link>
					</MenuItem>
					{filteredCategories.map((category, index) => (
						<MenuItem
							onClick={categoryChoiceHandler(category, index)}
							divider={true}
							key={category}
						>
							{category}
						</MenuItem>
					))}
				</Menu>
			</div>
		</>
	);
}
