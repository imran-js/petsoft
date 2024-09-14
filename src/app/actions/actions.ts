"use server";
import { PetIdSchema } from "./../../lib/validations";

import { PetWithId } from "@/components/types/types";
import prisma from "@/lib/db";
import { sleeper } from "@/lib/utils";
import { FormSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function AddPet(petDate: unknown) {
  await sleeper(2000);

  const validatedPet = FormSchema.safeParse(petDate);
  if (!validatedPet.success) {
    return { error: validatedPet.error.errors[0].message };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return { error: "Something went wrong. could not add the Pet." };
  }
}

export async function GetSinglePet(petId: unknown) {
  await sleeper(2000);
  const validatedPetId = PetIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { error: "Invalid data" };
  }

  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: validatedPetId.data,
      },
    });

    return pet;
  } catch (error) {
    return { error: "Something went wrong. could not get the Pet." };
  }
}
export async function DeletePet(petId: unknown) {
  await sleeper(2000);
  const validatedPetId = PetIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { error: "Invalid data" };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return { error: "Something went wrong. could not delete the Pet." };
  }
}

export async function UpdatePet(petId: unknown, NewPetData: unknown) {
  await sleeper(2000);

  const validatedPetId = PetIdSchema.safeParse(petId);
  const validatedPet = FormSchema.safeParse(NewPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return { error: "Invalid data" };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return { error: "Something went wrong. could not update the Pet." };
  }
}
