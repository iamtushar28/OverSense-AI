"use client";

import { Suspense } from "react";
import ReduxProvider from "./ReduxProvider";

function ReduxFallback() {
    return (
        <main className="min-h-screen bg-[#f7f9fd] p-6">
            <div className="mx-auto max-w-7xl animate-pulse space-y-6">
                <div className="h-12 w-48 rounded-lg bg-slate-200" />
                <div className="h-48 rounded-2xl bg-slate-200" />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="h-72 rounded-2xl bg-slate-200" />
                    <div className="h-72 rounded-2xl bg-slate-200" />
                </div>
            </div>
        </main>
    );
}

export default function ReduxProviderClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<ReduxFallback />}>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </Suspense>
    );
}