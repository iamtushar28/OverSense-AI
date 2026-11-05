"use client";

import { FiZap } from "react-icons/fi";
import type { MatchInsightsData } from "@/types/match-insights";

type Props = {
    insights: MatchInsightsData | null;
    isGenerating: boolean;
    error: string | null;
};

export default function AiOverviewCard({
    insights,
    isGenerating,
    error,
}: Props) {
    return (
        <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-5">
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5320ed1e] text-[#5420ed]">
                    <FiZap size={19} />
                </div>

                <div>
                    <h2 className="text-[15px] font-extrabold text-[#10143b]">
                        AI Match Overview
                    </h2>
                    <p className="text-[11px] text-[#858ba3]">
                        Current match assessment
                    </p>
                </div>
            </div>

            {isGenerating && !insights ? (
                <div className="mt-5 animate-pulse space-y-3">
                    <div className="h-5 w-3/4 rounded bg-slate-100" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-5/6 rounded bg-slate-100" />
                </div>
            ) : insights ? (
                <>
                    <h3 className="mt-4 text-[19px] font-extrabold leading-tight text-[#5420ed] sm:text-[22px]">
                        {insights.overviewHeadline}
                    </h3>

                    <p className="mt-2 max-w-4xl text-[13px] leading-[23px] text-[#59617d]">
                        {insights.overview}
                    </p>
                </>
            ) : (
                <p className="mt-4 text-[13px] leading-6 text-[#858ba3]">
                    {error
                        ? "The AI overview could not be generated."
                        : "Waiting for match information to generate an AI overview."}
                </p>
            )}
        </section>
    );
}