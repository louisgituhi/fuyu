"use client"

import MobileDashboard from "../ui-components/mobile-layout"
import DesktopLayout from "../ui-components/desktop-layout"
export default function DashboardPage() {
    return (
        <>
            <div className="md:hidden">
                <MobileDashboard />
            </div>

            <div className="hidden md:block">
                <DesktopLayout />
            </div>
        </>
    )
}