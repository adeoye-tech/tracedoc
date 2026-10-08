"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setErrorMessage("");
  setIsLoading(true);

  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    router.push("/dashboard");
  } catch (error: any) {
    console.error("Login failed:", error);

    setErrorMessage(
      "Incorrect email or password. Please try again."
    );

    setIsLoading(false);
  }
};

  return (
   <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8 sm:p-6">
<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back to TraceDoc
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue tracking your applications.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          {errorMessage && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <button
  type="submit"
  disabled={isLoading}
  className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {isLoading ? "Logging in..." : "Login"}
</button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:underline"
          >
            Create one
          </Link>
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-sm text-slate-500 hover:text-blue-600"
        >
          ← Back to TraceDoc
        </Link>
      </div>
    </main>
  );
}