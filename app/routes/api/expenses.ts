import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { desc } from "drizzle-orm";
import { db } from "~/database/db";
import { expensesTable } from "~/database/schema";

export const APIRoute = createAPIFileRoute("/api/expenses")({
	GET: async () => {
		const data = await db
			.select()
			.from(expensesTable)
			.orderBy(desc(expensesTable.created_at));
		return json(data);
	},
});
