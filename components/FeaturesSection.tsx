export default function FeaturesSection() {
  const features = [
    {
      number: "01",
      title: "Track every application",
      description:
        "Keep all your applications organized in one place instead of searching through messages, emails, notes, and files.",
    },
    {
      number: "02",
      title: "Know your current status",
      description:
        "See where each application stands and quickly identify the ones that are progressing or need your attention.",
    },
    {
      number: "03",
      title: "Keep documents together",
      description:
        "Store important documents alongside the application they belong to so everything is easier to find when you need it.",
    },
    {
      number: "04",
      title: "Never miss what matters",
      description:
        "Stay aware of important updates, approaching deadlines, expired documents, and applications that may require action.",
    },
    {
      number: "05",
      title: "Search and find quickly",
      description:
        "Find the application you're looking for without scrolling through a long list or trying to remember where you saved it.",
    },
    {
      number: "06",
      title: "Understand your progress",
      description:
        "Get a clear picture of your applications from submission through processing and eventually completion.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-slate-50 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Everything in one place
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Everything you need to stay on top of your applications.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            TraceDoc takes the stress out of keeping track of applications,
            documents, progress, and important actions.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                {feature.number}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Less stress. More control.
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                Stop asking, “What is happening with my application?”
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                With TraceDoc, you have a clear place to record what you
                submitted, monitor progress, manage documents, and see
                what needs your attention.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-white p-4">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Applications
                    </p>
                    <p className="text-sm text-slate-500">
                      Organized and easy to find
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-white p-4">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Documents
                    </p>
                    <p className="text-sm text-slate-500">
                      Kept together with each application
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-white p-4">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Important actions
                    </p>
                    <p className="text-sm text-slate-500">
                      Easier to notice and manage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}