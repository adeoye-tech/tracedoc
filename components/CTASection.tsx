import Link from "next/link";

export default function CTASection() {
  return (
    <section className="border-t border-slate-200 bg-slate-100 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Take control of your applications
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Your applications deserve better tracking.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Stop relying on scattered notes, messages, and memory.
          Bring your applications, documents, progress, and important
          actions together with TraceDoc.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/register"
            className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Create Your Free Account
          </Link>

          <Link
            href="/auth/login"
            className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Already Have an Account?
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Start organizing your application journey today.
        </p>
      </div>
    </section>
  );
}