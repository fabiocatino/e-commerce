import React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Toolbar, Typography, Tooltip } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../services/cartSlice';

const EnhancedTableToolbar = (props) => {
	const dispatch = useDispatch();
	const deleteItemHandler = (e) => {
		dispatch(cartActions.removeItem(props.selectedItems));
	};
	// console.log(props.selectedItems)
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					My Cart
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip onClick={deleteItemHandler} title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
