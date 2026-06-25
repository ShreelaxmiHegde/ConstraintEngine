interface JsonTreeProps {
  data: Record<string, unknown>;
}

function TreeNode({
  label,
  value,
}: {
  label: string;
  value: unknown;
}) {
  const isObject =
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value);

  const isArray = Array.isArray(value);

  if (isObject) {
    return (
      <details open className="ml-4">
        <summary className="cursor-pointer text-zinc-200">
          {label}
        </summary>

        <div className="mt-2 space-y-2 border-l border-zinc-800 pl-4">
          {Object.entries(
            value as Record<string, unknown>
          ).map(([k, v]) => (
            <TreeNode
              key={k}
              label={k}
              value={v}
            />
          ))}
        </div>
      </details>
    );
  }

  if (isArray) {
    return (
      <details open className="ml-4">
        <summary className="cursor-pointer text-zinc-200">
          {label}
        </summary>

        <div className="mt-2 space-y-1 border-l border-zinc-800 pl-4">
          {(value as unknown[]).map((item, idx) => (
            <div
              key={idx}
              className="text-sm text-zinc-400"
            >
              • {String(item)}
            </div>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div className="flex gap-2 text-sm">
      <span className="text-zinc-500">
        {label}:
      </span>

      <span className="text-zinc-300">
        {String(value)}
      </span>
    </div>
  );
}

export default function JsonTree({
  data,
}: JsonTreeProps) {
  return (
    <div className="space-y-2">
      {Object.entries(data).map(([k, v]) => (
        <TreeNode
          key={k}
          label={k}
          value={v}
        />
      ))}
    </div>
  );
}