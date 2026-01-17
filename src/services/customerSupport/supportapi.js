import API from "../../config/axios";

export const getSupportQueries = async ({ search = "", page = 1, limit = 10, token }) => {
    try {
        if (!token) {
            console.log("User not logged in");
            return;
        }

        const response = await API.get(
            "/api/v1/customer-support/queries",
            {
                params: { search, page, limit },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache"
                }
            }
        );

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

/**
 * Mark support query as resolved / in_progress
 */
export const updateSupportQueryStatus = async ({ queryId, status, token }) => {
    try {
        if (!token) {
            console.log("User not logged in");
            return;
        }

        const response = await API.patch(
            `/api/v1/customer-support/query/${queryId}/status`,
            { status },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


