import { useLiveQuery } from "@tanstack/react-db";
import { queryInvestmentCollection } from "./InvestmentsCollection";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";

export default function InvestmentContent() {
	const savings = useLiveQuery((query) =>
		query.from({ investment: queryInvestmentCollection }),
	);

	if (!savings) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="flex flex-col items-center gap-2">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					<p className="text-sm text-muted-foreground">
						Loading investments...
					</p>
				</div>
			</div>
		);
	}

	const saving = savings.data;

	if (saving.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<Card className="max-w-md w-full">
					<CardContent className="flex flex-col items-center justify-center py-12 gap-4">
						<div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
							<TrendingUp className="h-8 w-8 text-muted-foreground" />
						</div>
						<div className="text-center space-y-2">
							<h3 className="font-semibold text-lg">No Investments Yet</h3>
							<p className="text-sm text-muted-foreground">
								Your investments will show up here once you start adding them.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
					<TrendingUp className="h-8 w-8 text-primary" />
					Your Investments
				</h2>
				<p className="text-muted-foreground">
					Track and manage your investment portfolio
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{saving.map((inv) => {
					const date = new Date(inv.created_at);
					const formattedDate = date.toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					});
					const formattedTime = date.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					});
					const formattedAmount = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "ksh",
						// minimumFractionDigits: 2,
					}).format(Number(inv.amount));

					return (
						<Card key={inv.id} className="hover:shadow-lg transition-shadow">
							<CardHeader className="pb-2">
								{/* <CardTitle className="flex items-center justify-between text-base"> */}
								{/* 	<span className="flex items-center gap-2"> */}
								{/* 		<DollarSign className="h-4 w-4 text-primary" /> */}
								{/* 		Investment */}
								{/* 	</span> */}
								{/* </CardTitle> */}
								<CardDescription className="flex items-center gap-1.5 text-xs">
									<Calendar className="h-3.5 w-3.5" />
									{formattedDate}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-1 pt-2 text-sm">
								<div className="flex items-baseline gap-1">
									<span className="text-2xl font-bold text-foreground">
										{formattedAmount}
									</span>
								</div>
								<p className="text-xs text-muted-foreground">
									Added at {formattedTime}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
