import { CircleCheck, AlertTriangle } from "lucide-react"
import { expenseTypes } from "~/hooks/isExpenseType"
interface ExpenseTypeProps {
  netIncome?: number
}

export default function ExpenseType({ netIncome = 35440 }: ExpenseTypeProps) {

    const { data: exp_data, isLoading: exp_isLaoding, error: exp_error } = expenseTypes();

    if (exp_isLaoding) return <div>Loading budget data...</div>
    if (exp_error) return <div>Error loading budget data</div>

    const totals = exp_data?.reduce((acc: Record<string, number>, curr) => {
        const type = curr.expense_type
        const amount = Number.parseFloat(curr.trx_amount)

        if (!acc[type]) acc[type] = 0
        acc[type] += amount

        return acc
    }, {}) ?? {}

    const getExpenseStatus = (type: string, amount: number) => {
        const percentage = (amount / netIncome) * 100

        switch (type.toLowerCase()) {
            case "need":
            case "needs":
                return {
                    percentage,
                    isWithinBudget: percentage <= 50,
                    limit: 50,
                    icon: percentage <= 50 ? CircleCheck : AlertTriangle,
                    textColor: percentage <= 50 ? "text-green-600" : "text-red-500",
                }
            case "want":
            case "wants":
                return {
                    percentage,
                    isWithinBudget: percentage <= 30,
                    limit: 30,
                    icon: percentage <= 30 ? CircleCheck : AlertTriangle,
                    textColor: percentage <= 30 ? "text-green-600" : "text-red-500",
                }
            case "saving":
            case "savings":
                return {
                    percentage,
                    isWithinBudget: percentage >= 20,
                    limit: 20,
                    icon: percentage >= 20 ? CircleCheck : AlertTriangle,
                    textColor: percentage >= 20 ? "text-green-600" : "text-red-500",
                }
            default:
            return {
            percentage,
            isWithinBudget: true,
            limit: 0,
            icon: CircleCheck,
            textColor: "text-gray-600",
            }
        }
    }

    const expenseEntries = Object.entries(totals)

    return (
        <div className="rounded-xl border p-6 shadow-sm bg-white dark:bg-zinc-900 mb-4">

            <div className="flex items-stretch">
                { expenseEntries.map(([type, total], index) => {
                    const status = getExpenseStatus(type, total)
                    const Icon = status.icon

                    return (
                        <>
                            <div key={type} className="flex-1 px-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <h3 className="text-md font-semibold capitalize">{type}</h3>
                                        <Icon className={`h-4 w-4 ${status.textColor}`} />
                                    </div>

                                    <p className={`text-sm font-medium mb-1 ${status.textColor}`}>Ksh {total.toLocaleString()}</p>

                                    <div className="text-center">
                                        <span className={`text-sm ${status.textColor}`}>{status.percentage.toFixed(1)}%</span>
                                    </div>

                                    {!status.isWithinBudget && (
                                        <div className={`text-xs ${status.textColor} mt-2`} />
                                    )}
                                </div>
                            </div>

                            {index < expenseEntries.length - 1 && <div className="w-px bg-gray-200 dark:bg-gray-700 mx-2 my-4" />}
                        </>
                    )
                })}
            </div>
        </div>
  )
}
