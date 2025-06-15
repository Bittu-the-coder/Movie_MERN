import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[28rem] bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Realtime</h2>
      <p className="text-gray-500 mb-4">Update Live</p>
      <div className="border-t border-gray-200 my-7"></div>
      <h2 className="text-2xl font-bold mb-2 text-purple-600">
        {visitors?.length}
      </h2>
      <p className="text-gray-500 mb-2">Subscribe</p>
      <div className="border-t border-gray-200 my-4"></div>

      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;
