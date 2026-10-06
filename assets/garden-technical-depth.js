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

  const rewriteNavigation = () => {
    document.querySelectorAll("a").forEach((link) => {
      const label = link.textContent.trim();
      if (label === "Технологія") {
        link.href = "#technical-core";
      } else if (label === "Продукти") {
        link.textContent = "Конструкції";
        link.href = "#family-engineering";
      } else if (label === "Приклади") {
        link.textContent = "Коренева зона";
        link.href = "#root-zone";
      } else if (label === "Контроль") {
        link.textContent = "Моніторинг";
        link.href = "#system-interfaces";
      } else if (label === "Культури") {
        link.href = "/crops/";
      }
    });
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

  const makeFamilyEngineering = () => {
    if (document.querySelector("#family-engineering")) return true;
    const target = document.querySelector("#geometry");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "family-engineering section";
    section.id = "family-engineering";
    section.innerHTML = `
      <div class="wrap">
        <div class="family-engineering-head">
          <div>
            <h2>Порівняння конструкцій горщиків PlantLogic</h2>
          </div>
          <p>
            Круглий · Квадратний · U-пази · Zephyr V2 · Збір дренажу. Порівнюємо за поливом, дренажем, поверхнею встановлення та щільністю ряду.
          </p>
        </div>

        <div class="family-selector" role="list" aria-label="Порівняння конструктивних рішень PlantLogic">
          <article class="family-card" role="listitem">
            <div class="family-card-media">
              <img src="/media/round.webp" alt="Круглий горщик PlantLogic" loading="lazy">
            </div>
            <div class="family-card-copy">
              <h3>Круглий</h3>
              <strong class="family-card-purpose">Збалансований водно-повітряний режим</strong>
              <p>Кругла геометрія, пірамідальне дно й центральна аерація допомагають рівномірно працювати з вологою в субстраті.</p>
              <dl>
                <div><dt>Коли</dt><dd>універсальна посадка та стійкість на м’якій поверхні</dd></div>
                <div><dt>Конструкція</dt><dd>крайовий дренаж + центральна аерація</dd></div>
                <div><dt>Перевага</dt><dd>стабільна коренева зона без зайвої складності</dd></div>
              </dl>
            </div>
          </article>

          <article class="family-card" role="listitem">
            <div class="family-card-media">
              <img src="/media/square.webp" alt="Квадратний горщик PlantLogic" loading="lazy">
            </div>
            <div class="family-card-copy">
              <h3>Квадратний</h3>
              <strong class="family-card-purpose">Більша щільність у ряду</strong>
              <p>Квадратна форма краще використовує площу й зберігає керований дренаж та аерацію кореневої зони.</p>
              <dl>
                <div><dt>Коли</dt><dd>важливі щільність посадки та геометрія ряду</dd></div>
                <div><dt>Конструкція</dt><dd>пірамідальне дно + центральні повітряні отвори</dd></div>
                <div><dt>Перевага</dt><dd>ефективніше використання виробничої площі</dd></div>
              </dl>
            </div>
          </article>

          <article class="family-card family-card-accent" role="listitem">
            <div class="family-card-media">
              <img src="/media/ugroove.webp" alt="Горщик PlantLogic з U-пазами" loading="lazy">
            </div>
            <div class="family-card-copy">
              <h3>U-пази</h3>
              <strong class="family-card-purpose">Поливна труба зафіксована в горщику</strong>
              <p>Пази задають повторюване положення магістралі вздовж ряду та спрощують монтаж і сервіс.</p>
              <dl>
                <div><dt>Коли</dt><dd>поливна труба проходить безпосередньо через ряд</dd></div>
                <div><dt>Конструкція</dt><dd>пази під трубу 16 або 20 мм залежно від моделі</dd></div>
                <div><dt>Перевага</dt><dd>менше зміщень і швидший монтаж</dd></div>
              </dl>
            </div>
          </article>

          <article class="family-card family-card-dark" role="listitem">
            <div class="family-card-media">
              <img src="/media/zephyr.webp" alt="Горщик PlantLogic Zephyr V2" loading="lazy">
            </div>
            <div class="family-card-copy">
              <h3>Zephyr V2</h3>
              <strong class="family-card-purpose">Коренева зона вище поверхні</strong>
              <p>Ніжки 70 мм і широка опорна база створюють дренажний просвіт та відокремлюють контейнер від ґрунту.</p>
              <dl>
                <div><dt>Коли</dt><dd>потрібні ізоляція, стійкість і доступ під горщиком</dd></div>
                <div><dt>Конструкція</dt><dd>70-мм ніжки + широка база + вузька дренажна щілина</dd></div>
                <div><dt>Моделі</dt><dd>25 / 30 / 40 л</dd></div>
              </dl>
            </div>
          </article>

          <article class="family-card" role="listitem">
            <div class="family-card-media">
              <img src="/media/featured.webp" alt="Горщик PlantLogic зі збором дренажу" loading="lazy">
            </div>
            <div class="family-card-copy">
              <h3>Збір дренажу</h3>
              <strong class="family-card-purpose">Дренаж зібраний і контрольований</strong>
              <p>Сток не потрапляє випадково під горщик, а спрямовується у визначений вихід для відведення або вимірювання.</p>
              <dl>
                <div><dt>Коли</dt><dd>потрібен контроль стоку або чиста зона під рядами</dd></div>
                <div><dt>Конструкція</dt><dd>збірні виходи + піднята коренева зона</dd></div>
                <div><dt>Перевага</dt><dd>можна вимірювати й керовано відводити дренаж</dd></div>
              </dl>
            </div>
          </article>
        </div>

        <div class="family-decision" aria-label="Логіка вибору конструкції">
          <div class="family-decision-title">
            <h3>Вибір починається з умов вирощування</h3>
            <p>Спочатку визначаємо середовище, а вже потім літраж і конкретну модель.</p>
          </div>
          <div class="family-decision-flow">
            <div><strong>Субстрат</strong><span>водоутримання та швидкість дренажу</span></div>
            <i>→</i>
            <div><strong>Полив</strong><span>частота, витрата, положення труби</span></div>
            <i>→</i>
            <div><strong>Поверхня</strong><span>ґрунт, плівка, жолоб або стіл</span></div>
            <i>→</i>
            <div><strong>Дренаж</strong><span>вільний, зібраний або вимірюваний</span></div>
            <i>→</i>
            <div><strong>Конструкція</strong><span>кругла, квадратна, U-пази, Zephyr або збір дренажу</span></div>
          </div>
        </div>

        <div class="family-special-note">
          <strong>Окреме рішення: V-ребра</strong>
          <p>Для задачі спрямування росту коренів уздовж стінки є круглий горщик 30 л з V-ребрами. Базова логіка дренажу й аерації при цьому зберігається.</p>
        </div>
      </div>
    `;
    target.after(section);
    return true;
  };

  const rewriteFormatExamples = () => {
    const heading = document.querySelector("#formats");
    if (heading && heading.dataset.technicalDepth !== VERSION) {
      heading.dataset.technicalDepth = VERSION;
      const first = heading.querySelector(".eyebrow");
      if (first) first.textContent = "ВІЗУАЛЬНІ ПРИКЛАДИ КОНСТРУКЦІЙ";
      const last = heading.querySelector("span:last-child");
      if (last) last.textContent = "Не каталог — приклади геометрії";
    }

    const copyByCode = {
      "#1308020": "Round · базова геометрія для керованого дренажу та центральної аерації.",
      "#1309020": "Square · та сама коренева логіка з акцентом на щільність розміщення.",
      "#1308041": "U-Groove · інтегроване позиціонування поливної труби у геометрії контейнера.",
      "#1301144": "Zephyr V2 · 70-мм відрив від поверхні та окрема посилена опорна база."
    };

    document.querySelectorAll("#formats + .product-grid .product-card, #formats ~ .product-grid .product-card").forEach((card) => {
      const code = [...card.querySelectorAll("span")].map((n) => n.textContent.trim()).find((v) => copyByCode[v]);
      const p = card.querySelector(":scope > p");
      if (code && p) p.textContent = copyByCode[code];
    });
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

  const makeSystemInterfaces = () => {
    if (document.querySelector("#system-interfaces")) return true;
    const target = document.querySelector("#drainage-engineering") || document.querySelector("#drainage");
    if (!target) return false;

    const section = document.createElement("section");
    section.className = "system-interfaces section";
    section.id = "system-interfaces";
    section.innerHTML = `
      <div class="wrap">
        <div class="system-interfaces-head">
          <div>
            <span class="tech-eyebrow">SYSTEM INTERFACES / ВІД ПОДАЧІ ДО OUT</span>
            <h2>Перевага PlantLogic — у тому, як елементи стикуються між собою</h2>
          </div>
          <p>
            Контейнер сам по собі не керує фертигацією. Його задача — зробити шлях води,
            повітря та дренажу передбачуванішим і дати господарству фізичні точки для
            правильного монтажу поливу, відведення стоку та відбору проб.
          </p>
        </div>

        <div class="interfaces-flow">
          <article>
            <span class="interfaces-no">01</span>
            <div class="interfaces-icon">IN</div>
            <h3>Подача розчину</h3>
            <p>Поливна магістраль повинна бути стабільно розміщена відносно контейнера, щоб конфігурація повторювалась уздовж ряду.</p>
            <ul>
              <li>U-Groove — посадочне місце для труби;</li>
              <li>окремі моделі мають пази під 16 або 20 мм;</li>
              <li>кліпси утримують шланг і допомагають прибрати мікротрубку із зони проходу працівників.</li>
            </ul>
          </article>
          <div class="interfaces-arrow">→</div>
          <article>
            <span class="interfaces-no">02</span>
            <div class="interfaces-icon">ROOT</div>
            <h3>Коренева зона</h3>
            <p>Пірамідальне дно, крайові дренажні отвори та центральна аерація формують фізичний шлях для води й кисню.</p>
            <ul>
              <li>надлишок води зміщується до периферії;</li>
              <li>центральні недренуючі отвори подають O₂;</li>
              <li>відкрита зона під горщиком підтримує self-pruning.</li>
            </ul>
          </article>
          <div class="interfaces-arrow">→</div>
          <article>
            <span class="interfaces-no">03</span>
            <div class="interfaces-icon">OUT</div>
            <h3>Відведення дренажу</h3>
            <p>У стандартних контейнерах дренаж виходить у відкриту повітряну зону. У Drainage Collection весь потік можна направити в жолоб.</p>
            <ul>
              <li>менше застійної води під контейнером;</li>
              <li>можливий централізований відвід із тунелю;</li>
              <li>з’являється контрольована точка OUT.</li>
            </ul>
          </article>
          <div class="interfaces-arrow">→</div>
          <article>
            <span class="interfaces-no">04</span>
            <div class="interfaces-icon">QC</div>
            <h3>Чиста проба</h3>
            <p>Лізиметр щільно працює з відповідним горщиком і збирає дренаж так, щоб зменшити вплив випаровування та забруднення проби.</p>
            <ul>
              <li>порівняння IN і OUT;</li>
              <li>об’єм дренажу;</li>
              <li>pH та EC вимірюються зовнішніми приладами.</li>
            </ul>
          </article>
        </div>

        <div class="interfaces-detail-grid">
          <article class="interfaces-detail-card">
            <span>HOSE CLIP</span>
            <h3>Одна точка кріплення — кілька функцій</h3>
            <p>Актуальна багатофункціональна кліпса PlantLogic підтримує труби 14–16 та 17–22 мм, може фіксувати поливний шланг, cooling skirt і дріт шпалери. Виробник також заявляє економію мікротрубки до 50% завдяки іншій схемі розміщення емітера.</p>
          </article>
          <article class="interfaces-detail-card">
            <span>LYSIMETER KIT</span>
            <h3>Моніторинг без вбудованої електроніки</h3>
            <p>PlantLogic пропонує два розміри лізиметрів — приблизно 22×22 та 31.6×31.6 см. Комплект із лізиметрами та IN/OUT ємностями потрібен не для автоматичного аналізу, а для отримання репрезентативної чистої проби.</p>
          </article>
          <article class="interfaces-detail-card">
            <span>DESIGN PRINCIPLE</span>
            <h3>Горщик не замінює агрономію</h3>
            <p>Навіть хороша геометрія не виправляє неправильний EC, pH, частоту поливу чи невідповідний субстрат. Її цінність у тому, що вона зменшує конструктивні причини застою води й дає більш контрольований дренажний контур.</p>
          </article>
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
    rewriteNavigation();
    rewriteOffer();
    makeTechnicalCore();
    makeRootZone();
    makeGeometry();
    makeFamilyEngineering();
    rewriteFormatExamples();
    makeZephyrDeep();
    makeDrainageDeep();
    makeSystemInterfaces();
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
