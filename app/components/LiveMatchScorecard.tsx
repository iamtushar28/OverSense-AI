
"use client";

import type { CricketMatch } from "@/types/cricket";

type LiveMatchScorecardProps = {
    match?: CricketMatch;
    target?: number;
    runsNeeded?: number;
    ballsRemaining?: number;
    requiredRunRate?: string;
};

const COUNTRY_FLAGS: Record<string, string> = {
    india: "in",
    ind: "in",
    australia: "au",
    aus: "au",
    bangladesh: "bd",
    ban: "bd",
    afghanistan: "af",
    afg: "af",
    pakistan: "pk",
    pak: "pk",
    england: "gb-eng",
    eng: "gb-eng",
    "south africa": "za",
    sa: "za",
    "new zealand": "nz",
    nz: "nz",
    "west indies": "jm",
    wi: "jm",
    srilanka: "lk",
    sl: "lk",
    zimbabwe: "zw",
    zim: "zw",
    ireland: "ie",
    ire: "ie",
    nepal: "np",
    nep: "np",
    usa: "us",
    uae: "ae",
    netherlands: "nl",
    ned: "nl",
    scotland: "gb-sct",
    sco: "gb-sct",
};

function getFlagCode(name?: string) {
    if (!name) return null;

    const normalized = name.toLowerCase().trim();

    if (COUNTRY_FLAGS[normalized]) {
        return COUNTRY_FLAGS[normalized];
    }

    const country = Object.keys(COUNTRY_FLAGS).find(
        (key) => normalized.includes(key)
    );

    return country ? COUNTRY_FLAGS[country] : null;
}

export default function LiveMatchScorecard({
    match,
    target,
    runsNeeded,
    ballsRemaining,
    requiredRunRate,
}: LiveMatchScorecardProps) {
    if (!match) {
        return (
            <section className="flex min-h-[150px] items-center justify-center rounded-xl border border-[#e1e5f5] bg-white p-6 text-sm font-medium text-[#59617d] sm:rounded-2xl">
                No match information available.
            </section>
        );
    }

    const teams = match.teams || [];
    const teamInfo = match.teamInfo || [];
    const scores = match.score || [];

    const currentInning = scores[scores.length - 1];

    const inningName = currentInning?.inning?.toLowerCase() || "";

    const battingTeamIndex = teams.findIndex((team) =>
        inningName.includes(team.toLowerCase())
    );

    const resolvedBattingIndex =
        battingTeamIndex >= 0 ? battingTeamIndex : 0;

    const battingTeamName = teams[resolvedBattingIndex] || "Team 1";
    const bowlingTeamName =
        teams[resolvedBattingIndex === 0 ? 1 : 0] || "Team 2";

    const getTeamInfo = (teamName: string) =>
        teamInfo.find(
            (team) =>
                team.name?.toLowerCase() === teamName.toLowerCase() ||
                team.shortname?.toLowerCase() === teamName.toLowerCase()
        );

    const battingInfo = getTeamInfo(battingTeamName);
    const bowlingInfo = getTeamInfo(bowlingTeamName);

    const battingShortName =
        battingInfo?.shortname || battingTeamName.slice(0, 3).toUpperCase();

    const bowlingShortName =
        bowlingInfo?.shortname || bowlingTeamName.slice(0, 3).toUpperCase();

    const battingFlag = getFlagCode(battingTeamName);
    const bowlingFlag = getFlagCode(bowlingTeamName);

    const score = currentInning
        ? `${currentInning.r}/${currentInning.w}`
        : "0/0";

    const overs = currentInning?.o ?? "0.0";

    const isLive =
        match.matchStarted === true &&
        match.matchEnded !== true;

    const hasMatchSituation =
        target !== undefined ||
        runsNeeded !== undefined ||
        ballsRemaining !== undefined ||
        requiredRunRate !== undefined;

    return (
        <section className="relative w-full min-w-0 rounded-xl border border-[#e1e5f5] bg-white px-3 pb-3 pt-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:rounded-2xl sm:px-5 sm:pb-4">

            {/* Live Indicator */}
            {isLive && (
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                    <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#ed263b] px-3 py-1 text-[11px] font-bold text-white sm:text-xs">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        <span className="animate-pulse">
                            LIVE
                        </span>
                    </span>
                </div>
            )}

            {/* Score Row */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 pt-2 sm:gap-3">

                {/* Batting Team */}
                <div className="flex min-w-0 items-center justify-start gap-1.5 sm:gap-3">
                    {battingFlag && (
                        <img
                            src={`https://flagcdn.com/w80/${battingFlag}.png`}
                            alt={`${battingTeamName} flag`}
                            className="h-6 w-8 shrink-0 rounded-sm object-cover sm:h-8 sm:w-10"
                        />
                    )}

                    <div className="flex min-w-0 flex-col items-start gap-1">
                        <span className="truncate text-[15px] font-extrabold leading-none text-[#10143b] sm:text-[22px]">
                            {battingShortName}
                        </span>

                        <span className="whitespace-nowrap rounded-full bg-[#eee8ff] px-2 py-0.5 text-[9px] font-semibold leading-tight text-[#5420ed] sm:px-3 sm:py-1 sm:text-[12px]">
                            Batting
                        </span>
                    </div>
                </div>

                {/* Score */}
                <div className="flex min-w-0 flex-col items-center justify-center whitespace-nowrap px-1">
                    <span className="text-[23px] font-extrabold leading-none tracking-tight text-[#10143b] sm:text-[35px]">
                        {score}
                    </span>

                    <span className="mt-1 text-[11px] font-medium text-[#59617d] sm:text-[15px]">
                        ({overs} overs)
                    </span>
                </div>

                {/* Bowling Team */}
                <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-3">
                    <div className="flex min-w-0 flex-col items-end gap-1">
                        <span className="truncate text-[15px] font-extrabold leading-none text-[#10143b] sm:text-[22px]">
                            {bowlingShortName}
                        </span>

                        <span className="whitespace-nowrap rounded-full bg-[#f0f2f8] px-2 py-0.5 text-[9px] font-semibold leading-tight text-[#59617d] sm:px-3 sm:py-1 sm:text-[12px]">
                            Bowling
                        </span>
                    </div>

                    {bowlingFlag && (
                        <img
                            src={`https://flagcdn.com/w80/${bowlingFlag}.png`}
                            alt={`${bowlingTeamName} flag`}
                            className="h-6 w-8 shrink-0 rounded-sm object-cover sm:h-8 sm:w-10"
                        />
                    )}
                </div>
            </div>

            {/* Match Situation */}
            {hasMatchSituation && (
                <div className="mt-3 grid grid-cols-2 gap-y-2 border-t border-[#edf0f7] pt-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2">

                    {target !== undefined && (
                        <div className="text-center text-[11px] font-medium text-[#171a35] sm:text-[14px]">
                            Target: <strong>{target}</strong>
                        </div>
                    )}

                    {runsNeeded !== undefined && (
                        <div className="text-center text-[11px] font-medium text-[#171a35] sm:text-[14px]">
                            Runs needed: <strong>{runsNeeded}</strong>
                            {ballsRemaining !== undefined &&
                                ` off ${ballsRemaining} balls`}
                        </div>
                    )}

                    {requiredRunRate !== undefined && (
                        <div className="col-span-2 text-center text-[11px] font-medium text-[#171a35] sm:col-span-1 sm:text-[14px]">
                            Required RR: <strong>{requiredRunRate}</strong>
                        </div>
                    )}
                </div>
            )}

            {/* Match Status */}
            <div className="mt-3 border-t border-[#edf0f7] pt-2 text-center">
                <p className="text-[11px] font-medium text-[#59617d] sm:text-xs">
                    {match.status}
                </p>
            </div>
        </section>
    );
}
