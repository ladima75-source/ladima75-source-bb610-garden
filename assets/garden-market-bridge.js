(() => {
  const VERSION = "20260929-market-bridge-v1";
  const MARKET = "https://market.bb610.com.ua/";

  const productLinks = {
    "#1308020": "plantlogic-blueberry-round-20l-1308020",
    "#1309020": "plantlogic-blueberry-square-20l-1309020",
    "#1308041": "plantlogic-blueberry-round-40l-u-grooves-1308041",
    "#1301144": "plantlogic-blueberry-zephyr-v2-25l-1301144"
  };

  const catalogUrl = (query = "") => {
    const url = new URL("catalog.html", MARKET);
    url.searchParams.set("category", "containers");
    if (query) url.searchParams.set("q", query);
    return url.toString();
  };

  const productUrl = (id) => {
    const url = new URL("product.html", MARKET);
    url.searchParams.set("id", id);
    return url.toString();
  };

  const addMarketIndicator = (card, code, url) => {
    if (card.dataset.marketLinked === VERSION) return;
    card.dataset.marketLinked = VERSION;
    card.dataset.marketUrl = url;
    card.setAttribute("aria-label", `${card.getAttribute("aria-label") || "Товар PlantLogic"}. Відкрити картку в BB610 Market`);
    card.title = "Відкрити картку товару в BB610 Market";

    const desc = card.querySelector("p");
    if (desc && !card.querySelector(".market-card-note")) {
      const note = document.createElement("span");
      note.className = "market-card-note";
      note.innerHTML = '<span>Картка товару в BB610 Market</span><span aria-hidden="true">↗</span>';
      desc.after(note);
    }
  };

  const enhanceProductCards = () => {
    document.querySelectorAll("#formats .product-card").forEach((card) => {
      const code = [...card.querySelectorAll("span")]
        .map((node) => node.textContent.trim())
        .find((text) => productLinks[text]);
      if (!code) return;
      addMarketIndicator(card, code, productUrl(productLinks[code]));
    });
  };

  window.addEventListener("click", (event) => {
    const card = event.target.closest?.("#formats .product-card[data-market-url]");
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    window.location.assign(card.dataset.marketUrl);
  }, true);

  const ensureHeroMarketCta = () => {
    const row = document.querySelector(".hero-buttons");
    if (!row || row.querySelector("[data-market-hero]")) return;
    const link = document.createElement("a");
    link.className = "market-hero-link";
    link.dataset.marketHero = "1";
    link.href = catalogUrl();
    link.innerHTML = '<span>Каталог PlantLogic</span><span aria-hidden="true">↗</span>';
    row.append(link);
  };

  const bridgeItems = [
    { label: "Лохина", meta: "горщики · Zephyr V2 · U-пази · дренаж", query: "лохина" },
    { label: "Малина + ожина", meta: "production · long-cane · дренаж", query: "малина" },
    { label: "Полуниця", meta: "жолоби · Hi-Grow · комплектуючі", query: "полуниця" },
    { label: "Овочі", meta: "горщики · мішки · основи", query: "овочі" },
    { label: "Універсальні", meta: "субстратні системи", query: "універсальні" },
    { label: "Аксесуари", meta: "основи · лізиметри · комплектуючі", query: "аксесуари" }
  ];

  const ensureMarketBridge = () => {
    if (document.querySelector("#market-catalog")) return;
    const formats = document.querySelector("#formats");
    const grid = formats?.parentElement?.querySelector(".product-grid");
    if (!grid) return;

    const section = document.createElement("section");
    section.className = "market-bridge-section";
    section.id = "market-catalog";
    section.innerHTML = `
      <div class="market-bridge-head">
        <div>
          <span class="market-bridge-eyebrow">BB610 MARKET / ПОВНИЙ АСОРТИМЕНТ</span>
          <h2>Від технології — до конкретної моделі</h2>
        </div>
        <p>Garden допомагає зрозуміти систему. У Market — актуальні картки PlantLogic, моделі, характеристики та запит ціни.</p>
      </div>
      <div class="market-bridge-grid">
        ${bridgeItems.map((item, index) => `
          <a class="market-bridge-card" href="${catalogUrl(item.query)}">
            <span class="market-bridge-index">0${index + 1}</span>
            <strong>${item.label}</strong>
            <span>${item.meta}</span>
            <i aria-hidden="true">↗</i>
          </a>
        `).join("")}
      </div>
      <a class="market-bridge-all" href="${catalogUrl()}">
        <span>Відкрити всі горщики та системи PlantLogic</span>
        <span aria-hidden="true">↗</span>
      </a>
    `;
    grid.after(section);
  };

  const ensureFeaturedMarketLink = () => {
    const featured = document.querySelector("#showcase .featured-copy");
    if (!featured || featured.querySelector("[data-featured-market]")) return;
    const action = featured.querySelector("button.button");
    if (!action) return;

    const link = document.createElement("a");
    link.className = "featured-market-link";
    link.dataset.featuredMarket = "1";
    link.href = productUrl("plantlogic-25l-round-drainage-1304125");
    link.innerHTML = '<span>Картка #1304125 у Market</span><span aria-hidden="true">↗</span>';
    action.after(link);
  };

  const attachSectionMarketLink = (selector, label, query) => {
    const section = document.querySelector(selector);
    if (!section || section.querySelector(":scope > .section-market-link, :scope .section-market-link")) return;
    const copy = section.querySelector(".rubus-copy, .higrow-copy, .section-heading, .featured-copy") || section;
    const link = document.createElement("a");
    link.className = "section-market-link";
    link.href = catalogUrl(query);
    link.innerHTML = `<span>${label}</span><span aria-hidden="true">↗</span>`;
    copy.append(link);
  };

  const enhanceCropCards = () => {
    document.querySelectorAll("#crops .crop-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent.trim();
      if (title === "Полуниця") card.href = "#strawberry";
      if (title === "Овочі") card.href = "#vegetable";
    });
  };

  const ensureVegetableSection = () => {
    if (document.querySelector("#vegetable")) return;
    const anchor = document.querySelector("#strawberry") || document.querySelector("#lysimeter");
    if (!anchor) return;

    const section = document.createElement("section");
    section.className = "vegetable-story section";
    section.id = "vegetable";
    section.innerHTML = `
      <div class="wrap vegetable-story-grid">
        <div class="vegetable-story-media">
          <img
            src="https://market.bb610.com.ua/assets/culture/photos/vegetables.jpg"
            alt="Професійне вирощування овочів у субстраті"
            loading="lazy"
            width="1200"
            height="800"
          >
          <span>PLANTLOGIC / VEGETABLE SYSTEMS</span>
        </div>
        <div class="vegetable-story-copy">
          <span class="vegetable-story-eyebrow">VEGETABLE / ОВОЧІ</span>
          <h2>Субстратні рішення для овочевих культур</h2>
          <p>Горщики, мішки для субстрату, основи та дренажні елементи PlantLogic для професійних систем вирощування.</p>
          <div class="vegetable-story-tags">
            <span>Горщики</span>
            <span>Мішки</span>
            <span>Основи</span>
            <span>Дренаж</span>
          </div>
          <div class="vegetable-story-actions">
            <a class="vegetable-story-primary" href="${catalogUrl("овочі")}">
              <span>Рішення для овочів у Market</span><span aria-hidden="true">↗</span>
            </a>
            <a class="vegetable-story-secondary" href="${productUrl("plantlogic-vegetable-pot-8l-1305008")}">
              Горщик 8 л · #1305008
            </a>
          </div>
        </div>
      </div>
    `;
    anchor.after(section);
  };

  const enhanceForms = () => {
    document.querySelectorAll('select[name="crop"]').forEach((select) => {
      ["Полуниця", "Овочі"].forEach((label) => {
        if ([...select.options].some((option) => option.textContent.trim() === label)) return;
        const option = document.createElement("option");
        option.value = label;
        option.textContent = label;
        const other = [...select.options].find((item) => item.textContent.includes("Інша"));
        other ? select.insertBefore(option, other) : select.append(option);
      });
    });
  };

  const run = () => {
    enhanceProductCards();
    ensureHeroMarketCta();
    ensureMarketBridge();
    ensureFeaturedMarketLink();
    enhanceCropCards();
    ensureVegetableSection();
    enhanceForms();
    attachSectionMarketLink("#rubus", "Моделі для малини та ожини у Market", "малина");
    attachSectionMarketLink("#strawberry", "Системи для полуниці у Market", "полуниця");
    attachSectionMarketLink("#drainage", "Дренажні рішення у Market", "дренаж");
    attachSectionMarketLink("#lysimeter", "Лізиметри та контроль у Market", "лізиметр");
  };

  let queued = false;
  const queueRun = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      run();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  const observer = new MutationObserver(queueRun);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 15000);
})();
