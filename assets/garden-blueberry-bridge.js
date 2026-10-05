(() => {
  const overview = '/blueberry-production/';
  const routes = window.GARDEN_BLUEBERRY_ROUTES;
  if (location.pathname === '/product.html') {
    const route = routes[new URLSearchParams(location.search).get('id')];
    if (route) { location.replace(route); return; }
  }
  const enhance = () => {
    document.querySelectorAll('a[href*="product.html?id="]').forEach(link => {
      const id = new URL(link.href).searchParams.get('id');
      if (routes[id]) link.setAttribute('href', routes[id]);
    });
    document.querySelectorAll('a[href="#blueberry"],a[href="#lux-blueberry"]').forEach(link => {
      link.setAttribute('href', overview);
    });
    const story = document.querySelector('#lux-blueberry .lux-field-copy');
    if (story && !story.querySelector('.blueberry-entry')) {
      const link = document.createElement('a');
      link.className = 'blueberry-entry';
      link.href = overview;
      link.textContent = 'Вирощування лохини · каталог і технологія →';
      story.append(link);
    }
    const foot = document.querySelector('.garden-products-foot');
    if (foot && !foot.querySelector('.blueberry-entry')) {
      const link = document.createElement('a');
      link.className = 'blueberry-entry';
      link.href = overview + '#catalog';
      link.textContent = 'Повний каталог для лохини · 14 моделей →';
      foot.append(link);
    }
    const nav = document.querySelector('.desktop-nav');
    if (nav && !nav.querySelector('.blueberry-nav')) {
      const link = document.createElement('a');
      link.href = overview;
      link.className = 'blueberry-nav';
      link.textContent = 'Лохина';
      nav.prepend(link);
    }
  };
  enhance();
  new MutationObserver(enhance).observe(document.querySelector('#root') || document.body, {childList:true,subtree:true});
})();
