"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;

  function handleChange({ target }) {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (res?.error) return setError(res.error);
    router.replace("/profile");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {error ? (
          <div>
            <Alert value={error} />
          </div>
        ) : null}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/auth/sign-up"
          >
            I am new, sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
