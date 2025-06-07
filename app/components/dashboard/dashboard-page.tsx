"use client"

import MobileDashboard from "../mobile-layout/mobile-layout"
import DesktopLayout from "../desktop-layout/desktop-layout"
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