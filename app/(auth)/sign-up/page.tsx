import { UserAuthForm } from "@/components/auth-form";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <Card className="min-w-sm max-w-md p-5 mt-24">
          <CardHeader className="text-2xl p-0 text-center">Sign up</CardHeader>
          <UserAuthForm />
          <CardFooter className="mt-3 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 hover:underline">
              &nbsp;Login
            </a>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default page;
