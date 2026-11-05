import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CricketMatch, CurrentMatchesResponse } from "@/types/cricket";

export type CurrentMatchesData = {
  matches: CricketMatch[];
  dataType: CurrentMatchesResponse["dataType"];
};

export const cricketApi = createApi({
  reducerPath: "cricketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/cricket",
  }),

  endpoints: (builder) => ({
    getCurrentMatches: builder.query<CurrentMatchesData, void>({
      query: () => "/current",

      transformResponse: (response: CurrentMatchesResponse) => ({
        matches: response.data ?? [],
        dataType: response.dataType ?? "none",
      }),
    }),
  }),
});

export const { useGetCurrentMatchesQuery } = cricketApi;
