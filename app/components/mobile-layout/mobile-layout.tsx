import FuyuLogo from "../fuyulogo";
import MenuItem from "./menu-item";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Settings, MapPin, Wallet, Calendar, ArrowLeft, Sparkles } from "lucide-react";
import PageContent from "../page-content";
import { useState } from "react"
import { useSession } from "~/lib/auth-client";
export default function MobileDashboard() {
    const [currentPage, setCurrentPage] = useState<string | null>(null)

    const menuItems = [
        { icon: Sparkles, label: "Expenses" },
        { icon: Wallet, label: "Budget" },
        { icon: Calendar, label: "Subscriptions" },
        { icon: MapPin, label: "Addresses" },
        { icon: Settings, label: "Settings" },
    ]

    const { data } = useSession()

    if (currentPage) {
        return (
            <div className="min-h-screen bg-white flex flex-col">

                <header className="flex items-center p-4 border-b border-gray-100">

                    <Button variant="ghost" size="icon" className="mr-2" onClick={() => setCurrentPage(null)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg font-semibold">{currentPage}</h1>

                </header>

                <main className="flex-1 p-6 overflow-auto">
                    <PageContent title={currentPage} />
                </main>
            </div>
        )
    }
    return (

        <div className="min-h-screen bg-white">

            <header className="p-4 border-gray-100">
                <FuyuLogo />
            </header>

            <main className="p-4 space-y-6">

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
                            key={item.label} 
                            icon={item.icon} 
                            label={item.label} 
                            onClick={() => setCurrentPage(item.label)} 
                        />
                    ))}
                </div>

            </main>

        </div>
  )
}