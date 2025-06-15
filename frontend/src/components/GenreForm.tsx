interface GenreFormProps {
  value: string;
  setValue: (value: string) => void;
  handleSubmit: () => void;
  buttonText?: string;
  handleDelete?: () => void;
}

const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}: GenreFormProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-gray-700 font-medium mb-2"
          >
            Genre Name
          </label>
          <input
            type="text"
            id="genre"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter genre name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
