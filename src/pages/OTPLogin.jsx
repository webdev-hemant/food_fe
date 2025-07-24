import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OTPLogin = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/sendOtpForLogin", {
        mobileNumber,
      });
      alert("OTP sent successfully: " + res.data.otp); // Dev only
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verifyOtpForLogin", {
        mobileNumber,
        otp,
      });

      const { token, mobileUser } = res.data;
      login(mobileUser, token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login with OTP</h2>

        {!otpSent ? (
          <>
            <label className="block text-gray-700 mb-2">Mobile Number</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block text-gray-700 mb-2">Enter OTP</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              onClick={verifyOtp}
            >
              Verify OTP & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OTPLogin;
