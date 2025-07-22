import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            <FaUserCircle className="inline text-xl mr-1" />
            {user.username}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
