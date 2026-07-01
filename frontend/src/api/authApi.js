import axiosInstance from "./axios";

export const register = async (userData) => {
  const { data } = await axiosInstance.post("/auth/register", userData);
  return data;
};

export const verifyOtp = async (otpData) => {
  const { data } = await axiosInstance.post("/auth/verify-otp", otpData);
  return data;
};

export const login = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
