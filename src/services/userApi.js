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
	tagTypes: ['User', 'Addresses'],
	endpoints: (build) => ({
		getAddresses: build.query({
			query: () => ({
				url: `${baseUrl}/address`,
			}),
			providesTags: ['Addresses'],
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
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const {
					data: { newAddress },
				} = await queryFulfilled;
				dispatch(
					userApi.util.updateQueryData('getAddresses', id, (draft) => {
						draft.push(newAddress);
					})
				);
			},
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
			invalidatesTags: ['Addresses'],
		}),
		deleteAddress: build.mutation({
			query: (body) => {
				return {
					url: `${baseUrl}/address`,
					method: 'DELETE',
					body,
				};
			},
			invalidatesTags: ['Addresses'],
			async updateQueryData({ id, ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					api.util.addAddress('getAddresses', id, (draft) => {
						Object.assign(draft, patch);
					})
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
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
