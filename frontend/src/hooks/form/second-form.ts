import { useForm } from "react-hook-form";
import {
  secondFormSchema,
  type SecondFormData,
} from "../schema/second-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query"
import { createSendVerification } from "@/service/form/create-send-verification";

export function useSecondForm() {
  const form = useForm<SecondFormData>({
    resolver: zodResolver(secondFormSchema),
  });

  const {mutate, isPending} = useMutation({
    mutationKey: ['form'],
    mutationFn: (data: SecondFormData) => createSendVerification(data)
  })  
  
  return{form, isPending}
}
