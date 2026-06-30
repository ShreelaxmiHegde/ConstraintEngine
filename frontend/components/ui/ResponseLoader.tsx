export default function ResponseLoader() {
  return (
    <div className="flex gap-1 p-3">
      <span className="h-2 w-2 rounded-full bg-lime-300 animate-bounce"></span>
      <span className="h-2 w-2 rounded-full bg-lime-400 animate-bounce [animation-delay:150ms]"></span>
      <span className="h-2 w-2 rounded-full bg-lime-500 animate-bounce [animation-delay:300ms]"></span>
    </div>
  )
}