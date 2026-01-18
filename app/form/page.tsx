"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import DischargeAssessmentForm from "@/components/DischargeAssessmentForm";

export default function FormPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, []);

  return <DischargeAssessmentForm />;
}
