// src/pages/MealLog.jsx
import React, { useEffect, useState } from "react";
import { fetchMealLogsByDate } from "../api/mealLogs";

const MealLog = () => {
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      try {
        const data = await fetchMealLogsByDate(date);
        setLogs(data || []);
      } catch (err) {
        console.error("Failed to fetch meal logs:", err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, [date]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Meal Logs</h2>
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>No meal logs found for this date.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white shadow-md rounded-xl p-4"
            >
              <p className="text-sm text-gray-500 mb-1">
                Date: {log.date}
              </p>
              <div className="mt-2">
                <p className="font-semibold">Meals:</p>
                <ul className="list-disc list-inside">
                  {log.meals.map((meal, i) => (
                    <li key={i}>{meal}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealLog;
