"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { CricketMatch } from "@/types/cricket";

export type AiOverAnalysisData = {
  overNumber: number;
  runs: number;
  wickets: number;
  headline: string;
  summary: string;
  keyMoments: string[];
  matchImpact: string;
  whatTeamNeeds: string;
};

type MatchSnapshot = {
  runs: number;
  wickets: number;
  overs: number;
};

type AnalysisResponse = {
  success: boolean;
  data?: AiOverAnalysisData;
  error?: string;
};

function getLatestScore(match: CricketMatch): MatchSnapshot | null {
  if (!match.score || match.score.length === 0) {
    return null;
  }

  const latestInning = match.score[match.score.length - 1];

  return {
    runs: latestInning.r ?? 0,
    wickets: latestInning.w ?? 0,
    overs: latestInning.o ?? 0,
  };
}

function getBattingTeam(match: CricketMatch): string {
  const latestInning = match.score?.[match.score.length - 1];

  if (latestInning?.inning) {
    const inningName = latestInning.inning.toLowerCase();

    const battingTeam = match.teams.find((team) =>
      inningName.includes(team.toLowerCase()),
    );

    if (battingTeam) return battingTeam;
  }

  return match.teams[0] ?? "Unknown";
}

function getBowlingTeam(match: CricketMatch): string {
  const battingTeam = getBattingTeam(match);

  return match.teams.find((team) => team !== battingTeam) ?? "Unknown";
}

function hasNewCompletedOver(
  previous: MatchSnapshot,
  current: MatchSnapshot,
): boolean {
  return Math.floor(current.overs) > Math.floor(previous.overs);
}

export function useAiOverAnalysis(match?: CricketMatch) {
  const [analysis, setAnalysis] = useState<AiOverAnalysisData | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previousSnapshotRef = useRef<MatchSnapshot | null>(null);
  const previousMatchIdRef = useRef<string | null>(null);

  const isGeneratingRef = useRef(false);
  const requestIdRef = useRef(0);

  /**
   * Generate AI analysis using the current match snapshot.
   */
  const generateAnalysis = useCallback(
    async (
      latestMatch: CricketMatch,
      currentSnapshot: MatchSnapshot,
      previousSnapshot: MatchSnapshot | null,
      isInitialAnalysis: boolean,
    ) => {
      if (isGeneratingRef.current) return;

      const battingTeam = getBattingTeam(latestMatch);
      const bowlingTeam = getBowlingTeam(latestMatch);

      if (!battingTeam || !bowlingTeam) return;

      const requestId = ++requestIdRef.current;

      isGeneratingRef.current = true;
      setIsGenerating(true);
      setError(null);

      try {
        const response = await fetch("/api/ai/over-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            match: {
              name: latestMatch.name,
              status: latestMatch.status,
              venue: latestMatch.venue,
              teams: latestMatch.teams,
              matchType: latestMatch.matchType,
            },
            battingTeam,
            bowlingTeam,
            completedOver: Math.floor(currentSnapshot.overs),
            isInitialAnalysis,
            previousScore: {
              runs: previousSnapshot?.runs ?? 0,
              wickets: previousSnapshot?.wickets ?? 0,
              overs: previousSnapshot?.overs ?? 0,
            },
            currentScore: {
              runs: currentSnapshot.runs,
              wickets: currentSnapshot.wickets,
              overs: currentSnapshot.overs,
            },
          }),
        });

        const result: AnalysisResponse = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.error || "Failed to generate AI analysis.");
        }

        // Ignore outdated responses.
        if (requestId !== requestIdRef.current) return;

        setAnalysis(result.data);

        // Save the snapshot only after successful analysis.
        previousSnapshotRef.current = currentSnapshot;
        previousMatchIdRef.current = latestMatch.id;
      } catch (err) {
        if (requestId !== requestIdRef.current) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to generate AI analysis.",
        );
      } finally {
        if (requestId === requestIdRef.current) {
          isGeneratingRef.current = false;
          setIsGenerating(false);
        }
      }
    },
    [],
  );

  /**
   * Automatically generate initial analysis when a match loads.
   * This effect runs only when the match ID changes.
   */
  useEffect(() => {
    if (!match) return;

    if (previousMatchIdRef.current === match.id) return;

    const currentSnapshot = getLatestScore(match);

    if (!currentSnapshot) return;

    // Reset old match data.
    previousSnapshotRef.current = null;
    previousMatchIdRef.current = match.id;

    setAnalysis(null);
    setError(null);

    void generateAnalysis(match, currentSnapshot, null, true);
  }, [match?.id, generateAnalysis]);

  /**
   * Manually refresh AI analysis using the latest match data.
   */
  const refreshAnalysis = useCallback(
    async (latestMatch: CricketMatch) => {
      if (isGeneratingRef.current) return;

      const currentSnapshot = getLatestScore(latestMatch);

      if (!currentSnapshot) {
        setError("No score data available for this match.");
        return;
      }

      const isNewMatch = previousMatchIdRef.current !== latestMatch.id;

      const previousSnapshot = isNewMatch ? null : previousSnapshotRef.current;

      const isInitialAnalysis = !previousSnapshot || isNewMatch;

      await generateAnalysis(
        latestMatch,
        currentSnapshot,
        previousSnapshot,
        isInitialAnalysis,
      );
    },
    [generateAnalysis],
  );

  return {
    analysis,
    isGenerating,
    error,
    refreshAnalysis,
  };
}
