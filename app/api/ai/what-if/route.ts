import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  scenario: z.string().trim().min(5).max(500),

  match: z.object({
    name: z.string(),
    matchType: z.string().optional(),
    status: z.string(),
    venue: z.string().optional(),
    teams: z.array(z.string()).min(2).max(2),

    battingTeam: z.string(),
    bowlingTeam: z.string(),

    runs: z.number().nonnegative(),
    wickets: z.number().min(0).max(10),
    overs: z.number().nonnegative(),

    matchStarted: z.boolean().optional(),
    matchEnded: z.boolean().optional(),
  }),
});

const WhatIfOutputSchema = z.object({
  headline: z.string(),
  scenario: z.string(),
  outcomeSummary: z.string(),

  scoreImpact: z.string(),
  wicketImpact: z.string(),
  matchImpact: z.string(),

  keyFactors: z.array(z.string()).min(2).max(5),
  assumptions: z.array(z.string()).min(1).max(4),

  uncertainty: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid scenario or match information.",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { scenario, match } = parsed.data;

    if (match.matchEnded) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This match has ended. What-If analysis is available for an ongoing match.",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are OverSense AI, a cricket match scenario analyst.

Your task is to simulate a hypothetical cricket scenario using the supplied live match snapshot.

IMPORTANT RULES:
1. Treat the supplied match information as the actual match state.
2. Treat the user's scenario as a hypothetical event, not an event that has already happened.
3. Never claim that a hypothetical event has actually occurred.
4. Do not invent actual players, ball-by-ball events, partnerships, injuries, or statistics.
5. If player information is not supplied, discuss teams and match situations rather than inventing player names.
6. Consider the match format, current score, wickets, overs, batting team, bowling team, and match status.
7. Explain how the scenario could affect scoring pressure, wickets, required run rate, or match momentum where relevant.
8. Do not manufacture precise win probabilities or claim statistical certainty.
9. If information is missing, explicitly state the assumptions.
10. Keep the response clear and useful to a cricket viewer.

LIVE MATCH SNAPSHOT:
Match: ${match.name}
Format: ${match.matchType ?? "Unknown"}
Venue: ${match.venue ?? "Unknown"}
Status: ${match.status}
Teams: ${match.teams.join(" vs ")}

Batting team: ${match.battingTeam}
Bowling team: ${match.bowlingTeam}

Current score: ${match.runs}/${match.wickets}
Overs: ${match.overs}
Match started: ${match.matchStarted ?? "Unknown"}
Match ended: ${match.matchEnded ?? "Unknown"}

USER'S HYPOTHETICAL SCENARIO:
<scenario>
${scenario}
</scenario>

ANALYSIS REQUIREMENTS:
- Explain the likely immediate effect of this scenario.
- Explain the possible score and wicket impact without pretending to know the exact future.
- Explain how the scenario may change the match situation.
- Identify the most important factors that could change the outcome.
- State assumptions and uncertainty honestly.

Return a structured analysis. Make the headline concise and the explanations specific to this match.
`;

    const { output } = await generateText({
      model: google("gemini-3.1-flash-lite"),
      output: Output.object({
        schema: WhatIfOutputSchema,
      }),
      prompt,
    });

    if (!output) {
      throw new Error("AI did not return a valid analysis.");
    }

    return NextResponse.json({
      success: true,
      data: output,
    });
  } catch (error) {
    console.error("What-If API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to analyze this scenario.",
      },
      { status: 500 },
    );
  }
}
