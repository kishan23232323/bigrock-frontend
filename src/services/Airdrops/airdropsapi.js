import API from "../../config/axios";

export const getAirdrops = async () => {
  try {
    const resp = await API.get('/api/v1/airdrops/my');
    return resp.data?.data || [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const claimAirdrop = async (id) => {
  try {
    const resp = await API.post('/api/v1/airdrops/claim', { airdropId: id });
    return resp.data || { success: true, message: 'Claimed' };
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const saveWalletAddress = async ({ walletAddress, token }) => {
  try {
    if (!token) {
      console.log("User not logged in");
      return;
    }

    const response = await API.post(
      "/api/v1/users/wallet",
      { walletAddress },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
