import axios from "axios";

export const fetchAllRecipes = async () => {
  const token = localStorage.getItem("token"); // or sessionStorage depending on where you store it

  const res = await axios.get("http://localhost:5000/api/recipes/get-all-recipe", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data; // assuming response has { data: [...] }
};
