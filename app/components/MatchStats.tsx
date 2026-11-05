import {
    FiBarChart2,
    FiActivity,
} from "react-icons/fi";

type Stat = {
    label: string;
    india: number;
    australia: number;
    suffix?: string;
};

type MatchStatsProps = {
    stats?: Stat[];
};

const defaultStats: Stat[] = [
    { label: "Run rate", india: 9.67, australia: 8.45 },
    { label: "Boundaries", india: 18, australia: 15 },
    { label: "Fours", india: 12, australia: 10 },
    { label: "Sixes", india: 6, australia: 5 },
    { label: "Dot balls", india: 24, australia: 29 },
    { label: "Wickets lost", india: 4, australia: 3 },
];

export default function MatchStats({
    stats = defaultStats,
}: MatchStatsProps) {
    return (
        <section className="w-full min-w-0 overflow-hidden rounded-xl border border-[#e1e5f5] bg-white shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:rounded-2xl">

            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-[#edf0f7] px-3 py-3 sm:px-5">
                <FiBarChart2
                    size={21}
                    className="text-[#853df5]"
                />

                <div>
                    <h2 className="text-[16px] font-extrabold text-[#10143b] sm:text-[19px]">
                        Match Statistics
                    </h2>
                    <p className="text-[11px] font-medium text-[#858ba3]">
                        India vs Australia
                    </p>
                </div>
            </div>

            <div className="p-3 sm:p-5">

                {/* Team Labels */}
                <div className="mb-4 flex items-center justify-between">
                    <span className="text-[12px] font-extrabold text-[#10143b]">
                        🇮🇳 India
                    </span>

                    <span className="text-[12px] font-extrabold text-[#10143b]">
                        Australia 🇦🇺
                    </span>
                </div>

                {/* Stats */}
                <div className="space-y-5">
                    {stats.map((stat) => {
                        const total = stat.india + stat.australia;
                        const indiaWidth = total
                            ? (stat.india / total) * 100
                            : 50;

                        const australiaWidth = total
                            ? (stat.australia / total) * 100
                            : 50;

                        return (
                            <div key={stat.label}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-[12px] font-bold text-[#10143b]">
                                        {stat.india}{stat.suffix ?? ""}
                                    </span>

                                    <span className="text-[11px] font-semibold text-[#858ba3]">
                                        {stat.label}
                                    </span>

                                    <span className="text-[12px] font-bold text-[#10143b]">
                                        {stat.australia}{stat.suffix ?? ""}
                                    </span>
                                </div>

                                <div className="flex h-2.5 gap-1 overflow-hidden rounded-full bg-[#f0eff8]">
                                    <div
                                        className="h-full rounded-full bg-[#853df5] transition-all"
                                        style={{ width: `${indiaWidth}%` }}
                                    />

                                    <div
                                        className="h-full rounded-full bg-[#f0a44b] transition-all"
                                        style={{ width: `${australiaWidth}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center gap-2 border-t border-[#edf0f7] pt-3">
                    <FiActivity
                        size={15}
                        className="text-[#853df5]"
                    />
                    <p className="text-[10px] font-medium text-[#858ba3]">
                        Comparison of key match metrics
                    </p>
                </div>
            </div>
        </section>
    );
}