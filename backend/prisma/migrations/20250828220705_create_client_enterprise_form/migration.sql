-- CreateEnum
CREATE TYPE "public"."EducationLevel" AS ENUM ('ENSINO_FUNDAMENTAL', 'ENSINO_MEDIO', 'ENSINO_SUPERIOR');

-- CreateEnum
CREATE TYPE "public"."Performance360Evaluation" AS ENUM ('YES', 'NO', 'NOT_APPLICABLE');

-- CreateEnum
CREATE TYPE "public"."ManagementExperience" AS ENUM ('ONE_TO_FIVE_YEARS', 'SIX_TO_TEN_YEARS', 'MORE_THAN_TEN_YEARS');

-- CreateTable
CREATE TABLE "public"."clientEnterprise" (
    "id" TEXT NOT NULL,
    "enterprise" TEXT NOT NULL,
    "fieldExpertise" TEXT NOT NULL,
    "colaboratorName" TEXT NOT NULL,
    "colaboratorSurname" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "administrationPerception" TEXT NOT NULL,
    "personalFamilyRelationsComment" TEXT NOT NULL,
    "organizationalStructureDefined" BOOLEAN NOT NULL,
    "knowsMissionVisionCriticalFactors" BOOLEAN NOT NULL,
    "educationLevel" "public"."EducationLevel" NOT NULL,
    "managementAdjustsStructure" BOOLEAN NOT NULL,
    "hasPerformanceEvaluationPolicy" BOOLEAN NOT NULL,
    "hasHRManagementIndicators" BOOLEAN NOT NULL,
    "investsInTrainingPrograms" BOOLEAN NOT NULL,
    "performance360Evaluation" "public"."Performance360Evaluation" NOT NULL,
    "remunerationPolicyCompetitive" BOOLEAN NOT NULL,
    "performanceRewardExists" BOOLEAN NOT NULL,
    "managementExperience" "public"."ManagementExperience" NOT NULL,
    "goalsMethodology" TEXT,
    "hasClearCompetencies" BOOLEAN NOT NULL,
    "improvementSuggestions" TEXT NOT NULL,

    CONSTRAINT "clientEnterprise_pkey" PRIMARY KEY ("id")
);
