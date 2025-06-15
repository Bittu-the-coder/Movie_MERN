import React, { useState, useEffect } from "react";
import { useGetRandomMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import MovieCard from "./MovieCard";
import MovieTab from "./MovieTab";
import Loader from "../../components/Loader";

const RandomMovies: React.FC = () => {
  const { data: movies = [], isLoading, error } = useGetRandomMoviesQuery();
  const { data: genres = [] } = useFetchGenresQuery();

  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedGenre: "",
    selectedYear: "",
  });

  const uniqueYears = [...new Set(movies.map((movie: any) => movie.year))].sort(
    (a, b) => b - a
  );

  useEffect(() => {
    if (movies.length > 0) {
      let results = [...movies];

      // Apply search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        results = results.filter(
          (movie: any) =>
            movie.name.toLowerCase().includes(searchLower) ||
            movie.detail?.toLowerCase().includes(searchLower)
        );
      }

      // Apply genre filter
      if (filters.selectedGenre) {
        results = results.filter(
          (movie: any) =>
            genres.data
              .map((genre: any) => genre._id)
              .includes(filters.selectedGenre) &&
            movie.genre === filters.selectedGenre
        );
      }

      // Apply year filter
      if (filters.selectedYear) {
        results = results.filter(
          (movie: any) => movie.year.toString() === filters.selectedYear
        );
      }

      setFilteredMovies(results);
    }
  }, [movies, filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recommended Movies</h1>

      <MovieTab activeTab="Recommended" />

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="searchTerm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search movies..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="selectedGenre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Genre
            </label>
            <select
              id="selectedGenre"
              name="selectedGenre"
              value={filters.selectedGenre}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Genres</option>
              {genres.data.map((genre: any) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="selectedYear"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year
            </label>
            <select
              id="selectedYear"
              name="selectedYear"
              value={filters.selectedYear}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year: number) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">
            Error loading movies. Please try again.
          </p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No movies found matching your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie: any) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomMovies;
