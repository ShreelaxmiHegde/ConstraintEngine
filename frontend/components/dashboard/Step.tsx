export default function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="text-xs text-zinc-600">
        {number}
      </p>

      <h3 className="mt-3 font-medium">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        {text}
      </p>
    </div>
  );
}