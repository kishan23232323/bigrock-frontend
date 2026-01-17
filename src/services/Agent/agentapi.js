import API from "../../config/axios";


/**
 * Get orders assigned to logged-in agent
 */
export const agentGetOrders = async ({ page = 1, search = "" }) => {
  try {
    const res = await API.get(
      `/api/v1/agent/orders?page=${page}&limit=10&search=${encodeURIComponent(
        search
      )}`
    );
    return res.data?.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

/**
 * Upload agent proof (image + hash)
 */
export const agentUploadProof = async ({
  orderId,
  proofImage,
  agentProofHash,
}) => {
  try {
    const formData = new FormData();
    formData.append("proof", proofImage);
    formData.append("agentProofHash", agentProofHash);

    const res = await API.post(
      `/api/v1/agent/upload-proofs/${orderId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data?.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const applyForAgent = async ({
    phoneNumber,
    dob,
    socialId,
    addressProof,
    identityProof
}) => {
    try {
        const formData = new FormData();    
        formData.append("phoneNumber", phoneNumber);
        formData.append("dob", dob);
        formData.append("socialId", socialId);
        formData.append("addressProof", addressProof);
        formData.append("identityProof", identityProof);

        const response = await API.post("/api/v1/agent/apply", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data?.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const adminGetAgentApplications = async ({ page = 1, search = "",limit = 10 }) => {
  const res = await API.get(
    `/api/v1/agent/admin/applications?page=${page}&limit=${limit}&search=${search}`
  );
  return res.data?.data;
};

export const adminAcceptAgent = async (agentId) => {
  const res = await API.patch(
    `/api/v1/agent/admin/accept-application/${agentId}`
  );
  return res.data?.data;
};

export const adminRejectAgent = async (agentId, adminRemark) => {
  const res = await API.patch(
    `/api/v1/agent/admin/reject-application/${agentId}`,
    { adminRemark }
  );
  return res.data?.data;
};

export const adminChangeAgentStatus = async (agentId, status, adminRemark) => {
  const res = await API.patch(
    `/api/v1/agent/admin/change-status/${agentId}`,
    { status, adminRemark }
  );
  return res.data?.data;
};
