import { useQuery } from "@tanstack/react-query";

type ExpenseByType = {
	expense_type: "Need" | "Want" | "Saving";
	trx_amount: string;
};

export function expenseTypes() {
	return useQuery<ExpenseByType[]>({
		queryKey: ["expense-type"],
		queryFn: async () => {
			const res = await fetch("/api/expense-type");

			if (!res.ok) {
				throw new Error("Failed to fetch active budget");
			}

			return res.json();
		},
	});
}
