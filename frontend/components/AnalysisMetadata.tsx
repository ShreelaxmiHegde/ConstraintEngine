export default function AnalysisMetadata() {
  const metadata = [
    {
      label: "Estimated Throughput",
      value: "12k writes/min",
    },
    {
      label: "Consistency Model",
      value: "Strong Consistency",
    },
    {
      label: "Read/Write Ratio",
      value: "65 / 35",
    },
    {
      label: "Index Strategy",
      value: "Composite + GIN",
    },
    {
      label: "Latency Target",
      value: "< 120ms",
    },
    {
      label: "Scalability Pattern",
      value: "Horizontal API Scaling",
    },
  ];

  return (
    <div className="rounded-[32px] border border-zinc-900 bg-zinc-950/70 overflow-hidden">
      <div className="border-b border-zinc-900 px-6 py-5">
        <p className="text-sm font-medium">Analysis Metadata</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
        {metadata.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-zinc-900 bg-black p-5"
          >
            <p className="text-xs uppercase tracking-widest text-zinc-600">
              {item.label}
            </p>

            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}