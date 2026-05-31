import Link from "next/link";

export default function Navbar(){
    return (
        <nav className= "bg-gray-800 px-6 py-4 flex items-center justify-between">
            <div className= "flex items-center gap-2">
                <div className= "w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                    <span className="font-bold text-white tracking-wide">BankOps AI Hub</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                    <Link href= "/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <Link href= "/cases/new" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    + New Case
                    </Link>
                </div>
            </nav>
    );
}