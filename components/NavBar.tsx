import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
            T
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Trace<span className="text-blue-600">Doc</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-blue-600 sm:block"
          >
            Home
          </Link>

          <Link
            href="/#features"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-blue-600 sm:block"
          >
            Features
          </Link>

          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    </nav>
  );
}