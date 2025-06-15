import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import Loader from "../../components/Loader";
import MovieCard from "./MovieCard";

interface Movie {
  _id: string;
  name: string;
  image: string;
  genre: {
    _id: string;
    name: string;
  };
  year: number;
  rating?: number;
  numReviews?: number;
}

interface Genre {
  _id: string;
  name: string;
}

const MovieContainerPage = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const {
    data: newMovies = [],
    isLoading: isLoadingNew,
    error: newError,
  } = useGetNewMoviesQuery();
  const {
    data: topMovies = [],
    isLoading: isLoadingTop,
    error: topError,
  } = useGetTopMoviesQuery();
  const {
    data: genres = [],
    isLoading: isLoadingGenres,
    error: genreError,
  } = useFetchGenresQuery();
  const {
    data: randomMovies = [],
    isLoading: isLoadingRandom,
    error: randomError,
  } = useGetRandomMoviesQuery();

  const handleGenreClick = (genreId: string) => {
    setSelectedGenre((prevGenre) => (prevGenre === genreId ? null : genreId));
  };

  console.log(newMovies);

  // Filter movies by selected genre
  const filteredMovies = newMovies.filter((movie: Movie) => {
    if (!selectedGenre) return true;
    return movie.genre === selectedGenre;
  });

  const renderMovieSection = (
    title: string,
    movies: Movie[],
    isLoading: boolean,
    error: any,
    viewAllLink?: string
  ) => {
    if (isLoading) return <Loader />;

    if (error) {
      return (
        <div className="text-red-500 p-4 bg-red-50 rounded">
          Error loading movies: {error.message || "Something went wrong"}
        </div>
      );
    }

    return (
      <div className="w-full mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-blue-600 hover:underline">
              View All
            </Link>
          )}
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.slice(0, 10).map((movie: Movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No movies available</p>
        )}
      </div>
    );
  };

  if (isLoadingGenres) return <Loader />;

  if (genreError) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded">
        Error loading genres:{" "}
        {(genreError as any).message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Genre Sidebar - Updated colors */}
        <div className="w-full md:w-1/5">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium text-lg mb-4 text-purple-600">
              Browse by Genre
            </h3>
            <div className="space-y-2">
              {genres.data.map((genre: Genre) => (
                <button
                  key={genre._id}
                  className={`block w-full text-left px-4 py-2 rounded transition ${
                    selectedGenre === genre._id
                      ? "bg-purple-100 text-purple-700"
                      : "hover:bg-purple-50 text-gray-700 hover:text-purple-600"
                  }`}
                  onClick={() => handleGenreClick(genre._id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Movie Sections */}
        <div className="w-full md:w-4/5">
          {renderMovieSection(
            selectedGenre ? "Movies by Genre" : "New Releases",
            filteredMovies,
            isLoadingNew,
            newError,
            "/movies/new"
          )}
          {renderMovieSection(
            "Recommended For You",
            randomMovies,
            isLoadingRandom,
            randomError,
            "/movies/random"
          )}
          {renderMovieSection(
            "Top Rated",
            topMovies,
            isLoadingTop,
            topError,
            "/movies/top"
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieContainerPage;
