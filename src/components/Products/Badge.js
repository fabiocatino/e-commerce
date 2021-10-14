import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NoSsr } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useTotalQuantity } from '../../services/cartSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

export default function CustomizedBadges() {
	const totalQuantity = useTotalQuantity();

	return (
		<NoSsr>
			<IconButton aria-label="cart">
				<StyledBadge badgeContent={totalQuantity} color="secondary">
					<ShoppingCartIcon />
				</StyledBadge>
			</IconButton>
		</NoSsr>
	);
}
