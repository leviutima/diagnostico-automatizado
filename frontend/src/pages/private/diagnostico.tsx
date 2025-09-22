import { getUnique } from "@/service/diagnostico/get-unique";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import jsPDF from "jspdf";

/** Helpers de tradução iguais aos seus */
function translateEducation(level: string) {
  switch (level) {
    case "ENSINO_FUNDAMENTAL": return "Ensino Fundamental";
    case "ENSINO_MEDIO": return "Ensino Médio";
    case "ENSINO_SUPERIOR": return "Ensino Superior";
    default: return level;
  }
}
function translatePerformance360(value: string) {
  switch (value) {
    case "YES": return "Sim";
    case "NO": return "Não";
    case "NOT_APPLICABLE": return "A empresa não faz essa avaliação";
    default: return value;
  }
}
function translateManagementExperience(value: string) {
  switch (value) {
    case "ONE_TO_FIVE_YEARS": return "1 a 5 anos";
    case "SIX_TO_TEN_YEARS": return "6 a 10 anos";
    case "MORE_THAN_TEN_YEARS": return "Mais de 10 anos";
    default: return value;
  }
}

/** ------ PALETA (ajustada para bater com o slide) ------ */
const BLUE_DARK = [0, 51, 102];       // Títulos azuis
const BLUE_BANNER = [0, 82, 155];     // Capa azul
const ORANGE_TOP = [248, 167, 73];    // topo do degradê
const ORANGE_BOTTOM = [200, 107, 17]; // base do degradê
const TEXT_BLACK = [20, 20, 20];
const TEXT_WHITE = [255, 255, 255];
const FOOTER_GRAY = [120, 120, 120];

/** Desenha degradê laranja como no PPT (simulado com faixas) */
function drawOrangeGradient(doc: jsPDF) {
  const height = 297;
  const steps = 80; // mais steps => transição mais suave
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = Math.round(ORANGE_TOP[0] * (1 - t) + ORANGE_BOTTOM[0] * t);
    const g = Math.round(ORANGE_TOP[1] * (1 - t) + ORANGE_BOTTOM[1] * t);
    const b = Math.round(ORANGE_TOP[2] * (1 - t) + ORANGE_BOTTOM[2] * t);
    doc.setFillColor(r, g, b);
    doc.rect(0, (height / steps) * i, 210, height / steps + 0.5, "F");
  }
}

/** Linhas diagonais brancas no canto direito (iguais ao slide) */
function drawRightWhiteStripes(doc: jsPDF) {
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1.2);
  const startX = 160; // a partir do terço final da página
  const endX = 205;
  const baseY = 250;
  const gaps = [0, 8, 16, 24]; // múltiplas linhas paralelas
  gaps.forEach((gap) => {
    doc.line(startX + gap, baseY, endX + gap, baseY - 50);
  });
}

/** Bullet com seta do PPT */
function drawBulletText(doc: jsPDF, text: string, x: number, y: number, maxWidth = 170) {
  doc.setTextColor(TEXT_BLACK[0], TEXT_BLACK[1], TEXT_BLACK[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const wrapped = doc.splitTextToSize(text, maxWidth - 10);
  doc.text("➤", x, y);
  doc.text(wrapped, x + 7, y);
  return y + wrapped.length * 6 + 4;
}

/** Título grande azul do slide laranja */
function drawBlueTitle(doc: jsPDF, title: string, x = 18, y = 35) {
  doc.setTextColor(BLUE_DARK[0], BLUE_DARK[1], BLUE_DARK[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text(title, x, y);
}

/** Subtítulo/cabeçalho de seção “DIAGNÓSTICO” */
function drawSectionHeader(doc: jsPDF, title = "DIAGNÓSTICO", x = 18, y = 30) {
  doc.setTextColor(BLUE_DARK[0], BLUE_DARK[1], BLUE_DARK[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, x, y);
  return y + 8;
}

/** Rodapé com cinza */
function drawFooter(doc: jsPDF, text: string) {
  doc.setTextColor(FOOTER_GRAY[0], FOOTER_GRAY[1], FOOTER_GRAY[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(text, 105, 290, { align: "center" });
}

/** Slide capa (azul sólido, título central) */
function addCoverSlide(doc: jsPDF, enterprise: string) {
  doc.setFillColor(BLUE_BANNER[0], BLUE_BANNER[1], BLUE_BANNER[2]);
  doc.rect(0, 0, 210, 297, "F");
  doc.setTextColor(TEXT_WHITE[0], TEXT_WHITE[1], TEXT_WHITE[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("Diagnóstico Empresarial", 105, 135, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text(enterprise, 105, 150, { align: "center" });
  drawFooter(doc, "Relatório — gerado automaticamente");
}

/** Slide “Nivaldo Menezes, PhD” com bullets (conteúdo do PPT) */
function addBioSlide(doc: jsPDF) {
  doc.addPage();
  drawOrangeGradient(doc);
  drawBlueTitle(doc, "Nivaldo  Menezes, PhD", 18, 35);

  let y = 55;
  const x = 22;
  // Bullets conforme o PPT (resumo fiel)
  y = drawBulletText(
    doc,
    "Diretor Executivo na NCM Sistemas e Consultoria (ncmconsultoria.com.br)",
    x, y, 170
  );
  y = drawBulletText(
    doc,
    "Doutor em Psicologia Social (UK - Buenos Aires - Argentina), mestrado em Administração (FEA USP), Pós em Marketing (Mackenzie) e tecnólogo em Gestão de Negócios da Informação (FATEC Radial SP).",
    x, y, 170
  );
  y = drawBulletText(
    doc,
    "Foi Vice-Reitor de Pós-Graduação do Centro Universitário Estácio Radial de São Paulo e Gerente de Operações do Núcleo Capital-Estácio; Coordenador de MBAs (Empreendedorismo e Inovação; Gestão Estratégica de Pessoas – Harvard Business; Eng. de Segurança do Trabalho) e docente de Marketing Corporativo (MBA) e cursos livres do SENAC.",
    x, y, 170
  );
  y = drawBulletText(
    doc,
    "Mais de 15 anos de experiência em TI; projetos em empresas como SABESP e Cadbury Adams e em PMEs de ferramentaria, usinagem e autopeças do Grande ABC (Projeto APL em CRM).",
    x, y, 170
  );

  drawRightWhiteStripes(doc);
  drawFooter(doc, "Website: ncmconsultoria.com.br   •   LinkedIn: Nivaldo Menezes");
}

/** Slide genérico laranja com título + lista de bullets */
function addOrangeBulletsSlide(doc: jsPDF, title: string, bullets: string[]) {
  doc.addPage();
  drawOrangeGradient(doc);
  drawBlueTitle(doc, title, 18, 35);
  let y = 55;
  const x = 22;
  bullets.forEach((b) => {
    y = drawBulletText(doc, b, x, y, 170);
    if (y > 250) {
      drawRightWhiteStripes(doc);
      drawFooter(doc, "ncmconsultoria.com.br");
      doc.addPage();
      drawOrangeGradient(doc);
      drawBlueTitle(doc, title, 18, 35);
      y = 55;
    }
  });
  drawRightWhiteStripes(doc);
  drawFooter(doc, "ncmconsultoria.com.br");
}

/** Slide DIAGNÓSTICO com Q&A (numeração igual ao PPT) */
function addDiagnosticoSlides(doc: jsPDF, perguntas: Array<[string, string]>) {
  let idx = 0;
  while (idx < perguntas.length) {
    doc.addPage();
    drawOrangeGradient(doc);
    let y = drawSectionHeader(doc, "DIAGNÓSTICO", 18, 30);
    y += 8;
    const x = 22;

    for (; idx < perguntas.length; idx++) {
      const q = `${idx + 1}. ${perguntas[idx][0]}`;
      const a = perguntas[idx][1] || "Não informado";

      // Pergunta (azul)
      doc.setTextColor(BLUE_DARK[0], BLUE_DARK[1], BLUE_DARK[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      const qWrapped = doc.splitTextToSize(q, 170);
      doc.text(qWrapped, x, y);
      y += qWrapped.length * 6 + 2;

      // Resposta (bullet)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(TEXT_BLACK[0], TEXT_BLACK[1], TEXT_BLACK[2]);
      const aWrapped = doc.splitTextToSize(a, 165);
      doc.text("➤", x, y);
      doc.text(aWrapped, x + 7, y);
      y += aWrapped.length * 6 + 6;

      if (y > 250 && idx < perguntas.length - 1) break; // próxima página
    }

    drawRightWhiteStripes(doc);
    drawFooter(doc, "ncmconsultoria.com.br");
    idx++;
  }
}

/** Slide final “Obrigado por tudo!” */
function addThanksSlide(doc: jsPDF) {
  doc.addPage();
  drawOrangeGradient(doc);
  drawBlueTitle(doc, "Obrigado por tudo!", 18, 140);
  drawRightWhiteStripes(doc);
  drawFooter(doc, "Website: ncmconsultoria.com.br  •  @ncmconsultoria  •  LinkedIn: Nivaldo Menezes");
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

  const perguntas: Array<[string, string]> = [
    ["Qual a sua percepção quanto à condução da administração da empresa?",
      data.administrationPerception],
    ["Como você vê as relações pessoais e familiares estabelecidas entre a Direção e os colaboradores?",
      data.personalFamilyRelationsComment],
    ["Na sua opinião a empresa tem uma estrutura organizacional, papéis e funções bem definidos na área administrativa?",
      data.organizationalStructureDefined === "true" ? "Sim" : "Não"],
    ["A Direção da empresa muda a estrutura, papéis e funções de acordo com os colaboradores?",
      data.managementAdjustsStructure === "true" ? "Sim" : "Não"],
    ["Você conhece a Missão, a Visão e os fatores críticos de sucesso da empresa?",
      data.knowsMissionVisionCriticalFactors],
    ["Qual o seu tempo de experiência na gestão?",
      translateManagementExperience(data.managementExperience)],
    ["Existem indicadores gerenciais para melhor gestão de RH?",
      data.hasHRManagementIndicators === "true" ? "Sim" : "Não"],
    ["Existe uma política de avaliação de desempenho vinculada ao resultado do negócio?",
      data.hasPerformanceEvaluationPolicy === "true" ? "Sim" : "Não"],
    ["A empresa realiza a avaliação 360 graus?",
      translatePerformance360(data.performance360Evaluation)],
    ["Há recompensa pelo seu desempenho?",
      data.performanceRewardExists === "true" ? "Sim" : "Não"],
    ["Há clareza sobre as competências necessárias?",
      data.hasClearCompetencies === "true" ? "Sim" : "Não"],
    ["A política de remuneração é competitiva?",
      data.remunerationPolicyCompetitive === "true" ? "Sim" : "Não"],
    ["Qual sua escolaridade?",
      translateEducation(data.educationLevel)],
    ["A empresa investe em capacitação/T&D?",
      data.investsInTrainingPrograms === "true" ? "Sim" : "Não"],
    ["Metodologia para definição de metas",
      data.goalsMethodology],
    ["Pontos de melhoria e dificuldades",
      data.improvementSuggestions],
  ];

  /** --------- GERAÇÃO FIEL AO PPT --------- */
  function gerarPDF() {
    const doc = new jsPDF();

    // 1) CAPA (azul)
    addCoverSlide(doc, data.enterprise);

    // 2) SLIDE “Nivaldo Menezes, PhD” (bio e credenciais do PPT)
    addBioSlide(doc);

    // 3) SLIDE “O que oferecemos / missão/visão/valores” (resumo do PPT)
    addOrangeBulletsSlide(doc, "Nossa Missão",
      ["Ajudar clientes e parceiros a aperfeiçoar a gestão e aproveitar o conhecimento organizacional para melhores oportunidades de negócio."]);
    addOrangeBulletsSlide(doc, "Qual a Missão?",
      ["\"Toda missão deve orientar os objetivos financeiros, humanos e sociais da organização.\""]);
    addOrangeBulletsSlide(doc, "Qual a Visão?",
      ["Demonstra o norte da organização, seu propósito e a imagem ideal do futuro (curto/médio prazo)."]);
    addOrangeBulletsSlide(doc, "Quais são os Valores?",
      ["Convicções que norteiam o modus operandi: o que \"dizemos\" (valores) e o que \"fazemos\" (comportamentos)."]);

    // 4) DIAGNÓSTICO (perguntas/respostas, com visual do PPT)
    addDiagnosticoSlides(doc, perguntas);

    // 5) SUGESTÕES DOS FUNCIONÁRIOS (se houver texto do form/BD, usa; senão exemplo do PPT)
    const sugestoesFuncionarios: string[] = [];
    if (data.improvementSuggestions) {
      sugestoesFuncionarios.push(data.improvementSuggestions);
    } else {
      sugestoesFuncionarios.push(
        "Necessidade de definição clara de processos e funções; uso de ferramentas para tratar atividades de forma mais profissional.",
        "Organização, padronização de vendas e treinamentos.",
        "Processos gerenciais em todas as áreas; definição de atribuições; capacitação e execução sem pular etapas."
      );
    }
    addOrangeBulletsSlide(doc, "SUGESTÕES FEITAS PELOS FUNCIONÁRIOS", sugestoesFuncionarios);

    // 6) NOSSAS SUGESTÕES (conclusão do consultor) + seu diagnóstico final
    const nossasSugestoes = [
      "Planejamento estratégico e Forecast comercial.",
      "Metas SMART para todos; Gestão à Vista (KPIs).",
      "Integração de novos colaboradores com Job Description.",
      "Avaliação de Desempenho 360°; Plano de Cargos e Salários.",
      "PLR atrelado à meritocracia; reuniões semanais comerciais.",
      "Compras planejadas via previsão anual (Budget).",
      "Plano de ação por área; Farol e metas para Comercial.",
      "Política Comercial; contratação de vendedores técnicos.",
      "Organograma/Fluxograma e definição de processos; Trello para processos internos."
    ];
    addOrangeBulletsSlide(doc, "NOSSAS SUGESTÕES", nossasSugestoes);

    // 6.1) Diagnóstico Final (texto livre seu)
    addOrangeBulletsSlide(doc, "Diagnóstico Final",
      [finalDiag || "Nenhum diagnóstico escrito."]);

    // 7) Slide de agradecimento (igual ao PPT)
    addThanksSlide(doc);

    // Salvar
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

        {/* cards na tela web continuam iguais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perguntas.map(([pergunta, resposta], i) => (
            <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6">
              <h3 className="text-lg font-medium text-neutral-800 mb-1">{pergunta}</h3>
              <p className="text-neutral-600">{resposta || "Não informado"}</p>
            </div>
          ))}
        </div>

        {/* Diagnóstico final livre */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Diagnóstico Final</h2>
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
