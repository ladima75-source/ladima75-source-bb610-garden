(() => {
  const VERSION = "20260929-flow-v1";

  const cropStories = [
    {
      name: "Лохина",
      en: "BLUEBERRY",
      image: "/media/plantlogic-blueberry/8400a784a135.jpg",
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
      image: "/media/lux/strawberry-hydroponics.webp?v=" + VERSION,
      href: "#lux-strawberry",
      tag: "",
      title: "Піднята культура як окрема інженерна система.",
      text: "Hi-Grow відділяє робочу зону культури від ґрунту й дозволяє будувати підняті та підвісні конфігурації з окремою логікою дренажу."
    },
    {
      name: "Овочі",
      en: "VEGETABLES",
      image: "/media/lux/vegetable-production.webp?v=" + VERSION,
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
          '<div><h2>Культури та технології вирощування</h2></div>' +
          '<p>Фото показують не окремий виріб, а середовище його роботи: ряд, теплицю, висоту культури, полив, дренаж і доступ персоналу.</p>' +
        '</div>' +
        '<div class="lux-field-controls" aria-label="Гортання карток культур">' +
          '<span class="lux-field-hint"><span aria-hidden="true">↔</span> Гортайте картки вбік</span>' +
          '<div class="lux-field-pager">' +
            '<span class="lux-field-count" aria-live="polite" aria-atomic="true">1 / 4</span>' +
            '<button type="button" class="lux-field-prev" aria-label="Попередня культура" disabled>←</button>' +
            '<button type="button" class="lux-field-next" aria-label="Наступна культура">→</button>' +
          '</div>' +
        '</div>' +
        '<div class="lux-field-grid" role="region" aria-label="Картки культур" tabindex="0">' +
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

  const setupFieldStoryNavigation = () => {
    const section = document.querySelector("#field-stories");
    if (!section || section.dataset.fieldControlsReady === "1") return;
    const track = section.querySelector(".lux-field-grid");
    const cards = [...(track?.querySelectorAll(".lux-field-card") || [])];
    const prev = section.querySelector(".lux-field-prev");
    const next = section.querySelector(".lux-field-next");
    const count = section.querySelector(".lux-field-count");
    if (!track || cards.length < 2 || !prev || !next || !count) return;
    section.dataset.fieldControlsReady = "1";

    // Use actual card positions, not viewport-width guesses; keep vertical page scroll native.
    const cardLeft = (card) => track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const activeIndex = () => {
      const scroll = track.scrollLeft;
      return cards.reduce((best, card, index) =>
        Math.abs(cardLeft(card) - scroll) < Math.abs(cardLeft(cards[best]) - scroll) ? index : best, 0);
    };
    const update = () => {
      const i = activeIndex();
      count.textContent = (i + 1) + " / " + cards.length;
      prev.disabled = i === 0;
      next.disabled = i === cards.length - 1;
    };
    const step = (delta) => {
      const i = Math.max(0, Math.min(cards.length - 1, activeIndex() + delta));
      track.scrollTo({
        left: cardLeft(cards[i]),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    };
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
    track.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update, {passive: true});
    update();
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
          '<img src="/media/lux/blueberry-production.webp?v=' + VERSION + '" alt="Коренева маса лохини після вирощування в контейнерній системі PlantLogic" loading="lazy">' +
          '<figcaption><strong>Коренева зона після виробничого циклу</strong></figcaption>' +
        '</figure>' +
        '<div class="lux-root-copy">' +
          '' +
          '<h2>Конструкцію оцінюють за тим, як вона працює з водою, повітрям і кореневою зоною.</h2>' +
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
      '<img src="/media/diagrams-uk/zephyr-v2-section-11-uk.webp?v=' + VERSION + '" alt="Технічна схема Zephyr V2 PlantLogic" loading="lazy">' +
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
          '<h3>Фактична коренева маса показує розподіл коренів у робочому об’ємі.</h3>' +
          '<p>Фото кореневої зони ставимо поруч зі схемою круглої моделі, щоб показати зв’язок між геометрією контейнера та розподілом коренів.</p>' +
        '</div>' +
        '<div class="proof-band-media proof-band-media-double">' +
          '<figure><img src="/media/proof/root-zone-blueberry.jpg?v=' + VERSION + '" alt="Root zone blueberry PlantLogic" loading="lazy"><figcaption>Фактична коренева зона</figcaption></figure>' +
          '<figure class="proof-white"><img src="/media/proof/round-20l-diagram.jpg?v=' + VERSION + '" alt="Схема круглого горщика PlantLogic 20 л" loading="lazy"><figcaption>Схема круглої моделі · 20 л</figcaption></figure>' +
        '</div>';
      rootZone.append(band);
    }

    const geometry = document.querySelector("#geometry .geometry-grid");
    if (geometry && !document.querySelector("#proof-ugroove")) {
      const block = document.createElement("article");
      block.className = "proof-feature proof-feature-ugroove";
      block.id = "proof-ugroove";
      block.innerHTML =
        '<div class="proof-feature-media proof-white"><img src="/media/diagrams-uk/ugroove-item-13080350-dimensions-uk.webp?v=' + VERSION + '" alt="Технічне креслення PlantLogic з U-пазами" loading="lazy"></div>' +
        '<div class="proof-feature-copy">' +
          '<span class="proof-label">U-ПАЗИ</span>' +
          '<h3>U-пази задають фіксоване положення поливної труби.</h3>' +
          '<p>Технічне креслення показує геометрію посадкового місця для поливної труби та принцип її фіксації.</p>' +
        '</div>';
      geometry.after(block);
    }

    const drainage = document.querySelector("#drainage-engineering .wrap");
    if (drainage && !document.querySelector("#proof-drainage")) {
      const block = document.createElement("div");
      block.className = "proof-band proof-drainage-band";
      block.id = "proof-drainage";
      block.innerHTML =
        '<div class="proof-band-media proof-white"><figure><img src="/media/proof/drainage-25l-tech-drawing.png?v=' + VERSION + '" alt="Схема основи горщика 25 л зі збором дренажу" loading="lazy"><figcaption>Горщик 25 л зі збором дренажу · схема основи</figcaption></figure></div>' +
        '<div class="proof-band-copy">' +
          '<span class="proof-label">ЗБІР ДРЕНАЖУ</span>' +
          '<h3>Вихід у дні збирає зайву воду в одну лінію.</h3>' +
          '<p>Піднята основа залишає простір під контейнером, а дренажні виходи спрямовують стік до жолоба або окремої лінії для відведення чи контролю.</p>' +
        '</div>';
      drainage.append(block);
    }

    // Product family belongs between the irrigation-to-drainage explanation and the lysimeter proof.
    const basesContainer = document.querySelector("#system-interfaces .wrap");
    if (basesContainer && !document.querySelector("#garden-bases-showcase")) {
      const models = [
        { title: "Мішок для субстрату з інтегрованою основою", no: "13079250 / 13079300", note: "Основа та мішок утворюють готову конструкцію для розміщення субстрату над поверхнею. Пірамідальна геометрія спрямовує надлишок води до периферії, а центральні отвори залишають шлях для повітрообміну в кореневій зоні. Доступні об’єми 25 і 30 л.", image: "/media/plantlogic-bag-bases/5cbd2a3536e8.jpg", href: "/portfolio-items/culti-base-grow-bag-with-integrated-base/", rowClass: "garden-base-card--culti" },
        { title: "Основа VF для мішка з субстратом", no: "12010300 / 12010320 / 12010400", note: "Платформа заввишки 50 мм піднімає мішок над поверхнею, залишаючи простір для відведення води та руху повітря. Передбачено три виконання; модифікація 3232 Hose fix додатково фіксує поливну трубу між мішком і основою.", image: "/media/plantlogic-bag-bases/0df6e54eea15.jpg", href: "/portfolio-items/vf-base-for-open-top-grow-bags/", rowClass: "garden-base-card--vf" },
        { title: "Основа для мішка зі збором дренажу", no: "1301036", note: "Внутрішні канали спрямовують дренажну воду до центрального жолоба, звідки її можна організовано відвести з виробничого ряду. Широка опора зменшує просідання мішка на м’якому ґрунті; основи вкладаються одна в одну для компактного транспортування.", image: "/media/plantlogic-bag-bases/b86de5f6653d.jpg", href: "/portfolio-items/bag-base-drainage-collection/", rowClass: "garden-base-card--drainage-base" },
        { title: "Основа Rivus з інтегрованим дренажним жолобом", no: "13020500 / 13020502", note: "Профіль поєднує опору для субстратної плити та дренажний жолоб в одній конструкції. Простір під плитою забезпечує повітрообмін, а стік відводиться вздовж ряду. Висота профілю — 60 мм; передбачені довжини 2, 4 та 8 м.", image: "/media/plantlogic-rubus-vegetables/cccbe7846031.jpg", href: "/portfolio-items/rivus-slab-base/", rowClass: "garden-base-card--rivus" }
      ];
      const showcase = document.createElement("section");
      showcase.id = "garden-bases-showcase";
      showcase.className = "garden-bases-showcase";
      showcase.setAttribute("aria-labelledby", "garden-bases-heading");
      showcase.innerHTML =
        '<div class="garden-bases-head">' +
          '<h3 id="garden-bases-heading">Основи та мішки для субстратного вирощування</h3>' +
          '<p>Різні конструкції підтримують кореневу зону над поверхнею, організовують доступ повітря та відведення надлишкової води. Нижче показано принцип роботи кожної основи.</p>' +
        '</div>' +
        '<div class="garden-bases-grid">' +
          models.map(item =>
            '<article class="garden-base-card ' + item.rowClass + '">' +
              '<div class="garden-base-content">' +
                '<span class="garden-base-code">Артикул ' + item.no + '</span>' +
                '<h4>' + item.title + '</h4>' +
                '<p>' + item.note + '</p>' +
                '<a class="garden-base-detail" href="' + item.href + '">Технічні характеристики ↗</a>' +
              '</div>' +
              '<figure class="garden-base-media"><img src="' + item.image + '" alt="' + item.title + ' — фото PlantLogic" loading="lazy" decoding="async"></figure>' +
            '</article>'
          ).join('') +
        '</div>';
      const lysimeter = basesContainer.querySelector("#proof-lysimeter");
      if (lysimeter) lysimeter.before(showcase);
      else basesContainer.append(showcase);
    }

    const interfaces = document.querySelector("#system-interfaces .wrap");
    if (interfaces && !document.querySelector("#proof-lysimeter")) {
      const block = document.createElement("div");
      block.className = "proof-feature proof-feature-lysimeter";
      block.id = "proof-lysimeter";
      block.innerHTML =
        '<div class="proof-feature-copy">' +
          '<span class="proof-label">ПОЛИВ / ДРЕНАЖ</span>' +
          '<h3>Лізиметр збирає дренаж безпосередньо під горщиком.</h3>' +
          '<p>Пластиковий лізиметр встановлюється під горщиком і спрямовує стік у окрему ємність. Комплект з ємностями для поданого розчину та дренажу дозволяє порівнювати їх об’єм; pH та EC вимірюються зовнішніми приладами.</p>' +
        '</div>' +
        '<div class="proof-feature-media proof-white"><a href="/portfolio-items/lysimeters/"><img src="/media/plantlogic-accessories/d31fe8ba66e2.jpg" alt="Пластиковий лізиметр PlantLogic — лоток для збору дренажу під горщиком" loading="lazy"></a></div>';
      interfaces.append(block);
      block.querySelector('.proof-feature-copy').insertAdjacentHTML('beforeend','<a class="text-button accessory-proof-link" href="/portfolio-items/lysimeters/">Технічні характеристики ↗</a>');


    }

    const strawberry = document.querySelector("#strawberry .wrap");
    if (strawberry && !document.querySelector("#proof-higrow")) {
      const block = document.createElement("figure");
      block.className = "proof-higrow proof-white";
      block.id = "proof-higrow";
      block.innerHTML =
        '<img src="/media/diagrams-uk/pl_technology_hi_grow_trough_system_plantlogic_1_diagram_1680_ua-garden.webp?v=' + VERSION + '" alt="Схема PlantLogic Hi-Grow для жолобів" loading="lazy">' +
        '<figcaption><span>HI-GROW</span><strong>Схема системи</strong></figcaption>';
      strawberry.append(block);
    }

    const rubus = document.querySelector("#rubus");
    if (rubus && !document.querySelector("#proof-rubus")) {
      const figure = document.createElement("figure");
      figure.className = "proof-rubus proof-white";
      figure.id = "proof-rubus";
      figure.innerHTML =
        '<img src="/media/diagrams-uk/image-348-uk-v2.webp?v=' + VERSION + '" alt="Схема PlantLogic для малини та ожини" loading="lazy">' +
        '<figcaption><span>Малина та ожина · виробнича схема</span><strong>Схема PlantLogic</strong></figcaption>';
      rubus.after(figure);
    }

    return true;
  };

  const makeQualitySection = () => {
    const section = document.querySelector("#lysimeter");
    if (!section) return false;
    if (section.dataset.plantlogicQuality === "v1") return true;

    section.dataset.plantlogicQuality = "v1";
    section.className = "plantlogic-quality section";
    section.innerHTML = `
      <div class="wrap plantlogic-quality-grid">
        <div class="plantlogic-quality-media">
          <video class="plantlogic-quality-video plantlogic-quality-video-vertical" muted loop playsinline preload="none"
            poster="/media/video/plantlogic_4_vertical_web-poster.webp?v=20261007-quality-video-v1"
            aria-label="PlantLogic: випробування міцності горщика у чотирьох відеокадрах">
            <source data-src="/media/video/plantlogic_4_vertical_web.mp4?v=20261007-quality-video-v1" type="video/mp4">
          </video>
        </div>

        <div class="plantlogic-quality-copy">
          <span class="plantlogic-quality-eyebrow">ЯКІСТЬ PLANTLOGIC</span>
          <h2>Виробництво PlantLogic</h2>
          <p class="plantlogic-quality-lead">
            Міцність, точність форми та можливість повторного використання залежать від матеріалу й технології виготовлення.
          </p>

          <div class="plantlogic-quality-facts">
            <article>
              <strong>Власне виробництво</strong>
              <p>Власний завод PlantLogic у Нінбо (Китай).</p>
            </article>
            <article>
              <strong>Повна автоматизація</strong>
              <p>Горщики виготовляють на автоматизованих виробничих лініях.</p>
            </article>
            <article>
              <strong>Матеріали</strong>
              <p>Властивості сировини впливають на міцність, форму та довговічність контейнера.</p>
            </article>
            <article>
              <strong>Повторне використання</strong>
              <p>За належного використання контейнери можна застосовувати повторно.</p>
            </article>
          </div>
        </div>
      </div>
    `;

    const qualityVideo = section.querySelector(".plantlogic-quality-video");
    if (qualityVideo) {
      const activateQualityVideo = () => {
        if (qualityVideo.dataset.loaded) return;
        qualityVideo.dataset.loaded = "1";
        qualityVideo.querySelectorAll("source[data-src]").forEach((source) => {
          source.src = source.dataset.src;
          source.removeAttribute("data-src");
        });
        qualityVideo.load();
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
          qualityVideo.autoplay = true;
          qualityVideo.setAttribute("autoplay", "");
          qualityVideo.play().catch(() => {});
        }
      };

      if ("IntersectionObserver" in window) {
        const qualityObserver = new IntersectionObserver((entries, observer) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          activateQualityVideo();
          observer.disconnect();
        }, { rootMargin: "0px", threshold: 0 });
        qualityObserver.observe(qualityVideo);
      } else {
        activateQualityVideo();
      }
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
    if (fieldHead) fieldHead.textContent = "Рішення для різних культур";

    const rootTitle = document.querySelector("#root-evidence .lux-root-copy h2");
    if (rootTitle) rootTitle.textContent = "Що можна оцінити по фактичній кореневій масі.";

    const videoTitle = document.querySelector("#corporate-video .video-band-head h2");
    if (videoTitle) videoTitle.textContent = "Технологічні вузли PlantLogic у русі.";

    const drainageTitle = document.querySelector("#drainage .section-heading h2");
    if (drainageTitle) drainageTitle.innerHTML = "Збір і контроль<br><span>дренажного потоку.</span>";
    const drainageText = document.querySelector("#drainage .section-heading p");
    if (drainageText) drainageText.textContent = "Показуємо шлях води після проходження через субстрат: від виходу з контейнера до організованого збору та контрольної точки OUT.";

    const rubusTitle = document.querySelector("#rubus h3");
    if (rubusTitle) rubusTitle.innerHTML = "Production і Long Cane:<br>різні виробничі сценарії.";
    const rubusLead = document.querySelector("#rubus .rubus-copy > p");
    if (rubusLead) rubusLead.textContent = "Для малини та ожини геометрію контейнера розглядаємо разом із щільністю ряду, холодним зберіганням, стабілізацією пагонів і дренажем.";

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
        if (h2) h2.textContent = "Як будова горщика впливає на кореневу зону";
        if (p) p.textContent = "Основа, дренажні отвори та кріплення поливу впливають на відведення води, доступ повітря й розміщення коренів у субстраті.";
      }

      const proof = document.createElement("div");
      proof.className = "proof-principles";
      proof.innerHTML =
        '<article class="proof-principle proof-principle-photo">' +
          '<figure class="proof-card-media"><img src="/media/proof/root-zone-blueberry.jpg?v=' + VERSION + '" alt="Коренева маса лохини після вирощування у горщику PlantLogic" loading="lazy"></figure>' +
          '<div class="proof-card-copy"><h3>Як корені заповнюють субстрат</h3><p>На фото видно кореневу систему, що сформувалася по всій висоті та ширині субстрату.</p><a class="proof-card-link" href="/blueberry-production/">Вирощування лохини ↗</a></div>' +
        '</article>' +
        '<article class="proof-principle proof-principle-diagram">' +
          '<figure class="proof-card-media proof-white"><img src="/media/proof/round-20l-diagram.jpg?v=' + VERSION + '" alt="Схема дренажу та повітрообміну круглого горщика PlantLogic 20 л" loading="lazy"></figure>' +
          '<div class="proof-card-copy"><h3>Зайва вода виходить вниз, повітря заходить знизу</h3><p>Відкрита основа та зазор під горщиком дають дренажу вільний вихід і залишають нижню частину контейнера відкритою для повітрообміну.</p><a class="proof-card-link" href="/portfolio-items/20-liter-round-pot/">Круглий горщик 20 л ↗</a></div>' +
        '</article>' +
        '<article class="proof-principle proof-principle-motion" id="proof-square-ugroove">' +
          '<div class="proof-video-slot" data-proof-slot="ugroove-irrigation"></div>' +
          '<div class="proof-card-copy"><h3>Поливна лінія фіксується на краю й не заважає дренажу</h3><p>U-пази утримують поливну трубу вздовж краю контейнера. Дно та бічні отвори залишаються відкритими для відведення води й повітрообміну.</p><ul class="proof-card-facts"><li>Труба зафіксована вздовж краю</li><li>Дно залишається відкритим</li><li>Бічні отвори не перекриваються</li></ul><a class="proof-card-link" href="/catalog/#pots">Горщики для вашої технології ↗</a></div>' +
        '</article>' +
        '<article class="proof-principle proof-principle-zephyr" id="proof-zephyr">' +
          '<div class="proof-zephyr-heading"><h3>Zephyr V2: опори 70 мм і доступ повітря</h3><a class="proof-card-link" href="/portfolio-items/zephyr-v2/">Моделі 25, 30 і 40 л ↗</a></div>' +
          '<figure class="proof-zephyr-schema"><button class="proof-diagram-open" type="button" aria-label="Збільшити схему Zephyr V2"><img src="/media/diagrams-uk/zephyr-v2-airflow-wide-uk.webp?v=' + VERSION + '" alt="Схема Zephyr V2: зони аерації, рух води та окрема основа" loading="lazy"><span class="proof-diagram-hint">Збільшити схему ⤢</span></button></figure>' +
          '<div class="proof-zephyr-detail"><div class="proof-video-slot" data-proof-slot="zephyr-v2-install"></div><div class="proof-card-copy"><h4>Основа піднімає контейнер над поверхнею</h4><p>Ніжки висотою 7 см створюють зазор під контейнером: нижні отвори не перекриваються поверхнею, а зайва вода може вільно відводитися з кореневої зони.</p><a class="proof-card-link" href="/media/tech-sheets-uk/zephyr-v2-uk.pdf?v=20261006-clean-v2" target="_blank" rel="noopener">Завантажити технічний опис</a></div></div>' +
        '</article>';
      technical.querySelector(".wrap")?.append(proof);
      const dialog = document.createElement("dialog");
      dialog.className = "proof-diagram-dialog";
      dialog.setAttribute("aria-label", "Схема Zephyr V2 у повному розмірі");
      dialog.innerHTML = '<button class="proof-diagram-close" type="button" aria-label="Закрити схему">×</button><img src="/media/diagrams-uk/zephyr-v2-airflow-wide-uk.webp" alt="Українська технічна схема Zephyr V2">';
      technical.append(dialog);
      proof.querySelector(".proof-diagram-open").addEventListener("click", () => dialog.showModal());
      dialog.querySelector(".proof-diagram-close").addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    }

    const rootZone = document.querySelector("#root-zone");
    if (rootZone && !rootZone.dataset.proofRebuilt) {
      rootZone.dataset.proofRebuilt = "1";
      const visual = rootZone.querySelector(".root-zone-visual");
      if (visual) {
        visual.className = "root-zone-proof-media";
        visual.innerHTML =
          '<figure class="root-zone-proof-main"><img src="/media/proof/root-zone-blueberry.jpg?v=' + VERSION + '" alt="Blueberry root zone PlantLogic" loading="lazy"><figcaption>Коренева зона · фото з виробництва</figcaption></figure>' +
          '<figure class="root-zone-proof-drawing proof-white"><img src="/media/proof/round-20l-diagram.jpg?v=' + VERSION + '" alt="Схема круглого горщика PlantLogic" loading="lazy"><figcaption>Схема круглої моделі</figcaption></figure>';
      }

      const heading = rootZone.querySelector(".root-zone-copy h2");
      const lead = rootZone.querySelector(".root-zone-copy > p");
      if (heading) heading.textContent = "Як вода й повітря рухаються в горщику";
      if (lead) lead.textContent = "Отвори в основі відводять зайву воду, а простір під дном забезпечує доступ повітря. Поруч — фото сформованої кореневої системи.";
    }

    const duplicateRootProof = document.querySelector("#proof-root-zone");
    if (duplicateRootProof) duplicateRootProof.remove();

    return true;
  };

  const integrateVideoProofs = () => {
    const proofArticles = document.querySelectorAll("#technical-core .proof-principle");
    if (proofArticles.length >= 4) {
      const placements = ["ugroove-irrigation", "zephyr-v2-install"];

      placements.forEach((key) => {
        const figure = document.querySelector('[data-video-story="' + key + '"]');
        const slot = document.querySelector('[data-proof-slot="' + key + '"]');
        if (!figure || !slot || slot.contains(figure)) return;
        slot.append(figure);
        figure.querySelector("video").setAttribute("aria-label", key === "ugroove-irrigation" ? "Квадратний горщик 40 л: встановлення поливної труби у U-пази" : "Монтаж оболонки Zephyr V2 на основу");
      });

      const blueberry = document.querySelector("#blueberry");
      if (blueberry) blueberry.remove();
    }

    const corporateTitle = document.querySelector("#corporate-video .video-band-head h2");
    const corporateLead = document.querySelector("#corporate-video .video-band-head p");
    if (corporateTitle) corporateTitle.textContent = "Як виготовляють продукцію PlantLogic";
    if (corporateLead) corporateLead.textContent = "Виробничі лінії, робота обладнання та процес виготовлення пластикових контейнерів на заводі PlantLogic.";

    const hiGrow = document.querySelector("#strawberry");
    if (hiGrow) {
      const title = hiGrow.querySelector(".higrow-copy h2");
      const lead = hiGrow.querySelector(".higrow-copy p");
      const copy = hiGrow.querySelector(".higrow-copy");
      const grid = hiGrow.querySelector(".higrow-grid");

      if (title) title.innerHTML = "Hi-Grow:<br>система для вирощування полуниці над ґрунтом.";
      if (lead) {
        lead.className = "higrow-lead";
        lead.textContent = "У Hi-Grow горщики або жолоби розміщують над землею, а окрема дренажна лінія відводить зайву воду. Її ухил можна регулювати незалежно від висоти опор.";
      }

      if (copy && !copy.querySelector(".higrow-configs")) {
        const configs = document.createElement("div");
        configs.className = "higrow-configs";
        configs.innerHTML = '<span>На опорах</span><span>Підвісна система</span><span>Горщики / жолоби / мати</span>';
        copy.append(configs);
      }

      if (grid && !grid.querySelector(".higrow-facts")) {
        const facts = document.createElement("div");
        facts.className = "higrow-facts";
        facts.innerHTML =
          '<article><strong>Близько 27% менше сталі</strong><p>За даними PlantLogic, нова конструкція використовує приблизно на 27% менше сталі, ніж традиційні системи з металевим жолобом.</p></article>' +
          '<article><strong>Регульований ухил дренажу</strong><p>Верхівки опор не потребують точного нівелювання: ухил дренажного жолоба задається окремо кронштейном.</p></article>' +
          '<article><strong>Дренаж відокремлений від коренів</strong><p>Стоки відводяться нижче кореневої зони. Опційний збір дренажу допомагає контролювати вологість у теплиці або тунелі.</p></article>' +
          '<article><strong>Гнучка конфігурація</strong><p>Hi-Grow працює з горщиками, жолобами та субстратними матами; підтримує крапельні лінії та крапельниці на кілочках.</p></article>';
        const proof = grid.querySelector("#proof-higrow");
        if (proof) grid.insertBefore(facts, proof); else grid.append(facts);
      }

      const proofCaption = hiGrow.querySelector("#proof-higrow figcaption strong");
      if (proofCaption) proofCaption.textContent = "Як влаштовано Hi-Grow";
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
          '<span>Як працює збір дренажу в ряду</span>' +
          '<strong>Вода з контейнерів спрямовується в окрему лінію, а не залишається на поверхні під рослинами.</strong>' +
        '</figcaption>';
      if (head) head.after(band); else drainage.prepend(band);
    }

    const familyHead = document.querySelector("#family-engineering .family-engineering-head h2");
    const familyLead = document.querySelector("#family-engineering .family-engineering-head > p");
    if (familyHead) familyHead.textContent = "Чим відрізняються конструкції горщиків PlantLogic";
    if (familyLead) familyLead.textContent = "Порівнюйте форму, висоту опор, кріплення поливної труби й спосіб відведення дренажу. Саме ці деталі відрізняють моделі між собою.";

    const source = document.querySelector("#technical-source-note");
    if (source) source.remove();

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

    const contact = document.querySelector("#b2b");
    if (contact) {
      const title = contact.querySelector("h2");
      const text = contact.querySelector(".contact-inner p");
      if (title) title.innerHTML = "Питання щодо продукції<br><span>та постачання.</span>";
      if (text) text.textContent = "Вкажіть культуру, потрібну модель або задачу. Надішлемо характеристики, наявність, умови постачання та посилання на відповідні позиції.";
    }

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
    setupFieldStoryNavigation();
    makeRootEvidence();
    decorateZephyr();
    makeVisualRail();
    makeTechnicalProofs();
    makeQualitySection();
    cleanLegacySections();
    rebuildTechnicalProof();
    integrateVideoProofs();
    consolidateDeepSections();
    polishPublicChrome();
    reveal();
  };

  const boot = () => {
    run();
    [240, 720, 1600, 3200].forEach((delay) => setTimeout(run, delay));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
