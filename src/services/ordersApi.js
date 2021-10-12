import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:3000/api/orders';

const initialProduct = [
	{
		isDelivered: false,
		isPaid: false,
		paymentMethod: '',
		totalPrice: 0,
		number: null,
		shippingInfo: {
			country: '',
			postalCode: '',
			city: '',
			address: '',
			fullName: '',
		},
		user: '',
	},
];

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (build) => ({
		addOrder: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/add`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useAddOrderMutation } = ordersApi;
