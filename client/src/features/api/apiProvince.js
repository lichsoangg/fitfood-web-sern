import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const apiProvince = createApi({
    reducerPath: 'api-province',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://provinces.open-api.vn/api/' }),
    endpoints: builder => ({
        getProvinces: builder.query({
            query: () => 'p/',
            transformResponse: data => {
                data = data.map(province => {
                    return {
                        id: province.code,
                        value: province.name,
                    };
                });
                return data;
            }
        }),
        getDistricts: builder.query({
            query: (idProvince) =>`p/${idProvince}?depth=2`,
            transformResponse: data => {
                data = data.districts.map(district => {
                    return {
                        id: district.code,
                        value: district.name,
                    };
                });
                return data;
            }
        }),
        getWards: builder.query({
            query:(idDistrict)=>`d/${idDistrict}?depth=2`,
            transformResponse: data => {
                data = data.wards.map(ward => {
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


