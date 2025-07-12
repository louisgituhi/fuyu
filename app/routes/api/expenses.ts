import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { db } from '~/database/db'
import { expensesTable } from '~/database/schema'
import { desc } from 'drizzle-orm'
import { auth } from '~/lib/auth'

export const APIRoute = createAPIFileRoute('/api/expenses')({
  GET: async({ request }) => {
      const data = await 
        db.select()
        .from(expensesTable)
        .orderBy(desc(expensesTable.created_at))
        return json(data)
  },
})
