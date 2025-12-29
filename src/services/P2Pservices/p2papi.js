import API from "../../config/axios";


export const getFiatPairs = async () => {
  try {
    const response = await API.get("/api/v1/p2p/get-list");
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createSellOrder = async ({
  usdtAmount,
  fiatAmount,
  paymentMethod,
  receiverDetails,
  country,
  network
}) => {
  try {
    const response = await API.post("/api/v1/p2p/sell", {
      usdtAmount,
      fiatAmount,
      paymentMethod,
      receiverDetails,
      country,
      network,
    });

    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const confirmSellOrder = async ({ orderId, txnHash, proof }) => {
  try {
    const formData = new FormData();
    formData.append("txnHash", txnHash);
    if (proof) formData.append("proof", proof);

    const response = await API.patch(
      `/api/v1/p2p/confirm-sell/${orderId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

//
// ---------------------------
// CREATE BUY ORDER
// ---------------------------
//
export const createBuyOrder = async ({
  usdtAmount,
  fiatAmount,
  paymentMethod,
  country,
  usdtWalletAddress,
  network
}) => {
  try {
    const response = await API.post("/api/v1/p2p/buy", {
      usdtAmount,
      fiatAmount,
      paymentMethod,
      country,
      usdtWalletAddress,
      network
    });

    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

//
// ---------------------------
// CONFIRM BUY ORDER (upload payment proof)
// ---------------------------
//
export const confirmBuyOrder = async ({ orderId, proof }) => {
  try {
    const formData = new FormData();
    if (proof) formData.append("proof", proof);

    const response = await API.patch(
      `/api/v1/p2p/confirm-buy/${orderId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

//
// ---------------------------
// MY ORDERS (user)
// ---------------------------
//
export const getMyOrders = async () => {
  try {
    const response = await API.get("/api/v1/p2p/my-orders");
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await API.patch(`/api/v1/p2p/cancel-order/${orderId}`);
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const requestCancelOrder = async (orderId) => {
  try {
    const response = await API.patch(
      `/api/v1/p2p/request-cancel/${orderId}`
    );
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

//
// -----------------------------------------------------
// ADMIN APIs
// -----------------------------------------------------
//

// Fetch all pending
export const adminGetPendingOrders = async () => {
  try {
    const response = await API.get("/api/v1/p2p/admin/orders");
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Approve
export const adminApproveOrder = async (orderId) => {
  try {
    const response = await API.patch(
      `/api/v1/p2p/admin/approve/${orderId}`
    );
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Reject
export const adminRejectOrder = async (orderId, reason) => {
  try {
    const response = await API.patch(
      `/api/v1/p2p/admin/reject/${orderId}`,
      { reason }
    );
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get all orders (admin)
export const adminGetAllOrders = async ({ page = 1, search = "", limit=10 }) => {
  try {
    const response = await API.get(`/api/v1/p2p/admin/all-orders?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get orders by userId (admin)
export const adminGetOrdersByUserId = async (userId) => {
  try {
    const response = await API.get(
      `/api/v1/p2p/admin/user-orders/${userId}`
    );
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const adminOrderStatusUpdate = async (orderId, status) => {
  try {
    const response = await API.patch(
      `/api/v1/p2p/admin/status-update/${orderId}`,
      { status }
    );
    return response.data?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};