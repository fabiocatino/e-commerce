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
			providesTags: (result, error, arg) =>
				result
					? [...result.map(({ _id }) => ({ type: 'User', _id })), 'User']
					: ['User'],
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
			invalidatesTags: ['User'],
		}),
		updateUserInfo: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/updateUserInfo`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['User'],
		}),
		updateUserPassword: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/updateUserPassword`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['User'],
		}),
		deleteAddress: build.mutation({
			query: (body) => {
				return {
					url: `${baseUrl}/address`,
					method: 'DELETE',
					body,
				};
			},
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useGetAddressesQuery,
	useAddUserMutation,
	useAddAddressMutation,
	useUpdateUserInfoMutation,
	useUpdateUserPasswordMutation,
	useDeleteAddressMutation,
} = userApi;
