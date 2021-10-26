import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:3000/api/products';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getProductsByPage: builder.query({
			query: ({ page, category }) => {
				return `${baseUrl}?page=${page}&category=${category}`;
			},
		}),
		getProductCategories: builder.query({
			query: () => `${baseUrl}/category-list`,
		}),

		getProduct: builder.query({
			query: (_id) => `${baseUrl}/${_id}`,
		}),
		getProductByName: builder.query({
			query: (name) => `${baseUrl}/name/${name}`,
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

export const {
	useGetProductCategoriesQuery,
	useGetProductsByPageQuery,
	useGetProductQuery,
	useGetProductByNameQuery,
} = productsApi;
