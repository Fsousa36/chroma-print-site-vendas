/**
 * CHROMA PRINT - ORQUESTRADOR CENTRAL DA APLICAÇÃO (APP.JS)
 * Interações de UI, Menu Acessível, Scrollspy, Accordions, Toasts e Animações
 */

/**
 * Toast Notification System Nobre
 */
function showToast(title, desc, type = "success") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === "success" ? "✓" : "✦"}</div>
    <div class="toast-content">
      <div class="toast-title">${escapeHTML(title)}</div>
      ${desc ? `<div class="toast-desc">${escapeHTML(desc)}</div>` : ""}
    </div>
    <button type="button" style="color: var(--text-muted); padding: 4px; font-size: 14px;" aria-label="Fechar aviso">✕</button>
  `;

  const closeBtn = toast.querySelector("button");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    });
  }

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    }
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------------
     1. MENU RESPONSIVO MOBILE ACESSÍVEL
  ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      menuToggle.innerHTML = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.innerHTML = "☰";
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. HEADER STICKY ELEVATION ON SCROLL
  ------------------------------------------------------------------------ */
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     3. SCROLLSPY DE NAVEGAÇÃO
  ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a[href^='#']");

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });

  /* ------------------------------------------------------------------------
     4. FAQ ACCORDION INTERATIVO
  ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Fecha outros accordions para manter ordem
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove("open");
        });
        item.classList.toggle("open", !isOpen);
      });
    }
  });

  /* ------------------------------------------------------------------------
     5. ANO ATUAL NO RODAPÉ
  ------------------------------------------------------------------------ */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     6. LINKS DE GABARITOS / POLÍTICAS COM INTERAÇÃO SUAVE
  ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-open-uploader]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = document.getElementById("uploaderModal");
      if (modal) {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeUploaderBtn = document.getElementById("closeUploaderModal");
  if (closeUploaderBtn) {
    closeUploaderBtn.addEventListener("click", () => {
      const modal = document.getElementById("uploaderModal");
      if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  const uploaderModal = document.getElementById("uploaderModal");
  if (uploaderModal) {
    uploaderModal.addEventListener("click", (e) => {
      if (e.target === uploaderModal) {
        uploaderModal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }
});
