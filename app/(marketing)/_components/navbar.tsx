import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";

export const Navbar = async () => {
  configureNile(cookies().get("authData"), null);
  console.log("showing tenants page for user: " + nile.userId);
  console.log(nile.userId);
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          {nile.userId ? (
            ""
          ) : (
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          <ModeToggle />
          {nile.userId ? (
            <Button size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/sign-up">Get Taskify for free</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
