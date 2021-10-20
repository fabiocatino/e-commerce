import { Link as MLink, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useGetAllProductsQuery } from '../../services/productsApi';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function CategoriesMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const categories = useGetAllProductsQuery();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				// onMouseEnter={handleClick}
				// onMouseLeave={handleClick}
				id="basic-button"
				aria-controls="basic-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				color="inherit"
			>
				<MenuIcon />
				<Typography variant="body1"><strong>ALL CATEGORIES</strong></Typography>
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
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
				{categories.data?.map((category) => (
					<MenuItem
						onMouseLeave={handleClose}
						onClick={handleClose}
						divider={true}
						key={category._id}
					>
						{category.category}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
