"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DischargeAssessmentForm from "@/components/DischargeAssessmentForm";
import LogoutButton from "@/components/auth/LogoutButton";

export default function FormPage() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen">
        <div className="absolute top-4 right-4 z-10">
          <LogoutButton />
        </div>
        <DischargeAssessmentForm />
      </div>
    </ProtectedRoute>
  );
}
