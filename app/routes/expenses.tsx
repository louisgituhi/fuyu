import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import ExpensesContent from "~/components/ExpensesContent";
import { MobileHeader } from "~/components/MobileHeader";
export const Route = createFileRoute("/expenses")({
	component: ExpensesPage,
});

function ExpensesPage() {
	return (
		<DashboardLayout>
			<div className="min-h-screen bg-white md:bg-gray-50">
				<MobileHeader title="Expenses" />
				<div className="p-4 md:p-8">
					<ExpensesContent />
				</div>
			</div>
		</DashboardLayout>
	);
}
