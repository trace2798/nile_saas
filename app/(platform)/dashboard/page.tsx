import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center text-center">
        <Link href="/dashboard">
          <Card className="p-10">Personal(on the works)</Card>
        </Link>
        <Link href="/dashboard/organization">
          <Card className="p-10 ml-5">Organization</Card>
        </Link>
      </div>
    </>
  );
};

export default page;
