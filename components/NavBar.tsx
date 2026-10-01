import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          TraceDoc
        </h1>

        <div className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-600"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}