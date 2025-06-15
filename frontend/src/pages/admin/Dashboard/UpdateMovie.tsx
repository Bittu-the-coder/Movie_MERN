import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadMovieImageMutation,
} from "../../../redux/api/movies";
import { useFetchGenresQuery } from "../../../redux/api/genre";
import Loader from "../../../components/Loader";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading } = useGetSpecificMovieQuery(id);
  const [updateMovie] = useUpdateMovieMutation();
  const [uploadImage] = useUploadMovieImageMutation();
  const { data: genres } = useFetchGenresQuery();

  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    genre: "",
    year: new Date().getFullYear(),
    cast: [] as string[],
    image: "",
  });

  const [castInput, setCastInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (movie) {
      setFormData({
        name: movie.name,
        detail: movie.detail,
        genre: movie.genre._id,
        year: movie.year,
        cast: movie.cast || [],
        image: movie.image,
      });
      if (movie.image) {
        setImagePreview(`http://localhost:3000/${movie.image}`);
      }
    }
  }, [movie]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData).unwrap();
      setFormData((prev) => ({ ...prev, image: result.filePath }));
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleAddCast = () => {
    if (castInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        cast: [...prev.cast, castInput.trim()],
      }));
      setCastInput("");
    }
  };

  const handleRemoveCast = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMovie({ id, ...formData }).unwrap();
      toast.success("Movie updated successfully");
      navigate("/admin/movies-list");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update movie");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Movie Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Detail
          </label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a genre</option>
            {genres?.data.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cast
          </label>
          <div className="flex">
            <input
              type="text"
              value={castInput}
              onChange={(e) => setCastInput(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddCast}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {formData.cast.map((member, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {member}
                <button
                  type="button"
                  onClick={() => handleRemoveCast(index)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Image preview"
                className="max-w-xs rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
