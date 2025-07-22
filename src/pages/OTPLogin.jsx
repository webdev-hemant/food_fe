import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTPLogin = () => {
  const [step, setStep] = useState(1);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [otp, setOtp] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/sendOtpForLogin", {
        emailOrUsername,
      });
      if (res.data.success) {
        setStep(2);
        alert("OTP sent to your email.");
      }
    } catch (err) {
      alert("Error sending OTP: " + err?.response?.data?.message || err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verifyOtpForLogin", {
        emailOrUsername,
        otp,
      });
      if (res.data.success && res.data.token) {
        login(res.data.user, res.data.token);
        toast.success("Logged in successfully!");

        navigate("/dashboard");
      } else {
        alert("Invalid OTP or login failed.");
      }
    } catch (err) {
      alert("Error verifying OTP: " + err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-600">
          OTP Login
        </h2>

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email or username"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Verify & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OTPLogin;
