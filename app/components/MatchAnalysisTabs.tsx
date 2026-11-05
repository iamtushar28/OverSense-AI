"use client";

import {
    FiActivity,
    FiGitBranch,
    FiUsers,
    FiBarChart2,
} from "react-icons/fi";

export type AnalysisTab =
    | "over-by-over"
    | "match-flow"
    | "key-players"
    | "stats";

type MatchAnalysisTabsProps = {
    activeTab: AnalysisTab;
    onTabChange: (tab: AnalysisTab) => void;
};

const tabs = [
    {
        id: "over-by-over",
        label: "Over by Over",
        icon: FiActivity,
    },
    {
        id: "match-flow",
        label: "Match Flow",
        icon: FiGitBranch,
    },
    {
        id: "key-players",
        label: "Key Players",
        icon: FiUsers,
    },
    {
        id: "stats",
        label: "Stats",
        icon: FiBarChart2,
    },
] as const;

export default function MatchAnalysisTabs({
    activeTab,
    onTabChange,
}: MatchAnalysisTabsProps) {
    return (
        <div className="flex w-full items-center gap-2 overflow-x-auto rounded-xl border border-[#e5e9f5] bg-white p-2 shadow-[0_2px_10px_rgba(35,45,100,0.025)] scrollbar-hide">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        className={`flex h-[46px] shrink-0 items-center justify-center gap-2.5 rounded-lg px-5 text-[14px] font-semibold transition-all duration-200 ${isActive
                                ? "bg-[#5420ed] text-white shadow-[0_3px_8px_rgba(84,32,237,0.2)]"
                                : "text-[#535a78] hover:bg-[#f3f0ff] hover:text-[#5420ed]"
                            }`}
                    >
                        <Icon size={18} strokeWidth={2} />
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}