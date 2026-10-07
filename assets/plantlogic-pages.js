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
  const buttons = [...gallery.querySelectorAll('.thumbnail')];
  buttons.forEach(button => button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.dataset.alt;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
  const dialog = document.querySelector('.image-dialog');
  const stage = gallery.querySelector('.gallery-stage');
  if (!dialog || !stage || !image) return;
  stage.addEventListener('click', () => {
    dialog.querySelector('img').src = image.src;
    dialog.querySelector('img').alt = image.alt;
    dialog.showModal();
  });
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
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

;(() => {
  // Garden is the technical presentation layer; BB610 Market is the sales layer.
  // Only published Market SKU pages are eligible for a purchase handoff; verified 2026-10-07.
  const marketByNo={"1308125": {"id": "plantlogic-25-round-1308125", "sku": "BB610-PLT-1308125-EA", "url": "https://market.bb610.com.ua/products/plantlogic-25l-1308125-1ea/"}, "1308041": {"id": "plantlogic-40-round-ugroove-1308041", "sku": "BB610-PLT-1308041-EA", "url": "https://market.bb610.com.ua/products/plantlogic-40l-1308041-1ea/"}};
  const marketByPath={};
  const marketBase='https://market.bb610.com.ua/product.html';

  if(!document.getElementById('garden-market-handoff-style')){
    const style=document.createElement('style');
    style.id='garden-market-handoff-style';
    style.textContent='.market-buy-block{margin:26px 0 12px;padding:18px;border:1px solid #d9e6da;background:#f6faf4}.market-buy-block>strong{display:block;margin-bottom:4px;color:#173d25;font-size:18px;font-weight:650}.market-buy-block>span{display:block;margin-bottom:12px;color:#6f7b72;font-size:13px}.market-buy-options{display:flex;flex-wrap:wrap;gap:8px}.market-buy-options a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 14px;border:1px solid #2ca448;background:#2ca448;color:#fff;font-size:13px;font-weight:650;text-decoration:none}.market-buy-options a:hover{background:#23883b;border-color:#23883b;color:#fff;text-decoration:none}@media(max-width:600px){.market-buy-options{display:grid;grid-template-columns:1fr}.market-buy-options a{width:100%}}';
    document.head.append(style);
  }

  const marketUrl=(item)=>{
    if(item.url) return item.url;
    const q=new URLSearchParams({id:item.id});
    if(item.sku) q.set('sku',item.sku);
    return marketBase+'?'+q.toString();
  };

  const collectTargets=()=>{
    const byId=new Map();
    const path=location.pathname.replace(/\/+$/,'/') || '/';
    const special=marketByPath[path];
    if(special) byId.set(special.id,special);

    const source=document.querySelector('.product-no,.product-number,[data-product-no]');
    const text=source?.textContent||'';
    const numbers=[...new Set((text.match(/\b(?:C)?\d{5,8}\b/g)||[]))];
    numbers.forEach(no=>{
      const item=marketByNo[no];
      if(item && !byId.has(item.id)) byId.set(item.id,{...item,no});
    });
    return [...byId.values()];
  };

  const render=()=>{
    if(document.querySelector('.market-buy-block,[data-market-handoff="1"]')) return;
    const targets=collectTargets();
    if(!targets.length) return;
    const summary=document.querySelector('.product-summary');
    if(!summary) return;
    const actions=summary.querySelector('.actions');

    const wrap=document.createElement('div');
    wrap.className='market-buy-block';
    wrap.dataset.marketHandoff='1';

    const heading=document.createElement('strong');
    heading.textContent='Купити в BB610 Market';
    wrap.append(heading);

    if(targets.length>1){
      const note=document.createElement('span');
      note.textContent='Оберіть потрібну модель:';
      wrap.append(note);
    }

    const options=document.createElement('div');
    options.className='market-buy-options';
    targets.forEach((item,index)=>{
      const a=document.createElement('a');
      a.href=marketUrl(item);
      a.textContent=targets.length===1 ? 'Перейти до товару в Market ↗' : ((item.no ? '№'+item.no : 'Модель '+(index+1))+' · Market ↗');
      options.append(a);
    });
    wrap.append(options);

    if(actions) actions.before(wrap); else summary.append(wrap);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true});
  else render();
})();
