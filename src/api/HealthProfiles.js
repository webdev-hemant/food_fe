// api/HealthProfiles.js

import axios from "axios";

export const fetchHealthProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:5000/api/healthProfile/get-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const updateHealthProfile = async (updatedData) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "http://localhost:5000/api/healthProfile/update",
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Update Error:", error.response?.data || error.message);
    throw error;
  }
};
