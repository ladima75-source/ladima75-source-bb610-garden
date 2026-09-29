(() => {
  const VERSION = "20260929-technical-depth-v1";

  const facts = [
    {
      no: "01",
      title: "Пірамідальне дно",
      text: "Геометрія дна спрямовує дренаж до зовнішнього периметра. Це зменшує локальну перезволожену зону внизу контейнера та залишає центр кореневого об’єму відкритішим для газообміну."
    },
    {
      no: "02",
      title: "Повітря в центр кореневої маси",
      text: "Недренуючі центральні отвори працюють як вентиляційні канали: вони підводять повітря в середину субстрату, але не створюють прямий шлях для втрати субстрату вниз."
    },
    {
      no: "03",
      title: "Розрив водяного натягу",
      text: "Крайові дренажні отвори конструктивно пов’язані з ніжками. Така схема допомагає воді залишати дно контейнера замість утворення застійної насиченої зони."
    },
    {
      no: "04",
      title: "Air-pruning",
      text: "Дренаж виходить у відкриту зону з інтенсивним рухом повітря. Корінь, що доходить до цієї межі, природно підсушується на кінчику, що стримує вихід коренів назовні та формує розгалуження всередині субстрату."
    },
    {
      no: "05",
      title: "Відрив від ґрунту",
      text: "Ніжки піднімають кореневу зону над поверхнею. Це покращує відведення дренажу, зменшує контакт коренів із ґрунтом і знижує прямий контакт із ґрунтовими патогенами."
    },
    {
      no: "06",
      title: "Інтеграція поливу",
      text: "U-пази та посадочні місця для кліпс фіксують поливну трубу в заданому положенні. Це спрощує монтаж, обслуговування й повторюваність конфігурації вздовж ряду."
    }
  ];

  const removeMarketBridge = () => {
    document.querySelectorAll(
      ".market-bridge-section,.market-hero-link,.featured-market-link,.section-market-link,.market-card-note"
    ).forEach((node) => node.remove());
    document.querySelectorAll("[data-market-url]").forEach((node) => {
      node.removeAttribute("data-market-url");
      node.removeAttribute("data-market-linked");
      node.removeAttribute("title");
    });
  };

  const rewriteHero = () => {
    const hero = document.querySelector(".hero");
    if (!hero || hero.dataset.technicalDepth === VERSION) return;
    hero.dataset.technicalDepth = VERSION;

    const h1 = hero.querySelector("h1");
    if (h1) h1.textContent = "Інженерія кореневої зони для професійного вирощування у субстраті";

    const description = hero.querySelector(".hero-description");
    if (description) {
      description.textContent =
        "PlantLogic — це не просто форма горщика. Геометрія дна, вентиляція, дренаж, висота опори та розміщення поливу працюють як єдина система керування кореневою зоною.";
    }

    const buttons = hero.querySelector(".hero-buttons");
    if (buttons) {
      const first = buttons.querySelector("a.button");
      if (first) {
        first.href = "#technical-core";
        first.firstChild && (first.firstChild.textContent = "Технічні принципи ");
      }
      const second = buttons.querySelector("a.text-button");
      if (second) {
        second.href = "#root-zone";
        second.firstChild && (second.firstChild.textContent = "Як працює коренева зона ");
      }
    }
  };

  const rewriteOffer = () => {
    const offer = document.querySelector("#offer");
    if (!offer || offer.dataset.technicalDepth === VERSION) return;
    offer.dataset.technicalDepth = VERSION;

    const heading = offer.querySelector(".clarity-heading h2");
    if (heading) heading.textContent = "Елементи однієї технологічної системи";

    const p = offer.querySelector(".clarity-heading p");
    if (p) {
      p.textContent =
        "Контейнер, дренаж, опора, полив і моніторинг розглядаємо не окремо, а як систему керування водою, повітрям і стабільністю кореневої зони.";
    }
  };

  const makeTechnicalCore = () => {
    if (document.querySelector("#technical-core")) return true;
    const target = document.querySelector("#corporate-video") || document.querySelector("#offer");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "technical-core section";
    section.id = "technical-core";
    section.innerHTML = `
      <div class="wrap">
        <div class="technical-core-head">
          <div>
            <span class="tech-eyebrow">PLANTLOGIC / ROOT ZONE ENGINEERING</span>
            <h2>Шість конструктивних принципів, які працюють разом</h2>
          </div>
          <p>
            Основна логіка PlantLogic — не утримувати корінь у «ємності», а сформувати кероване середовище:
            швидко відвести надлишок води, зберегти кисень у субстраті, стабілізувати полив і відокремити корінь від ґрунту.
          </p>
        </div>
        <div class="technical-core-grid">
          ${facts.map((item) => `
            <article class="technical-core-card">
              <span class="technical-core-no">${item.no}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `).join("")}
        </div>
      </div>
    `;
    target.after(section);
    return true;
  };

  const makeRootZone = () => {
    if (document.querySelector("#root-zone")) return true;
    const target = document.querySelector("#technical-core");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "root-zone section";
    section.id = "root-zone";
    section.innerHTML = `
      <div class="wrap root-zone-grid">
        <div class="root-zone-copy">
          <span class="tech-eyebrow">КОРЕНЕВА ЗОНА / ВОДА + ПОВІТРЯ</span>
          <h2>Завдання — прибрати застійну воду, не позбавляючи корінь вологи</h2>
          <p>
            У звичайному контейнері нижній шар субстрату легко стає найбільш насиченим. У PlantLogic геометрія дна
            спрямовує воду до периферії, а центральні отвори використовуються для підведення повітря вглиб кореневої маси.
          </p>
          <div class="root-zone-points">
            <div><strong>1</strong><span>Полив зволожує робочий об’єм субстрату.</span></div>
            <div><strong>2</strong><span>Пірамідальне дно відводить надлишок до країв.</span></div>
            <div><strong>3</strong><span>Крайові отвори + ніжки допомагають розірвати водяний натяг.</span></div>
            <div><strong>4</strong><span>Центральні отвори подають повітря в середину кореневої маси.</span></div>
            <div><strong>5</strong><span>Відкрита зона під контейнером створює умови для air-pruning.</span></div>
          </div>
        </div>
        <div class="root-zone-visual" aria-label="Схема принципу роботи кореневої зони PlantLogic">
          <div class="root-zone-pot">
            <div class="root-zone-substrate">
              <span class="root-zone-moisture high">волога</span>
              <span class="root-zone-moisture mid">баланс</span>
              <span class="root-zone-air">O₂</span>
            </div>
            <div class="root-zone-pyramid"></div>
            <div class="root-zone-center-air">O₂ ↑</div>
            <div class="root-zone-edge-drain left">H₂O ↓</div>
            <div class="root-zone-edge-drain right">H₂O ↓</div>
            <div class="root-zone-leg left"></div>
            <div class="root-zone-leg right"></div>
          </div>
          <div class="root-zone-airflow">AIR FLOW → ROOT SELF-PRUNING</div>
          <div class="root-zone-legend">
            <span><i class="legend-water"></i>дренаж</span>
            <span><i class="legend-air"></i>кисень</span>
            <span><i class="legend-root"></i>коренева маса</span>
          </div>
        </div>
      </div>
    `;
    target.after(section);
    return true;
  };

  const makeGeometry = () => {
    if (document.querySelector("#geometry")) return true;
    const target = document.querySelector("#root-zone");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "geometry section";
    section.id = "geometry";
    section.innerHTML = `
      <div class="wrap">
        <div class="geometry-head">
          <span class="tech-eyebrow">ГЕОМЕТРІЯ / НЕ ДЕКОР</span>
          <h2>Кожен елемент корпусу виконує технологічну функцію</h2>
        </div>
        <div class="geometry-grid">
          <article class="geometry-feature geometry-feature-large">
            <div class="geometry-media"><img src="/media/ugroove.webp" alt="Горщик PlantLogic з U-пазами" loading="lazy"></div>
            <div class="geometry-copy">
              <span>U-GROOVE</span>
              <h3>Поливна труба має своє місце</h3>
              <p>U-пази виконуються під конкретний діаметр і положення труби. Це зменшує випадкове зміщення лінії поливу та робить монтаж уздовж ряду повторюваним.</p>
              <ul>
                <li>варіанти під 16 або 20 мм;</li>
                <li>стабільне положення труби;</li>
                <li>просте відкриття/закриття або обслуговування лінії.</li>
              </ul>
            </div>
          </article>
          <article class="geometry-feature">
            <div class="geometry-media"><img src="/media/round.webp" alt="Круглий горщик PlantLogic" loading="lazy"></div>
            <div class="geometry-copy">
              <span>LEGS + BASE</span>
              <h3>Висота ніжок — частина гідравліки</h3>
              <p>30–70 мм опори створюють повітряний проміжок під дном, виводять дренаж у відкриту зону й відривають корінь від ґрунту.</p>
            </div>
          </article>
          <article class="geometry-feature">
            <div class="geometry-media"><img src="/media/zephyr.webp" alt="Zephyr V2 PlantLogic" loading="lazy"></div>
            <div class="geometry-copy">
              <span>ZEPHYR V2</span>
              <h3>Модульна аерація й посилена база</h3>
              <p>Серія 25/30/40 л має 70-мм ніжки, широку опорну базу, посилене з’єднання стінок із дном і варіанти щільності аераційних отворів.</p>
            </div>
          </article>
        </div>
      </div>
    `;
    target.after(section);
    return true;
  };

  const makeZephyrDeep = () => {
    if (document.querySelector("#zephyr-engineering")) return true;
    const formats = document.querySelector("#formats");
    if (!formats) return false;
    const grid = formats.parentElement?.querySelector(".product-grid");
    if (!grid) return false;

    const section = document.createElement("section");
    section.className = "zephyr-engineering";
    section.id = "zephyr-engineering";
    section.innerHTML = `
      <div class="zephyr-engineering-grid">
        <div class="zephyr-engineering-media">
          <img src="/media/zephyr.webp" alt="Zephyr V2 — технічна конструкція" loading="lazy">
          <div class="zephyr-spec">25 / 30 / 40 L</div>
          <div class="zephyr-spec zephyr-spec-bottom">70 mm legs</div>
        </div>
        <div class="zephyr-engineering-copy">
          <span class="tech-eyebrow">ZEPHYR V2 / DEEP DIVE</span>
          <h2>Конструкція для максимальної ізоляції кореневої зони від ґрунту</h2>
          <div class="zephyr-facts">
            <div><strong>70 мм</strong><span>висота ніжок — найбільша в лінійці PlantLogic.</span></div>
            <div><strong>3 мм</strong><span>вузька дренажна щілина, розрахована на утримання субстрату.</span></div>
            <div><strong>25 / 30 / 40 л</strong><span>три базові об’єми однієї конструктивної платформи.</span></div>
            <div><strong>0× / 1× / 2×</strong><span>варіанти щільності бічної аерації під потрібний баланс вологи та кисню.</span></div>
          </div>
          <p class="zephyr-note">
            За даними PlantLogic, широка база Zephyr V2 має більш ніж у 5 разів більшу опорну площу порівняно з типовими горщиками на ніжках; це заявлена виробником характеристика стабільності конструкції.
          </p>
        </div>
      </div>
    `;
    grid.after(section);
    return true;
  };

  const makeDrainageDeep = () => {
    if (document.querySelector("#drainage-engineering")) return true;
    const target = document.querySelector("#drainage");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "drainage-engineering section";
    section.id = "drainage-engineering";
    section.innerHTML = `
      <div class="wrap">
        <div class="drainage-engineering-head">
          <div>
            <span class="tech-eyebrow">DRAINAGE COLLECTION / CLOSED FLOW</span>
            <h2>Дренаж — це не відходи. Це вимірюваний вихід із кореневої зони</h2>
          </div>
          <p>
            Лінійка Drainage Collection збирає весь вихідний дренаж у контрольовану точку. Це дозволяє прибрати стік із поверхні,
            зменшити зволоження підлоги тунелю та організувати відбір проби.
          </p>
        </div>
        <div class="drainage-engineering-grid">
          <div class="drainage-engineering-image">
            <img src="/media/featured.webp" alt="25 л Drainage Collection PlantLogic" loading="lazy">
            <span>#1304125 · 25 L</span>
          </div>
          <div class="drainage-engineering-facts">
            <article><strong>100%</strong><h3>збір дренажу</h3><p>Вихід спрямовується в жолоб або окрему лінію, а не під контейнер.</p></article>
            <article><strong>7</strong><h3>центральних дренажних виходів</h3><p>У 25-літровій моделі #1304125 вони направляють воду в зону збору.</p></article>
            <article><strong>38</strong><h3>бічних повітряних отворів</h3><p>Підтримують газообмін і допомагають уникати анаеробної зони.</p></article>
            <article><strong>71.7 мм</strong><h3>висота ніжок</h3><p>Коренева зона фізично віддалена від поверхні ґрунту та дренажу.</p></article>
          </div>
        </div>
      </div>
    `;
    target.after(section);
    return true;
  };

  const makeMonitoringDeep = () => {
    if (document.querySelector("#monitoring-engineering")) return true;
    const target = document.querySelector("#lysimeter");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "monitoring-engineering";
    section.id = "monitoring-engineering";
    section.innerHTML = `
      <div class="monitoring-engineering-inner">
        <span class="tech-eyebrow">MEASUREMENT LOOP</span>
        <h2>Полив → коренева зона → дренаж → вимірювання → корекція</h2>
        <div class="monitoring-loop">
          <div><b>01</b><strong>IN</strong><span>вода / живильний розчин</span></div>
          <i>→</i>
          <div><b>02</b><strong>ROOT ZONE</strong><span>вологість, EC, газообмін</span></div>
          <i>→</i>
          <div><b>03</b><strong>OUT</strong><span>дренаж / leachate</span></div>
          <i>→</i>
          <div><b>04</b><strong>MEASURE</strong><span>об’єм, pH, EC зовнішніми приладами</span></div>
        </div>
        <p>
          Сталевий лізиметр PlantLogic призначений для точного збору дренажу: V-подібна геометрія направляє пробу до регульованого виходу, а кришка захищає її від листя, плодів і бруду.
        </p>
      </div>
    `;
    target.after(section);
    return true;
  };

  const makeCropEngineering = () => {
    if (document.querySelector("#crop-engineering")) return true;
    const target = document.querySelector("#monitoring-engineering") || document.querySelector("#strawberry") || document.querySelector("#lysimeter");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "crop-engineering section";
    section.id = "crop-engineering";
    section.innerHTML = `
      <div class="wrap">
        <div class="crop-engineering-head">
          <span class="tech-eyebrow">CROP-SPECIFIC ENGINEERING</span>
          <h2>Одна логіка кореневої зони — різні конструкції під технологію культури</h2>
        </div>
        <div class="crop-engineering-grid">
          <article>
            <span>01 / ЛОХИНА</span>
            <h3>20–40 л, round / square / Zephyr / U-groove</h3>
            <p>Пріоритет — стабільний водно-повітряний режим у великому об’ємі субстрату, керований дренаж і зручне розміщення поливних магістралей.</p>
            <ul>
              <li>пірамідальне дно;</li>
              <li>центральна аерація;</li>
              <li>30–70 мм ніжки;</li>
              <li>U-пази та кліпси для труби.</li>
            </ul>
          </article>
          <article>
            <span>02 / МАЛИНА + ОЖИНА</span>
            <h3>Production + Long Cane</h3>
            <p>Для long-cane важлива не лише коренева зона, а й логістика рослини: холодне зберігання, стабілізація високої тростини, полив і швидке перевалювання.</p>
            <ul>
              <li>4.7 л → 7 л для послідовного перевалювання;</li>
              <li>гачки для фіксації до шпалери;</li>
              <li>опційні 20-мм U-пази;</li>
              <li>висока щільність у cold storage.</li>
            </ul>
          </article>
          <article>
            <span>03 / ПОЛУНИЦЯ</span>
            <h3>Hi-Grow: опора окремо, дренаж окремо</h3>
            <p>Hi-Grow розділяє несучу конструкцію й дренажний контур. Система працює з жолобами або slabs, у tabletop чи hanging конфігурації, з або без збору дренажу.</p>
            <ul>
              <li>менша металоємність несучої системи;</li>
              <li>окремий контроль відведення дренажу;</li>
              <li>підтримка inline drippers або drip stakes;</li>
              <li>модульність конфігурації.</li>
            </ul>
          </article>
          <article>
            <span>04 / ОВОЧІ</span>
            <h3>Горщики, slabs, мішки та drainage collection</h3>
            <p>Для овочевих культур PlantLogic комбінує жорсткі контейнери, мішки/плити субстрату, основи та системи збору дренажу — залежно від схеми господарства.</p>
            <ul>
              <li>17 л drainage collection для овочів/полуниці;</li>
              <li>перекривні ручки для щільності вздовж ряду;</li>
              <li>відрив коренів від стоку;</li>
              <li>контрольований вихід дренажу.</li>
            </ul>
          </article>
        </div>
      </div>
    `;
    target.after(section);
    return true;
  };

  const makeSourceNote = () => {
    if (document.querySelector("#technical-source-note")) return true;
    const target = document.querySelector("#crop-engineering");
    if (!target) return false;
    const note = document.createElement("div");
    note.className = "technical-source-note wrap";
    note.id = "technical-source-note";
    note.innerHTML = `
      <strong>Технічна база</strong>
      <p>Характеристики та конструктивні принципи узагальнені з актуальних офіційних сторінок, технічних листів і каталогу PlantLogic. Конкретну модель підбирають під культуру, субстрат, схему поливу, поверхню встановлення та потрібний рівень контролю дренажу.</p>
    `;
    target.after(note);
    return true;
  };

  const run = () => {
    removeMarketBridge();
    rewriteHero();
    rewriteOffer();
    makeTechnicalCore();
    makeRootZone();
    makeGeometry();
    makeZephyrDeep();
    makeDrainageDeep();
    makeMonitoringDeep();
    makeCropEngineering();
    makeSourceNote();
  };

  let tries = 0;
  const timer = setInterval(() => {
    run();
    tries += 1;
    if (tries > 80) clearInterval(timer);
  }, 180);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
