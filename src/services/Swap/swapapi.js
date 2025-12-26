import API from "../../config/axios";

export const storeSwapTransaction = async ({ userAddress, internalTxnHash, }) => {
    try {
        const response = await API.post("/api/v1/swap/swap-complete", {
            userAddress,
            internalTxnHash,
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
