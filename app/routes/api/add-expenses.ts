import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db } from "~/database/db";
import { expensesTable } from "~/database/schema";

export const APIRoute = createAPIFileRoute("/api/add-expenses")({
	POST: async ({ request }) => {
		try {
			const body = await request.json();
			const {
				budget_id,
				expenses_type,
				expenses_category,
				amount,
				transaction_cost,
			} = body;

			await db
				.insert(expensesTable)
				.values({
					budget_id: budget_id,
					expenses_type: expenses_type,
					expenses_category: expenses_category,
					amount: amount,
					transaction_cost: transaction_cost,
				})
				.returning();

			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} catch (error) {
			console.error("API error", error);
			return new Response("Internal server error", { status: 500 });
		}
	},
});
