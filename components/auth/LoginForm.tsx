"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });

      const rememberMe = form.get("rememberMe") === "on";
      import("@/lib/auth").then(({ setToken }) => {
        setToken(res.access_token, rememberMe);
      });

      // Optionally set cookie if needed by next.js, but user only mentioned local/session storages.
      document.cookie = `access_token=${res.access_token}; path=/; SameSite=Lax`;
      router.replace("/home");
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Password</Label>
        <Input name="password" type="password" required />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="rememberMe" name="rememberMe" className="w-4 h-4" />
        <Label htmlFor="rememberMe" className="text-sm cursor-pointer">Remember Me</Label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-sky-600 hover:bg-sky-700"
      >
        Login
      </Button>
    </form>
  );
}
