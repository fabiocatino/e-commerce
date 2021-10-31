import {
	Button,
	Checkbox,
	MenuItem,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
} from '@mui/material/';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions, useCartItems } from '../../services/cartSlice';
import EnhancedTableHead, {
	getComparator,
	stableSort,
} from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

export default function EnhancedTable() {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('Product');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const items = useCartItems();
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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
				<EnhancedTableToolbar />

				<TableContainer>
					<Table sx={{ maxWidth: 1000 }} aria-labelledby="tableTitle">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>

						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const labelId = `enhanced-table-checkbox-${index}`;
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.name}
										>
											<TableCell
												component="th"
												id={row._id}
												scope="row"
												padding="none"
											>
												<Image
													loading="lazy"
													alt={row.name}
													src={row.image}
													height={100}
													width={100}
												></Image>
											</TableCell>
											<TableCell align="right">{row.name}</TableCell>
											<TableCell align="right">
												<Select id="quantity-select" value={row.quantity}>
													{[
														...Array(
															row.countInStock >= 10 ? 10 : row.countInStock
														).keys(),
													].map((item) => (
														<MenuItem
															onClick={changeQuantityHandler(index)}
															key={item + 1}
															value={item ? item + 1 : 1}
														>
															{item + 1}
														</MenuItem>
													))}
												</Select>
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
