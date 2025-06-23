import BudgetContent from "./BudgetContent";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BudgetPage() {
    return (
        <div className="min-h-screen bg-white">
            <Link to='/'>
                <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
                </Button>
            </Link>

            <main className="p-4 md:p-8">
                <div className="hidden md:block mb-6">
                </div>
                <BudgetContent />
            </main>
        </div>
    )
}