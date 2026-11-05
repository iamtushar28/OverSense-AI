
"use client";

import { FiActivity } from "react-icons/fi";
import type { CricketMatch } from "@/types/cricket";

type Props = {
    match?: CricketMatch;
    isLoading: boolean;
    isError: boolean;
};

export default function MatchContextCard({
    match,
    isLoading,
    isError,
}: Props) {
    if (isLoading && !match) {
        return (
            <div className="animate-pulse rounded-xl border border-[#e1e5f5] bg-white p-5">
                <div className="h-4 w-32 rounded bg-slate-100" />
                <div className="mt-4 h-7 w-48 rounded bg-slate-100" />
                <div className="mt-3 h-4 w-36 rounded bg-slate-100" />
            </div>
        );
    }

    if (isError && !match) {
        return (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                Unable to load the current match. Try refreshing from the Navbar.
            </div>
        );
    }

    if (!match) {
        return (
            <div className="rounded-xl border border-[#e1e5f5] bg-white p-5">
                <p className="text-sm font-semibold text-[#10143b]">
                    No match available
                </p>
                <p className="mt-1 text-xs text-[#858ba3]">
                    A match must be available before you can run a simulation.
                </p>
            </div>
        );
    }

    const latestScore = match.score?.[match.score.length - 1];

    const battingTeam =
        match.teams?.find((team) =>
            latestScore?.inning
                ?.toLowerCase()
                .includes(team.toLowerCase())
        ) ?? match.teams?.[0];

    const bowlingTeam = match.teams?.find(
        (team) => team !== battingTeam
    );

    const teamOne = match.teams?.[0] ?? "Team 1";
    const teamTwo = match.teams?.[1] ?? "Team 2";

    const score = latestScore
        ? `${latestScore.r}/${latestScore.w}`
        : "Score unavailable";

    const overs = latestScore?.o ?? 0;

    const isLive = match.matchStarted && !match.matchEnded;

    return (
        <section className="rounded-xl border border-[#e1e5f5] bg-white px-4 py-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-[11px] font-bold tracking-wide text-[#858ba3]">
                        CURRENT MATCH
                    </p>

                    <h2 className="mt-1 truncate text-[17px] font-extrabold text-[#10143b] sm:text-[19px]">
                        {teamOne}{" "}
                        <span className="text-[#a5a9ba]">vs</span>{" "}
                        {teamTwo}
                    </h2>

                    <p className="mt-1 truncate text-xs text-[#858ba3]">
                        {match.name}
                    </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-5">
                    <div>
                        <p className="text-[10px] font-semibold text-[#858ba3]">
                            SCORE
                        </p>
                        <p className="text-[17px] font-extrabold text-[#10143b]">
                            {score}
                        </p>
                    </div>

                    <div className="h-9 w-px bg-[#edf0f7]" />

                    <div>
                        <p className="text-[10px] font-semibold text-[#858ba3]">
                            OVERS
                        </p>
                        <p className="text-[17px] font-extrabold text-[#10143b]">
                            {overs}
                        </p>
                    </div>

                    <span
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${isLive
                                ? "bg-[#fff0f1] text-[#ed263b]"
                                : "bg-slate-100 text-slate-600"
                            }`}
                    >
                        {isLive && (
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ed263b]" />
                        )}
                        {match.matchEnded ? "ENDED" : isLive ? "LIVE" : "UPCOMING"}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#f0f1f7] pt-3 text-xs">
                <div className="flex items-center gap-1.5 text-[#59617d]">
                    <FiActivity className="text-[#2563eb]" size={14} />
                    <span>
                        Batting:{" "}
                        <strong className="text-[#10143b]">
                            {battingTeam ?? "Unknown"}
                        </strong>
                    </span>
                </div>

                <div className="text-[#59617d]">
                    Bowling:{" "}
                    <strong className="text-[#10143b]">
                        {bowlingTeam ?? "Unknown"}
                    </strong>
                </div>

                {match.venue && (
                    <div className="min-w-0 truncate text-[#858ba3]">
                        {match.venue}
                    </div>
                )}
            </div>
        </section>
    );
}
