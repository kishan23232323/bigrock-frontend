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
          <button className={styles.rejectBtn} onClick={() => onReject(order._id)}>
            <IoCloseCircleOutline size={22} /> Reject
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

const OrderCard = ({ order, onUpdate, onPreviewImage }) => {
  const [expanded, setExpanded] = useState(false);

  const handleApprove = async (id) => {
    await adminApproveOrder(id);
    onUpdate(id, { status: "COMPLETED" });
  };

  const handleReject = async (id) => {
    await adminRejectOrder(id);
    onUpdate(id, { status: "REJECTED" });
  };

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderRow}>
        <div>
          <p className={styles.orderType}>{order.type === "BUY" ? "🟢 BUY ORDER" : "🔴 SELL ORDER"}</p>
          <p className={styles.orderSub}>{order.usdtAmount} USDT • {order.fiatAmount} {order.currency || ""}</p>
        </div>
        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>{order.status}</span>
        <button className={styles.expandBtn} onClick={() => setExpanded(!expanded)}>
          {expanded ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
        </button>
      </div>
      {expanded && <OrderDetails order={order} onApprove={handleApprove} onReject={handleReject} onPreviewImage={onPreviewImage} />}
    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminGetAllOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

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
      </div>
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.heading}>P2P Admin Panel</h1>
      {renderContent()}
      <ImagePreviewModal src={previewImg} onClose={() => setPreviewImg(null)} />
    </div>
  );
};

export default AdminOrders;
