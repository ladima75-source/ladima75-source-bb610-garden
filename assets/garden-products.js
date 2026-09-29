(() => {
  const VERSION = "20260929-products-v1";

  const products = [
    {
      no: "1308020",
      name: "Горщик для лохини 20 л круглий на стандартних ніжках",
      subtitle: "Круглий горщик для лохини",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "Round",
      image: "/media/products/1308020-round20.jpg?v=" + VERSION,
      diagram: "/media/proof/round-20l-diagram.jpg?v=" + VERSION,
      volume: "20 л",
      dimensions: "Ø370 × H303 мм",
      legs: "30 мм",
      focus: "48 центральних отворів + пірамідальна основа",
      summary: "Базова Round-конструкція для субстратного вирощування з акцентом на дренаж і надходження кисню в центр кореневої маси.",
      facts: [
        "48 центральних недренуючих отворів для надходження кисню.",
        "Ніжки з’єднані з крайовими отворами й допомагають розривати поверхневий натяг дренажу.",
        "Пірамідальна основа направляє воду до зовнішнього периметра та зменшує мокру зону.",
        "Дренаж виходить у зону високого повітрообміну, де можливий air-pruning коренів."
      ],
      source: "https://getplantlogic.com/portfolio-items/20-liter-round-pot/"
    },
    {
      no: "1309020",
      name: "Горщик для лохини 20 л квадратний на стандартних ніжках",
      subtitle: "Квадратний горщик для лохини",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "Square",
      image: "/media/products/1309020-square20.jpg?v=" + VERSION,
      diagram: "/media/products/1309020-square20-tech.png?v=" + VERSION,
      volume: "20 л",
      dimensions: "326.2 × H332.6 мм",
      legs: "30 мм",
      focus: "32 центральні отвори + сумісність з Small Lysimeter",
      summary: "Square-геометрія для більш щільного використання площі зі збереженням пірамідальної основи, крайового дренажу та центральної аерації.",
      facts: [
        "32 центральні отвори забезпечують доступ кисню в центр кореневої маси.",
        "Крайові отвори та ніжки працюють як єдиний дренажний вузол.",
        "Пірамідальна основа зміщує надлишок води до країв контейнера.",
        "Сумісний із Small PlantLogic Lysimeter для контрольного збору дренажу."
      ],
      source: "https://getplantlogic.com/portfolio-items/20-liter-square-pot/"
    },
    {
      no: "1308026",
      name: "Горщик для лохини 25 л круглий з U-пазами",
      subtitle: "Круглий горщик з U-пазами",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "U-Groove",
      image: "/media/products/1308026-round25-u.jpg?v=" + VERSION,
      diagram: null,
      volume: "25 л",
      dimensions: "Ø385 × H354 мм",
      legs: "30 мм",
      focus: "U-пази для стабільного положення поливної труби",
      summary: "Round-платформа з інтегрованими U-пазами: поливна труба отримує фіксоване положення без втрати базової логіки дренажу й аерації.",
      facts: [
        "U-пази спеціально сформовані для кращого позиціонування поливної труби.",
        "Ніжки 30 мм ізолюють кореневу зону від ґрунту та стоку.",
        "Центральні недренуючі отвори підтримують повітрообмін усередині кореневої маси.",
        "Пірамідальна основа відводить дренаж до зовнішніх країв."
      ],
      source: "https://getplantlogic.com/portfolio-items/25-liter-round-pot-with-u-grooves/"
    },
    {
      no: "1301144",
      name: "Горщик для лохини 25 л Zephyr V2 на ніжках 7 см",
      subtitle: "Zephyr V2 · 25 л",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "Zephyr V2",
      image: "/media/products/zephyr-v2.jpg?v=" + VERSION,
      diagram: "/media/lux/zephyr-v2-diagram.jpg?v=" + VERSION,
      volume: "25 л",
      dimensions: "див. Tech Sheet",
      legs: "70 мм",
      focus: "70-мм ніжки + широка окрема база",
      summary: "25-літрова canonical модель Zephyr V2 з високим відривом кореневої зони від поверхні та окремою посиленою базою.",
      facts: [
        "Product #1301144 у Product Master V5.",
        "Висота ніжок — 70 мм.",
        "Широка база збільшує опорну площу; це характеристика конструкції Zephyr V2.",
        "Вузька дренажна щілина допомагає утримувати субстрат.",
        "Gear-slot з’єднання посилює контакт бази зі стінками."
      ],
      source: "https://getplantlogic.com/portfolio-items/zephyr-v2/"
    },
    {
      no: "1301153",
      name: "Горщик для лохини 30 л Zephyr V2 на ніжках 7 см",
      subtitle: "Zephyr V2 · 30 л",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "Zephyr V2",
      image: "/media/products/zephyr-v2.jpg?v=" + VERSION,
      diagram: "/media/lux/zephyr-v2-diagram.jpg?v=" + VERSION,
      volume: "30 л",
      dimensions: "див. Tech Sheet",
      legs: "70 мм",
      focus: "70-мм ніжки + широка окрема база",
      summary: "30-літрова canonical модель Zephyr V2; назва і Product # синхронізовані з BB610 Market Product Master V5.",
      facts: [
        "Product #1301153 у Product Master V5.",
        "Висота ніжок — 70 мм.",
        "Конструкція належить до єдиної платформи Zephyr V2.",
        "Широка окрема база збільшує відрив кореневої зони від поверхні.",
        "Для картки використовується затверджене сімейне фото Zephyr V2."
      ],
      source: "https://getplantlogic.com/portfolio-items/zephyr-v2/"
    },
    {
      no: "1301143",
      name: "Горщик для лохини 40 л Zephyr V2 на ніжках 7 см",
      subtitle: "Zephyr V2 · 40 л",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "Zephyr V2",
      image: "/media/products/zephyr-v2.jpg?v=" + VERSION,
      diagram: "/media/lux/zephyr-v2-diagram.jpg?v=" + VERSION,
      volume: "40 л",
      dimensions: "див. Tech Sheet",
      legs: "70 мм",
      focus: "70-мм ніжки + широка окрема база",
      summary: "40-літрова canonical модель Zephyr V2; назва і Product # синхронізовані з BB610 Market Product Master V5.",
      facts: [
        "Product #1301143 у Product Master V5.",
        "Висота ніжок — 70 мм.",
        "Конструкція належить до єдиної платформи Zephyr V2.",
        "Висока опора фізично віддаляє кореневу зону від поверхні.",
        "Технічна пластина показує базову геометрію сімейства Zephyr V2."
      ],
      source: "https://getplantlogic.com/portfolio-items/zephyr-v2/"
    },
    {
      no: "1308031",
      name: "Горщик для лохини 30 л круглий з V-ребрами",
      subtitle: "Круглий горщик з V-ребрами",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "V-Rib",
      image: "/media/products/1308031-vrib30.jpg?v=" + VERSION,
      diagram: "/media/products/1308031-vrib30-diagram.jpg?v=" + VERSION,
      volume: "30 л",
      dimensions: "Ø407 × H383 мм",
      legs: "30 мм",
      focus: "V-ребра проти спірального росту коренів",
      summary: "Спеціалізована Round-конструкція, де ребра на стінках змінюють напрямок росту коренів і стримують їх закручування вздовж стінки.",
      facts: [
        "V-ребра на стінках призначені для запобігання спіральному росту коренів.",
        "40 отворів у нижній зоні підтримують надходження кисню в центр кореневої маси.",
        "8 крайових дренажних отворів пов’язані з ніжками.",
        "Пірамідальна форма основи зменшує застійну мокру зону.",
        "Сумісний із Large PlantLogic Lysimeter."
      ],
      source: "https://getplantlogic.com/portfolio-items/30-liter-round-v-rib/"
    },
    {
      no: "1309030",
      name: "Горщик для лохини 30 л квадратний на стандартних ніжках",
      subtitle: "Квадратний горщик для лохини",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "Square",
      image: "/media/products/1309030-square30.jpg?v=" + VERSION,
      diagram: null,
      volume: "30 л",
      dimensions: "385 × H324 мм",
      legs: "30 мм",
      focus: "32 центральні отвори + Large Lysimeter",
      summary: "30-літрова Square-платформа для щільного розміщення з центральною аерацією та контрольованим крайовим дренажем.",
      facts: [
        "32 центральні отвори для надходження кисню в центр кореневої маси.",
        "12 крайових дренажних точок пов’язані з ніжками.",
        "Пірамідальна основа направляє дренаж до зовнішньої зони.",
        "Ніжки 30 мм зменшують прямий контакт коренів із ґрунтом.",
        "Сумісний із Large PlantLogic Lysimeter."
      ],
      source: "https://getplantlogic.com/portfolio-items/30-liter-square-pot/"
    },
    {
      no: "1308041",
      name: "Горщик для лохини 40 л круглий з U-пазами",
      subtitle: "Круглий горщик з U-пазами",
      application: "blueberry",
      applicationLabel: "Лохина",
      family: "U-Groove",
      image: "/media/products/1308041-round40-u.jpg?v=" + VERSION,
      diagram: "/media/products/1308041-round40-u-tech.png?v=" + VERSION,
      volume: "40 л",
      dimensions: "Ø474 × H384 мм",
      legs: "30 мм",
      focus: "48 центральних отворів + U-пази",
      summary: "Великий Round-контейнер для субстратного вирощування з інтегрованим розміщенням поливної труби й центральною аерацією.",
      facts: [
        "48 центральних отворів забезпечують надходження кисню в центр кореневої маси.",
        "U-пази формують стабільне посадочне місце для поливних труб.",
        "Широкі ніжки 30 мм зменшують ризик просідання на м’якому ґрунті.",
        "Пірамідальна основа зміщує дренаж до країв і зменшує мокру зону.",
        "Відведення води в зону високого повітрообміну підтримує self-pruning."
      ],
      source: "https://getplantlogic.com/portfolio-items/40l-round-pot-with-u-grooves/"
    },
    {
      no: "1304125",
      name: "Горщик для лохини 25 л круглий зі збором дренажу",
      subtitle: "100% збір дренажу",
      application: "drainage",
      applicationLabel: "Лохина / овочі",
      family: "Drainage Collection",
      image: "/media/products/1304125-drainage25.jpg?v=" + VERSION,
      diagram: "/media/proof/drainage-25l-tech-drawing.png?v=" + VERSION,
      volume: "25 л",
      dimensions: "Ø420 × H320 мм",
      legs: "71.7 мм",
      focus: "7 дренажних виходів + 38 бічних повітряних отворів",
      summary: "Контейнер для сценаріїв, де весь вихідний дренаж потрібно направити в жолоб або окремий контур, а не залишати під горщиком.",
      facts: [
        "100% Drainage Collection у контрольований жолоб або лінію.",
        "7 центральних виходів направляють дренаж у зону збору.",
        "38 бічних отворів підтримують аерацію кореневої зони.",
        "Ніжки 71.7 мм збільшують відрив кореневої зони від поверхні.",
        "Широкі опори підвищують стабільність навіть на м’якій поверхні."
      ],
      source: "https://getplantlogic.com/portfolio-items/25-liter-round-drainage-collection-pot/"
    },
    {
      no: "1305117",
      name: "Горщик для овочів 17 л зі збором дренажу",
      subtitle: "Для овочів і полуниці",
      application: "vegetable",
      applicationLabel: "Овочі / полуниця",
      family: "Drainage Collection",
      image: "/media/products/1305117-drainage17.jpg?v=" + VERSION,
      diagram: "/media/products/1305117-drainage17-tech.png?v=" + VERSION,
      volume: "17 л",
      dimensions: "325.6 × 511.9 мм",
      legs: "elevated",
      focus: "100% збір дренажу + overlapping handles",
      summary: "Подовжений контейнер для овочевих і полуничних систем, де важливі щільність уздовж ряду та повне відокремлення коренів від дренажного стоку.",
      facts: [
        "100% збір дренажу.",
        "Overlapping handles дозволяють щільніше компонувати контейнери вздовж ряду.",
        "Жорстка конструкція дає можливість переміщати рослини між nursery та production без руйнування кореневої зони.",
        "Контейнер тримає корені над дренажною водою.",
        "Сумісний із PlantLogic Low-Grow System."
      ],
      source: "https://getplantlogic.com/portfolio-items/17-liter-drainage-collection-pot/"
    },
    {
      no: "1305909",
      name: "Жолоб для вирощування полуниці 18 л з опорою для квітконосів",
      subtitle: "З опорою для квітконосів",
      application: "strawberry",
      applicationLabel: "Полуниця",
      family: "Strawberry Trough",
      image: "/media/products/1305909-strawberry18.jpg?v=" + VERSION,
      diagram: "/media/products/1305909-strawberry18-infographic.png?v=" + VERSION,
      volume: "18 л",
      dimensions: "255 × 1014 мм",
      legs: "tabletop",
      focus: "1-метровий trough + truss support",
      summary: "Жорсткий метровий жолоб для tabletop-вирощування полуниці з широкими ручками, які одночасно підтримують квітконоси.",
      facts: [
        "Розрахований на PlantLogic Hi-Grow System.",
        "Широкі ручки працюють як опора для strawberry truss.",
        "Жорсткий контейнер дозволяє interplanting та перенесення рослин без руйнування кореневої зони.",
        "Drainage collection утримує корені над стоком і зменшує потрапляння runoff у ґрунтові води.",
        "Довжина — 1014 мм; робоча ширина — 255 мм."
      ],
      source: "https://getplantlogic.com/portfolio-items/18-liter-strawberry-trough-with-truss-support/"
    }
  ];

  const filters = [
    ["all", "Усі"],
    ["blueberry", "Лохина"],
    ["drainage", "Drainage"],
    ["vegetable", "Овочі"],
    ["strawberry", "Полуниця"]
  ];

  let activeFilter = "all";
  let lastFocus = null;

  const cardId = (product) => "product-" + (product.hashNo || product.no.split(" ")[0].split("/")[0]);

  const renderCards = (grid) => {
    grid.innerHTML = "";
    products
      .filter((p) => activeFilter === "all" || p.application === activeFilter || (activeFilter === "drainage" && p.family === "Drainage Collection"))
      .forEach((p) => {
        const article = document.createElement("article");
        article.className = "garden-product-card";
        article.id = cardId(p);
        article.dataset.productNo = p.no;
        article.innerHTML =
          '<button class="garden-product-open" type="button" aria-label="Детальніше про ' + p.name + '">' +
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
              '<span class="garden-product-more">Технічні деталі <i>↗</i></span>' +
            '</div>' +
          '</button>';
        article.querySelector(".garden-product-open").addEventListener("click", (event) => {
          lastFocus = event.currentTarget;
          openProduct(p, true);
        });
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
          '<div><span class="garden-products-kicker">PLANTLOGIC / PRODUCTS</span><h2>Продукти</h2></div>' +
          '<p>Назви моделей синхронізовані 1:1 з BB610 Market Product Master V5. Garden додає до canonical назви Product #, конструктивні особливості, фото, схеми та технічне пояснення.</p>' +
        '</div>' +
        '<div class="garden-products-filter" role="group" aria-label="Фільтр продуктів">' +
          filters.map(([value,label]) => '<button type="button" data-product-filter="' + value + '"' + (value === "all" ? ' class="is-active"' : '') + '>' + label + '</button>').join("") +
        '</div>' +
        '<div class="garden-products-grid"></div>' +
        '<div class="garden-products-foot">' +
          '<span>Перший реліз каталогу · 12 canonical моделей</span>' +
          '<p>Наступним блоком цей самий формат буде розширено на Rubus, Bag Bases, Slab Spacers та аксесуари.</p>' +
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

    buildDialog();
    openFromHash();
    return true;
  };

  const openFromHash = () => {
    if (!location.hash.startsWith("#product-")) return;
    const key = location.hash.replace("#product-", "");
    const product = products.find((p) => (p.hashNo || p.no.split(" ")[0].split("/")[0]) === key);
    if (!product) return;
    const card = document.getElementById(cardId(product));
    card?.scrollIntoView({ block: "center" });
    lastFocus = card?.querySelector(".garden-product-open") || null;
    setTimeout(() => openProduct(product, false), 220);
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