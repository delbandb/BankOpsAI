import Link from "next/link";
import RiskBadge from "./RiskBadge";
import StatusBadge from "./StatusBadge";

export default function CaseCard({ case:c }) {
    return (
        <Link href={`/cases/${c.id}`}>
            <div className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {c.full_name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                           {c.full_name}
                           </p>
                           <p className="text-gray-500 text-sm">{c.email} . {c.country}</p>
                        </div>
                    </div>
                <div className="flex items-center gap-3">
                    <RiskBadge level={c.risk_level} />
                    <StatusBadge status={c.status} />
                    <span className="text-gray-600 text-xs">#{c.id}</span>
                </div>
            </div>
        </Link>
    );
}