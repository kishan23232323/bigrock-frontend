import React, { useEffect, useState } from "react";
import styles from "./AdminOrders.module.css";
import {
  IoChevronDown,
  IoChevronUp,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoImageOutline,
} from "react-icons/io5";

import {
  adminGetAgentApplications,
  adminAcceptAgent,
  adminRejectAgent,
  adminChangeAgentStatus,
} from "../../services/agent/agentApi";

const AgentRow = ({ agent, expanded, onToggle }) => (
  <div className={styles.orderRow} onClick={onToggle}>
    <div className={styles.leftGroup}>
      <div>
        <p className={styles.orderType}>{agent.fullName.toUpperCase()}</p>
        <p className={styles.orderSub}>
          {agent.email}
        </p>
        <p className={styles.orderSub}> {agent.phoneNumber}</p>
      </div>

      {agent.status === "PENDING" && (
        <span className={styles.cancelBadge}>Pending Review</span>
      )}
    </div>

    <div className={styles.rightGroup}>
      <span
        className={`${styles.statusBadge} ${styles[agent.status.toLowerCase()]}`}
      >
        {agent.status}
      </span>

      <button className={styles.expandBtn}>
        {expanded ? <IoChevronUp /> : <IoChevronDown />}
      </button>
    </div>
  </div>
);

const AgentDetails = ({ agent, onApprove, onReject, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(agent.status);
  const [remark, setRemark] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
  if (showRejectModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [showRejectModal]);


  return (
    <div className={styles.detailsBox}>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Agent UID</span>
        <span className={styles.detailValueGray}>{agent.agentUid}</span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>User UID</span>
        <span className={styles.detailValueGray}>{agent.userId.uid}</span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>DOB</span>
        <span className={styles.detailValue}>
          {new Date(agent.dob).toLocaleDateString()}
        </span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Address Proof</span>
        <button
          className={styles.viewImgBtn}
          onClick={() => window.open(agent.addressProof)}
        >
          <IoImageOutline /> View
        </button>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Identity Proof</span>
        <button
          className={styles.viewImgBtn}
          onClick={() => window.open(agent.identityProof)}
        >
          <IoImageOutline /> View
        </button>
      </div>

      {/* STATUS UPDATE */}
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Change Status</span>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="bg-black border border-white/20 px-3 py-2 rounded-lg text-slate-300"
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="SUSPENDED">SUSPENDED</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <button
            className={styles.approveBtn}
            onClick={() =>
              onStatusChange(agent._id, newStatus, remark)
            }
          >
            Apply
          </button>
        </div>
      </div>

      {agent.status === "PENDING" && (
        <div className={styles.actionRow}>
          <button
            className={styles.approveBtn}
            onClick={() => onApprove(agent._id)}
          >
            <IoCheckmarkCircleOutline /> Approve
          </button>

         <button
            className={styles.rejectBtn}
            onClick={() => setShowRejectModal(true)}
            >
            <IoCloseCircleOutline /> Reject
            </button>
        </div>
      )}
        {showRejectModal && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalBox}>
                <h3 className={styles.modalTitle}>Reject Agent Application</h3>

                <textarea
                    className={styles.rejectTextarea}
                    placeholder="Enter rejection reason"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                />

                <div className={styles.modalActions}>
                    <button
                    className={styles.rejectBtn}
                    onClick={async () => {
                        await onReject(agent._id, rejectReason);
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

const AdminAgentApplications = () => {
  const [agents, setAgents] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const loadAgents = async () => {
    const data = await adminGetAgentApplications({ page, search });
    setAgents(data.agents);
    setTotalPages(data.pagination.totalPages);
  };

  useEffect(() => {
    const t = setTimeout(loadAgents, 400);
    return () => clearTimeout(t);
  }, [page, search]);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.heading}>Agent Applications</h1>

      <input
        className="mb-4 w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
        placeholder="Search agent UID / email / phone"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className={styles.tableWrapper}>
        {agents.map((agent) => (
          <div key={agent._id} className={styles.orderCard}>
            <AgentRow
              agent={agent}
              expanded={expandedId === agent._id}
              onToggle={() =>
                setExpandedId(
                  expandedId === agent._id ? null : agent._id
                )
              }
            />

            {expandedId === agent._id && (
              <AgentDetails
                agent={agent}
                onApprove={async (id) => {
                  await adminAcceptAgent(id);
                  loadAgents();
                }}
                onReject={async (id, remark) => {
                  await adminRejectAgent(id, remark);
                  loadAgents();
                }}
                onStatusChange={async (id, status, remark) => {
                  await adminChangeAgentStatus(id, status, remark);
                  loadAgents();
                }}
              />
            )}
          </div>
        ))}
        {totalPages > 1 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      marginTop: "20px",
    }}
  >
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
)}

      </div>
    </div>
  );
};

export default AdminAgentApplications;
