import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../services/productsApi'

export default configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
})



// import { createStore } from 'redux';
// import { createSlice } from '@reduxjs/toolkit'

// const initialState = { products: []}

// const slice = createSlice({
//     name: 'productList',
//     initialState,
//     reducers: {

//     }
// })

// export const productListReducer = (state = { products: [] }, action) => {
// 	if (action.type === 'PRODUCT_LIST_REQUEST') {
// 		return { isLoading: true, products: [] };
// 	}

// 	if (action.type === 'PRODUCT_LIST_SUCCESS') {
// 		return { isLoading: false, products: action.payload };
// 	}

// 	if (action.type === 'PRODUCT_LIST_FAIL') {
// 		return { isLoading: false, error: action.payload };
// 	}

// 	return state;
// };

// const store = createStore(productListReducer);

// export default store;