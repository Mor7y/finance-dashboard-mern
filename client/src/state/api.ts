import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { KPIResponse, ProductsResponse } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products"],
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
        };
    },
});

export const { useGetKpisQuery, useGetProductsQuery } = api;
