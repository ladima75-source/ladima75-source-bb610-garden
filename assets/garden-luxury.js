(() => {
  const VERSION = "20260929-lux-v1";

  const cropStories = [
    {
      name: "Лохина",
      en: "BLUEBERRY",
      image: "/media/greenhouse.webp",
      href: "#lux-blueberry",
      tag: "ROOT ZONE / CONTAINER SYSTEM",
      title: "Коренева зона як керований виробничий модуль.",
      text: "Round, Square, U-Groove, Zephyr і Drainage Collection — різні конструктивні відповіді на одну задачу: передбачуваний рух води й повітря в субстраті."
    },
    {
      name: "Малина + ожина",
      en: "RUBUS",
      image: "/media/lux/rubus-greenhouse.jpg?v=" + VERSION,
      href: "#lux-rubus",
      tag: "PRODUCTION / LONG CANE",
      title: "Контейнер працює разом із логістикою рослини.",
      text: "Для Rubus важливі не тільки дренаж і аерація, а й щільність ряду, стабілізація високих пагонів, cold storage та швидка робота персоналу."
    },
    {
      name: "Полуниця",
      en: "STRAWBERRY",
      image: "/media/lux/strawberry-hydroponics.jpg?v=" + VERSION,
      href: "#lux-strawberry",
      tag: "HI-GROW / TABLETOP",
      title: "Піднята культура як окрема інженерна система.",
      text: "Hi-Grow відділяє робочу зону культури від ґрунту й дозволяє будувати tabletop або hanging конфігурації з окремою логікою дренажу."
    },
    {
      name: "Овочі",
      en: "VEGETABLES",
      image: "/media/lux/vegetable-production.jpg?v=" + VERSION,
      href: "#lux-vegetable",
      tag: "SUBSTRATE / ELEVATED SYSTEM",
      title: "Субстрат, опора і дренаж мають працювати як одне ціле.",
      text: "Для томатів, перцю та інших культур PlantLogic комбінує slabs, мішки, основи, контейнери та drainage collection залежно від технології господарства."
    }
  ];

  const enhanceHero = () => {
    const hero = document.querySelector(".hero");
    if (!hero || hero.dataset.luxury === VERSION) return !!hero;
    hero.dataset.luxury = VERSION;

    const copy = hero.querySelector(".hero-copy");
    const buttons = hero.querySelector(".hero-buttons");
    if (copy && buttons && !copy.querySelector(".lux-hero-metrics")) {
      const metrics = document.createElement("div");
      metrics.className = "lux-hero-metrics";
      metrics.innerHTML =
        '<div><span>01</span><strong>DRAINAGE</strong><small>керований відвід води</small></div>' +
        '<div><span>02</span><strong>O₂</strong><small>повітря в центр кореневої маси</small></div>' +
        '<div><span>03</span><strong>ROOT ARCHITECTURE</strong><small>геометрія замість випадковості</small></div>';
      buttons.after(metrics);
    }

    const product = hero.querySelector(".hero-product");
    if (product) {
      product.href = "#drainage-engineering";
      const micro = product.querySelector(".micro");
      const strong = product.querySelector("strong");
      const label = product.querySelector(".product-link-label");
      if (micro) micro.textContent = "ENGINEERING DETAIL";
      if (strong) strong.innerHTML = "Дренаж як<br>система.";
      if (label) label.textContent = "Drainage Collection";
    }

    const footMuted = hero.querySelector(".hero-foot .muted");
    if (footMuted) footMuted.textContent = "ROOT ZONE · DRAINAGE · OXYGENATION";

    const photoPill = hero.querySelector(".hero-photo .photo-pill");
    if (photoPill) photoPill.innerHTML = "<span></span> ROOT ZONE ENGINEERING";

    return true;
  };

  const enhanceCropCards = () => {
    const cards = [...document.querySelectorAll("#crops .crop-card")];
    if (cards.length < 4) return false;

    cards.slice(0, 4).forEach((card, index) => {
      const story = cropStories[index];
      card.href = story.href;
      card.dataset.crop = story.en.toLowerCase();
      if (card.querySelector(".lux-crop-thumb")) return;

      const thumb = document.createElement("div");
      thumb.className = "lux-crop-thumb";
      thumb.innerHTML =
        '<img src="' + story.image + '" alt="' + story.name + ' — професійне вирощування PlantLogic" loading="lazy">' +
        '<span>' + story.en + '</span>';
      card.prepend(thumb);
    });

    return true;
  };

  const makeFieldStories = () => {
    if (document.querySelector("#field-stories")) return true;
    const target = document.querySelector("#crops");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "lux-field-stories section";
    section.id = "field-stories";
    section.innerHTML =
      '<div class="wrap">' +
        '<div class="lux-field-head">' +
          '<div><span class="lux-kicker">PLANTLOGIC / IN THE FIELD</span><h2>Технологія виглядає переконливо, коли видно всю систему.</h2></div>' +
          '<p>Тому Garden показує не лише окремий контейнер. Показуємо ряд, теплицю, робочу висоту, рослину, полив і те, як конструкція входить у виробничий процес.</p>' +
        '</div>' +
        '<div class="lux-field-grid">' +
          cropStories.map((story, i) =>
            '<article class="lux-field-card lux-field-card-' + (i + 1) + '" id="' + story.href.slice(1) + '">' +
              '<img src="' + story.image + '" alt="' + story.name + ' — application PlantLogic" loading="lazy">' +
              '<span class="lux-field-shade"></span>' +
              '<div class="lux-field-index">0' + (i + 1) + '</div>' +
              '<div class="lux-field-copy">' +
                '<span>' + story.tag + '</span>' +
                '<h3>' + story.name + '</h3>' +
                '<strong>' + story.title + '</strong>' +
                '<p>' + story.text + '</p>' +
              '</div>' +
            '</article>'
          ).join("") +
        '</div>' +
      '</div>';

    target.after(section);
    return true;
  };

  const makeRootEvidence = () => {
    if (document.querySelector("#root-evidence")) return true;
    const target = document.querySelector("#root-zone");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "lux-root-evidence section";
    section.id = "root-evidence";
    section.innerHTML =
      '<div class="wrap lux-root-evidence-grid">' +
        '<figure class="lux-root-photo">' +
          '<img src="/media/lux/blueberry-production.jpg?v=' + VERSION + '" alt="Коренева маса лохини після вирощування в контейнерній системі PlantLogic" loading="lazy">' +
          '<figcaption><span>FIELD VIEW / ROOT MASS</span><strong>Коренева зона після виробничого циклу</strong></figcaption>' +
        '</figure>' +
        '<div class="lux-root-copy">' +
          '<span class="lux-kicker">FROM DRAWING TO ROOT MASS</span>' +
          '<h2>Геометрію оцінюють не по пластику. Її оцінюють по кореневій зоні.</h2>' +
          '<p>Для професійного вирощування важливо, чи залишається внизу застійна насичена зона, як розподіляється корінь, де виходить дренаж і чи є повітряний обмін у центральній частині субстрату.</p>' +
          '<div class="lux-root-points">' +
            '<div><b>01</b><span>дивимось на форму кореневого кома;</span></div>' +
            '<div><b>02</b><span>зіставляємо IN і OUT, а не лише обсяг поливу;</span></div>' +
            '<div><b>03</b><span>перевіряємо, де фактично накопичується волога;</span></div>' +
            '<div><b>04</b><span>враховуємо субстрат, а не розглядаємо горщик окремо.</span></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    target.after(section);
    return true;
  };

  const decorateZephyr = () => {
    const section = document.querySelector("#zephyr-engineering");
    if (!section) return false;
    if (section.querySelector(".lux-zephyr-diagram")) return true;

    const copy = section.querySelector(".zephyr-engineering-copy");
    if (!copy) return false;

    const figure = document.createElement("figure");
    figure.className = "lux-zephyr-diagram";
    figure.innerHTML =
      '<img src="/media/lux/zephyr-v2-diagram.jpg?v=' + VERSION + '" alt="Офіційна технічна схема Zephyr V2 PlantLogic" loading="lazy">' +
      '<figcaption><span>OFFICIAL TECHNICAL PLATE</span><strong>Zephyr V2 · root-zone geometry</strong></figcaption>';
    copy.append(figure);
    return true;
  };

  const makeVisualRail = () => {
    if (document.querySelector("#lux-visual-rail")) return true;
    const target = document.querySelector("#system-interfaces");
    if (!target) return false;

    const rail = document.createElement("section");
    rail.className = "lux-visual-rail";
    rail.id = "lux-visual-rail";
    rail.innerHTML =
      '<div class="wrap lux-visual-rail-inner">' +
        '<span>ROOT ZONE</span><i></i><span>IRRIGATION</span><i></i><span>DRAINAGE</span><i></i><span>MEASUREMENT</span>' +
      '</div>';
    target.before(rail);
    return true;
  };

  const reveal = () => {
    const nodes = document.querySelectorAll(".lux-field-card,.lux-root-photo,.lux-root-copy,.lux-zephyr-diagram");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "80px 0px" });
    nodes.forEach((el) => {
      if (!el.dataset.luxObserved) {
        el.dataset.luxObserved = "1";
        io.observe(el);
      }
    });
  };

  const run = () => {
    enhanceHero();
    enhanceCropCards();
    makeFieldStories();
    makeRootEvidence();
    decorateZephyr();
    makeVisualRail();
    reveal();
  };

  let tries = 0;
  const timer = setInterval(() => {
    run();
    tries += 1;
    if (tries > 100) clearInterval(timer);
  }, 180);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();