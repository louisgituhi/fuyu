import {  createFileRoute } from "@tanstack/react-router"
import DashboardPage from "~/components/DashboardPage"
import SettingsContent from "~/components/SettingsContent"
import SettingsPage from "~/components/SettingsPage"

export const Route = createFileRoute('/settings') ({
    component: () => <DashboardPage><SettingsContent /></DashboardPage>,
})