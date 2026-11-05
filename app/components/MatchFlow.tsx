import {
    FiTrendingUp,
    FiActivity,
    FiTarget,
} from "react-icons/fi";

type OverData = {
    over: number;
    runs: number;
    wickets?: number;
};

type MatchFlowProps = {
    overs?: OverData[];
    currentOver?: number;
    totalOvers?: number;
    battingTeam?: string;
    score?: string;
    target?: number;
};

const defaultOvers: OverData[] = [
    { over: 1, runs: 8 },
    { over: 2, runs: 12 },
    { over: 3, runs: 5 },
    { over: 4, runs: 10 },
    { over: 5, runs: 7, wickets: 1 },
    { over: 6, runs: 14 },
    { over: 7, runs: 9 },
    { over: 8, runs: 6 },
    { over: 9, runs: 11 },
    { over: 10, runs: 8 },
    { over: 11, runs: 13 },
    { over: 12, runs: 4, wickets: 1 },
    { over: 13, runs: 10 },
    { over: 14, runs: 8 },
    { over: 15, runs: 5, wickets: 2 },
];

export default function MatchFlow({
    overs = defaultOvers,
    currentOver = 15,
    totalOvers = 20,
    battingTeam = "India",
    score = "145/4",
    target = 190,
}: MatchFlowProps) {
    const maxRuns = Math.max(16, ...overs.map((over) => over.runs));

    const totalRuns = overs.reduce((sum, over) => sum + over.runs, 0);

    const runRate =
        currentOver > 0
            ? (totalRuns / currentOver).toFixed(2)
            : "0.00";

    return (
        <section className="w-full min-w-0 overflow-hidden rounded-xl border border-[#e1e5f5] bg-white shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:rounded-2xl">

            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-[#edf0f7] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex items-center gap-2.5">
                    <FiActivity
                        size={22}
                        className="shrink-0 text-[#853df5]"
                    />

                    <div>
                        <h2 className="text-[16px] font-extrabold text-[#10143b] sm:text-[19px]">
                            Match Flow
                        </h2>
                        <p className="text-[11px] font-medium text-[#858ba3] sm:text-xs">
                            Over-by-over scoring progression
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full bg-[#eee8ff] px-3 py-1.5 text-[11px] font-bold text-[#5420ed] sm:self-auto sm:text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#853df5]" />
                    {battingTeam} batting
                </div>
            </div>

            <div className="space-y-5 p-3 sm:p-5">

                {/* Match Summary */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="rounded-xl border border-[#edf0f7] bg-[#fafaff] p-3">
                        <p className="text-[10px] font-semibold text-[#858ba3] sm:text-xs">
                            Current score
                        </p>
                        <p className="mt-1 text-[18px] font-extrabold text-[#10143b] sm:text-[23px]">
                            {score}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#edf0f7] bg-[#fafaff] p-3">
                        <p className="text-[10px] font-semibold text-[#858ba3] sm:text-xs">
                            Run rate
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[18px] font-extrabold text-[#5420ed] sm:text-[23px]">
                            {runRate}
                            <FiTrendingUp size={15} />
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#edf0f7] bg-[#fafaff] p-3">
                        <p className="text-[10px] font-semibold text-[#858ba3] sm:text-xs">
                            Target
                        </p>
                        <p className="mt-1 text-[18px] font-extrabold text-[#10143b] sm:text-[23px]">
                            {target}
                        </p>
                    </div>
                </div>

                {/* Chart */}
                <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-sm">
                            Runs scored per over
                        </h3>

                        <div className="flex items-center gap-3 text-[10px] font-medium text-[#737b96] sm:text-xs">
                            <span className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-sm bg-[#8b5cf6]" />
                                Runs
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-[#ed263b]" />
                                Wicket
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-2">
                        <div className="flex min-w-[520px] items-end gap-2 sm:gap-3">
                            {overs.map((item) => {
                                const isCurrent = item.over === currentOver;
                                const height = Math.max(
                                    8,
                                    (item.runs / maxRuns) * 125
                                );

                                return (
                                    <div
                                        key={item.over}
                                        className="flex min-w-0 flex-1 flex-col items-center"
                                    >
                                        <div className="mb-2 flex h-5 items-center justify-center gap-1">
                                            {item.wickets ? (
                                                <>
                                                    <span className="text-[11px] font-bold text-[#ed263b]">
                                                        {item.runs}
                                                    </span>
                                                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ed263b] px-1 text-[9px] font-bold text-white">
                                                        {item.wickets}W
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-[11px] font-bold text-[#59617d]">
                                                    {item.runs}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex h-[130px] w-full items-end justify-center">
                                            <div
                                                className={`relative w-full max-w-[34px] rounded-t-md transition-all ${isCurrent
                                                        ? "bg-[#5420ed]"
                                                        : "bg-[#b9a4ff]"
                                                    }`}
                                                style={{ height }}
                                            >
                                                {item.wickets ? (
                                                    <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-[#ed263b]" />
                                                ) : null}
                                            </div>
                                        </div>

                                        <span
                                            className={`mt-2 text-[10px] font-semibold ${isCurrent
                                                    ? "text-[#5420ed]"
                                                    : "text-[#858ba3]"
                                                }`}
                                        >
                                            {item.over}
                                        </span>
                                    </div>
                                );
                            })}

                            {Array.from({
                                length: Math.max(0, totalOvers - overs.length),
                            }).map((_, index) => (
                                <div
                                    key={`empty-${index}`}
                                    className="flex min-w-0 flex-1 flex-col items-center"
                                >
                                    <div className="mb-2 h-5" />
                                    <div className="flex h-[130px] w-full items-end justify-center">
                                        <div className="h-1 w-full max-w-[34px] rounded-t-md bg-[#f0eff8]" />
                                    </div>
                                    <span className="mt-2 text-[10px] font-medium text-[#b0b4c5]">
                                        {overs.length + index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="mt-1 text-center text-[10px] text-[#969bb0]">
                        Overs
                    </p>
                </div>

                {/* Wicket Timeline */}
                <div className="border-t border-[#edf0f7] pt-4">
                    <div className="mb-3 flex items-center gap-2">
                        <FiTarget
                            size={17}
                            className="text-[#ed263b]"
                        />
                        <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-sm">
                            Wicket timeline
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {overs
                            .filter((over) => over.wickets)
                            .map((over) => (
                                <div
                                    key={over.over}
                                    className="flex items-center gap-2 rounded-lg border border-[#ffe1e4] bg-[#fff6f6] px-3 py-2"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ffe6e8] text-[#ed263b]">
                                        <FiTarget size={14} />
                                    </span>

                                    <div>
                                        <p className="text-[11px] font-bold text-[#10143b]">
                                            Over {over.over}
                                        </p>
                                        <p className="text-[10px] font-medium text-[#ed263b]">
                                            {over.wickets} wicket(s)
                                        </p>
                                    </div>
                                </div>
                            ))}

                        {!overs.some((over) => over.wickets) && (
                            <p className="text-xs text-[#858ba3]">
                                No wickets have fallen yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}