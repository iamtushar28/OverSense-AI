"use client";

import { useState } from "react";

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

export default function Home() {
  const [activeTab, setActiveTab] =
    useState<AnalysisTab>("over-by-over");

  const renderActiveContent = () => {
    switch (activeTab) {
      case "over-by-over":
        return <AiOverAnalysis />;

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
    <div className="w-full min-w-0 p-3 sm:p-4 lg:p-5">
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)] 2xl:gap-5">

        {/* Main Section */}
        <main className="flex min-w-0 flex-col gap-3 sm:gap-4">
          <LiveMatchScorecard />

          <MatchAnalysisTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="min-w-0">
            {renderActiveContent()}
          </div>
        </main>

        {/* Sidebar Section */}
        <aside className="flex min-w-0 flex-col gap-3 sm:gap-4 xl:sticky xl:top-4">
          <AskWhatIf
            onAsk={(question) => {
              console.log("Scenario:", question);
            }}
          />

          <MatchWinningProbability
            indiaProbability={39}
            australiaProbability={61}
          />
        </aside>

      </div>
    </div>
  );
}