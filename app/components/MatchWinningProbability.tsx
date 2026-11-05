"use client";

import {
    FiBarChart2,
} from "react-icons/fi";

type MatchWinningProbabilityProps = {
    indiaProbability?: number;
    australiaProbability?: number;
    history?: number[];
};

export default function MatchWinningProbability({
    indiaProbability = 39,
    australiaProbability = 61,
    history = [36, 48, 43, 51, 45, 39, 44, 39],
}: MatchWinningProbabilityProps) {
    const radius = 51;
    const circumference = 2 * Math.PI * radius;

    const indiaOffset =
        circumference * (1 - indiaProbability / 100);

    const australiaOffset =
        circumference * (1 - australiaProbability / 100);

    // Generate a smooth SVG curve from the probability history.
    const points = history.map((value, index) => ({
        x: 4 + (index / Math.max(history.length - 1, 1)) * 292,
        y: 145 - (value / 100) * 145,
    }));

    const linePath = points.reduce((path, point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;

        const previous = points[index - 1];
        const midX = (previous.x + point.x) / 2;

        return `${path} C ${midX} ${previous.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
    }, "");

    const areaPath = `${linePath} L 296 145 L 4 145 Z`;

    return (
        <section className="w-full overflow-hidden rounded-2xl border border-[#e1e5f5] bg-white p-5 shadow-[0_2px_12px_rgba(35,45,100,0.035)]">

            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
                <FiBarChart2
                    size={23}
                    className="text-[#853df5]"
                    strokeWidth={2.5}
                />

                <h2 className="text-[19px] font-extrabold tracking-tight text-[#10143b]">
                    Match Winning Probability
                </h2>
            </div>

            {/* Donut Chart and Legend */}
            <div className="flex items-center justify-center gap-5 py-1">

                {/* Donut */}
                <div className="relative h-[145px] w-[145px] shrink-0">
                    <svg
                        viewBox="0 0 120 120"
                        className="h-full w-full -rotate-90"
                    >
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="#ed3548"
                            strokeWidth="12"
                        />

                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="#6725df"
                            strokeWidth="12"
                            strokeDasharray={`${(indiaProbability / 100) * circumference} ${circumference}`}
                            strokeLinecap="butt"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[14px] font-medium text-[#10143b]">
                            India
                        </span>

                        <span className="text-[24px] font-extrabold leading-tight text-[#10143b]">
                            {indiaProbability}%
                        </span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2.5">
                        <span className="h-3 w-3 rounded-full bg-[#6725df]" />

                        <span className="text-[14px] font-medium text-[#10143b]">
                            India
                        </span>

                        <span className="ml-3 text-[15px] font-extrabold text-[#10143b]">
                            {indiaProbability}%
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="h-3 w-3 rounded-full bg-[#ed3548]" />

                        <span className="text-[14px] font-medium text-[#10143b]">
                            Australia
                        </span>

                        <span className="ml-3 text-[15px] font-extrabold text-[#10143b]">
                            {australiaProbability}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Probability History Chart */}
            <div className="mt-7">
                <div className="relative pl-9">
                    <div className="absolute inset-y-0 left-0 flex flex-col justify-between pb-7 text-[12px] font-medium text-[#343957]">
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
                                        stopColor="#8c5cf4"
                                        stopOpacity="0.25"
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="#8c5cf4"
                                        stopOpacity="0.03"
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

                            <path
                                d={areaPath}
                                fill="url(#probabilityGradient)"
                            />

                            <path
                                d={linePath}
                                fill="none"
                                stroke="#6725df"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            {points.length > 0 && (
                                <circle
                                    cx={points[points.length - 1].x}
                                    cy={points[points.length - 1].y}
                                    r="6"
                                    fill="#6725df"
                                    stroke="white"
                                    strokeWidth="2"
                                />
                            )}
                        </svg>

                        {points.length > 0 && (
                            <div
                                className="absolute -translate-x-1/2 -translate-y-full rounded-md bg-[#6725df] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-md"
                                style={{
                                    left: `${(points[points.length - 1].x / 300) * 100}%`,
                                    top: `${(points[points.length - 1].y / 165) * 100}%`,
                                }}
                            >
                                IND: {indiaProbability}%
                            </div>
                        )}
                    </div>

                    {/* X Axis */}
                    <div className="mt-2 flex justify-between text-[12px] font-medium text-[#343957]">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                    </div>
                </div>
            </div>
        </section>
    );
}