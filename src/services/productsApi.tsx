import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const productsApiHeaders = {

// }

const baseUrl: string = 'http://127.0.0.1:8000/products/';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getAllProducts: builder.query({ 
			query: () => baseUrl
		 }),
		getProduct: builder.query({ 
			query: (_id) => `${baseUrl}${_id}`
		 }),
	}),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
