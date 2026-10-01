import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-blue-600 py-20 text-center text-white">
      <h2 className="mb-4 text-4xl font-bold">
        Stop guessing. Start tracking.
      </h2>

      <p className="mb-8">
        Stay informed about every application.
      </p>

      <Link
        href="/dashboard"
        className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600"
      >
        Go To Dashboard
      </Link>
    </section>
  );
}