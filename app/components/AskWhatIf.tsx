"use client";

import {
    FiZap,
    FiSend,
    FiArrowRight,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

import { useGetCurrentMatchesQuery } from "@/lib/redux/services/cricketApi";
import { useState } from "react";

function getMatchTeams(match?: {
    teams?: string[];
    score?: {
        inning?: string;
    }[];
}) {
    const teams = match?.teams ?? [];
    const latestInning = match?.score?.[match.score.length - 1];
    const inningName = latestInning?.inning?.toLowerCase() ?? "";

    const battingTeam =
        teams.find((team) =>
            inningName.includes(team.toLowerCase())
        ) ??
        teams[0] ??
        "Batting team";

    const bowlingTeam =
        teams.find((team) => team !== battingTeam) ??
        "Bowling team";

    return { battingTeam, bowlingTeam };
}

export default function AskWhatIf() {
    const router = useRouter();
    const [question, setQuestion] = useState("");

    const { data, isLoading } = useGetCurrentMatchesQuery();

    const match = data?.matches?.[0];

    const { battingTeam, bowlingTeam } = getMatchTeams(match);

    const suggestions = [
        `What if ${battingTeam} scores 15 runs in the next over?`,
        `What if ${battingTeam} loses 2 wickets in the next 2 overs?`,
        `What if ${bowlingTeam} takes a wicket in the next over?`,
    ];

    const handleAsk = (value: string) => {
        const trimmed = value.trim();

        if (!trimmed) return;

        router.push(
            `/what-if?scenario=${encodeURIComponent(trimmed)}`
        );
    };

    return (
        <section className="w-full rounded-2xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)]">
            {/* Header */}
            <div className="mb-4 flex items-start gap-3">
                <FiZap
                    size={23}
                    className="mt-0.5 shrink-0 text-[#853df5]"
                    strokeWidth={2.5}
                />

                <div>
                    <h2 className="text-[19px] font-extrabold tracking-tight text-[#10143b]">
                        Ask What-If?
                    </h2>

                    <p className="mt-1 text-[14px] leading-[22px] text-[#343957]">
                        Explore hypothetical scenarios and see how
                        they could change the match.
                    </p>

                    {match && (
                        <p className="mt-1 text-[11px] font-medium text-[#858ba3]">
                            {battingTeam} batting · {bowlingTeam} bowling
                        </p>
                    )}
                </div>
            </div>

            {/* Suggested Questions */}
            <div className="space-y-2">
                {suggestions.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => handleAsk(item)}
                        disabled={isLoading}
                        className="flex min-h-[64px] w-full items-center gap-3 rounded-xl border border-[#e1e5f5] bg-white px-4 py-2.5 text-left transition-all hover:border-[#c8b5ff] hover:bg-[#faf8ff] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="flex-1 text-[14px] font-medium leading-[21px] text-[#10143b]">
                            {item}
                        </span>

                        <FiArrowRight
                            size={18}
                            className="shrink-0 text-[#273052]"
                        />
                    </button>
                ))}
            </div>

            {/* Custom Question Input */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleAsk(question);
                }}
                className="mt-5 flex items-center gap-2"
            >
                <input
                    type="text"
                    value={question}
                    onChange={(event) =>
                        setQuestion(event.target.value)
                    }
                    placeholder="Ask your own scenario..."
                    maxLength={500}
                    className="h-[49px] min-w-0 flex-1 rounded-full border border-[#dce1ef] bg-white px-4 text-[13px] text-[#10143b] outline-none transition focus:border-[#9564f5] focus:ring-2 focus:ring-[#eee6ff]"
                />

                <button
                    type="submit"
                    disabled={!question.trim()}
                    aria-label="Ask scenario"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a66bfa] to-[#7540e8] text-white shadow-[0_3px_8px_rgba(117,64,232,0.2)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <FiSend size={19} />
                </button>
            </form>
        </section>
    );
}