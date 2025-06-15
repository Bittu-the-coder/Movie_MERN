import { useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteMovieReviewMutation,
  useGetMoviesQuery,
} from "../../../redux/api/movies";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: string;
}

interface Movie {
  _id: string;
  name: string;
  reviews: Review[];
}

const AllComments = () => {
  const { data: movies, isLoading, refetch } = useGetMoviesQuery();
  const [deleteComment] = useDeleteMovieReviewMutation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState<{
    movieId: string;
    reviewId: string;
    movieName: string;
  } | null>(null);

  const handleDeleteComment = async () => {
    if (!selectedComment) return;

    try {
      await deleteComment({
        movieId: selectedComment.movieId,
        reviewId: selectedComment.reviewId,
      }).unwrap();
      toast.success("Comment deleted successfully");
      setDeleteModalVisible(false);
      setSelectedComment(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete comment");
    }
  };

  if (isLoading) return <Loader />;

  const moviesWithReviews = movies?.filter(
    (movie: Movie) => movie.reviews?.length > 0
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">All Comments</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Movie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {moviesWithReviews?.map((movie: Movie) =>
                movie.reviews.map((review: Review) => (
                  <tr key={review._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {movie.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{review.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">
                          {review.rating}
                        </span>
                        <span className="text-yellow-400 ml-1">★</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-md truncate">
                        {review.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedComment({
                            movieId: movie._id,
                            reviewId: review._id,
                            movieName: movie.name,
                          });
                          setDeleteModalVisible(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
              {(!moviesWithReviews || moviesWithReviews.length === 0) && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No comments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalVisible}
        onClose={() => {
          setDeleteModalVisible(false);
          setSelectedComment(null);
        }}
        title="Delete Comment"
      >
        <div className="p-6">
          <p className="mb-6">
            Are you sure you want to delete this comment from "
            {selectedComment?.movieName}"?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setDeleteModalVisible(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteComment}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllComments;
