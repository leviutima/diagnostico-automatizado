import { progressSteps } from "@/utils/progress-steps";
import { useLocation } from "react-router-dom";

export default function ProgressBar() {
  const location = useLocation();
  const currentStep = progressSteps.indexOf(location.pathname);

  const progress = ((currentStep + 1) / progressSteps.length) * 100;

  return (
    <div className="w-full flex items-start justify-center flex-col gap-2">
      <p className="text-neutral-600">
        Formulário de diagnóstico empresarial - NCM Consultoria - Passo{" "}
        <span className="font-semibold">
          {currentStep + 1} / {progressSteps.length}
        </span>
      </p>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-4 bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
