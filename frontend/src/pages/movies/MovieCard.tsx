import React from "react";
import { Link } from "react-router-dom";
import { useFetchGenresQuery } from "../../redux/api/genre";

interface MovieCardProps {
  movie: {
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
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { data: genres } = useFetchGenresQuery();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/movie/${movie._id}`}>
        <div className="relative pb-[140%]">
          <img
            src={
              movie.image
                ? `http://localhost:3000/${movie.image}`
                : "/placeholder-movie.jpg"
            }
            alt={movie.name}
            className="absolute w-full h-full object-cover"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/placeholder-movie.jpg";
            }}
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
            {movie.year}
          </div>
          {movie.rating && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded flex items-center">
              <span className="mr-1">★</span>
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/movie/${movie._id}`} className="hover:text-blue-600">
          <h3 className="font-medium text-lg mb-1 truncate">{movie.name}</h3>
        </Link>
        <div className="flex justify-between items-center text-sm">
          <span className="bg-gray-200 px-2 py-1 rounded text-gray-700">
            {genres?.data?.find((g: any) => g._id === movie.genre)?.name ||
              "Unknown"}
          </span>
          {movie.numReviews !== undefined && (
            <span className="text-gray-500">{movie.numReviews} reviews</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
