
"use client";

import {
    FiArrowRight,
    FiArrowUpRight,
    FiMessageSquare,
} from "react-icons/fi";

type Props = {
    scenario: string;
    setScenario: (value: string) => void;
    battingTeam: string;
    bowlingTeam: string;
    isLoading: boolean;
    disabled: boolean;
    onAsk: (question?: string) => void;
};

export default function ScenarioComposer({
    scenario,
    setScenario,
    battingTeam,
    bowlingTeam,
    isLoading,
    disabled,
    onAsk,
}: Props) {
    const suggestedScenarios = [
        `What if ${battingTeam} scores 15 runs in the next over?`,
        `What if ${battingTeam} loses 2 wickets in the next 2 overs?`,
        `What if ${bowlingTeam} takes a wicket in the next over?`,
        `What if ${battingTeam} increases its scoring rate?`,
    ];

    return (
        <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-6">
            <div className="flex items-center gap-2">
                <FiMessageSquare
                    size={19}
                    className="text-[#5420ed]"
                />

                <h2 className="text-[16px] font-extrabold text-[#10143b]">
                    Create a scenario
                </h2>
            </div>

            <p className="mt-1 text-[12px] text-[#858ba3]">
                Ask how a possible event could affect the live match.
            </p>

            <div className="mt-4 rounded-xl border border-[#5320ed41] bg-[#5320ed06] p-2 transition focus-within:border-[#5420ed] focus-within:ring-2 focus-within:ring-[#5420ed]/10">
                <textarea
                    value={scenario}
                    onChange={(event) => setScenario(event.target.value)}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            !event.shiftKey
                        ) {
                            event.preventDefault();
                            onAsk();
                        }
                    }}
                    placeholder={`e.g. What if ${battingTeam} scores 20 runs in the next over?`}
                    rows={3}
                    maxLength={500}
                    disabled={disabled || isLoading}
                    className="w-full resize-none bg-transparent px-2 py-2 text-[13px] font-medium text-[#10143b] outline-none placeholder:text-[#a5a9ba] disabled:opacity-60 sm:text-[14px]"
                />

                <div className="flex items-center justify-between gap-2 border-t border-[#e9edf6] pt-2">
                    <span className="px-2 text-[10px] text-[#a5a9ba]">
                        Enter to analyze · Shift + Enter for new line
                    </span>

                    <button
                        type="button"
                        onClick={() => onAsk()}
                        disabled={!scenario.trim() || disabled || isLoading}
                        className="flex shrink-0 items-center gap-2 rounded-lg bg-[#5420ed] px-4 py-2 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#5118fd] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                        {isLoading ? "Analyzing..." : "Analyze"}
                        <FiArrowUpRight size={15} />
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-[#858ba3]">
                    Try a scenario
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {suggestedScenarios.map((question) => (
                        <button
                            key={question}
                            type="button"
                            disabled={disabled || isLoading}
                            onClick={() => onAsk(question)}
                            className="group flex items-center justify-between gap-3 rounded-lg border border-[#e1e5f5] px-3 py-3 text-left transition hover:border-[#c8b5ff] hover:bg-[#faf8ff] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                            <span className="text-[12px] font-medium leading-5 text-[#59617d] group-hover:text-[#10143b]">
                                {question}
                            </span>

                            <FiArrowRight
                                size={15}
                                className="shrink-0 text-[#a5a9ba] group-hover:text-[#10143b]"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
