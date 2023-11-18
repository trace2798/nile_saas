import { z } from "zod";

export const CopyCard = z.object({
  id: z.string(),
  boardId: z.string(),
  list_id: z.string(),
  tenant_id: z.string(),
});
