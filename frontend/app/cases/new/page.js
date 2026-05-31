"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCase } from "@/lib/api";

const COUNTRIES = [
  "Spain", "France", "Germany", "United Kingdom", "Italy",
  "United States", "Mexico", "Brazil", "Argentina",
  "New Zealand", "Australia", "United Arab Emirates", "Portugal", "South Korea", "Switzerland",
  "Sweden", "Belgium", "Austria", "Netherlands", "Denmark","Norway", "Ireland", "Greece", "Poland",
  "Romania", "Hungary", "Czech Republic", "Slovakia", "Bulgaria", "Serbia", "Macedonia",
];

const ID_TYPES = ["Passport", "National ID", "Driver's License", "Residence Permit"];
const EMPLOYMENT_TYPES = ["Employed", "Self-employed", "Unemployed", "Student", "Retired"];

export default function NewCase() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    country: "",
    id_type: "",
    employment: "",
    income: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await createCase({ ...form, income: parseInt(form.income) });
      router.push(`/cases/${result.id}`);
    } catch (err) {
      setError("Failed to submit case. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">New KYC Case</h1>
        <p className="text-gray-400 mt-1">Submit a customer for onboarding and AI risk assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-5">

        {/* Full name */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            placeholder="John Smith"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Country of Residence</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Select country...</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* ID type */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">ID Document Type</label>
          <select
            name="id_type"
            value={form.id_type}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Select ID type...</option>
            {ID_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Employment */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Employment Status</label>
          <select
            name="employment"
            value={form.employment}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Select status...</option>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Income */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Annual Income (USD)</label>
          <input
            name="income"
            type="number"
            value={form.income}
            onChange={handleChange}
            required
            min="0"
            placeholder="35000"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? "Submitting & running AI assessment..." : "Submit Case"}
        </button>
      </form>
    </div>
  );
}