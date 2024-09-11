"use server";

import { PetEssentials, PetWithId } from "@/components/types/types";
import prisma from "@/lib/db";
import { sleeper } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function AddPet(petDate: PetEssentials) {
  await sleeper(2000);

  try {
    await prisma.pet.create({
      data: petDate,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return { error: "Something went wrong. could not add the Pet." };
  }
}

export async function GetSinglePet(petId: PetWithId["id"]) {
  await sleeper(2000);

  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    return pet;
  } catch (error) {
    return { error: "Something went wrong. could not get the Pet." };
  }
}
export async function DeletePet(petId: PetWithId["id"]) {
  await sleeper(2000);

  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return { error: "Something went wrong. could not delete the Pet." };
  }
}

export async function UpdatePet(
  petId: PetWithId["id"],
  NewPetData: PetEssentials
) {
  await sleeper(2000);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: NewPetData,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return { error: "Something went wrong. could not update the Pet." };
  }
}
