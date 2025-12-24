import API from "../../config/axios";

/**
 * Store LI.FI swap transaction
 * @param {Object} payload
 * @param {string} payload.userAddress
 * @param {string} payload.txHash
 */
export const storeSwapTransaction = async ({ userAddress, txHash }) => {
    try {
        const response = await API.post("/api/v1/swap/swap-complete", {
            userAddress,
            txHash,
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
