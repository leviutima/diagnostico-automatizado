import z from "zod";

export const EducationLevel = z.enum([
  "ENSINO_FUNDAMENTAL",
  "ENSINO_MEDIO",
  "ENSINO_SUPERIOR",
]);

export const Performance360Evaluation = z.enum(["YES", "NO", "NOT_APPLICABLE"]);

export const ManagementExperience = z.enum([
  "ONE_TO_FIVE_YEARS",
  "SIX_TO_TEN_YEARS",
  "MORE_THAN_TEN_YEARS",
]);

export const secondFormSchema = z.object({
  administrationPerception: z.string().min(1, "Percepção da administração é obrigatória"),
  personalFamilyRelationsComment: z.string().min(1, "Comentário sobre relações pessoais/familiares é obrigatório"),
  organizationalStructureDefined: z.boolean(),
  knowsMissionVisionCriticalFactors: z.boolean(),
  educationLevel: EducationLevel,
  managementAdjustsStructure: z.boolean(),
  hasPerformanceEvaluationPolicy: z.boolean(),
  hasHRManagementIndicators: z.boolean(),
  investsInTrainingPrograms: z.boolean(),
  performance360Evaluation: Performance360Evaluation,
  remunerationPolicyCompetitive: z.boolean(),
  performanceRewardExists: z.boolean(),
  managementExperience: ManagementExperience,
  goalsMethodology: z.string().optional(),
  hasClearCompetencies: z.boolean().optional(),
  improvementSuggestions: z.string().optional(),
});

export type SecondFormData = z.infer<typeof secondFormSchema>;
export type EducationLevelType = z.infer<typeof EducationLevel>;
export type Performance360EvaluationType = z.infer<typeof Performance360Evaluation>;
export type ManagementExperienceType = z.infer<typeof ManagementExperience>;
