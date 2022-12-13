/*
  Warnings:

  - You are about to drop the column `time` on the `Slot` table. All the data in the column will be lost.
  - Added the required column `SlotTime` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextMonthSlotTime` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_userId_fkey";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "time",
ADD COLUMN     "SlotTime" TEXT NOT NULL,
ADD COLUMN     "nextMonthSlotTime" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
