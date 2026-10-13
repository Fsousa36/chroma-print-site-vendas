/**
 * CHROMA PRINT - CALCULADORA & SIMULADOR DE M² DE FACHADAS E BANNERS
 * Cálculos em tempo real de Lona, Estrutura de Metalon e Instalação Comercial
 */

const CALC_PRICES = {
  materials: {
    "lona-440-fosca": { name: "Lona Fosca 440g Anti-Reflexo", pricePerM2: 65.00 },
    "lona-440-brilho": { name: "Lona Brilho 440g Cores Vivas", pricePerM2: 65.00 },
    "lona-510-front": { name: "Lona Frontlight 510g Pesada", pricePerM2: 85.00 },
    "lona-blackout": { name: "Lona Blackout (Bloqueio Total de Luz)", pricePerM2: 95.00 }
  },
  structures: {
    "none": { name: "Sem Estrutura (Apenas Lona com Ilhós)", pricePerLinearMeter: 0 },
    "metalon-20": { name: "Metalon Galvanizado 20x20 com Pintura", pricePerLinearMeter: 55.00 },
    "metalon-30": { name: "Metalon Galvanizado 30x30 Reforçado", pricePerLinearMeter: 75.00 }
  },
  installation: {
    baseFee: 180.00,
    perM2Fee: 40.00
  }
};

let currentCalcResult = {
  width: 3.0,
  height: 1.2,
  areaM2: 3.6,
  perimeter: 8.4,
  materialKey: "lona-440-fosca",
  structureKey: "metalon-20",
  hasInstallation: true,
  lonaTotal: 0,
  structureTotal: 0,
  installTotal: 0,
  grandTotal: 0
};

/**
 * Atualiza o cálculo da calculadora em tempo real
 */
function recalculateFacadeProject() {
  const widthInput = document.getElementById("calcWidth");
  const heightInput = document.getElementById("calcHeight");
  const materialSelect = document.getElementById("calcMaterial");
  const structureSelect = document.getElementById("calcStructure");
  const installCheckbox = document.getElementById("calcInstall");

  if (!widthInput || !heightInput) return;

  const width = Math.max(0.5, Math.min(25, parseFloat(widthInput.value) || 1));
  const height = Math.max(0.3, Math.min(10, parseFloat(heightInput.value) || 1));
  const materialKey = materialSelect ? materialSelect.value : "lona-440-fosca";
  const structureKey = structureSelect ? structureSelect.value : "metalon-20";
  const hasInstallation = installCheckbox ? installCheckbox.checked : false;

  const areaM2 = width * height;
  const perimeter = (width * 2) + (height * 2);

  const matInfo = CALC_PRICES.materials[materialKey] || CALC_PRICES.materials["lona-440-fosca"];
  const structInfo = CALC_PRICES.structures[structureKey] || CALC_PRICES.structures["none"];

  const lonaTotal = areaM2 * matInfo.pricePerM2;
  const structureTotal = perimeter * structInfo.pricePerLinearMeter;
  const installTotal = hasInstallation ? (CALC_PRICES.installation.baseFee + (areaM2 * CALC_PRICES.installation.perM2Fee)) : 0;
  const grandTotal = lonaTotal + structureTotal + installTotal;

  currentCalcResult = {
    width,
    height,
    areaM2,
    perimeter,
    materialKey,
    structureKey,
    hasInstallation,
    lonaTotal,
    structureTotal,
    installTotal,
    grandTotal
  };

  // Atualizar visual
  const elArea = document.getElementById("calcResultArea");
  const elPerimeter = document.getElementById("calcResultPerimeter");
  const elLonaPrice = document.getElementById("calcResultLona");
  const elStructPrice = document.getElementById("calcResultStruct");
  const elInstallPrice = document.getElementById("calcResultInstall");
  const elTotal = document.getElementById("calcResultGrandTotal");

  if (elArea) elArea.textContent = `${areaM2.toFixed(2)} m²`;
  if (elPerimeter) elPerimeter.textContent = `${perimeter.toFixed(2)} m`;
  if (elLonaPrice) elLonaPrice.textContent = formatMoney(lonaTotal);
  if (elStructPrice) elStructPrice.textContent = formatMoney(structureTotal);
  if (elInstallPrice) elInstallPrice.textContent = hasInstallation ? formatMoney(installTotal) : "Não inclusa";
  if (elTotal) elTotal.textContent = formatMoney(grandTotal);
}

/**
 * Envia o projeto da fachada direto para o WhatsApp oficial com todas as medidas
 */
function sendFacadeToWhatsApp() {
  recalculateFacadeProject();

  const matInfo = CALC_PRICES.materials[currentCalcResult.materialKey];
  const structInfo = CALC_PRICES.structures[currentCalcResult.structureKey];

  const lines = [
    `👋 Olá, Chroma Print! Calculei um projeto de fachada/comunicação visual pelo site e gostaria de um orçamento oficial:`,
    ``,
    `📐 *DIMENSÕES DO PROJETO:*`,
    `• Largura: ${currentCalcResult.width.toFixed(2)} m`,
    `• Altura: ${currentCalcResult.height.toFixed(2)} m`,
    `• Área Total: ${currentCalcResult.areaM2.toFixed(2)} m²`,
    `• Perímetro: ${currentCalcResult.perimeter.toFixed(2)} m lineares`,
    ``,
    `🛠️ *ESPECIFICAÇÕES TÉCNICAS:*`,
    `• Lona: ${matInfo.name} (${formatMoney(currentCalcResult.lonaTotal)})`,
    `• Estrutura: ${structInfo.name} (${formatMoney(currentCalcResult.structureTotal)})`,
    `• Instalação em Goiânia: ${currentCalcResult.hasInstallation ? `Sim (${formatMoney(currentCalcResult.installTotal)})` : "Não (Somente fabricação)"}`,
    ``,
    `💰 *VALOR ESTIMADO:* ${formatMoney(currentCalcResult.grandTotal)}`,
    ``,
    `Podem confirmar a viabilidade, prazo de produção e agendar visita ou envio de fotos do local? Obrigado!`
  ];

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Abre o Modal da Calculadora
 */
function openCalculatorModal() {
  const modal = document.getElementById("calculatorModal");
  if (!modal) return;
  recalculateFacadeProject();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCalculatorModal() {
  const modal = document.getElementById("calculatorModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Inicializador de eventos da Calculadora
document.addEventListener("DOMContentLoaded", () => {
  const calcInputs = ["calcWidth", "calcHeight", "calcMaterial", "calcStructure", "calcInstall"];
  calcInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", recalculateFacadeProject);
      el.addEventListener("change", recalculateFacadeProject);
    }
  });

  const sendBtn = document.getElementById("sendCalcWhatsApp");
  if (sendBtn) sendBtn.addEventListener("click", sendFacadeToWhatsApp);

  const openBtns = document.querySelectorAll(".btn-open-calc");
  openBtns.forEach(btn => btn.addEventListener("click", openCalculatorModal));

  const closeBtn = document.getElementById("closeCalculatorModal");
  if (closeBtn) closeBtn.addEventListener("click", closeCalculatorModal);

  const modalOverlay = document.getElementById("calculatorModal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeCalculatorModal();
    });
  }
});
