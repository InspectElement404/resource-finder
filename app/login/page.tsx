"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 font-helvetica">
      <div className="p-8 bg-white shadow-xl rounded-2xl border border-slate-200 text-center max-w-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          LGA Repository
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          Please sign in with your LGA email to continue.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 p-3 rounded-lg font-bold text-slate-700 hover:bg-slate-50 transition-all"
        >
          <img
            src="https://authjs.dev/img/providers/google.svg"
            className="h-5 w-5"
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
