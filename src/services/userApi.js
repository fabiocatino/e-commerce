import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:3000/api/auth';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: ['User'],
	endpoints: (build) => ({
		getAddresses: build.query({
			query: () => ({
				url: `${baseUrl}/address`,
			}),
		}),
		addUser: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/signup`,
				method: 'POST',
				body,
			}),
		}),
		addAddress: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/address`,
				method: 'POST',
				body,
			}),
		}),
		deleteAddress: build.mutation({
			query: (body) => {
				return {
					url: `${baseUrl}/address`,
					method: 'DELETE',
					body,
				};
			},
			invalidatesTags: (result, error, arg) => {
				console.log(result)
			},
		}),
	}),
});

export const {
	useGetAddressesQuery,
	useAddUserMutation,
	useAddAddressMutation,
	useDeleteAddressMutation,
} = userApi;
