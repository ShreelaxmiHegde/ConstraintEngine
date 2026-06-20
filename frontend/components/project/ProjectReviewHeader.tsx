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

        <h1 className="my-3 text-3xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h1>

        <p className="text-md leading-7 text-zinc-400">
          <i>{description}</i>
        </p>
      </div>
    </div>
  );
}