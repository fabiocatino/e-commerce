import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl;

if (process.env.NODE_ENV !== 'production') {
	baseUrl = 'http://127.0.0.1:3000/api/auth';
} else {
	baseUrl = 'https://e-commerce-fabioc.vercel.app/api/auth';
}

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: ['User'],
	refetchOnFocus: true,
	endpoints: (build) => ({
		getAddresses: build.query({
			query: () => ({
				url: `${baseUrl}/address`,
			}),
			// providesTags: (result, error, arg) => {
			// 	console.log({ error });
			// 	console.log({ result })
			// 	return result
			// 		? [...result.map(({ _id }) => ({ type: 'User', _id })), 'User']
			// 		: ['User'];
			// },
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
			// invalidatesTags: ['User'],
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
		updateUserAddress: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/address`,
				method: 'PATCH',
				body,
			}),
			// invalidatesTags: ['User'],
		}),
		deleteAddress: build.mutation({
			query: (body) => {
				return {
					url: `${baseUrl}/address`,
					method: 'DELETE',
					body,
				};
			},
			// invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useGetAddressesQuery,
	useAddUserMutation,
	useAddAddressMutation,
	useUpdateUserInfoMutation,
	useUpdateUserPasswordMutation,
	useUpdateUserAddressMutation,
	useDeleteAddressMutation,
} = userApi;
