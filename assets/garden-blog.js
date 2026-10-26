(() => {
  const library = document.querySelector('.blog-library');
  if (!library) return;
  const cards = [...library.querySelectorAll('[data-blog-post]')];
  const buttons = [...library.querySelectorAll('[data-blog-filter]')];
  const input = library.querySelector('input[type="search"]');
  const empty = library.querySelector('.blog-empty');
  let topic = 'all';

  const apply = () => {
    const query = input.value.trim().toLocaleLowerCase('uk');
    let matches = 0;
    cards.forEach(card => {
      const visible = (topic === 'all' || card.dataset.tags.split(' ').includes(topic)) &&
        (!query || card.dataset.search.includes(query));
      card.hidden = !visible;
      if (visible) matches++;
    });
    buttons.forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.blogFilter === topic)));
    empty.hidden = matches !== 0;
  };

  buttons.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.blogFilter;
    apply();
  }));
  input.addEventListener('input', apply);
  library.querySelector('[data-blog-reset]').addEventListener('click', () => {
    topic = 'all';
    input.value = '';
    apply();
    input.focus();
  });
  apply();
})();
