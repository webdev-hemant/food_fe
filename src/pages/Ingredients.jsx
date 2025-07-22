import React, { useEffect, useState } from "react";
import { fetchAllIngredients } from "../api/ingredients";

const cardColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-teal-100",
];

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCard, setVisibleCard] = useState(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await fetchAllIngredients();
        console.log("Fetched ingredients:", data);
        setIngredients(data);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  const toggleDetails = (id) => {
    setVisibleCard((prev) => (prev === id ? null : id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ingredients.map((ingredient, index) => {
          const colorClass = cardColors[index % cardColors.length];
          return (
            <div
              key={ingredient.id}
              className={`${colorClass} rounded-xl p-4 shadow-lg cursor-pointer transition hover:shadow-2xl`}
              onClick={() => toggleDetails(ingredient.id)}
            >
              <h3 className="text-lg font-semibold mb-2">{ingredient.name}</h3>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  visibleCard === ingredient.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p>Protein: {ingredient.protein_g}g</p>
                <p>Carbs: {ingredient.carbs_g}g</p>
                <p>Fiber: {ingredient.fiber_g}g</p>
                <p>Fat: {ingredient.fat_g}g</p>
                <p>Vitamins: {ingredient.vitamins}</p>
                <p>Minerals: {ingredient.minerals}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ingredients;
