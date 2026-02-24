"use client";

import { useSearchParams } from "next/navigation";
import AssessmentResult from "@/components/AssessmentResult";

export default function SharePage() {
  const params = useSearchParams();
  const id = params.get("id");

  if (!id) {
    return (
      <div className="p-10 text-center text-red-500">
        Invalid share link
      </div>
    );
  }

  const raw = localStorage.getItem(`shared_assessment_${id}`);

  if (!raw) {
    return (
      <div className="p-10 text-center text-red-500">
        Shared data not found or expired
      </div>
    );
  }

  const assessment = JSON.parse(raw);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <AssessmentResult
        assessment={assessment}
        showActions={false}
      />
    </div>
  );
}
