// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPLogin from "./pages/OTPLogin";

import AuthContext from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gray-100 p-4">
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {/* Public routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/otp-login" element={!user ? <OTPLogin /> : <Navigate to="/dashboard" />} />

            {/* Protected routes */}
            <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
            <Route path="/ingredients" element={user ? <Ingredients /> : <Navigate to="/login" />} />
            <Route path="/recipes" element={user ? <Recipes /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
