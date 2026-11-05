"use client";

import {
    FiTrendingUp,
    FiTarget,
    FiActivity,
} from "react-icons/fi";

import type { MatchInsightsData } from "@/types/match-insights";
import ImportanceLabel from "./ImportanceLabel";

type Insight = MatchInsightsData["insights"][number];

type Props = {
    insight: Insight;
};

function getInsightStyle(category: string) {
    switch (category) {
        case "Batting":
            return {
                icon: FiTrendingUp,
                color: "text-[#2563eb]",
                bg: "bg-[#eaf1ff]",
            };

        case "Bowling":
            return {
                icon: FiTarget,
                color: "text-[#ed263b]",
                bg: "bg-[#fff0f1]",
            };

        default:
            return {
                icon: FiActivity,
                color: "text-[#159947]",
                bg: "bg-[#eaf8ef]",
            };
    }
}

export default function InsightCard({ insight }: Props) {
    const style = getInsightStyle(insight.category);
    const Icon = style.icon;

    return (
        <div className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)]">
            <div className="flex items-start justify-between gap-3">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.bg} ${style.color}`}
                >
                    <Icon size={19} />
                </div>

                <ImportanceLabel importance={insight.importance} />
            </div>

            <h3 className="mt-4 text-[14px] font-extrabold leading-5 text-[#10143b]">
                {insight.title}
            </h3>

            <p className="mt-2 text-[12px] leading-[21px] text-[#737b96]">
                {insight.description}
            </p>

            <span className="mt-3 inline-block text-[10px] font-bold text-[#858ba3]">
                {insight.category}
            </span>
        </div>
    );
}