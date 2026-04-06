import axiosClient from "@/libs/axiosClient";
import ENDPOINTS from "@/libs/api";

export const registerUser = async (userData: any) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const otpVerification = async (userData: any) => {
  try {
    const response = await axiosClient.post(
      ENDPOINTS.OTP_VERIFICATION,
      userData,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (userData: any) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.LOGIN, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
