import SettingsContent from "./SettingsContent";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Link to='/'>
                <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
                </Button>
            </Link>

            <main className="p-4 md:p-8">
                <div className="w-full max-w-4xl mx-auto space-y-8">
                <SettingsContent />
                </div>
            </main>
        </div>
    )
}