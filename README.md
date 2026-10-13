# Chroma Print — Gráfica Online & Comunicação Visual

Plataforma web de alta conversão, e-commerce institucional e simulador de orçamentos para a **Chroma Print** (Goiânia – GO).

Desenvolvido sob o padrão **FSDesign-Supremo** e **HiperDesign=Fsousa**, com acabamento premium tátil (Claymorphism), blindagem anti-IA, ergonomia mobile-first (alvos de toque $\ge 44\text{px}$) e integração nativa com o WhatsApp da empresa: **(62) 9392-3931**.

---

## 📁 Estrutura de Arquivos do Projeto

```
chroma-printe-site-vendas/
├── index.html                   # Landing page principal completa de alta conversão
├── catalogo.html                # Catálogo completo e comparativo técnico de materiais
├── fachadas.html                # Página dedicada a Fachadas Comerciais em Lona e Metalon
├── gabaritos.html               # Guia técnico de fechamento de arquivo, sangria e CMYK
├── politica-de-privacidade.html # Política de Privacidade em total conformidade com a LGPD
├── termos-de-uso.html           # Termos de Uso, regras de produção gráfica e garantias
├── logo-chroma-print.svg        # Logotipo vetorial oficial em alta definição (Roseta CMYK)
├── favicon.svg                  # Ícone de favoritos vetorial
├── serve.js                     # Servidor estático local para testes rápidos
├── assets/
│   ├── logo-chroma-print.svg    # Logotipo oficial
│   └── favicon.svg              # Favicon oficial
├── css/
│   ├── variables.css            # Tokens de cor (CMYK + Azul Real), escala 8pt e sombras táteis
│   ├── base.css                 # Reset moderno, acessibilidade, tipografia e utilitários
│   ├── components.css           # Botões >=44px, relevo tátil Claymorphism, badges e modais
│   ├── layout.css               # Header sticky glass-nav, topbar, hero, bento grid e rodapé
│   └── interactive.css          # Drawer do carrinho, configurador de tiragens e simulador de m²
└── js/
    ├── config.js                # Banco de dados de produtos, tiragens, gramaturas e loja
    ├── cart.js                  # Carrinho reativo com LocalStorage e checkout WhatsApp
    ├── catalog.js               # Filtros por categorias, busca em tempo real e modal de produto
    ├── calculator.js            # Simulador de m² de fachadas e banners em tempo real
    ├── uploader.js              # Validador de arquivos de arte pré-impressão (Pre-flight)
    └── app.js                   # Orquestrador de UI, menu mobile, scrollspy, FAQ e toasts
```

---

## 🚀 Principais Funcionalidades Implementadas

1. **Carrinho Reativo com Persistência Local (`js/cart.js`)**:
   - Persistência automática no `localStorage`.
   - Adição com seleção de tiragens (ex: 100, 250, 500, 1.000 un.) e acabamentos (ex: BOPP Fosco, Verniz Localizado).
   - Ajuste de quantidade com botões ergonômicos `+` e `-`.
   - Checkout formatado com resumo detalhado e envio direto para o WhatsApp oficial: `https://wa.me/556293923931`.

2. **Simulador de Fachadas e Banners em m² (`js/calculator.js`)**:
   - Cálculo dinâmico de área ($m^2$) e perímetro linear ($m$).
   - Escolha de tipo de lona (Fosca 440g, Brilho 440g, Frontlight 510g, Blackout).
   - Seleção de estrutura de metalon (20x20 ou 30x30 reforçado soldado).
   - Opção de instalação técnica em Goiânia e região metropolitana.
   - Disparo do briefing completo do projeto para o WhatsApp com um clique.

3. **Catálogo Dinâmico & Busca em Tempo Real (`js/catalog.js`)**:
   - Filtro instantâneo por abas (Cartões, Panfletos, Banners, Adesivos, Fachadas, Pastas).
   - Campo de busca em tempo real com filtragem instantânea.
   - Modal de personalização com recálculo de preço ao vivo conforme tiragem e papel.

4. **Guia e Validador Pré-Impressão de Arte (`js/uploader.js` / `gabaritos.html`)**:
   - Dropzone interativo para testar arquivos (PDF/X-1a, CorelDRAW, Illustrator, Photoshop, PNG, JPG).
   - Checklist automático de sangria (2mm), margem de segurança (3mm), modo CMYK e 300 DPI.

5. **Páginas Institucionais Completas**:
   - `catalogo.html`: tabela comparativa de papéis e gramaturas.
   - `fachadas.html`: galeria de comunicação visual e comparativo de Lona vs ACM.
   - `gabaritos.html`: guia técnico de fechamento para designers e clientes.
   - `politica-de-privacidade.html`: política de privacidade segundo a LGPD.
   - `termos-de-uso.html`: regras de produção, tolerância gráfica de cores e garantias.

---

## 🛠️ Como Executar Localmente

Como o projeto é construído em HTML5, CSS3 e JavaScript Vanilla moderno, você pode abrir diretamente qualquer arquivo `.html` no navegador, ou iniciar o servidor estático embutido:

```bash
node serve.js
```
Acesse em seu navegador:
👉 `http://localhost:4173`
