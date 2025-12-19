import API from "../../config/axios";


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

export const markWalletClaimed = async ({ address, token }) => {
  try {
    if (!token) {
      console.log("User not logged in");
      return;
    }

    const response = await API.post(
      "/api/v1/users/airdrop/wallet-reward-claimed",
      { address },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const markReferralClaimed = async ({ token }) => {
  try {
    if (!token) {
      console.log("User not logged in");
      return;
    }

    const response = await API.post(
      "/api/v1/users/airdrop/referral-reward-claimed",
      {}, // no body needed
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
