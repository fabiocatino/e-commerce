// import { createSlice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

// const initialState = {
// 	user: {
//         userData: { 
//             name: '', email: '', password: '', isAdmin: false,
//         }
// 		// userItems: Cookies.get('userItems')
// 		// 	? JSON.parse(Cookies.get('userItems'))
// 		// 	: [],
// 	},
// };

// const userSlice = createSlice({
// 	name: 'user',
// 	initialState,
// 	reducers: {
// 		addItem(state, action) {
// 			const newItem = action.payload;
// 			const existItem = state.user.userItems.find(
// 				(item) => item._id === newItem._id
// 			);
// 			const userItems = existItem
// 				? state.user.userItems.map((item) =>
// 						item._id === existItem._id ? newItem : item
// 				  )
// 				: [...state.user.userItems, newItem];
// 			Cookies.set('userItems', JSON.stringify(userItems));
// 			return { ...state, user: { ...state.user, userItems } };
// 		},
// 		deleteItem(state, action) {
// 			const userItems = state.user.userItems.filter(
// 				(item) => item._id !== action.payload._id
// 			);
// 			Cookies.set('userItems', JSON.stringify(userItems));
// 			return { ...state, user: { ...state.user, userItems } };
// 		},
// 	},
// });

// const { actions, reducer } = userSlice;

// export const userActions = userSlice.actions;

// export default reducer;
