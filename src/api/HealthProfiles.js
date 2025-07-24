import axios from "axios";

const API_BASE = "http://localhost:5000/api/healthProfile";

export const fetchHealthProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/get-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const updateHealthProfile = async (updatedData) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API_BASE}/update`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
