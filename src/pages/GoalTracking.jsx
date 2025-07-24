// src/pages/GoalTracking.jsx

import React, { useEffect, useState } from "react";
import { fetchGoalRecommendations, fetchCalorieHistory } from "../api/goals";

const GoalTracking = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGoalData = async () => {
      try {
        const rec = await fetchGoalRecommendations();
        const hist = await fetchCalorieHistory();
        setRecommendations(rec);
        setHistory(hist);
      } catch (error) {
        console.error("Error loading goal data", error);
      } finally {
        setLoading(false);
      }
    };
    loadGoalData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Goal Recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {recommendations?.map((entry, idx) => {
          const [label, data] = Object.entries(entry)[0];
          return (
            <div key={idx} className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold capitalize mb-2 text-gray-700">{label}</h3>
              {Object.entries(data).map(([key, val]) => (
                <p key={key} className="text-sm text-gray-600">
                  {key}: <span className="font-medium">{val}</span>
                </p>
              ))}
            </div>
          );
        })}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Calorie Tracking History</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Calories</th>
              <th className="px-4 py-2">Protein</th>
              <th className="px-4 py-2">Carbs</th>
              <th className="px-4 py-2">Fat</th>
              <th className="px-4 py-2">Fiber</th>
              <th className="px-4 py-2">Water (L)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.trackId} className="border-t">
                <td className="px-4 py-2">{entry.date}</td>
                <td className="px-4 py-2">{entry.calories}</td>
                <td className="px-4 py-2">{entry.protein}</td>
                <td className="px-4 py-2">{entry.carbs}</td>
                <td className="px-4 py-2">{entry.fat}</td>
                <td className="px-4 py-2">{entry.fiber}</td>
                <td className="px-4 py-2">{entry.water}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoalTracking;
