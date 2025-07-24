import React, { useEffect, useState } from "react";
import { fetchHealthProfile, updateHealthProfile } from "../api/HealthProfiles";

const HealthProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHealthProfile();
      setProfile(data);
      setFormData(data);
    } catch (err) {
      console.error("Failed to fetch health profile", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateHealthProfile(formData);
      setProfile(formData);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600 text-lg">⏳ Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={loadProfile}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No health profile found.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="text-blue-500 hover:text-blue-700"
          title="Edit"
        >
          ✏️
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🧬 Health Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        {fields.map(({ label, name }) => (
          <div key={name} className="bg-gray-100 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            {editMode ? (
              <input
                type="text"
                name={name}
                value={formData[name] ?? ""}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            ) : (
              <p className="text-lg font-semibold">{profile[name] ?? "N/A"}</p>
            )}
          </div>
        ))}
      </div>

      {editMode && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={() => {
              setFormData(profile);
              setEditMode(false);
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const fields = [
  { label: "Age", name: "age" },
  { label: "Gender", name: "gender" },
  { label: "Height (cm)", name: "height" },
  { label: "Weight (kg)", name: "weight" },
  { label: "Activity Level", name: "activityLevel" },
  { label: "Health Goal", name: "healthGoal" },
];

export default HealthProfile;
