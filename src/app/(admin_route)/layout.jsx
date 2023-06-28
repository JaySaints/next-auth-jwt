import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function GuestLayout({ children }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const isAdmin = user?.role === "admin";
  if (!isAdmin) redirect("/auth/sign-in");

  return <>{children}</>;
}
