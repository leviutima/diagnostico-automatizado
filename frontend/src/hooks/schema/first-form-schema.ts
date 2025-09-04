
import z from "zod"

export const firstFormSchema = z.object({
  enterprise: z.string().min(1, "Nome da empresa é obrigatório"),
  fieldExpertise: z.string().min(1, "Área de expertise é obrigatória"),
  colaboratorEmail:z.string().email("Insira um email válido").nonempty("Email é obrigatório"),
  colaboratorName: z.string().min(1, "Nome do colaborador é obrigatório"),
  colaboratorSurname: z.string().min(1, "Sobrenome do colaborador é obrigatório"),
  position: z.string().min(1, "Cargo é obrigatório"),
})

export type FirstFormData = z.infer<typeof firstFormSchema>