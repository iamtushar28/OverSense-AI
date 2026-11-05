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
} from "react-icons/fi";

const navItems = [
    {
        name: "Live Match",
        href: "/",
        icon: FiHome,
    },
    {
        name: "What-If Simulator",
        href: "/what-if",
        icon: FiZap,
    },
    {
        name: "Match Insights",
        href: "/insights",
        icon: FiBarChart2,
    },
    {
        name: "Past Matches",
        href: "/matches",
        icon: FiClock,
    },
    {
        name: "How it Works",
        href: "/how-it-works",
        icon: FiInfo,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-[270px] shrink-0 flex-col border-r border-[#e8e9f3] bg-white px-[17px] py-5">

            {/* Logo */}
            <div className="mb-9 flex h-[52px] items-center px-3">
                <div className="text-[24px] font-extrabold tracking-[-1px] text-[#10143b]">
                    OverSense
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex h-[52px] items-center gap-5 rounded-xl px-[18px] transition-all duration-200 ${isActive
                                    ? "bg-[#f0eaff] text-[#5420ed]"
                                    : "text-[#171a35] hover:bg-[#f7f5ff] hover:text-[#5420ed]"
                                }`}
                        >
                            <Icon
                                size={21}
                                strokeWidth={2}
                                className="shrink-0"
                            />

                            <span className="text-[15px] font-semibold">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Promo Card */}
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

                {/* Decorative Background */}
                <div className="absolute -bottom-9 -right-8 h-20 w-48 rotate-[-12deg] rounded-[50%] bg-[#d9c5ff]/60" />
                <div className="absolute -bottom-12 -left-8 h-16 w-40 rotate-[10deg] rounded-[50%] bg-white/40" />
            </div>
        </aside>
    );
}