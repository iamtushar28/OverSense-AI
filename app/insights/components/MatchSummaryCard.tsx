"use client";

import type { CricketMatch } from "@/types/cricket";
import TeamFlag from "./TeamFlag";

type Props = {
    match?: CricketMatch;
    battingTeam: string;
    runs?: number;
    wickets?: number;
    overs?: number;
    isLoading: boolean;
    isError: boolean;
};

function getTeamAbbreviation(team: string) {
    const words = team.trim().split(/\s+/);

    if (words.length === 1) {
        return team.slice(0, 3).toUpperCase();
    }

    return words
        .map((word) => word[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();
}

export default function MatchSummaryCard({
    match,
    battingTeam,
    runs,
    wickets,
    overs,
    isLoading,
    isError,
}: Props) {
    const isLive = Boolean(
        match?.matchStarted && !match?.matchEnded
    );

    if (isLoading && !match) {
        return (
            <section className="rounded-xl border border-[#e1e5f5] bg-white p-5 shadow-sm">
                <div className="animate-pulse space-y-3">
                    <div className="h-3 w-28 rounded bg-slate-100" />
                    <div className="h-6 w-48 rounded bg-slate-100" />
                    <div className="h-4 w-32 rounded bg-slate-100" />
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="rounded-xl border border-[#e1e5f5] bg-white p-5">
                <p className="text-sm text-red-500">
                    Unable to load match information. Refresh from
                    the Navbar.
                </p>
            </section>
        );
    }

    if (!match) {
        return (
            <section className="rounded-xl border border-[#e1e5f5] bg-white p-5">
                <p className="text-sm font-semibold text-[#59617d]">
                    No match is currently available.
                </p>
            </section>
        );
    }

    const teamOne = match.teams?.[0] ?? "Team 1";
    const teamTwo = match.teams?.[1] ?? "Team 2";

    // CricAPI's teamInfo may contain the original team flag URL.
    const teamInfo = (match.teamInfo ?? []) as {
        name?: string;
        shortname?: string;
        img?: string;
    }[];

    return (
        <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-[#858ba3]">
                        CURRENT MATCH
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[15px] font-extrabold text-[#10143b]">
                        <div className="flex items-center gap-2">
                            <TeamFlag
                                teamName={teamOne}
                                teamInfo={teamInfo}
                            />
                            <span>{getTeamAbbreviation(teamOne)}</span>
                        </div>

                        <span className="text-[#a5a9ba]">vs</span>

                        <div className="flex items-center gap-2">
                            <TeamFlag
                                teamName={teamTwo}
                                teamInfo={teamInfo}
                            />
                            <span>{getTeamAbbreviation(teamTwo)}</span>
                        </div>
                    </div>

                    <p className="mt-1 max-w-[420px] truncate text-[11px] text-[#858ba3]">
                        {match.name}
                    </p>

                    <p className="mt-1 text-[11px] text-[#59617d]">
                        {battingTeam} batting · {overs ?? 0} overs
                    </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    <div>
                        <p className="text-[10px] font-medium text-[#858ba3]">
                            SCORE
                        </p>
                        <p className="text-[20px] font-extrabold text-[#10143b]">
                            {runs ?? 0}/{wickets ?? 0}
                        </p>
                    </div>

                    <div className="h-9 w-px bg-[#edf0f7]" />

                    <div>
                        <p className="text-[10px] font-medium text-[#858ba3]">
                            OVERS
                        </p>
                        <p className="text-[20px] font-extrabold text-[#10143b]">
                            {overs ?? 0}
                        </p>
                    </div>

                    <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${isLive
                            ? "bg-[#fff0f1] text-[#ed263b]"
                            : "bg-slate-100 text-slate-600"
                            }`}
                    >
                        {match.matchEnded
                            ? "ENDED"
                            : isLive
                                ? "LIVE"
                                : "NOT LIVE"}
                    </span>
                </div>
            </div>
        </section>
    );
}