import { z } from "zod";

export const DeleteList = z.object({
  id: z.string(),
  boardId: z.string(),
  tenant_id: z.string(),
});
