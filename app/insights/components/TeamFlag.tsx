"use client";

type TeamInfo = {
    name?: string;
    shortname?: string;
    img?: string;
};

type TeamFlagProps = {
    teamName: string;
    teamInfo?: TeamInfo[];
    className?: string;
};

const countryFlags: Record<string, string> = {
    india: "in",
    australia: "au",
    england: "gb-eng",
    pakistan: "pk",
    bangladesh: "bd",
    afghanistan: "af",
    "south africa": "za",
    "new zealand": "nz",
    sri: "lk",
    "sri lanka": "lk",
    "west indies": "wi",
    ireland: "ie",
    zimbabwe: "zw",
    nepal: "np",
    oman: "om",
    scotland: "gb-sct",
    netherlands: "nl",
    usa: "us",
    "united states": "us",
    canada: "ca",
    uae: "ae",
    "united arab emirates": "ae",
    namibia: "na",
    uganda: "ug",
    kenya: "ke",
};

function getCountryCode(teamName: string): string | null {
    const normalized = teamName
        .toLowerCase()
        .replace(/[^a-z\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const match = Object.entries(countryFlags)
        .sort(([a], [b]) => b.length - a.length)
        .find(([country]) => normalized.includes(country));

    return match?.[1] ?? null;
}

export default function TeamFlag({
    teamName,
    teamInfo = [],
    className = "",
}: TeamFlagProps) {
    const matchingTeam = teamInfo.find((team) => {
        const apiName = team.name?.toLowerCase().trim();
        const requestedName = teamName.toLowerCase().trim();

        return (
            apiName === requestedName ||
            Boolean(apiName && requestedName.includes(apiName)) ||
            Boolean(apiName && apiName.includes(requestedName))
        );
    });

    const apiImage = matchingTeam?.img;
    const countryCode = getCountryCode(teamName);

    const flagUrl =
        apiImage ||
        (countryCode
            ? `https://flagcdn.com/w80/${countryCode}.png`
            : null);

    if (!flagUrl) {
        return (
            <span
                className={`inline-flex h-5 w-7 shrink-0 items-center justify-center rounded border border-[#e1e5f5] bg-[#f5f7fc] text-[9px] font-bold text-[#858ba3] ${className}`}
                title={teamName}
            >
                {teamName.slice(0, 2).toUpperCase()}
            </span>
        );
    }

    return (
        <img
            src={flagUrl}
            alt={`${teamName} flag`}
            title={teamName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(event) => {
                event.currentTarget.style.display = "none";
            }}
            className={`h-5 w-7 shrink-0 rounded-[3px] border border-[#e1e5f5] object-cover ${className}`}
        />
    );
}