import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

export const seed = async (prisma: any) => {
  const users: Prisma.UserCreateInput[] = [
    {
      email: "alice.johnson@example.com",
      password: "password1",
      pets: {
        createMany: {
          data: [
            {
              name: "Buddy",
              age: 1,
              ownerName: "Alice Johnson",
              imageUrl:
                "https://plus.unsplash.com/premium_photo-1668208365386-4198381c6f6e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              notes: "Buddy is very playful and friendly.",
            },
            {
              name: "Charlie",
              age: 2,
              ownerName: "Alice Johnson",
              imageUrl: "https://unsplash.com/photos/charlie-dog",
              notes: "Charlie loves to run in the park.",
            },
            {
              name: "Daisy",
              age: 3,
              ownerName: "Alice Johnson",
              imageUrl: "https://unsplash.com/photos/daisy-dog",
              notes: "Daisy is very calm and loves to cuddle.",
            },
          ],
        },
      },
    },
    {
      email: "bob.smith@example.com",
      password: "password2",
      pets: {
        createMany: {
          data: [
            {
              name: "Whiskers",
              age: 2,
              ownerName: "Bob Smith",
              imageUrl:
                "https://unsplash.com/photos/black-and-white-cat-lying-on-brown-bamboo-chair-inside-room-gKXKBY-C-Dk",
              notes: "Whiskers is very lazy but can be very active at times.",
            },
            {
              name: "Shadow",
              age: 1,
              ownerName: "Bob Smith",
              imageUrl: "https://unsplash.com/photos/shadow-cat",
              notes: "Shadow loves to hide and pounce.",
            },
            {
              name: "Mittens",
              age: 3,
              ownerName: "Bob Smith",
              imageUrl: "https://unsplash.com/photos/mittens-cat",
              notes: "Mittens is very affectionate and loves to be petted.",
            },
          ],
        },
      },
    },
    {
      email: "carol.davis@example.com",
      password: "password3",
      pets: {
        createMany: {
          data: [
            {
              name: "Max",
              age: 3,
              ownerName: "Carol Davis",
              imageUrl:
                "https://unsplash.com/photos/long-coated-brown-dog-KZv7w34tluA",
              notes: "Max is very energetic and loves to play fetch.",
            },
            {
              name: "Bella",
              age: 2,
              ownerName: "Carol Davis",
              imageUrl: "https://unsplash.com/photos/bella-dog",
              notes: "Bella loves to swim and play in the water.",
            },
            {
              name: "Rocky",
              age: 1,
              ownerName: "Carol Davis",
              imageUrl: "https://unsplash.com/photos/rocky-dog",
              notes: "Rocky is very curious and loves to explore.",
            },
          ],
        },
      },
    },
  ];

  for (const user of users) {
    // take user password and hash it
    user.password = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: user,
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
