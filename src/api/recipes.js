import axios from "axios";

export const fetchAllRecipes = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:5000/api/recipes/get-all-recipe", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data; // assuming response has { data: [...] }
};

export const updateRecipe = async (updatedRecipe) => {
  const token = localStorage.getItem("token");

  const res = await axios.post("http://localhost:5000/api/recipes/update", updatedRecipe, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createRecipe = async (newRecipe) => {
  const token = localStorage.getItem("token");

  const res = await axios.post("http://localhost:5000/api/recipes/create", newRecipe, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
