import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-14 md:grid-cols-2">
          
          {/* Hero Text */}
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              A smarter way to track your applications
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Stop wondering what’s happening with your application.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              TraceDoc helps you organize applications, keep track of
              important documents, monitor progress, and know what needs
              your attention next — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Start Tracking for Free
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span>✓ Track applications</span>
              <span>✓ Manage documents</span>
              <span>✓ Stay ahead of deadlines</span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Your application overview
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Stay in control
                  </h2>
                </div>

                <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600">
                  TraceDoc
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Total
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    Applications
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-green-700">
                    On Track
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green-700">
                    Progress
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-sm text-amber-700">
                    Attention
                  </p>
                  <p className="mt-2 text-2xl font-bold text-amber-700">
                    Needed
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">
                      Application progress
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Know what is happening at every stage.
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    On Track
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-3/4 rounded-full bg-blue-600" />
                </div>

                <div className="mt-3 flex justify-between text-xs text-slate-400">
                  <span>Submitted</span>
                  <span>Processing</span>
                  <span>Completed</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-800">
                  Stay informed
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-700">
                  Get notified when something needs your attention.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}