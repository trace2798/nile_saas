import { z } from "zod";


import { ActionState } from "@/lib/create-safe-action";

import { CopyCard } from "./schema";
import { Card } from "@/types";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card[]>;
