import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db } from "~/database/db";
import { monthlyBudgetTable } from "~/database/schema";

export const APIRoute = createAPIFileRoute("/api/add-budget")({
	POST: async ({ request }) => {
		try {
			const body = await request.json();
			const { user_id, net_salary, period_start, period_end, label } = body;

			await db
				.insert(monthlyBudgetTable)
				.values({
					user_id: user_id,
					net_salary: net_salary,
					period_start: period_start,
					period_end: period_end,
					label: label,
				})
				.returning();
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} catch (error) {
			console.error("API error", error);
			return new Response("Internal Server Error", { status: 500 });
		}
	},
});
