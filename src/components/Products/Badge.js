import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTotalQuantity} from '../../services/cartSlice';
import Cookies from 'js-cookie';

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
	const [quantity, setQuantity] = useState();

	React.useEffect(() => {
		{
			!Cookies.get('cartItems') ? setQuantity(0) : setQuantity(totalQuantity);
		}
	}, [totalQuantity]);

	return (
		<IconButton aria-label="cart">
			<StyledBadge badgeContent={quantity} color="secondary">
				<ShoppingCartIcon />
			</StyledBadge>
		</IconButton>
	);
}
