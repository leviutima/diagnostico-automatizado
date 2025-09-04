import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFirstForm } from "@/hooks/form/first-form";

export function FirstForm() {
  const { form, onSubmit } = useFirstForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="w-[1170px]">
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label className="text-[18px] text-neutral-500">Empresa *</Label>
          <input
            className="border border-neutral-400 outline-none p-1 w-full"
            {...register("enterprise")}
          />
          {errors.enterprise && (
            <span className="text-red-500 text-sm">
              {errors.enterprise.message}
            </span>
          )}
        </div>
        <div>
          <Label className="text-[18px] text-neutral-500">
            Área de atuação *
          </Label>
          <input
            className="border border-neutral-400 outline-none  p-1 w-full"
            {...register("fieldExpertise")}
          />
          {errors.fieldExpertise && (
            <span className="text-red-500 text-sm">
              {errors.fieldExpertise.message}
            </span>
          )}
        </div>
        <div>
          <Label className="text-[18px] text-neutral-500">
            Email do colaborador *
          </Label>
          <input
            {...register("colaboratorEmail")}
            className="border border-neutral-400 outline-none p-1 w-full"
          />
          {errors.colaboratorEmail && (
            <span className="text-red-500 text-sm">
              {errors.colaboratorEmail.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label className="text-[18px] text-neutral-500">
              Nome do colaborador *
            </Label>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                className="border border-neutral-400 outline-none p-1 w-full"
                {...register("colaboratorName")}
              />
              <Label className="text-neutral-500">Nome</Label>
              {errors.colaboratorName && (
                <span className="text-red-500 text-sm block">
                  {errors.colaboratorName.message}
                </span>
              )}
            </div>
            <div className="flex-1">
              <input
                className="border border-neutral-400 outline-none p-1 w-full"
                {...register("colaboratorSurname")}
              />
              <Label className="text-neutral-500">Sobrenome</Label>
              {errors.colaboratorSurname && (
                <span className="text-red-500 text-sm block">
                  {errors.colaboratorSurname.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <Label className="text-[18px] text-neutral-500">Cargo *</Label>
          <input
            className="border border-neutral-400 outline-none p-1 w-full"
            {...register("position")}
          />
          {errors.position && (
            <span className="text-red-500 text-sm">
              {errors.position.message}
            </span>
          )}
        </div>
        <Button className="bg-green-700 cursor-pointer" type="submit" >
          Enviar
        </Button>
      </form>
    </div>
  );
}