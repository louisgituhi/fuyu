import FuyuLogo from "./FuyuLogo";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Settings, MapPin, Wallet, Sparkles, FileText, ChevronRight } from "lucide-react";
import { useSession } from "~/lib/auth-client";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { ReactNode  } from "react";

interface MenuItemProps {
    icon: React.ElementType
    label: string
    href: string
    active: boolean
}

function MenuItem({ icon: Icon, label, href, active }:MenuItemProps) {
        return (
            <Link
                to={ href }
                className={`w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg group ${
                    active ? "ring-2 ring-[#FF4B33] ring-offset-2" : ""
                }`}
            >
                <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>
        )
    }

    const menuItems = [
        { icon: Sparkles, label: "Expenses", href: "/expenses" },
        { icon: Wallet, label: "Budget", href: "/budget" },
        { icon: FileText, label: "Summary", href: "/summary" },
        { icon: MapPin, label: "Addresses", href: "/address" },
        { icon: Settings, label: "Settings", href: "/settings" },
    ]
export default function MobileLayout({ children }: { children: ReactNode } ) {

    const { data } = useSession()
    const { location } = useRouterState()

    return (

        <div className="min-h-screen bg-white">

            <header className="p-4 border-gray-100">
                <FuyuLogo />
            </header>

            <div className="p-4 space-y-6">

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

                <div className="space-y-3">
                    {menuItems.map((item) => (
                        <MenuItem 
                            key={ item.label } 
                            icon={ item.icon } 
                            label={ item.label }
                            href={ item.href }
                            active={ location.pathname === item.href }
                        />
                    ))}
                </div>

            <section className="flex-1 overflow-auto p-4"><Outlet /> </section>
            </div>


        </div>
  )
}