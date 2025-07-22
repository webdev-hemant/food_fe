import React, { useEffect, useState } from "react";
import { fetchAllRecipes } from "../api/recipes";

const bgColors = [
  "bg-red-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-orange-100",
  "bg-emerald-100",
];

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Recipes</h2>
      {recipes.length === 0 ? (
        <div>No recipes found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recipes.map((recipe, index) => {
            const bgColor = bgColors[index % bgColors.length];
            return (
              <div
                key={recipe.id}
                className={`rounded-xl p-5 shadow-md ${bgColor} transition-shadow hover:shadow-lg`}
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {recipe.recipe_name}
                </h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Ingredients:</strong> {recipe.ingredients_used}</p>
                  <p>Protein: {recipe.protein_g}g</p>
                  <p>Carbs: {recipe.carbs_g}g</p>
                  <p>Fiber: {recipe.fiber_g}g</p>
                  <p>Fat: {recipe.fat_g}g</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recipes;
