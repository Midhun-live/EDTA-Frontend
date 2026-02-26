"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { apiFetch } from "@/lib/api";
import { getUser, DecodedToken } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    setUser(getUser());
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
      <div className="min-h-screen bg-sky-50 overflow-x-hidden">
        <div className="max-w-7xl mx-auto py-6">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
            {user && <UserMenu name={user.name || ""} email={user.email || ""} />}
          </div>

          <div className="px-4 sm:px-6 lg:px-8 mb-8">
            <Button
              onClick={() => router.push("/form")}
              className="bg-sky-600 hover:bg-sky-700 w-full sm:w-auto"
            >
              Open Form
            </Button>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold mb-4 text-sky-800">Your Assessments</h2>
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : assessments.length === 0 ? (
              <p className="text-sm text-gray-500">No assessments created yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
    </ProtectedRoute>
  );
}
