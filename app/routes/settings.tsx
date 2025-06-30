import {  createFileRoute } from "@tanstack/react-router"
import SettingsContent from "~/components/SettingsContent"
import { MobileHeader } from "~/components/MobileHeader"
import { DashboardLayout } from "~/components/DashboardLayout"

export const Route = createFileRoute('/settings') ({
    component: SettingsPage,
})

function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="min-h-screen bg-white md:bg-gray-50">
                <MobileHeader title="Settings" />
                    <div className="p-4 md:p-8">
                        <SettingsContent />
                    </div>
            </div>
        </DashboardLayout>
    )
}