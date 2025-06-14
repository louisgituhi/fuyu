import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { expenseSchema } from "~/lib/definations"
import { useForm } from "@tanstack/react-form"
import { useActiveBudget } from "~/hooks/isActiveBudget"
export default function ExpenseForm() {

    const { data: budget, isLoading } = useActiveBudget()
    const form = useForm({
        defaultValues: {
            expenses_type: "",
            expenses_category: "",
            amount: "",
            transaction_cost: ""
    },
    validators: {
        onChange: expenseSchema
    },
    onSubmit: async ({ value }) => {
        const res = await fetch("/api/expenses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...value,
            }),
        })

        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`Request failed: ${ res.status } - ${ errorText }`)
        }

            return res.json()
        }   
    })

    return (
        <div>
            <Card className="bg-green-100 text-black shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
                <CardContent className="p-3">
                    <div className="text-center">
                        {isLoading ? (
                            <div className="space-y-2">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                                <p className="text-sm">Loading active budget...</p>
                            </div>
                        ) : budget ? (
                            <div className="space-y-0">
                                <p className="text-sm font-medium uppercase tracking-wide">Active Budget</p>
                                <p className="text-2xl font-bold">{budget.net_salary.toLocaleString()}</p>
                                <div className="w-12 h-1 rounded-full mx-auto mt-1" />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                    <span className="text-red-600 text-lg">!</span>
                                </div>
                                <p className="text-sm text-green-600">No active budget</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Purchases</h1>
        
            <Card className="mb-8">
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Add New Purchase</h2>
                    <form 
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          void form.handleSubmit()
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field name="expenses_type">
                                {(field) => (
                                    <div className=" space-y-2">
        
                                        <label 
                                            htmlFor="expense-type" 
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Expense Type
                                        </label>
        
                                        <select
                                            id={ field.name }
                                            name={ field.name }
                                            value={ field.state.value }
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="" disabled>Select expense type</option>
                                            <option value="Need">Need</option>
                                            <option value="Want">Want</option>
                                            <option value="Saving">Saving</option>
                                        </select>
        
                                    </div>
                                )}
                            </form.Field>
        
                            <form.Field name="expenses_category">
                                {(field) => (
                                    <div className="space-y-2">
                                        <label htmlFor="expense-category" className="text-sm font-medium text-gray-700">
                                            Expense Category
                                        </label>
        
                                        <select
                                            id={ field.name }
                                            name={ field.name }
                                            value={ field.state.value }
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="" disabled>Select category</option>
                                            <option value="Lending">Lending</option>
                                            <option value="Outing">Outing</option>
                                            <option value="Utility">Utility</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Snacks">Snacks</option>
                                            <option value="Airtime">Airtime</option>
                                            <option value="Hair grooming">Hair grooming</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Wi-Fi">Wi-Fi</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Groceries">Groceries</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Rent">Rent</option>
                                            <option value="Savings">Savings</option>
                                            <option value="Investments">Investments</option>
                                        </select>
                                    </div>
                                )}
                            </form.Field>
        
                            <form.Field name="amount">
                                {(field) => (
                                    <div className="space-y-2">
                                        <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                                            Amount
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        {!field.state.meta.isValid && (
                                            <em className=" text-red-500">{field.state.meta.errors.join(', ')}</em>
                                        )}
                                    </div>
                              )}
                            </form.Field>
        
                            <form.Field name="transaction_cost">
                                {(field) => (
                                    <div className="space-y-2">
                                        <label htmlFor="transaction-amount" className="text-sm font-medium text-gray-700">
                                            Transaction Amount
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                        />
                                        {!field.state.meta.isValid && (
                                            <em className=" text-red-500">{field.state.meta.errors.join(', ')}</em>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                        </div>
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                // biome-ignore lint/correctness/noChildrenProp: <explanation>
                                children={([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="w-full bg-[#FF4B33] hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-lg"
                                    >
                                    {isSubmitting ? '...' : 'Add purchase'}
                                    </Button>
                              )}
                            />
                      </form>
                  </CardContent>
                </Card>
              </div>
    )
}