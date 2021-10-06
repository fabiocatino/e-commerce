import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const productsApiHeaders = {

// }

const baseUrl = 'http://127.0.0.1:3000/api/products';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: () => baseUrl,
		}),
		getProduct: builder.query({
			query: (_id) => `${baseUrl}/${_id}`,
		}),
		addProduct: builder.mutation({
			query: (initialProduct) => ({
				url: '/product',
				method: 'POST',
				body: initialProduct,
			}),
		}),
	}),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;
