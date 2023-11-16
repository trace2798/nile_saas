import { FC } from "react";
import { Navbar } from "./_components/navbar";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <div className="mt-24">Personal board page</div>
    </>
  );
};

export default page;
