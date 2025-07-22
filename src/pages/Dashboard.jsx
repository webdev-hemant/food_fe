import React from "react";
import StatCard from "../components/Statcard";
import { FaUsers, FaBoxOpen, FaDollarSign, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,204", icon: <FaUsers /> },
    { title: "Orders", value: "352", icon: <FaBoxOpen /> },
    { title: "Revenue", value: "₹89,200", icon: <FaDollarSign /> },
    { title: "Sessions", value: "4,827", icon: <FaChartLine /> },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to your dashboard!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
