import { useState } from "react";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="-translate-y-10 z-30 flex h-screen fixed mt-10 border-r-2 border-gray-200 bg-white transition-all duration-300">
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } flex-shrink-0 transition-all duration-300`}
      >
        <button
          className="p-2 mt-2 ml-4 text-gray-600 hover:bg-purple-50"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <GoSidebarCollapse size={20} />
          ) : (
            <GoSidebarExpand size={20} />
          )}
        </button>
        <ul className="py-4">
          {isSidebarOpen ? (
            <>
              <li
                className={`text-lg ${
                  isActiveLink("/admin/movies/dashboard")
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-50 text-gray-800"
                } rounded-lg mx-4`}
              >
                <Link to="/admin/movies/dashboard" className="block p-3">
                  Dashboard
                </Link>
              </li>
              <li
                className={`text-lg mt-2 ${
                  isActiveLink("/admin/movies/create")
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-50 text-gray-800"
                } rounded-lg mx-4`}
              >
                <Link to="/admin/movies/create" className="block p-3">
                  Create Movie
                </Link>
              </li>
              <li
                className={`text-lg mt-2 ${
                  isActiveLink("/admin/movies/genre")
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-50 text-gray-800"
                } rounded-lg mx-4`}
              >
                <Link to="/admin/movies/genre" className="block p-3">
                  Create Genre
                </Link>
              </li>
              <li
                className={`text-lg mt-2 ${
                  isActiveLink("/admin/movies-list")
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-50 text-gray-800"
                } rounded-lg mx-4`}
              >
                <Link to="/admin/movies-list" className="block p-3">
                  Update Movie
                </Link>
              </li>
              <li
                className={`text-lg mt-2 ${
                  isActiveLink("/admin/movies/comments")
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-50 text-gray-800"
                } rounded-lg mx-4`}
              >
                <Link to="/admin/movies/comments" className="block p-3">
                  Comments
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-center my-4">
                <Link
                  to="/admin/movies/dashboard"
                  className="block p-2 hover:bg-purple-50"
                >
                  <span
                    className={`${
                      isActiveLink("/admin/movies/dashboard")
                        ? "text-purple-600"
                        : ""
                    }`}
                  >
                    📊
                  </span>
                </Link>
              </li>
              <li className="text-center my-4">
                <Link
                  to="/admin/movies/create"
                  className="block p-2 hover:bg-purple-50"
                >
                  <span
                    className={`${
                      isActiveLink("/admin/movies/create")
                        ? "text-purple-600"
                        : ""
                    }`}
                  >
                    ➕
                  </span>
                </Link>
              </li>
              <li className="text-center my-4">
                <Link
                  to="/admin/movies/genre"
                  className="block p-2 hover:bg-purple-50"
                >
                  <span
                    className={`${
                      isActiveLink("/admin/movies/genre")
                        ? "text-purple-600"
                        : ""
                    }`}
                  >
                    🏷️
                  </span>
                </Link>
              </li>
              <li className="text-center my-4">
                <Link
                  to="/admin/movies-list"
                  className="block p-2 hover:bg-purple-50"
                >
                  <span
                    className={`${
                      isActiveLink("/admin/movies-list")
                        ? "text-purple-600"
                        : ""
                    }`}
                  >
                    📝
                  </span>
                </Link>
              </li>
              <li className="text-center my-4">
                <Link
                  to="/admin/movies/comments"
                  className="block p-2 hover:bg-purple-50"
                >
                  <span
                    className={`${
                      isActiveLink("/admin/movies/comments")
                        ? "text-purple-600"
                        : ""
                    }`}
                  >
                    💬
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
