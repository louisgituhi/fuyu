"use client"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Settings, ChartLine, Wallet, Sparkles, FileText, ChevronRight } from "lucide-react";
import { useRouterState, Link } from "@tanstack/react-router"
import FuyuLogo from "./FuyuLogo";
import { useSession } from "~/lib/auth-client"

const navigationItems = [
    { id: "expenses", label: "Expenses", icon: Sparkles, href: "/expenses" },
    { id: "wallet", label: "Budget", icon: Wallet, href: "/budget" },
    { id: "summary", label: "Summary", icon: FileText, href: "/summary" },
    { id: "analytics", label: "Analytics", icon: ChartLine, href: "/analytics" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
]

export default function Sidebar() {

    const { data } = useSession()
    const { location } = useRouterState()

    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">

                <div className="p-6 border-gray-100">
                    <FuyuLogo />
                </div>

                <div className="p-6 flex flex-col items-center text-center border-gray-100">
                    { data?.user && (
                        <>
                            <Avatar className="h-16 w-16 bg-[#FF4B33] mb-4">
                                <AvatarFallback className="bg-[#FF4B33] text-white text-xl font-bold">{ data.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-lg font-semibold text-gray-900">{ data.user.name }</h2>
                            <p className="text-sm text-gray-500">{ data.user.email }</p>
                        </>
                    )}
                </div>

                {/* navigation  */}
                <div className="flex-1 p-4">
                    <nav className="space-y-1">
                        { navigationItems.map((item) =>(
                            <Link
                                key={ item.id }
                                to={ item.href }
                                className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                                    location.pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center">
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span>{item.label}</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </Link>
                        ))}
                    </nav>
                </div>

            </div>
        </div>
    )
}