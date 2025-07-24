// src/api/auth.js
import axios from "axios";

const GATEWAY_BASE_URL = "http://localhost:8090/auth/api";
const LOCAL_BASE_URL = "http://localhost:5000/api/auth";

export const registerUsingMobile = async (payload) => {
  const response = await axios.post(`${GATEWAY_BASE_URL}/registerUsingMobile`, payload);
  return response.data;
};

export const sendOtpForLogin = async (mobileNumber) => {
  const response = await axios.post(`${LOCAL_BASE_URL}/sendOtpForLogin`, { mobileNumber });
  return response.data;
};

export const verifyOtpForLogin = async (payload) => {
  const response = await axios.post(`${LOCAL_BASE_URL}/verifyOtpForLogin`, payload);
  return response.data;
};
