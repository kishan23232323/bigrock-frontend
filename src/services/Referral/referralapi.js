// services/Referral/referralapi.js
import API from "../../config/axios";

export const getHighReferralUsers = async ({ page = 1, limit = 10, search = "" }) => {
    try {
        const response = await API.get(
            `/api/v1/users/high-referrals?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
        );

        return response.data; // ✅ return full object
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
