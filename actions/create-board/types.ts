import { z } from "zod";
// import { Board } from "@prisma/client";
type Board = {
    id: string; // UUID
    tenant_id: string; // UUID
    title: string;
    imageId: string; // UUID
    imageThumbUrl: string | null;
    imageFullUrl: string | null;
    imageUserName: string | null;
    imageLinkHTML: string | null;
    createdAt: Date;
};


import { ActionState } from "@/lib/create-safe-action";

import { CreateBoard } from "./schema";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;