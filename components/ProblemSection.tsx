export default function ProblemSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Tired of wondering where your application stopped?
        </h2>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            "Transcript",
            "Passport",
            "Certificate",
            "Job Application",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 font-semibold">{item}</h3>
              <p className="text-sm text-gray-500">
                Submitted • Waiting • No Updates
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}