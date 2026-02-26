"use client";

import { useSearchParams } from "next/navigation";
import AssessmentResult from "@/components/AssessmentResult";

export default function ShareClient() {
    const searchParams = useSearchParams();
    const dataParam = searchParams.get("data");

    if (!dataParam) {
        return <div>Invalid share link</div>;
    }

    try {
        const decoded = JSON.parse(atob(dataParam));
        return <AssessmentResult assessment={decoded} showActions={false} />;
    } catch {
        return <div>Invalid share data</div>;
    }
}
