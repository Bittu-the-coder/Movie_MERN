import React from "react";
import { Link } from "react-router-dom";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import Loader from "../../components/Loader";

const Header = () => {
  const { data: newMovies, isLoading } = useGetNewMoviesQuery();

  // Select a featured movie for the header banner
  const featuredMovie = newMovies && newMovies.length > 0 ? newMovies[0] : null;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="font-medium text-gray-800 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="font-medium text-gray-800 hover:text-blue-600 transition"
          >
            Movies
          </Link>
          <Link
            to="/movies/top"
            className="font-medium text-gray-800 hover:text-blue-600 transition"
          >
            Top Rated
          </Link>
        </nav>

        <div>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : featuredMovie ? (
        <div className="relative rounded-xl overflow-hidden h-[400px] shadow-xl">
          <img
            src={
              featuredMovie.image
                ? `http://localhost:3000/${featuredMovie.image}`
                : "/placeholder-banner.jpg"
            }
            alt={featuredMovie.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/placeholder-banner.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent">
            <div className="p-8 h-full flex flex-col justify-end">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {featuredMovie.name}
              </h2>
              <p className="text-gray-200 mb-4 max-w-2xl line-clamp-2">
                {featuredMovie.detail}
              </p>
              <Link
                to={`/movie/${featuredMovie._id}`}
                className="bg-blue-600 text-white w-max px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
