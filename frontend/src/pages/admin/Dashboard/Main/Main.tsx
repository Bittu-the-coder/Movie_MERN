import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";
import {
  useGetMoviesQuery,
  useGetTopMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <>
      <section className="flex justify-around">
        <div className="ml-[14rem] mt-10 w-full pr-8">
          <div className="w-full flex justify-between">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more then usual"
              gradient="from-purple-500 to-purple-200"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more then usual"
              gradient="from-purple-600 to-purple-300"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372+ more then usual"
              gradient="from-purple-700 to-purple-400"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="flex justify-between w-full text-gray-800 font-bold mb-6">
              <p>Top Content</p>
              <p>Comments</p>
            </div>

            {topMovies?.map((movie) => (
              <VideoCard
                key={movie._id}
                image={`http://localhost:3000/${movie.image}`}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            ))}
          </div>
        </div>

        <div className="mr-8 mt-10">
          <RealTimeCard />
        </div>
      </section>
    </>
  );
};

export default Main;
