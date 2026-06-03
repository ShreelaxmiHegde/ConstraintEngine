"use client"

import { ChangeEvent, useState } from "react"
import { login } from "@/api";
import { useAuth } from "@/context/useAuth";
import { useAuthModal } from "@/context/useAuthModal";


export default function LoginForm() {
  const { openAuth, closeAuth } = useAuthModal();
  const { setCurrUser } = useAuth();

  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formdata,
      [evt.target.name]: evt.target.value
    });
  }

  const handleSubmit = async (evt: ChangeEvent) => {
    evt.preventDefault();

    try {
      const response = await login(formdata);
      console.log(response);

      setCurrUser(response.user);
    } catch (err) {
      console.log("Error logging in: ", err)
    } finally {
      closeAuth();
    }
  }


  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-zinc-400">
          Sign in to continue.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-zinc-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-300 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-white text-black py-3 font-medium hover:bg-zinc-200 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <button
          onClick={() => openAuth("signup")}
          className="text-white hover:underline"
        >
          Sign up
        </button>
      </div>
    </>
  )
}