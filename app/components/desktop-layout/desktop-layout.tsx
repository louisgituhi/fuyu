"use client"
import { useState } from "react"
import FuyuLogo from "../fuyulogo";
import NavItem from "./nav-item";
import PageContent from "../page-content";
import { useSession } from "~/lib/auth-client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Settings, MapPin, Wallet, Calendar, Sparkles } from "lucide-react";
export default function DesktopLayout() {
    const [activePage, setActivePage] = useState("Expenses")

    const navItems = [
        { icon: Sparkles, label: "Expenses", href: "/" },
        { icon: Wallet, label: "Budget", href: "/budget" },
        { icon: Calendar, label: "Subscriptions", href: "/subscription" },
        { icon: MapPin, label: "Addresses", href: "/address" },
        { icon: Settings, label: "Settings",href: "/settings" },
    ]

    const { data } = useSession()

    return (
        <div className="min-h-screen flex">

            <aside className="w-72 border-r border-gray-200 flex flex-col h-screen">

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

                <nav className="flex-1 py-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        isActive={activePage === item.label}
                        onClick={() => setActivePage(item.label)}
                        />
                    ))}
                </nav>

            </aside>

            <main className="flex-1 h-screen overflow-auto">
                <div className="h-full flex items-center justify-center p-8">
                    <PageContent title={activePage} />
                </div>
            </main>

        </div>
    )
}