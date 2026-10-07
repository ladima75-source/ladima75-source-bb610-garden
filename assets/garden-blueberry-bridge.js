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
  const polishFieldStories = () => {
    const section = document.querySelector('#field-stories');
    if (!section || section.dataset.fieldStoriesPolished === '1') return;

    const title = section.querySelector('.lux-field-head h2');
    if (title && title.textContent !== 'PlantLogic у реальних системах вирощування') {
      title.textContent = 'PlantLogic у реальних системах вирощування';
    }

    const note = section.querySelector('.lux-field-head > p');
    if (note) note.remove();

    const rubus = section.querySelector('#lux-rubus .lux-field-copy');
    if (rubus) {
      const strong = rubus.querySelector('strong');
      const body = rubus.querySelector('p');
      if (strong && strong.textContent !== 'Контейнер у виробничому ряду.') {
        strong.textContent = 'Контейнер у виробничому ряду.';
      }
      if (body && body.textContent !== 'Полив, дренаж, стабільність високих пагонів і доступ персоналу.') {
        body.textContent = 'Полив, дренаж, стабільність високих пагонів і доступ персоналу.';
      }
    }

    section.dataset.fieldStoriesPolished = '1';
  };

  const enhance = () => {
    polishFieldStories();
    document.querySelectorAll('a[href*="product.html?id="]').forEach(link => {
      const id = new URL(link.href).searchParams.get('id');
      if (routes[id]) link.setAttribute('href', routes[id]);
    });
    document.querySelectorAll('a[href="#blueberry"],a[href="#lux-blueberry"]').forEach(link => link.setAttribute('href','/blueberry-production/'));
    document.querySelectorAll('a[href="#strawberry"],a[href="#lux-strawberry"]').forEach(link => link.setAttribute('href','/strawberry-production/'));
    document.querySelectorAll('a[href="#rubus"],a[href="#lux-rubus"]').forEach(link => link.setAttribute('href','/rubus-production/'));
    document.querySelectorAll('a[href="#vegetable"],a[href="#vegetables"],a[href="#lux-vegetable"]').forEach(link => link.setAttribute('href','/vegetable-production/'));
    appendLink(document.querySelector('#lux-rubus .lux-field-copy'),'/rubus-production/','Моделі та технологія →','rubus-crop-entry');
    appendLink(document.querySelector('#lux-vegetable .lux-field-copy'),'/vegetable-production/','Безґрунтове вирощування овочів · системи й горщики →','vegetable-crop-entry');
    appendLink(document.querySelector('#lux-blueberry .lux-field-copy'),'/blueberry-production/','Лохина в контейнерах · моделі й технологія →','blueberry-crop-entry');
    appendLink(document.querySelector('#lux-strawberry .lux-field-copy'),'/strawberry-production/','Безґрунтове вирощування полуниці · Hi-Grow →','strawberry-crop-entry');
    appendLink(document.querySelector('#strawberry .section-heading') || document.querySelector('#strawberry'),'/systems/hi-grow/','Hi-Grow · настільна та підвісна система →','strawberry-system-entry');
    const foot = document.querySelector('.garden-products-foot');
    if (foot && !foot.dataset.catalogRoute) {
      foot.querySelectorAll('.blueberry-entry').forEach(link => link.remove());
      appendLink(foot,'/catalog/','Повний каталог · горщики, жолоби та аксесуари →','catalog-entry');
      foot.dataset.catalogRoute = 'hi-grow';
    }
    appendLink(foot,'/accessories/','Аксесуари · лізиметри, полив і захист →','accessories-entry');
    document.querySelectorAll('a[href="#field-stories"]').forEach(link => link.setAttribute('href','/crops/'));
    document.querySelectorAll('a[href="#family-engineering"]').forEach(link => {
      if (link.closest('header,nav')) link.setAttribute('href','/systems/');
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
  function start() {
    enhance();
    let scheduled = false;
    new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        enhance();
      });
    }).observe(document.querySelector('#root') || document.body, {childList:true,subtree:true});
  }
})();
