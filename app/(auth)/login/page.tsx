import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FC } from "react";
import { UserAuthLoginForm } from "./_components/login-form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <Card className="min-w-sm max-w-md p-5 mt-24">
          <CardHeader className="text-2xl p-0 text-center">Log in</CardHeader>
          <UserAuthLoginForm />
          <CardFooter className="mt-3 text-sm">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-indigo-400 hover:underline">
              &nbsp;Sign Up
            </a>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default page;
