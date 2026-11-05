
import {
    FiZap,
    FiTrendingUp,
    FiTarget,
    FiBarChart2,
    FiFlag,
    FiLoader,
} from "react-icons/fi";

type AiOverAnalysisProps = {
    overNumber?: number;
    runs?: number;
    wickets?: number;
    headline?: string;
    summary?: string;
    keyMoments?: string[];
    matchImpact?: string;
    whatTeamNeeds?: string;
    isGenerating?: boolean;
};

export default function AiOverAnalysis({
    overNumber,
    runs,
    wickets,
    headline,
    summary,
    keyMoments = [],
    matchImpact,
    whatTeamNeeds,
    isGenerating = false,
}: AiOverAnalysisProps) {
    const renderSummary = () => {
        if (!summary) return null;

        const highlightedRuns = runs !== undefined
            ? new RegExp(`\\b${runs} runs?\\b`, "gi")
            : null;

        if (!highlightedRuns) return summary;

        const parts = summary.split(highlightedRuns);

        if (parts.length === 1) return summary;

        const matches = summary.match(highlightedRuns) || [];

        return (
            <>
                {parts.map((part, index) => (
                    <span key={index}>
                        {part}
                        {index < matches.length && (
                            <span className="font-bold text-[#e51f37]">
                                {matches[index]}
                            </span>
                        )}
                    </span>
                ))}
            </>
        );
    };

    const hasAnalysis = Boolean(headline && summary);

    return (
        <section className="w-full min-w-0 overflow-hidden rounded-xl border border-[#e1e5f5] bg-white shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:rounded-2xl">

            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-[#edf0f7] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <FiZap
                        size={22}
                        className="shrink-0 text-[#853df5] sm:h-[25px] sm:w-[25px]"
                        strokeWidth={2.5}
                    />

                    <h2 className="text-[16px] font-extrabold tracking-tight text-[#10143b] sm:text-[19px]">
                        AI Over Analysis
                    </h2>

                    {isGenerating && (
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#853df5]">
                            <FiLoader className="animate-spin" size={13} />
                            Updating
                        </span>
                    )}
                </div>

                {hasAnalysis && (
                    <div className="flex w-fit max-w-full items-center overflow-hidden rounded-full border border-[#dedcf5] text-[11px] font-semibold sm:text-[13px]">
                        <span className="whitespace-nowrap bg-[#eee8ff] px-3 py-1.5 text-[#5420ed] sm:px-4 sm:py-2">
                            Over {overNumber}
                        </span>

                        <span className="whitespace-nowrap px-3 py-1.5 text-[#171a35] sm:px-4 sm:py-2">
                            {runs} runs, {wickets} wickets
                        </span>
                    </div>
                )}
            </div>

            <div className="p-3 sm:p-4 md:p-[17px]">

                {!hasAnalysis ? (
                    /* Empty / Loading State */
                    <div className="flex min-h-[180px] flex-col items-center justify-center px-4 py-8 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2edff] text-[#853df5]">
                            {isGenerating ? (
                                <FiLoader
                                    size={24}
                                    className="animate-spin"
                                />
                            ) : (
                                <FiZap size={24} />
                            )}
                        </div>

                        <h3 className="text-[15px] font-extrabold text-[#10143b]">
                            {isGenerating
                                ? "Analyzing the latest over..."
                                : "Waiting for over analysis"}
                        </h3>

                        <p className="mt-1 max-w-sm text-[13px] leading-5 text-[#59617d]">
                            {isGenerating
                                ? "Gemini AI is analyzing the match situation and generating cricket insights."
                                : "AI insights will automatically appear here after a completed over."}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Main AI Insight */}
                        <div className="flex items-start gap-3 px-0 py-1 sm:gap-5 sm:px-2">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f1] text-[#ed263b] sm:h-[65px] sm:w-[65px] sm:rounded-2xl">
                                <FiTrendingUp
                                    size={24}
                                    className="sm:h-[34px] sm:w-[34px]"
                                    strokeWidth={2.3}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="mb-1 text-[18px] font-extrabold leading-tight tracking-[-0.4px] text-[#e51f37] sm:text-[25px] sm:tracking-[-0.7px]">
                                    {headline}
                                </h3>

                                <p className="text-[13px] font-medium leading-[21px] text-[#10143b] sm:text-[16px] sm:leading-[27px]">
                                    {renderSummary()}
                                </p>
                            </div>
                        </div>

                        {/* Three Insight Cards */}
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 xl:grid-cols-3">

                            {/* Key Moments */}
                            <div className="min-w-0 rounded-xl border border-[#edf0f7] bg-gradient-to-br from-white to-[#fafaff] p-3 shadow-[0_2px_8px_rgba(30,40,90,0.035)] sm:p-4">
                                <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                                    <FiTarget
                                        size={18}
                                        className="shrink-0 text-[#ed263b] sm:h-[19px] sm:w-[19px]"
                                        strokeWidth={2.5}
                                    />

                                    <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-[14px]">
                                        Key moments
                                    </h3>
                                </div>

                                {keyMoments.length > 0 ? (
                                    <ul className="space-y-2 pl-5 text-[13px] font-medium leading-[21px] text-[#171a35] sm:space-y-2.5 sm:text-[14px] sm:leading-5">
                                        {keyMoments.map((moment, index) => (
                                            <li key={index} className="list-disc">
                                                {moment}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-[13px] leading-5 text-[#59617d]">
                                        No specific key moments available for this over.
                                    </p>
                                )}
                            </div>

                            {/* Impact on Match */}
                            <div className="min-w-0 rounded-xl border border-[#eee9ff] bg-gradient-to-br from-[#f8f5ff] to-[#f5f1ff] p-3 sm:p-4">
                                <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                                    <FiBarChart2
                                        size={18}
                                        className="shrink-0 text-[#853df5] sm:h-[19px] sm:w-[19px]"
                                        strokeWidth={2.5}
                                    />

                                    <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-[14px]">
                                        Impact on the match
                                    </h3>
                                </div>

                                <p className="text-[13px] font-medium leading-[21px] text-[#171a35] sm:text-[14px] sm:leading-[22px]">
                                    {matchImpact || "Match impact information unavailable."}
                                </p>
                            </div>

                            {/* What the Batting Team Needs */}
                            <div className="min-w-0 rounded-xl border border-[#e6f2e9] bg-gradient-to-br from-[#f4faf5] to-[#f0f8f1] p-3 sm:col-span-2 sm:p-4 xl:col-span-1">
                                <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                                    <FiFlag
                                        size={18}
                                        className="shrink-0 text-[#159947] sm:h-[19px] sm:w-[19px]"
                                        strokeWidth={2.5}
                                    />

                                    <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-[14px]">
                                        What the batting team needs now
                                    </h3>
                                </div>

                                <p className="text-[13px] font-medium leading-[21px] text-[#171a35] sm:text-[14px] sm:leading-[22px]">
                                    {whatTeamNeeds || "Next-phase strategy unavailable."}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
