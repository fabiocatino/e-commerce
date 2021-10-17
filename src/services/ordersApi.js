import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:3000/api/orders';

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (build) => ({
		getAllOrders: build.query({
			query: () => ({
				baseUrl,
			}),
		}),
		addOrder: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/add`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useAddOrderMutation, useGetAllOrdersQuery } = ordersApi;
