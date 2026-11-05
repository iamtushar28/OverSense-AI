
"use client";

import { useEffect, useRef, useState } from "react";

import MatchAnalysisTabs, {
  type AnalysisTab,
} from "./components/MatchAnalysisTabs";

import LiveMatchScorecard from "./components/LiveMatchScorecard";
import AiOverAnalysis from "./components/AiOverAnalysis";
import AskWhatIf from "./components/AskWhatIf";
import MatchWinningProbability from "./components/MatchWinningProbability";
import MatchFlow from "./components/MatchFlow";
import KeyPlayers from "./components/KeyPlayers";
import MatchStats from "./components/MatchStats";

import { useGetCurrentMatchesQuery } from "@/lib/redux/services/cricketApi";
import { useAiOverAnalysis } from "@/lib/hooks/useAiOverAnalysis";

export default function Home() {
  const [activeTab, setActiveTab] =
    useState<AnalysisTab>("over-by-over");

  const {
    data,
    isLoading,
    isError,
  } = useGetCurrentMatchesQuery();

  const currentMatch = data?.matches?.[0];

  const {
    analysis,
    isGenerating,
    error: analysisError,
    refreshAnalysis,
  } = useAiOverAnalysis(currentMatch);

  // Track the last score snapshot to detect Navbar refreshes.
  const lastSnapshotRef = useRef<string | null>(null);

  useEffect(() => {
    if (!currentMatch) return;

    const latestScore =
      currentMatch.score?.[currentMatch.score.length - 1];

    if (!latestScore) return;

    const snapshotKey = [
      currentMatch.id,
      latestScore.r,
      latestScore.w,
      latestScore.o,
    ].join(":");

    // Store the initial snapshot.
    if (lastSnapshotRef.current === null) {
      lastSnapshotRef.current = snapshotKey;
      return;
    }

    // No score change.
    if (lastSnapshotRef.current === snapshotKey) {
      return;
    }

    lastSnapshotRef.current = snapshotKey;

    // Generate updated AI analysis after Navbar refresh.
    void refreshAnalysis(currentMatch);
  }, [currentMatch, refreshAnalysis]);

  const renderActiveContent = () => {
    switch (activeTab) {
      case "over-by-over":
        return (
          <AiOverAnalysis
            overNumber={analysis?.overNumber}
            runs={analysis?.runs}
            wickets={analysis?.wickets}
            headline={analysis?.headline}
            summary={analysis?.summary}
            keyMoments={analysis?.keyMoments}
            matchImpact={analysis?.matchImpact}
            whatTeamNeeds={analysis?.whatTeamNeeds}
            isGenerating={isGenerating}
          />
        );

      case "match-flow":
        return <MatchFlow />;

      case "key-players":
        return <KeyPlayers />;

      case "stats":
        return <MatchStats />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 p-4 sm:gap-6 sm:p-6 lg:p-8">

      {/* Dashboard Content */}
      <div className="grid min-h-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-6">

        {/* Main Content */}
        <main className="flex min-w-0 flex-col gap-5">

          {/* Live Match Scorecard */}
          <LiveMatchScorecard match={currentMatch} />

          {/* Match Analysis Tabs */}
          <MatchAnalysisTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Active Analysis Content */}
          <div className="min-w-0">
            {renderActiveContent()}

            {analysisError && (
              <p className="mt-3 text-sm font-medium text-red-500">
                {analysisError}
              </p>
            )}
          </div>

          {isError && (
            <p className="text-sm font-medium text-red-500">
              Unable to fetch the latest match information.
            </p>
          )}

          {isLoading && !currentMatch && (
            <p className="text-sm text-[#68708b]">
              Loading match information...
            </p>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="flex min-w-0 flex-col gap-5">

          {/* Ask What If */}
          <AskWhatIf />

          {/* Match Winning Probability */}
          <MatchWinningProbability
            match={currentMatch}
          />

        </aside>
      </div>
    </div>
  );
}
