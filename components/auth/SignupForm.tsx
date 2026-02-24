"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const password = form.get("password") as string;
    const confirm = form.get("confirm_password") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          role: form.get("role") || "clinician",
          password,
        }),
      });

      // ✅ Auto-login after signup
      localStorage.setItem("access_token", res.access_token);

      router.push("/home");
    } catch (err) {
      setError("Signup failed. Email may already be registered.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label>Full Name</Label>
        <Input name="name" placeholder="Dr. John Doe" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="doctor@eldersmiles.com"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Role</Label>
        <Input
          name="role"
          placeholder="Doctor / Nurse"
          defaultValue="clinician"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Password</Label>
        <Input name="password" type="password" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Confirm Password</Label>
        <Input name="confirm_password" type="password" required />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-600 hover:bg-sky-700"
      >
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
