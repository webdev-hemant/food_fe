// src/api/goals.js

import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/goals",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchGoalRecommendations = async () => {
  const res = await axiosInstance.get("/recommendations");
  return res.data;
};

export const fetchCalorieHistory = async () => {
  const res = await axiosInstance.get("/history");
  return res.data.data; // Extracting "data" from the API response
};
