(() => {
  const VERSION = "20260929-flow-v1";

  const cropStories = [
    {
      name: "Лохина",
      en: "BLUEBERRY",
      image: "/media/greenhouse.webp",
      href: "#lux-blueberry",
      tag: "",
      title: "Коренева зона як керований виробничий модуль.",
      text: "Круглі, квадратні, моделі з U-пазами, Zephyr V2 та горщики зі збором дренажу — різні конструктивні рішення для керованого руху води й повітря в субстраті."
    },
    {
      name: "Малина та ожина",
      en: "RUBUS",
      image: "/media/lux/rubus-greenhouse.jpg?v=" + VERSION,
      href: "#lux-rubus",
      tag: "",
      title: "Горщик працює разом із логістикою рослини.",
      text: "Для малини та ожини важливі не тільки дренаж і аерація, а й щільність ряду, стабілізація високих пагонів, холодне зберігання та швидка робота персоналу."
    },
    {
      name: "Полуниця",
      en: "STRAWBERRY",
      image: "/media/lux/strawberry-hydroponics.jpg?v=" + VERSION,
      href: "#lux-strawberry",
      tag: "",
      title: "Піднята культура як окрема інженерна система.",
      text: "Hi-Grow відділяє робочу зону культури від ґрунту й дозволяє будувати підняті та підвісні конфігурації з окремою логікою дренажу."
    },
    {
      name: "Овочі",
      en: "VEGETABLES",
      image: "/media/lux/vegetable-production.jpg?v=" + VERSION,
      href: "#lux-vegetable",
      tag: "",
      title: "Субстрат, опора і дренаж мають працювати як одне ціле.",
      text: "Для томатів, перцю та інших культур PlantLogic комбінує субстратні плити, мішки, основи, горщики та системи збору дренажу залежно від технології господарства."
    }
  ];

  const enhanceHero = () => {
    const hero = document.querySelector(".hero");
    if (!hero || hero.dataset.luxury === VERSION) return !!hero;
    hero.dataset.luxury = VERSION;

    hero.querySelector(".lux-hero-metrics")?.remove();

    const product = hero.querySelector(".hero-product");
    if (product) {
      product.href = "#drainage-engineering";
      const micro = product.querySelector(".micro");
      const strong = product.querySelector("strong");
      const label = product.querySelector(".product-link-label");
      if (micro) micro.remove();
      if (strong) strong.innerHTML = "Керований<br>збір дренажу.";
      if (label) label.textContent = "Горщик зі збором дренажу";
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
          '<div><h2>Чотири культури. Чотири різні виробничі сценарії.</h2></div>' +
          '<p>Фото показують не окремий виріб, а середовище його роботи: ряд, теплицю, висоту культури, полив, дренаж і доступ персоналу.</p>' +
        '</div>' +
        '<div class="lux-field-grid">' +
          cropStories.map((story, i) =>
            '<article class="lux-field-card lux-field-card-' + (i + 1) + '" id="' + story.href.slice(1) + '">' +
              '<img src="' + story.image + '" alt="' + story.name + ' — application PlantLogic" loading="lazy">' +
              '<span class="lux-field-shade"></span>' +
              '<div class="lux-field-copy">' +
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
          '<figcaption><strong>Коренева зона після виробничого циклу</strong></figcaption>' +
        '</figure>' +
        '<div class="lux-root-copy">' +
          '' +
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
      '<img src="/media/diagrams-uk/zephyr-v2-section-11-uk.webp?v=' + VERSION + '" alt="Офіційна технічна схема Zephyr V2 PlantLogic" loading="lazy">' +
      '<figcaption><strong>Zephyr V2 · геометрія кореневої зони</strong></figcaption>';
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
        '<span>Коренева зона</span><i></i><span>Полив</span><i></i><span>Дренаж</span><i></i><span>Контроль</span>' +
      '</div>';
    target.before(rail);
    return true;
  };

  const makeTechnicalProofs = () => {
    const rootZone = document.querySelector("#root-zone");
    if (rootZone && !document.querySelector("#proof-root-zone")) {
      const band = document.createElement("div");
      band.className = "wrap proof-band proof-root-band";
      band.id = "proof-root-zone";
      band.innerHTML =
        '<div class="proof-band-copy">' +
          '<span class="proof-label">КОРЕНЕВА ЗОНА</span>' +
          '<h3>Не схема заради схеми — дивимось на фактичну кореневу масу.</h3>' +
          '<p>Фото кореневої зони ставимо поруч з офіційною схемою Round, щоб пояснення води, повітря та дренажу читалось через реальний результат і геометрію контейнера.</p>' +
        '</div>' +
        '<div class="proof-band-media proof-band-media-double">' +
          '<figure><img src="/media/proof/root-zone-blueberry.jpg?v=' + VERSION + '" alt="Root zone blueberry PlantLogic" loading="lazy"><figcaption>Фактична коренева зона</figcaption></figure>' +
          '<figure class="proof-white"><img src="/media/proof/round-20l-diagram.jpg?v=' + VERSION + '" alt="20L Round Pot official PlantLogic diagram" loading="lazy"><figcaption>Офіційна схема · 20 л</figcaption></figure>' +
        '</div>';
      rootZone.append(band);
    }

    const geometry = document.querySelector("#geometry .geometry-grid");
    if (geometry && !document.querySelector("#proof-ugroove")) {
      const block = document.createElement("article");
      block.className = "proof-feature proof-feature-ugroove";
      block.id = "proof-ugroove";
      block.innerHTML =
        '<div class="proof-feature-media proof-white"><img src="/media/diagrams-uk/ugroove-item-13080350-dimensions-uk.webp?v=' + VERSION + '" alt="Офіційне технічне креслення PlantLogic з U-пазами" loading="lazy"></div>' +
        '<div class="proof-feature-copy">' +
          '<span class="proof-label">U-ПАЗИ</span>' +
          '<h3>Паз видно у кресленні — тому його роль не треба пояснювати лозунгом.</h3>' +
          '<p>Офіційне технічне креслення показує саму геометрію посадочного місця для поливної труби. Поруч залишаємо тільки коротке пояснення монтажної логіки.</p>' +
        '</div>';
      geometry.after(block);
    }

    const drainage = document.querySelector("#drainage-engineering .wrap");
    if (drainage && !document.querySelector("#proof-drainage")) {
      const block = document.createElement("div");
      block.className = "proof-band proof-drainage-band";
      block.id = "proof-drainage";
      block.innerHTML =
        '<div class="proof-band-media proof-white"><figure><img src="/media/proof/drainage-25l-tech-drawing.png?v=' + VERSION + '" alt="25L Drainage Collection official technical drawing" loading="lazy"><figcaption>Офіційне креслення · горщик 25 л зі збором дренажу</figcaption></figure></div>' +
        '<div class="proof-band-copy">' +
          '<span class="proof-label">ЗБІР ДРЕНАЖУ</span>' +
          '<h3>Вихід дренажу має конкретну геометрію, а не абстрактну «керованість».</h3>' +
          '<p>Технічна пластина доповнює фото виробу: видно форму основи, висоту опор і організацію відведення. Текст пояснює лише те, що неможливо побачити безпосередньо.</p>' +
        '</div>';
      drainage.append(block);
    }

    const interfaces = document.querySelector("#system-interfaces .wrap");
    if (interfaces && !document.querySelector("#proof-lysimeter")) {
      const block = document.createElement("div");
      block.className = "proof-feature proof-feature-lysimeter";
      block.id = "proof-lysimeter";
      block.innerHTML =
        '<div class="proof-feature-copy">' +
          '<span class="proof-label">ПОЛИВ / ДРЕНАЖ</span>' +
          '<h3>Лізиметр збирає чисту контрольну пробу дренажу.</h3>' +
          '<p>Пластиковий лізиметр встановлюється під горщиком і спрямовує пробу в ємність OUT. Комплект IN/OUT допомагає порівнювати полив і дренаж; pH та EC вимірюються зовнішніми приладами.</p>' +
        '</div>' +
        '<div class="proof-feature-media proof-white"><a href="/portfolio-items/lysimeters/"><img src="/media/plantlogic-accessories/d31fe8ba66e2.jpg" alt="Пластиковий лізиметр PlantLogic — лоток для збору дренажу під горщиком" loading="lazy"></a></div>';
      interfaces.append(block);
      block.querySelector('.proof-feature-copy').insertAdjacentHTML('beforeend','<a class="text-button accessory-proof-link" href="/portfolio-items/lysimeters/">Лізиметри та комплект IN/OUT ↗</a>');
      const steel = document.createElement('div');
      steel.className = 'proof-feature proof-feature-lysimeter';
      steel.id = 'proof-steel-lysimeter';
      steel.innerHTML = '<div class="proof-feature-copy"><h3>Сталевий лізиметр для круглих горщиків.</h3><p>V-подібна основа відводить пробу до регульованого виходу. Кришка захищає її від листя, плодів і бруду. Виконання підбирається для відповідних горщиків PlantLogic 25, 30 та 40 л.</p><a class="text-button accessory-proof-link" href="/portfolio-items/steel-lysimeter-for-blueberry-pots/">Сталева модель · характеристики ↗</a></div><div class="proof-feature-media proof-white"><a href="/portfolio-items/steel-lysimeter-for-blueberry-pots/"><img src="/media/plantlogic-accessories/b2a15865775a.jpg" alt="Сталевий лізиметр PlantLogic з кришкою та виходом для дренажу" loading="lazy"></a></div>';
      interfaces.append(steel);

    }

    const strawberry = document.querySelector("#strawberry .wrap");
    if (strawberry && !document.querySelector("#proof-higrow")) {
      const block = document.createElement("figure");
      block.className = "proof-higrow proof-white";
      block.id = "proof-higrow";
      block.innerHTML =
        '<img src="/media/diagrams-uk/pl_technology_hi_grow_trough_system_plantlogic_1_diagram_1680_ua.webp?v=' + VERSION + '" alt="Офіційна схема PlantLogic Hi-Grow для жолобів" loading="lazy">' +
        '<figcaption><span>HI-GROW</span><strong>Офіційна схема системи</strong></figcaption>';
      strawberry.append(block);
    }

    const rubus = document.querySelector("#rubus");
    if (rubus && !document.querySelector("#proof-rubus")) {
      const figure = document.createElement("figure");
      figure.className = "proof-rubus proof-white";
      figure.id = "proof-rubus";
      figure.innerHTML =
        '<img src="/media/diagrams-uk/image-348-uk-v2.webp?v=' + VERSION + '" alt="Офіційна схема PlantLogic для малини та ожини" loading="lazy">' +
        '<figcaption><span>Малина та ожина · виробнича схема</span><strong>Офіційна схема PlantLogic</strong></figcaption>';
      rubus.after(figure);
    }

    return true;
  };

  const cleanLegacySections = () => {
    ["#offer","#about","#plantlogic","#monitoring-engineering","#crop-engineering"].forEach((selector) => {
      const node = document.querySelector(selector);
      if (node) node.remove();
    });

    const fieldStories = document.querySelector("#field-stories");
    const legacyCrops = document.querySelector("#crops");
    if (fieldStories && legacyCrops) legacyCrops.remove();

    document.querySelectorAll("a").forEach((link) => {
      if (link.textContent.trim() === "Культури") link.href = "/crops/";
    });

    const heroProduct = document.querySelector(".hero-product");
    if (heroProduct) heroProduct.remove();

    const scrollButton = document.querySelector(".hero .scroll-button");
    if (scrollButton) scrollButton.href = "#crops";

    const fieldHead = document.querySelector("#field-stories .lux-field-head h2");
    if (fieldHead) fieldHead.textContent = "PlantLogic у реальних виробничих системах.";

    const rootTitle = document.querySelector("#root-evidence .lux-root-copy h2");
    if (rootTitle) rootTitle.textContent = "Що можна оцінити по фактичній кореневій масі.";

    const videoTitle = document.querySelector("#corporate-video .video-band-head h2");
    if (videoTitle) videoTitle.textContent = "Технологічні вузли PlantLogic у русі.";

    const drainageTitle = document.querySelector("#drainage .section-heading h2");
    if (drainageTitle) drainageTitle.innerHTML = "Збір і контроль<br><span>дренажного потоку.</span>";
    const drainageText = document.querySelector("#drainage .section-heading p");
    if (drainageText) drainageText.textContent = "Показуємо шлях води після проходження через субстрат: від виходу з контейнера до організованого збору та контрольної точки OUT.";

    const lysimeterTitle = document.querySelector("#lysimeter .section-heading h2");
    if (lysimeterTitle) lysimeterTitle.innerHTML = "Контрольна проба<br><span class=\"soft\">IN / OUT.</span>";
    const lysimeterText = document.querySelector("#lysimeter .section-heading p");
    if (lysimeterText) lysimeterText.textContent = "Лізиметр потрібен для репрезентативного збору дренажу; pH та EC вимірюються зовнішніми приладами.";

    const rubusTitle = document.querySelector("#rubus h3");
    if (rubusTitle) rubusTitle.innerHTML = "Production і Long Cane:<br>різні виробничі сценарії.";
    const rubusLead = document.querySelector("#rubus .rubus-copy > p");
    if (rubusLead) rubusLead.textContent = "Для Rubus геометрію контейнера розглядаємо разом із щільністю ряду, cold storage, стабілізацією пагонів і дренажем.";

    const blueberry = document.querySelector("#blueberry");
    if (blueberry) {
      blueberry.classList.add("lux-motion-proof");
      blueberry.querySelectorAll(":scope > .section-index,:scope > .section-heading,.crop-feature").forEach((node) => node.remove());
      const heading = blueberry.querySelector(".catalog-heading");
      if (heading) {
        const first = heading.querySelector(".eyebrow");
        const last = heading.querySelector("span:last-child");
        if (first) first.textContent = "Відео конструкції";
        if (last) last.textContent = "U-пази / Zephyr V2";
      }

      const cards = [...blueberry.querySelectorAll(".product-card")];
      const videoCards = cards.filter((card) => card.classList.contains("has-product-video-story"));
      if (videoCards.length >= 2) {
        cards.forEach((card) => {
          const wrapper = card.parentElement;
          if (!card.classList.contains("has-product-video-story") && wrapper) wrapper.classList.add("lux-hide-card");
        });
        const grid = blueberry.querySelector(".product-grid");
        if (grid) grid.classList.add("lux-video-proof-grid");
      }
    }

    return true;
  };

  const rebuildTechnicalProof = () => {
    const technical = document.querySelector("#technical-core");
    if (technical && !technical.querySelector(".proof-principles")) {
      const grid = technical.querySelector(".technical-core-grid");
      if (grid) grid.remove();

      const head = technical.querySelector(".technical-core-head");
      if (head) {
        const h2 = head.querySelector("h2");
        const p = head.querySelector("p");
        if (h2) h2.textContent = "Що саме підтверджує конструкцію PlantLogic.";
        if (p) p.textContent = "Не перелік переваг, а чотири речі, які можна побачити: кореневу масу, геометрію дна, інтеграцію поливу та конструкцію Zephyr V2.";
      }

      const proof = document.createElement("div");
      proof.className = "proof-principles";
      proof.innerHTML =
        '<article class="proof-principle proof-principle-photo">' +
          '<figure><img src="/media/proof/root-zone-blueberry.jpg?v=' + VERSION + '" alt="Root zone PlantLogic blueberry" loading="lazy"></figure>' +
          '<div><span>01 / ROOT ZONE</span><h3>Фактична коренева маса</h3><p>Фото показує результат роботи кореневої зони без декоративної інтерпретації. Далі пояснюємо, які елементи конструкції впливають на рух води та повітря.</p></div>' +
        '</article>' +
        '<article class="proof-principle proof-principle-diagram">' +
          '<figure class="proof-white"><img src="/media/proof/round-20l-diagram.jpg?v=' + VERSION + '" alt="20L Round Pot official diagram" loading="lazy"></figure>' +
          '<div><span>02 / ROUND BASE</span><h3>Геометрія дна і опор</h3><p>Офіційна схема дозволяє побачити профіль контейнера, основу та розташування конструктивних зон замість абстрактної розмови про «дренаж».</p></div>' +
        '</article>' +
        '<article class="proof-principle proof-principle-diagram">' +
          '<figure class="proof-white"><img src="/media/diagrams-uk/ugroove-item-13080350-dimensions-uk.webp?v=' + VERSION + '" alt="Офіційне технічне креслення з U-пазами" loading="lazy"></figure>' +
          '<div><span>03 / U-GROOVE</span><h3>Поливна труба інтегрована у форму</h3><p>На кресленні видно сам паз і його положення. Технічне пояснення залишається коротким: навіщо це монтажу та повторюваності ряду.</p></div>' +
        '</article>' +
        '<article class="proof-principle proof-principle-diagram">' +
          '<figure class="proof-white"><img src="/media/diagrams-uk/zephyr-v2-section-11-uk.webp?v=' + VERSION + '" alt="Офіційна технічна схема Zephyr V2" loading="lazy"></figure>' +
          '<div><span>04 / ZEPHYR V2</span><h3>Висока опора і окрема база</h3><p>Офіційна технічна пластина показує, чому Zephyr V2 — окрема конструктивна платформа, а не просто інша форма контейнера.</p></div>' +
        '</article>';
      technical.querySelector(".wrap")?.append(proof);
    }

    const rootZone = document.querySelector("#root-zone");
    if (rootZone && !rootZone.dataset.proofRebuilt) {
      rootZone.dataset.proofRebuilt = "1";
      const visual = rootZone.querySelector(".root-zone-visual");
      if (visual) {
        visual.className = "root-zone-proof-media";
        visual.innerHTML =
          '<figure class="root-zone-proof-main"><img src="/media/proof/root-zone-blueberry.jpg?v=' + VERSION + '" alt="Blueberry root zone PlantLogic" loading="lazy"><figcaption>FIELD PHOTO / ROOT ZONE</figcaption></figure>' +
          '<figure class="root-zone-proof-drawing proof-white"><img src="/media/proof/round-20l-diagram.jpg?v=' + VERSION + '" alt="Round Pot official diagram PlantLogic" loading="lazy"><figcaption>OFFICIAL ROUND DIAGRAM</figcaption></figure>';
      }

      const heading = rootZone.querySelector(".root-zone-copy h2");
      const lead = rootZone.querySelector(".root-zone-copy > p");
      if (heading) heading.textContent = "Як читати воду й повітря через конструкцію контейнера.";
      if (lead) lead.textContent = "Зліва — коротка логіка процесу. Справа — реальна коренева маса та офіційна схема Round. Так твердження прив’язане до того, що можна побачити.";
    }

    const duplicateRootProof = document.querySelector("#proof-root-zone");
    if (duplicateRootProof) duplicateRootProof.remove();

    return true;
  };

  const integrateVideoProofs = () => {
    const proofArticles = document.querySelectorAll("#technical-core .proof-principle");
    if (proofArticles.length >= 4) {
      const placements = [
        { key: "ugroove-irrigation", index: 2, label: "U-GROOVE / MOTION" },
        { key: "zephyr-v2-install", index: 3, label: "ZEPHYR V2 / MOTION" }
      ];

      placements.forEach(({key,index,label}) => {
        const figure = document.querySelector('[data-video-story="' + key + '"]');
        const article = proofArticles[index];
        if (!figure || !article || article.querySelector('[data-proof-motion="' + key + '"]')) return;

        const inset = document.createElement("div");
        inset.className = "proof-motion-inset";
        inset.dataset.proofMotion = key;
        inset.innerHTML = '<span class="proof-motion-label">' + label + '</span>';
        inset.append(figure);
        article.append(inset);
      });

      const blueberry = document.querySelector("#blueberry");
      if (blueberry) blueberry.remove();
    }

    const corporateTitle = document.querySelector("#corporate-video .video-band-head h2");
    const corporateLead = document.querySelector("#corporate-video .video-band-head p");
    if (corporateTitle) corporateTitle.textContent = "PlantLogic у русі.";
    if (corporateLead) corporateLead.textContent = "Короткі фрагменти показують монтаж і роботу системи там, де статичного фото недостатньо.";

    const hiGrow = document.querySelector("#strawberry");
    if (hiGrow) {
      const title = hiGrow.querySelector(".higrow-copy h2");
      const lead = hiGrow.querySelector(".higrow-copy p");
      if (title) title.textContent = "Hi-Grow: схема плюс реальна робота системи.";
      if (lead) lead.textContent = "Відео показує просторову логіку установки, а офіційна схема нижче фіксує конструкцію без рекламної інтерпретації.";
    }

    return true;
  };

  const consolidateDeepSections = () => {
    ["#root-evidence","#geometry","#drainage"].forEach((selector) => {
      const node = document.querySelector(selector);
      if (node) node.remove();
    });

    document.querySelectorAll('a[href="#drainage"]').forEach((link) => {
      link.href = "#drainage-engineering";
    });

    const drainage = document.querySelector("#drainage-engineering .wrap");
    if (drainage && !drainage.querySelector(".drainage-application-band")) {
      const head = drainage.querySelector(".drainage-engineering-head");
      const band = document.createElement("figure");
      band.className = "drainage-application-band";
      band.innerHTML =
        '<img src="/media/drainage.webp" alt="Drainage Collection PlantLogic у виробничій системі" loading="lazy">' +
        '<span class="drainage-application-shade"></span>' +
        '<figcaption>' +
          '<span>Застосування · збір дренажу</span>' +
          '<strong>Спочатку показуємо систему в ряду. Нижче — конструкцію та технічне креслення.</strong>' +
        '</figcaption>';
      if (head) head.after(band); else drainage.prepend(band);
    }

    const familyHead = document.querySelector("#family-engineering .family-engineering-head h2");
    const familyLead = document.querySelector("#family-engineering .family-engineering-head > p");
    if (familyHead) familyHead.textContent = "Порівняння конструкцій горщиків PlantLogic";
    if (familyLead) familyLead.textContent = "Круглий · Квадратний · U-пази · Zephyr V2 · Збір дренажу. Порівнюємо за поливом, дренажем, поверхнею встановлення та щільністю ряду.";

    const source = document.querySelector("#technical-source-note");
    if (source) {
      const strong = source.querySelector("strong");
      const p = source.querySelector("p");
      if (strong) strong.textContent = "Джерело технічних матеріалів";
      if (p) p.textContent = "Фото, креслення та схеми на сторінці взяті з офіційного медіаархіву й технічних матеріалів PlantLogic. Текст використовується тільки для пояснення того, що показано візуально.";
    }

    return true;
  };

  const polishPublicChrome = () => {
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.querySelector(".hero-copy .eyebrow")?.remove();
      hero.querySelector(".photo-top")?.remove();
      hero.querySelector(".hero-bottom")?.remove();
      hero.querySelector(".hero-foot > span")?.remove();
      hero.querySelector(".photo-label .micro")?.remove();
      hero.querySelector(".lux-hero-metrics")?.remove();
    }

    document.querySelectorAll(".section-index,.lux-kicker,.lux-field-index,.lux-field-copy>span,.proof-motion-label").forEach((node) => node.remove());
    document.querySelectorAll(".proof-label,.proof-principle > div > span,.interfaces-no").forEach((node) => node.remove());

    const wrapTextArrow = (root = document) => {
      const selectors = [
        ".market-link",".header-cta",".button",".text-button",
        ".garden-product-more",".product-primary-action",
        ".product-detail-source a",".product-source-inner a",
        ".related-product-card",".garden-products-foot a"
      ];
      root.querySelectorAll(selectors.join(",")).forEach((el) => {
        if (el.querySelector(".lux-arrow-chip,.lux-arrow-mark")) return;
        const svg = el.querySelector("svg");
        if (svg) {
          const chip = document.createElement("span");
          chip.className = "lux-arrow-chip";
          svg.replaceWith(chip);
          chip.append(svg);
          return;
        }
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const value = node.nodeValue || "";
          if (!/[↗→]\s*$/.test(value)) continue;
          node.nodeValue = value.replace(/[↗→]\s*$/, "").replace(/\s+$/, "");
          const chip = document.createElement("span");
          chip.className = "lux-arrow-chip";
          chip.setAttribute("aria-hidden","true");
          chip.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          el.append(chip);
          break;
        }
      });
    };
    wrapTextArrow();
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
    makeTechnicalProofs();
    cleanLegacySections();
    rebuildTechnicalProof();
    integrateVideoProofs();
    consolidateDeepSections();
    polishPublicChrome();
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