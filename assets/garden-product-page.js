(() => {
  const products = window.GARDEN_PRODUCT_DATA || [];
  const root = document.querySelector("#product-page");

  const getId = () => new URLSearchParams(location.search).get("id") || "";
  const normalizeNo = (value) => String(value || "").trim().split(" ")[0].split("/")[0];
  const product = products.find((item) => normalizeNo(item.no) === getId());

  const idealText = (item) => {
    if (item.application === "strawberry") return "Для професійного tabletop-вирощування полуниці";
    if (item.application === "vegetable") return "Для професійного вирощування овочів і полуниці";
    if (item.family === "Drainage Collection") return "Для субстратного вирощування з контрольованим збором дренажу";
    return "Для професійного субстратного вирощування";
  };

  const featureLabels = (item) => {
    const out = [];
    if (item.legs) out.push({label:"Опора / ніжки",value:item.legs});
    if (item.focus) out.push({label:"Ключова особливість",value:item.focus});
    if (item.dimensions) out.push({label:"Габарити",value:item.dimensions});
    if (item.volume) out.push({label:"Об’єм",value:item.volume});
    return out.slice(0,4);
  };

  const detailCards = (item) => {
    const facts = item.facts || [];
    const titles = [
      "Конструкція",
      "Дренаж і коренева зона",
      "Практичний ефект",
      "Сумісність / застосування",
      "Додаткова особливість"
    ];
    return facts.map((fact,index) => ({
      title: titles[index] || "Технічна деталь",
      text: fact
    }));
  };

  const related = (item) => products
    .filter((candidate) => candidate.no !== item.no)
    .sort((a,b) => {
      const aScore = (a.application === item.application ? 2 : 0) + (a.family === item.family ? 1 : 0);
      const bScore = (b.application === item.application ? 2 : 0) + (b.family === item.family ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0,3);

  const renderError = () => {
    document.title = "Продукт не знайдено — BB610 Garden";
    root.innerHTML =
      '<section class="product-page-error product-page-wrap">' +
        '<span>BB610 GARDEN / PRODUCTS</span>' +
        '<h1>Продукт не знайдено.</h1>' +
        '<p>Перевірте Product # або поверніться до технічного каталогу.</p>' +
        '<a href="/#products">Повернутися до продуктів →</a>' +
      '</section>';
  };

  if (!product) {
    renderError();
    return;
  }

  const pageUrl = location.origin + "/product.html?id=" + encodeURIComponent(normalizeNo(product.no));
  document.title = product.name + " — BB610 Garden";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", product.summary);

  const relationCards = related(product).map((item) =>
    '<a class="related-product-card" href="/product.html?id=' + encodeURIComponent(normalizeNo(item.no)) + '">' +
      '<div class="related-product-media"><img src="' + item.image + '" alt="' + item.name + '" loading="lazy"></div>' +
      '<span>' + item.family + ' · Product #' + item.no + '</span>' +
      '<h3>' + item.name + '</h3>' +
      '<p>' + item.focus + '</p>' +
    '</a>'
  ).join("");

  const diagramBlock = product.diagram
    ? '<section class="product-tech-drawing product-page-section">' +
        '<div class="product-page-wrap product-tech-drawing-grid">' +
          '<div class="product-section-copy">' +
            '<span class="product-section-kicker">ОФІЦІЙНИЙ ТЕХНІЧНИЙ МАТЕРІАЛ</span>' +
            '<h2>Схема / креслення</h2>' +
            '<p>Офіційний технічний матеріал PlantLogic для цієї моделі або її конструктивної платформи. Використовуємо його як візуальне підтвердження геометрії, а не як декоративну ілюстрацію.</p>' +
          '</div>' +
          '<figure><img src="' + product.diagram + '" alt="Технічна схема ' + product.name + '" loading="lazy"><figcaption>PlantLogic · Product #' + product.no + '</figcaption></figure>' +
        '</div>' +
      '</section>'
    : '<section class="product-tech-note product-page-section"><div class="product-page-wrap"><strong>Технічне креслення</strong><p>Для цієї canonical моделі окреме точне креслення ще не додане в Garden. Ми не підміняємо його схемою іншої моделі.</p></div></section>';

  root.innerHTML =
    '<article class="product-detail-page">' +
      '<section class="product-detail-hero">' +
        '<div class="product-page-wrap product-detail-hero-grid">' +
          '<div class="product-detail-copy">' +
            '<a class="product-breadcrumb" href="/#products">← Продукти</a>' +
            '<div class="product-detail-eyebrow">' + product.applicationLabel + ' / ' + product.family + '</div>' +
            '<h1>' + product.name + '</h1>' +
            '<div class="product-number">Product #' + product.no + '</div>' +
            '<h2>' + idealText(product) + '</h2>' +
            '<p class="product-detail-summary">' + product.summary + '</p>' +
            '<div class="product-feature-list">' +
              featureLabels(product).map((item) =>
                '<div><span>' + item.label + '</span><strong>' + item.value + '</strong></div>'
              ).join("") +
            '</div>' +
            '<div class="product-detail-actions">' +
              '<a class="product-primary-action" href="' + product.source + '" target="_blank" rel="noreferrer">Офіційна сторінка PlantLogic ↗</a>' +
              '<button type="button" class="product-copy-link">Скопіювати посилання</button>' +
            '</div>' +
          '</div>' +
          '<div class="product-detail-hero-media">' +
            '<div class="product-image-stage">' +
              '<img src="' + product.image + '" alt="' + product.name + ' PlantLogic">' +
              '<span class="product-family-chip">' + product.family + '</span>' +
              '<span class="product-volume-chip">' + product.volume + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="product-details product-page-section">' +
        '<div class="product-page-wrap">' +
          '<div class="product-section-heading">' +
            '<span class="product-section-kicker">ДЕТАЛІ ПРОДУКТУ</span>' +
            '<h2>Деталі продукту</h2>' +
            '<p>Конкретні конструктивні особливості цієї моделі, а не загальні переваги сімейства.</p>' +
          '</div>' +
          '<div class="product-detail-cards">' +
            detailCards(product).map((item,index) =>
              '<article><span>0' + (index + 1) + '</span><h3>' + item.title + '</h3><p>' + item.text + '</p></article>'
            ).join("") +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="product-construction product-page-section">' +
        '<div class="product-page-wrap product-construction-grid">' +
          '<div class="product-construction-media"><img src="' + product.image + '" alt="' + product.name + ' — конструкція" loading="lazy"></div>' +
          '<div class="product-section-copy">' +
            '<span class="product-section-kicker">КОНСТРУКТИВНА ЛОГІКА</span>' +
            '<h2>' + product.focus + '</h2>' +
            '<p>' + product.summary + '</p>' +
            '<dl>' +
              '<div><dt>Назва</dt><dd>' + product.name + '</dd></div>' +
              '<div><dt>Product #</dt><dd>' + product.no + '</dd></div>' +
              '<div><dt>Сімейство</dt><dd>' + product.family + '</dd></div>' +
              '<div><dt>Застосування</dt><dd>' + product.applicationLabel + '</dd></div>' +
            '</dl>' +
          '</div>' +
        '</div>' +
      '</section>' +

      diagramBlock +

      '<section class="product-related product-page-section">' +
        '<div class="product-page-wrap">' +
          '<div class="product-section-heading compact">' +
            '<span class="product-section-kicker">ПОВ’ЯЗАНІ ПРОДУКТИ</span>' +
            '<h2>Пов’язані моделі</h2>' +
          '</div>' +
          '<div class="related-products-grid">' + relationCards + '</div>' +
        '</div>' +
      '</section>' +

      '<section class="product-source product-page-section">' +
        '<div class="product-page-wrap product-source-inner">' +
          '<div><span>Технічне джерело</span><strong>Офіційні матеріали PlantLogic</strong></div>' +
          '<p>Canonical назва синхронізована з BB610 Market Product Master V5. Garden додає технічне пояснення, офіційні фото та схеми.</p>' +
          '<a href="' + product.source + '" target="_blank" rel="noreferrer">Перевірити першоджерело ↗</a>' +
        '</div>' +
      '</section>' +
    '</article>';

  const copyButton = root.querySelector(".product-copy-link");
  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      copyButton.textContent = "Посилання скопійовано";
      setTimeout(() => { copyButton.textContent = "Скопіювати посилання"; }, 1600);
    } catch {
      copyButton.textContent = pageUrl;
    }
  });
})();

;(() => {
  const enhanceArrows = () => {
    document.querySelectorAll("a,button").forEach(el => {
      if (el.querySelector(".lux-arrow-chip")) return;
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())){
        const value=node.nodeValue||"";
        if(!/[↗→]\s*$/.test(value)) continue;
        node.nodeValue=value.replace(/[↗→]\s*$/,"").replace(/\s+$/,"");
        const chip=document.createElement("span");
        chip.className="lux-arrow-chip";
        chip.setAttribute("aria-hidden","true");
        chip.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        el.append(chip);
        break;
      }
    });
  };
  requestAnimationFrame(enhanceArrows);
})();