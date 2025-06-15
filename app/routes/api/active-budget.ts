import { db } from '~/database/db'
import { eq, desc, and, lte, gte, sql } from 'drizzle-orm'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { monthlyBudgetTable } from '~/database/schema'
import { auth } from '~/lib/auth'

export const APIRoute = createAPIFileRoute('/api/active-budget')({
  GET: async ({ request }) => {

    try {
      const session = await auth.api.getSession({
        headers: request.headers
      })

      const today = new Date().toISOString().split("T")[0] as string

      if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 })
      }
  
      const [budget] = await db
          .select()
          .from(monthlyBudgetTable)
          .where(
            and(
              eq(monthlyBudgetTable.user_id, session.user.id),
              lte(sql`${monthlyBudgetTable.period_start}`, sql`${today}`),
              gte(sql`${monthlyBudgetTable.period_end}`, sql`${today}`)
            ),
          )
          .orderBy(desc(monthlyBudgetTable.entry_date))
      
      if (!budget) {
          return new Response("No budget found", { status: 404 })
      }

      return Response.json(budget)
      
    } catch (error) {
      console.error("🔥 API error:", error)
      return new Response("Internal Server Error", { status: 500 })
    }
  },
})
