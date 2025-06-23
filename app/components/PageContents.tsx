import { Receipt, Settings, MapPin, Wallet, FileText } from "lucide-react";
import SettingsContent from "./SettingsPage";
import ExpensesContent from "./ExpensesContent";
import BudgetContent from "./BudgetContent";
import SummaryTable from "./SummaryTable";

export default function PageContent({ title }: { title: string }) {
    if (title === "Expenses") {
        return <ExpensesContent />
    }

    if (title === "Budget") {
        return <BudgetContent />
    }

    if (title === "Summary") {
        return <SummaryTable />
    }

    if (title === "Settings") {
        return <SettingsContent />
    }

    const getIcon = () => {
        switch (title) {
            case "Summary":
                return FileText
            case "Wallet":
                return Wallet
            case "Addresses":
                return MapPin
            case "Settings":
                return Settings
            default:
                return Receipt
        }
    }

    const Icon  = getIcon()

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center">
            <div className="h-16 w-16 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500">Your Fuyu {title.toLowerCase()} will show up here</p>
        </div>
    )
}