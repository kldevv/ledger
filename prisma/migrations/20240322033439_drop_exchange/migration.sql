/*
  Warnings:

  - You are about to drop the column `exchange_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `exchanges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_exchange_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "exchange_id";

-- DropTable
DROP TABLE "exchanges";
