// src/api/mealLogs.js
import axios from "axios";

export const fetchMealLogsByDate = async (date) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`http://localhost:5000/api/meals/log/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data; // assuming API returns { message, data: [...] }
};
