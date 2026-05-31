export default function StatusBadge({ status }) {
    const styles = {
        submitted: "bg-blue-500/20 text-gray-400 border border-gray-500/30",
        screening: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        manual_review: "bg-yellow-500/20 text-orange-400 border border-orange-500/30",
        approved: "bg-green-500/20 text-green-400 border border-green-500/30",
        rejected: "bg-red-500/20 text-red-400 border border-red-500/30",
    };

    const labels = {
        submitted: "Submitted",
        screening: "Screening",
        manual_review: "Manual Review",
        approved: "Approved",
        rejected: "Rejected",
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${styles[status] || "bg-gray-700 text-gray-400"}`}>
            {labels[status] || status }
        </span>
    );
}