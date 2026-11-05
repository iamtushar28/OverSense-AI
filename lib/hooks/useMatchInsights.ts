"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { CricketMatch } from "@/types/cricket";
import type { MatchInsightsData } from "@/types/match-insights";

function getMatchTeams(match?: CricketMatch) {
  const teams = match?.teams ?? [];
  const latestInning = match?.score?.[match.score.length - 1];

  const inningName = latestInning?.inning?.toLowerCase() ?? "";

  const battingTeam =
    teams.find((team) => inningName.includes(team.toLowerCase())) ??
    teams[0] ??
    "Unknown";

  const bowlingTeam = teams.find((team) => team !== battingTeam) ?? "Unknown";

  return { battingTeam, bowlingTeam };
}

export function useMatchInsights(match?: CricketMatch) {
  const [insights, setInsights] = useState<MatchInsightsData | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const requestIdRef = useRef(0);
  const lastRequestedKeyRef = useRef<string | null>(null);

  const latestScore = match?.score?.[match.score.length - 1];

  const runs = latestScore?.r;
  const wickets = latestScore?.w;
  const overs = latestScore?.o;
  const inning = latestScore?.inning;

  const { battingTeam, bowlingTeam } = getMatchTeams(match);

  const snapshotKey = [
    match?.id ?? "",
    runs ?? "",
    wickets ?? "",
    overs ?? "",
    inning ?? "",
  ].join(":");

  const generateInsights = useCallback(
    async (force = false) => {
      if (
        !match ||
        !latestScore ||
        runs === undefined ||
        wickets === undefined ||
        overs === undefined
      ) {
        return;
      }

      if (!force && lastRequestedKeyRef.current === snapshotKey) {
        return;
      }

      lastRequestedKeyRef.current = snapshotKey;

      const requestId = ++requestIdRef.current;

      setIsGenerating(true);
      setError(null);

      try {
        const response = await fetch("/api/ai/match-insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            match: {
              id: match.id,
              name: match.name,
              matchType: match.matchType,
              status: match.status,
              venue: match.venue,
              teams: match.teams,
              battingTeam,
              bowlingTeam,
              runs,
              wickets,
              overs,
              inning,
              matchStarted: match.matchStarted,
              matchEnded: match.matchEnded,
            },
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Unable to generate match insights.");
        }

        if (requestId === requestIdRef.current) {
          setInsights(result.data);
        }
      } catch (err) {
        if (requestId === requestIdRef.current) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while generating insights.",
          );
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsGenerating(false);
        }
      }
    },
    [
      match,
      latestScore,
      runs,
      wickets,
      overs,
      inning,
      battingTeam,
      bowlingTeam,
      snapshotKey,
    ],
  );

  useEffect(() => {
    if (!match || !latestScore) return;

    void generateInsights();
  }, [generateInsights, match, latestScore, retryCount]);

  const refreshInsights = useCallback(() => {
    lastRequestedKeyRef.current = null;
    setRetryCount((count) => count + 1);
  }, []);

  return {
    insights,
    isGenerating,
    error,
    refreshInsights,
    battingTeam,
    bowlingTeam,
    latestScore,
  };
}
