import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

export default async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={store} />
        <MainNav className="mx-6" />

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
