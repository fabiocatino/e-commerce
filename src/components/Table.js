import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import {
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Paper,
	Checkbox,
	MenuItem,
	Button,
	Typography,
} from '@mui/material/';
import Image from 'next/image';
import EnhancedTableHead, {
	getComparator,
	stableSort,
} from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import BasicSelect from './Products/Select';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../services/cartSlice';

export default function EnhancedTable() {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('Product');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const items = useSelector((state) => state.cart.cart.cartItems);
	const [rows, setRows] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		setRows(items);
	}, [rows, items]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);

			return;
		}
		setSelected([]);
	};

	const handleClick = (event, row) => {
		const selectedIndex = selected.indexOf(row);

		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, row);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};


	const isSelected = (row) => selected.indexOf(row) !== -1;

	const changeQuantityHandler = (index) => (e) => {
		dispatch(
			cartActions.addItem({
				...items[index],
				quantity: parseInt(e.target.innerText),
			})
		);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const deleteItemHandler = (index) => () => {
		dispatch(cartActions.deleteItem(items[index]));
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar
					selectedItems={selected}
					numSelected={selected.length}
				/>

				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>

						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.name}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													onClick={(event) => handleClick(event, row, index)}
													color="primary"
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId,
													}}
												/>
											</TableCell>

											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="none"
											>
												<Image src={row.image} height={100} width={100}></Image>
											</TableCell>
											<TableCell align="right">{row.name}</TableCell>
											<TableCell align="right">
												<Select value="">
													{[...Array(row.countInStock).keys()].map((item) => (
														<MenuItem
															onClick={changeQuantityHandler(index)}
															key={item + 1}
															value={item ? item + 1 : 0}
														>
															{item + 1}
														</MenuItem>
													))}
												</Select>
												{row.quantity}
											</TableCell>

											<TableCell align="right">£{row.price}</TableCell>
											<TableCell align="right">
												<Button
													variant="contained"
													color="error"
													onClick={deleteItemHandler(index)}
												>
													REMOVE
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
