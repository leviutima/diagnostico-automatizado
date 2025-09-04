import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSecondForm } from "@/hooks/form/second-form";

export function SecondForm() {
  const { form, isPending, onSubmit } = useSecondForm();

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
        {/* 1. Qual é sua percepção quanto à condução da administração da empresa? */}
        <div>
          <Label className="text-[18px] text-neutral-500">
            1. Qual é sua percepção quanto à condução da administração da empresa? *
          </Label>
          <textarea
            className="border border-neutral-400 outline-none p-1 w-full min-h-[80px]"
            {...register("administrationPerception")}
          />
          {errors.administrationPerception && (
            <span className="text-red-500 text-sm">
              {errors.administrationPerception.message}
            </span>
          )}
        </div>

        {/* 2. Como você vê as relações pessoais e familiares estabelecidas entre a Direção e os colaboradores? */}
        <div>
          <Label className="text-[18px] text-neutral-500">
            2. Como você vê as relações pessoais e familiares estabelecidas entre a Direção e os colaboradores? *
          </Label>
          <textarea
            className="border border-neutral-400 outline-none p-1 w-full min-h-[80px]"
            {...register("personalFamilyRelationsComment")}
          />
          {errors.personalFamilyRelationsComment && (
            <span className="text-red-500 text-sm">
              {errors.personalFamilyRelationsComment.message}
            </span>
          )}
        </div>

        {/* 3. Na sua opinião a empresa tem uma estrutura organizacional, papéis e funções bem definidos na área administrativa? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            3. Na sua opinião a empresa tem uma estrutura organizacional, papéis e funções bem definidos na área administrativa? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("organizationalStructureDefined")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("organizationalStructureDefined")}
              />
              <span>NÃO</span>
            </label>
          </div>
        </div>

        {/* 4. Você conhece a Missão e Visão e os fatores críticos de sucesso da empresa? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            4. Você conhece a Missão e Visão e os fatores críticos de sucesso da empresa? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("knowsMissionVisionCriticalFactors")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("knowsMissionVisionCriticalFactors")}
              />
              <span>NÃO</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="partial"
                {...register("knowsMissionVisionCriticalFactors")}
              />
              <span>Elas ainda existem</span>
            </label>
          </div>
        </div>

        {/* 5. Qual é sua escolaridade? */}
        <div>
          <Label className="text-[18px] text-neutral-500">
            5. Qual é sua escolaridade? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="ENSINO_FUNDAMENTAL"
                {...register("educationLevel")}
              />
              <span>Ensino Fundamental</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="ENSINO_MEDIO"
                {...register("educationLevel")}
              />
              <span>Ensino Médio</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="ENSINO_SUPERIOR"
                {...register("educationLevel")}
              />
              <span>Ensino Superior</span>
            </label>
          </div>
        </div>

        {/* 6. A Direção da empresa muda a estrutura, papéis e funções de acordo com os colaboradores? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            6. A Direção da empresa muda a estrutura, papéis e funções de acordo com os colaboradores? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("managementAdjustsStructure")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("managementAdjustsStructure")}
              />
              <span>NÃO</span>
            </label>
          </div>
          {errors.managementAdjustsStructure && (
            <span className="text-red-500 text-sm">
              {errors.managementAdjustsStructure.message}
            </span>
          )}
        </div>

        {/* 7. Existe uma política de avaliação do desempenho dos colaboradores vinculada ao resultado do negócio empresarial? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            7. Existe uma política de avaliação do desempenho dos colaboradores vinculada ao resultado do negócio empresarial? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("hasPerformanceEvaluationPolicy")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("hasPerformanceEvaluationPolicy")}
              />
              <span>NÃO</span>
            </label>
          </div>
          {errors.hasPerformanceEvaluationPolicy && (
            <span className="text-red-500 text-sm">
              {errors.hasPerformanceEvaluationPolicy.message}
            </span>
          )}
        </div>

        {/* 8. Existem indicadores gerenciais que possibilitam a melhor gestão dos Recursos Humanos? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            8. Existem indicadores gerenciais que possibilitam a melhor gestão dos Recursos Humanos? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("hasHRManagementIndicators")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("hasHRManagementIndicators")}
              />
              <span>NÃO</span>
            </label>
          </div>
          {errors.hasHRManagementIndicators && (
            <span className="text-red-500 text-sm">
              {errors.hasHRManagementIndicators.message}
            </span>
          )}
        </div>

        {/* 9. A empresa investe em capacitação para os colaboradores? Há programas de Treinamento e Desenvolvimento (T&D)? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            9. A empresa investe em capacitação para os colaboradores? Há programas de Treinamento e Desenvolvimento (T&D)? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("investsInTrainingPrograms")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("investsInTrainingPrograms")}
              />
              <span>NÃO</span>
            </label>
          </div>
          {errors.investsInTrainingPrograms && (
            <span className="text-red-500 text-sm">
              {errors.investsInTrainingPrograms.message}
            </span>
          )}
        </div>

        {/* 10. A empresa realiza a avaliação de desempenho 360 graus? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            10. A empresa realiza a avaliação de desempenho 360 graus? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="YES"
                {...register("performance360Evaluation")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="NO"
                {...register("performance360Evaluation")}
              />
              <span>NÃO</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="NOT_APPLICABLE"
                {...register("performance360Evaluation")}
              />
              <span>A empresa não faz essa avaliação</span>
            </label>
          </div>
          {errors.performance360Evaluation && (
            <span className="text-red-500 text-sm">
              {errors.performance360Evaluation.message}
            </span>
          )}
        </div>

        {/* 11. Você acha que a política de remuneração da sua empresa é competitiva? Ela é competitiva à sua função e atividade desempenhada? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            11. Você acha que a política de remuneração da sua empresa é competitiva? Ela é competitiva à sua função e atividade desempenhada? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("remunerationPolicyCompetitive")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("remunerationPolicyCompetitive")}
              />
              <span>NÃO</span>
            </label>
          </div>
          {errors.remunerationPolicyCompetitive && (
            <span className="text-red-500 text-sm">
              {errors.remunerationPolicyCompetitive.message}
            </span>
          )}
        </div>

        {/* 12. Há recompensa pelo seu desempenho em prol da melhoria dos resultados da empresa? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            12. Há recompensa pelo seu desempenho em prol da melhoria dos resultados da empresa? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("performanceRewardExists")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("performanceRewardExists")}
              />
              <span>NÃO</span>
            </label>
          </div>
          {errors.performanceRewardExists && (
            <span className="text-red-500 text-sm">
              {errors.performanceRewardExists.message}
            </span>
          )}
        </div>

        {/* 13. Quanto tempo você atua na gestão de empresas? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            13. Quanto tempo você atua na gestão de empresas? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="ONE_TO_FIVE_YEARS"
                {...register("managementExperience")}
              />
              <span>1 a 5 anos</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="SIX_TO_TEN_YEARS"
                {...register("managementExperience")}
              />
              <span>6 a 10 anos</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="MORE_THAN_TEN_YEARS"
                {...register("managementExperience")}
              />
              <span>mais de 10 anos</span>
            </label>
          </div>
          {errors.managementExperience && (
            <span className="text-red-500 text-sm">
              {errors.managementExperience.message}
            </span>
          )}
        </div> 


        {/* 14. Existem objetivos e metas claros para as áreas e para a empresa? Se sim, informe como é definida a metodologia para a definição dessas metas? */}
        <div>
          <Label className="text-[18px] text-neutral-500">
            14. Existem objetivos e metas claros para as áreas e para a empresa? Se sim, informe como é definida a metodologia para a definição dessas metas? *
          </Label>
          <textarea
            className="border border-neutral-400 outline-none p-1 w-full min-h-[60px]"
            {...register("goalsMethodology")}
            placeholder="Preencha com a metodologia de planejamento dos últimos 5 anos"
          />
          {errors.goalsMethodology && (
            <span className="text-red-500 text-sm">
              {errors.goalsMethodology.message}
            </span>
          )}
        </div>

        {/* 15. Na sua opinião há clareza com relação às competências que a organização necessita adquirir e fim de realizar seus objetivos organizacionais? */}
        <div>
          <Label className="text-[18px] text-neutral-500 mb-2 block">
            15. Na sua opinião há clareza com relação às competências que a organização necessita adquirir e fim de realizar seus objetivos organizacionais? *
          </Label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("hasClearCompetencies")}
              />
              <span>SIM</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("hasClearCompetencies")}
              />
              <span>NÃO</span>
            </label>
          </div>
          {errors.hasClearCompetencies && (
            <span className="text-red-500 text-sm">
              {errors.hasClearCompetencies.message}
            </span>
          )}
        </div>

        {/* 16. De forma geral, coloque aqui os pontos de vista acerca do que necessita ser melhorado as principais dificuldades da sua área de atuação para que a sua empresa seja cada vez mais competitiva. */}
        <div>
          <Label className="text-[18px] text-neutral-500">
            16. De forma geral, coloque aqui os pontos de vista acerca do que necessita ser melhorado as principais dificuldades da sua área de atuação para que a sua empresa seja cada vez mais competitiva. *
          </Label>
          <textarea
            className="border border-neutral-400 outline-none p-1 w-full min-h-[80px]"
            {...register("improvementSuggestions")}
          />
          {errors.improvementSuggestions && (
            <span className="text-red-500 text-sm">
              {errors.improvementSuggestions.message}
            </span>
          )}
        </div>

        <Button 
          className="bg-green-700 cursor-pointer" 
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
}