import { Pet } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";

// const prisma = new PrismaClient();

export const seed = async (prisma: any) => {
  const pets = [
    {
      name: "Dog 1",
      age: 1,
      ownerName: "Owner 1",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1668208365386-4198381c6f6e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes:
        "I have a rabbit and my rabbit is very lazy and my rabbit is very active and my rabbit is very friendly",
    },
    {
      name: "Cat 1",
      age: 2,
      ownerName: "Owner 2",
      imageUrl:
        "https://unsplash.com/photos/black-and-white-cat-lying-on-brown-bamboo-chair-inside-room-gKXKBY-C-Dk",
      notes:
        "I have a Cat and my rabbit is very lazy and my rabbit is very active and my rabbit is very friendly",
    },
    {
      name: "Dog 3",
      age: 3,
      ownerName: "Owner 3",
      imageUrl: "https://unsplash.com/photos/long-coated-brown-dog-KZv7w34tluA",
      notes:
        "I have a Dog and my rabbit is very lazy and my rabbit is very active and my rabbit is very friendly",
    },
  ];

  for (const pet of pets) {
    await prisma.pet.create({
      data: pet,
    });
  }
};

// Run the seed function to seed the database
export const main = async () => {
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  try {
    await seed(prisma);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
