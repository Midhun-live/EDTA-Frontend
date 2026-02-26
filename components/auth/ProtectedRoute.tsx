"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../lib/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("/login");
        } else {
            setIsReady(true);
        }
    }, [router]);

    if (!isReady) {
        return null; // Or a loading spinner if preferred, but null prevents flashing
    }

    return <>{children}</>;
}
