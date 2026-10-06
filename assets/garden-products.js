(() => {
  const VERSION = "20260929-products-v1";

  const products = window.GARDEN_PRODUCT_DATA || [];

  const filters = [
    ["all", "Усі"],
    ["blueberry", "Лохина"],
    ["drainage", "Збір дренажу"],
    ["vegetable", "Овочі"],
    ["strawberry", "Полуниця"]
  ];

  let activeFilter = "all";
  let lastFocus = null;

  const cardId = (product) => "product-" + (product.hashNo || product.no.split(" ")[0].split("/")[0]);

  const productUrl = (product) => "/product.html?id=" + encodeURIComponent(product.no.split(" ")[0].split("/")[0]);

  const renderCards = (grid) => {
    grid.innerHTML = "";
    products
      .filter((p) => activeFilter === "all" || p.application === activeFilter || (activeFilter === "drainage" && p.family === "Збір дренажу"))
      .forEach((p) => {
        const article = document.createElement("article");
        article.className = "garden-product-card";
        article.id = cardId(p);
        article.dataset.productNo = p.no;
        article.innerHTML =
          '<a class="garden-product-open" href="' + productUrl(p) + '" aria-label="Детальніше про ' + p.name + '">' +
            '<div class="garden-product-media">' +
              '<img src="' + p.image + '" alt="' + p.name + ' PlantLogic" loading="lazy">' +
              '<span class="garden-product-family">' + p.family + '</span>' +
              '<span class="garden-product-volume">' + p.volume + '</span>' +
            '</div>' +
            '<div class="garden-product-body">' +
              '<div class="garden-product-meta"><span>' + p.applicationLabel + '</span><span>Product #' + p.no + '</span></div>' +
              '<h3>' + p.name + '</h3>' +
              '<p class="garden-product-subtitle">' + p.subtitle + '</p>' +
              '<p class="garden-product-focus">' + p.focus + '</p>' +
              '<div class="garden-product-specs">' +
                '<span><b>Об’єм</b>' + p.volume + '</span>' +
                '<span><b>Габарити</b>' + p.dimensions + '</span>' +
                '<span><b>Опора</b>' + p.legs + '</span>' +
              '</div>' +
              '<span class="garden-product-more">Відкрити сторінку <i>↗</i></span>' +
            '</div>' +
          '</a>';
        grid.append(article);
      });
  };

  const buildDialog = () => {
    if (document.querySelector("#garden-product-dialog")) return;
    const dialog = document.createElement("div");
    dialog.id = "garden-product-dialog";
    dialog.className = "garden-product-dialog";
    dialog.hidden = true;
    dialog.innerHTML =
      '<div class="garden-product-backdrop" data-close-product></div>' +
      '<section class="garden-product-panel" role="dialog" aria-modal="true" aria-labelledby="garden-product-dialog-title">' +
        '<button class="garden-product-close" type="button" data-close-product aria-label="Закрити">×</button>' +
        '<div class="garden-product-detail-media">' +
          '<div class="garden-product-detail-stage"><img alt="" class="garden-product-detail-image"></div>' +
          '<div class="garden-product-detail-tabs">' +
            '<button type="button" data-detail-view="photo" class="is-active">Фото</button>' +
            '<button type="button" data-detail-view="diagram">Схема / креслення</button>' +
          '</div>' +
        '</div>' +
        '<div class="garden-product-detail-copy">' +
          '<div class="garden-product-detail-kicker"></div>' +
          '<h2 id="garden-product-dialog-title"></h2>' +
          '<p class="garden-product-detail-lead"></p>' +
          '<dl class="garden-product-detail-specs"></dl>' +
          '<div class="garden-product-detail-facts"><h3>Конструктивні особливості</h3><ul></ul></div>' +
          '<div class="garden-product-detail-source">' +
            '<span>Джерело технічних даних</span>' +
            '<a target="_blank" rel="noreferrer">Офіційна сторінка PlantLogic ↗</a>' +
          '</div>' +
        '</div>' +
      '</section>';
    document.body.append(dialog);

    dialog.querySelectorAll("[data-close-product]").forEach((el) => el.addEventListener("click", closeProduct));
    dialog.querySelectorAll("[data-detail-view]").forEach((button) => {
      button.addEventListener("click", () => {
        const current = products.find((p) => p.no === dialog.dataset.productNo);
        if (!current) return;
        setDetailImage(current, button.dataset.detailView);
      });
    });
  };

  const setDetailImage = (product, view) => {
    const dialog = document.querySelector("#garden-product-dialog");
    const image = dialog?.querySelector(".garden-product-detail-image");
    if (!dialog || !image) return;
    const isDiagram = view === "diagram" && product.diagram;
    image.src = isDiagram ? product.diagram : product.image;
    image.alt = isDiagram ? "Технічна схема " + product.name : product.name + " PlantLogic";
    image.classList.toggle("is-diagram", isDiagram);
    dialog.querySelectorAll("[data-detail-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.detailView === (isDiagram ? "diagram" : "photo")));
    const diagramButton = dialog.querySelector('[data-detail-view="diagram"]');
    if (diagramButton) diagramButton.disabled = !product.diagram;
  };

  const openProduct = (product, updateHash) => {
    buildDialog();
    const dialog = document.querySelector("#garden-product-dialog");
    if (!dialog) return;
    dialog.dataset.productNo = product.no;
    dialog.querySelector(".garden-product-detail-kicker").textContent = product.applicationLabel + " / " + product.family + " / Product #" + product.no;
    dialog.querySelector("#garden-product-dialog-title").textContent = product.name;
    dialog.querySelector(".garden-product-detail-lead").textContent = product.summary;
    dialog.querySelector(".garden-product-detail-specs").innerHTML =
      '<div><dt>Об’єм</dt><dd>' + product.volume + '</dd></div>' +
      '<div><dt>Габарити</dt><dd>' + product.dimensions + '</dd></div>' +
      '<div><dt>Опора / ніжки</dt><dd>' + product.legs + '</dd></div>' +
      '<div><dt>Технічний акцент</dt><dd>' + product.focus + '</dd></div>';
    dialog.querySelector(".garden-product-detail-facts ul").innerHTML = product.facts.map((fact) => "<li>" + fact + "</li>").join("");
    const source = dialog.querySelector(".garden-product-detail-source a");
    source.href = product.source;
    setDetailImage(product, "photo");
    dialog.hidden = false;
    requestAnimationFrame(() => dialog.classList.add("is-open"));
    document.documentElement.classList.add("product-dialog-open");
    dialog.querySelector(".garden-product-close")?.focus();
    if (updateHash) history.replaceState(null, "", "#" + cardId(product));
  };

  function closeProduct() {
    const dialog = document.querySelector("#garden-product-dialog");
    if (!dialog || dialog.hidden) return;
    dialog.classList.remove("is-open");
    document.documentElement.classList.remove("product-dialog-open");
    setTimeout(() => { dialog.hidden = true; }, 180);
    if (location.hash.startsWith("#product-")) history.replaceState(null, "", "#products");
    if (lastFocus) lastFocus.focus();
  }

  const mount = () => {
    if (document.querySelector("#products")) return true;
    const target = document.querySelector("#field-stories") || document.querySelector("#corporate-video");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "garden-products section";
    section.id = "products";
    section.innerHTML =
      '<div class="wrap">' +
        '<div class="garden-products-head">' +
          '<div><span class="garden-products-kicker">PLANTLOGIC / PRODUCTS</span><h2>Вибрані продукти</h2></div>' +
          '<p>Приклади продуктів PlantLogic для різних виробничих задач. Повний асортимент горщиків, жолобів, основ та аксесуарів зібраний у каталозі.</p>' +
        '</div>' +
        '<div class="garden-products-filter" role="group" aria-label="Фільтр продуктів">' +
          filters.map(([value,label]) => '<button type="button" data-product-filter="' + value + '"' + (value === "all" ? ' class="is-active"' : '') + '>' + label + '</button>').join("") +
        '</div>' +
        '<div class="garden-products-grid"></div>' +
        '<div class="garden-products-foot">' +
          '<span>Повний каталог · 45 сторінок продуктів</span>' +
          '<p>Для кожної моделі показуємо призначення, геометрію, дренаж, аерацію та доступні технічні матеріали.</p>' +
        '</div>' +
      '</div>';

    target.after(section);
    const grid = section.querySelector(".garden-products-grid");
    renderCards(grid);

    section.querySelectorAll("[data-product-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.productFilter;
        section.querySelectorAll("[data-product-filter]").forEach((b) => b.classList.toggle("is-active", b === button));
        renderCards(grid);
      });
    });

    document.querySelectorAll("a").forEach((link) => {
      const label = link.textContent.trim();
      if (label === "Конструкції" || label === "Продукти") {
        link.textContent = "Продукти";
        link.href = "#products";
      }
    });

    openFromHash();
    return true;
  };

  const openFromHash = () => {
    if (!location.hash.startsWith("#product-")) return;
    const key = location.hash.replace("#product-", "");
    const product = products.find((p) => (p.hashNo || p.no.split(" ")[0].split("/")[0]) === key);
    if (!product) return;
    location.replace(productUrl(product));
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProduct();
  });
  window.addEventListener("hashchange", openFromHash);

  let tries = 0;
  const timer = setInterval(() => {
    const ready = mount();
    tries += 1;
    if (ready || tries > 100) clearInterval(timer);
  }, 180);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();