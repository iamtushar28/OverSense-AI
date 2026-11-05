"use client";

import { FiClock } from "react-icons/fi";
import type { MatchInsightsData } from "@/types/match-insights";

type Props = {
    insights: MatchInsightsData | null;
};

export default function TurningPointsSection({ insights }: Props) {
    const turningPoints = insights?.turningPoints ?? [];

    return (
        <section className="rounded-xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:p-5">
            <div className="mb-5">
                <h2 className="text-[16px] font-extrabold text-[#10143b] sm:text-[18px]">
                    Match Turning Points
                </h2>

                <p className="mt-1 text-[11px] text-[#858ba3]">
                    Significant events that influenced the game
                </p>
            </div>

            {turningPoints.length > 0 ? (
                <div className="space-y-5">
                    {turningPoints.map((point, index) => (
                        <div
                            key={`${point.over}-${index}`}
                            className="relative flex gap-3 sm:gap-4"
                        >
                            <div className="flex flex-col items-center">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf1ff] text-[11px] font-extrabold text-[#2563eb]">
                                    {index + 1}
                                </div>

                                {index !== turningPoints.length - 1 && (
                                    <div className="mt-2 h-full w-px bg-[#e7e2f5]" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1 pb-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#2563eb]">
                                        {point.over}
                                    </span>

                                    <span className="text-[11px] font-bold text-[#59617d]">
                                        {point.score}
                                    </span>
                                </div>

                                <h3 className="mt-1 text-[13px] font-extrabold text-[#10143b]">
                                    {point.title}
                                </h3>

                                <p className="mt-1 text-[12px] leading-5 text-[#737b96]">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed border-[#dce5f5] bg-[#f9fbff] px-4 py-6 text-center">
                    <FiClock
                        size={23}
                        className="mx-auto text-[#9aabd0]"
                    />

                    <p className="mt-3 text-[13px] font-bold text-[#59617d]">
                        Turning points not available yet
                    </p>

                    <p className="mx-auto mt-1 max-w-md text-[11px] leading-5 text-[#858ba3]">
                        {insights?.turningPointsNote ??
                            "Ball-by-ball commentary or over-by-over history is required to identify actual match turning points."}
                    </p>
                </div>
            )}
        </section>
    );
}