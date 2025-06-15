import React from "react";
import Header from "./movies/Header";
import MovieContainerPage from "./movies/MovieContainerPage";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-6 rounded-lg mb-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to MovieMERN
        </h1>
        <p className="text-xl mb-8">
          Discover, explore and review your favorite movies
        </p>
        <Link
          to="/movies"
          className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Browse All Movies
        </Link>
      </div>

      <section className="mt-8">
        <MovieContainerPage />
      </section>
    </div>
  );
};

export default Home;
