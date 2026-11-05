
"use client";

import { FiRefreshCw, FiUser, FiMenu } from "react-icons/fi";
import { useGetCurrentMatchesQuery } from "@/lib/redux/services/cricketApi";

type NavbarProps = {
    onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetCurrentMatchesQuery(undefined, {
        refetchOnFocus: false,
    });

    const matches = data?.matches ?? [];
    const liveMatch = matches[0];

    const isTestData = data?.dataType === "test";
    const isOtherLiveMatch = data?.dataType === "live-other";

    const matchTitle = liveMatch
        ? `${liveMatch.teams?.[0]?.slice(0, 2).toUpperCase() || "T1"} vs ${liveMatch.teams?.[1]?.slice(0, 2).toUpperCase() || "T2"}`
        : "No live match available";

    const matchSubtitle = isLoading
        ? "Fetching cricket match..."
        : isError
            ? "Unable to load match information"
            : liveMatch
                ? liveMatch.status || "Match information unavailable"
                : "Waiting for the next live match";

    const badgeLabel = isTestData
        ? "TEST DATA"
        : isOtherLiveMatch
            ? "LIVE · NON-ODI"
            : "LIVE";

    const showBadge = Boolean(liveMatch) && !isError;

    const handleRefresh = () => {
        if (!isFetching) {
            refetch();
        }
    };

    return (
        <header className="z-30 w-full shrink-0 border-b border-[#e8e9f3] bg-white">
            <div className="grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:h-[82px] lg:px-8">

                {/* Mobile Menu */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#10143b] transition hover:bg-[#f3efff] lg:hidden"
                >
                    <FiMenu size={23} />
                </button>

                {/* Desktop Match Information */}
                <div className="hidden min-w-0 lg:block">
                    <div className="flex min-w-0 items-center gap-3">
                        <h1 className="truncate text-[24px] font-extrabold leading-tight tracking-[-0.7px] text-[#10143b]">
                            {isLoading ? "Loading match..." : matchTitle}
                        </h1>

                        {showBadge && (
                            <span
                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${isTestData
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-[#e8f9ef] text-[#159653]"
                                    }`}
                            >
                                {!isTestData && (
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16a05d]" />
                                )}
                                {badgeLabel}
                            </span>
                        )}
                    </div>

                    <p className="mt-1 truncate text-[15px] font-medium text-[#343957]">
                        {matchSubtitle}
                    </p>
                </div>

                {/* Mobile Logo */}
                <div className="flex min-w-0 items-center lg:hidden">
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-[19px] font-extrabold leading-tight tracking-[-0.7px] text-[#10143b]">
                            OverSense{" "}
                            <span className="text-[#5420ed]">AI</span>
                        </span>

                        <span className="truncate text-[11px] font-medium text-[#343957]">
                            Live Cricket Intelligence
                        </span>
                    </div>
                </div>

                {/* Desktop Spacer */}
                <div className="hidden lg:block" />

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 sm:gap-4 lg:gap-7">

                    {/* Refresh Match */}

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isFetching}
                        aria-label="Refresh match data"
                        title="Refresh match data"
                        className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#5420ed] px-4 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(37,99,235,0.22)] transition-all hover:bg-[#531ef3] hover:shadow-[0_5px_14px_rgba(37,99,235,0.3)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                    >
                        <FiRefreshCw
                            size={17}
                            className={isFetching ? "animate-spin" : ""}
                        />
                        <span className="hidden md:block">{isFetching ? "Refreshing..." : "Refresh"}</span>
                    </button>

                    {/* Profile */}
                    <button
                        type="button"
                        aria-label="Profile"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eeebfc] text-[#172047] transition hover:bg-[#e5defd] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                    >
                        <FiUser size={23} />
                    </button>
                </div>
            </div>

            {/* Mobile Match Information */}
            <div className="border-t border-[#f0f0f7] px-4 py-2.5 lg:hidden">
                <div className="flex min-w-0 items-center gap-2">
                    <h1 className="min-w-0 truncate text-[19px] font-extrabold leading-tight tracking-[-0.5px] text-[#10143b]">
                        {isLoading ? "Loading match..." : matchTitle}
                    </h1>

                    {showBadge && (
                        <span
                            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${isTestData
                                ? "bg-amber-50 text-amber-700"
                                : "bg-[#e8f9ef] text-[#159653]"
                                }`}
                        >
                            {!isTestData && (
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16a05d]" />
                            )}
                            {badgeLabel}
                        </span>
                    )}
                </div>

                <p className="mt-0.5 truncate text-[13px] font-medium text-[#343957]">
                    {matchSubtitle}
                </p>
            </div>
        </header>
    );
}
