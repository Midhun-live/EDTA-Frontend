"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Props = {
  onSuccess: (data: any) => void;
};

export default function DischargeAssessmentForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // 🔴 CRITICAL

    setLoading(true);
    setError(null);

    const payload = {
      respiratory: {
        spo2: 96,
        on_oxygen: false,
      },
      mobility: {
        is_bedridden: false,
        can_walk: true,
        needs_assistance: false,
      },
      feeding: {
        can_eat_independently: true,
        feeding_method: "oral",
      },
      elimination: {
        continent_bowel: true,
        continent_bladder: true,
      },
      cognitive: {
        alert: true,
        oriented: true,
      },
      home_environment: {
        has_caregiver: true,
        home_type: "house",
      },
      pressure_injury: {
        has_pressure_injury: false,
      },
      wound_care: {
        has_wound: false,
      },
    };

    try {
      const response = await apiFetch("/assessments", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // ✅ THIS IS THE LINE THAT UNBLOCKS EVERYTHING
      onSuccess(response);

    } catch (err: any) {
      setError("Failed to submit assessment");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-600">
        {loading ? "Submitting discharge assessment..." : "Ready to submit"}
      </p>

      {error && (
        <p className="text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Assessment"}
      </button>
    </form>
  );
}
