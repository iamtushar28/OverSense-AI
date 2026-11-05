"use client";

import { FiBell, FiUser, FiMenu } from "react-icons/fi";

type NavbarProps = {
    onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
    return (
        <header className="z-30 w-full shrink-0 border-b border-[#e8e9f3] bg-white">
            <div className="grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:h-[82px] lg:px-8">

                {/* Mobile Menu */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#10143b] transition hover:bg-[#f3efff] lg:hidden"
                >
                    <FiMenu size={23} />
                </button>

                {/* Desktop Match Information */}
                <div className="hidden lg:block">
                    <h1 className="text-[24px] font-extrabold leading-tight tracking-[-0.7px] text-[#10143b]">
                        IND vs AUS
                    </h1>

                    <p className="mt-1 text-[15px] font-medium text-[#343957]">
                        3rd ODI · Australia tour of India
                    </p>
                </div>

                {/* Mobile Logo */}
                <div className="flex min-w-0 items-center lg:hidden">
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-[19px] font-extrabold leading-tight tracking-[-0.7px] text-[#10143b]">
                            OverSense <span className="text-[#5420ed]">AI</span>
                        </span>

                        <span className="truncate text-[11px] font-medium text-[#343957]">
                            Live Cricket Intelligence
                        </span>
                    </div>
                </div>

                <div className="hidden lg:block" />

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 sm:gap-4 lg:gap-7">
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[#172047] hover:bg-[#f3efff]"
                    >
                        <FiBell size={22} />
                    </button>

                    <button
                        type="button"
                        aria-label="Profile"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eeebfc] text-[#172047] hover:bg-[#e5defd] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                    >
                        <FiUser size={23} />
                    </button>
                </div>
            </div>

            {/* Mobile Match Information */}
            <div className="border-t border-[#f0f0f7] px-4 py-2.5 lg:hidden">
                <h1 className="text-[19px] font-extrabold leading-tight tracking-[-0.5px] text-[#10143b]">
                    IND vs AUS
                </h1>

                <p className="mt-0.5 text-[13px] font-medium text-[#343957]">
                    3rd ODI · Australia tour of India
                </p>
            </div>
        </header>
    );
}