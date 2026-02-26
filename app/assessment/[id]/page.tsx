"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import AssessmentResult from "@/components/AssessmentResult";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LogoutButton from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";

export default function AssessmentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAssessment() {
            try {
                const id = params.id;
                const data = await apiFetch(`/assessments/${id}`);
                setAssessment(data);
            } catch (err) {
                console.error("Failed to fetch assessment", err);
            } finally {
                setLoading(false);
            }
        }
        if (params.id) {
            fetchAssessment();
        }
    }, [params.id]);

    return (
        <ProtectedRoute>
            <div className="min-h-screen p-10 bg-sky-50 relative">
                <div className="absolute top-6 right-10 z-10">
                    <LogoutButton />
                </div>

                <div className="mb-6 relative z-10 w-full max-w-3xl mx-auto">
                    <Button variant="outline" onClick={() => router.push("/home")}>
                        &larr; Back to Dashboard
                    </Button>
                </div>

                <div className="mx-auto max-w-3xl">
                    {loading ? (
                        <p className="text-sm text-gray-500">Loading assessment...</p>
                    ) : !assessment ? (
                        <p className="text-sm text-red-500">Assessment not found.</p>
                    ) : (
                        <AssessmentResult assessment={assessment} />
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
