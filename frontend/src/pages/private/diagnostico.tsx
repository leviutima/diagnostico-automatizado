import { getUnique } from "@/service/diagnostico/get-unique";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import jsPDF from "jspdf";

function translateEducation(level: string) {
  switch (level) {
    case "ENSINO_FUNDAMENTAL":
      return "Ensino Fundamental";
    case "ENSINO_MEDIO":
      return "Ensino Médio";
    case "ENSINO_SUPERIOR":
      return "Ensino Superior";
    default:
      return level;
  }
}
function translatePerformance360(value: string) {
  switch (value) {
    case "YES":
      return "Sim";
    case "NO":
      return "Não";
    case "NOT_APPLICABLE":
      return "A empresa não faz essa avaliação";
    default:
      return value;
  }
}
function translateManagementExperience(value: string) {
  switch (value) {
    case "ONE_TO_FIVE_YEARS":
      return "1 a 5 anos";
    case "SIX_TO_TEN_YEARS":
      return "6 a 10 anos";
    case "MORE_THAN_TEN_YEARS":
      return "Mais de 10 anos";
    default:
      return value;
  }
}

export function Diagnostico() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [finalDiag, setFinalDiag] = useState("");

  if (!token || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="bg-white shadow rounded-xl p-10 text-center max-w-md">
          <h1 className="text-2xl font-semibold text-red-600">Acesso não autorizado</h1>
          <p className="mt-2 text-neutral-600">
            Você não tem permissão para visualizar este diagnóstico.
          </p>
        </div>
      </div>
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["diagnostico", id],
    queryFn: () => getUnique(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <p className="text-neutral-500 text-lg animate-pulse">Carregando diagnóstico...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <p className="text-red-500 text-lg">Diagnóstico não encontrado.</p>
      </div>
    );
  }

  const perguntas = [
    ["Percepção sobre a administração", data.administrationPerception],
    ["Relações pessoais e familiares", data.personalFamilyRelationsComment],
    ["Estrutura organizacional bem definida", data.organizationalStructureDefined === "true" ? "Sim" : "Não"],
    ["Direção ajusta estrutura conforme colaboradores", data.managementAdjustsStructure === "true" ? "Sim" : "Não"],
    ["Conhece missão, visão e fatores críticos", data.knowsMissionVisionCriticalFactors],
    ["Tempo de experiência na gestão", translateManagementExperience(data.managementExperience)],
    ["Indicadores de gestão de RH", data.hasHRManagementIndicators === "true" ? "Sim" : "Não"],
    ["Política de avaliação de desempenho", data.hasPerformanceEvaluationPolicy === "true" ? "Sim" : "Não"],
    ["Avaliação de desempenho 360 graus", translatePerformance360(data.performance360Evaluation)],
    ["Há recompensa por desempenho", data.performanceRewardExists === "true" ? "Sim" : "Não"],
    ["Clareza sobre competências necessárias", data.hasClearCompetencies === "true" ? "Sim" : "Não"],
    ["Política de remuneração competitiva", data.remunerationPolicyCompetitive === "true" ? "Sim" : "Não"],
    ["Escolaridade", translateEducation(data.educationLevel)],
    ["Investe em treinamentos e T&D", data.investsInTrainingPrograms === "true" ? "Sim" : "Não"],
    ["Metodologia para definição de metas", data.goalsMethodology],
    ["Pontos de melhoria e dificuldades", data.improvementSuggestions],
  ];

  function gerarPDF() {
    const doc = new jsPDF();
    let y = 25;

    // 🔹 Cabeçalho com faixa azul
    doc.setFillColor(0, 82, 155);
    doc.rect(0, 0, 210, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Diagnóstico Organizacional", 105, 13, { align: "center" });

    // Reset para corpo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    // Informações iniciais
    doc.setFont("helvetica", "normal");
    doc.text(`Empresa: ${data.enterprise}`, 20, y);
    y += 6;
    doc.text(
      `Colaborador: ${data.colaboratorName} ${data.colaboratorSurname}`,
      20,
      y
    );
    y += 10;

    // 🔹 Perguntas em blocos cinza
    perguntas.forEach(([pergunta, resposta]) => {
      // Caixa cinza clara
      const blockHeight = 20;
      doc.setFillColor(245, 245, 245);
      doc.rect(15, y - 4, 180, blockHeight, "F");

      // Pergunta (título azul escuro)
      doc.setTextColor(0, 51, 102);
      doc.setFont("helvetica", "bold");
      doc.text(`${pergunta}:`, 20, y);
      y += 6;

      // Resposta (texto cinza/preto)
      doc.setTextColor(50, 50, 50);
      doc.setFont("helvetica", "normal");
      const text = doc.splitTextToSize(resposta || "Não informado", 170);
      doc.text(text, 25, y);
      y += text.length * 6 + 8;

      if (y > 260) {
        doc.addPage();
        y = 25;
      }
    });

    // 🔹 Diagnóstico Final (em caixa destacada azul clara)
    doc.setFillColor(220, 235, 250);
    doc.rect(15, y - 4, 180, 40, "F");
    doc.setTextColor(0, 51, 102);
    doc.setFont("helvetica", "bold");
    doc.text("Diagnóstico Final:", 20, y);
    y += 6;
    doc.setFont("helvetica", "italic");
    doc.setTextColor(30, 30, 30);
    const diagText = doc.splitTextToSize(
      finalDiag || "Nenhum diagnóstico escrito",
      170
    );
    doc.text(diagText, 25, y);
    y += diagText.length * 6 + 10;

    // 🔹 Rodapé
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text(
      "Gerado por NCM Consultoria — " + new Date().toLocaleDateString(),
      105,
      290,
      { align: "center" }
    );

    doc.save(`diagnostico-${data.enterprise}.pdf`);
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Diagnóstico Organizacional
          </h1>
          <p className="text-neutral-600">
            <span className="font-medium">Empresa:</span> {data.enterprise} —{" "}
            <span className="font-medium">Colaborador:</span>{" "}
            {data.colaboratorName} {data.colaboratorSurname}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perguntas.map(([pergunta, resposta], i) => (
            <div
              key={i}
              className="bg-white border border-neutral-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-medium text-neutral-800 mb-1">
                {pergunta}
              </h3>
              <p className="text-neutral-600">{resposta || "Não informado"}</p>
            </div>
          ))}
        </div>

        {/* Campo de diagnóstico final */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            Diagnóstico Final
          </h2>
          <textarea
            value={finalDiag}
            onChange={(e) => setFinalDiag(e.target.value)}
            placeholder="Escreva aqui sua análise final com base nas respostas acima..."
            className="w-full min-h-[150px] border border-neutral-300 rounded-lg p-3 text-sm outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={gerarPDF}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Gerar PDF
          </button>
        </div>
      </div>
    </div>
  );
}
