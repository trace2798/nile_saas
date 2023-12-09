import { Medal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";

const MarketingPage = () => {
  configureNile(cookies().get("authData"), null);
  console.log("showing tenants page for user: " + nile.userId);
  console.log(nile.userId);
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col")}>
        {/* <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          Manage Task Efficiently
        </div> */}
        <h1 className="text-3xl md:text-6xl text-center mb-6 font-switzerBold">
          Collab helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto font-switzerRegular"
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Collab.
      </div>
      {nile.userId ? (
        <Button size="lg" asChild className="mt-5">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button size="sm" asChild className="mt-5">
          <Link href="/sign-up">Get Taskify for free</Link>
        </Button>
      )}

    </div>
  );
};

export default MarketingPage;
