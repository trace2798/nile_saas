import { z } from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      list_id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      tenant_id: z.string(),
    }),
  ),
  boardId: z.string(),
  tenant_id: z.string(),
});
