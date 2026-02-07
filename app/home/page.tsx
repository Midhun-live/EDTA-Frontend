"use client";

import { useState } from "react";
import DischargeAssessmentForm from "@/components/DischargeAssessmentForm";
import AssessmentResult from "@/components/AssessmentResult";

export default function HomePage() {
  const [result, setResult] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {!showForm && !result && (
        <button onClick={() => setShowForm(true)}>
          Start Assessment
        </button>
      )}

      {showForm && !result && (
        <DischargeAssessmentForm
          onSuccess={(data: any) => {
            setResult(data);
            setShowForm(false);
          }}
        />
      )}

      {result && <AssessmentResult result={result} />}
    </div>
  );
}
