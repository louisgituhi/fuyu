import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { MobileHeader } from "~/components/MobileHeader";
import InvestmentContent from "~/components/InvestmentContent";

export const Route = createFileRoute("/investments")({
	component: BudgetsPage,
});

function BudgetsPage() {
	return (
		<DashboardLayout>
			<div className="min-h-screen bg-white md:bg-gray-50">
				<MobileHeader title="Investments" />
				<div className="p-4 md:p-8">
					<h1>Investments will show up here </h1>
					<InvestmentContent />
				</div>
			</div>
		</DashboardLayout>
	);
}
