"use server";
import bcrypt from "bcryptjs";
import { PetIdSchema } from "./../../lib/validations";
import prisma from "@/lib/db";
import { sleeper } from "@/lib/utils";
import { FormSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function Login(FormDate: FormData) {
  const authData = Object.fromEntries(FormDate.entries());

  await signIn("credentials", authData);
  redirect("/app/dashboard");
}

export async function SignUp(FormDate: FormData) {
  try {
    const email = FormDate.get("email") as string;
    const password = FormDate.get("password") as string;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", FormDate);
    redirect("/app/dashboard");
  } catch (error) {
    return { error: "Something went wrong. could not sign up." };
  }
}

export async function SignOut() {
  await signOut();
}

export async function AddPet(petDate: unknown) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  await sleeper(2000);

  const validatedPet = FormSchema.safeParse(petDate);
  if (!validatedPet.success) {
    return { error: validatedPet.error.errors[0].message };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,

        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const validatedPetId = PetIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { error: "Invalid data" };
  }

  const pet = await prisma.pet.findUnique({
    where: { id: validatedPetId.data },
    select: { userId: true },
  });

  if (pet?.userId !== session.user.id) {
    return { error: "You are not authorized to delete this pet" };
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
