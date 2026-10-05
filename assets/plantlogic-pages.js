(() => {
  const logo = document.querySelector('.site-header .brand img');
  if (logo) {
    logo.src = '/media/bb610-garden-approved.webp';
    logo.alt = 'BB610 Garden';
    logo.removeAttribute('width');
    logo.removeAttribute('height');
  }
  const brandSuffix = document.querySelector('.site-header .brand > span');
  if (brandSuffix) brandSuffix.remove();

  const nav = document.querySelector('.site-header nav');
  if (nav) {
    nav.innerHTML =
      '<a href="/crops/">Культури</a>' +
      '<a href="/systems/">Системи</a>' +
      '<a href="/catalog/">Каталог</a>' +
      '<a href="/#technical-core">Технологія</a>' +
      '<a href="/#system-interfaces">Моніторинг</a>' +
      '<a class="nav-market" href="https://market.bb610.com.ua/">Market ↗</a>';

    const path = location.pathname;
    nav.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const active =
        (href === '/crops/' && path.startsWith('/crops/')) ||
        (href === '/systems/' && path.startsWith('/systems/')) ||
        (href === '/catalog/' && (path.startsWith('/catalog/') || path.startsWith('/portfolio-items/')));
      if (active) link.classList.add('is-active');
    });
  }

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