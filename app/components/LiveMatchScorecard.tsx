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
    battingTeam = { name: "IND", flag: "in", status: "Batting" },
    bowlingTeam = { name: "AUS", flag: "au" },
    score = "145/4",
    overs = "15.0",
    isLive = true,
    target = 190,
    runsNeeded = 45,
    ballsRemaining = 30,
    requiredRunRate = "10.38",
}: LiveMatchScorecardProps) {
    return (
        <section className="relative w-full min-w-0 rounded-xl border border-[#e1e5f5] bg-white px-3 pb-3 pt-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:rounded-2xl sm:px-5 sm:pb-4">

            {/* Live Indicator */}
            {isLive && (
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                    <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#ed263b] px-3 py-1 text-[11px] font-bold text-white sm:text-xs">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        LIVE
                    </span>
                </div>
            )}

            {/* Score Row */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 pt-2 sm:gap-3">

                {/* Batting Team */}
                <div className="flex min-w-0 items-center justify-start gap-1.5 sm:gap-3">
                    <img
                        src={`https://flagcdn.com/w80/${battingTeam.flag}.png`}
                        alt={`${battingTeam.name} flag`}
                        className="h-6 w-8 shrink-0 rounded-sm object-cover sm:h-8 sm:w-10"
                    />

                    <div className="flex min-w-0 flex-col items-start gap-1">
                        <span className="text-[15px] font-extrabold leading-none text-[#10143b] sm:text-[22px]">
                            {battingTeam.name}
                        </span>

                        {battingTeam.status && (
                            <span className="whitespace-nowrap rounded-full bg-[#eee8ff] px-2 py-0.5 text-[9px] font-semibold leading-tight text-[#5420ed] sm:px-3 sm:py-1 sm:text-[12px]">
                                {battingTeam.status}
                            </span>
                        )}
                    </div>
                </div>

                {/* Score */}
                <div className="flex min-w-0 flex-col items-center justify-center whitespace-nowrap px-1">
                    <span className="text-[23px] font-extrabold leading-none tracking-tight text-[#10143b] sm:text-[35px]">
                        {score}
                    </span>

                    <span className="mt-1 text-[11px] font-medium text-[#59617d] sm:text-[15px]">
                        ({overs} overs)
                    </span>
                </div>

                {/* Bowling Team */}
                <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-3">
                    <span className="truncate text-[15px] font-extrabold leading-none text-[#10143b] sm:text-[22px]">
                        {bowlingTeam.name}
                    </span>
                    <img
                        src={`https://flagcdn.com/w80/${bowlingTeam.flag}.png`}
                        alt={`${bowlingTeam.name} flag`}
                        className="h-6 w-8 shrink-0 rounded-sm object-cover sm:h-8 sm:w-10"
                    />
                </div>
            </div>

            {/* Match Situation */}
            <div className="mt-3 grid grid-cols-2 gap-y-2 border-t border-[#edf0f7] pt-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2">
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