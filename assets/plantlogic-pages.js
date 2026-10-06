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
    ["OFFICIAL TECHNICAL MATERIAL","Офіційний технічний матеріал"]
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
  // Exact Product # -> live Market Product Master identity mapping, synced 2026-10-06.
  const marketByNo={"1200021":{"id":"plantlogic-plastic-gutter-drainage","sku":"PL-1200021","title":"Пластиковий жолоб для збору та відведення дренажу"},"1205012":{"id":"plantlogic-metal-hose-clip-1205012","sku":"PL-1205012","title":"Металева кліпса для фіксації поливного шланга"},"1300010":{"id":"plantlogic-plastic-gutter-drainage","sku":"PL-1300010","title":"Пластиковий жолоб для збору та відведення дренажу"},"1300011":{"id":"plantlogic-plastic-gutter-drainage","sku":"PL-1300011","title":"Пластиковий жолоб для збору та відведення дренажу"},"1301010":{"id":"plantlogic-lysimeter-kit","sku":"PL-1301010","title":"Лізиметр для контролю дренажу"},"1301030":{"id":"plantlogic-lysimeter-kit","sku":"PL-1301030","title":"Лізиметр для контролю дренажу"},"1301036":{"id":"plantlogic-bag-base-drainage-1301036","sku":"PL-1301036","title":"Основа для мішка зі збором дренажу"},"1301081":{"id":"plantlogic-kratos-slab-base-1301081","sku":"PL-1301081","title":"Основа для субстратних плит"},"1301143":{"id":"plantlogic-blueberry-zephyr-v2-40l-1301143","sku":"PL-BB-1301143-BK","title":"Горщик для лохини 40 л Zephyr V2 на ніжках 7 см"},"1301144":{"id":"plantlogic-blueberry-zephyr-v2-25l-1301144","sku":"PL-BB-1301144-BK","title":"Горщик для лохини 25 л Zephyr V2 на ніжках 7 см"},"1301153":{"id":"plantlogic-blueberry-zephyr-v2-30l-1301153","sku":"PL-BB-1301153-BK","title":"Горщик для лохини 30 л Zephyr V2 на ніжках 7 см"},"1302048":{"id":"plantlogic-nursery-tray-1302048","sku":"PL-1302048","title":"Касета для розсади на 72 комірки"},"1302809":{"id":"plantlogic-slab-base-bags-slabs-1302809","sku":"PL-1302809","title":"Основа для мішків і субстратних плит"},"1303025":{"id":"blueberry-round-short-legs-pot","sku":"PL-BB-1303025-BK","title":"Горщик для лохини 25 л круглий на коротких ніжках"},"1303125":{"id":"plantlogic-blueberry-round-25l-drainage-short-legs-1303125","sku":"PL-BB-1303125-BK","title":"Горщик для лохини 25 л круглий зі збором дренажу на коротких ніжках"},"1304015":{"id":"plantlogic-15l-round-drainage-1304015","sku":"PL-1304015-BK","title":"Горщик для малини та ожини 15 л круглий зі збором дренажу"},"1304125":{"id":"plantlogic-25l-round-drainage-1304125","sku":"PL-1304125-BK","title":"Горщик для лохини 25 л круглий зі збором дренажу"},"1305005":{"id":"plantlogic-5l-drainage-1305005","sku":"PL-1305005-BK","title":"Горщик для малини та ожини 5 л квадратний зі збором дренажу"},"1305008":{"id":"plantlogic-vegetable-pot-8l-1305008","sku":"PL-1305008-BK","title":"Горщик для овочів 8 л"},"1305071":{"id":"plantlogic-7l-square-cold-storage-1305071","sku":"PL-1305071-BK","title":"Горщик для малини та ожини 7 л квадратний для технології long-cane"},"1305081":{"id":"plantlogic-strawberry-trough-8l-short-legs-1305081","sku":"PL-1305081","title":"Жолоб для вирощування полуниці 8 л на коротких ніжках"},"1305082":{"id":"plantlogic-8l-strawberry-trough-big-handle-1305082","sku":"PL-1305082","title":"Жолоб для вирощування полуниці 8 л з широкою ручкою"},"1305109":{"id":"plantlogic-strawberry-trough-9l-1305109","sku":"PL-1305109","title":"Жолоб для вирощування полуниці 9 л"},"1305117":{"id":"plantlogic-17l-drainage-1305117","sku":"PL-1305117-BK","title":"Горщик для овочів 17 л зі збором дренажу"},"1305209":{"id":"plantlogic-9l-strawberry-trough-truss-1305209","sku":"PL-1305209","title":"Жолоб для вирощування полуниці 9 л з підтримкою квітконосів"},"1305909":{"id":"plantlogic-18l-strawberry-trough-1305909","sku":"PL-1305909","title":"Жолоб для вирощування полуниці 18 л з опорою для квітконосів"},"1306003":{"id":"plantlogic-3l-square-1306003","sku":"PL-1306003-BK","title":"Горщик для малини та ожини 3 л квадратний"},"1306007":{"id":"plantlogic-7l-square-1306007","sku":"PL-1306007-BK","title":"Горщик для малини та ожини 7 л квадратний"},"1306010":{"id":"plantlogic-10l-square-1306010","sku":"PL-1306010-BK","title":"Горщик для малини та ожини 10 л квадратний на ніжках 30 мм"},"1306051":{"id":"plantlogic-5l-square-short-1306051","sku":"PL-1306051-BK","title":"Горщик для малини та ожини 5 л компактний квадратний"},"1307030":{"id":"plantlogic-bag-base-edge-drainage-1307030","sku":"PL-1307030","title":"Основа для мішка з крайовим відведенням дренажу"},"1307107":{"id":"plantlogic-7l-drainage-1307107","sku":"PL-1307107-BK","title":"Горщик для малини та ожини 7 л квадратний зі збором дренажу"},"1307110":{"id":"plantlogic-10l-drainage-1307110","sku":"PL-1307110-BK","title":"Горщик для малини та ожини 10 л квадратний зі збором дренажу"},"1307133":{"id":"plantlogic-30l-drainage-1307133","sku":"PL-1307133-BK","title":"Горщик 30 л круглий зі збором дренажу"},"1308005":{"id":"plantlogic-universal-round-5l-1308005","sku":"PL-1308005-BK","title":"Горщик 5 л круглий для субстратного вирощування"},"1308020":{"id":"plantlogic-blueberry-round-20l-1308020","sku":"PL-BB-1308020-BK","title":"Горщик для лохини 20 л круглий на стандартних ніжках"},"1308025":{"id":"plantlogic-blueberry-round-25l-1308025","sku":"PL-BB-1308025-BK","title":"Горщик для лохини 25 л круглий на широких ніжках 30 мм"},"1308026":{"id":"plantlogic-blueberry-round-25l-u-grooves-1308026","sku":"PL-BB-1308026-BK","title":"Горщик для лохини 25 л круглий з U-пазами"},"1308030":{"id":"plantlogic-universal-round-30l-1308030","sku":"PL-1308030-BK","title":"Горщик 30 л круглий для субстратного вирощування"},"1308031":{"id":"plantlogic-blueberry-round-30l-v-ribs-1308031","sku":"PL-BB-1308031-BK","title":"Горщик для лохини 30 л круглий з V-ребрами"},"1308040":{"id":"plantlogic-blueberry-round-40l-1308040","sku":"PL-BB-1308040-TC","title":"Горщик для лохини 40 л круглий на стандартних ніжках"},"1308041":{"id":"plantlogic-blueberry-round-40l-u-grooves-1308041","sku":"PL-BB-1308041-TC","title":"Горщик для лохини 40 л круглий з U-пазами"},"1308125":{"id":"plantlogic-25-round-1308125","sku":"PL-BB-1308125-BK","title":"Горщик для лохини 25 л круглий покращеної конструкції"},"1308303":{"id":"plantlogic-blueberry-round-30l-u-grooves-1308303","sku":"PL-BB-1308303-BK","title":"Горщик для лохини 30 л круглий з U-пазами"},"1308305":{"id":"plantlogic-blueberry-round-30l-parallel-u-grooves-1308305","sku":"PL-BB-1308305-BK","title":"Горщик для лохини 30 л круглий з паралельними U-пазами"},"1309008":{"id":"plantlogic-8l-square-1309008","sku":"PL-1309008-BK","title":"Горщик для малини та ожини 8 л квадратний"},"1309010":{"id":"plantlogic-rubus-square-10l-legacy-1309010","sku":"PL-1309010-BK","title":"Горщик для малини та ожини 10 л квадратний на ніжках 50 мм"},"1309015":{"id":"plantlogic-15l-square-1309015","sku":"PL-1309015-BK","title":"Горщик для малини та ожини 15 л квадратний"},"1309020":{"id":"plantlogic-blueberry-square-20l-1309020","sku":"PL-BB-1309020-BK","title":"Горщик для лохини 20 л квадратний на стандартних ніжках"},"1309025":{"id":"plantlogic-blueberry-square-25l-1309025","sku":"PL-BB-1309025-BK","title":"Горщик для лохини 25 л квадратний на стандартних ніжках"},"1309026":{"id":"plantlogic-blueberry-square-25l-u-grooves-1309026","sku":"PL-BB-1309026-BK","title":"Горщик для лохини 25 л квадратний з U-пазами"},"1309030":{"id":"plantlogic-blueberry-square-30l-1309030","sku":"PL-BB-1309030-BK","title":"Горщик для лохини 30 л квадратний на стандартних ніжках"},"1500010":{"id":"plantlogic-kratos-rivus-grow-bag-8l-1500010","sku":"PL-1500010","title":"Мішок для субстрату 8 л для овочевих систем"},"1700020":{"id":"plantlogic-pot-anchor","sku":"PL-1700020","title":"Анкер для фіксації горщика"},"1700034":{"id":"plantlogic-pot-anchor","sku":"PL-1700034","title":"Анкер для фіксації горщика"},"1700041":{"id":"plantlogic-pot-anchor","sku":"PL-1700041","title":"Анкер для фіксації горщика"},"1700146":{"id":"plantlogic-metal-stakes-gutter","sku":"PL-1700146","title":"Металеві скоби для фіксації дренажного жолоба"},"1700147":{"id":"plantlogic-metal-stakes-gutter","sku":"PL-1700147","title":"Металеві скоби для фіксації дренажного жолоба"},"1700149":{"id":"plantlogic-zephyr-v2-hose-clip-1700149","sku":"PL-1700149","title":"Кліпса для поливного шланга для Zephyr V2"},"1702000":{"id":"plantlogic-cold-storage-bin-1702000","sku":"PL-1702000","title":"Контейнер для транспортування та холодного зберігання long-cane"},"12010300":{"id":"plantlogic-vf-bag-base-12010300","sku":"PL-12010300","title":"Основа VF для мішка з субстратом"},"12010320":{"id":"plantlogic-vf-bag-base-hose-fix-12010320","sku":"PL-12010320","title":"Основа для мішка з субстратом з фіксацією шланга"},"12010400":{"id":"plantlogic-vf-bag-base-12010300","sku":"PL-12010400","title":"Основа VF для мішка з субстратом"},"12050010":{"id":"plantlogic-hose-clip-12050010","sku":"PL-12050010","title":"Багатофункціональна кліпса для фіксації поливного шланга"},"13020500":{"id":"plantlogic-rivus-slab-base","sku":"PL-13020500","title":"Основа Rivus з інтегрованим дренажним жолобом для субстратних плит"},"13020502":{"id":"plantlogic-rivus-slab-base","sku":"PL-13020502","title":"Основа Rivus з інтегрованим дренажним жолобом для субстратних плит"},"13020510":{"id":"plantlogic-rivus-end-cap","sku":"PL-13020510","title":"Торцева заглушка Rivus для основи субстратних плит"},"13020512":{"id":"plantlogic-rivus-end-cap","sku":"PL-13020512","title":"Торцева заглушка Rivus для основи субстратних плит"},"13046025":{"id":"plantlogic-steel-lysimeter","sku":"PL-13046025","title":"Сталевий лізиметр для контролю дренажу"},"13046026":{"id":"plantlogic-steel-lysimeter","sku":"PL-13046026","title":"Сталевий лізиметр для контролю дренажу"},"13046031":{"id":"plantlogic-steel-lysimeter","sku":"PL-13046031","title":"Сталевий лізиметр для контролю дренажу"},"13046041":{"id":"plantlogic-steel-lysimeter","sku":"PL-13046041","title":"Сталевий лізиметр для контролю дренажу"},"13050040":{"id":"plantlogic-4-7l-square-cold-storage-13050040","sku":"PL-13050040-BK","title":"Горщик для малини та ожини 4,7 л квадратний для технології long-cane"},"13079250":{"id":"plantlogic-culti-base","sku":"PL-13079250","title":"Мішок для субстрату з інтегрованою основою"},"13079300":{"id":"plantlogic-culti-base","sku":"PL-13079300","title":"Мішок для субстрату з інтегрованою основою"},"13080350":{"id":"plantlogic-blueberry-round-35l-u-grooves-13080350","sku":"PL-BB-13080350-BK","title":"Горщик для лохини 35 л круглий з U-пазами"},"13090350":{"id":"plantlogic-blueberry-square-35l-u-grooves-13090350","sku":"PL-BB-13090350-BK","title":"Горщик для лохини 35 л квадратний з U-пазами"},"13090400":{"id":"plantlogic-blueberry-square-40l-u-grooves-side-holes-16mm-13090400","sku":"PL-BB-13090400-TC","title":"Горщик для лохини 40 л квадратний з U-пазами Ø16 мм та бічними отворами"},"13090440":{"id":"plantlogic-blueberry-square-40l-u-grooves-side-holes-20mm-13090440","sku":"PL-BB-13090440-TC","title":"Горщик для лохини 40 л квадратний з U-пазами Ø20 мм та бічними отворами"},"30020012":{"id":"plantlogic-trough-cover","sku":"PL-30020012","title":"Кришка для полуничного жолоба"},"30020034":{"id":"plantlogic-trough-cover","sku":"PL-30020034","title":"Кришка для полуничного жолоба"},"30020036":{"id":"plantlogic-trough-cover","sku":"PL-30020036","title":"Кришка для полуничного жолоба"},"30020037":{"id":"plantlogic-trough-cover","sku":"PL-30020037","title":"Кришка для полуничного жолоба"},"30020040":{"id":"plantlogic-trough-cover","sku":"PL-30020040","title":"Кришка для полуничного жолоба"},"30020041":{"id":"plantlogic-trough-cover","sku":"PL-30020041","title":"Кришка для полуничного жолоба"},"C30020012":{"id":"plantlogic-trough-cover","sku":"PL-C30020012","title":"Кришка для полуничного жолоба"},"C30020034":{"id":"plantlogic-trough-cover","sku":"PL-C30020034","title":"Кришка для полуничного жолоба"},"C30020036":{"id":"plantlogic-trough-cover","sku":"PL-C30020036","title":"Кришка для полуничного жолоба"},"C30020037":{"id":"plantlogic-trough-cover","sku":"PL-C30020037","title":"Кришка для полуничного жолоба"},"C30020040":{"id":"plantlogic-trough-cover","sku":"PL-C30020040","title":"Кришка для полуничного жолоба"},"C30020041":{"id":"plantlogic-trough-cover","sku":"PL-C30020041","title":"Кришка для полуничного жолоба"}};
  const marketByPath={"/portfolio-items/cooling-skirt/":{"id":"plantlogic-blueberry-cooling-cover","sku":"PL-BB-COOLING-COVER","title":"Охолоджувальна спідниця та захист горщика"},"/portfolio-items/trough-cover-for-strawberries/":{"id":"plantlogic-trough-cover","sku":"PL-30020012","title":"Кришка для полуничного жолоба"}};
  const marketBase='https://market.bb610.com.ua/product.html';

  const marketUrl=(item)=>{
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
      a.rel='noopener';
      a.target='_blank';
      a.textContent=targets.length===1 ? 'Перейти до товару в Market ↗' : ((item.no ? '№'+item.no : 'Модель '+(index+1))+' · Market ↗');
      options.append(a);
    });
    wrap.append(options);

    if(actions) actions.before(wrap); else summary.append(wrap);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true});
  else render();
})();
