-- CreateTable
CREATE TABLE "VlfReport" (
    "id" SERIAL NOT NULL,
    "proyecto" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "distancia_cable" DOUBLE PRECISION NOT NULL,
    "resistencia" DOUBLE PRECISION NOT NULL,
    "marca_cable" TEXT NOT NULL,
    "voltaje" INTEGER NOT NULL,
    "fecha_prueba" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "punto_prueba" TEXT NOT NULL,

    CONSTRAINT "VlfReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
