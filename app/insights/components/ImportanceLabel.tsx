type Props = {
    importance: string;
};

export default function ImportanceLabel({ importance }: Props) {
    const styles: Record<string, string> = {
        high: "bg-red-50 text-red-600",
        medium: "bg-amber-50 text-amber-700",
        low: "bg-slate-100 text-slate-600",
    };

    const className = styles[importance.toLowerCase()] ?? styles.low;

    return (
        <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${className}`}
        >
            {importance} impact
        </span>
    );
}