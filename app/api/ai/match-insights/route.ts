import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  match: z.object({
    id: z.string(),
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
    inning: z.string().optional(),
    matchStarted: z.boolean().optional(),
    matchEnded: z.boolean().optional(),
  }),
});

const InsightsSchema = z.object({
  overviewHeadline: z.string(),
  overview: z.string(),

  insights: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(["Batting", "Bowling", "Match situation"]),
        importance: z.enum(["high", "medium", "low"]),
      }),
    )
    .min(2)
    .max(4),

  turningPoints: z
    .array(
      z.object({
        over: z.string(),
        title: z.string(),
        description: z.string(),
        score: z.string(),
      }),
    )
    .max(4),

  turningPointsNote: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid match information.",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const match = parsed.data.match;

    const prompt = `
You are OverSense AI, a cricket match analyst.

Analyze the supplied cricket match snapshot and produce useful, evidence-based match insights.

MATCH INFORMATION:
Match: ${match.name}
Format: ${match.matchType ?? "Unknown"}
Venue: ${match.venue ?? "Unknown"}
Status: ${match.status}
Teams: ${match.teams.join(" vs ")}

Batting team: ${match.battingTeam}
Bowling team: ${match.bowlingTeam}
Current score: ${match.runs}/${match.wickets}
Overs: ${match.overs}
Innings: ${match.inning ?? "Not available"}
Match started: ${match.matchStarted ?? "Unknown"}
Match ended: ${match.matchEnded ?? "Unknown"}

DATA LIMITATIONS:
- You have only the latest innings score and match status.
- You do NOT have ball-by-ball commentary or a sequence of previous over scores.
- You do NOT have player statistics, partnerships, target, required run rate, or historical score progression unless explicitly included above.
- Do not invent any of those missing details.
- Do not claim that a wicket, boundary, partnership, or momentum shift happened in a particular over.
- Do not invent player names.
- Do not treat the match status as ball-by-ball commentary.

OVERVIEW:
Write a concise assessment based only on the supplied score and match state.
Do not declare one team to be winning unless the supplied information supports it.

KEY INSIGHTS:
Generate 2 to 4 useful observations.
Each observation must be supported by the supplied match snapshot.
Use categories Batting, Bowling, or Match situation.
Avoid generic filler. Explain what the current score and wickets may mean, while acknowledging missing context.

TURNING POINTS:
There is no ball-by-ball or previous-over data in this request.
Therefore return an empty turningPoints array.
Set turningPointsNote to:
"Ball-by-ball commentary is not available yet, so actual match turning points cannot be verified."

Do not fabricate turning points to fill this section.

Return the requested structured analysis.
`;

    const { output } = await generateText({
      model: google("gemini-3.1-flash-lite"),
      output: Output.object({
        schema: InsightsSchema,
      }),
      prompt,
    });

    if (!output) {
      throw new Error("AI did not return a valid insights response.");
    }

    return NextResponse.json({
      success: true,
      data: output,
    });
  } catch (error) {
    console.error("Match insights API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate match insights.",
      },
      { status: 500 },
    );
  }
}
