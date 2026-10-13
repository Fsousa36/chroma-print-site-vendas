/**
 * CHROMA PRINT - VALIDADOR & SIMULADOR DE PRÉ-IMPRESSÃO DE ARTE (PRE-FLIGHT)
 * Análise de Formatos (PDF, CDR, AI, PSD, PNG), Sangria, CMYK e 300 DPI
 */

function setupArtUploader() {
  const dropzone = document.getElementById("artDropzone");
  const fileInput = document.getElementById("artFileInput");
  const statusBox = document.getElementById("artStatusBox");

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener("click", () => fileInput.click());

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleArtworkFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleArtworkFile(e.target.files[0]);
    }
  });
}

function handleArtworkFile(file) {
  const statusBox = document.getElementById("artStatusBox");
  if (!statusBox) return;

  const validExtensions = ["pdf", "cdr", "ai", "psd", "tiff", "png", "jpg", "jpeg"];
  const extension = file.name.split(".").pop().toLowerCase();
  const isValidFormat = validExtensions.includes(extension);
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

  statusBox.style.display = "block";
  statusBox.innerHTML = `
    <div style="background: #ffffff; border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 18px; margin-top: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <strong style="color: var(--slate-ink); font-size: 0.95rem;">📄 ${escapeHTML(file.name)}</strong>
        <span class="badge ${isValidFormat ? 'badge-mint' : 'badge-orange'}">${isValidFormat ? 'Formato Aceito' : 'Atenção'}</span>
      </div>
      <p style="font-size: 0.775rem; color: var(--text-secondary); margin-bottom: 14px;">Tamanho: ${sizeMb} MB | Formato: .${extension.toUpperCase()}</p>
      
      <div class="checklist-list">
        <div class="checklist-item">
          <span style="color: var(--mint);">✓</span>
          <span><strong>Extensão gráfica:</strong> ${isValidFormat ? `Compatível com nosso RIP de impressão.` : `Recomendamos salvar em PDF/X-1a ou CDR/AI.`}</span>
        </div>
        <div class="checklist-item">
          <span style="color: var(--cyan);">✦</span>
          <span><strong>Perfil de Cores:</strong> Garanta que a arte foi criada em <strong>CMYK</strong> (evita alteração em tons de tela RGB).</span>
        </div>
        <div class="checklist-item">
          <span style="color: var(--yellow);">⚠</span>
          <span><strong>Sangria &amp; Margem:</strong> Mantenha 2mm de sangria e textos a 3mm da linha de corte.</span>
        </div>
        <div class="checklist-item">
          <span style="color: var(--mint);">✓</span>
          <span><strong>Fontes:</strong> Lembre-se de converter todos os textos em curvas/vetores.</span>
        </div>
      </div>

      <div style="margin-top: 18px; text-align: center;">
        <a class="btn btn-whatsapp btn-full" href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de enviar meu arquivo "${file.name}" para conferência da equipe técnica da Chroma Print.`)}" target="_blank" rel="noopener noreferrer">
          Encaminhar Arquivo no WhatsApp para Conferência Grátis →
        </a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", setupArtUploader);
