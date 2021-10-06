import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';
import cartSlice from '../services/cartSlice';

const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		cart: cartSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
