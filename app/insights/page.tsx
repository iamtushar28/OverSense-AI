"use client";

import { FiAlertCircle } from "react-icons/fi";

import { useGetCurrentMatchesQuery } from "@/lib/redux/services/cricketApi";
import { useMatchInsights } from "@/lib/hooks/useMatchInsights";

import InsightsHeader from "./components/InsightsHeader";
import MatchSummaryCard from "./components/MatchSummaryCard";
import AiOverviewCard from "./components/AiOverviewCard";
import KeyInsightsSection from "./components/KeyInsightsSection";
import TurningPointsSection from "./components/TurningPointsSection";

export default function InsightsPage() {
    const {
        data,
        isLoading: isMatchLoading,
        isError: isMatchError,
    } = useGetCurrentMatchesQuery();

    const match = data?.matches?.[0];

    const {
        insights,
        isGenerating,
        error,
        refreshInsights,
        battingTeam,
        latestScore,
    } = useMatchInsights(match);

    return (
        <div className="mx-auto w-full max-w-[1200px] min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-6">
            <InsightsHeader
                isGenerating={isGenerating}
                onRefresh={refreshInsights}
                disabled={!match || !latestScore}
            />

            <MatchSummaryCard
                match={match}
                battingTeam={battingTeam}
                runs={latestScore?.r}
                wickets={latestScore?.w}
                overs={latestScore?.o}
                isLoading={isMatchLoading}
                isError={isMatchError}
            />

            <AiOverviewCard
                insights={insights}
                isGenerating={isGenerating}
                error={error}
            />

            {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-600">
                    <FiAlertCircle
                        size={16}
                        className="mt-0.5 shrink-0"
                    />
                    <p>{error}</p>
                </div>
            )}

            <KeyInsightsSection
                insights={insights}
                isGenerating={isGenerating}
            />

            <TurningPointsSection insights={insights} />

            <div className="flex items-start gap-2 rounded-xl border border-[#e5edff] bg-[#f5f8ff] p-3 sm:p-4">
                <FiAlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-[#2563eb]"
                />

                <p className="text-[11px] leading-5 text-[#596b91]">
                    AI insights are generated from the match
                    information currently available. Predictions and
                    assessments are estimates, not guaranteed outcomes.
                </p>
            </div>
        </div>
    );
}