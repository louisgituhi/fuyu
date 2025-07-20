import { createFileRoute } from "@tanstack/react-router";
import BudgetContent from "~/components/BudgetContent";
import { DashboardLayout } from "~/components/DashboardLayout";
import { MobileHeader } from "~/components/MobileHeader";

export const Route = createFileRoute("/budget")({
	component: BudgetsPage,
});

function BudgetsPage() {
	return (
		<DashboardLayout>
			<div className="min-h-screen bg-white md:bg-gray-50">
				<MobileHeader title="Budget" />
				<div className="p-4 md:p-8">
					<BudgetContent />
				</div>
			</div>
		</DashboardLayout>
	);
}
