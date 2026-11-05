
"use client";

import { FiBarChart2 } from "react-icons/fi";
import type { CricketMatch } from "@/types/cricket";

type MatchWinningProbabilityProps = {
    match?: CricketMatch;
    teamOneProbability?: number;
    teamTwoProbability?: number;
    history?: number[];
};

export default function MatchWinningProbability({
    match,
    teamOneProbability = 39,
    teamTwoProbability = 61,
    history = [36, 48, 43, 51, 45, 39, 44, 39],
}: MatchWinningProbabilityProps) {
    const teamOne = match?.teams?.[0]?.slice(0, 2).toUpperCase() || "T1";
    const teamTwo = match?.teams?.[1]?.slice(0, 2).toUpperCase() || "T2";

    const firstProbability = Math.max(
        0,
        Math.min(100, teamOneProbability)
    );

    const secondProbability = Math.max(
        0,
        Math.min(100, teamTwoProbability)
    );

    const radius = 51;
    const circumference = 2 * Math.PI * radius;

    const firstOffset =
        circumference * (1 - firstProbability / 100);

    const points = history.map((value, index) => ({
        x: 4 + (index / Math.max(history.length - 1, 1)) * 292,
        y: 145 - (Math.max(0, Math.min(100, value)) / 100) * 145,
    }));

    const linePath = points.reduce((path, point, index) => {
        if (index === 0) {
            return `M ${point.x} ${point.y}`;
        }

        const previous = points[index - 1];
        const midX = (previous.x + point.x) / 2;

        return `${path} C ${midX} ${previous.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
    }, "");

    const areaPath = points.length
        ? `${linePath} L 296 145 L 4 145 Z`
        : "";

    return (
        <section className="w-full overflow-hidden rounded-2xl border border-[#e1e5f5] bg-white p-5 shadow-[0_2px_12px_rgba(35,45,100,0.035)]">

            {/* Header */}
            <div className="mb-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                    <FiBarChart2
                        size={23}
                        className="text-[#2563eb]"
                        strokeWidth={2.5}
                    />

                    <h2 className="text-[18px] font-extrabold tracking-tight text-[#10143b]">
                        Match Winning Probability
                    </h2>
                </div>

                <span className="shrink-0 rounded-full bg-[#e8f9ef] px-2.5 py-1 text-[10px] font-bold text-[#159653]">
                    LIVE
                </span>
            </div>

            {/* Donut Chart and Legend */}
            <div className="flex items-center justify-center gap-5 py-1">

                {/* Donut */}
                <div className="relative h-[145px] w-[145px] shrink-0">
                    <svg
                        viewBox="0 0 120 120"
                        className="h-full w-full -rotate-90"
                    >
                        {/* Second team */}
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="#ed3548"
                            strokeWidth="12"
                        />

                        {/* First team */}
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="12"
                            strokeDasharray={`${(firstProbability / 100) * circumference} ${circumference}`}
                            strokeDashoffset="0"
                            strokeLinecap="butt"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="max-w-[100px] truncate text-[13px] font-semibold text-[#10143b]">
                            {teamOne}
                        </span>

                        <span className="text-[25px] font-extrabold leading-tight text-[#10143b]">
                            {firstProbability}%
                        </span>

                        <span className="text-[10px] font-medium text-[#7b829b]">
                            Win chance
                        </span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex min-w-0 flex-col gap-5">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <span className="h-3 w-3 shrink-0 rounded-full bg-[#2563eb]" />

                        <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium text-[#10143b]">
                                {teamOne}
                            </p>

                            <p className="text-[17px] font-extrabold text-[#2563eb]">
                                {firstProbability}%
                            </p>
                        </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-2.5">
                        <span className="h-3 w-3 shrink-0 rounded-full bg-[#ed3548]" />

                        <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium text-[#10143b]">
                                {teamTwo}
                            </p>

                            <p className="text-[17px] font-extrabold text-[#ed3548]">
                                {secondProbability}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Probability History */}
            <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[14px] font-bold text-[#10143b]">
                        Win Probability Trend
                    </h3>

                    <span className="text-[11px] font-medium text-[#7b829b]">
                        {teamOne}
                    </span>
                </div>

                <div className="relative pl-9">
                    {/* Y Axis */}
                    <div className="absolute inset-y-0 left-0 flex flex-col justify-between pb-7 text-[11px] font-medium text-[#68708b]">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                    </div>

                    <div className="relative">
                        <svg
                            viewBox="0 0 300 165"
                            className="w-full overflow-visible"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient
                                    id="probabilityGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#2563eb"
                                        stopOpacity="0.22"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#2563eb"
                                        stopOpacity="0.02"
                                    />
                                </linearGradient>
                            </defs>

                            {[0, 36.25, 72.5, 108.75, 145].map((y) => (
                                <line
                                    key={y}
                                    x1="0"
                                    y1={y}
                                    x2="300"
                                    y2={y}
                                    stroke="#e1e5f0"
                                    strokeWidth="1"
                                />
                            ))}

                            {points.length > 0 && (
                                <>
                                    <path
                                        d={areaPath}
                                        fill="url(#probabilityGradient)"
                                    />

                                    <path
                                        d={linePath}
                                        fill="none"
                                        stroke="#2563eb"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />

                                    <circle
                                        cx={points[points.length - 1].x}
                                        cy={points[points.length - 1].y}
                                        r="5"
                                        fill="#2563eb"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                </>
                            )}
                        </svg>

                        {/* Current Probability */}
                        {points.length > 0 && (
                            <div
                                className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-[#2563eb] px-2 py-1 text-[10px] font-bold text-white shadow-md"
                                style={{
                                    left: `${(points[points.length - 1].x / 300) * 100}%`,
                                    top: `${(points[points.length - 1].y / 165) * 100}%`,
                                }}
                            >
                                {firstProbability}%
                            </div>
                        )}
                    </div>

                    {/* X Axis */}
                    <div className="mt-2 flex justify-between text-[11px] font-medium text-[#68708b]">
                        <span>Start</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-center text-[10px] text-[#9299ad]">
                Probability values are currently sample data.
            </p>
        </section>
    );
}
