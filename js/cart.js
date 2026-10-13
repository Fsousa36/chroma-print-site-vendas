/**
 * CHROMA PRINT - MOTOR REATIVO DO CARRINHO DE COMPRAS
 * Persistência em LocalStorage, Gestão de Itens e Checkout Formatado via WhatsApp
 */

const CART_STORAGE_KEY = "chroma_print_cart_v2";

let cartState = [];

/**
 * Carrega o carrinho do LocalStorage
 */
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      cartState = JSON.parse(raw);
      if (!Array.isArray(cartState)) cartState = [];
    } else {
      cartState = [];
    }
  } catch (e) {
    console.error("Erro ao carregar carrinho:", e);
    cartState = [];
  }
  updateCartBadge();
}

/**
 * Salva o carrinho no LocalStorage
 */
function persistCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch (e) {
    console.error("Erro ao salvar carrinho:", e);
  }
  updateCartBadge();
}

/**
 * Atualiza o indicador numérico no cabeçalho
 */
function updateCartBadge() {
  const countEl = document.getElementById("cartCount");
  if (!countEl) return;
  const totalQty = cartState.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  countEl.textContent = totalQty;
  countEl.style.display = totalQty > 0 ? "grid" : "none";
}

/**
 * Adiciona um item ao carrinho
 */
function addItemToCart(item) {
  const existingIndex = cartState.findIndex(i => 
    i.productId === item.productId &&
    i.tiragem === item.tiragem &&
    i.finish === item.finish
  );

  if (existingIndex > -1) {
    cartState[existingIndex].quantity += (item.quantity || 1);
  } else {
    cartState.push({
      id: "item_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      productId: item.productId,
      name: item.name,
      image: item.image || "",
      category: item.category || "",
      tiragem: item.tiragem || "",
      finish: item.finish || "",
      notes: item.notes || "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1
    });
  }

  persistCart();
  renderCartDrawer();
  openCartDrawer();

  if (typeof showToast === "function") {
    showToast("Produto Adicionado!", `${item.name} foi colocado no carrinho.`, "success");
  }
}

/**
 * Atualiza a quantidade de um item
 */
function updateItemQuantity(itemId, delta) {
  const item = cartState.find(i => i.id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cartState = cartState.filter(i => i.id !== itemId);
  }

  persistCart();
  renderCartDrawer();
}

/**
 * Remove um item do carrinho
 */
function removeItemFromCart(itemId) {
  const item = cartState.find(i => i.id === itemId);
  cartState = cartState.filter(i => i.id !== itemId);
  persistCart();
  renderCartDrawer();

  if (typeof showToast === "function" && item) {
    showToast("Item removido", `${item.name} foi removido do carrinho.`, "info");
  }
}

/**
 * Esvazia o carrinho
 */
function clearCart() {
  cartState = [];
  persistCart();
  renderCartDrawer();
}

/**
 * Renderiza o Drawer lateral do carrinho
 */
function renderCartDrawer() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalContainer = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutButton");

  if (!cartItemsContainer) return;

  const total = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartTotalContainer) {
    cartTotalContainer.textContent = formatMoney(total);
  }

  if (cartState.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon" aria-hidden="true">🛒</div>
        <h3>Seu carrinho está vazio</h3>
        <p>Explore nossas opções de cartões, panfletos, banners e adesivos para começar seu pedido.</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 18px;" onclick="closeCartDrawer(); window.location.hash = '#produtos';">
          Explorar Produtos →
        </button>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  cartItemsContainer.innerHTML = cartState.map(item => `
    <article class="cart-item" data-id="${escapeHTML(item.id)}">
      <img class="cart-item-img" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy">
      
      <div class="cart-item-body">
        <h3 class="cart-item-title">${escapeHTML(item.name)}</h3>
        <div class="cart-item-meta">
          ${item.tiragem ? `<span>📦 ${escapeHTML(item.tiragem)}</span><br>` : ""}
          ${item.finish ? `<span>✨ ${escapeHTML(item.finish)}</span>` : ""}
        </div>

        <div class="cart-item-bottom">
          <div class="cart-qty-control" aria-label="Controle de quantidade">
            <button type="button" class="cart-qty-btn" onclick="updateItemQuantity('${escapeHTML(item.id)}', -1)" aria-label="Diminuir quantidade">−</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button type="button" class="cart-qty-btn" onclick="updateItemQuantity('${escapeHTML(item.id)}', 1)" aria-label="Aumentar quantidade">＋</button>
          </div>

          <div class="cart-item-price">
            ${formatMoney(item.price * item.quantity)}
          </div>
        </div>
      </div>

      <button type="button" class="cart-item-remove" onclick="removeItemFromCart('${escapeHTML(item.id)}')" aria-label="Remover ${escapeHTML(item.name)}">
        ✕
      </button>
    </article>
  `).join("");
}

/**
 * Controle de Abertura / Fechamento do Drawer
 */
function openCartDrawer() {
  const overlay = document.getElementById("cartOverlay");
  if (!overlay) return;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const closeBtn = document.getElementById("closeCart");
  if (closeBtn) closeBtn.focus();
}

function closeCartDrawer() {
  const overlay = document.getElementById("cartOverlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/**
 * Finalização do Pedido via WhatsApp Oficial
 */
function checkoutViaWhatsApp() {
  if (cartState.length === 0) {
    if (typeof showToast === "function") {
      showToast("Carrinho vazio", "Adicione pelo menos um produto antes de finalizar.", "info");
    }
    return;
  }

  const total = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const itemsList = cartState.map((item, index) => {
    let details = [];
    if (item.tiragem) details.push(`Tiragem: ${item.tiragem}`);
    if (item.finish) details.push(`Acabamento: ${item.finish}`);
    if (item.notes) details.push(`Obs: ${item.notes}`);
    details.push(`Quantidade: ${item.quantity} pacote(s)`);
    details.push(`Valor: ${formatMoney(item.price * item.quantity)}`);

    return `${index + 1}. *${item.name}*\n   ${details.join("\n   ")}`;
  }).join("\n\n");

  const message = [
    `👋 Olá, equipe *Chroma Print*!`,
    `Gostaria de solicitar um orçamento/pedido dos seguintes itens selecionados no site:\n`,
    `📦 *ITENS ESCOLHIDOS:*`,
    itemsList,
    `\n───────────────`,
    `💰 *SUBTOTAL ESTIMADO:* ${formatMoney(total)}`,
    `📍 *LOCALIDADE:* Goiânia – GO e despachos`,
    `───────────────`,
    `Gostaria de confirmar o prazo de confecção, as formas de pagamento e orientações para envio da arte finalizada para conferência. Obrigado!`
  ].join("\n");

  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// Inicialização imediata
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderCartDrawer();

  const openCartBtn = document.getElementById("openCart");
  const closeCartBtn = document.getElementById("closeCart");
  const cartOverlay = document.getElementById("cartOverlay");
  const checkoutBtn = document.getElementById("checkoutButton");

  if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);

  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkoutViaWhatsApp);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartOverlay && cartOverlay.classList.contains("open")) {
      closeCartDrawer();
    }
  });
});
