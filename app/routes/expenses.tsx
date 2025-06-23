import { createFileRoute } from '@tanstack/react-router'
import ExpensePage from '~/components/ExpensesPage'
export const Route = createFileRoute('/expenses')({
  component: ExpensePage,
})