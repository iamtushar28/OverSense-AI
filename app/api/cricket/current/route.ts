import { NextResponse } from "next/server";

const API_KEY = process.env.CRICAPI_KEY;
const BASE_URL = process.env.CRICAPI_BASE_URL ?? "https://api.cricapi.com/v1";

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "CRICAPI_KEY is not configured.",
        data: [],
        dataType: "none",
      },
      { status: 500 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      `${BASE_URL}/currentMatches?apikey=${encodeURIComponent(API_KEY)}&offset=0`,
      {
        cache: "no-store",
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(`CricAPI request failed with status ${response.status}.`);
    }

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(
        result.reason || "CricAPI returned an unsuccessful response.",
      );
    }

    const matches = result.data ?? [];

    const liveMatches = matches.filter(
      (match: {
        matchStarted?: boolean;
        matchEnded?: boolean;
        matchType?: string;
      }) => match.matchStarted && !match.matchEnded,
    );

    const liveOdi = liveMatches.filter(
      (match: { matchType?: string }) =>
        match.matchType?.toLowerCase() === "odi",
    );

    const selectedMatches = liveOdi.length
      ? liveOdi
      : liveMatches.length
        ? liveMatches
        : matches.length
          ? matches
          : [];

    const dataType = liveOdi.length
      ? "live-odi"
      : liveMatches.length
        ? "live-other"
        : matches.length
          ? "test"
          : "none";

    return NextResponse.json({
      success: true,
      data: selectedMatches,
      dataType,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.name === "AbortError"
          ? "CricAPI request timed out. Please try again."
          : error.message
        : "Unable to fetch cricket matches.";

    console.error("CricAPI error:", error);

    return NextResponse.json(
      {
        success: false,
        error: message,
        data: [],
        dataType: "none",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
