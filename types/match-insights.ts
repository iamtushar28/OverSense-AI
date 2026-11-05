export type MatchInsight = {
  title: string;
  description: string;
  category: "Batting" | "Bowling" | "Match situation";
  importance: "high" | "medium" | "low";
};

export type MatchTurningPoint = {
  over: string;
  title: string;
  description: string;
  score: string;
};

export type MatchInsightsData = {
  overviewHeadline: string;
  overview: string;
  insights: MatchInsight[];
  turningPoints: MatchTurningPoint[];
  turningPointsNote: string;
};
