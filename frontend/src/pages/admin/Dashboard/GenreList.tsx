import { useState } from "react";
import { toast } from "react-toastify";
import GenreForm from "../../../components/GenreForm";
import Modal from "../../../components/Modal";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
} from "../../../redux/api/genre";

interface Genre {
  _id: string;
  name: string;
}

interface ApiError {
  data?: {
    message: string;
  };
}

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async () => {
    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      await createGenre({ name }).unwrap();
      toast.success("Genre created successfully");
      setName("");
      refetch();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "Failed to create genre");
    }
  };

  const handleUpdateGenre = async () => {
    if (!updatingName) {
      toast.error("Genre name is required");
      return;
    }

    try {
      await updateGenre({
        id: selectedGenre._id,
        updateGenre: { name: updatingName },
      }).unwrap();
      toast.success("Genre updated successfully");
      setModalVisible(false);
      setSelectedGenre(null);
      setUpdatingName("");
      refetch();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "Failed to update genre");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      await deleteGenre(selectedGenre._id).unwrap();
      toast.success("Genre deleted successfully");
      setModalVisible(false);
      setSelectedGenre(null);
      refetch();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "Failed to delete genre");
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/thumb.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto bg-white/90 p-8 rounded-lg backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Genre Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Create New Genre
            </h2>
            <GenreForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateGenre}
              buttonText="Create Genre"
            />
          </div>

          {/* Genre List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Genre List</h2>
            <div className="bg-white rounded-lg shadow-md">
              <div className="divide-y">
                {genres?.data?.map((genre: Genre) => (
                  <div
                    key={genre._id}
                    className="p-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium">{genre.name}</span>
                    <button
                      onClick={() => {
                        setSelectedGenre(genre);
                        setUpdatingName(genre.name);
                        setModalVisible(true);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <Modal
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedGenre(null);
            setUpdatingName("");
          }}
          title="Edit Genre"
        >
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateGenre}
            handleDelete={handleDeleteGenre}
            buttonText="Update Genre"
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
