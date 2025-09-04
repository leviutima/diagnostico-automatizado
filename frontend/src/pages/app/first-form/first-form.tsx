import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function FirstForm() {
  return (
    <div className="w-[1170px]">
      <form className="w-full flex flex-col gap-5">
        <div>
          <Label className="text-[18px] text-neutral-500">Empresa *</Label>
          <input className="border border-neutral-400 outline-none p-1 w-full" />
        </div>
        <div>
          <Label className="text-[18px] text-neutral-500">
            Área de atuação *
          </Label>
          <input className="border border-neutral-400 outline-none  p-1 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[18px] text-neutral-500">
            Nome do colaborador *
          </Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input className="border border-neutral-400 outline-none p-1 w-full" />
              <Label className="text-neutral-500">Nome</Label>
            </div>
            <div className="flex-1">
              <input className="border border-neutral-400 outline-none p-1 w-full" />
              <Label className="text-neutral-500">Sobrenome</Label>
            </div>
          </div>
        </div>
        <div>
          <Label className="text-[18px] text-neutral-500">Cargo *</Label>
          <input className="border border-neutral-400 outline-none p-1 w-full"/>
        </div>
        <Button className="bg-green-700 cursor-pointer" type="submit">Enviar</Button>
      </form>
    </div>
  );
}
