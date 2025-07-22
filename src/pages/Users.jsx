import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [emailUsers, setEmailUsers] = useState([]);
  const [mobileUsers, setMobileUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/getAllUsers");
        const users = res.data.users;
        setEmailUsers(users.emailUsers || []);
        setMobileUsers(users.mobileUsers || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredEmailUsers = emailUsers.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMobileUsers = mobileUsers.filter(
    (user) =>
      user.mobileNumber?.includes(searchTerm) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <input
        type="text"
        placeholder="Search by name, email, or number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Email Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Birthdate</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmailUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.firstName}</td>
                  <td className="p-2">{user.lastName}</td>
                  <td className="p-2">{new Date(user.birthdate).toLocaleDateString()}</td>
                </tr>
              ))}
              {filteredEmailUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No email users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Mobile Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Mobile</th>
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Verified</th>
              </tr>
            </thead>
            <tbody>
              {filteredMobileUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{user.countryCode} {user.mobileNumber}</td>
                  <td className="p-2">{user.firstName}</td>
                  <td className="p-2">{user.lastName}</td>
                  <td className="p-2">{user.isVerified ? "✅" : "❌"}</td>
                </tr>
              ))}
              {filteredMobileUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">No mobile users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
