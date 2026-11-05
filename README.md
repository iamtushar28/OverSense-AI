# OverSense AI

**AI-powered cricket intelligence for live-match fans.**

OverSense AI is an AI-powered cricket companion that helps fans
understand live cricket matches beyond the scorecard. It combines live
match data with AI-generated analysis and hypothetical scenario
exploration to explain what is happening, why it matters, and what could
happen next.

## Live Demo

https://oversenseai.vercel.app/

## Repository

https://github.com/iamtushar28/OverSense-AI

## The Problem

A live score tells fans what happened, but it does not always explain
the match situation or the impact of a key moment. Fans often need to
interpret scorecards, required run rates, batting and bowling
performances, and commentary themselves.

OverSense AI brings match context and AI-assisted explanations together
in one place.

## Features

### 1. Live Match Dashboard

-   Displays live cricket scores and match information using CricAPI.
-   Shows teams, batting and bowling details, and the current match
    situation.
-   Supports manual match-data refresh.

### 2. AI Over-by-Over Analysis

-   Generates AI-powered summaries of match performance.
-   Highlights key moments and their potential impact.
-   Explains what a team may need to do in the upcoming phase of the
    match.

### 3. What-If Simulator

-   Lets users ask hypothetical questions about a live match.
-   Example questions:
    -   What if the batting team scores 15 runs in the next over?
    -   What if two wickets fall in the next over?
-   Uses the available match context to explain possible implications.

### 4. AI Match Insights

-   Provides an AI-generated overview of the match.
-   Highlights notable batting, bowling, and match-situation
    observations.
-   Identifies possible turning points when sufficient match data is
    available.

### 5. Match Winning Probability

-   Includes a visual representation concept for team winning
    probabilities.
-   Designed for future integration with a dedicated predictive model.

## Technology Stack

  Technology                Purpose
  ------------------------- ---------------------------------------------
  Next.js 16                Frontend application and backend API routes
  React 19                  UI development
  TypeScript                Type safety
  Tailwind CSS              Styling
  Redux Toolkit             Application state management
  RTK Query                 Data fetching and caching
  CricAPI                   Live cricket match data
  Google Gemini 2.5 Flash   AI analysis and scenario simulation
  Vercel                    Live demo deployment

## How It Works

1.  The application retrieves live cricket match information from
    CricAPI.
2.  Match data is presented in the live dashboard.
3.  Relevant match context is used to generate AI-powered analysis with
    Google Gemini.
4.  Fans can explore over summaries, match insights, and hypothetical
    match scenarios.

> AI-generated analysis and hypothetical scenarios are informational
> explanations, not guaranteed predictions of match outcomes.

## Getting Started

### Prerequisites

-   Node.js (LTS recommended)
-   npm
-   A CricAPI API key
-   A Google Gemini API key

### Installation

``` bash
git clone https://github.com/iamtushar28/OverSense-AI.git
cd OverSense-AI
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add the environment
variables expected by the application:

``` env
CRIC_API_KEY=your_cricapi_key
GEMINI_API_KEY=your_gemini_api_key
```

If your local code uses different variable names, use the names
referenced in the project's API routes and configuration.

### Run Locally

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### Production Build

``` bash
npm run build
```

## Project Vision

The goal of OverSense AI is to build an intelligent cricket companion
that goes beyond displaying scores. It aims to help fans understand:

-   **What is happening** in the match?
-   **Why does it matter?**
-   **What could happen next?**

## Assignment

Built as an AI-powered sports fan artifact for the **Dream11 Forward
Deployed Engineer Intern** assignment.

-   **Live Demo:** https://oversenseai.vercel.app/
-   **GitHub:** https://github.com/iamtushar28/OverSense-AI

------------------------------------------------------------------------

**Built by Tushar Suryawanshi**
