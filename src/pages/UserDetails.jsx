import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/getAllUsers");
        const allUsers = [
          ...(res.data.users.emailUsers || []),
          ...(res.data.users.mobileUsers || []),
        ];
        const found = allUsers.find((u) => u.id === id);
        setUser(found);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetch();
  }, [id]);

  if (!user) return <div className="p-4">Loading or user not found...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="bg-white shadow p-4 rounded">
        {Object.entries(user).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetail;
