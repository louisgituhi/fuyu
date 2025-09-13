import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useSession } from "~/lib/auth-client";
import { budgetSchema } from "~/lib/definations";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
		<div className="min-h-96 bg-gray-50 p-4">
			<div className=" mx-auto max-w-lg">
				<div className="mb-8 flex items-center justify-between bg-white p-4 shadow-sm">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center bg-[#2CFF05] text-sm font-medium text-white">
							1
						</div>
						<span className="font-medium text-gray-900">
							Budget Information
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
						Budget details
					</h2>
					<p className="text-sm text-gray-600">Enter your budget details.</p>
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
								<form.Field name="net_salary">
									{(field) => (
										<div className="space-y-2">
											<Label
												htmlFor="net-salary"
												className="text-sm font-medium text-gray-700"
											>
												Enter income
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

								<form.Field name="period_start">
									{(field) => (
										<div className="space-y-2">
											<Label
												htmlFor="start date"
												className="text-sm font-medium text-gray-700"
											>
												Start date
											</Label>

											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												type="date"
												className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
											/>

											<FieldInfo field={field} />
										</div>
									)}
								</form.Field>

								<form.Field name="period_end">
									{(field) => (
										<div className="space-y-2">
											<Label
												htmlFor="end date"
												className="text-sm font-medium text-gray-700"
											>
												End date
											</Label>

											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												type="date"
												className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
											/>

											<FieldInfo field={field} />
										</div>
									)}
								</form.Field>

								<form.Field name="label">
									{(field) => (
										<div className="space-y-2">
											<Label
												htmlFor="start date"
												className="text-sm font-medium text-gray-700"
											>
												Label
											</Label>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												type="text"
												placeholder="Month 2025"
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
										className="w-full bg-black text-white font-medium py-3 rounded-none mt-8"
									>
										{isSubmitting ? "..." : "Continue"}
									</Button>
								)}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
