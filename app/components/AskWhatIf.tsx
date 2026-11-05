"use client";

import { useState } from "react";
import {
    FiZap,
    FiTarget,
    FiSend,
    FiArrowRight,
} from "react-icons/fi";

type AskWhatIfProps = {
    onAsk?: (question: string) => void;
};

const suggestions = [
    "What if Virat scores 20 in the next over?",
    "What if India scores 15 runs in the next over?",
    "What if Australia takes 2 wickets in the next 2 overs?",
];

export default function AskWhatIf({ onAsk }: AskWhatIfProps) {
    const [question, setQuestion] = useState("");

    const handleAsk = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;

        onAsk?.(trimmed);
        setQuestion("");
    };

    return (
        <section className="w-full rounded-2xl border border-[#e1e5f5] bg-white p-4 shadow-[0_2px_12px_rgba(35,45,100,0.035)]">

            {/* Header */}
            <div className="mb-4 flex items-start gap-3">
                <FiZap
                    size={23}
                    className="mt-0.5 shrink-0 text-[#853df5]"
                    strokeWidth={2.5}
                />

                <div>
                    <h2 className="text-[19px] font-extrabold tracking-tight text-[#10143b]">
                        Ask What-If ?
                    </h2>

                    <p className="mt-1 text-[14px] leading-[22px] text-[#343957]">
                        Explore hypothetical scenarios and see how they change the match.
                    </p>
                </div>
            </div>

            {/* Suggested Questions */}
            <div className="space-y-2">
                {suggestions.map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleAsk(item)}
                        className="flex min-h-[64px] w-full items-center gap-3 rounded-xl border border-[#e1e5f5] bg-white px-4 py-2.5 text-left transition-all hover:border-[#c8b5ff] hover:bg-[#faf8ff]"
                    >
                        <span className="flex-1 text-[14px] font-medium leading-[21px] text-[#10143b]">
                            {item}
                        </span>

                        <FiArrowRight
                            size={18}
                            className="shrink-0 text-[#273052]"
                        />
                    </button>
                ))}
            </div>

            {/* Custom Question Input */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAsk(question);
                }}
                className="mt-5 flex items-center gap-2"
            >
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask your own scenario..."
                    className="h-[49px] min-w-0 flex-1 rounded-full border border-[#dce1ef] bg-white px-4 text-[13px] text-[#10143b] outline-none transition focus:border-[#9564f5] focus:ring-2 focus:ring-[#eee6ff]"
                />

                <button
                    type="submit"
                    disabled={!question.trim()}
                    aria-label="Ask scenario"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a66bfa] to-[#7540e8] text-white shadow-[0_3px_8px_rgba(117,64,232,0.2)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <FiSend size={19} />
                </button>
            </form>
        </section>
    );
}