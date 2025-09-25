import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useActiveBudget } from "~/hooks/isActiveBudget";
import { expenseSchema } from "~/lib/definations";
import BudgetDialogBox from "./BudgetDialogBox.tsx";
import { Button } from "./ui/button";
import { Input } from "./ui/input.tsx";
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
			<BudgetDialogBox />
			<div className="min-h-96 bg-gray-50 p-4">
				<div className=" mx-auto max-w-lg">
					<div className="mb-8 flex items-center justify-between bg-white p-4 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center bg-[#2CFF05] text-sm font-medium text-white">
								2
							</div>
							<span className="font-medium text-gray-900">
								Expense Information
							</span>
						</div>

						<div className="flex gap-1">
							<div className="h-5 w-2 bg-[#FF4B33]"></div>
							<div className="h-5 w-2 bg-[#FF4B33]"></div>
							<div className="h-5 w-2 bg-[#FF4B33]"></div>
							<div className="h-5 w-2 bg-[#FF4B33]"></div>
						</div>
					</div>

					<div className="mb-8">
						<h2 className="mb-2 text-xl font-semibold text-gray-900">
							Expense Details
						</h2>
						<p className="text-sm text-gray-600">
							Enter expenses to help monitor your expenses.
						</p>
					</div>
					<div className="space-y-6">
						<div className="space-y-2">
							<form
								autoComplete="off"
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									void form.handleSubmit();
								}}
							>
								<div className="space-y-2">
									<form.Field name="expenses_type">
										{(field) => (
											<div className="space-y-2">
												<Label
													htmlFor="expense-type"
													className="text-sm font-medium text-gray-900"
												>
													Expense type
												</Label>
												<Select
													name={field.name}
													value={field.state.value}
													onValueChange={field.handleChange}
												>
													<SelectTrigger className="w-full rounded-none">
														<SelectValue placeholder="Type"></SelectValue>
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
													className="text-sm font-medium text-gray-900"
												>
													Expense category
												</Label>
												<Select
													name={field.name}
													value={field.state.value}
													onValueChange={field.handleChange}
												>
													<SelectTrigger className="w-full rounded-none">
														<SelectValue placeholder="Category"></SelectValue>
													</SelectTrigger>
													<SelectContent className="rounded-none">
														<SelectItem value="Groceries">Groceries</SelectItem>
														<SelectItem value="Transport">Transport</SelectItem>
														<SelectItem value="Grooming">Grooming</SelectItem>
														<SelectItem value="Healthcare">
															Healthcare
														</SelectItem>
														<SelectItem value="Airtime">Airtime</SelectItem>
														<SelectItem value="Food">Food</SelectItem>
														<SelectItem value="Utilities">Utilities</SelectItem>
														<SelectItem value="Entertainment">
															Entertainment
														</SelectItem>
														<SelectItem value="Savings">Savings</SelectItem>
														<SelectItem value="Investments">
															Investments
														</SelectItem>
														<SelectItem value="Lending">Lending</SelectItem>
													</SelectContent>
												</Select>
											</div>
										)}
									</form.Field>

									<form.Field name="amount">
										{(field) => (
											<div className="space-y-2">
												<Label
													htmlFor="amount"
													className="text-sm font-medium text-gray-700"
												>
													Amount
												</Label>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="0.00"
													className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
												/>
												<FieldInfo field={field} />
											</div>
										)}
									</form.Field>

									<form.Field name="transaction_cost">
										{(field) => (
											<div className="space-y-2">
												<Label
													htmlFor="transaction cost"
													className="text-sm font-medium text-gray-700"
												>
													Transaction amount
												</Label>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="0.00"
													className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
											className="w-full bg-[#FF4B33] hover:bg-gray-200 text-gray-900 font-medium py-3 rounded-none mt-8"
										>
											{isSubmitting ? "..." : "Add purchase"}
										</Button>
									)}
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
