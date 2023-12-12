// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { HelpCircle, User2 } from "lucide-react";

// import { Hint } from "@/components/hint";
// import { Skeleton } from "@/components/ui/skeleton";
// import { FormPopover } from "@/components/form/form-popover";
// import { MAX_FREE_BOARDS } from "@/constants/boards";
// import nile from "@/lib/NileServer";
// import { configureNile } from "@/lib/AuthUtils";
// import { cookies } from "next/headers";

// export const BoardListPersonal = async ({ user_id }: { user_id: string }) => {
//   console.log(user_id);
//   const boards = await nile
//     .db("board_personal")
//     .select("*")
//     .where({ user_id: user_id });
//   // .orderBy("created_at", "desc"); // no need for where clause because we previously set Nile context
//   console.log(boards.length);

//   // if (!boards.length === 0) {
//   //   return <div>No boards</div>;
//   // }
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//         {boards.map((board) => (
//           <Link
//             key={board.id}
//             href={`board/${board.id}`}
//             className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
//             style={{ backgroundImage: `url(${board.imagethumburl})` }}
//           >
//             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
//             <p className="relative font-semibold text-white">{board.title}</p>
//           </Link>
//         ))}
//         <FormPopover sideOffset={10} side="right">
//           <div
//             role="button"
//             className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
//           >
//             <p className="text-sm">Create new board</p>
//             <span className="text-xs">
//               {/* {isPro ? "Unlimited" : `${MAX_FREE_BOARDS - availableCount} remaining`} */}
//             </span>
//             <Hint
//               sideOffset={40}
//               description={`
//                 Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
//               `}
//             >
//               <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
//             </Hint>
//           </div>
//         </FormPopover>
//       </div>
//     </div>
//   );
// };

// BoardListPersonal.Skeleton = function SkeletonBoardList() {
//   return (
//     <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//     </div>
//   );
// };
import { FC } from "react";

interface BoardListPersonalProps {}

const BoardListPersonal: FC<BoardListPersonalProps> = ({}) => {
  return (
    <>
      <div>board-list-personal</div>
    </>
  );
};

export default BoardListPersonal;
