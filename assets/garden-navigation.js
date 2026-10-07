(() => {
  const sections = [
    ['/crops/', 'Культури'], ['/systems/', 'Системи'], ['/catalog/', 'Каталог'], ['/blog/', 'Блог']
  ];
  const markup = sections.map(([href,label]) => `<a href="${href}">${label}</a>`).join('');
  const market = '<a href="https://market.bb610.com.ua/" target="_blank" rel="noopener">Market ↗</a>';
  const culturePaths = new Set(['/crops/','/blueberry-production/','/strawberry-production/','/rubus-production/','/vegetable-production/']);
  const activeHref = () => {
    const path=location.pathname;
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
      const active=url.pathname+url.hash===current;
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
  const enhance = () => {
    const header=document.querySelector('header');
    if (!header) return;
    if (!header.dataset.gardenArchitectureAudit) {
      header.dataset.gardenArchitectureAudit='20261006';
      header.classList.add('garden-site-header');document.body.classList.add('garden-has-header');
      // Keep the main page's project dialog button connected to React.
      if (header.closest('#root')) {
        header.querySelector('.header-inner')?.classList.add('garden-header-inner');
        header.querySelector('.brand')?.classList.add('garden-brand');
        const nav=header.querySelector('.desktop-nav');
        if(nav){nav.classList.add('garden-desktop-nav');nav.setAttribute('aria-label','Головна навігація');nav.innerHTML=markup;}
        header.querySelector('.header-actions')?.classList.add('garden-header-actions');
        const shop=header.querySelector('.market-link');
        if(shop){shop.classList.add('garden-market');shop.target='_blank';shop.rel='noopener';}
        header.querySelector('.header-cta')?.classList.add('garden-project');
        const button=header.querySelector('.menu-button');if(button)button.classList.add('garden-menu-button');
        let menu=header.querySelector('.garden-mobile-nav');
        if(!menu){menu=document.createElement('nav');menu.className='garden-mobile-nav';menu.id='garden-mobile-nav';menu.setAttribute('aria-label','Мобільна навігація');menu.hidden=true;menu.innerHTML=markup+market;header.append(menu);}
      }
    }
    bindMenu(header,header.querySelector('.garden-menu-button'),header.querySelector('.garden-mobile-nav'));
    updateActive(header);
    document.querySelectorAll('a[href="#crops"]').forEach(a=>a.href='/crops/');
    document.querySelectorAll('a[href="#plantlogic"]').forEach(a=>a.href='/blog/');
    const footer=document.querySelector('footer');
    if (footer && !footer.dataset.gardenArchitectureAudit) {
      footer.dataset.gardenArchitectureAudit='20261006';
      const heading=[...footer.querySelectorAll('h2,h3')].find(h=>h.textContent.trim()==='GARDEN');
      const group=heading?.parentElement || footer.querySelector('a[href="/catalog/"]')?.parentElement;
      if(group){group.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')?.startsWith('/')||a.getAttribute('href')?.startsWith('#'))a.remove();});group.insertAdjacentHTML('beforeend',markup);}
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
    enhance();
    settleInitialAnchor();
    const observer=new MutationObserver(enhance);
    observer.observe(document.querySelector('#root')||document.body,{subtree:true,childList:true});
    window.addEventListener('hashchange',()=>{const header=document.querySelector('header');if(header)updateActive(header);});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
