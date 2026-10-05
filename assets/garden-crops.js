(() => {
  const button = document.querySelector('.menu-button');
  const navigation = document.getElementById('culture-mobile-nav');
  const setOpen = open => {
    navigation.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  };
  button.addEventListener('click', () => setOpen(navigation.hidden));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !navigation.hidden) {
      setOpen(false);
      button.focus();
    }
  });
  window.matchMedia('(min-width:761px)').addEventListener('change', event => {
    if (event.matches) setOpen(false);
  });
})();
