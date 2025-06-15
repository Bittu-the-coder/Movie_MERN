import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../redux/feature/auth/authSlice";
import { useLogoutMutation } from "../../redux/api/users";

const Navigation = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 468, y: 597 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && navRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Keep navigation bar within viewport bounds
      const nav = navRef.current;
      const maxX = window.innerWidth - nav.offsetWidth;
      const maxY = window.innerHeight - nav.offsetHeight;

      const boundedX = Math.min(Math.max(0, newX), maxX);
      const boundedY = Math.min(Math.max(0, newY), maxY);

      setPosition({ x: boundedX, y: boundedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);
  // console.log("position", position);

  return (
    <nav
      ref={navRef}
      className={`fixed z-50 w-[32rem] px-8 py-4 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-md cursor-move ${
        isDragging ? "select-none" : ""
      }`}
      style={{
        background:
          "linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 50%, #f3e8ff 100%)",
        transform: `translate(${position.x}px, ${position.y}px)`,
        bottom: "auto",
        left: "auto",
        transition: isDragging ? "none" : "transform 0.2s ease-out",
      }}
      onMouseDown={handleMouseDown}
    >
      <section className="flex justify-between items-center">
        {/* Section 1 */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center group">
            <AiOutlineHome
              className="mr-2 text-blue-700 group-hover:text-indigo-600 transition-colors"
              size={26}
            />
            <span className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors hidden md:inline">
              Home
            </span>
          </Link>
          <Link to="/movies" className="flex items-center group">
            <MdOutlineLocalMovies
              className="mr-2 text-purple-700 group-hover:text-fuchsia-600 transition-colors"
              size={26}
            />
            <span className="font-medium text-gray-800 group-hover:text-fuchsia-600 transition-colors hidden md:inline">
              Shop
            </span>
          </Link>
        </div>
        {/* Section 2 */}
        <div className="relative" ref={dropdownRef}>
          {dropdownOpen && userInfo && (
            <ul className="absolute transform -translate-y-full right-0 mb-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-indigo-700 rounded-t-xl transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-indigo-700 transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-indigo-700 rounded-b-xl transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 transition-colors focus:outline-none border border-gray-200 shadow"
            >
              <span className="text-gray-900 font-semibold">
                {userInfo.username}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : null}

          {!userInfo && (
            <ul className="flex gap-2">
              <li>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium shadow"
                >
                  <AiOutlineLogin className="mr-2" size={22} />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-100 to-fuchsia-100 text-gray-900 hover:from-purple-200 hover:to-fuchsia-200 transition-colors font-medium border border-gray-200 shadow"
                >
                  <AiOutlineUserAdd className="mr-2" size={22} />
                  <span className="hidden md:inline">Register</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navigation;
