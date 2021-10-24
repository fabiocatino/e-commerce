import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orderID: '',
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		addOrderID: (state, action) => {
			const orderID = action.payload;
			return { ...state, orderID };
		},
	},
});

const { actions, reducer } = orderSlice;

export const orderAction = orderSlice.actions;

export default reducer;
