import { QueryClient } from "@tanstack/query-core";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import type { savingsData } from "~/lib/definations";

const queryClient = new QueryClient();

export const queryInvestmentCollection = createCollection<savingsData>(
	queryCollectionOptions<savingsData>({
		id: "fetch-investments",
		queryKey: ["investments"],
		queryFn: async (): Promise<savingsData[]> => {
			const response = await fetch("/api/savings");
			if (!response.ok) {
				throw new Error("Error fetching investments");
			}
			console.log(response);
			return response.json();
		},
		getKey: (item) => item.id,
		queryClient,
	}),
);

queryClient.invalidateQueries({
	queryKey: ["investments"],
});
