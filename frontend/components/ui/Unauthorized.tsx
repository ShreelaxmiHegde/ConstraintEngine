import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <p className="text-4xl font-semibold text-red-500">{"{ 403 }"}</p>
        <p className="text-3xl">Unauthorized Access</p>
        <p className="text-zinc-400 mt-3">
          You are not authorized to access this page.
        </p>

        <p className="text-zinc-400">
          Please {" "}
          <Link className="cursor-pointer text-sky-500 underline" href={"/auth/signup"}>Sign Up</Link> {" "}
          or {" "}
          <Link className="cursor-pointer text-sky-500 underline" href={"/auth/login"}>Log In</Link> to continue.
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