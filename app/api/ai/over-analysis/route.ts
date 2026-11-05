import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  match: z.object({
    name: z.string(),
    status: z.string(),
    venue: z.string().optional(),
    teams: z.array(z.string()),
    matchType: z.string().optional(),
  }),

  battingTeam: z.string(),
  bowlingTeam: z.string(),

  completedOver: z.number(),

  isInitialAnalysis: z.boolean().optional().default(false),

  previousScore: z.object({
    runs: z.number(),
    wickets: z.number(),
    overs: z.number(),
  }),

  currentScore: z.object({
    runs: z.number(),
    wickets: z.number(),
    overs: z.number(),
  }),
});

const AnalysisSchema = z.object({
  overNumber: z.number(),
  runs: z.number(),
  wickets: z.number(),
  headline: z.string(),
  summary: z.string(),
  keyMoments: z.array(z.string()).max(3),
  matchImpact: z.string(),
  whatTeamNeeds: z.string(),
});

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemini API key is missing.",
        },
        { status: 500 },
      );
    }

    // Validate request
    const body = RequestSchema.parse(await request.json());

    const {
      match,
      battingTeam,
      bowlingTeam,
      completedOver,
      isInitialAnalysis,
      previousScore,
      currentScore,
    } = body;

    // Calculate score difference for completed-over analysis.
    // For initial analysis, use cumulative innings totals.
    const runs = isInitialAnalysis
      ? currentScore.runs
      : Math.max(0, currentScore.runs - previousScore.runs);

    const wickets = isInitialAnalysis
      ? currentScore.wickets
      : Math.max(0, currentScore.wickets - previousScore.wickets);

    const { output } = await generateText({
      model: google("gemini-3-flash-preview"),

      output: Output.object({
        schema: AnalysisSchema,
      }),

      system: `
You are OverSense AI, an expert cricket analyst specializing in
live match analysis, tactical insights, and cricket strategy.

Your job is to generate concise, accurate and useful cricket insights
for a live cricket intelligence dashboard.

STRICT RULES:

1. Never invent deliveries, boundaries, wickets, player names or events.
2. Use only the match information and score data supplied.
3. Never assume the batting team is India.
4. Refer to teams using their actual supplied names.
5. Do not invent player performances or individual statistics.
6. Do not claim a wicket happened on a particular ball unless
   ball-by-ball information is explicitly supplied.
7. Do not invent required run rate, target, partnership or win probability.
8. If detailed ball-by-ball information is unavailable, explain
   the match situation using the available score data.
9. Keep the headline short, engaging and relevant.
10. Keep the summary concise and easy to understand.
11. Provide up to three factual key moments.
12. Explain the tactical impact of the current situation.
13. Give practical advice for what the batting team needs next.

INITIAL ANALYSIS RULES:

When isInitialAnalysis is true:
- Analyze the current innings situation, not a single completed over.
- The supplied runs and wickets represent cumulative innings totals.
- Never describe cumulative innings totals as runs or wickets
  scored in the latest over.
- Do not claim specific events happened during the latest over.
- Use the current score, wickets and overs to explain the situation.
- Set the headline and summary to describe the current match situation.

COMPLETED OVER RULES:

When isInitialAnalysis is false:
- Analyze the score difference during the completed over.
- The supplied runs and wickets represent this over's totals.
- Do not invent ball-by-ball events.
- Discuss the impact of the over on the innings.

OUTPUT STYLE:

- Headline: Short and engaging.
- Summary: Two or three concise sentences.
- Key moments: Maximum three factual observations.
- Match impact: Tactical explanation.
- What team needs: Practical next-step strategy.

Return only structured output matching the requested schema.
            `,

      prompt: `
Analyze the following cricket match.

MATCH INFORMATION
-----------------
Match: ${match.name}
Match Type: ${match.matchType || "Unknown"}
Venue: ${match.venue || "Unknown"}
Match Status: ${match.status}

TEAMS
-----
Batting Team: ${battingTeam}
Bowling Team: ${bowlingTeam}

ANALYSIS TYPE
-------------
${isInitialAnalysis ? "INITIAL LIVE MATCH ANALYSIS" : "COMPLETED OVER ANALYSIS"}

OVER INFORMATION
----------------
Over Number: ${completedOver}

${
  isInitialAnalysis
    ? `
CURRENT INNINGS SCORE
---------------------
Total Runs: ${currentScore.runs}
Wickets Lost: ${currentScore.wickets}
Overs Completed: ${currentScore.overs}

IMPORTANT:
These are cumulative innings totals, not the runs and wickets
scored in the latest over.

Generate an initial assessment of the current innings situation.
`
    : `
PREVIOUS SCORE
--------------
Runs: ${previousScore.runs}
Wickets: ${previousScore.wickets}
Overs: ${previousScore.overs}

CURRENT SCORE
-------------
Runs: ${currentScore.runs}
Wickets: ${currentScore.wickets}
Overs: ${currentScore.overs}

COMPLETED OVER PERFORMANCE
--------------------------
Runs Scored: ${runs}
Wickets Lost: ${wickets}

Analyze the completed over using these score differences.
`
}

REQUIRED OUTPUT
---------------
1. overNumber: ${completedOver}
2. runs: ${runs}
3. wickets: ${wickets}
4. headline
5. summary
6. keyMoments
7. matchImpact
8. whatTeamNeeds

For initial analysis, runs and wickets must represent cumulative
innings totals. For completed-over analysis, they must represent
the individual over totals.
            `,
    });

    if (!output) {
      throw new Error("Gemini did not return a valid analysis.");
    }

    return NextResponse.json({
      success: true,
      data: {
        ...output,
        overNumber: completedOver,
        runs,
        wickets,
      },
      analysisType: isInitialAnalysis ? "initial" : "completed-over",
    });
  } catch (error) {
    console.error("AI over analysis error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid match analysis request.",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to generate AI analysis.",
      },
      { status: 500 },
    );
  }
}
