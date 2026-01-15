"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("Nurse");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      const data = await res.json();
      console.log("Access Token:", data.access_token);
    } catch (err) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-sky-100">
      <CardHeader className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-sky-700">
          Create Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Join Eldersmiles today
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="doctor@eldersmiles.com"
          />
        </div>

        <div className="space-y-2">
            <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <Button
          className="w-full bg-sky-600 hover:bg-sky-700"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-sky-600 font-medium">
            Login
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
