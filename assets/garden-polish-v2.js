(() => {
  const exact = new Map([
    ["PLANTLOGIC / CULTURES IN SYSTEM", ""],
    ["ROOT ZONE / CONTAINER SYSTEM", ""],
    ["PRODUCTION / LONG CANE", ""],
    ["HI-GROW / TABLETOP", ""],
    ["SUBSTRATE / ELEVATED SYSTEM", ""],
    ["PLANTLOGIC / ROOT ZONE ENGINEERING", ""],
    ["КОРЕНЕВА ЗОНА / ВОДА + ПОВІТРЯ", ""],
    ["ГЕОМЕТРІЯ / НЕ ДЕКОР", ""],
    ["КОНСТРУКТИВНІ СІМЕЙСТВА / ЯК ОБИРАТИ", ""],
    ["DRAINAGE COLLECTION / CLOSED FLOW", ""],
    ["ШВИДКА ЛОГІКА ВИБОРУ", ""],
    ["ROOT ZONE TECHNOLOGY", ""],
    ["ROOT ZONE ENGINEERING", ""],
    ["01 / GARDEN", ""],
    ["ROUND", "Круглий"],
    ["SQUARE", "Квадратний"],
    ["U-GROOVE", "U-пази"],
    ["LEGS + BASE", "Ніжки та основа"],
    ["DRAINAGE COLLECTION", "Збір дренажу"],
    ["ROOT", "Коренева зона"],
    ["IN", "Полив"],
    ["OUT", "Вихід"],
    ["QC", "Контроль"],
    ["AIR FLOW → ROOT SELF-PRUNING", "Повітряний потік → повітряне підрізання коренів"],
    ["PROFESSIONAL HORTICULTURE · UKRAINE", "ПРОФЕСІЙНЕ САДІВНИЦТВО · УКРАЇНА"],
    ["PRODUCTION / LONG CANE", ""],
    ["LONG CANE / PLANTLOGIC", "Long Cane · PlantLogic"],
    ["Production", "Виробничий цикл"],
    ["Cold Storage / Long Cane", "Холодне зберігання / Long Cane"],
    ["У ФОКУСІ / FEATURED PRODUCT", "У ФОКУСІ"],
    ["DRAINAGE", "Дренаж"],
    ["ROOT ARCHITECTURE", "Коренева система"]
  ]);

  const phraseReplacements = [
    [/\bDrainage Collection\b/g, "збір дренажу"],
    [/\bProduction\b/g, "виробничий цикл"],
    [/\bCold Storage\b/g, "холодне зберігання"],
    [/\bRound V-Rib\b/g, "круглий горщик з V-ребрами"],
    [/\bRound\b/g, "круглий"],
    [/\bSquare\b/g, "квадратний"],
    [/\bU-Groove\b/g, "U-пази"],
    [/\bV-Rib\b/g, "V-ребра"],
    [/\bair-pruning\b/gi, "повітряне підрізання коренів"],
    [/\bself-pruning\b/gi, "повітряне підрізання коренів"]
  ];

  const protectedTags = new Set(["SCRIPT","STYLE","NOSCRIPT","CODE","PRE","TEXTAREA"]);

  const cleanText = (root=document) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || protectedTags.has(parent.tagName)) return;
      if (parent.closest(".product-number,.garden-product-meta,.product-detail-kicker")) return;

      const raw = node.nodeValue || "";
      const trimmed = raw.trim();
      if (!trimmed) return;

      if (exact.has(trimmed)) {
        const value = exact.get(trimmed);
        if (!value) {
          if (parent.childNodes.length === 1) parent.remove();
          else node.nodeValue = "";
        } else {
          node.nodeValue = raw.replace(trimmed, value);
        }
        return;
      }

      if (/^H[1-3]$/.test(parent.tagName)) return;
      let next = raw;
      phraseReplacements.forEach(([pattern,replacement]) => {
        next = next.replace(pattern,replacement);
      });
      if (next !== raw) node.nodeValue = next;
    });
  };

  const enhanceArrows = (root=document) => {
    root.querySelectorAll("a,button,.culture-link").forEach(el => {
      if (el.querySelector(".lux-arrow-chip,.lux-arrow-mark")) return;

      const existing = [...el.children].find(child =>
        child.matches?.('span[aria-hidden="true"]') && /^[↗→]$/.test(child.textContent.trim())
      );
      if (existing) {
        existing.className = "lux-arrow-mark";
        existing.innerHTML = '<svg viewBox="0 0 28 18" fill="none" aria-hidden="true"><path d="M2 16L18 2M10 2h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        return;
      }

      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())){
        const value=node.nodeValue||"";
        if(!/[↗→]\s*$/.test(value)) continue;
        node.nodeValue=value.replace(/[↗→]\s*$/,"").replace(/\s+$/,"");
        const mark=document.createElement("span");
        mark.className="lux-arrow-mark";
        mark.setAttribute("aria-hidden","true");
        mark.innerHTML='<svg viewBox="0 0 28 18" fill="none"><path d="M2 16L18 2M10 2h8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        el.append(mark);
        break;
      }
    });
  };

  const removeDecorative = (root=document) => {
    root.querySelectorAll(
      ".lux-hero-metrics,.tech-eyebrow,.technical-core-no,.section-index,.lux-kicker," +
      ".lux-field-index,.lux-field-copy>span,.proof-motion-label,.proof-label,.family-card-label," +
      ".garden-products-kicker,.photo-top,.photo-corner,.hero-bottom,.hero-copy>.eyebrow"
    ).forEach(el => el.remove());
  };

  const syncCanonicalNames = () => {
    const featured = document.querySelector(".featured-copy h3");
    if (featured) featured.textContent = "Горщик для лохини 25 л круглий зі збором дренажу";

    const familyHead = document.querySelector("#family-engineering .family-engineering-head h2");
    if (familyHead) familyHead.textContent = "Коли потрібен круглий, квадратний, з U-пазами, Zephyr V2 або горщик зі збором дренажу.";

    const familyCards = [...document.querySelectorAll("#family-engineering .family-card")];
    familyCards.forEach(card => {
      const media = card.querySelector(".family-card-media>span");
      if (media) media.remove();
    });

    document.querySelectorAll(".scenario strong").forEach(node => {
      const t=node.textContent.trim();
      if(t==="Production") node.textContent="Виробничий цикл";
      if(t==="Cold Storage / Long Cane") node.textContent="Холодне зберігання / Long Cane";
      if(t==="Drainage Collection") node.textContent="Збір дренажу";
    });
  };

  const run = () => {
    removeDecorative();
    cleanText();
    syncCanonicalNames();
    enhanceArrows();
  };

  let raf = 0;
  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(run);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, {once:true});
  } else run();

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true});
  const canonicalTimer=setInterval(run,500); setTimeout(()=>{clearInterval(canonicalTimer);observer.disconnect();},15000);
})();