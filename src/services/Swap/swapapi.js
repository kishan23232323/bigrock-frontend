import API from "../../config/axios";

export const storeSwapTransaction = async ({
    userAddress,
    txHash,
    chainId,
    txLink,
    amountUSD
}) => {
    try {
        const response = await API.post("/api/v1/swap/swap-complete", {
            userAddress,
            txHash,
            chainId,
            txLink,
            amountUSD
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const kolApiTransaction = async ({ txHash, amountUSD, fromToken, toToken, userAddress }) => {
    try {
        const response = await API.post("/api/v1/kol/store-tx", {
            txHash,
            amountUSD,
            fromToken,
            toToken,
            userAddress
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const mapWalletToKolApi = async ({ walletAddress, kolUid }) => {
    try {
        const response = await API.post("/api/v1/kol/mapping", {
            walletAddress,
            kolUid
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const applyForKolApi = async ({ fullName, email }) => {
    try {
        const response = await API.post("/api/v1/kol/apply-kol", {
            fullName,
            email
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const approveKolApi = async (kolId) => {
    try {
        const response = await API.post(`/api/v1/kol/application/${kolId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const validateKol = async (kolUid) => {
    try {
        const res = await API.get(`/api/v1/kol/validate/${kolUid}`);
        return res.data?.success === true;
    } catch {
        return false;
    }
};

export const getAllKolsApi = async ({ page, search }) => {
    const res = await API.get("/api/v1/kol/admin/kols", {
        params: { page, search }
    });
    return res.data.data;
};

export const getMyKolDataApi = async () => {
    try {
        const res = await API.get("/api/v1/kol/me");
        return res.data.data;
    } catch (err) {
        throw err.response?.data || err;
    }
};

export const getLeaderboardApi = async ({ page = 1, limit = 40 } = {}) => {
  try {
    const res = await API.get("/api/v1/swap/leaderboard", {
      params: { page, limit }
    });

    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getUserRankApi = async (userAddress) => {
  try {
    const res = await API.get(`/api/v1/swap/leaderboard/${userAddress}`);

    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};