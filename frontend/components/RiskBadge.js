export default function RiskBadge({ level }) {
    const styles ={
        low: "bg-green-500/20 text-green-400 border border-green-500/30",
        medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        high: "bg-red-500/20 text-red-400 border border-red-500/30",
    };

    return (
    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${styles[level] || "bg-gray-700 text-gray-400"}`}>
      {level || "pending"}
    </span>
  );
}