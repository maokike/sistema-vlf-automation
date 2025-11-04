-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('NUEVA_CONSTRUCCION', 'REMODELACION');

-- CreateEnum
CREATE TYPE "TestResult" AS ENUM ('APROBADO', 'FALLIDO', 'PENDIENTE');

-- CreateTable
CREATE TABLE "vlf_reports" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "cableLengthMeters" DOUBLE PRECISION NOT NULL,
    "resistanceOhms" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cableBrand" TEXT NOT NULL DEFAULT 'N/A',
    "workType" "WorkType" NOT NULL,
    "testVoltageVolts" INTEGER NOT NULL,
    "testResult" "TestResult" NOT NULL DEFAULT 'PENDIENTE',
    "testPointDescription" TEXT NOT NULL DEFAULT 'Subestación + Interconexión',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "vlf_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "vlf_reports" ADD CONSTRAINT "vlf_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
