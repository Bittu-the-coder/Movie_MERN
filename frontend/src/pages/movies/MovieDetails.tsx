import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { useFetchGenresQuery } from "../../redux/api/genre";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);

  const {
    data: movie,
    isLoading,
    error,
    refetch,
  } = useGetSpecificMovieQuery(id);
  const [addReview] = useAddMovieReviewMutation();
  const { data: genres } = useFetchGenresQuery();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");

  const submitReviewHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      await addReview({
        id,
        rating,
        comment,
      }).unwrap();
      refetch();
      setComment("");
      setRating(5);
      setReviewError("");
    } catch (err: any) {
      setReviewError(err?.data?.message || "Failed to submit review");
    }
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Error loading movie details</p>
        <Link to="/movies" className="text-blue-500 hover:underline">
          Back to all movies
        </Link>
      </div>
    );

  if (!movie)
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">Movie not found</p>
        <Link to="/movies" className="text-blue-500 hover:underline">
          Back to all movies
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/movies"
          className="text-blue-500 hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Movies
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Movie Poster */}
        <div className="w-full md:w-1/3">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={
                movie.image
                  ? `http://localhost:3000/${movie.image}`
                  : "/placeholder-movie.jpg"
              }
              alt={movie.name}
              className="w-full h-auto object-cover"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/placeholder-movie.jpg";
              }}
            />
          </div>
        </div>

        {/* Movie Details */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
              <div className="flex items-center mb-4">
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded mr-3">
                  {movie.year}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                  {genres?.data?.find((g: any) => g._id === movie.genre)
                    ?.name || "Unknown"}
                </span>
              </div>
            </div>

            {movie.rating > 0 && (
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg flex items-center">
                <span className="text-xl font-bold mr-1">
                  {movie.rating.toFixed(1)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="#EAB308"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-4 text-gray-700">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-6">{movie.detail}</p>

            {movie.cast && movie.cast.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-2">Cast</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded">
                      {actor}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Reviews ({movie.reviews?.length || 0})
            </h2>

            {userInfo && (
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="font-medium mb-2">Write a Review</h3>
                {reviewError && (
                  <p className="text-red-500 mb-2">{reviewError}</p>
                )}
                <form onSubmit={submitReviewHandler}>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} -{" "}
                          {num === 1
                            ? "Poor"
                            : num === 2
                            ? "Fair"
                            : num === 3
                            ? "Good"
                            : num === 4
                            ? "Very Good"
                            : "Excellent"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {movie.reviews && movie.reviews.length > 0 ? (
                movie.reviews.map((review: any) => (
                  <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill={i < review.rating ? "currentColor" : "none"}
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
