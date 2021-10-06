import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
	cart: {
		cartItems: Cookies.get('cartItems')
			? JSON.parse(Cookies.get('cartItems'))
			: [],
	},
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) => item._id === newItem._id
			);

			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item._id === existItem._id ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			Cookies.set('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		},
		removeItem(state, action) {
			const cartItems = state.cart.cartItems.filter((item) => {
				for (let i in state.cart.cartItems) {
					// console.log(item.name === action.payload[i])
					item.name === action.payload[i];
				}
				Cookies.set('cartItems', JSON.stringify(cartItems));
				return { ...state, cart: { ...state.cart, cartItems } };
			});
		},
	},
});

const { actions, reducer } = cartSlice;

export const cartActions = cartSlice.actions;

export default reducer;
