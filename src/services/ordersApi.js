import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// let baseUrl;

// if (process.env.NODE_ENV !== 'production') {
// 	baseUrl = 'http://127.0.0.1:3000/api/orders';
// } else {
let baseUrl = 'https://e-commerce-bay-nine.vercel.app/api/orders';
// }

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	refetchOnMountOrArgChange: true,
	tagTypes: ['Order'],
	endpoints: (build) => ({
		getAllOrders: build.query({
			query: () => ({
				baseUrl,
			}),
		}),
		getOrder: build.query({
			query: (_id) => ({
				url: `${baseUrl}/${_id}`,
			}),
		}),
		addOrder: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/add`,
				method: 'POST',
				body,
			}),
		}),
		updateOrder: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/update-order`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Order'],
		}),
	}),
});

export const { useAddOrderMutation, useGetOrderQuery, useGetAllOrdersQuery } =
	ordersApi;
