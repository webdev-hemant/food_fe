import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/users";
import { fetchAllRecipes } from "../api/recipes";
import { fetchAllIngredients } from "../api/ingredients";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(0);
  const [ingredientCount, setIngredientCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await getAllUsers();
        const recipes = await fetchAllRecipes();
        const ingredients = await fetchAllIngredients();

        setUserCount(users?.users.total || 0);
        setRecipeCount(recipes?.length || 0);
        setIngredientCount(ingredients?.length || 0);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome to your dashboard!</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Total Users" value={userCount} icon="👥" />
        <Card title="Orders" value={352} icon="📦" />
        <Card title="Revenue" value="₹89,200" icon="💰" />
        <Card title="Sessions" value="4,827" icon="📈" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Recipes" value={recipeCount} icon="🍽️" />
        <Card title="Total Ingredients" value={ingredientCount} icon="🥦" />
        {/* Optional: Empty cards to fill the row evenly */}
        <Card empty />
        <Card empty />
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, empty = false }) => {
  if (empty) {
    return <div className="bg-transparent rounded-2xl p-6" />;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition h-full">
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
