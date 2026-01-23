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
  adminOrderStatusUpdate
} from "../../services/P2Pservices/p2papi";
import { createPortal } from "react-dom";


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

const OrderDetails = ({ order, onApprove, onReject, onPreviewImage, onStatusUpdate }) => {
  const [newStatus, setNewStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);

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
      <span className=" text-amber-300">AGENT ASSIGNED</span>

     { order.assignedAgent? ( <div>


      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Agent Name</span>
        <span className={styles.detailValueGray}>{order.assignedAgent.fullName.toUpperCase() || "Unknown User"}</span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Agent UID</span>
        <span className={styles.detailValueGray}>{order.assignedAgent.agentUid || "Not Provided"}</span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Agent Transaction Hash</span>
        <span className={styles.detailValueGray}>{order.agentProofHash || "Not Provided"}</span>
      </div>

       <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Agent Payment Proof</span>
        {order.proofImage ? (
          <button className={styles.viewImgBtn} onClick={() => onPreviewImage(order.agentProofImage)}>
            <IoImageOutline size={20} /> View Proof
          </button>
        ) : (
          <span className={styles.detailValueGray}>No proof uploaded</span>
        )}
      </div>

      </div> ) :(
        <span className="text-gray-300"> No Agent Assigned yet</span>
      )
}
      

{/* ADMIN STATUS UPDATE */}
<div className={styles.detailRow}>
  <span className={styles.detailLabel}>Update Status</span>

  <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full">
    {/* STATUS SELECT */}
    <select
      value={newStatus}
      onChange={(e) => setNewStatus(e.target.value)}
      className="
        w-full sm:w-55
        rounded-lg
        bg-black
        border border-white/20
        px-3 py-2
        text-sm text-slate-400
        outline-none
        focus:border-blue-400
        focus:ring-1 focus:ring-blue-400
        transition
      "
    >
      <option className="bg-black" value="PENDING">PENDING</option>
      <option className="bg-black" value="AWAITING_CONFIRMATION">AWAITING_CONFIRMATION</option>
      <option className="bg-black" value="COMPLETED">COMPLETED</option>
      <option className="bg-black" value="CANCELLED">CANCELLED</option>
      <option className="bg-black" value="FULFILLED">FULFILLED</option>
      <option className="bg-black" value="PROCESSING">PROCESSING</option>

    </select>

    {/* APPLY BUTTON */}
    <button
      disabled={updating || newStatus === order.status}
      onClick={async () => {
        setUpdating(true);
        await onStatusUpdate(order._id, newStatus);
        setUpdating(false);
      }}
      className={`
        px-4 py-2
        rounded-lg
        font-semibold
        text-sm
        transition
        ${
          updating || newStatus === order.status
            ? "bg-white/10 border border-white/10 text-gray-400 cursor-not-allowed"
            : "bg-green-500/20 border border-green-400/40 text-green-300 hover:bg-green-500/30"
        }
      `}
    >
      {updating ? "Updating..." : "Apply"}
    </button>
  </div>
</div>



{order.status === "AWAITING_CONFIRMATION" && (
  <div className={styles.actionRow}>
    <button
      className={styles.approveBtn}
      onClick={onApprove}
    >
      <IoCheckmarkCircleOutline size={22} /> Approve
    </button>

    <button
      className={styles.rejectBtn}
      onClick={onReject}
    >
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

      {/* LEFT SIDE */}
      <div className={styles.leftGroup}>
        <div>
          <p className={styles.orderType}>
            {order.type === "BUY" ? "🟢 BUY ORDER" : "🔴 SELL ORDER"}
          </p>
          <p className={styles.orderSub}>
            {order.usdtAmount} USDT • {order.fiatAmount}
          </p>
        </div>

        {order.cancelRequest && (
          <span className={styles.cancelBadge}>
            Cancel Requested
          </span>
        )}
      </div>

      {/* RIGHT SIDE (UNCHANGED) */}
      <div className={styles.rightGroup}>
        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
          {order.status}
        </span>

        <button className={styles.expandBtn}>
          {expanded ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
        </button>
      </div>

    </div>

  );
};

const OrderCard = ({ order, onUpdate, onPreviewImage }) => {
  const [expanded, setExpanded] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);


const [rejectReason, setRejectReason] = useState("");


const handleStatusUpdate = async (id, status) => {
  await adminOrderStatusUpdate(id, status);
  onUpdate(id, { status });
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

useEffect(() => {
  const isOpen =  showApproveModal;

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showApproveModal]);


  return (
    <div className={styles.orderCard}>
      <OrderRow order={order} expanded={expanded} onToggle={() => setExpanded(!expanded)} />
      {expanded && (
    <OrderDetails
      order={order}
      onApprove={() => setShowApproveModal(true)}
      onReject={() => setShowRejectModal(true)}
      onPreviewImage={onPreviewImage}
      onStatusUpdate={handleStatusUpdate}
    />

)}
{showRejectModal &&
  createPortal(
    <div className="globalModalOverlay">
      <div className="globalModalBox">
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
    </div>,
    document.getElementById("modal-root")
  )
}

{showApproveModal &&
  createPortal(
    <div className="globalModalOverlay">
      <div className="globalModalBox">
        <h3 className={styles.modalTitle}>Approve Order</h3>

        <p className={styles.modalText}>
          Are you sure you want to approve this order?
          This action will release funds and cannot be undone.
        </p>

        <div className={styles.modalActions}>
          <button
            className={styles.modalBtnNo}
            disabled={approveLoading}
            onClick={() => !approveLoading && setShowApproveModal(false)}
          >
            {approveLoading ? "..." : "No"}
          </button>

          <button
            className={styles.modalBtnYes}
            disabled={approveLoading}
            onClick={async () => {
              if (approveLoading) return;

              try {
                setApproveLoading(true);

                // UPDATE UI
                onUpdate(order._id, { status: "PROCESSING" });
                // CLOSE MODAL
                setShowApproveModal(false);
                await adminApproveOrder(order._id);
              } catch (err) {
                console.error("Approve error:", err);
              } finally {
                // reset loading safely
                setApproveLoading(false);
              }
            }}
          >
            {approveLoading ? "Processing..." : "Yes, Approve"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}
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
