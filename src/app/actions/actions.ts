"use server";

import prisma from "@/lib/db";
import { sleeper } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function AddPet(formData) {
  await sleeper(2000);

  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://res.cloudinary.com/iib-webdevs/image/upload/v1592765719/DontDeleteMe/ditnoezhm8nng3ikagt0.jpg",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    console.log(error);
  }
}
