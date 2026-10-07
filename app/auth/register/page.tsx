"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setErrorMessage("");

  if (password !== confirmPassword) {
    setErrorMessage("Passwords do not match.");
    return;
  }

  setIsLoading(true);

  try {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      phone,
      createdAt: new Date().toISOString(),
    });

    router.push("/dashboard");
  } catch (error: any) {
    console.error("Registration failed:", error);

    if (error.code === "auth/email-already-in-use") {
      setErrorMessage(
        "An account with this email already exists. Please log in instead."
      );
    } else if (error.code === "auth/weak-password") {
      setErrorMessage(
        "Your password is too weak. Please choose a stronger password."
      );
    } else if (error.code === "auth/invalid-email") {
      setErrorMessage(
        "Please enter a valid email address."
      );
    } else {
      setErrorMessage(
        "Unable to create your account. Please try again."
      );
    }

    setIsLoading(false);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-slate-200">

        <h1 className="text-2xl font-bold text-slate-800">
          Create your TraceDoc account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Set up your account and start keeping your applications organized.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
             onChange={(e) => {
  setEmail(e.target.value);
  setErrorMessage("");
}}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
onChange={(e) => {
  setPassword(e.target.value);
  setErrorMessage("");
}}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
             onChange={(e) => {
  setConfirmPassword(e.target.value);
  setErrorMessage("");
}}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>
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
  {isLoading ? "Creating account..." : "Create Account"}
</button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline"
          >
            Login
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
