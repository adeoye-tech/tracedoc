import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Know where your application stands.
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              Track applications, understand delays, and know
              what action to take next—all in one place.
            </p>

            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
              >
                View Dashboard
              </Link>

              <button className="rounded-lg border px-6 py-3">
                Learn More
              </button>
            </div>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">
              Passport Renewal
            </h3>

            <p className="mb-2">
              <strong>Current Stage:</strong> Processing
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className="font-medium text-green-600">
                On Track
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}