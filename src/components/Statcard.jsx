import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4 w-full">
      <div className="text-blue-600 text-3xl">{icon}</div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
