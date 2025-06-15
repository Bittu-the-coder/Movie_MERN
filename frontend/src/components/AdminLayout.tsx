import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", name: "Dashboard" },
    { path: "/admin/movies", name: "Movies" },
    { path: "/admin/genres", name: "Genres" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-600">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3 text-sm ${
                location.pathname === item.path
                  ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
