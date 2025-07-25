import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useSession } from "~/lib/auth-client";
import { budgetSchema } from "~/lib/definations";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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

export default function BudgetForm() {
	const { data } = useSession();
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			net_salary: "",
			period_start: "",
			period_end: "",
			label: "",
		},
		validators: {
			onChange: budgetSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			const res = await fetch("/api/add-budget", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...value,
					user_id: data?.user.id,
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
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Net income</h1>
			<Card className="mb-8">
				<CardContent className="p-6">
					<h2 className="text-md font-semibold mb-4">Add income data</h2>
					<form
						autoComplete="off"
						className="space-y-4"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<form.Field name="net_salary">
								{(field) => (
									<div className="space-y-2">
										<label
											htmlFor="net-salary"
											className="text-sm font-medium text-gray-700"
										>
											Net Salary
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

							<form.Field name="period_start">
								{(field) => (
									<div className="space-y-2">
										<label
											htmlFor="start date"
											className="text-sm font-medium text-gray-700"
										>
											Start date
										</label>

										<input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											type="date"
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
										/>

										<FieldInfo field={field} />
									</div>
								)}
							</form.Field>

							<form.Field name="period_end">
								{(field) => (
									<div className="space-y-2">
										<label
											htmlFor="end date"
											className="text-sm font-medium text-gray-700"
										>
											End date
										</label>

										<input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											type="date"
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
										/>

										<FieldInfo field={field} />
									</div>
								)}
							</form.Field>

							<form.Field name="label">
								{(field) => (
									<div className="space-y-2">
										<label
											htmlFor="start date"
											className="text-sm font-medium text-gray-700"
										>
											Label
										</label>

										<input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											type="text"
											placeholder="June 2025"
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
									{isSubmitting ? "..." : "Add Salary Record"}
								</Button>
							)}
						/>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
