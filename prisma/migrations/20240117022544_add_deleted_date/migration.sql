-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "deletedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "deletedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "deletedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "deletedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "deletedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "deletedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Vault" ADD COLUMN     "deletedDate" TIMESTAMP(3);
