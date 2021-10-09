import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:3000/api/auth';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (build) => ({
		addUser: build.mutation({
			query: (body) => ({
				url: `${baseUrl}/signup`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useAddUserMutation } = userApi;
