import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db } from "~/database/db";
import { expensesTable } from "~/database/schema";

export const APIRoute = createAPIFileRoute('/api/expenses')({
    POST: async ({ request }) => {
        try {
            const body = await request.json()
            await db.insert(expensesTable).values(body).returning();
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json'},
            })
        } catch (error) {
            console.error('API error', error)
            return new Response('Internal Server Error', { status: 500 })
        }
    }
})