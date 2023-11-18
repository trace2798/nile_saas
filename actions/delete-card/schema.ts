import { z } from "zod";

export const DeleteCard = z.object({
  id: z.string(),
  boardId: z.string(),
  tenant_id: z.string(),
});
