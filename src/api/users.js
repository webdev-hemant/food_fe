import axios from "axios";

export const getAllUsers = async () => {
  const res = await axios.get("http://localhost:5000/api/auth/getAllUsers");
  return res.data;
};
