import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db } from "~/database/db";
import { auth } from "~/lib/auth";
import { expensesTable } from "~/database/schema";
import { eq } from "drizzle-orm";

export const APIRoute = createAPIFileRoute("/api/savings")({
	GET: async ({ request }) => {
		try {
			const session = await auth.api.getSession({
				headers: request.headers,
			});

			if (!session?.user.id) {
				return new Response("Unauthorized access", { status: 401 });
			}

			const data = await db
				.select()
				.from(expensesTable)
				.where(eq(expensesTable.expenses_category, "Savings"));
			return json(data);
		} catch (e) {
			console.error("An error occured", e);
			return new Response("Api error", { status: 500 });
		}
	},
});
