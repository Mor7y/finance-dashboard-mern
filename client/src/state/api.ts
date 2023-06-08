import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { KPIResponse, ProductsResponse, TransactionResponse } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Transactions"],
    endpoints: (build) => {
        return {
            getKpis: build.query<KPIResponse[], void>({
                query: () => "kpi/kpis/",
                providesTags: ["Kpis"],
            }),
            getProducts: build.query<ProductsResponse[], void>({
                query: () => "product/products/",
                providesTags: ["Products"],
            }),
            getTransactions: build.query<TransactionResponse[], void>({
                query: () => "transaction/transactions/",
                providesTags: ["Transactions"],
            }),
        };
    },
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
    api;
