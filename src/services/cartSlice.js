import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const initialState = {
	cartItems: Cookies.get('cartItems')
		? JSON.parse(Cookies.get('cartItems'))
		: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const existItem = state.cartItems.find(
				(item) => item._id === newItem._id
			);
			const cartItems = existItem
				? state.cartItems.map((item) =>
						item._id === existItem._id ? newItem : item
				  )
				: [...state.cartItems, newItem];
			Cookies.set('cartItems', JSON.stringify(cartItems));
			return { ...state, cartItems };
		},

		deleteItem(state, action) {
			const cartItems = state.cartItems.filter(
				(item) => item._id !== action.payload._id
			);
			Cookies.set('cartItems', JSON.stringify(cartItems));
			return { ...state, cartItems };
		},
		deleteCart: (state) => {
			Cookies.remove('cartItems');
			return { ...state, cartItems };
		},
	},
});

const { actions, reducer } = cartSlice;
export const useCartItems = () => useSelector((state) => state.cart.cartItems);
export const useTotalQuantity = () =>
	useSelector((state) => {
		return state.cart.cartItems.reduce(
			(a, cartItem) => a + cartItem.quantity,
			0
		);
	});
export const useTotalPrice = () =>
	useSelector((state) => {
		return state.cart.cartItems.reduce(
			(a, cartItem) => a + cartItem.quantity * cartItem.price,
			0
		);
	});
export const cartActions = cartSlice.actions;

export default reducer;
