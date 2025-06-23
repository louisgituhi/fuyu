"use client"

import MobileDashboard from "./MobileLayout"
import DesktopLayout from "./DesktopLayout"
import type React from "react"
export default function DashboardPage({ children }:{ children: React.ReactNode }) {
    return (
        <>
            <div className="md:hidden">
                <MobileDashboard>{ children }</MobileDashboard>
            </div>

            <div className="hidden md:block">
                <DesktopLayout>{ children }</DesktopLayout>
            </div>
        </>
    )
}