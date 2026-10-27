(() => {
  const GA_ID = 'G-VEW179P3PW';
  const MARKET_HOST = 'market.bb610.com.ua';

  if (!window.__bb610GardenGa4) {
    window.__bb610GardenGa4 = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
      document.head.append(tag);
    }

    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      send_page_view: true,
      cookie_domain: 'auto'
    });
  }

  const text = (node) => (node?.textContent || '').replace(/\s+/g, ' ').trim();

  const parseJsonLdProduct = () => {
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const value = JSON.parse(script.textContent || '{}');
        const list = Array.isArray(value) ? value : [value];
        for (const item of list) {
          if (item && item['@type'] === 'Product') return item;
          if (Array.isArray(item?.['@graph'])) {
            const product = item['@graph'].find(x => x?.['@type'] === 'Product');
            if (product) return product;
          }
        }
      } catch (_) {}
    }
    return null;
  };

  const idFromText = (value) => {
    const raw = String(value || '');
    const labeled = raw.match(/(?:Product\s*#|Код(?:\s+моделі)?|Артикул)\s*[:#]?\s*([A-Za-z0-9-]+)/i);
    if (labeled) return labeled[1];
    const numeric = raw.match(/\b(\d{5,8})\b/);
    return numeric ? numeric[1] : '';
  };

  const idFromHref = (href) => {
    try {
      const url = new URL(href, location.href);
      const id = url.searchParams.get('id');
      if (id) return id;
      const match = url.pathname.match(/\/portfolio-items\/([^/]+)/);
      return match ? match[1] : '';
    } catch (_) {
      return '';
    }
  };

  const currentProduct = () => {
    const isProduct = location.pathname.startsWith('/portfolio-items/') || location.pathname === '/product.html';
    if (!isProduct) return null;

    const ld = parseJsonLdProduct();
    const name = ld?.name || text(document.querySelector('h1')) || document.title;
    const domId =
      idFromText(text(document.querySelector('.product-no,[data-product-no]'))) ||
      new URL(location.href).searchParams.get('id') ||
      ld?.sku ||
      idFromHref(location.href);

    return {
      item_id: String(domId || '').trim(),
      item_name: String(name || '').trim(),
      item_brand: 'PlantLogic'
    };
  };

  const productFromLink = (anchor) => {
    const card = anchor.closest('[data-product-no],.catalog-card,.garden-product-card') || anchor;
    const itemId =
      card?.dataset?.productNo ||
      idFromText(text(card.querySelector?.('.garden-product-meta,.product-no,[data-product-no]'))) ||
      idFromText(text(card)) ||
      idFromHref(anchor.href);
    const itemName =
      text(card.querySelector?.('h3,h2')) ||
      anchor.getAttribute('aria-label')?.replace(/^Детальніше про\s+/i,'') ||
      text(anchor) ||
      itemId;

    return {
      item_id: String(itemId || '').trim(),
      item_name: String(itemName || '').trim(),
      item_brand: 'PlantLogic'
    };
  };

  const listName = (anchor) => {
    const section = anchor.closest('section');
    return text(section?.querySelector('h2,h1')) || (location.pathname === '/catalog/' ? 'Каталог' : 'BB610 Garden');
  };

  // Prefer the SKU encoded in a direct Market product URL over a grouped Garden family SKU.
  const itemIdFromMarketUrl = (href) => {
    try {
      const url = new URL(href, location.href);
      if (url.hostname !== MARKET_HOST) return '';
      for (const value of [url.searchParams.get('id'),url.searchParams.get('sku'),url.pathname]) {
        const match = String(value||'').match(/(?:^|\D)(\d{6,8})(?=\D|$)/);
        if (match) return match[1];
      }
    } catch (_) {}
    return '';
  };

  const decorateMarketUrl = (anchor, product) => {
    try {
      const url = new URL(anchor.href, location.href);
      if (url.hostname !== MARKET_HOST) return;
      if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source','bb610_garden');
      if (!url.searchParams.has('utm_medium')) url.searchParams.set('utm_medium','referral');
      if (!url.searchParams.has('utm_campaign')) url.searchParams.set('utm_campaign','garden_to_market');
      const directId = itemIdFromMarketUrl(url.toString());
      if (directId) url.searchParams.set('utm_content',directId);
      else if (product?.item_id && !url.searchParams.has('utm_content')) url.searchParams.set('utm_content',product.item_id);
      anchor.href = url.toString();
    } catch (_) {}
  };

  const sendViewItem = () => {
    if (window.__bb610GardenViewItemSent) return;
    const item = currentProduct();
    if (!item?.item_id && !item?.item_name) return;
    window.__bb610GardenViewItemSent = true;
    window.gtag('event','view_item',{items:[item]});
  };

  const bindAnalytics = () => {
    sendViewItem();

    document.addEventListener('click', (event) => {
      const anchor = event.target.closest?.('a[href]');
      if (!anchor) return;

      let url;
      try { url = new URL(anchor.href, location.href); } catch (_) { return; }

      const isProductSelection =
        anchor.matches('.catalog-card,.garden-product-open') ||
        !!anchor.closest('.catalog-card,.garden-product-card');

      if (isProductSelection && url.origin === location.origin) {
        const item = productFromLink(anchor);
        window.gtag('event','select_item',{
          item_list_name:listName(anchor),
          items:[item]
        });
      }

      if (url.hostname === MARKET_HOST) {
        const baseItem = currentProduct() || (anchor.closest('.catalog-card,.garden-product-card') ? productFromLink(anchor) : null);
        const directId = itemIdFromMarketUrl(anchor.href);
        const item = directId && baseItem ? {...baseItem,item_id:directId} : baseItem;
        decorateMarketUrl(anchor,item);
        window.gtag('event','click_to_market',{
          link_url:anchor.href,
          source_page:location.href,
          item_id:item?.item_id || '',
          item_name:item?.item_name || ''
        });
      }
    }, true);

    document.querySelectorAll('a[href*="market.bb610.com.ua"]').forEach(anchor => {
      decorateMarketUrl(anchor, currentProduct());
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAnalytics, {once:true});
  } else {
    bindAnalytics();
  }
})();

(() => {
  const sections = [
    ['/', 'Головна'],
    ['/catalog/', 'Каталог', 'garden-nav-catalog'],
    ['/crops/', 'Культури'],
    ['/systems/', 'Системи'],
    ['/blog/', 'Блог']
  ];
  const markup = sections.map(([href,label,className]) => `<a href="${href}"${className ? ` class="${className}"` : ''}>${label}</a>`).join('');
  const market = '<a class="garden-market" href="https://market.bb610.com.ua/" target="_blank" rel="noopener">BB610 Market ↗</a>';
  const contactTarget = /^\/(about|contacts|privacy|terms)\//.test(location.pathname) ? '/contacts/' : '#contact';
  // The Ukrainian PlantLogic catalog is already versioned in this Garden repository.
  const pdfPath = '/media/tech-sheets-uk/plantlogic-catalog-2026-uk.pdf';
  const pdfName = 'PlantLogic-katalog-uk.pdf';
  const pdfMobileLink = '<a class="garden-mobile-pdf" href="' + pdfPath + '" download="' + pdfName + '">Завантажити каталог (PDF)</a>';
  const culturePaths = new Set(['/crops/','/blueberry-production/','/strawberry-production/','/rubus-production/','/vegetable-production/']);
  const activeHref = () => {
    const path=location.pathname;
    if (path === '/') return '/';
    if (culturePaths.has(path)) return '/crops/';
    if (path.startsWith('/systems/')) return '/systems/';
    if (path.startsWith('/accessories/')) return '/catalog/';
    if (path.startsWith('/blog/')) return '/blog/';
    if (path.startsWith('/catalog/') || path.startsWith('/portfolio-items/') || path==='/product.html') return '/catalog/';
    return '';
  };
  const updateActive = header => {
    const current=activeHref();
    header.querySelectorAll('nav a').forEach(a=>{
      const url=new URL(a.getAttribute('href'),location.href);
      const active=url.origin===location.origin && url.pathname+url.hash===current;
      a.classList.toggle('is-active',active);
      if (active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  };
  const bindMenu = (header,button,menu) => {
    if (!button || !menu || button.dataset.gardenNavigation) return;
    button.dataset.gardenNavigation='audit';
    button.setAttribute('aria-controls',menu.id);
    const close=()=>{menu.hidden=true;button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Відкрити меню');};
    button.addEventListener('click',event=>{
      event.preventDefault();event.stopPropagation();
      const open=menu.hidden;menu.hidden=!open;
      button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Закрити меню':'Відкрити меню');
    },true);
    menu.addEventListener('click',event=>{if(event.target.closest('a'))close();});
    document.addEventListener('click',event=>{if(!header.contains(event.target))close();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){close();button.focus();}});
    matchMedia('(min-width:1101px)').addEventListener('change',event=>{if(event.matches)close();});
    close();
  };
  const navIsCurrent = nav => {
    if (!nav) return false;
    const links=[...nav.querySelectorAll(':scope > a')];
    if (links.length!==sections.length) return false;
    return links.every((a,index)=>{
      const [href,label,className]=sections[index];
      return a.getAttribute('href')===href &&
        a.textContent.trim()===label &&
        (!!className===a.classList.contains(className));
    });
  };
  const syncHeader = header => {
    header.dataset.gardenArchitectureAudit='20261007-nav-v5';
    header.classList.add('garden-site-header');
    document.body.classList.add('garden-has-header');

    header.querySelector('.header-inner')?.classList.add('garden-header-inner');
    header.querySelector('.brand')?.classList.add('garden-brand');
    header.querySelector('.header-actions')?.classList.add('garden-header-actions');
    header.querySelector('.header-cta')?.classList.add('garden-project');

    const desktop=header.querySelector('.garden-desktop-nav,.desktop-nav');
    if(desktop){
      desktop.classList.add('garden-desktop-nav');
      desktop.setAttribute('aria-label','Головна навігація');
      if(!navIsCurrent(desktop)) desktop.innerHTML=markup;
    }

    const actions=header.querySelector('.garden-header-actions,.header-actions');
    actions?.classList.add('garden-header-actions');
    const shop=actions?.querySelector('.garden-market,.market-link');
    if(shop){
      shop.classList.add('garden-market');
      if(shop.textContent.trim()!=='BB610 Market ↗') shop.textContent='BB610 Market ↗';
      if(shop.getAttribute('href')!=='https://market.bb610.com.ua/') shop.href='https://market.bb610.com.ua/';
      if(shop.target!=='_blank') shop.target='_blank';
      if(shop.rel!=='noopener') shop.rel='noopener';
    }

    const project=actions?.querySelector('.garden-project,.header-cta');
    project?.classList.add('garden-project');
    if (project && project.getAttribute('href') !== contactTarget) project.setAttribute('href',contactTarget);
    if (actions && !actions.querySelector('.garden-catalog-download')) {
      const download = document.createElement('a');
      download.className = 'garden-catalog-download';
      download.href = pdfPath;
      download.download = pdfName;
      download.title = 'Завантажити каталог PlantLogic (PDF)';
      download.setAttribute('aria-label','Завантажити каталог PlantLogic (PDF)');
      download.innerHTML = '<span class="garden-catalog-download-icon" aria-hidden="true">↓</span>' +
        '<span class="garden-catalog-download-text">Завантажити каталог</span>';
      if (shop) shop.before(download);
      else if (project) project.before(download);
      else actions.prepend(download);
    }
    if (actions && !actions.querySelector('.garden-mobile-catalog-cta')) {
      const catalog = document.createElement('a');
      catalog.href = '/catalog/';
      catalog.className = 'garden-mobile-catalog-cta';
      catalog.textContent = 'Каталог';
      catalog.setAttribute('aria-label', 'Відкрити каталог продукції');
      if (project) project.before(catalog); else actions.prepend(catalog);
    }
    const mobileCatalog = actions?.querySelector('.garden-mobile-catalog-cta');
    if (mobileCatalog) {
      if (activeHref() === '/catalog/') mobileCatalog.setAttribute('aria-current', 'page');
      else mobileCatalog.removeAttribute('aria-current');
    }

    const button=header.querySelector('.garden-menu-button,.menu-button');
    button?.classList.add('garden-menu-button');

    let menu=header.querySelector('.garden-mobile-nav');
    if(!menu){
      menu=document.createElement('nav');
      menu.className='garden-mobile-nav';
      menu.id='garden-mobile-nav';
      menu.setAttribute('aria-label','Мобільна навігація');
      menu.hidden=true;
      header.append(menu);
    }
    if(!menu.id) menu.id='garden-mobile-nav';
    const mobileLinks=[...menu.querySelectorAll(':scope > a')];
    const mobileCurrent=
      mobileLinks.length===sections.length+3 &&
      sections.every(([href,label,className],index)=>{
        const a=mobileLinks[index];
        return a?.getAttribute('href')===href &&
          a.textContent.trim()===label &&
          (!!className===a.classList.contains(className));
      }) &&
      mobileLinks.at(-3)?.getAttribute('href')===pdfPath &&
      mobileLinks.at(-3)?.hasAttribute('download') &&
      mobileLinks.at(-2)?.getAttribute('href')==='https://market.bb610.com.ua/' &&
      mobileLinks.at(-2)?.textContent.trim()==='BB610 Market ↗' &&
      mobileLinks.at(-1)?.getAttribute('href')===contactTarget &&
      mobileLinks.at(-1)?.textContent.trim()==='Обговорити проєкт';
    if(!mobileCurrent) menu.innerHTML=markup+pdfMobileLink+market+'<a class="garden-mobile-project" href="'+contactTarget+'">Обговорити проєкт</a>';
  };
  // Keep Garden's contact phones consistent with BB610 Market:
  // the established +380 77 number remains first, the new +380 97 number second.
  const syncContactPhones = () => {
    const numbers = [
      ['+380770179770', '+380 (77) 017 97 70'],
      ['+380972920104', '+380 (97) 292-01-04']
    ];
    const makeNumbers = () => {
      const group = document.createElement('div');
      group.className = 'garden-contact-phones';
      group.setAttribute('aria-label', 'Телефони BB610 Garden');
      numbers.forEach(([number, label]) => {
        const a = document.createElement('a');
        a.href = 'tel:' + number;
        a.textContent = label;
        group.appendChild(a);
      });
      return group;
    };
    const footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.garden-contact-phones')) {
      const email = footer.querySelector('a[href^="mailto:"]');
      if (email) email.after(makeNumbers());
      else footer.append(makeNumbers());
    }
    const contact = document.querySelector('#contact');
    if (contact && !contact.querySelector('.garden-contact-phones')) {
      const action = contact.querySelector('a[href^="mailto:"]');
      if (action) action.after(makeNumbers());
    }
  };
  const enhance = () => {
    const header=document.querySelector('header');
    if (!header) return;

    syncHeader(header);
    syncContactPhones();
    bindMenu(header,header.querySelector('.garden-menu-button'),header.querySelector('.garden-mobile-nav'));
    updateActive(header);

    document.querySelectorAll('a[href="#crops"]').forEach(a=>a.href='/crops/');
    document.querySelectorAll('a[href="#plantlogic"]').forEach(a=>a.href='/blog/');

    const footer=document.querySelector('footer');
    if (footer && !footer.dataset.gardenArchitectureAudit) {
      footer.dataset.gardenArchitectureAudit='20261007-nav-v5';
      const heading=[...footer.querySelectorAll('h2,h3')].find(h=>h.textContent.trim()==='GARDEN');
      const group=heading?.parentElement || footer.querySelector('a[href="/catalog/"]')?.parentElement;
      if(group){
        group.querySelectorAll('a').forEach(a=>{
          if(a.getAttribute('href')?.startsWith('/')||a.getAttribute('href')?.startsWith('#')) a.remove();
        });
        group.insertAdjacentHTML('beforeend',markup);
      }
    }
  };
  const settleInitialAnchor = () => {
    if(location.pathname!=='/' || !location.hash) return;
    if(location.hash==='#crops'){location.replace('/crops/');return;}
    if(location.hash==='#plantlogic')history.replaceState(null,'','/#technical-core');
    const hash=location.hash;
    let cancelled=false,frame=0;
    const cancel=()=>{cancelled=true;observer.disconnect();};
    const align=()=>{
      frame=0;
      if(cancelled || location.hash!==hash) return;
      const target=document.getElementById(decodeURIComponent(hash.slice(1)));
      if(!target)return;
      const top=target.getBoundingClientRect().top;
      const height=document.querySelector('header')?.getBoundingClientRect().height||80;
      if(top<height+12 || top>height+70)target.scrollIntoView({block:'start',behavior:'instant'});
    };
    const schedule=()=>{if(!frame&&!cancelled)frame=requestAnimationFrame(align);};
    // React and the content scripts add sections after the first HTML render.
    // Track their layout until the visitor begins navigating or scrolling.
    const observer=new MutationObserver(schedule);
    observer.observe(document.querySelector('#root')||document.body,{subtree:true,childList:true});
    ['wheel','touchstart','pointerdown','keydown'].forEach(type=>window.addEventListener(type,cancel,{once:true,passive:true}));
    window.addEventListener('load',schedule,{once:true});
    schedule();
    setTimeout(()=>observer.disconnect(),10000);
  };
  const start=()=>{
    const mountHeader=()=>{
      if(!document.querySelector('header')) return false;
      enhance();
      return true;
    };
    if(!mountHeader()){
      const observer=new MutationObserver(()=>{
        if(mountHeader()) observer.disconnect();
      });
      observer.observe(document.querySelector('#root')||document.body,{subtree:true,childList:true});
      setTimeout(()=>observer.disconnect(),4000);
    }
    settleInitialAnchor();
    window.addEventListener('hashchange',()=>{const header=document.querySelector('header');if(header)updateActive(header);});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();


/* Garden informational footer: shared BB610 Market contacts, no ecosystem promotional links. */
(() => {
  const mail = 'market.bb610@gmail.com';
  const footerHTML = [
    '<div class="garden-footer-content">',
      '<div class="garden-footer-inner">',
        '<div class="garden-footer-intro">',
          '<a class="garden-footer-logo" href="/" aria-label="BB610 Garden — головна"><img src="/media/bb610-garden-user-logo.webp" alt="BB610 Garden" width="158" height="105" loading="lazy"></a>',
          '<p>Горщики, конструкції та системи PlantLogic для сучасного вирощування. Вивчайте. Порівнюйте. Застосовуйте.</p>',
        '</div>',
        '<div class="garden-footer-columns">',
          '<nav class="garden-footer-column" aria-label="Розділи Garden">',
            '<h2>РОЗДІЛИ</h2><a href="/catalog/">Каталог</a><a href="/crops/">Культури</a><a href="/systems/">Системи</a><a href="/blog/">Блог</a>',
          '</nav>',
          '<nav class="garden-footer-column" aria-label="Інформація про сайт">',
            '<h2>ІНФОРМАЦІЯ</h2><a href="/about/">Про нас</a><a href="/contacts/">Контакти</a><a href="/privacy/">Політика конфіденційності</a><a href="/terms/">Умови використання</a>',
            '<a href="https://market.bb610.com.ua/delivery.html" target="_blank" rel="noopener">Доставка · Market ↗</a>',
            '<a href="https://market.bb610.com.ua/payment.html" target="_blank" rel="noopener">Оплата · Market ↗</a>',
            '<a href="https://market.bb610.com.ua/returns.html" target="_blank" rel="noopener">Обмін та повернення · Market ↗</a>',
          '</nav>',
          '<div class="garden-footer-column garden-footer-contact">',
            '<h2>ЗВ’ЯЗОК</h2>',
            '<a href="tel:+380770179770">+380 (77) 017 97 70</a>',
            '<a href="tel:+380972920104">+380 (97) 292-01-04</a>',
            '<a href="mailto:market.bb610@gmail.com">market.bb610@gmail.com</a>',
            '<a href="https://t.me/bb610_market_bot" target="_blank" rel="noopener">Telegram · @bb610_market_bot ↗</a>',
            '<span>09:00–18:00 · м. Дніпро</span>',
            '<a href="/contacts/" class="garden-footer-contact-detail">Контактні дані та реквізити →</a>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="garden-footer-merchant">',
        '<span>Контактні дані та продавець у BB610 Market: ФОП Лахно Марина Анатоліївна · РНОКПП 2560502404</span>',
        '<span>49116, Україна, м. Дніпро, вул. Рильського (Самарський район), буд. 106</span>',
      '</div>',
      '<div class="garden-footer-bottom"><span>© '+ new Date().getFullYear() +' BB610 Garden</span><a href="#top" class="garden-footer-top">На початок ↑</a></div>',
    '</div>'
  ].join('');
  const syncEmails = () => {
    document.querySelectorAll('a[href="mailto:info@bb610.com.ua"]').forEach(a => {
      a.href = 'mailto:' + mail;
      if (a.textContent.trim() === 'info@bb610.com.ua') a.textContent = mail;
    });
  };
  const syncFooter = () => {
    syncEmails();
    const footer = document.querySelector('footer');
    if (!footer) return false;
    if (!footer.querySelector('.garden-footer-content')) {
      footer.classList.add('garden-unified-footer');
      footer.insertAdjacentHTML('beforeend',footerHTML);
    }
    return true;
  };
  const start = () => {
    if (syncFooter()) return;
    const observer = new MutationObserver(() => {
      if (syncFooter()) observer.disconnect();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(() => observer.disconnect(),8000);
  };
  if(document.readyState === 'loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
