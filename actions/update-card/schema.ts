import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, {
        message: "Description is too short.",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(3, {
        message: "Title is too short",
      })
  ),
  id: z.string(),
  tenant_id: z.string(),
  list_id: z.string(),
  status: z.optional(
    z.string({
      required_error: "Status is required",
      invalid_type_error: "Description is required",
    })
  ),
  due_date: z.optional(
    z.string({
      required_error: "Due Date is required",
      invalid_type_error: "Description is required",
    })
  ),
  assign_id: z.optional(
    z.string({
      required_error: "Assignee Id is required",
      invalid_type_error: "Assignee Id is required",
    })
  ),
  assign_name: z.optional(
    z.string({
      required_error: "Assignee Id is required",
      invalid_type_error: "Assignee Id is required",
    })
  ),
});
