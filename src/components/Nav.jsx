import Link from "next/link";
import AuthProfileMenu from "./AuthProfileMenu";

export default function Navbar() {
  return (
    <nav className="flex fixed text-white items-center w-full mx-auto px-5 py-2 shadow-md justify-between bg-stone-500">
      <Link href="/">Home</Link>
      <AuthProfileMenu />
    </nav>
  );
}
