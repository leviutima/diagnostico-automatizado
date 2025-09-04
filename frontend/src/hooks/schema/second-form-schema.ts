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
  organizationalStructureDefined: z.string().min(1, "Estrutura organizacional definida é obrigatória"),
  knowsMissionVisionCriticalFactors: z.union([
    z.string().min(1, "Conhecimento da missão/visão/fatores críticos é obrigatório"),
    z.literal("partial")
  ]),
  educationLevel: EducationLevel,
  managementAdjustsStructure: z.string().min(1, "Ajuste da estrutura pela gestão é obrigatório"),
  hasPerformanceEvaluationPolicy: z.string().min(1, "Política de avaliação de desempenho é obrigatória"),
  hasHRManagementIndicators: z.string().min(1, "Indicadores de gestão de RH são obrigatórios"),
  investsInTrainingPrograms: z.string().min(1, "Investimento em programas de treinamento é obrigatório"),
  performance360Evaluation: Performance360Evaluation,
  remunerationPolicyCompetitive: z.string().min(1, "Política de remuneração competitiva é obrigatória"),
  performanceRewardExists: z.string().min(1, "Existência de recompensa por desempenho é obrigatória"),
  managementExperience: ManagementExperience,
  goalsMethodology: z.string().min(1, "Metodologia de metas é obrigatória"),
  hasClearCompetencies: z.string().min(1, "Competências claras são obrigatórias"),
  improvementSuggestions: z.string().min(1, "Sugestões de melhoria são obrigatórias"),
});

export type SecondFormData = z.infer<typeof secondFormSchema>;
export type EducationLevelType = z.infer<typeof EducationLevel>;
export type Performance360EvaluationType = z.infer<typeof Performance360Evaluation>;
export type ManagementExperienceType = z.infer<typeof ManagementExperience>;