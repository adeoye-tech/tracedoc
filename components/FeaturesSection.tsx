export default function FeaturesSection() {
  const features = [
    {
      title: "Track Applications",
      description:
        "Monitor all your applications from one dashboard.",
    },
    {
      title: "Visual Timelines",
      description:
        "See exactly where your application is in the process.",
    },
    {
      title: "Smart Status",
      description:
        "Know whether an application is on track or delayed.",
    },
    {
      title: "Action Guidance",
      description:
        "Get clear recommendations on what to do next.",
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Features
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border p-6 shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}