import axios from "axios";

export const fetchAllIngredients = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:5000/api/ingredients/get-all-ingredients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data; // assuming the response format is { data: [...] }
};
