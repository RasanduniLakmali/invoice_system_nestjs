/*
  Warnings:

  - You are about to alter the column `total_amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `unit_price` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "total_amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "InvoiceItem" ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);
