(() => {
  const logo = document.querySelector('.site-header .brand img');
  if (logo) {
    logo.src = '/media/bb610-garden-user-logo.webp';
    logo.alt = 'BB610 Garden';
    logo.removeAttribute('width');
    logo.removeAttribute('height');
  }
  const brandSuffix = document.querySelector('.site-header .brand > span');
  if (brandSuffix) brandSuffix.remove();

  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  const image = gallery.querySelector('.gallery-image');
  const thumbs = [...gallery.querySelectorAll('.thumbnail')];
  const dialog = document.querySelector('.image-dialog');
  const stage = gallery.querySelector('.gallery-stage');
  const dialogImage = dialog?.querySelector('img');
  if (!image) return;

  const selectedIndex = () => Math.max(0, thumbs.findIndex(t => t.getAttribute('aria-pressed') === 'true'));
  const total = thumbs.length || 1;
  let index = selectedIndex();

  const setImage = next => {
    index = (next + total) % total;
    const thumb = thumbs[index];
    if (thumb) {
      image.src = thumb.dataset.image;
      image.alt = thumb.dataset.alt || image.alt;
      thumbs.forEach(t => t.setAttribute('aria-pressed', String(t === thumb)));
    }
    if (dialog?.open && dialogImage) {
      dialogImage.src = image.src;
      dialogImage.alt = image.alt;
      const count = dialog.querySelector('.image-dialog-counter');
      if (count) count.textContent = (index + 1) + ' / ' + total;
    }
  };

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => setImage(i)));
  if (!dialog || !stage || !dialogImage) return;

  if (total > 1 && !dialog.querySelector('.image-dialog-prev')) {
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'image-dialog-prev';
    prev.setAttribute('aria-label', 'Попереднє фото');
    prev.textContent = '‹';
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'image-dialog-next';
    next.setAttribute('aria-label', 'Наступне фото');
    next.textContent = '›';
    const counter = document.createElement('span');
    counter.className = 'image-dialog-counter';
    counter.setAttribute('aria-live', 'polite');
    counter.textContent = (index + 1) + ' / ' + total;
    dialog.append(prev, next, counter);
    prev.addEventListener('click', () => setImage(index - 1));
    next.addEventListener('click', () => setImage(index + 1));
  }

  stage.addEventListener('click', () => {
    index = selectedIndex();
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialog.querySelector('.image-dialog-counter')?.replaceChildren(document.createTextNode((index + 1) + ' / ' + total));
    dialog.showModal();
  });
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (!dialog.open || total < 2) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      setImage(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let touchX = null, touchY = null;
  dialog.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
  }, { passive: true });
  dialog.addEventListener('touchend', event => {
    if (touchX === null || total < 2 || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchX;
    const dy = event.changedTouches[0].clientY - touchY;
    touchX = touchY = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.15) setImage(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
  dialog.addEventListener('close', () => stage.focus());
})();
;(() => {
  const removeDecorativeLabels = () => {
    document.querySelectorAll(".section-index,.eyebrow.section-code,.page-index,.slide-index").forEach(node => node.remove());
  };
  const enhanceArrows = () => {
    document.querySelectorAll("a,button").forEach(el => {
      if (el.querySelector(".lux-arrow-chip,.lux-arrow-mark")) return;
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())){
        const value=node.nodeValue||"";
        if(!/[↗→]\s*$/.test(value)) continue;
        node.nodeValue=value.replace(/[↗→]\s*$/,"").replace(/\s+$/,"");
        const chip=document.createElement("span");
        chip.className="lux-arrow-chip";
        chip.setAttribute("aria-hidden","true");
        chip.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        el.append(chip);
        break;
      }
    });
  };
  removeDecorativeLabels();
  enhanceArrows();
})();

;(() => {
  const translations = new Map([
    ["PLANTLOGIC / CULTURES IN SYSTEM",""],
    ["ROOT ZONE / CONTAINER SYSTEM",""],
    ["PRODUCTION / LONG CANE",""],
    ["HI-GROW / TABLETOP",""],
    ["SUBSTRATE / ELEVATED SYSTEM",""],
    ["PRODUCT DETAILS","Деталі продукту"],
    ["RELATED PRODUCTS","Пов’язані продукти"],
    ["OFFICIAL TECHNICAL MATERIAL","Технічні матеріали"]
  ]);
  document.querySelectorAll("span,small,div,p").forEach(el => {
    if(el.children.length) return;
    const t=el.textContent.trim();
    if(!translations.has(t)) return;
    const next=translations.get(t);
    if(next) el.textContent=next; else el.remove();
  });
})();

;(() => {
  const exact = new Map([
    ["ROUND","Круглий"],
    ["SQUARE","Квадратний"],
    ["U-GROOVE","U-пази"],
    ["DRAINAGE COLLECTION","Збір дренажу"],
    ["PRODUCT DETAILS","Деталі продукту"],
    ["TECHNICAL DATA","Технічні дані"],
    ["RELATED PRODUCTS","Пов’язані продукти"],
    ["FEATURED PRODUCT","У фокусі"]
  ]);
  const protectedTags=new Set(["SCRIPT","STYLE","NOSCRIPT","CODE","PRE","TEXTAREA"]);
  const clean=()=>{
    document.querySelectorAll(".eyebrow,.section-index,.page-index,.slide-index").forEach(n=>n.remove());
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[]; let n; while((n=walker.nextNode())) nodes.push(n);
    nodes.forEach(node=>{
      const p=node.parentElement;
      if(!p||protectedTags.has(p.tagName)||p.closest(".product-number")) return;
      const raw=node.nodeValue||""; const t=raw.trim(); if(!t) return;
      if(exact.has(t)){node.nodeValue=raw.replace(t,exact.get(t));return;}
      if(/^H[1-3]$/.test(p.tagName)) return;
      let v=raw
        .replace(/\bDrainage Collection\b/g,"збір дренажу")
        .replace(/\bRound\b/g,"круглий")
        .replace(/\bSquare\b/g,"квадратний")
        .replace(/\bU-Groove\b/g,"U-пази");
      if(v!==raw) node.nodeValue=v;
    });
  };
  clean();
  const mo=new MutationObserver(clean);
  mo.observe(document.documentElement,{subtree:true,childList:true});
  setTimeout(()=>mo.disconnect(),12000);
})();
