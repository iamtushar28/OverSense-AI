"use client";

import { useState } from "react";
import {
    FiZap,
    FiArrowUpRight,
    FiArrowRight,
    FiClock,
    FiMessageSquare,
} from "react-icons/fi";

const suggestedScenarios = [
    "What if India scores 15 runs next over?",
    "What if India loses 2 wickets in the next 2 overs?",
    "What if Virat Kohli scores 20 runs?",
    "What if Australia takes a wicket now?",
];

export default function WhatIfPage() {
    const [scenario, setScenario] = useState("");
    const [activeScenario, setActiveScenario] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = (question = scenario) => {
        const trimmedQuestion = question.trim();

        if (!trimmedQuestion || isLoading) return;

        setScenario(trimmedQuestion);
        setActiveScenario(trimmedQuestion);
        setIsLoading(true);

        // Replace this with your What-If AI API call.
        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div className="mx-auto w-full max-w-[1100px] min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-6">

            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#853df5]">
                    <FiZap size={15} />
                    AI MATCH SIMULATOR
                </div>

                <h1 className="mt-2 text-[23px] font-extrabold tracking-tight text-[#10143b] sm:text-[30px]">
                    What-If Simulator
                </h1>

                <p className="mt-1 max-w-2xl text-[13px] leading-6 text-[#858ba3] sm:text-[14px]">
                    Explore alternative match scenarios and understand how
                    they could change the game.
                </p>
            </div>

            {/* Match Context */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e1e5f5] bg-white px-4 py-3 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:px-5">
                <div>
                    <p className="text-[11px] font-semibold text-[#858ba3]">
                        CURRENT MATCH
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-[14px] font-extrabold text-[#10143b]">
                        <span>🇮🇳 India</span>
                        <span className="text-[#a5a9ba]">vs</span>
                        <span>🇦🇺 Australia</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-[10px] font-medium text-[#858ba3]">
                            SCORE
                        </p>
                        <p className="text-[15px] font-extrabold text-[#10143b]">
                            145/4
                        </p>
                    </div>

                    <div className="h-8 w-px bg-[#edf0f7]" />

                    <div>
                        <p className="text-[10px] font-medium text-[#858ba3]">
                            OVERS
                        </p>
                        <p className="text-[15px] font-extrabold text-[#10143b]">
                            15.0
                        </p>
                    </div>

                    <span className="rounded-full bg-[#fff0f1] px-2.5 py-1 text-[10px] font-bold text-[#ed263b]">
                        LIVE
                    </span>
                </div>
            </div>

            {/* Scenario Input */}
            <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-6">
                <div className="flex items-center gap-2">
                    <FiMessageSquare
                        size={19}
                        className="text-[#853df5]"
                    />

                    <h2 className="text-[16px] font-extrabold text-[#10143b]">
                        Create a scenario
                    </h2>
                </div>

                <p className="mt-1 text-[12px] text-[#858ba3]">
                    Ask how a possible event could affect the match.
                </p>

                <div className="mt-4 rounded-xl border border-[#dedcf5] bg-[#fcfbff] p-2 focus-within:border-[#a78bfa] focus-within:ring-2 focus-within:ring-[#853df5]/10">
                    <textarea
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                        placeholder="e.g. What if India scores 20 runs in the next over?"
                        rows={3}
                        className="w-full resize-none bg-transparent px-2 py-2 text-[13px] font-medium text-[#10143b] outline-none placeholder:text-[#a5a9ba] sm:text-[14px]"
                    />

                    <div className="flex items-center justify-between gap-2 border-t border-[#eeeaf9] pt-2">
                        <span className="px-2 text-[10px] text-[#a5a9ba]">
                            Ask anything about this match
                        </span>

                        <button
                            onClick={() => handleAsk()}
                            disabled={!scenario.trim() || isLoading}
                            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#5420ed] px-4 py-2 text-[12px] font-bold text-white transition hover:bg-[#4314cf] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? "Analyzing..." : "Analyze"}
                            <FiArrowUpRight size={15} />
                        </button>
                    </div>
                </div>

                {/* Suggested Scenarios */}
                <div className="mt-5">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#858ba3]">
                        Try a scenario
                    </p>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {suggestedScenarios.map((question) => (
                            <button
                                key={question}
                                onClick={() => handleAsk(question)}
                                className="group flex items-center justify-between gap-3 rounded-lg border border-[#edf0f7] px-3 py-3 text-left transition hover:border-[#cfc3ff] hover:bg-[#faf8ff]"
                            >
                                <span className="text-[12px] font-medium leading-5 text-[#59617d] group-hover:text-[#5420ed]">
                                    {question}
                                </span>

                                <FiArrowRight
                                    size={15}
                                    className="shrink-0 text-[#a5a9ba] group-hover:text-[#5420ed]"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Response */}
            <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eee8ff] text-[#853df5]">
                        <FiZap size={17} />
                    </div>

                    <div>
                        <h2 className="text-[15px] font-extrabold text-[#10143b]">
                            AI Scenario Analysis
                        </h2>
                        <p className="text-[10px] text-[#858ba3]">
                            Match-aware predictions
                        </p>
                    </div>
                </div>

                <div className="mt-4 rounded-lg bg-[#fafaff] p-4">
                    {!activeScenario ? (
                        <div className="py-5 text-center">
                            <FiMessageSquare
                                size={25}
                                className="mx-auto text-[#c2b6ed]"
                            />

                            <p className="mt-3 text-[13px] font-semibold text-[#59617d]">
                                Your analysis will appear here
                            </p>

                            <p className="mt-1 text-[11px] text-[#a5a9ba]">
                                Enter a scenario above to explore its possible impact.
                            </p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-[#5420ed]">
                                <FiClock size={13} />
                                YOUR SCENARIO
                            </div>

                            <p className="mt-2 text-[13px] font-semibold leading-6 text-[#10143b]">
                                {activeScenario}
                            </p>

                            {isLoading ? (
                                <p className="mt-4 animate-pulse text-[12px] font-medium text-[#858ba3]">
                                    Analyzing match scenario...
                                </p>
                            ) : (
                                <p className="mt-4 text-[12px] leading-5 text-[#858ba3]">
                                    Connect your AI analysis API to generate
                                    the scenario outcome here.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}