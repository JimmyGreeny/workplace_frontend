import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const invoicesAdapter = createEntityAdapter({})

const initialState = invoicesAdapter.getInitialState()

export const invoicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInvoices: builder.query({
            query: () => ({
                url: '/invoices',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedInvoices = responseData.map(invoice => {
                    invoice.id = invoice._id
                    return invoice
                });
                return invoicesAdapter.setAll(initialState, loadedInvoices)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Invoice', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Invoice', id }))
                    ]
                } else return [{ type: 'Invoice', id: 'LIST' }]
            }
        }),
        addNewInvoice: builder.mutation({
            query: initialInvoice => ({
                url: '/invoices',
                method: 'POST',
                body: {
                    ...initialInvoice,
                }
            }),
            invalidatesTags: [
                { type: 'Invoice', id: "LIST" }
            ]
        }),
        updateInvoice: builder.mutation({
            query: initialInvoice => ({
                url: '/invoices',
                method: 'PATCH',
                body: {
                    ...initialInvoice,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Invoice', id: arg.id }
            ]
        }),
        deleteInvoice: builder.mutation({
            query: ({ id }) => ({
                url: `/invoices`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Invoice', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetInvoicesQuery,
    useAddNewInvoiceMutation,
    useUpdateInvoiceMutation,
    useDeleteInvoiceMutation,
} = invoicesApiSlice

// returns the query result object
export const selectInvoicesResult = invoicesApiSlice.endpoints.getInvoices.select()

// creates memoized selector
const selectInvoicesData = createSelector(
    selectInvoicesResult,
    invoicesResult => invoicesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllInvoices,
    selectById: selectInvoiceById,
    selectIds: selectInvoiceIds
    // Pass in a selector that returns the invoices slice of state
} = invoicesAdapter.getSelectors(state => selectInvoicesData(state) ?? initialState)