"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiHome,
    FiZap,
    FiBarChart2,
    FiClock,
    FiInfo,
    FiAward,
    FiX,
} from "react-icons/fi";

type MobileSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const navItems = [
    { name: "Live Match", href: "/", icon: FiHome },
    { name: "What-If Simulator", href: "/what-if", icon: FiZap },
    { name: "Match Insights", href: "/insights", icon: FiBarChart2 },
];

export default function MobileSidebar({
    isOpen,
    onClose,
}: MobileSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-[#10143b]/40 transition-opacity duration-300 lg:hidden ${isOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
            />

            {/* Sidebar Drawer */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-dvh w-[280px] max-w-[85vw] flex-col border-r border-[#e8e9f3] bg-white px-[17px] py-5 shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${isOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >
                {/* Logo Header */}
                <div className="mb-9 flex h-[52px] items-center justify-between px-3">
                    <div className="text-[24px] font-extrabold tracking-[-1px] text-[#10143b]">
                        OverSense <span className="text-[#5420ed]">AI</span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#343957] hover:bg-[#f3efff]"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex h-[52px] items-center gap-5 rounded-xl px-[18px] transition-all duration-200 ${isActive
                                    ? "bg-[#f0eaff] text-[#5420ed]"
                                    : "text-[#171a35] hover:bg-[#f7f5ff] hover:text-[#5420ed]"
                                    }`}
                            >
                                <Icon size={21} strokeWidth={2} />

                                <span className="text-[15px] font-semibold">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Promotional Card */}
                <div className="relative mt-auto overflow-hidden rounded-2xl bg-gradient-to-br from-[#f3edff] via-[#f0eaff] to-[#e6d9ff] p-6">
                    <div className="relative z-10">
                        <FiAward
                            size={36}
                            className="mb-3 text-[#8b45f5]"
                            strokeWidth={2.5}
                        />

                        <h3 className="mb-2 text-[20px] font-extrabold leading-[1.25] tracking-[-0.5px] text-[#17105e]">
                            Turn every over
                            <br />
                            into insight
                        </h3>

                        <p className="text-[14px] font-medium leading-[22px] text-[#171a35]">
                            AI summaries, what-if scenarios and match intelligence — in real time.
                        </p>
                    </div>

                    <div className="absolute -bottom-9 -right-8 h-20 w-48 rotate-[-12deg] rounded-[50%] bg-[#d9c5ff]/60" />
                    <div className="absolute -bottom-12 -left-8 h-16 w-40 rotate-[10deg] rounded-[50%] bg-white/40" />
                </div>
            </aside>
        </>
    );
}