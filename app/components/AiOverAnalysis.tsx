import {
    FiZap,
    FiTrendingUp,
    FiTarget,
    FiBarChart2,
    FiFlag,
} from "react-icons/fi";

type AiOverAnalysisProps = {
    overNumber?: number;
    runs?: number;
    wickets?: number;
    headline?: string;
    summary?: string;
    keyMoments?: string[];
    matchImpact?: string;
    whatIndiaNeeds?: string;
};

export default function AiOverAnalysis({
    overNumber = 15,
    runs = 5,
    wickets = 2,
    headline = "Australia regains control!",
    summary = "India scored just 5 runs and lost two wickets in the 15th over. The dismissal of the set batter has increased pressure on the incoming batter.",
    keyMoments = [
        "Wicket on the 2nd ball",
        "Another wicket on the 5th ball",
        "Only 5 runs scored",
    ],
    matchImpact = "India's required run rate has increased, and Australia has an opportunity to put further pressure on the new batter.",
    whatIndiaNeeds = "Build a partnership while keeping the scoring rate above 10 runs per over.",
}: AiOverAnalysisProps) {
    const renderSummary = () => {
        const parts = summary.split("5 runs");

        if (parts.length === 1) return summary;

        return (
            <>
                {parts.map((part, index) => (
                    <span key={index}>
                        {part}
                        {index < parts.length - 1 && (
                            <span className="font-bold text-[#e51f37]">
                                5 runs
                            </span>
                        )}
                    </span>
                ))}
            </>
        );
    };

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
                </div>

                <div className="flex w-fit max-w-full items-center overflow-hidden rounded-full border border-[#dedcf5] text-[11px] font-semibold sm:text-[13px]">
                    <span className="whitespace-nowrap bg-[#eee8ff] px-3 py-1.5 text-[#5420ed] sm:px-4 sm:py-2">
                        Over {overNumber}
                    </span>

                    <span className="whitespace-nowrap px-3 py-1.5 text-[#171a35] sm:px-4 sm:py-2">
                        {runs} runs, {wickets} wickets
                    </span>
                </div>
            </div>

            <div className="p-3 sm:p-4 md:p-[17px]">

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

                        <ul className="space-y-2 pl-5 text-[13px] font-medium leading-[21px] text-[#171a35] sm:space-y-2.5 sm:text-[14px] sm:leading-5">
                            {keyMoments.map((moment, index) => (
                                <li key={index} className="list-disc">
                                    {moment}
                                </li>
                            ))}
                        </ul>
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
                            {matchImpact}
                        </p>
                    </div>

                    {/* What India Needs */}
                    <div className="min-w-0 rounded-xl border border-[#e6f2e9] bg-gradient-to-br from-[#f4faf5] to-[#f0f8f1] p-3 sm:col-span-2 sm:p-4 xl:col-span-1">
                        <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                            <FiFlag
                                size={18}
                                className="shrink-0 text-[#159947] sm:h-[19px] sm:w-[19px]"
                                strokeWidth={2.5}
                            />

                            <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-[14px]">
                                What India needs now
                            </h3>
                        </div>

                        <p className="text-[13px] font-medium leading-[21px] text-[#171a35] sm:text-[14px] sm:leading-[22px]">
                            {whatIndiaNeeds}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}