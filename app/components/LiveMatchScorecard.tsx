type Team = {
    name: string;
    flag: string;
    status?: "Batting" | "Bowling";
};

type LiveMatchScorecardProps = {
    battingTeam?: Team;
    bowlingTeam?: Team;
    score?: string;
    overs?: string;
    isLive?: boolean;
    target?: number;
    runsNeeded?: number;
    ballsRemaining?: number;
    requiredRunRate?: string;
};

export default function LiveMatchScorecard({
    battingTeam = {
        name: "IND",
        flag: "🇮🇳",
        status: "Batting",
    },
    bowlingTeam = {
        name: "AUS",
        flag: "🇦🇺",
    },
    score = "145/4",
    overs = "15.0",
    isLive = true,
    target = 190,
    runsNeeded = 45,
    ballsRemaining = 30,
    requiredRunRate = "10.38",
}: LiveMatchScorecardProps) {
    return (
        <section className="relative w-full min-w-0 rounded-2xl border border-[#e1e5f5] bg-white px-3 pb-3 pt-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:px-5 sm:pb-4">

            {/* Live Badge */}
            {isLive && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <span className="flex items-center gap-1.5 rounded-full bg-[#ed263b] px-3 py-1 text-[11px] font-bold text-white sm:text-xs">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        LIVE
                    </span>
                </div>
            )}

            {/* Main Score Row */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 pt-2 sm:gap-3">

                {/* Batting Team */}
                <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[27px] sm:h-12 sm:w-12 sm:text-[35px]">
                        {battingTeam.flag}
                    </div>

                    <span className="text-[16px] font-extrabold text-[#10143b] sm:text-[22px]">
                        {battingTeam.name}
                    </span>

                    {battingTeam.status && (
                        <span className="rounded-full bg-[#eee8ff] px-2 py-1 text-[10px] font-semibold text-[#5420ed] sm:px-3 sm:text-[13px]">
                            {battingTeam.status}
                        </span>
                    )}
                </div>

                {/* Score */}
                <div className="flex items-baseline justify-center gap-1 whitespace-nowrap">
                    <span className="text-[25px] font-extrabold leading-none tracking-tight text-[#10143b] sm:text-[35px]">
                        {score}
                    </span>

                    <span className="text-[12px] font-medium text-[#59617d] sm:text-[18px]">
                        ({overs})
                    </span>
                </div>

                {/* Bowling Team */}
                <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-3">
                    <span className="text-[16px] font-extrabold text-[#10143b] sm:text-[22px]">
                        {bowlingTeam.name}
                    </span>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[27px] sm:h-12 sm:w-12 sm:text-[35px]">
                        {bowlingTeam.flag}
                    </div>
                </div>
            </div>

            {/* Match Situation */}
            <div className="mt-3 grid grid-cols-2 gap-y-2 border-t border-[#edf0f7] pt-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4 sm:gap-y-2">

                <div className="text-center text-[11px] font-medium text-[#171a35] sm:text-[14px]">
                    Target: <strong>{target}</strong>
                </div>

                <div className="text-center text-[11px] font-medium text-[#171a35] sm:text-[14px]">
                    Runs needed: <strong>{runsNeeded}</strong> off {ballsRemaining} balls
                </div>

                <div className="col-span-2 text-center text-[11px] font-medium text-[#171a35] sm:col-span-1 sm:text-[14px]">
                    Required RR: <strong>{requiredRunRate}</strong>
                </div>
            </div>
        </section>
    );
}