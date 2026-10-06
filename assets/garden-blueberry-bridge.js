(() => {
  const routes = window.GARDEN_BLUEBERRY_ROUTES || {};
  if (location.pathname === '/product.html') {
    const route = routes[new URLSearchParams(location.search).get('id')];
    if (route) { location.replace(route); return; }
  }
  const appendLink = (target, href, text, marker) => {
    if (!target || target.querySelector('.' + marker)) return;
    const link = document.createElement('a');
    link.className = 'blueberry-entry ' + marker;
    link.href = href; link.textContent = text; target.append(link);
  };
  const enhanceMobileMenu = () => {
    const button = document.querySelector('#root header .menu-button');
    const header = button?.closest('header');
    if (!button || !header || button.dataset.gardenMobileMenu) return;
    button.dataset.gardenMobileMenu = 'accessories';
    const navigation = document.createElement('nav');
    navigation.id = 'garden-mobile-architecture-nav';
    navigation.className = 'garden-mobile-architecture-nav';
    navigation.setAttribute('aria-label', 'Мобільна навігація');
    navigation.hidden = true;
    navigation.innerHTML = '<a href="/crops/">Культури</a><a href="/systems/">Системи</a><a href="/catalog/">Каталог</a><a href="/accessories/">Аксесуари</a><a href="#technical-core">Технологія</a><a href="#system-interfaces">Моніторинг</a><a href="https://market.bb610.com.ua/">Market ↗</a>';
    header.append(navigation);
    button.setAttribute('aria-controls', navigation.id);
    const setOpen = open => {
      navigation.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
    };
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(navigation.hidden);
    }, true);
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !navigation.hidden) { setOpen(false); button.focus(); }
    });
    matchMedia('(min-width:761px)').addEventListener('change', event => {
      if (event.matches) setOpen(false);
    });
  };
  const enhance = () => {
    enhanceMobileMenu();
    document.querySelectorAll('a[href*="product.html?id="]').forEach(link => {
      const id = new URL(link.href).searchParams.get('id');
      if (routes[id]) link.setAttribute('href', routes[id]);
    });
    document.querySelectorAll('a[href="#blueberry"],a[href="#lux-blueberry"]').forEach(link => link.setAttribute('href','/blueberry-production/'));
    document.querySelectorAll('a[href="#strawberry"],a[href="#lux-strawberry"]').forEach(link => link.setAttribute('href','/strawberry-production/'));
    document.querySelectorAll('a[href="#rubus"],a[href="#lux-rubus"]').forEach(link => link.setAttribute('href','/rubus-production/'));
    document.querySelectorAll('a[href="#vegetable"],a[href="#vegetables"],a[href="#lux-vegetable"]').forEach(link => link.setAttribute('href','/vegetable-production/'));
    appendLink(document.querySelector('#lux-rubus .lux-field-copy'),'/rubus-production/','Малина та ожина · 13 моделей і технологія →','rubus-crop-entry');
    appendLink(document.querySelector('#lux-vegetable .lux-field-copy'),'/vegetable-production/','Овочі · система, горщики та основи →','vegetable-crop-entry');
    appendLink(document.querySelector('#lux-blueberry .lux-field-copy'),'/blueberry-production/','Вирощування лохини · каталог і технологія →','blueberry-crop-entry');
    appendLink(document.querySelector('#lux-strawberry .lux-field-copy'),'/strawberry-production/','Вирощування полуниці · Hi-Grow і компоненти →','strawberry-crop-entry');
    appendLink(document.querySelector('#strawberry .section-heading') || document.querySelector('#strawberry'),'/systems/hi-grow/','Hi-Grow · настільна та підвісна система →','strawberry-system-entry');
    const foot = document.querySelector('.garden-products-foot');
    if (foot && !foot.dataset.catalogRoute) {
      foot.querySelectorAll('.blueberry-entry').forEach(link => link.remove());
      appendLink(foot,'/catalog/','Повний каталог · горщики, жолоби та аксесуари →','catalog-entry');
      foot.dataset.catalogRoute = 'hi-grow';
    }
    appendLink(foot,'/accessories/','Аксесуари · лізиметри, полив і захист →','accessories-entry');
    const nav = document.querySelector('.desktop-nav');
    if (nav && !nav.dataset.gardenArchitecture) {
      nav.innerHTML = '<a href="/crops/">Культури</a><a href="/systems/">Системи</a><a href="/catalog/">Каталог</a><a href="/accessories/">Аксесуари</a><a href="#technical-core">Технологія</a><a href="#system-interfaces">Моніторинг</a>';
      nav.dataset.gardenArchitecture = 'hi-grow';
    }
    document.querySelectorAll('a[href="#field-stories"]').forEach(link => link.setAttribute('href','/crops/'));
    document.querySelectorAll('a[href="#family-engineering"]').forEach(link => {
      if (link.closest('header,nav')) link.setAttribute('href','/systems/');
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
  function start() {
    enhance();
    new MutationObserver(enhance).observe(document.querySelector('#root') || document.body, {childList:true,subtree:true});
  }
})();
