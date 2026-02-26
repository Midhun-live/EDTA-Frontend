"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DischargeAssessmentForm from "@/components/DischargeAssessmentForm";
import UserMenu from "@/components/UserMenu";
import { getUser, DecodedToken } from "@/lib/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function FormPage() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

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
          <div className="px-4 sm:px-6 lg:px-8">
            <DischargeAssessmentForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
