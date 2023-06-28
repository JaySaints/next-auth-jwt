"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthProfileMenu() {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";

  if (isAuth) {
    return (
      <>
        {data?.user?.role === "admin" ? (
          <Link href="/admin-painel">Admin Painel</Link>
        ) : null}

        <p>
          {data?.user?.name}
          <button
            className="bg-blue-500 text-white rounded ml-5 p-3 inline-block shadow-sm"
            onClick={signOut}
          >
            Logout
          </button>
        </p>
      </>
    );
  }

  return (
    <ul className="flex items-center space-x-6">
      <li>
        <Link href="/auth/sign-in">Login</Link>
      </li>

      <li>
        <Link
          href="/auth/sign-up"
          className="bg-blue-500 text-white rounded p-3 inline-block shadow-sm"
        >
          Sign Up
        </Link>
      </li>
    </ul>
  );
}
