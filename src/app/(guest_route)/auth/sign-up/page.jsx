"use client";

import Alert from "@/components/Alert";
import Link from "next/link";
import React, { useState } from "react";

function SignupForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;

  function handleChange({ target }) {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function handleSubmit(event) {
    setBusy(true);
    event.preventDefault();
    const res = await fetch("/api/auth/users", {
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    const responseBody = await res.json();
    console.log(responseBody);

    if (res.status === 422) return setError(responseBody.error);

    setBusy(false);
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
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>
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
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={busy}
            style={{ opacity: busy ? 0.5 : 1 }}
          >
            Sign Up
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/auth/sign-in"
          >
            I have an account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
