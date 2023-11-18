import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteCard } from "./schema";
import { Card } from "@/types";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType, Card[]>;
