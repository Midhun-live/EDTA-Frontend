"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
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
            Login
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Welcome back to Eldersmiles
          </p>

          {/* ✅ REAL LOGIN */}
          <LoginForm />

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-sky-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
