import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetMoviesQuery,
  useDeleteMovieMutation,
} from "../../../redux/api/movies";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";
import { useFetchGenresQuery } from "../../../redux/api/genre";

const AdminMoviesList = () => {
  const { data: movies, isLoading, refetch } = useGetMoviesQuery();
  const [deleteMovie] = useDeleteMovieMutation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const { data: genres } = useFetchGenresQuery();

  const handleDeleteMovie = async () => {
    try {
      console.log("Deleting movie:", selectedMovie._id);

      await deleteMovie(selectedMovie._id).unwrap();
      toast.success("Movie deleted successfully");
      setDeleteModalVisible(false);
      setSelectedMovie(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete movie");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Movies List</h2>
        <Link
          to="/admin/movies/create"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Add New Movie
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movies?.map((movie: any) => (
              <tr key={movie._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:3000/${movie.image}`}
                      alt={movie.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {movie.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    {genres?.data?.find((g: any) => g._id === movie.genre)
                      ?.name || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {movie.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {movie.rating ? movie.rating.toFixed(1) : "No ratings"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/admin/movies/update/${movie._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      setDeleteModalVisible(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalVisible}
        onClose={() => {
          setDeleteModalVisible(false);
          setSelectedMovie(null);
        }}
        title="Delete Movie"
      >
        <div className="p-6">
          <p className="mb-6">
            Are you sure you want to delete "{selectedMovie?.name}"?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setDeleteModalVisible(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteMovie}
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

export default AdminMoviesList;
