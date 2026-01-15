import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex flex-col justify-center px-12 bg-gradient-to-br from-sky-600 to-blue-700 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Eldersmiles
        </h1>
        <p className="text-lg opacity-90 max-w-md">
          Discharge Triage Assistant
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-sky-50 px-6">

        <LoginForm />
      </div>
    </div>
  );
}
