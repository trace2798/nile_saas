import { UserAuthForm } from "@/components/auth-form";
import GoogleAuthPanel from "@/components/google-auth-panel";
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
          <div className="relative flex justify-center text-sm my-5">
            <span className=" px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="mt-5 items-center flex justify-center flex-col">
            <GoogleAuthPanel />
          </div>
          <CardFooter className="mt-3 text-sm text-center flex items-center justify-center">
            <h1>
              {" "}
              Already have an account?{" "}
              <a href="/login" className="text-indigo-400 hover:underline">
                &nbsp;Login
              </a>
            </h1>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default page;
