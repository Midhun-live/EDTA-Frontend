"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { login } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-sky-700">Login</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back to Eldersmiles
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="doctor@eldersmiles.com"
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          onClick={handleLogin}
          className="w-full bg-sky-600 hover:bg-sky-700"
        >
          Login
        </Button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-sky-600 font-medium">
            Sign up
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
