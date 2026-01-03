import { BsDot } from "react-icons/bs";
import classes from "./Statuses.module.css";
import { GoDotFill } from "react-icons/go";
export default function Statuses({
  status,
  isLabel = true,
  className,
  showDot,
}) {
  const statusesColor = {
    active: {
      bgColor: "#E5F2E5",
      color: "#008000",
      label: "Active",
    },
    pending_review: {
      bgColor: "#F6FFDE",
      color: "#759800",
      label: "Pending Review",
    },
    processing: {
      bgColor: "#F6FFDE",
      color: "#759800",
      label: "Processing",
    },
    failed: {
      bgColor: "#DE00001C",
      color: "#DE0000",
      label: "Failed",
    },

    invited: {
      bgColor: "#34BFEA1C",
      color: "#00A1D3",
      label: "Invited",
    },
    joined: {
      bgColor: "#0060991C",
      color: "#006099",
      label: "Joined",
    },

    "not-invited": {
      bgColor: "#DE00001C",
      color: "#DE0000",
      label: "Not Invited",
    },
    "in-active": {
      bgColor: "#DE00001C",
      color: "#DE0000",
      label: "Not Active",
    },
    invited: {
      bgColor: "#34BFEA1C",
      color: "#00A1D3",
      label: "Invited",
    },
    inactive: {
      bgColor: "#F2F2F2",
      color: "#5F6064",
      label: "Inactive",
    },
    completed: {
      color: "#456C91",
      bgColor: "#F1F8FA",
      label: "Completed",
    },
    ongoing: {
      color: "#459147",
      bgColor: "#F1FAF1",
      label: "On Going",
    },
    "pending-verification": {
      color: "rgb(51,47, 47)",
      bgColor: "#F6FFDE",
      label: "Pending Verification",
    },
    paid: {
      color: "#459147",
      bgColor: "#F1FAF1",
      label: "Paid",
    },
    "on-going": {
      color: "#459147",
      bgColor: "#F1FAF1",
      label: "On Going",
    },
    unpaid: {
      bgColor: "#F6FFDE",
      color: "var(--danger-color)",
      label: "Unpaid",
    },
    upcoming: {
      color: "#9D4955",
      bgColor: "#F6FFDE",
      label: "Upcoming",
    },
    assigned: {
      color: "#189191",
      bgColor: "#F6FFDE",
      label: "Assigned",
    },
    pending: {
      color: "#D3A500",
      bgColor: "#FFF6D7",
      label: "Pending",
    },
    booking: {
      bgColor: "var(--main-color)",
      color: "var(--white-color)",
      label: "Booking",
    },
    online: {
      color: "#004F98",
      label: "Online",
    },
    withdrawal: {
      color: "#EF8929",
      label: "Widthdrawl",
    },
    approved: {
      bgColor: "#E5F2E5",
      color: "#008000",
      label: "Approved",
    },
    "approved-by-admin": {
      bgColor: "#E5F2E5",
      color: "#008000",
      label: "Approved By Admin",
    },
    confirmed: {
      bgColor: "#E6F9F0",
      color: "#48B64C",
      label: "Confirmed",
    },
    cash: {
      color: "#759800",
      label: "Cash",
    },
    rejected: {
      color: "#CF0E0E",
      bgColor: "#FFE0E0",
      label: "Rejected",
    },
    "system-deactivated": {
      color: "#9D4955",
      bgColor: "#F6FFDE",
      label: "System Deactivated",
    },
    "system-rejected": {
      color: "#CF0E0E",
      bgColor: "#FFE0E0",
      label: "Rejected",
    },
    cancelled: {
      bgColor: "#FAF1F1",
      color: "#BC3D41",
      label: "Cancelled",
    },
    "awaiting-approval": {
      bgColor: "#0060991C",
      color: "#006099",
      label: "Awaiting Admin Approval",
    },
    "pupils-data": {
      bgColor: "#34BFEA1C",
      color: "#00A1D3",
      label: "Pupils Data",
    },
    "no-system-access": {
      bgColor: "#34BFEA1C",
      color: "#00A1D3",
      label: "No System Access",
    },

    protected: {
      bgColor: "#34BFEA1C",
      color: "#00A1D3",
      label: "Protected",
    },
    available: {
      bgColor: "#F6FFDE",
      color: "#759800",
      label: "Available",
    },
    "approved-ready-to-distribute": {
      bgColor: "#E6F9F0",
      color: "#48B64C",
      label: "Approved ready to Distribute",
    },
  };
  return (
    <div
      className={`${classes.statusWrapper} ${className} ${
        !isLabel ? classes.withoutLabel : ""
      }`}
      style={{
        backgroundColor: statusesColor[status]?.bgColor,
      }}
    >
      {showDot && <GoDotFill style={{ color: statusesColor[status]?.color }} />}
      {isLabel && (
        <p style={{ color: statusesColor[status]?.color }}>
          {statusesColor[status]?.label}
        </p>
      )}
    </div>
  );
}
