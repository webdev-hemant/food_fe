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

export const updateIngredient = async (id, updatedData) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(`http://localhost:5000/api/ingredients/update/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createIngredient = async (newIngredient) => {
  const token = localStorage.getItem("token");

  const res = await axios.post("http://localhost:5000/api/ingredients/create", newIngredient, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
