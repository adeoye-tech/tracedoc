export default function ProblemSection() {
  const problems = [
    {
      title: "Lost in the process",
      description:
        "You submitted your application, but weeks later you still don't know what is happening.",
    },
    {
      title: "Too many documents",
      description:
        "Important receipts, certificates, forms, and supporting documents can easily get scattered.",
    },
    {
      title: "Missed updates",
      description:
        "An application may require your attention, but you don't always know when action is needed.",
    },
    {
      title: "No clear picture",
      description:
        "When you have several applications, it becomes difficult to remember what stage each one is in.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            The problem
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Application processes shouldn't leave you guessing.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            From school documents and job applications to passports,
            certificates, and other important requests, keeping track of
            everything can quickly become stressful.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                0{index + 1}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {problem.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            You shouldn't have to keep checking everywhere.
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            TraceDoc gives you one place to see what you've submitted,
            what is still processing, what needs your attention, and
            what has been completed.
          </p>
        </div>
      </div>
    </section>
  );
}