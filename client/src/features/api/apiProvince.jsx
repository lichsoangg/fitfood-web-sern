import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const apiProvince = createApi({
    reducerPath: 'api-province',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_PROVINCE_URL}),
    endpoints: builder => ({
        getProvinces: builder.query({
            query: () => '/province',
            transformResponse: data => {
                data = data.results.map(province => {
                    return {
                        id: province.code,
                        value: province.name,
                    };
                });
                return data;
            }
        }),
        getDistricts: builder.query({
            query: (idProvince) =>`district?province=${idProvince}`,
            transformResponse: data => {
                data = data.results.map(district => {
                    return {
                        id: district.code,
                        value: district.name,
                    };
                });
                return data;
            }
        }),
        getWards: builder.query({
            query: (idDistrict) =>`commune?district=${idDistrict}`,
            transformResponse: data => {
                data = data.results.map(ward => {
                    return {
                        id: ward.code,
                        value: ward.name,
                    };
                });
                return data;
            }
        })
    })
});


export const { useGetProvincesQuery, useGetDistrictsQuery,useGetWardsQuery } = apiProvince;


