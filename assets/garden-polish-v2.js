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
    ["PROFESSIONAL HORTICULTURE · UKRAINE", "ПРОФЕСІЙНЕ САДІВНИЦТВО · УКРАЇНА"]
  ]);

  const phraseReplacements = [
    [/\bDrainage Collection\b/g, "збір дренажу"],
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

      let next = raw;
      phraseReplacements.forEach(([pattern,replacement]) => {
        next = next.replace(pattern,replacement);
      });
      if (next !== raw) node.nodeValue = next;
    });
  };

  const removeDecorative = (root=document) => {
    root.querySelectorAll(
      ".lux-hero-metrics,.tech-eyebrow,.technical-core-no,.section-index,.lux-kicker," +
      ".lux-field-index,.lux-field-copy>span,.proof-motion-label,.proof-label,.family-card-label," +
      ".garden-products-kicker,.photo-top,.photo-corner,.hero-bottom,.hero-copy>.eyebrow"
    ).forEach(el => el.remove());
  };

  const run = () => {
    removeDecorative();
    cleanText();
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
  setTimeout(() => observer.disconnect(), 15000);
})();