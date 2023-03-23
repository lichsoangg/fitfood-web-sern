import { apiSlice } from '../api/apiSlice'

function providesProductList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ ProductID }) => ({ type: tagType, id: ProductID }))]
    : [{ type: tagType, id: 'LIST' }]
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryConfig) => {
        return {
          url: '/products',
          method: 'GET',
          params: queryConfig
        }
      },
      providesTags: (result) => providesProductList(result?.data.data, 'Products')
    }),
    getProduct: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`
        }
      },
      providesTags: (result, error, id) => [{ type: 'Products', id }]
    }),
    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: '/products/',
          method: 'POST',
          body: data,
          credentials: 'include'
        }
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/products/${data.get('ProductID')}`,
          method: 'PUT',
          body: data,
          credentials: 'include'
        }
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    deleteProduct: builder.mutation({
      query: (productID) => {
        return {
          url: `/products/${productID}`,
          method: 'DELETE',
          params: productID,
          credentials: 'include'
        }
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productsApi
