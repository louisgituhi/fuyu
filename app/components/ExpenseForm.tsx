import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useActiveBudget } from "~/hooks/isActiveBudget";
import { expenseSchema } from "~/lib/definations";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<em className="text-red-500">
					{field.state.meta.errors.map((err) => err.message).join(",")}
				</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}
export default function ExpenseForm() {
	const { data: budget } = useActiveBudget();
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			expenses_type: "",
			expenses_category: "",
			amount: "",
			transaction_cost: "",
		},
		validators: {
			onChange: expenseSchema,
		},
		onSubmit: async ({ value }) => {
			if (!budget.id) {
				throw new Error("No active budget found");
			}
			const res = await fetch("/api/add-expenses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...value,
					budget_id: budget.id,
				}),
			});

			if (!res.ok) {
				const errorText = await res.text();
				throw new Error(`Request failed: ${res.status} - ${errorText}`);
			}

			navigate({
				to: "/",
			});
			return res.json();
		},
	});

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Purchases</h1>

			<Card className="mb-8">
				<CardContent className="p-6">
					<h2 className="text-lg font-semibold mb-4">Add New Purchase</h2>
					<form
						autoComplete="off"
						className="space-y-4"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<form.Field name="expenses_type">
								{(field) => (
									<div className=" space-y-2">
										<Label
											htmlFor="expense-type"
											className="text-sm font-medium text-gray-700"
										>
											Expense Type
										</Label>

										<Select
											name={field.name}
											value={field.state.value}
											onValueChange={field.handleChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select expense type" />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value="Need">Need</SelectItem>
												<SelectItem value="Want">Want</SelectItem>
												<SelectItem value="Saving">Saving</SelectItem>
											</SelectContent>
										</Select>
									</div>
								)}
							</form.Field>

							<form.Field name="expenses_category">
								{(field) => (
									<div className="space-y-2">
										<Label
											htmlFor="expense-category"
											className="text-sm font-medium text-gray-700"
										>
											Expense Category
										</Label>

										<Select
											name={field.name}
											value={field.state.value}
											onValueChange={field.handleChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select category" />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value="Groceries">Groceries</SelectItem>
												<SelectItem value="Transport">Transport</SelectItem>
												<SelectItem value="Grooming">Grooming</SelectItem>
												<SelectItem value="Healthcare">Healthcare</SelectItem>
												<SelectItem value="Airtime">Airtime</SelectItem>
												<SelectItem value="Food">Food</SelectItem>
												<SelectItem value="Utilities">Utilities</SelectItem>
												<SelectItem value="Entertainment">
													Entertainment
												</SelectItem>
												<SelectItem value="Savings">Savings</SelectItem>
												<SelectItem value="Investments">Investments</SelectItem>
												<SelectItem value="Lending">Lending</SelectItem>
											</SelectContent>
										</Select>
									</div>
								)}
							</form.Field>

							<form.Field name="amount">
								{(field) => (
									<div className="space-y-2">
										<label
											htmlFor="amount"
											className="text-sm font-medium text-gray-700"
										>
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
										<FieldInfo field={field} />
									</div>
								)}
							</form.Field>

							<form.Field name="transaction_cost">
								{(field) => (
									<div className="space-y-2">
										<label
											htmlFor="transaction-amount"
											className="text-sm font-medium text-gray-700"
										>
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
										<FieldInfo field={field} />
									</div>
								)}
							</form.Field>
						</div>
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							// biome-ignore lint/correctness/noChildrenProp: false positive
							children={([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									disabled={!canSubmit}
									className="w-full bg-[#FF4B33] hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-lg"
								>
									{isSubmitting ? "..." : "Add purchase"}
								</Button>
							)}
						/>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
