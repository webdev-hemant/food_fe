import React, { useEffect, useState } from "react";
import {
  fetchAllIngredients,
  createIngredient,
  updateIngredient,
} from "../api/ingredients";

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
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    protein_g: "",
    carbs_g: "",
    fiber_g: "",
    fat_g: "",
    vitamins: "",
    minerals: "",
  });

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      const data = await fetchAllIngredients();
      setIngredients(data);
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDetails = (id) => {
    setVisibleCard((prev) => (prev === id ? null : id));
  };

  const openForm = (ingredient = null) => {
    if (ingredient) {
      setFormData({ ...ingredient });
    } else {
      setFormData({
        id: null,
        name: "",
        protein_g: "",
        carbs_g: "",
        fiber_g: "",
        fat_g: "",
        vitamins: "",
        minerals: "",
      });
    }
    setFormVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateIngredient(formData);
      } else {
        await createIngredient(formData);
      }
      await loadIngredients();
      setFormVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ingredients</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => openForm()}
        >
          + Add Ingredient
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ingredients.map((ingredient, index) => {
          const colorClass = cardColors[index % cardColors.length];
          return (
            <div
              key={ingredient.id}
              className={`${colorClass} rounded-xl p-4 shadow-lg relative transition hover:shadow-2xl`}
            >
              <div
                className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
                onClick={() => openForm(ingredient)}
              >
                ✏️
              </div>
              <h3
                className="text-lg font-semibold mb-2 cursor-pointer"
                onClick={() => toggleDetails(ingredient.id)}
              >
                {ingredient.name}
              </h3>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  visibleCard === ingredient.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
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

      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-bold mb-2">
              {formData.id ? "Edit Ingredient" : "Add Ingredient"}
            </h3>
            {["name", "protein_g", "carbs_g", "fiber_g", "fat_g", "vitamins", "minerals"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.replace(/_/g, " ")}
                className="w-full border rounded-lg px-3 py-2"
              />
            ))}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setFormVisible(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {formData.id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
