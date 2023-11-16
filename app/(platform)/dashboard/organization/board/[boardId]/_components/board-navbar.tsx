
// import { BoardTitleForm } from "./board-title-form";
// import { BoardOptions } from "./board-options";

import { BoardOptions } from "./board-options";
import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
  data: any ;
};

export const BoardNavbar = async ({
  data
}: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      {/* {data[0].title} */}
      <div className="ml-auto">
        <BoardOptions id={data[0].id} />
      </div>
    </div>
  );
};