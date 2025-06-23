"use client"
import { useState } from "react"
import FuyuLogo from "./FuyuLogo";
import PageContent from "./PageContents";
import { useSession } from "~/lib/auth-client";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Settings, MapPin, Wallet, Sparkles, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

interface NavItemProps {
    icon: React.ElementType
    label: string
    href: string
    isActive?: boolean
}
 const navItems = [
        { icon: Sparkles, label: "Expenses", href: "/" },
        { icon: Wallet, label: "Budget", href: "/budget" },
        { icon: FileText, label: "Summary", href: "/summary" },
        { icon: MapPin, label: "Addresses", href: "/address" },
        { icon: Settings, label: "Settings",href: "/settings" },
    ]

function NavItem({ icon: Icon, label, href, isActive }: NavItemProps) {
  return (
        <Link
            to={ href }
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                isActive ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
        >
            <Icon className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-900">{label}</span>
        </Link>
  )
}
export default function DesktopLayout({ children }: { children: ReactNode }) {
    const { location } = useRouterState()

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
                            key={ item.label }
                            icon={ item.icon }
                            label={ item.label }
                            href={ item.href }
                            isActive={ location.pathname === item.href }
                        />
                    ))}
                </nav>

            </aside>

            <main className="flex-1 h-screen overflow-auto">
                <div className="h-full flex items-center justify-center p-8">
                    { children }
                </div>
            </main>

        </div>
    )
}