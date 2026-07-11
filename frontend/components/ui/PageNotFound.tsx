import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <p className="text-4xl font-semibold text-red-500">{"{ 404 }"}</p>
        <p className="text-3xl">Page Not Found</p>
        <p className="text-zinc-400 mt-3">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <p className="text-zinc-400">
          Please check the URL or return to the homepage.
        </p>
        <div className="text-sky-500 mt-3">
          <Link href="/" className="flex gap-2" >
            <h1 className="cursor-pointer underline text-sky-500 text-md gap-r-2">GO BACK TO HOME</h1>
            <ExternalLink />
          </Link>
        </div>
      </div>
    </>
  )
}