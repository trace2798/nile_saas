import { Plus } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FormPopover } from "@/components/form/form-popover";
import UserAccountNav from "@/components/user-account-nav";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const Navbar = async () => {
  configureNile(cookies().get("authData"), null);
  if (!nile.userId) {
    redirect("/");
  }
  const userInfo = await nile.db("users.users").where("id", "=", nile.userId);
  console.log(userInfo);
  const email = userInfo[0].email;
  const picture = userInfo[0].picture;
  const name = userInfo[0].name;
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">

      <div className="flex items-center gap-x-4">
        <div className="flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm hidden md:block h-auto  py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm block md:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <UserAccountNav email={email} imageUrl={picture} name={name} />
      </div>
    </nav>
  );
};
