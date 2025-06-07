import { db } from '~/database/db'
import { eq, desc } from 'drizzle-orm'
import { useSession } from '~/lib/auth-client'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { monthlyBudgetTable } from '~/database/schema'

export const APIRoute = createAPIFileRoute('/api/active-budget')({
  GET: async ({ request }) => {

    const { data } = useSession()
    
    if (!data?.session.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    const [ budget ] = await db
        .select()
        .from(monthlyBudgetTable)
        .where(
            eq(monthlyBudgetTable.user_id, data.user.id)
        )
        .orderBy(desc(monthlyBudgetTable.entry_date))
    
    if (!budget) {
        return new Response("No budget found", { status: 404 })
    }

    return Response.json(budget)

  },
})
