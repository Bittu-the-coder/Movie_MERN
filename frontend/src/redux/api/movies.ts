import { MOVIE_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all movies
    getMovies: builder.query({
      query: () => MOVIE_URL,
      providesTags: ["Movie"],
    }),

    // Get specific movie
    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/${id}`,
      providesTags: ["Movie"],
    }),

    // Create movie
    createMovie: builder.mutation({
      query: (data) => ({
        url: MOVIE_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Movie"],
    }),

    // Update movie
    updateMovie: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${MOVIE_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Movie"],
    }),

    // Delete movie
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),

    // Add movie review
    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/review`,
        method: "POST",
        body: { rating, comment },
      }),
      invalidatesTags: ["Movie"],
    }),

    // Delete movie review
    deleteMovieReview: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/${movieId}/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),

    // Get new movies
    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/new`,
      providesTags: ["Movie"],
    }),

    // Get top rated movies
    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top`,
      providesTags: ["Movie"],
    }),

    // Get random movies
    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random`,
      providesTags: ["Movie"],
    }),

    // Upload image
    uploadMovieImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetSpecificMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useAddMovieReviewMutation,
  useDeleteMovieReviewMutation,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
  useUploadMovieImageMutation,
} = moviesApiSlice;
