import API from "../../config/axios";

export const registerTeam = async (payload) => {
  try {
    const response = await API.post("/api/v1/hackathon/register-team", payload);
    return response.data?.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};