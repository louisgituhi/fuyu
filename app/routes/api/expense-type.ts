import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db } from "~/database/db";
import { expensesTable } from "~/database/schema";

export const APIRoute = createAPIFileRoute("/api/expense-type")({
	GET: async () => {
		try {
			const data = await db
				.select({
					expense_type: expensesTable.expenses_type,
					trx_amount: expensesTable.amount,
				})
				.from(expensesTable);

			return json(data);
		} catch (error) {
			console.error("🔥 API error:", error);
			return new Response("Internal Server Error", { status: 500 });
		}
	},
});
