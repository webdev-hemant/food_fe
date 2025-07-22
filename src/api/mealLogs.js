import axios from "axios";

export const fetchAllMealLogs = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:5000/api/meallogs/get-all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
