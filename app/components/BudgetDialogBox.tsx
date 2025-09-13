import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
} from "./ui/dialog";
import BudgetForm from "./BudgetForm.tsx";
import { Button } from "./ui/button";

export default function BudgetDialogBox() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="px-6 text-white bg-black font-medium py-3 rounded-none mb-6">
					Add Budget
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
				<DialogHeader className="sr-only">
					<DialogTitle>Add Budget</DialogTitle>
				</DialogHeader>
				<BudgetForm />
			</DialogContent>
		</Dialog>
	);
}
