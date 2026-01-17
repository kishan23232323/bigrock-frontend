import React, { useState, useEffect, useCallback } from "react";
import styles from "../AdminPanel/AdminOrders.module.css";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoImageOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { agentGetOrders, agentUploadProof } from "../../services/Agent/agentapi";

const ImagePreviewModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <img src={src} className={styles.modalImage} alt="Proof" />
    </div>
  );
};

const OrderRow = ({ order, expanded, onToggle }) => (
  <div className={styles.orderRow} onClick={onToggle}>
    <div className={styles.leftGroup}>
      <div>
        <p className={styles.orderType}>
          {order.type === "BUY" ? "🟢 BUY ORDER" : "🔴 SELL ORDER"}
        </p>
        <p className={styles.orderSub}>
          {order.usdtAmount} USDT • {order.fiatAmount}
        </p>
      </div>
    </div>

    <div className={styles.rightGroup}>
      <span
        className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}
      >
        {order.status}
      </span>

      <button className={styles.expandBtn}>
        {expanded ? <IoChevronUp size={22} /> : <IoChevronDown size={22} />}
      </button>
    </div>
  </div>
);
const OrderDetails = ({ order, onUploadProof, onPreviewImage }) => {
  const [hash, setHash] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  return (
    <div className={styles.detailsBox}>
      <Detail label="Order ID" value={order._id} />
      <Detail label="User Email" value={order.userId.email} />
      <Detail label="User UID" value={order.userId.uid} />
      <Detail label="Network" value={order.network} />
      <Detail label="Payment Method" value={order.paymentMethod} />

      {order.agentProofImage ? (
        <button
          className={styles.viewImgBtn}
          onClick={() => onPreviewImage(order.agentProofImage)}
        >
          <IoImageOutline /> View Uploaded Proof
        </button>
      ) : (
        <>
          <label className="
  flex flex-col items-center justify-center
  w-full
  rounded-xl
  border-2 border-dashed border-slate-600
  bg-slate-900/60
  px-4 py-6
  cursor-pointer
  transition
  hover:border-cyan-400
  hover:bg-slate-900/80
">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setFile(e.target.files[0])}
    className="hidden"
  />

  {/* ICON */}
  <svg
    className="h-8 w-8 text-slate-400 mb-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1" />
    <path d="M12 12v9" />
    <path d="M8 12l4-4 4 4" />
  </svg>

  {/* TEXT */}
  <p className="text-sm font-semibold text-slate-300">
    Click to upload proof
  </p>
  <p className="text-xs text-slate-500 mt-1">
    PNG, JPG up to 5MB
  </p>

  {/* FILE NAME */}
  {file && (
    <p className="mt-2 text-xs text-green-400 truncate max-w-full">
      {file.name}
    </p>
  )}
</label>


          <input
            placeholder="Transaction / Proof Hash"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="w-full mt-2 rounded-lg bg-black border border-white/20 px-3 py-2 text-sm text-slate-300"
          />

          <button
            disabled={uploading || !file || !hash}
            onClick={async () => {
              setUploading(true);
              await onUploadProof(order._id, file, hash);
              setUploading(false);
            }}
            className={styles.approveBtn}
          >
            {uploading ? "Uploading..." : "Upload Proof"}
          </button>
        </>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className={styles.detailRow}>
    <span className={styles.detailLabel}>{label}</span>
    <span className={styles.detailValueGray}>{value}</span>
  </div>
);

const OrderCard = ({ order, onUpdate, onPreviewImage }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.orderCard}>
      <OrderRow
        order={order}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />

      {expanded && (
        <OrderDetails
          order={order}
          onPreviewImage={onPreviewImage}
          onUploadProof={async (orderId, file, hash) => {
            const updated = await agentUploadProof({
              orderId,
              proofImage: file,
              agentProofHash: hash,
            });
            onUpdate(orderId, updated);
          }}
        />
      )}
    </div>
  );
};

const AgentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [previewImg, setPreviewImg] = useState(null);

  const loadOrders = async () => {
    const data = await agentGetOrders({ page, search });
    setOrders(data.orders);
    setTotalPages(data.pagination.totalPages);
  };

  useEffect(() => {
    const t = setTimeout(loadOrders, 400);
    return () => clearTimeout(t);
  }, [page, search]);

  const updateOrder = (id, updated) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, ...updated } : o))
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.heading}>Agent Orders</h1>

      <input
        className="mb-4 w-full rounded-lg bg-white/5 border border-white/20 px-4 py-2 text-white"
        placeholder="Search by Order ID or User Email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className={styles.tableWrapper}>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onUpdate={updateOrder}
            onPreviewImage={setPreviewImg}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={styles.paginationBtn}
        >
          Prev
        </button>
        <span className="text-slate-400">
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

      <ImagePreviewModal
        src={previewImg}
        onClose={() => setPreviewImg(null)}
      />
    </div>
  );
};

export default AgentOrders;
