"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-10 bg-sky-50">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Button
        onClick={() => router.push("/form")}
        className="bg-sky-600 hover:bg-sky-700"
      >
        Open Form
      </Button>
    </div>
  );
}
