import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {!user && (
          <>
            <NavLink to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
              Dashboard
            </NavLink>
            <h2 className="text-gray-400 text-xs uppercase tracking-widest font-semibold mt-6 mb-3">
              Authentication
            </h2>
            <NavLink to="/login" className="hover:bg-gray-700 px-3 py-2 rounded">
              Login
            </NavLink>
            <NavLink to="/register" className="hover:bg-gray-700 px-3 py-2 rounded">
              Register
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
              Dashboard
            </NavLink>
            <h2 className="text-gray-400 text-xs uppercase tracking-widest font-semibold mt-6 mb-3">
              Utilities
            </h2>
            <NavLink to="/users" className="hover:bg-gray-700 px-3 py-2 rounded">
              Users
            </NavLink>
            <NavLink to="/ingredients" className="hover:bg-gray-700 px-3 py-2 rounded">
              Ingredients
            </NavLink>
            <NavLink to="/recipes" className="hover:bg-gray-700 px-3 py-2 rounded">
              Recipes
            </NavLink>
            <NavLink to="/meallogs" className="hover:bg-gray-700 px-3 py-2 rounded">
              Meal Logs
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
