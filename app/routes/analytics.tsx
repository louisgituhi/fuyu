import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { MobileHeader } from "~/components/MobileHeader";

export const Route = createFileRoute("/analytics")({
	component: AnalyticsPage,
});

function AnalyticsPage() {
	return (
		<DashboardLayout>
			<div className="min-h-screen bg-white md:bg-gray-50">
				<MobileHeader title="Summary" />
				<div className="p-4 md:p-8">
					<h1>Analytics</h1>
				</div>
			</div>
		</DashboardLayout>
	);
}
