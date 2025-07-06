import { createFileRoute } from '@tanstack/react-router'
import { MobileHeader } from '~/components/MobileHeader'
import { DashboardLayout } from '~/components/DashboardLayout'
import TransactionsTable from '~/components/TransactionsTable'

export const Route = createFileRoute('/summary')({
  component: TransactionsPage,
})

function TransactionsPage() {
    return (
        <DashboardLayout>
            <div className="min-h-screen bg-white md:bg-gray-50">
                <MobileHeader title="Summary" />
                    <div className="p-4 md:p-8">
                        <TransactionsTable />
                    </div>
            </div>
        </DashboardLayout>
    )
}
