import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../services/productsApi';
import { userApi } from '../services/userApi';
import { ordersApi } from '../services/ordersApi';
import cartSlice from '../services/cartSlice';

const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
		cart: cartSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware, userApi.middleware, ordersApi.middleware),
});

export default store;
