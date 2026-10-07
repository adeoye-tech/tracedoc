"use client";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
       router.push("/dashboard");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
router.push("/dashboard");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">
          {isLogin ? "Login to TraceDoc" : "Create your TraceDoc account"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {isLogin
            ? "Sign in to continue tracking your applications."
            : "Create an account to start tracking your applications."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-800 px-4 py-3 font-medium text-white cursor-pointer hover:bg-slate-700"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-5 w-full text-sm text-blue-600 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Create one"
            : "Already have an account? Login"}
        </button>
      </div>
    </main>
  );
}