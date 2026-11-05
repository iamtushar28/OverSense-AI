export type CricketScore = {
  r: number;
  w: number;
  o: number;
  inning: string;
};

export type CricketMatch = {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue?: string;
  date?: string;
  dateTimeGMT?: string;
  teams: string[];
  teamInfo?: {
    name: string;
    shortname: string;
    img: string;
  }[];
  score?: CricketScore[];
  series_id?: string;

  // Add these
  matchStarted?: boolean;
  matchEnded?: boolean;
};

export type CurrentMatchesResponse = {
  success: boolean;
  data: CricketMatch[];
  dataType: "live-odi" | "live-other" | "test" | "none";
  message?: string;
};
