import { useForm } from "react-hook-form";
import {
  secondFormSchema,
  type SecondFormData,
} from "../schema/second-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createSendVerification } from "@/service/form/create-send-verification";
import { usePayload } from "@/context/usePayloadForm";
import { toast } from "sonner";

export function useSecondForm() {
  const { formPayload } = usePayload();
  const form = useForm<SecondFormData>({
    resolver: zodResolver(secondFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["form"],
    mutationFn: (data: SecondFormData) => createSendVerification(data),
    onSuccess: () => {
      toast.success("Formulário enviando com sucesso")
      toast.message("O diagnóstico da sua empresa será realizada")
    }
  });

  const onSubmit = async (data: SecondFormData) => {
  const {
    colaboratorName,
    colaboratorSurname,
    colaboratorEmail,
    enterprise,
    fieldExpertise,
    position
  } = formPayload as any;

  const payload = {
    ...data,
    colaboratorName,
    colaboratorSurname,
    colaboratorEmail,
    enterprise,
    fieldExpertise,
    position,
  };
  console.log(payload);
  
  mutate(payload);
};

  return { form, isPending, onSubmit };
}
