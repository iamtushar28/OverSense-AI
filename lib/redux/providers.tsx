"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { makeStore, type AppStore } from "@/lib/redux/store";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const [store, setStore] = useState<AppStore | null>(null);

    useEffect(() => {
        const reduxStore = makeStore();
        setStore(reduxStore);
    }, []);

    // Wait until the Redux store is initialized in the browser.
    if (!store) {
        return (
            <div className="min-h-screen bg-[#f8faff]" />
        );
    }

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}