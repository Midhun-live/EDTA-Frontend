"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import AssessmentResult from "@/components/AssessmentResult";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UserMenu from "@/components/UserMenu";
import { getUser, DecodedToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function AssessmentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<DecodedToken | null>(null);

    useEffect(() => {
        setUser(getUser());
        async function fetchAssessment() {
            try {
                const id = params.id;
                const data = await apiFetch(`/assessments/${id}`);
                console.log("Assessment fetched:", data);
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
            <div className="min-h-screen bg-sky-50 overflow-x-hidden">
                <div className="max-w-7xl mx-auto py-6">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 mb-4">
                        <Button variant="outline" onClick={() => router.push("/home")} className="w-full sm:w-auto">
                            &larr; Back to Dashboard
                        </Button>
                        {user && <UserMenu name={user.name || ""} email={user.email || ""} />}
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl">
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                            </div>
                        ) : !assessment ? (
                            <p className="text-sm text-red-500">Assessment not found.</p>
                        ) : (
                            <AssessmentResult assessment={assessment} />
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
