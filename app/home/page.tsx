"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { apiFetch } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const data = await apiFetch("/assessments/my");
        setAssessments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAssessments();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-10 bg-sky-50 relative">
        <div className="absolute top-6 right-10">
          <LogoutButton />
        </div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="flex justify-between mb-8">
          <Button
            onClick={() => router.push("/form")}
            className="bg-sky-600 hover:bg-sky-700"
          >
            Open Form
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-sky-800">Your Assessments</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading assessments...</p>
          ) : assessments.length === 0 ? (
            <p className="text-sm text-gray-500">No assessments created yet.</p>
          ) : (
            <div className="space-y-4">
              {assessments.map((a: any) => (
                <div
                  key={a.assessment_id || a._id || a.id}
                  onClick={() => {
                    console.log("Clicked assessment:", a);
                    router.push(`/assessment/${a.assessment_id}`);
                  }}
                  className="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition border border-sky-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg text-sky-900">{a.patient_name}</p>
                      <p className="text-sm text-gray-600">Age: {a.age}</p>
                      <p className="text-sm text-gray-600">Discharge Date: {a.discharge_date}</p>
                    </div>
                    {a.created_at && (
                      <p className="text-xs text-gray-400">
                        {new Date(a.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
