(() => {
  const library = document.querySelector('.blog-library');
  if (!library) return;
  const cards = [...library.querySelectorAll('[data-blog-post]')];
  const buttons = [...library.querySelectorAll('[data-blog-filter]')];
  const input = library.querySelector('input[type="search"]');
  const more = library.querySelector('[data-blog-more]');
  const empty = library.querySelector('.blog-empty');
  const count = library.querySelector('[data-blog-count]');
  const countLabel = library.querySelector('[data-blog-count-label]');
  let topic = 'all', limit = 6;
  const apply = () => {
    const query = input.value.trim().toLocaleLowerCase('uk');
    const matches = cards.filter(card =>
      (topic === 'all' || card.dataset.tags.split(' ').includes(topic)) &&
      (!query || card.dataset.search.includes(query))
    );
    cards.forEach(card => {card.hidden = true;});
    matches.slice(0, limit).forEach(card => {card.hidden = false;});
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.blogFilter === topic)));
    count.textContent = String(matches.length);
    const n = matches.length, last = n % 10, lastTwo = n % 100;
    countLabel.textContent = last === 1 && lastTwo !== 11 ? 'матеріал' :
      last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? 'матеріали' : 'матеріалів';
    empty.hidden = matches.length !== 0;
    more.hidden = matches.length <= limit;
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.blogFilter; limit = 6; apply();
  }));
  input.addEventListener('input', () => {limit = 6; apply();});
  more.addEventListener('click', () => {limit += 6; apply();});
  library.querySelector('[data-blog-reset]').addEventListener('click', () => {
    topic = 'all'; input.value = ''; limit = 6; apply(); input.focus();
  });
  apply();
})();
