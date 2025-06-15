import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLink {
  path: string;
  name: string;
  icon: React.ReactNode;
}

interface SiderUtilsProps {
  links: SidebarLink[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  title?: string;
}

const SiderUtils = ({
  links,
  collapsed = false,
  onToggleCollapse,
  title = "Dashboard",
}: SiderUtilsProps) => {
  const location = useLocation();

  return (
    <div
      className={`h-screen bg-white shadow-lg transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-xl font-bold">{title}</h2>}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {collapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              )}
            </svg>
          </button>
        )}
      </div>

      <div className="py-4">
        <ul className="space-y-2">
          {links.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  } transition-colors`}
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  {!collapsed && <span className="ml-3">{link.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {collapsed ? "U" : "User"}
            </span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium">User Account</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiderUtils;
