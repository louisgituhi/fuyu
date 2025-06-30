import { Avatar, AvatarFallback } from "./ui/avatar";
import { Settings, MapPin, Wallet, Sparkles, FileText, ChevronRight } from "lucide-react";
import FuyuLogo from "./FuyuLogo";
import { useRouterState, Link } from "@tanstack/react-router";
import { useSession } from "~/lib/auth-client";

const navigationItems = [
    { id: "expenses", label: "Expenses", icon: Sparkles, href: "/expenses" },
    { id: "wallet", label: "Budget", icon: Wallet, href: "/budget" },
    { id: "summary", label: "Summary", icon: FileText, href: "/summary" },
    { id: "addresses", label: "Addresses", icon: MapPin, href: "/addresses" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
]

export default function MobileNav() {

    const { data } = useSession()
    const { location } = useRouterState()

    if ( location.pathname === "/") {
        return (
            <div className="min-h-screen bg-white">
                <div className="p-4 border-b">
                    <FuyuLogo />
                </div>
                <div className="text-center space-y-4 py-8">
                    { data?.user.email && (
                        <>
                            <Avatar className="h-20 w-20 mx-auto bg-[#FF4B33]">
                                <AvatarFallback className="bg-[#FF4B33] text-white text-2xl font-bold">{ data?.user.name.charAt(0) }</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">{ data?.user.name }</h1>
                                <p className="text-gray-500">{ data?.user.email }</p>
                            </div>
                        </>
                    )}
                </div>
                {/* navigation  */}
                <div className="px-4 space-y-1">
                    { navigationItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.href}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <div className="flex items-center">
                                <item.icon className="h-5 w-5 text-gray-600 mr-3" />
                                <span className="text-gray-900">{item.label}</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return null
}