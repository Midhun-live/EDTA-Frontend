"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <h1 className="text-4xl font-bold mb-4">Eldersmiles</h1>
        <p className="text-lg max-w-md">
          AI-powered discharge triage assistant to ensure safe and
          well-prepared patient transitions.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-sky-50 px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-sky-700">
            Create Account
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Join Eldersmiles today
          </p>

          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Dr. John Doe" />
            </div>

            <div>
              <Label>Email</Label>
              <Input placeholder="doctor@eldersmiles.com" />
            </div>

            <div>
              <Label>Role</Label>
              <Input placeholder="Nurse / Doctor" />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" />
            </div>

            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-sky-600 hover:bg-sky-700"
            >
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-sky-600 font-medium">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
