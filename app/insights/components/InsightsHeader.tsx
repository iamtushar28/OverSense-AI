"use client";

import { FiZap, FiRefreshCw } from "react-icons/fi";

type Props = {
    isGenerating: boolean;
    onRefresh: () => void;
    disabled?: boolean;
};

export default function InsightsHeader({
    isGenerating,
    onRefresh,
    disabled = false,
}: Props) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#5420ed]">
                    <FiZap size={15} />
                    AI MATCH INTELLIGENCE
                </div>

                <h1 className="mt-2 text-[23px] font-extrabold tracking-tight text-[#10143b] sm:text-[30px]">
                    Match Insights
                </h1>

                <p className="mt-1 text-[13px] leading-6 text-[#858ba3] sm:text-[14px]">
                    Understand the key moments, trends, and factors
                    shaping the match.
                </p>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                disabled={disabled || isGenerating}
                className="flex h-10 items-center gap-2 rounded-lg bg-[#5420ed] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#531afd] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
                <FiRefreshCw
                    size={14}
                    className={isGenerating ? "animate-spin" : ""}
                />
                {isGenerating ? "Analyzing..." : "Regenerate insights"}
            </button>
        </div>
    );
}