import { FC } from "react";
import { Navbar } from "../../_components/navbar";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
    <Navbar/>
      <div>Personal page</div>
    </>
  );
};

export default page;
