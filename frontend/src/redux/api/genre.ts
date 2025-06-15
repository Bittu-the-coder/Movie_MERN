import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constant";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all genres
    fetchGenres: builder.query({
      query: () => GENRE_URL,
      providesTags: ["Genre"],
    }),

    // Create genre
    createGenre: builder.mutation({
      query: (data) => ({
        url: GENRE_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Genre"],
    }),

    // Update genre
    updateGenre: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Genre"],
    }),

    // Delete genre
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),
  }),
});

export const {
  useFetchGenresQuery,
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = genreApiSlice;
