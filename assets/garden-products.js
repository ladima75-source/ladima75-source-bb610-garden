(() => {
  const VERSION = "20260929-products-v1";

  const products = window.GARDEN_PRODUCT_DATA || [];

  const featuredProducts = [
    {
      no: "1308125",
      name: "Горщик для лохини 25 л круглий покращеної конструкції",
      subtitle: "Оновлена кругла конструкція",
      applicationLabel: "Лохина",
      family: "Круглий",
      image: "https://market.bb610.com.ua/assets/img/real/stage16b/plantlogic-25-round-1308125.webp",
      volume: "25 л",
      dimensions: "Ø385 × H362.5 мм",
      legs: "30 мм",
      focus: "Центральна аерація + крайовий дренаж",
      href: "/portfolio-items/new-25-liter-round-pot/"
    },
    {
      no: "1301144 / 1301153 / 1301143",
      name: "Горщики для лохини Zephyr V2 — 25 / 30 / 40 л",
      subtitle: "Висока опора та широка база",
      applicationLabel: "Лохина",
      family: "Zephyr V2",
      image: "/media/plantlogic-blueberry/f6c2ebae4e60.jpg",
      volume: "25 / 30 / 40 л",
      dimensions: "3 моделі",
      legs: "70 мм",
      focus: "Коренева зона вище поверхні",
      href: "/portfolio-items/zephyr-v2/"
    },
    {
      no: "1309026",
      name: "Горщик для лохини 25 л квадратний з U-пазами",
      subtitle: "Квадратна геометрія з фіксацією поливної труби",
      applicationLabel: "Лохина",
      family: "U-пази",
      image: "/media/plantlogic-blueberry/020d50a6f1b3.jpg",
      volume: "25 л",
      dimensions: "355 × H322 мм",
      legs: "30 мм",
      focus: "U-пази + центральна аерація",
      href: "/portfolio-items/25-liter-square-pot-with-u-grooves/"
    },
    {
      no: "13079250 / 13079300",
      name: "Culti-base · мішок для субстрату з інтегрованою основою",
      subtitle: "Готова конструкція: мішок + опорна база",
      applicationLabel: "Овочі / універсальне",
      family: "Culti-base",
      image: "/media/plantlogic-bag-bases/5cbd2a3536e8.jpg",
      volume: "25 / 30 л",
      dimensions: "2 виконання",
      legs: "50 мм",
      focus: "Інтегрована основа + дренаж",
      href: "/portfolio-items/culti-base-grow-bag-with-integrated-base/"
    },
    {
      no: "1305909",
      name: "Жолоб для вирощування полуниці 18 л з опорою для квітконосів",
      subtitle: "Метровий жолоб для піднятих систем",
      applicationLabel: "Полуниця",
      family: "Жолоб",
      image: "/media/plantlogic-strawberry/6dedd865dc15.jpg",
      volume: "18 л",
      dimensions: "255 × 1014 мм",
      legs: "піднята система",
      focus: "Опора для квітконосів + збір дренажу",
      href: "/portfolio-items/18-liter-strawberry-trough-with-truss-support/"
    },
    {
      no: "1301010 / 1301030",
      name: "Лізиметри та комплект IN / OUT",
      subtitle: "Контрольна проба поливу та дренажу",
      applicationLabel: "Контроль дренажу",
      family: "Лізиметри",
      image: "/media/plantlogic-accessories/d31fe8ba66e2.jpg",
      volume: "Small / Large",
      dimensions: "219 × 216 / 315 × 310 мм",
      legs: "під горщиком",
      focus: "Порівняння поливу IN та дренажу OUT",
      href: "/portfolio-items/lysimeters/"
    }
  ];

  let lastFocus = null;

  const cardId = (product) => "product-" + (product.hashNo || product.no.split(" ")[0].split("/")[0]);

  const renderCards = (grid) => {
    grid.innerHTML = "";
    featuredProducts.forEach((p) => {
      const article = document.createElement("article");
      article.className = "garden-product-card";
      article.id = cardId(p);
      article.dataset.productNo = p.no;
      article.innerHTML =
        '<a class="garden-product-open" href="' + p.href + '" aria-label="Детальніше про ' + p.name + '">' +
          '<div class="garden-product-media">' +
            '<img src="' + p.image + '" alt="' + p.name + ' PlantLogic" loading="lazy">' +
            '<span class="garden-product-family">' + p.family + '</span>' +
            '<span class="garden-product-volume">' + p.volume + '</span>' +
          '</div>' +
          '<div class="garden-product-body">' +
            '<div class="garden-product-meta"><span>' + p.applicationLabel + '</span><span>Код ' + p.no + '</span></div>' +
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
            '<span>Додаткові матеріали</span>' +
            '<a target="_blank" rel="noreferrer">Технічна сторінка PlantLogic ↗</a>' +
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
    dialog.querySelector(".garden-product-detail-kicker").textContent = product.applicationLabel + " / " + product.family + " / Код " + product.no;
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
          '<div><span class="garden-products-kicker">PLANTLOGIC / ДОБІРКА</span><h2>ТОП продукти</h2></div>' +
        '</div>' +
        '<div class="garden-products-grid"></div>' +
        '<div class="garden-products-foot"></div>' +
      '</div>';

    target.after(section);
    const grid = section.querySelector(".garden-products-grid");
    renderCards(grid);

    document.querySelectorAll("a").forEach((link) => {
      const label = link.textContent.trim();
      if (label === "Конструкції" || label === "Продукти" || label === "ТОП продукти") {
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
    const product = featuredProducts.find((p) => (p.hashNo || p.no.split(" ")[0].split("/")[0]) === key);
    if (!product) return;
    location.replace(product.href);
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProduct();
  });
  window.addEventListener("hashchange", openFromHash);

  const boot = () => {
    if (mount()) return;
    [250, 750, 1600, 3200].forEach((delay) => setTimeout(mount, delay));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();