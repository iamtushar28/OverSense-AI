import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.CRICAPI_KEY;
    const baseUrl =
      process.env.CRICAPI_BASE_URL || "https://api.cricapi.com/v1";

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "CricAPI key is missing." },
        { status: 500 },
      );
    }

    const response = await fetch(
      `${baseUrl}/currentMatches?apikey=${apiKey}&offset=0`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`CricAPI returned ${response.status}`);
    }

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.reason || "Unable to fetch matches.");
    }

    const matches = result.data || [];

    const isLive = (match: {
      status?: string;
      matchStarted?: boolean;
      matchEnded?: boolean;
    }) => {
      const status = match.status?.toLowerCase() || "";

      return (
        match.matchStarted === true &&
        match.matchEnded !== true &&
        !status.includes("won") &&
        !status.includes("draw") &&
        !status.includes("abandoned") &&
        !status.includes("cancelled")
      );
    };

    const liveMatches = matches.filter(isLive);

    // First priority: live ODI
    const liveOdiMatches = liveMatches.filter(
      (match: { matchType?: string }) =>
        match.matchType?.toLowerCase() === "odi",
    );

    // Second priority: any other live match
    const fallbackLiveMatches = liveMatches;

    // Third priority: any available match for testing
    const fallbackMatches = matches;

    let selectedMatches = liveOdiMatches;
    let dataType: "live-odi" | "live-other" | "test" | "none" = "live-odi";

    if (selectedMatches.length === 0 && fallbackLiveMatches.length > 0) {
      selectedMatches = fallbackLiveMatches;
      dataType = "live-other";
    }

    if (selectedMatches.length === 0 && fallbackMatches.length > 0) {
      selectedMatches = fallbackMatches;
      dataType = "test";
    }

    return NextResponse.json({
      success: true,
      data: selectedMatches,
      dataType,
    });
  } catch (error) {
    console.error("Current cricket matches error:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
        dataType: "none",
        message:
          error instanceof Error ? error.message : "Unable to fetch matches.",
      },
      { status: 500 },
    );
  }
}
