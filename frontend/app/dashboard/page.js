"use client";
import { useEffect, useState } from "react";
import { getCases } from "@/lib/api";
import CaseCard from "@/components/CaseCard";

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getCases()
      .then(setCases)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all"
    ? cases
    : cases.filter((c) => c.status === filter);

  const stats = {
    total: cases.length,
    manual_review: cases.filter((c) => c.status === "manual_review").length,
    approved: cases.filter((c) => c.status === "approved").length,
    high_risk: cases.filter((c) => c.risk_level === "high").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Operations Dashboard</h1>
        <p className="text-gray-400 mt-1">KYC case queue and review management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Cases", value: stats.total, color: "text-white" },
          { label: "Needs Review", value: stats.manual_review, color: "text-yellow-400" },
          { label: "Approved", value: stats.approved, color: "text-green-400" },
          { label: "High Risk", value: stats.high_risk, color: "text-red-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "manual_review", "approved", "rejected", "screening"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            {f === "all" ? "All Cases" : f.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Case list */}
      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading cases...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No cases found.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((c) => (
            <CaseCard key={c.id} case={c} />
          ))}
        </div>
      )}
    </div>
  );
}  