import React from "react";
import { Link, useLocation } from "react-router-dom";

interface TabItem {
  name: string;
  path: string;
}

const MovieTab: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const location = useLocation();

  const tabs: TabItem[] = [
    { name: "All Movies", path: "/movies" },
    { name: "New Releases", path: "/movies/new" },
    { name: "Top Rated", path: "/movies/top" },
    { name: "Recommended", path: "/movies/random" },
  ];

  return (
    <div className="bg-white shadow-md rounded-md mb-8">
      <div className="flex overflow-x-auto">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.name;

          return (
            <Link
              key={index}
              to={tab.path}
              className={`px-6 py-4 text-center whitespace-nowrap font-medium text-sm transition
                ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent"
                }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MovieTab;
