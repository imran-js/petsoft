/*
  Warnings:

  - You are about to drop the column `userId` on the `Pet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/iib-webdevs/image/upload/v1592765719/DontDeleteMe/ditnoezhm8nng3ikagt0.jpg',
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pet" ("age", "createdAt", "id", "imageUrl", "name", "notes", "ownerName", "updatedAt") SELECT "age", "createdAt", "id", "imageUrl", "name", "notes", "ownerName", "updatedAt" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
