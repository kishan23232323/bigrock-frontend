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
