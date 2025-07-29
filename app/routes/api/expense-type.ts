import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "~/database/db";
import { expensesTable, monthlyBudgetTable } from "~/database/schema";
import { auth } from "~/lib/auth";

export const APIRoute = createAPIFileRoute("/api/expense-type")({
	GET: async ({ request }) => {
		try {
			const session = await auth.api.getSession({
				headers: request.headers,
			});

			if (!session?.user?.id) {
				return new Response("Unauthorized", { status: 401 });
			}

			const today = new Date().toISOString().split("T")[0] as string;

			const [budget] = await db
				.select()
				.from(monthlyBudgetTable)
				.where(
					and(
						eq(monthlyBudgetTable.user_id, session.user.id),
						lte(sql`${monthlyBudgetTable.period_start}`, sql`${today}`),
						gte(sql`${monthlyBudgetTable.period_end}`, sql`${today}`),
					),
				)
				.orderBy(desc(monthlyBudgetTable.entry_date));

			if (!budget) {
				return new Response("No active budget found", { status: 404 });
			}
			const data = await db
				.select({
					expense_type: expensesTable.expenses_type,
					trx_amount: expensesTable.amount,
				})
				.from(expensesTable)
				.where(eq(expensesTable.budget_id, budget.id))
				.orderBy(desc(expensesTable.created_at));

			return json(data);
		} catch (error) {
			console.error("🔥 API error:", error);
			return new Response("Internal Server Error", { status: 500 });
		}
	},
});
