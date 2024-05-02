import { tagTypes } from "../tag.types";
import { baseApi } from "./baseApi";

const specialties = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createspecialties: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
    getAllspecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),
    deletespecialties: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const {
  useCreatespecialtiesMutation,
  useGetAllspecialtiesQuery,
  useDeletespecialtiesMutation,
} = specialties;
