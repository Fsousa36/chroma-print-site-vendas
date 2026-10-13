/**
 * CHROMA PRINT - CONFIGURAÇÃO GERAL & BANCO DE PRODUTOS
 * Gráfica Online e Comunicação Visual | Goiânia - GO
 */

const CONFIG = {
  storeName: "Chroma Print",
  slogan: "Gráfica Online e Comunicação Visual",
  whatsappNumber: "556293923931",
  whatsappFormatted: "(62) 9392-3931",
  email: "contato@chromaprint.com.br",
  city: "Goiânia – Goiás",
  address: "Atendimento presencial e despachos para todo o Brasil",
  currencyLocale: "pt-BR",
  currencyCode: "BRL"
};

/**
 * Catálogo Canônico de Produtos com Especificações Técnicas de Impressão
 */
const PRODUCTS_DATA = [
  {
    id: "cartao-tradicional",
    name: "Cartão de Visita Tradicional",
    category: "cartoes",
    categoryLabel: "Cartões de visita",
    label: "Mais procurado",
    labelClass: "primary",
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=700&q=80",
    description: "Cartão em papel Couché 300g com impressão de altíssima definição. Escolha entre verniz total ou frente.",
    specs: ["Couché 300g", "9x5 cm", "4x4 Cores CMYK", "Corte Reto"],
    basePrice: 79.90,
    tiragens: [
      { qty: 100, price: 79.90, label: "100 un." },
      { qty: 250, price: 99.90, label: "250 un." },
      { qty: 500, price: 139.90, label: "500 un." },
      { qty: 1000, price: 189.90, label: "1.000 un." }
    ],
    finishes: [
      { name: "Verniz Total Frente (UV Brilho)", extra: 0 },
      { name: "Verniz Total Frente e Verso", extra: 15.00 },
      { name: "Sem Verniz (Acabamento Fosco Natural)", extra: 0 }
    ]
  },
  {
    id: "cartao-nobre-verniz-localizado",
    name: "Cartão Nobre com Verniz Localizado",
    category: "cartoes",
    categoryLabel: "Cartões de visita",
    label: "Linha Premium",
    labelClass: "cyan",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=700&q=80",
    description: "Laminação fosca aveludada (Soft Touch / BOPP) combinada com máscara de verniz localizado brilhante nos detalhes da sua marca.",
    specs: ["Couché 300g", "BOPP Fosco", "Verniz UV Local", "Cantos Opcionais"],
    basePrice: 149.90,
    tiragens: [
      { qty: 250, price: 149.90, label: "250 un." },
      { qty: 500, price: 199.90, label: "500 un." },
      { qty: 1000, price: 279.90, label: "1.000 un." }
    ],
    finishes: [
      { name: "Laminação Fosca + Verniz Localizado Frente e Verso", extra: 0 },
      { name: "Com Cantos Arredondados (4 Cantos)", extra: 25.00 },
      { name: "Com Detalhe Metalizado Hot Stamping Ouro/Prata", extra: 70.00 }
    ]
  },
  {
    id: "panfleto-promocional",
    name: "Panfletos Promocionais 10x14 cm",
    category: "panfletos",
    categoryLabel: "Panfletos e flyers",
    label: "Divulgação",
    labelClass: "orange",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80",
    description: "Divulgue ofertas, inaugurações, cardápios e lançamentos com excelente custo-benefício por milheiro.",
    specs: ["Couché 90g ou 115g", "10x14 cm", "4x0 ou 4x4", "Corte Reto"],
    basePrice: 129.90,
    tiragens: [
      { qty: 500, price: 129.90, label: "500 un." },
      { qty: 1000, price: 179.90, label: "1.000 un." },
      { qty: 2500, price: 299.90, label: "2.500 un." },
      { qty: 5000, price: 469.90, label: "5.000 un." }
    ],
    finishes: [
      { name: "Papel Couché 90g Brilho (Econômico)", extra: 0 },
      { name: "Papel Couché 115g Brilho (Mais encorpado)", extra: 30.00 },
      { name: "Papel Couché 150g Nobre", extra: 65.00 }
    ]
  },
  {
    id: "flyer-corporativo-15x21",
    name: "Flyer Nobre A5 (15x21 cm)",
    category: "panfletos",
    categoryLabel: "Panfletos e flyers",
    label: "Alta Visibilidade",
    labelClass: "pink",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=700&q=80",
    description: "Formato A5 espaçoso para cardápios, apresentações institucionais, eventos e tabelas de serviços.",
    specs: ["Couché 150g", "15x21 cm", "Impressão Fotográfica", "Dobra Opcional"],
    basePrice: 189.90,
    tiragens: [
      { qty: 500, price: 189.90, label: "500 un." },
      { qty: 1000, price: 269.90, label: "1.000 un." },
      { qty: 2500, price: 479.90, label: "2.500 un." }
    ],
    finishes: [
      { name: "Corte Reto Simples", extra: 0 },
      { name: "Com 1 Dobra / Vinco Central (Folder 4 Páginas)", extra: 40.00 }
    ]
  },
  {
    id: "banner-lona-bastao",
    name: "Banner Personalizado com Bastão e Cordão",
    category: "banners",
    categoryLabel: "Banners e lonas",
    label: "Personalizável",
    labelClass: "pink",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=700&q=80",
    description: "Lona 440g anti-reflexo com acabamento reforçado em madeira/bastão plástico e cordão para pendurar.",
    specs: ["Lona Fosca 440g", "Bastão + Ponteiras", "Cordão de Nylon", "Alta Resolução"],
    basePrice: 89.90,
    tiragens: [
      { qty: 1, price: 89.90, label: "1 un. (80x120cm)" },
      { qty: 2, price: 165.90, label: "2 un. (80x120cm)" },
      { qty: 5, price: 379.90, label: "5 un. (80x120cm)" }
    ],
    finishes: [
      { name: "Acabamento Bastão e Cordão (Pendurar)", extra: 0 },
      { name: "Acabamento com Ilhós em Toda a Borda", extra: 10.00 },
      { name: "Bainha Soldada Térmica Reforçada", extra: 15.00 }
    ]
  },
  {
    id: "banner-roll-up",
    name: "Banner Roll-Up Retrátil em Alumínio",
    category: "banners",
    categoryLabel: "Banners e lonas",
    label: "Eventos & Feiras",
    labelClass: "cyan",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=700&q=80",
    description: "Estrutura retrátil autoportante de alumínio anodizado. Montagem em menos de 30 segundos com bolsa de transporte inclusa.",
    specs: ["Estrutura Alumínio", "80x200 cm", "Lona Fotográfica", "Bolsa Inclusa"],
    basePrice: 289.90,
    tiragens: [
      { qty: 1, price: 289.90, label: "1 kit completo" },
      { qty: 2, price: 549.90, label: "2 kits completos" }
    ],
    finishes: [
      { name: "Estrutura + Lona Impressa Instalada", extra: 0 }
    ]
  },
  {
    id: "adesivo-vinil-personalizado",
    name: "Adesivos em Vinil com Recorte Eletrônico",
    category: "adesivos",
    categoryLabel: "Adesivos e etiquetas",
    label: "À prova d'água",
    labelClass: "primary",
    image: "https://images.unsplash.com/photo-1634942536790-2534dbf2e5c5?auto=format&fit=crop&w=700&q=80",
    description: "Adesivo vinílico resistente a sol, umidade e atrito. Corte computadorizado no formato exato da sua logomarca.",
    specs: ["Vinil Branco ou Transparente", "À prova d'água", "Meio-corte", "Resolução 1440 DPI"],
    basePrice: 59.90,
    tiragens: [
      { qty: 100, price: 59.90, label: "100 un. (5x5cm)" },
      { qty: 250, price: 99.90, label: "250 un. (5x5cm)" },
      { qty: 500, price: 159.90, label: "500 un. (5x5cm)" },
      { qty: 1000, price: 249.90, label: "1.000 un. (5x5cm)" }
    ],
    finishes: [
      { name: "Vinil Brilho à Prova D'água", extra: 0 },
      { name: "Vinil Fosco Acetinado", extra: 10.00 },
      { name: "Vinil Transparente Cristal", extra: 20.00 }
    ]
  },
  {
    id: "adesivo-perfurado-vitrine",
    name: "Adesivo Perfurado para Vidros e Veículos",
    category: "adesivos",
    categoryLabel: "Adesivos e etiquetas",
    label: "Fachadas & Frotas",
    labelClass: "orange",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=700&q=80",
    description: "Permite visualização externa da arte sem bloquear a visão de quem está dentro do comércio ou automóvel. Em conformidade com o Detran.",
    specs: ["Película 50/50", "Proteção UV", "Visão Unidirecional", "Sob Medida (m²)"],
    basePrice: 85.00,
    tiragens: [
      { qty: 1, price: 85.00, label: "1 m²" },
      { qty: 2, price: 160.00, label: "2 m²" },
      { qty: 3, price: 235.00, label: "3 m²" }
    ],
    finishes: [
      { name: "Impressão + Refile Reto", extra: 0 },
      { name: "Com Aplicação / Instalação em Goiânia", extra: 45.00 }
    ]
  },
  {
    id: "fachada-lona-metalon",
    name: "Fachada Comercial em Lona com Metalon",
    category: "fachadas",
    categoryLabel: "Comunicação visual",
    label: "Sob Medida",
    labelClass: "cyan",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=700&q=85",
    description: "Lona 440g anti-chamas esticada em quadro rígido de metalon galvanizado com pintura protetora. Orçamento preciso conforme dimensões e instalação.",
    specs: ["Metalon Galvanizado", "Lona 440g UV", "Ilhós / Abraçadeiras", "Instalação Opcional"],
    basePrice: 190.00,
    tiragens: [
      { qty: 1, price: 190.00, label: "Orçamento Base m²" }
    ],
    finishes: [
      { name: "Estrutura Metalon 20x20 + Lona Esticada", extra: 0 },
      { name: "Estrutura Reforçada Metalon 30x30", extra: 35.00 },
      { name: "Com Iluminação Frontlight (Refletores LED)", extra: 180.00 }
    ]
  },
  {
    id: "pasta-corporativa",
    name: "Pasta Corporativa com Bolsa e Vinco",
    category: "corporativo",
    categoryLabel: "Identidade Corporativa",
    label: "Executivo",
    labelClass: "primary",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80",
    description: "Pastas elegantes para propostas comerciais, contratos e apresentações. Inclui encaixe para cartão de visita.",
    specs: ["Couché 300g", "31x45 cm aberto", "Bolsa Colada/Encaixe", "Slot p/ Cartão"],
    basePrice: 389.00,
    tiragens: [
      { qty: 100, price: 389.00, label: "100 un." },
      { qty: 250, price: 549.00, label: "250 un." },
      { qty: 500, price: 890.00, label: "500 un." }
    ],
    finishes: [
      { name: "Verniz Total Frente", extra: 0 },
      { name: "Laminação Fosca Soft Touch", extra: 60.00 }
    ]
  }
];

/**
 * Formatador Monetário Canônico
 */
const currencyFormatter = new Intl.NumberFormat(CONFIG.currencyLocale, {
  style: "currency",
  currency: CONFIG.currencyCode
});

function formatMoney(value) {
  return currencyFormatter.format(Number(value) || 0);
}

function escapeHTML(str) {
  return String(str || "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
