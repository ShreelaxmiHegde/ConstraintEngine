interface Props {
  title: string;
  description: string;
}

export default function ProjectReviewHeader({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-[28px] border border-zinc-900 bg-zinc-950/70 backdrop-blur">
      <div className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-widest text-lime-300">
          Project Review
        </p>

        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
          {title}
        </h1>

        <div className="mt-6 rounded-2xl border border-zinc-900 bg-black p-5">
          <p className="text-sm leading-7 text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}