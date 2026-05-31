"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCase, updateCase } from "@/lib/api";
import RiskBadge from "@/components/RiskBadge";
import StatusBadge from "@/components/StatusBadge";

const STATUSES = ["submitted", "screening", "manual_review", "approved", "rejected"];

export default function CaseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [c, setC] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getCase(id).then((data) => {
      setC(data);
      setNotes(data.reviewer_notes || "");
      setAssignedTo(data.assigned_to || "");
      setStatus(data.status);
      setLoading(false);
    });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const updated = await updateCase(id, {
      status,
      reviewer_notes: notes,
      assigned_to: assignedTo,
    });
    setC(updated);
    setSaving(false);
  };

  if (loading) return <div className="text-center text-gray-500 py-20">Loading case...</div>;
  if (!c) return <div className="text-center text-gray-500 py-20">Case not found.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
      >
        ← Back to Dashboard
      </button>

      {/* Case header */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
              {c.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{c.full_name}</h1>
              <p className="text-gray-400 text-sm">{c.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RiskBadge level={c.risk_level} />
            <StatusBadge status={c.status} />
          </div>
        </div>

        {/* Customer details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
          {[
            { label: "Country", value: c.country },
            { label: "ID Type", value: c.id_type },
            { label: "Employment", value: c.employment },
            { label: "Annual Income", value: `$${c.income.toLocaleString()}` },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-gray-500 text-xs">{item.label}</p>
              <p className="text-white text-sm font-medium mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Risk Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">AI Risk Assessment</h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          {c.risk_summary || "No AI assessment available."}
        </p>
      </div>

      {/* Reviewer panel */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">Reviewer Actions</h2>

        <div className="flex flex-col gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Case Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned to */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Assigned To</label>
            <input
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Reviewer name..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Reviewer Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add notes about this case..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}