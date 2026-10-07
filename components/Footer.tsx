export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                T
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                Trace<span className="text-blue-600">Doc</span>
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              A simple way to organize applications, manage documents,
              track progress, and stay aware of what needs your attention.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Product
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="/#features"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Features
              </a>

              <a
                href="/auth/login"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Login
              </a>

              <a
                href="/auth/register"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Create Account
              </a>
            </div>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Get Started
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Start keeping your applications organized and easier to
              manage.
            </p>

            <a
              href="/auth/register"
              className="mt-4 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-center text-sm text-slate-400">
            © {new Date().getFullYear()} TraceDoc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}