-- CreateTable
CREATE TABLE "EmissionFactorMaster" (
    "id" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmissionFactorMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionFactorVersion" (
    "id" TEXT NOT NULL,
    "masterId" TEXT NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,
    "versionName" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validTo" TIMESTAMP(3),
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmissionFactorVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityData" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activityType" TEXT NOT NULL,
    "description" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "calculatedPcf" DOUBLE PRECISION,
    "emissionFactorVersionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmissionFactorMaster_activityType_key" ON "EmissionFactorMaster"("activityType");

-- CreateIndex
CREATE INDEX "EmissionFactorVersion_masterId_validFrom_idx" ON "EmissionFactorVersion"("masterId", "validFrom");

-- CreateIndex
CREATE INDEX "ActivityData_date_idx" ON "ActivityData"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");

-- AddForeignKey
ALTER TABLE "EmissionFactorVersion" ADD CONSTRAINT "EmissionFactorVersion_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "EmissionFactorMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_emissionFactorVersionId_fkey" FOREIGN KEY ("emissionFactorVersionId") REFERENCES "EmissionFactorVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
