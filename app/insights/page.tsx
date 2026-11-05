"use client";

import {
    FiZap,
    FiTrendingUp,
    FiTarget,
    FiActivity,
    FiAlertCircle,
    FiArrowUpRight,
} from "react-icons/fi";

const insights = [
    {
        icon: FiTrendingUp,
        title: "India's scoring rate is slowing down",
        description:
            "India has scored only 13 runs in the last 3 overs, putting pressure on the middle order.",
        category: "Batting",
        color: "text-[#853df5]",
        bg: "bg-[#f1edff]",
    },
    {
        icon: FiTarget,
        title: "Australia's bowling has shifted momentum",
        description:
            "Two wickets in the 15th over have given Australia an important advantage.",
        category: "Bowling",
        color: "text-[#ed263b]",
        bg: "bg-[#fff0f1]",
    },
    {
        icon: FiActivity,
        title: "The required run rate is increasing",
        description:
            "India now needs to maintain a scoring rate above 10 runs per over to reach the target.",
        category: "Match situation",
        color: "text-[#159947]",
        bg: "bg-[#eaf8ef]",
    },
];

const turningPoints = [
    {
        over: "Over 10",
        title: "India builds momentum",
        description: "A 13-run over helped India improve its scoring rate.",
        score: "98/2",
    },
    {
        over: "Over 12",
        title: "Australia strikes",
        description: "India loses an important batter, slowing the innings.",
        score: "112/3",
    },
    {
        over: "Over 15",
        title: "Momentum shifts to Australia",
        description: "Two wickets and only 5 runs in the over put India under pressure.",
        score: "145/4",
    },
];

export default function InsightsPage() {
    return (
        <div className="mx-auto w-full max-w-[1200px] min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-6">

            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#853df5]">
                    <FiZap size={15} />
                    AI MATCH INTELLIGENCE
                </div>

                <h1 className="mt-2 text-[23px] font-extrabold tracking-tight text-[#10143b] sm:text-[30px]">
                    Match Insights
                </h1>

                <p className="mt-1 text-[13px] leading-6 text-[#858ba3] sm:text-[14px]">
                    Understand the key moments, trends, and factors shaping the match.
                </p>
            </div>

            {/* Match Summary */}
            <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-5">
                <div>
                    <p className="text-[11px] font-semibold text-[#858ba3]">
                        CURRENT MATCH
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-[15px] font-extrabold text-[#10143b]">
                        <span>🇮🇳 India</span>
                        <span className="text-[#a5a9ba]">vs</span>
                        <span>🇦🇺 Australia</span>
                    </div>

                    <p className="mt-1 text-[11px] text-[#858ba3]">
                        India batting · 15.0 overs
                    </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    <div>
                        <p className="text-[10px] font-medium text-[#858ba3]">
                            SCORE
                        </p>
                        <p className="text-[20px] font-extrabold text-[#10143b]">
                            145/4
                        </p>
                    </div>

                    <div className="h-9 w-px bg-[#edf0f7]" />

                    <div>
                        <p className="text-[10px] font-medium text-[#858ba3]">
                            TARGET
                        </p>
                        <p className="text-[20px] font-extrabold text-[#10143b]">
                            190
                        </p>
                    </div>

                    <span className="rounded-full bg-[#fff0f1] px-2.5 py-1 text-[10px] font-bold text-[#ed263b]">
                        LIVE
                    </span>
                </div>
            </section>

            {/* AI Overview */}
            <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-5">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eee8ff] text-[#853df5]">
                        <FiZap size={19} />
                    </div>

                    <div>
                        <h2 className="text-[15px] font-extrabold text-[#10143b]">
                            AI Match Overview
                        </h2>
                        <p className="text-[11px] text-[#858ba3]">
                            Overall match assessment
                        </p>
                    </div>
                </div>

                <h3 className="mt-4 text-[19px] font-extrabold leading-tight text-[#e51f37] sm:text-[22px]">
                    Australia currently has the momentum
                </h3>

                <p className="mt-2 max-w-4xl text-[13px] leading-[23px] text-[#59617d]">
                    India's innings has slowed after losing two wickets in the
                    15th over. With 45 runs required from 30 balls, India needs
                    a strong partnership and an improved scoring rate. Australia's
                    bowlers have an opportunity to maintain pressure.
                </p>
            </section>

            {/* Key Insights */}
            <section>
                <div className="mb-3">
                    <h2 className="text-[16px] font-extrabold text-[#10143b] sm:text-[18px]">
                        Key Match Insights
                    </h2>
                    <p className="mt-1 text-[11px] text-[#858ba3]">
                        Important observations from the ongoing match
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                    {insights.map((insight) => {
                        const Icon = insight.icon;

                        return (
                            <div
                                key={insight.title}
                                className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${insight.bg} ${insight.color}`}>
                                        <Icon size={19} />
                                    </div>

                                    <span className="rounded-full bg-[#f5f5fa] px-2.5 py-1 text-[10px] font-semibold text-[#737b96]">
                                        {insight.category}
                                    </span>
                                </div>

                                <h3 className="mt-4 text-[14px] font-extrabold leading-5 text-[#10143b]">
                                    {insight.title}
                                </h3>

                                <p className="mt-2 text-[12px] leading-[21px] text-[#737b96]">
                                    {insight.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Turning Points */}
            <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-5">
                <div className="mb-5">
                    <h2 className="text-[16px] font-extrabold text-[#10143b] sm:text-[18px]">
                        Match Turning Points
                    </h2>
                    <p className="mt-1 text-[11px] text-[#858ba3]">
                        Overs that significantly influenced the game
                    </p>
                </div>

                <div className="space-y-5">
                    {turningPoints.map((point, index) => (
                        <div
                            key={point.over}
                            className="relative flex gap-3 sm:gap-4"
                        >
                            <div className="flex flex-col items-center">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eee8ff] text-[11px] font-extrabold text-[#5420ed]">
                                    {index + 1}
                                </div>

                                {index !== turningPoints.length - 1 && (
                                    <div className="mt-2 h-full w-px bg-[#e7e2f5]" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1 pb-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#853df5]">
                                        {point.over}
                                    </span>

                                    <span className="text-[11px] font-bold text-[#59617d]">
                                        {point.score}
                                    </span>
                                </div>

                                <h3 className="mt-1 text-[13px] font-extrabold text-[#10143b]">
                                    {point.title}
                                </h3>

                                <p className="mt-1 text-[12px] leading-5 text-[#737b96]">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Insight Footer */}
            <div className="flex items-start gap-2 rounded-xl border border-[#eee9ff] bg-[#f8f5ff] p-3 sm:p-4">
                <FiAlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-[#853df5]"
                />

                <p className="text-[11px] leading-5 text-[#69618a]">
                    AI insights are generated from match events and statistics.
                    Predictions and assessments are estimates, not guaranteed outcomes.
                </p>
            </div>
        </div>
    );
}