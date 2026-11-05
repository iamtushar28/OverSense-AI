import {
    FiUser,
    FiTrendingUp,
    FiTarget,
    FiActivity,
    FiAward,
} from "react-icons/fi";

type Player = {
    name: string;
    role: string;
    team: string;
    flag: string;
    isActive?: boolean;
    runs?: number;
    balls?: number;
    fours?: number;
    sixes?: number;
    strikeRate?: string;
    overs?: string;
    wickets?: number;
    runsConceded?: number;
    economy?: string;
    impact?: string;
};

type KeyPlayersProps = {
    battingPlayers?: Player[];
    bowlingPlayers?: Player[];
};

const defaultBatters: Player[] = [
    {
        name: "KL Rahul",
        role: "Batter",
        team: "IND",
        flag: "🇮🇳",
        isActive: true,
        runs: 42,
        balls: 28,
        fours: 4,
        sixes: 2,
        strikeRate: "150.00",
        impact: "Building the innings with a steady scoring rate.",
    },
    {
        name: "Hardik Pandya",
        role: "All-rounder",
        team: "IND",
        flag: "🇮🇳",
        isActive: true,
        runs: 18,
        balls: 9,
        fours: 1,
        sixes: 1,
        strikeRate: "200.00",
        impact: "Providing quick runs in the middle overs.",
    },
];

const defaultBowlers: Player[] = [
    {
        name: "Pat Cummins",
        role: "Fast Bowler",
        team: "AUS",
        flag: "🇦🇺",
        overs: "3.0",
        wickets: 2,
        runsConceded: 19,
        economy: "6.33",
        impact: "Picked up two crucial wickets to shift momentum.",
    },
    {
        name: "Mitchell Starc",
        role: "Fast Bowler",
        team: "AUS",
        flag: "🇦🇺",
        overs: "3.0",
        wickets: 1,
        runsConceded: 28,
        economy: "9.33",
        impact: "Providing pace and attacking options.",
    },
];

function BatterCard({ player }: { player: Player }) {
    return (
        <div className="min-w-0 rounded-xl border border-[#edf0f7] bg-white p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1edff] text-xl sm:h-12 sm:w-12">
                        {player.flag}
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <h3 className="truncate text-[14px] font-extrabold text-[#10143b] sm:text-[16px]">
                                {player.name}
                            </h3>

                            {player.isActive && (
                                <span className="rounded-full bg-[#eaf8ef] px-2 py-0.5 text-[9px] font-bold text-[#159947]">
                                    Batting
                                </span>
                            )}
                        </div>

                        <p className="mt-0.5 text-[11px] font-medium text-[#858ba3]">
                            {player.team} · {player.role}
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-[20px] font-extrabold leading-none text-[#10143b] sm:text-[24px]">
                        {player.runs}
                    </p>
                    <p className="mt-1 text-[10px] font-medium text-[#858ba3]">
                        Runs
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-4 divide-x divide-[#edf0f7] rounded-lg bg-[#fafaff] py-2.5">
                <div className="text-center">
                    <p className="text-[13px] font-extrabold text-[#10143b]">
                        {player.balls}
                    </p>
                    <p className="text-[9px] font-medium text-[#858ba3] sm:text-[10px]">
                        Balls
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-[13px] font-extrabold text-[#10143b]">
                        {player.fours}
                    </p>
                    <p className="text-[9px] font-medium text-[#858ba3] sm:text-[10px]">
                        4s
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-[13px] font-extrabold text-[#10143b]">
                        {player.sixes}
                    </p>
                    <p className="text-[9px] font-medium text-[#858ba3] sm:text-[10px]">
                        6s
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-[13px] font-extrabold text-[#5420ed]">
                        {player.strikeRate}
                    </p>
                    <p className="text-[9px] font-medium text-[#858ba3] sm:text-[10px]">
                        SR
                    </p>
                </div>
            </div>

            {player.impact && (
                <div className="mt-3 flex items-start gap-2">
                    <FiTrendingUp
                        size={14}
                        className="mt-0.5 shrink-0 text-[#853df5]"
                    />
                    <p className="text-[11px] font-medium leading-5 text-[#59617d]">
                        {player.impact}
                    </p>
                </div>
            )}
        </div>
    );
}

function BowlerCard({ player }: { player: Player }) {
    return (
        <div className="min-w-0 rounded-xl border border-[#edf0f7] bg-white p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eee8ff] text-xl sm:h-12 sm:w-12">
                        {player.flag}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-[14px] font-extrabold text-[#10143b] sm:text-[16px]">
                            {player.name}
                        </h3>

                        <p className="mt-0.5 text-[11px] font-medium text-[#858ba3]">
                            {player.team} · {player.role}
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-[20px] font-extrabold leading-none text-[#5420ed] sm:text-[24px]">
                        {player.wickets}/{player.runsConceded}
                    </p>
                    <p className="mt-1 text-[10px] font-medium text-[#858ba3]">
                        Wickets / Runs
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 divide-x divide-[#edf0f7] rounded-lg bg-[#fafaff] py-2.5">
                <div className="text-center">
                    <p className="text-[13px] font-extrabold text-[#10143b]">
                        {player.overs}
                    </p>
                    <p className="text-[9px] font-medium text-[#858ba3] sm:text-[10px]">
                        Overs
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-[13px] font-extrabold text-[#10143b]">
                        {player.runsConceded}
                    </p>
                    <p className="text-[9px] font-medium text-[#858ba3] sm:text-[10px]">
                        Runs
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-[13px] font-extrabold text-[#5420ed]">
                        {player.economy}
                    </p>
                    <p className="text-[9px] font-medium text-[#858ba3] sm:text-[10px]">
                        Economy
                    </p>
                </div>
            </div>

            {player.impact && (
                <div className="mt-3 flex items-start gap-2">
                    <FiTarget
                        size={14}
                        className="mt-0.5 shrink-0 text-[#853df5]"
                    />
                    <p className="text-[11px] font-medium leading-5 text-[#59617d]">
                        {player.impact}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function KeyPlayers({
    battingPlayers = defaultBatters,
    bowlingPlayers = defaultBowlers,
}: KeyPlayersProps) {
    return (
        <section className="w-full min-w-0 overflow-hidden rounded-xl border border-[#e1e5f5] bg-white shadow-[0_2px_12px_rgba(35,45,100,0.035)] sm:rounded-2xl">

            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-[#edf0f7] px-3 py-3 sm:px-5">
                <FiAward
                    size={22}
                    className="shrink-0 text-[#853df5]"
                />

                <div>
                    <h2 className="text-[16px] font-extrabold text-[#10143b] sm:text-[19px]">
                        Key Players
                    </h2>
                    <p className="text-[11px] font-medium text-[#858ba3] sm:text-xs">
                        Player performances and match impact
                    </p>
                </div>
            </div>

            <div className="space-y-5 p-3 sm:p-5">

                {/* Batters */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <FiActivity
                            size={17}
                            className="text-[#5420ed]"
                        />
                        <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-sm">
                            Batting performance
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        {battingPlayers.map((player) => (
                            <BatterCard
                                key={player.name}
                                player={player}
                            />
                        ))}
                    </div>
                </div>

                {/* Bowlers */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <FiTarget
                            size={17}
                            className="text-[#853df5]"
                        />
                        <h3 className="text-[13px] font-extrabold text-[#10143b] sm:text-sm">
                            Bowling performance
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        {bowlingPlayers.map((player) => (
                            <BowlerCard
                                key={player.name}
                                player={player}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}