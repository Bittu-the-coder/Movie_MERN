import { useGetUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">
        Congratulations!
      </h2>
      <p className="text-gray-700">
        You have {visitors?.length} new users watching your content.
      </p>
    </div>
  );
};

export default PrimaryCard;
