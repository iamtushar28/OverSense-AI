
"use client";

import {
    FiAlertCircle,
    FiCheckCircle,
    FiClock,
    FiTarget,
    FiTrendingUp,
    FiZap,
} from "react-icons/fi";

import type { WhatIfAnalysis } from "@/types/what-if";

type Props = {
    scenario: string;
    result: WhatIfAnalysis | null;
    isLoading: boolean;
    error: string | null;
};

export default function ScenarioResult({
    scenario,
    result,
    isLoading,
    error,
}: Props) {
    return (
        <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-6">
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf1ff] text-[#2563eb]">
                    <FiZap size={18} />
                </div>

                <div>
                    <h2 className="text-[15px] font-extrabold text-[#10143b]">
                        AI Scenario Analysis
                    </h2>

                    <p className="text-[10px] text-[#858ba3]">
                        Hypothetical match simulation
                    </p>
                </div>
            </div>

            <div className="mt-4 rounded-lg bg-[#f8faff] p-4">
                {!scenario && !result && !isLoading && (
                    <div className="py-6 text-center">
                        <FiTarget
                            size={27}
                            className="mx-auto text-[#a9bce8]"
                        />

                        <p className="mt-3 text-[13px] font-semibold text-[#59617d]">
                            Your analysis will appear here
                        </p>

                        <p className="mt-1 text-[11px] text-[#a5a9ba]">
                            Enter a scenario above to explore its possible impact.
                        </p>
                    </div>
                )}

                {scenario && (
                    <div className="border-b border-[#e8edf8] pb-4">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-[#2563eb]">
                            <FiClock size={13} />
                            YOUR SCENARIO
                        </div>

                        <p className="mt-2 text-[13px] font-semibold leading-6 text-[#10143b]">
                            {scenario}
                        </p>
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center gap-3 py-6">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#c8d8fa] border-t-[#2563eb]" />

                        <div>
                            <p className="text-[13px] font-semibold text-[#10143b]">
                                Simulating your scenario...
                            </p>

                            <p className="mt-1 text-[11px] text-[#858ba3]">
                                Evaluating the current match situation.
                            </p>
                        </div>
                    </div>
                )}

                {error && !isLoading && (
                    <div className="mt-4 flex gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                        <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
                        <p>{error}</p>
                    </div>
                )}

                {result && !isLoading && (
                    <div className="mt-4 space-y-5">
                        <div>
                            <div className="flex items-center gap-2">
                                <FiCheckCircle
                                    size={17}
                                    className="text-[#16a05d]"
                                />

                                <h3 className="text-[16px] font-extrabold text-[#10143b]">
                                    {result.headline}
                                </h3>
                            </div>

                            <p className="mt-2 text-[13px] leading-6 text-[#59617d]">
                                {result.outcomeSummary}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <ImpactCard
                                icon={<FiTrendingUp size={16} />}
                                title="Score impact"
                                description={result.scoreImpact}
                            />

                            <ImpactCard
                                icon={<FiTarget size={16} />}
                                title="Wicket impact"
                                description={result.wicketImpact}
                            />
                        </div>

                        <div>
                            <h4 className="text-[12px] font-extrabold text-[#10143b]">
                                Match impact
                            </h4>

                            <p className="mt-1 text-[12px] leading-6 text-[#59617d]">
                                {result.matchImpact}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[12px] font-extrabold text-[#10143b]">
                                Key factors
                            </h4>

                            <ul className="mt-2 space-y-2">
                                {result.keyFactors.map((factor, index) => (
                                    <li
                                        key={`${index}-${factor}`}
                                        className="flex gap-2 text-[12px] leading-5 text-[#59617d]"
                                    >
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                                        {factor}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-lg border border-[#e7ecf7] bg-white p-3">
                            <h4 className="text-[12px] font-extrabold text-[#10143b]">
                                Assumptions
                            </h4>

                            <ul className="mt-2 space-y-1.5">
                                {result.assumptions.map((item, index) => (
                                    <li
                                        key={`${index}-${item}`}
                                        className="text-[11px] leading-5 text-[#68708b]"
                                    >
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-2 rounded-lg bg-[#fff8e9] p-3">
                            <FiAlertCircle
                                size={15}
                                className="mt-0.5 shrink-0 text-[#c28a20]"
                            />

                            <div>
                                <p className="text-[11px] font-bold text-[#946817]">
                                    Simulation uncertainty
                                </p>

                                <p className="mt-1 text-[11px] leading-5 text-[#8a754d]">
                                    {result.uncertainty}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function ImpactCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-lg border border-[#e8edf8] bg-white p-3">
            <div className="flex items-center gap-2 text-[#2563eb]">
                {icon}
                <h4 className="text-[12px] font-bold text-[#10143b]">
                    {title}
                </h4>
            </div>

            <p className="mt-2 text-[12px] leading-5 text-[#68708b]">
                {description}
            </p>
        </div>
    );
}
