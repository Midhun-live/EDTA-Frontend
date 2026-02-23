"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  // STEP 1 – Send OTP
  async function handleSendOTP() {
    setLoading(true);
    setMessage("");

    try {
      await apiFetch("/auth/forgot-password-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setStep(2);
      setMessage("OTP sent to your email");
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // STEP 2 – Verify OTP
  async function handleVerifyOTP() {
    setLoading(true);
    setMessage("");

    try {
      await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });

      setStep(3);
      setMessage("OTP verified. Set new password.");
    } catch (err: any) {
      setMessage("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  }

  // STEP 3 – Reset Password
  async function handleResetPassword() {
    setLoading(true);
    setMessage("");

    try {
        await apiFetch("/auth/reset-password-otp", {
            method: "POST",
            body: JSON.stringify({
                email,
                new_password: newPassword,
            }),
        });

        router.replace("/login");   // ✅ instant redirect
    } catch {
        setMessage("Failed to reset password");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <h1 className="text-4xl font-bold mb-4">Eldersmiles</h1>
        <p className="text-lg max-w-md">
  Discharge triage assistant to ensure safe and
          well-prepared patient transitions.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-sky-50 px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-sky-700 py-2">
          Forgot Password
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div>
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="doctor@eldersmiles.com"
                    />
                </div>
            </div>

            <div className="mt-4">
                <Button
                onClick={handleSendOTP}
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={loading}
                >
                {loading ? "Sending..." : "Send OTP"}
                </Button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <Label>Enter OTP</Label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
              />
            </div>

            <div className="mt-4">
                <Button
                onClick={handleVerifyOTP}
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={loading}
                >
                {loading ? "Verifying..." : "Verify OTP"}
                </Button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="flex flex-col gap-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="mt-4">
                <Button
                onClick={handleResetPassword}
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={loading}
                >
                {loading ? "Updating..." : "Reset Password"}
                </Button>
            </div>
          </>
        )}

        <div className="mt-2">
            {message && (
            <p className="text-sm text-center text-muted-foreground">
                {message}
            </p>
            )}
        </div>
        </div>
      </div>
    </div>
  );
}