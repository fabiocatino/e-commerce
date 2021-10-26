import { Link as MLink, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { useGetProductCategoriesQuery } from '../../services/productsApi';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import styles from './CategoriesMenu.module.css'

export default function CategoriesMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [filteredCategories, setFilteredCategories] = useState([]);
	const open = Boolean(anchorEl);
	const categories = useGetProductCategoriesQuery();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		let temp = [];
		categories.data?.map((item) => {
			temp.push(item.category);
			setFilteredCategories([...new Set(temp)].sort());
		});
	}, [categories]);

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls="basic-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				color="inherit"
			>
				<MenuIcon />
				<Typography variant="body1">
					<strong>ALL CATEGORIES</strong>
				</Typography>
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				classes={{ list: styles.menu}}
				MenuListProps={{
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
				{filteredCategories.map((category) => (
					<MenuItem onClick={handleClose} divider={true} key={category}>
						{category}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
