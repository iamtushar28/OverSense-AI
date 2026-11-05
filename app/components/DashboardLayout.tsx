"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-dvh w-full overflow-hidden">

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex">
                <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Section */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

                {/* Navbar */}
                <Navbar
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                {/* Page Content */}
                <main className="min-h-0 flex-1 overflow-y-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}