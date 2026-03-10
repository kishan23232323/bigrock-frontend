import { useDispatch } from "react-redux";
import API from "../../config/axios";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await API.post("/api/v1/users/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const registerUser = async ({ name, email, password, role, referral }) => {
  try {
    const response = await API.post("/api/v1/users/register", {
      name,
      email,
      password,
      role,
      referral
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("User not logged in");
      return
    }
    const response = await API.post("/api/v1/users/logout");
    localStorage.removeItem("accessToken");
    console.log(localStorage.getItem("accessToken"))
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}


export const getUserProfile = async (token) => {
  try {
    if (!token) {
      console.log("User not logged in");
      return null;
    }

    const response = await API.get("/api/v1/users/profile");

    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const updateUserProfile = async ({ name, email }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("User not logged in");
      return
    }
    const response = await API.patch(`/api/v1/users/update-account`, {
      name,
      email
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("User not logged in");
      return
    }
    const response = await API.post(`/api/v1/users/change-password`, { oldPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const verifyEmail = async (token) => {
  try {
    const response = await API.get(`/api/v1/users/verify-email/${token}`);
    return response.data; 
    // returns { user, accessToken, refreshToken }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await API.post(
      "/api/v1/users/resend-verification-email",
      { email }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await API.post(
      "/api/v1/users/forgot-password",
      { email }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await API.post(
      `/api/v1/users/reset-password/${token}`,
      { newPassword }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

