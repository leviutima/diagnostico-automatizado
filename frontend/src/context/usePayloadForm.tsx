import type { FirstFormData } from "@/hooks/schema/first-form-schema";
import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type payloadFormProps = {
  formPayload: FirstFormData | undefined;
  setFormPayload: Dispatch<SetStateAction<FirstFormData | undefined>>;
};

const PayloadContext = createContext<payloadFormProps | undefined>(undefined);

export function PayloadFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formPayload, setFormPayload] = useState<FirstFormData | undefined>(
    undefined
  );

  return (
    <PayloadContext.Provider value={{ formPayload, setFormPayload }}>
      {children}
    </PayloadContext.Provider>
  );
}

export function usePayload() {
  const context = useContext(PayloadContext);
  if (!context) {
    throw new Error("Erro no provider form payload");
  }
  return context;
}
