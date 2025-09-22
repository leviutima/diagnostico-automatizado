import { getUnique } from "@/service/diagnostico/get-unique";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import jsPDF from "jspdf";

/** ====================== Traduções ====================== */
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

/** ====================== Layout (A4 Landscape) ====================== */
const PAGE_W = 297;
const PAGE_H = 210;

/** Paleta */
const BLUE_DARK    = [0, 51, 102];
const BLUE_BANNER  = [0, 82, 155];
const ORANGE_TOP   = [248, 167, 73];
const ORANGE_BOTTOM= [200, 107, 17];
const TEXT_BLACK   = [20, 20, 20];
const TEXT_WHITE   = [255, 255, 255];
const FOOTER_GRAY  = [120, 120, 120];

/** ====================== Utils PDF ====================== */
function gradientOrange(doc: jsPDF) {
  const steps = 80;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = Math.round(ORANGE_TOP[0] * (1 - t) + ORANGE_BOTTOM[0] * t);
    const g = Math.round(ORANGE_TOP[1] * (1 - t) + ORANGE_BOTTOM[1] * t);
    const b = Math.round(ORANGE_TOP[2] * (1 - t) + ORANGE_BOTTOM[2] * t);
    doc.setFillColor(r, g, b);
    doc.rect(0, (PAGE_H / steps) * i, PAGE_W, PAGE_H / steps + 0.5, "F");
  }
}
function rightStripes(doc: jsPDF) {
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1.2);
  const startX = PAGE_W - 110;
  const endX = PAGE_W - 15;
  const baseY = PAGE_H - 20;
  [0, 10, 20, 30].forEach(gap => {
    doc.line(startX + gap, baseY, endX + gap, baseY - 45);
  });
}
function titleBlue(doc: jsPDF, title: string, x = 18, y = 24, size = 28) {
  doc.setTextColor(...BLUE_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(size);
  doc.text(title, x, y);
}
function bullet(doc: jsPDF, text: string, x: number, y: number, maxW = PAGE_W - 60, fontSize = 14) {
  doc.setTextColor(...TEXT_BLACK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);
  const wrapped = doc.splitTextToSize(text, maxW - 14);
  doc.text("➤", x, y);
  doc.text(wrapped, x + 10, y);
  return y + wrapped.length * (fontSize * 0.5 + 1) + 6;
}
function footer(doc: jsPDF, text: string) {
  doc.setTextColor(...FOOTER_GRAY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(text, PAGE_W / 2, PAGE_H - 6, { align: "center" });
}

/** ====================== Imagens reais (opcional) ====================== */
async function urlToDataURL(url: string): Promise<string | null> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}
function drawRealImage(doc: jsPDF, dataURL: string | null, x = PAGE_W - 110, y = 30, w = 95, h = 130) {
  if (!dataURL) return;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x - 2, y - 2, w + 4, h + 4, 4, 4, "F");
  doc.addImage(dataURL, "PNG", x, y, w, h, undefined, "FAST");
}

/** ====================== Gráficos (canvas → imagem) ====================== */
function roundRect(ctx: CanvasRenderingContext2D, x:number,y:number,w:number,h:number,r:number) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y,   x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x,   y+h, r);
  ctx.arcTo(x,   y+h, x,   y,   r);
  ctx.arcTo(x,   y,   x+w, y,   r);
  ctx.closePath();
}
function makeCanvas(w=700,h=420) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  return c;
}
function chartPieYesNo(yes:number,no:number,na:number): string {
  const c = makeCanvas();
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#ffffff"; roundRect(ctx,20,20,660,380,16); ctx.fill();
  ctx.fillStyle = "#003366"; ctx.font = "bold 26px Helvetica"; ctx.fillText("Panorama de Respostas", 40, 60);
  const total = Math.max(yes+no+na,1);
  const cx = 220, cy = 230, r = 120;
  const colors = ["#1f77b4","#d62728","#999999"];
  const vals = [yes,no,na];
  const labels = ["Sim","Não","N/A"];
  let start= -Math.PI/2;
  vals.forEach((v,i)=>{
    const angle = (v/total)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.fillStyle = colors[i];
    ctx.arc(cx,cy,r,start,start+angle);
    ctx.closePath(); ctx.fill();
    start += angle;
  });
  labels.forEach((lb,i)=>{
    ctx.fillStyle=colors[i];
    ctx.fillRect(420,140+i*40,18,18);
    ctx.fillStyle="#333"; ctx.font="16px Helvetica";
    ctx.fillText(`${lb}: ${vals[i]} (${Math.round((vals[i]/total)*100)}%)`, 450, 154+i*40);
  });
  return c.toDataURL("image/png");
}
function chartBarsExperience(dist: Record<string,number>): string {
  const c = makeCanvas();
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#ffffff"; roundRect(ctx,20,20,660,380,16); ctx.fill();
  ctx.fillStyle = "#003366"; ctx.font = "bold 26px Helvetica"; ctx.fillText("Tempo de Experiência na Gestão", 40, 60);
  const cats = ["1 a 5 anos","6 a 10 anos","Mais de 10 anos","(Outro)"];
  const vals = [
    dist["1 a 5 anos"]||0,
    dist["6 a 10 anos"]||0,
    dist["Mais de 10 anos"]||0,
    dist["Outro"]||0
  ];
  const maxV = Math.max(...vals,1);
  const baseX = 90, baseY=340, bw=90, gap=30;
  vals.forEach((v,i)=>{
    const h = (v/maxV)*220;
    ctx.fillStyle = "#1f77b4";
    roundRect(ctx, baseX+i*(bw+gap), baseY-h, bw, h, 8); ctx.fill();
    ctx.fillStyle="#333"; ctx.font="14px Helvetica";
    ctx.fillText(String(v), baseX+i*(bw+gap)+bw/2-8, baseY-h-8);
    ctx.save();
    ctx.translate(baseX+i*(bw+gap)+bw/2, baseY+20);
    ctx.rotate(-Math.PI/6);
    ctx.fillText(cats[i], -40, 0);
    ctx.restore();
  });
  return c.toDataURL("image/png");
}

/** ====================== Heurística de insight local ====================== */
function generateInsight(question: string, answer: string) {
  const a = (answer || "").toLowerCase();
  if (!a || a === "não informado") {
    return [
      "Sem evidências suficientes para conclusão. Recomenda-se complementar informações e registrar responsáveis/prazos.",
      "Realizar nova rodada de entrevistas e coleta de métricas para fechamento de gaps."
    ];
  }
  if (a.includes("sim") || a.includes("transparente") || a.includes("boa")) {
    return [
      "Há aderência percebida à prática requerida. Manter cadência e institucionalizar lições aprendidas.",
      "Adicionar indicadores trimestrais para sustentar a maturidade e mitigar desvios."
    ];
  }
  if (a.includes("não") || a.includes("nao") || a.includes("falta") || a.includes("confusão")) {
    return [
      "Existem lacunas estruturais. Priorizar padronização de processos e definição clara de papéis.",
      "Plano de ação com metas SMART, responsáveis e comunicação interna para alinhamento."
    ];
  }
  if (a.includes("360")) {
    return [
      "Avaliação 360° presente/solicitada. Garantir periodicidade, devolutivas e planos individuais.",
      "Conectar resultados à trilha de T&D e às metas para reforçar meritocracia."
    ];
  }
  if (a.includes("treinamento") || a.includes("t&d")) {
    return [
      "Capacitação em curso. Formalizar trilhas por função e indicadores de eficácia.",
      "Alinhar competências críticas do negócio e metas de desempenho (KPIs)."
    ];
  }
  return [
    "Formalizar o processo com responsáveis, indicadores e cadência de revisão.",
    "Adotar gestão à vista (KPIs/OKRs) para dar visibilidade e promover accountability."
  ];
}

/** ====================== Slides ====================== */
function addCover(doc: jsPDF, enterprise: string) {
  doc.setFillColor(...BLUE_BANNER);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  doc.setTextColor(...TEXT_WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.text("Diagnóstico Empresarial", PAGE_W / 2, PAGE_H / 2 - 8, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text(enterprise, PAGE_W / 2, PAGE_H / 2 + 14, { align: "center" });
  footer(doc, "Relatório — gerado automaticamente");
}

function addQASlide(
  doc: jsPDF,
  idx: number,
  question: string,
  answer: string,
  note: string,
  verdict: string,
  imgDataURL: string | null
) {
  doc.addPage();
  gradientOrange(doc);

  // Título grande
  titleBlue(doc, `DIAGNÓSTICO — ${idx}.`, 18, 24, 26);

  // Pergunta
  doc.setTextColor(...BLUE_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  const q = doc.splitTextToSize(question, PAGE_W - 130);
  doc.text(q, 18, 42);

  // Resposta
  let y = 42 + q.length * 10 + 6;
  y = bullet(doc, `Resposta: ${answer || "Não informado"}`, 18, y, PAGE_W - 130, 16);

  // Classificação
  y = bullet(doc, `Classificação: ${verdict || "N/A"}`, 18, y, PAGE_W - 130, 14);

  // Observações
  if (note && note.trim().length) {
    y = bullet(doc, `Observações: ${note}`, 18, y, PAGE_W - 130, 14);
  }

  // Insight auxiliar
  const insights = generateInsight(question, answer || "Não informado");
  doc.setTextColor(...BLUE_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Análise & Encaminhamentos (sugestão):", 18, y + 8);
  y += 16;
  insights.forEach((t) => {
    y = bullet(doc, t, 18, y, PAGE_W - 130, 14);
  });

  // Imagem real à direita
  drawRealImage(doc, imgDataURL, PAGE_W - 110, 26, 95, 140);

  rightStripes(doc);
  footer(doc, "ncmconsultoria.com.br");
}

/** ====================== Componente ====================== */
type Verdict = "Aderente" | "Parcial" | "Não Aderente" | "N/A";

export function Diagnostico() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // UI State
  const [finalDiag, setFinalDiag] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "sim" | "nao" | "na" | "texto">("todos");

  // ➜ Preencha com suas imagens reais (URLs públicas)
  const imageUrls: string[] = [
    // "https://seu-host.com/imagens/slide-1.jpg",
    // "https://seu-host.com/imagens/slide-2.jpg",
    // ...
  ];

  if (!token || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="bg-white shadow rounded-xl p-10 text-center max-w-md">
          <h1 className="text-2xl font-semibold text-red-600">Acesso não autorizado</h1>
          <p className="mt-2 text-neutral-600">Você não tem permissão para visualizar este diagnóstico.</p>
        </div>
      </div>
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["diagnostico", id],
    queryFn: () => getUnique(id),
    enabled: !!id,
  });

  const perguntasBase: Array<[string, string]> = useMemo(() => {
    if (!data) return [];
    return [
      ["Qual a sua percepção quanto à condução da administração da empresa?", data.administrationPerception],
      ["Como você vê as relações pessoais e familiares estabelecidas entre a Direção e os colaboradores?", data.personalFamilyRelationsComment],
      ["Na sua opinião a empresa tem uma estrutura organizacional, papéis e funções bem definidos na área administrativa?", data.organizationalStructureDefined === "true" ? "Sim" : "Não"],
      ["A Direção da empresa muda a estrutura, papéis e funções de acordo com os colaboradores?", data.managementAdjustsStructure === "true" ? "Sim" : "Não"],
      ["Você conhece a Missão, a Visão e os fatores críticos de sucesso da empresa?", data.knowsMissionVisionCriticalFactors],
      ["Qual o seu tempo de experiência na gestão?", translateManagementExperience(data.managementExperience)],
      ["Existem indicadores gerenciais para melhor gestão de RH?", data.hasHRManagementIndicators === "true" ? "Sim" : "Não"],
      ["Existe uma política de avaliação de desempenho vinculada ao resultado do negócio?", data.hasPerformanceEvaluationPolicy === "true" ? "Sim" : "Não"],
      ["A empresa realiza a avaliação 360 graus?", translatePerformance360(data.performance360Evaluation)],
      ["Há recompensa pelo seu desempenho?", data.performanceRewardExists === "true" ? "Sim" : "Não"],
      ["Há clareza sobre as competências necessárias?", data.hasClearCompetencies === "true" ? "Sim" : "Não"],
      ["A política de remuneração é competitiva?", data.remunerationPolicyCompetitive === "true" ? "Sim" : "Não"],
      ["Qual sua escolaridade?", translateEducation(data.educationLevel)],
      ["A empresa investe em capacitação/T&D?", data.investsInTrainingPrograms === "true" ? "Sim" : "Não"],
      ["Metodologia para definição de metas", data.goalsMethodology],
      ["Pontos de melhoria e dificuldades", data.improvementSuggestions],
    ];
  }, [data]);

  // Estados por pergunta: observação e classificação
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [verdicts, setVerdicts] = useState<Record<number, Verdict>>({});

  function setNote(i: number, v: string) { setNotes(s => ({ ...s, [i]: v })); }
  function setVerdict(i: number, v: Verdict) { setVerdicts(s => ({ ...s, [i]: v })); }

  // Filtros e busca
  const perguntasFiltradas = useMemo(() => {
    const q = (search || "").toLowerCase();
    return perguntasBase
      .map(([p, r], i) => ({ i, pergunta: p, resposta: r || "Não informado" }))
      .filter(item => {
        // filtro tipo
        const val = item.resposta.toLowerCase();
        let pass = true;
        if (filter === "sim") pass = val.includes("sim");
        if (filter === "nao") pass = val.includes("não") || val.includes("nao");
        if (filter === "na") pass = val.includes("não informado") || val.includes("n/a") || val.includes("a empresa não faz");
        if (filter === "texto") pass = !(val === "sim" || val === "não" || val === "nao" || val.includes("não informado"));
        // busca
        if (q) {
          const inPerg = item.pergunta.toLowerCase().includes(q);
          const inResp = item.resposta.toLowerCase().includes(q);
          return pass && (inPerg || inResp);
        }
        return pass;
      });
  }, [perguntasBase, search, filter]);

  // Métricas para os gráficos do PDF
  function computeMetrics() {
    let yes = 0, no = 0, na = 0;
    const yesNoIdx = [2,3,6,7,9,10,11,13];
    yesNoIdx.forEach(i => {
      const v = (perguntasBase[i]?.[1] || "").toLowerCase();
      if (v.includes("sim")) yes++;
      else if (v.includes("não") || v.includes("nao")) no++;
      else na++;
    });
    const exp = (perguntasBase[5]?.[1] || "");
    const dist: Record<string,number> = { "1 a 5 anos":0,"6 a 10 anos":0,"Mais de 10 anos":0,"Outro":0 };
    if (dist[exp] !== undefined) dist[exp]++; else dist["Outro"]++;
    return { yes, no, na, dist };
  }

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

  /** ====================== PDF ====================== */
  async function gerarPDF() {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    // Capa
    addCover(doc, data.enterprise);

    // Pré-carrega imagens (opcional)
    const imgs = await Promise.all(imageUrls.map(urlToDataURL));

    // 1 slide por resposta (com sua classificação e observações)
    for (let idx = 0; idx < perguntasBase.length; idx++) {
      const [q, a] = perguntasBase[idx];
      const note = notes[idx] || "";
      const verdict = verdicts[idx] || "N/A";
      const img = imgs.length ? (imgs[idx % imgs.length] || null) : null;
      addQASlide(doc, idx + 1, q, a || "Não informado", note, verdict, img);
    }

    // Slide de gráficos
    doc.addPage();
    gradientOrange(doc);
    titleBlue(doc, "Indicadores do Diagnóstico", 18, 24, 26);

    const { yes, no, na, dist } = computeMetrics();
    const pie = chartPieYesNo(yes, no, na);
    const bars = chartBarsExperience(dist);

    doc.addImage(pie, "PNG", 18, 32, 130, 86, undefined, "FAST");
    doc.addImage(bars, "PNG", 155, 32, 130, 86, undefined, "FAST");

    doc.setTextColor(...BLUE_DARK);
    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("Sim vs Não vs N/A", 18, 126);
    doc.text("Tempo de Gestão", 155, 126);

    rightStripes(doc);
    footer(doc, "ncmconsultoria.com.br");

    // Diagnóstico Final
    doc.addPage();
    gradientOrange(doc);
    titleBlue(doc, "Diagnóstico Final", 18, 24, 26);
    bullet(doc, finalDiag || "Nenhum diagnóstico escrito.", 18, 42, PAGE_W - 40, 16);
    rightStripes(doc);
    footer(doc, "ncmconsultoria.com.br");

    // Agradecimento
    doc.addPage();
    gradientOrange(doc);
    titleBlue(doc, "Obrigado por tudo!", 18, PAGE_H / 2, 28);
    rightStripes(doc);
    footer(doc, "Website: ncmconsultoria.com.br  •  @ncmconsultoria  •  LinkedIn: Nivaldo Menezes");

    doc.save(`diagnostico-${data.enterprise}-analise.pdf`);
  }

  /** ====================== UI Helpers ====================== */
  function answerBadge(answer: string) {
    const v = (answer || "").toLowerCase();
    if (v.includes("sim")) return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Sim</span>;
    if (v.includes("não informado") || v.includes("n/a") || v.includes("a empresa não faz")) return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">N/A</span>;
    if (v.includes("não") || v.includes("nao")) return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Não</span>;
    return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Texto</span>;
  }

  function verdictSelect(i: number, value?: Verdict) {
    return (
      <select
        value={verdicts[i] || ""}
        onChange={(e) => setVerdict(i, (e.target.value as Verdict) || "N/A")}
        className="w-full md:w-auto border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white"
      >
        <option value="">Classificação</option>
        <option value="Aderente">Aderente</option>
        <option value="Parcial">Parcial</option>
        <option value="Não Aderente">Não Aderente</option>
        <option value="N/A">N/A</option>
      </select>
    );
  }

  /** ====================== RENDER ====================== */
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700">Diagnóstico Organizacional</h1>
            <p className="text-neutral-600 mt-1">
              <span className="font-medium">Empresa:</span> {data.enterprise} —{" "}
              <span className="font-medium">Colaborador:</span> {data.colaboratorName} {data.colaboratorSurname}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={gerarPDF}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Gerar PDF
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Buscar por pergunta ou resposta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-80 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilter("todos")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${filter==="todos"?"bg-blue-600 text-white border-blue-600":"border-neutral-300 text-neutral-700 hover:bg-neutral-50"}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter("sim")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${filter==="sim"?"bg-green-600 text-white border-green-600":"border-neutral-300 text-neutral-700 hover:bg-neutral-50"}`}
                >
                  Sim
                </button>
                <button
                  onClick={() => setFilter("nao")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${filter==="nao"?"bg-red-600 text-white border-red-600":"border-neutral-300 text-neutral-700 hover:bg-neutral-50"}`}
                >
                  Não
                </button>
                <button
                  onClick={() => setFilter("na")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${filter==="na"?"bg-neutral-700 text-white border-neutral-700":"border-neutral-300 text-neutral-700 hover:bg-neutral-50"}`}
                >
                  N/A
                </button>
                <button
                  onClick={() => setFilter("texto")}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${filter==="texto"?"bg-blue-700 text-white border-blue-700":"border-neutral-300 text-neutral-700 hover:bg-neutral-50"}`}
                >
                  Texto
                </button>
              </div>
            </div>

            {/* KPIs rápidos */}
            <div className="flex items-center gap-3">
              {["sim","nao","na","texto"].map(k => {
                const count = perguntasBase.filter(([,r])=>{
                  const v=(r||"").toLowerCase();
                  if (k==="sim") return v.includes("sim");
                  if (k==="nao") return v.includes("não")||v.includes("nao");
                  if (k==="na") return v.includes("não informado")||v.includes("n/a")||v.includes("a empresa não faz");
                  return !(v==="sim"||v==="não"||v==="nao"||v.includes("não informado"));
                }).length;
                const label = k==="sim"?"Sim":k==="nao"?"Não":k==="na"?"N/A":"Texto";
                const color = k==="sim"?"bg-green-100 text-green-700":k==="nao"?"bg-red-100 text-red-700":k==="na"?"bg-neutral-100 text-neutral-700":"bg-blue-100 text-blue-700";
                return <span key={k} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>{label}: {count}</span>;
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna principal com cartões */}
          <div className="lg:col-span-2 space-y-6">
            {perguntasFiltradas.map(({ i, pergunta, resposta }) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {i+1}. {pergunta}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      {answerBadge(resposta)}
                      {verdicts[i] && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          {verdicts[i]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">{verdictSelect(i, verdicts[i])}</div>
                </div>

                <div className="mt-4 rounded-lg bg-neutral-50 border border-neutral-200 p-4">
                  <p className="text-neutral-600">
                    <span className="font-medium text-neutral-800">Resposta:</span>{" "}
                    {resposta || "Não informado"}
                  </p>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-neutral-700">Observações / Evidências</label>
                  <textarea
                    value={notes[i] || ""}
                    onChange={(e) => setNote(i, e.target.value)}
                    placeholder="Escreva suas notas, evidências, links e decisões relacionadas a esta pergunta..."
                    className="mt-1 w-full min-h-[110px] border border-neutral-300 rounded-lg p-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            ))}

            {perguntasFiltradas.length === 0 && (
              <div className="text-center text-neutral-500 py-16">
                Nenhum item corresponde ao filtro/busca.
              </div>
            )}
          </div>

          {/* Painel lateral: Resumo e Diagnóstico Final */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-5">
              <h4 className="text-lg font-semibold text-neutral-900">Resumo da Análise</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-neutral-200 p-3">
                  <div className="text-neutral-500">Perguntas</div>
                  <div className="text-2xl font-bold text-neutral-800">{perguntasBase.length}</div>
                </div>
                <div className="rounded-lg border border-neutral-200 p-3">
                  <div className="text-neutral-500">Classificadas</div>
                  <div className="text-2xl font-bold text-neutral-800">
                    {Object.keys(verdicts).filter(k => verdicts[Number(k)]).length}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Aderente</span>
                  <span className="font-semibold">
                    {Object.values(verdicts).filter(v => v==="Aderente").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">Parcial</span>
                  <span className="font-semibold">
                    {Object.values(verdicts).filter(v => v==="Parcial").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-700">Não Aderente</span>
                  <span className="font-semibold">
                    {Object.values(verdicts).filter(v => v==="Não Aderente").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">N/A</span>
                  <span className="font-semibold">
                    {Object.values(verdicts).filter(v => v==="N/A").length}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700">Diagnóstico Final</label>
                <textarea
                  value={finalDiag}
                  onChange={(e) => setFinalDiag(e.target.value)}
                  placeholder="Escreva sua análise final consolidada (executivo)..."
                  className="mt-1 w-full min-h-[140px] border border-neutral-300 rounded-lg p-3 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <button
                onClick={gerarPDF}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Gerar PDF da Análise
              </button>

              <p className="text-xs text-neutral-500">
                Dica: use os filtros e a busca para organizar sua leitura e classificar mais rápido. Suas anotações entram no PDF.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
