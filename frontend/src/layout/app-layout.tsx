import { Outlet } from "react-router-dom";
import banner from "@/assets/banner.png";
import ProgressBar from "@/components/progress-bar";

export function AppLayout() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center p-10">
      <div>
        <div className="flex flex-col items-center gap-10">
          <img src={banner} alt="" />
          <p className="w-[1170px]">
            Realize o Diagnóstico Empresarial para a sua Empresa e aproveite
            essa oportunidade para que a sua organização fique cada dia mais
            competitiva nesse cenário VUCA, tendo um relatório completo de
            “Gestão e Cultura”, além da possibilidade de recomendação de um
            plano de ação da nossa consultoria para que a sua empresa tenha a
            possibilidade de implantar novas ferramentas de gestão e indicadores
            de desempenho visando a mudança de “Mindset” nesse cenário de
            transformações digitais!
          </p>
          <ProgressBar />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
