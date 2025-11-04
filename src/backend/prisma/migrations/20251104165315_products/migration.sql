-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30),

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
