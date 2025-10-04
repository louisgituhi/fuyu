import { db } from "./database/db";
import { expensesTable } from "./database/schema";
import { eq } from "drizzle-orm";

async function getInvestments() {
	const data = await db
		.select()
		.from(expensesTable)
		.where(eq(expensesTable.expenses_category, "Savings"));

	console.log(data);
}

getInvestments();
