import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { MobileHeader } from "~/components/MobileHeader";
import SettingsContent from "~/components/SettingsContent";

export const Route = createFileRoute("/settings")({
	component: SettingsPage,
});

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
	);
}
