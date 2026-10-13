/**
 * CHROMA PRINT - MOTOR DE CATÁLOGO & CONFIGURADOR DE PRODUTO
 * Filtros em Tempo Real, Busca Inteligente e Modal de Personalização
 */

let selectedProduct = null;
let currentTiragem = null;
let currentFinish = null;

/**
 * Renderiza os cards de produtos na vitrine
 */
function renderProductGrid(filterCategory = "todos", searchQuery = "") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const normalizedSearch = searchQuery.toLowerCase().trim();

  const filtered = PRODUCTS_DATA.filter(prod => {
    const matchesCategory = filterCategory === "todos" || prod.category === filterCategory;
    const matchesSearch = !normalizedSearch || 
      prod.name.toLowerCase().includes(normalizedSearch) ||
      prod.description.toLowerCase().includes(normalizedSearch) ||
      prod.categoryLabel.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px;">
        <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 12px;">Nenhum produto encontrado para essa pesquisa.</p>
        <button class="btn btn-outline btn-sm" onclick="clearFilters()">Limpar filtros e busca</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => `
    <article class="product-card" data-category="${escapeHTML(prod.category)}" id="prod-${escapeHTML(prod.id)}">
      <div class="product-image-wrap">
        <img class="product-image" src="${escapeHTML(prod.image)}" alt="${escapeHTML(prod.name)}" loading="lazy">
        ${prod.label ? `<span class="product-label ${escapeHTML(prod.labelClass || '')}">${escapeHTML(prod.label)}</span>` : ""}
      </div>

      <div class="product-content">
        <div class="product-category">${escapeHTML(prod.categoryLabel)}</div>
        <h3 class="product-title">${escapeHTML(prod.name)}</h3>
        <p class="product-description">${escapeHTML(prod.description)}</p>

        <div class="product-specs">
          ${prod.specs.slice(0, 3).map(s => `<span class="spec-pill">${escapeHTML(s)}</span>`).join("")}
        </div>

        <div class="product-price-box">
          <div class="product-price-label">A partir de</div>
          <div class="product-price">
            ${formatMoney(prod.basePrice)}
            <small>/ lote inicial</small>
          </div>
        </div>

        <div class="product-actions-group">
          <button type="button" class="product-buy" onclick="openProductModal('${escapeHTML(prod.id)}')">
            <span>⚙️</span> Personalizar
          </button>
          <button type="button" class="product-quick-view" onclick="quickAddProduct('${escapeHTML(prod.id)}')" title="Adição Rápida" aria-label="Adicionar ${escapeHTML(prod.name)} ao carrinho">
            ＋
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/**
 * Adiciona rapidamente o lote base ao carrinho
 */
function quickAddProduct(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const defaultTiragem = prod.tiragens && prod.tiragens.length > 0 ? prod.tiragens[0].label : "1 lote";
  const defaultFinish = prod.finishes && prod.finishes.length > 0 ? prod.finishes[0].name : "Padrão";

  addItemToCart({
    productId: prod.id,
    name: prod.name,
    image: prod.image,
    category: prod.categoryLabel,
    tiragem: defaultTiragem,
    finish: defaultFinish,
    price: prod.basePrice,
    quantity: 1
  });
}

/**
 * Abre o Modal de Personalização e Cálculo de Tiragens
 */
function openProductModal(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  selectedProduct = prod;
  currentTiragem = prod.tiragens && prod.tiragens.length > 0 ? prod.tiragens[0] : { qty: 1, price: prod.basePrice, label: "Padrão" };
  currentFinish = prod.finishes && prod.finishes.length > 0 ? prod.finishes[0] : { name: "Padrão", extra: 0 };

  const modal = document.getElementById("productModal");
  if (!modal) return;

  document.getElementById("modalProdTitle").textContent = prod.name;
  document.getElementById("modalProdImg").src = prod.image;
  document.getElementById("modalProdImg").alt = prod.name;
  document.getElementById("modalProdDesc").textContent = prod.description;

  // Tiragens
  const tiragensBox = document.getElementById("modalTiragens");
  if (tiragensBox && prod.tiragens) {
    tiragensBox.innerHTML = prod.tiragens.map((t, idx) => `
      <button type="button" class="tiragem-btn ${idx === 0 ? 'active' : ''}" onclick="selectTiragem(${idx})">
        <strong>${escapeHTML(t.label)}</strong>
        <small>${formatMoney(t.price)}</small>
      </button>
    `).join("");
  }

  // Acabamentos
  const finishesSelect = document.getElementById("modalFinishes");
  if (finishesSelect && prod.finishes) {
    finishesSelect.innerHTML = prod.finishes.map((f, idx) => `
      <option value="${idx}">
        ${escapeHTML(f.name)} ${f.extra > 0 ? `(+ ${formatMoney(f.extra)})` : ''}
      </option>
    `).join("");
    finishesSelect.value = "0";
    finishesSelect.onchange = (e) => {
      const idx = Number(e.target.value);
      currentFinish = prod.finishes[idx];
      updateModalCalculatedPrice();
    };
  }

  const notesInput = document.getElementById("modalProdNotes");
  if (notesInput) notesInput.value = "";

  updateModalCalculatedPrice();

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function selectTiragem(index) {
  if (!selectedProduct || !selectedProduct.tiragens) return;
  currentTiragem = selectedProduct.tiragens[index];

  const btns = document.querySelectorAll("#modalTiragens .tiragem-btn");
  btns.forEach((b, idx) => {
    b.classList.toggle("active", idx === index);
  });

  updateModalCalculatedPrice();
}

function updateModalCalculatedPrice() {
  if (!currentTiragem) return;
  const finishExtra = (currentFinish && currentFinish.extra) ? currentFinish.extra : 0;
  const totalPrice = currentTiragem.price + finishExtra;

  const totalEl = document.getElementById("modalProdPriceTotal");
  if (totalEl) {
    totalEl.textContent = formatMoney(totalPrice);
  }
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function confirmAddModalProduct() {
  if (!selectedProduct || !currentTiragem) return;

  const finishExtra = (currentFinish && currentFinish.extra) ? currentFinish.extra : 0;
  const finalUnitPrice = currentTiragem.price + finishExtra;
  const notes = document.getElementById("modalProdNotes") ? document.getElementById("modalProdNotes").value.trim() : "";

  addItemToCart({
    productId: selectedProduct.id,
    name: selectedProduct.name,
    image: selectedProduct.image,
    category: selectedProduct.categoryLabel,
    tiragem: currentTiragem.label,
    finish: currentFinish ? currentFinish.name : "Padrão",
    notes: notes,
    price: finalUnitPrice,
    quantity: 1
  });

  closeProductModal();
}

function clearFilters() {
  const searchInput = document.getElementById("productSearch");
  if (searchInput) searchInput.value = "";

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === "todos");
  });

  renderProductGrid("todos", "");
}

// Inicializador de eventos
document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid("todos");

  // Filtros de Categoria
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;
      const searchVal = document.getElementById("productSearch") ? document.getElementById("productSearch").value : "";
      renderProductGrid(category, searchVal);
    });
  });

  // Busca em Tempo Real
  const searchInput = document.getElementById("productSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activeBtn = document.querySelector(".filter-btn.active");
      const category = activeBtn ? activeBtn.dataset.filter : "todos";
      renderProductGrid(category, e.target.value);
    });
  }

  // Links rápidos com data-category-link
  document.querySelectorAll("[data-category-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCategory = link.dataset.categoryLink;
      const matchingBtn = document.querySelector(`.filter-btn[data-filter="${targetCategory}"]`);
      if (matchingBtn) {
        matchingBtn.click();
      }
      const prodSection = document.getElementById("produtos");
      if (prodSection) prodSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Fechar modal
  const closeBtn = document.getElementById("closeProductModal");
  if (closeBtn) closeBtn.addEventListener("click", closeProductModal);

  const confirmBtn = document.getElementById("modalConfirmAdd");
  if (confirmBtn) confirmBtn.addEventListener("click", confirmAddModalProduct);

  const modalOverlay = document.getElementById("productModal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeProductModal();
    });
  }
});
