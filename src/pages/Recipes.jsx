import React, { useEffect, useState } from "react";
import { fetchAllRecipes, createRecipe, updateRecipe } from "../api/recipes";

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
  const [formData, setFormData] = useState({
    recipe_name: "",
    ingredients_used: "",
    protein_g: "",
    carbs_g: "",
    fiber_g: "",
    fat_g: "",
  });
  const [editingId, setEditingId] = useState(null);

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

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRecipe(editingId, formData);
      } else {
        await createRecipe(formData);
      }
      setFormData({
        recipe_name: "",
        ingredients_used: "",
        protein_g: "",
        carbs_g: "",
        fiber_g: "",
        fat_g: "",
      });
      setEditingId(null);
      loadRecipes();
    } catch (error) {
      console.error("Failed to submit recipe:", error);
    }
  };

  const handleEdit = (recipe) => {
    setFormData({
      recipe_name: recipe.recipe_name,
      ingredients_used: recipe.ingredients_used,
      protein_g: recipe.protein_g,
      carbs_g: recipe.carbs_g,
      fiber_g: recipe.fiber_g,
      fat_g: recipe.fat_g,
    });
    setEditingId(recipe.id);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 rounded-lg shadow"
      >
        <input
          type="text"
          name="recipe_name"
          placeholder="Recipe Name"
          value={formData.recipe_name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="ingredients_used"
          placeholder="Ingredients Used"
          value={formData.ingredients_used}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="protein_g"
          placeholder="Protein (g)"
          value={formData.protein_g}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="carbs_g"
          placeholder="Carbs (g)"
          value={formData.carbs_g}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="fiber_g"
          placeholder="Fiber (g)"
          value={formData.fiber_g}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="fat_g"
          placeholder="Fat (g)"
          value={formData.fat_g}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
        >
          {editingId ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>

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
                <button
                  onClick={() => handleEdit(recipe)}
                  className="mt-2 text-sm text-blue-700 underline"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recipes;
