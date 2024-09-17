import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";


export const PetIdSchema = z.string().uuid();

export const FormSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" })
      .max(20, { message: "Name must be at most 20 characters" }),
    ownerName: z
      .string({ message: "Owner name is required" })
      .min(3, { message: "Owner name must be at least 3 characters" })
      .max(20, { message: "Owner name must be at most 20 characters" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().url({ message: "Invalid url" }),
    ]),
    age: z.coerce.number().int().positive().max(999),
    notes: z.union([
      z.literal(""),
      z
        .string()
        .min(3, { message: "Notes must be at least 3 characters" })
        .max(1000, { message: "Notes must be at most 1000 characters" }),
    ]),
  })
  .transform((data) => {
    return {
      ...data,
      imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
    };
  });

export type TFormData = z.infer<typeof FormSchema>;
