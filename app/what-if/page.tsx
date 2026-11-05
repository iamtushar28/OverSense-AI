
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiZap } from "react-icons/fi";

import { useGetCurrentMatchesQuery } from "@/lib/redux/services/cricketApi";
import type { CricketMatch } from "@/types/cricket";
import type { WhatIfAnalysis } from "@/types/what-if";

import MatchContextCard from "./components/MatchContextCard";
import ScenarioComposer from "./components/ScenarioComposer";
import ScenarioResult from "./components/ScenarioResult";

function getMatchTeams(match?: CricketMatch) {
    const teams = match?.teams ?? [];

    const latestInning =
        match?.score?.[match.score.length - 1];

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

export default function WhatIfPage() {
    const searchParams = useSearchParams();

    const {
        data,
        isLoading: isMatchLoading,
        isError: isMatchError,
    } = useGetCurrentMatchesQuery();

    const match = data?.matches?.[0];

    // Scenario state
    const [scenario, setScenario] = useState("");
    const [activeScenario, setActiveScenario] = useState("");

    // AI analysis state
    const [analysis, setAnalysis] =
        useState<WhatIfAnalysis | null>(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get the latest match score
    const latestScore =
        match?.score?.[match.score.length - 1];

    // Get current batting and bowling teams
    const { battingTeam, bowlingTeam } = useMemo(
        () => getMatchTeams(match),
        [match]
    );

    // Check whether a valid live match is available
    const canAnalyze = Boolean(
        match &&
        latestScore &&
        match.matchStarted &&
        !match.matchEnded
    );

    // Automatically populate scenario from URL.
    useEffect(() => {
        const initialScenario =
            searchParams.get("scenario")?.trim() ?? "";

        if (!initialScenario) return;

        setScenario(initialScenario);
        setActiveScenario("");
        setAnalysis(null);
        setError(null);
    }, [searchParams]);

    // Generate AI scenario analysis
    const handleAsk = useCallback(
        async (question = scenario) => {
            const trimmedQuestion = question.trim();

            if (!trimmedQuestion || isAnalyzing || !match || !latestScore) {
                return;
            }

            if (trimmedQuestion.length < 5) {
                setError("Please enter a more detailed scenario.");
                return;
            }

            if (trimmedQuestion.length > 500) {
                setError("Scenario must be 500 characters or fewer.");
                return;
            }

            if (match.matchEnded || !match.matchStarted) {
                setError(
                    "Scenario analysis is available only during a live match."
                );
                return;
            }

            setScenario(trimmedQuestion);
            setActiveScenario(trimmedQuestion);
            setIsAnalyzing(true);
            setError(null);
            setAnalysis(null);

            try {
                const response = await fetch("/api/ai/what-if", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        scenario: trimmedQuestion,
                        match: {
                            name: match.name,
                            matchType: match.matchType,
                            status: match.status,
                            venue: match.venue,
                            teams: match.teams,

                            battingTeam,
                            bowlingTeam,

                            runs: latestScore.r ?? 0,
                            wickets: latestScore.w ?? 0,
                            overs: latestScore.o ?? 0,

                            inning: latestScore.inning,

                            matchStarted: match.matchStarted,
                            matchEnded: match.matchEnded,
                        },
                    }),
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.error ||
                        "Unable to analyze this scenario."
                    );
                }

                setAnalysis(result.data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while analyzing the scenario."
                );
            } finally {
                setIsAnalyzing(false);
            }
        },
        [
            scenario,
            isAnalyzing,
            match,
            latestScore,
            battingTeam,
            bowlingTeam,
        ]
    );

    return (
        <div className="mx-auto w-full max-w-[1100px] min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-6">

            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#2563eb]">
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

            {/* Live Match Context */}
            <MatchContextCard
                match={match}
                isLoading={isMatchLoading}
                isError={isMatchError}
            />

            {/* Scenario Input */}
            <ScenarioComposer
                scenario={scenario}
                setScenario={setScenario}
                battingTeam={battingTeam}
                bowlingTeam={bowlingTeam}
                isLoading={isAnalyzing}
                disabled={!canAnalyze}
                onAsk={handleAsk}
            />

            {/* Live Match Warning */}
            {!canAnalyze && !isMatchLoading && !isMatchError && (
                <p className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
                    {match?.matchEnded
                        ? "This match has ended. A live match is required for scenario analysis."
                        : "Waiting for a live match with score data. Refresh match data from the Navbar."}
                </p>
            )}

            {/* AI Result */}
            <ScenarioResult
                scenario={activeScenario}
                result={analysis}
                isLoading={isAnalyzing}
                error={error}
            />
        </div>
    );
}
