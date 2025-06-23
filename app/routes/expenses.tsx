import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ExpensesContent from '~/components/expense/expense-content'

export const Route = createFileRoute('/expenses')({
  component: ExpensePage,
})

function ExpensePage() {
  return (
    <div className="min-h-screen bg-white">
      <Link to='/'>
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>

      <main className="p-4 md:p-8">
        <div className="hidden md:block mb-6">
        </div>
        <ExpensesContent />
      </main>

    </div>
  )
}
