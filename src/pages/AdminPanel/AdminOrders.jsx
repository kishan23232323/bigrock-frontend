import React, { useState, useEffect, useCallback } from "react";
import styles from "./AdminOrders.module.css";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoImageOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";

import {
  adminApproveOrder,
  adminRejectOrder,
  adminGetAllOrders,
} from "../../services/P2Pservices/p2papi";


const ImagePreviewModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <img src={src} alt="Payment Proof Preview" className={styles.modalImage} />
    </div>
  );
};

const PaymentDetails = ({ order }) => {
  const { paymentMethod, receiverDetails } = order;

  if (paymentMethod === "UPI") {
    return <p><strong>UPI ID:</strong> {receiverDetails?.upiId}</p>;
  }
  if (paymentMethod === "PAYPAL") {
    return <p><strong>PayPal:</strong> {receiverDetails?.paypalId}</p>;
  }
  if (paymentMethod === "BANK") {
    return (
      <>
        <p><strong>Account Holder:</strong> {receiverDetails?.bankHolderName}</p>
        <p><strong>Account No:</strong> {receiverDetails?.bankAccountNumber}</p>
        <p><strong>IFSC/SWIFT:</strong> {receiverDetails?.bankSwiftCode}</p>
      </>
    );
  }
  return null;
};

const OrderDetails = ({ order, onApprove, onReject, onPreviewImage }) => {

  return (
    <div >
      <div className={styles.detailsBox}>
<div className={styles.detailRow}>
  <span className={styles.detailLabel}>Order ID</span>
  <span className={styles.detailValueGray}>{order._id}</span>
</div>

<div className={styles.detailRow}>
  <span className={styles.detailLabel}>User Name</span>
  <span className={styles.detailValue}>{order.userId.name.toUpperCase() || "Unknown User"}</span>
</div>

<div className={styles.detailRow}>
  <span className={styles.detailLabel}>User UID</span>
  <span className={styles.detailValueGray}>{order.userId.uid}</span>
</div>

<div className={styles.detailRow}>
  <span className={styles.detailLabel}>Created On</span>
  <span className={styles.detailValue}>
    {new Date(order.createdAt).toLocaleString()}
  </span>
</div>


<div className={styles.detailRow}>
  <span className={styles.detailLabel}>Cancel Request</span>
  <span className={styles.detailValue} style={{ color: order.cancelRequest ? "#f87171" : "#4ade80" }}>
    {order.cancelRequest ? "Requested" : "No Request"}
  </span>
</div>

<div className={styles.detailRow}>
  <span className={styles.detailLabel}>Country</span>
  <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
    {order.country} 
  </span>
</div>

<div className={styles.detailRow}>
  <span className={styles.detailLabel}>USDT Amount</span>
  <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
    {order.usdtAmount} USDT
  </span>
</div>

<div className={styles.detailRow}>
  <span className={styles.detailLabel}>Fiat Amount</span>
  <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
    {order.fiatAmount} 
  </span>
</div>

<div className={styles.detailRow}>
  <span className={styles.detailLabel}>Network</span>
  <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
    {order.network} 
  </span>
</div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Payment Method</span>
        <span className={styles.detailValue}>{order.paymentMethod}</span>
      </div>

      {order.type === "BUY" && (
        <div className={styles.detailBlock}>
          <span className={styles.detailLabel}>User Wallet Address</span>
          <div className={styles.valueBox}>{order.usdtWalletAddress || "Not Provided"}</div>
          <span className={styles.detailLabel}>Admin Payment Details</span>
          <div className={styles.paymentCard}><PaymentDetails order={order} /></div>
        </div>
      )}

      {order.type === "SELL" && (
        <div className={styles.detailBlock}>
          <span className={styles.detailLabel}>User Payment Details</span>
          <div className={styles.paymentCard}><PaymentDetails order={order} /></div>
        </div>
      )}

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Transaction Hash</span>
        <span className={styles.detailValueGray}>{order.txnHash || "Not Provided"}</span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Payment Proof</span>
        {order.proofImage ? (
          <button className={styles.viewImgBtn} onClick={() => onPreviewImage(order.proofImage)}>
            <IoImageOutline size={20} /> View Proof
          </button>
        ) : (
          <span className={styles.detailValueGray}>No proof uploaded</span>
        )}
      </div>

      {order.status === "AWAITING_CONFIRMATION" && (
        <div className={styles.actionRow}>
          <button className={styles.approveBtn} onClick={() => onApprove(order._id)}>
            <IoCheckmarkCircleOutline size={22} /> Approve
          </button>
             <button className={styles.rejectBtn} onClick={onReject}>
            <IoCloseCircleOutline size={22} /> Reject
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

const OrderRow = ({ order, expanded, onToggle }) => {
  return (
    <div className={styles.orderRow} onClick={onToggle}>
      <div>
        <p className={styles.orderType}>{order.type === "BUY" ? "🟢 BUY ORDER" : "🔴 SELL ORDER"}</p>
        <p className={styles.orderSub}>{order.usdtAmount} USDT • {order.fiatAmount} {order.currency || ""}</p>
      </div>
      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>{order.status}</span>
      <button className={styles.expandBtn}>
        {expanded ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
      </button>
      {order.cancelRequest && (
  <span style={{
    marginLeft: "10px",
    padding: "4px 8px",
    background: "rgba(239,68,68,0.25)",
    border: "1px solid rgba(239,68,68,0.5)",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#f87171"
  }}>
    Cancel Requested
  </span>
)}

    </div>
  );
};

const OrderCard = ({ order, onUpdate, onPreviewImage }) => {
  const [expanded, setExpanded] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
const [rejectReason, setRejectReason] = useState("");


  const handleApprove = async (id) => {
    await adminApproveOrder(id);
    onUpdate(id, { status: "COMPLETED" });
  };

  const handleReject = async (id) => {
    await adminRejectOrder(id);
    onUpdate(id, { status: "REJECTED" });
  };
  
  useEffect(() => {
  if (showRejectModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showRejectModal]);

  return (
    <div className={styles.orderCard}>
      <OrderRow order={order} expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      {expanded && (
  <OrderDetails
    order={order}
    onApprove={handleApprove}
    onReject={() => setShowRejectModal(true)}
    onPreviewImage={onPreviewImage}
  />
)}
{showRejectModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalBox}>
      <h3 className={styles.modalTitle}>Reject Order</h3>

      <textarea
        placeholder="Enter reason for rejection (optional)"
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        className={styles.rejectTextarea}
      />

      <div className={styles.modalActions}>
        <button
          className={styles.rejectBtn}
          onClick={async () => {
            await adminRejectOrder(order._id, rejectReason || undefined);
            onUpdate(order._id, {
              status: "REJECTED",
              rejectReason,
            });
            setShowRejectModal(false);
            setRejectReason("");
          }}
        >
          Confirm Reject
        </button>

        <button
          className={styles.approveBtn}
          onClick={() => {
            setShowRejectModal(false);
            setRejectReason("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

const loadOrders = async () => {
  try {
    setLoading(true);
     console.log("Fetching orders:", { page, search }); 
    const data = await adminGetAllOrders({ page, search });
    setOrders(data.orders);
    setTotalPages(data.pagination.totalPages);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    loadOrders();
  }, 400); // debounce delay

  return () => clearTimeout(timer);
}, [page, search]);


  const handleUpdateOrder = (orderId, updatedData) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, ...updatedData } : order
      )
    );
  };

  

  const renderContent = () => {
    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className={styles.errorText}>{error}</p>;
    if (orders.length === 0) return <p>No orders found.</p>;

    return (
      
      <div className={styles.tableWrapper}>

        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onUpdate={handleUpdateOrder}
            onPreviewImage={setPreviewImg}
          />
        ))}

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
  <button
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
    className={styles.paginationBtn}
  >
    Prev
  </button>

  <span style={{ color: "#9ca3af" }}>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage((p) => p + 1)}
    className={styles.paginationBtn}
  >
    Next
  </button>
</div>
 
      </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.heading}>P2P Admin Panel</h1>
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
  <input
    type="text"
    placeholder="Search by Order ID / User UID / Email"
    value={search}
    onChange={(e) => {
      setPage(1);
      setSearch(e.target.value);
    }}
    style={{
      flex: 1,
      padding: "10px 14px",
      borderRadius: "10px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.15)",
      color: "white",
    }}
  />
</div>


      {renderContent()}
      <ImagePreviewModal src={previewImg} onClose={() => setPreviewImg(null)} />
    </div>
  );
};







export default AdminOrders;
