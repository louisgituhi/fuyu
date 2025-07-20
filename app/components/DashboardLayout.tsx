"use client";

import type React from "react";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const [_isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<>
			<div className="md:hidden">
				<MobileNav />
				<main>{children}</main>
			</div>

			<div className="hidden md:flex min-h-screen bg-gray-50">
				<Sidebar />
				<main className="flex-1">{children}</main>
			</div>
		</>
	);
}
