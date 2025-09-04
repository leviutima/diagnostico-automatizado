import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  firstFormSchema,
  type FirstFormData,
} from "../schema/first-form-schema";
import { usePayload } from "@/context/usePayloadForm";

export function useFirstForm() {
  const { setFormPayload } = usePayload();
  const form = useForm<FirstFormData>({
    resolver: zodResolver(firstFormSchema),
  });

  const onSubmit = (data: FirstFormData) => {
    setFormPayload(data)
  };

  return{onSubmit, form}
}
