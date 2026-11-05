"use client";

import type { MatchInsightsData } from "@/types/match-insights";
import InsightCard from "./InsightCard";

type Props = {
    insights: MatchInsightsData | null;
    isGenerating: boolean;
};

export default function KeyInsightsSection({
    insights,
    isGenerating,
}: Props) {
    return (
        <section>
            <div className="mb-3">
                <h2 className="text-[16px] font-extrabold text-[#10143b] sm:text-[18px]">
                    Key Match Insights
                </h2>

                <p className="mt-1 text-[11px] text-[#858ba3]">
                    AI observations based on the available match data
                </p>
            </div>

            {isGenerating && !insights ? (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="animate-pulse rounded-xl border border-[#e1e5f5] bg-white p-4"
                        >
                            <div className="h-9 w-9 rounded-lg bg-slate-100" />
                            <div className="mt-4 h-4 w-3/4 rounded bg-slate-100" />
                            <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                            <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
                        </div>
                    ))}
                </div>
            ) : insights?.insights?.length ? (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                    {insights.insights.map((insight, index) => (
                        <InsightCard
                            key={`${insight.title}-${index}`}
                            insight={insight}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-[#e1e5f5] bg-white p-5 text-center text-xs text-[#858ba3]">
                    AI insights will appear here once match analysis
                    is available.
                </div>
            )}
        </section>
    );
}