(() => {
  const start = () => {
    const controls=document.querySelector('.catalog-filter');
    if(!controls)return;
    const buttons=[...controls.querySelectorAll('[data-culture]')];
    const sections=[...document.querySelectorAll('.catalog-category')];
    const total=document.querySelectorAll('.catalog-category .catalog-card').length;
    const names={all:'Усі культури',blueberry:'Лохина',strawberry:'Полуниця',rubus:'Малина та ожина',vegetables:'Овочі'};
    const cultureHashes=new Set(Object.keys(names).filter(key=>key!=='all'));
    const apply=(culture)=>{
      if(!names[culture])culture='all';
      buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.culture===culture)));
      let count=0;
      sections.forEach(section=>{
        let visible=0;
        section.querySelectorAll('.catalog-card').forEach(card=>{
          const tags=card.dataset.cultures.split(' ');
          card.hidden=culture!=='all'&&!tags.includes(culture)&&!tags.includes('shared');
          if(!card.hidden)visible++;
        });
        section.hidden=visible===0;
        section.querySelector('.catalog-category-count').textContent=String(visible);
        const link=document.querySelector(`.catalog-controls a[href="#${section.id}"]`);
        if(link)link.hidden=visible===0;
        count+=visible;
      });
      document.querySelector('.catalog-status').textContent=culture==='all'?`${count} моделей`:`${names[culture]} · ${count}`;
    };
    const readURL=()=>{
      const url=new URL(location.href),hash=url.hash.slice(1);
      const legacy=cultureHashes.has(hash);
      const culture=legacy?hash:url.searchParams.get('culture')||'all';
      apply(culture);
      if(legacy){
        const first=sections.find(section=>!section.hidden);
        url.searchParams.set('culture',culture);url.hash=first?'#'+first.id:'';
        history.replaceState(null,'',url.pathname+url.search+url.hash);
        first?.scrollIntoView({block:'start'});
      }
    };
    buttons.forEach(button=>button.addEventListener('click',()=>{
      const url=new URL(location.href),culture=button.dataset.culture;
      if(culture==='all')url.searchParams.delete('culture');else url.searchParams.set('culture',culture);
      // Stay at the filter so the selected culture and its result remain visible.
      url.hash='';history.pushState(null,'',url.pathname+url.search);
      apply(culture);
    }));
    controls.hidden=false;readURL();

    const typeLinks=[...document.querySelectorAll('.catalog-controls .solution-nav a[href^="#"]')];
    const syncType=(id)=>{
      typeLinks.forEach(link=>link.setAttribute('aria-current',String(link.getAttribute('href')==='#'+id)));
    };
    typeLinks.forEach(link=>link.addEventListener('click',()=>syncType(link.getAttribute('href').slice(1))));
    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>{
        const visible=entries
          .filter(entry=>entry.isIntersecting&&!entry.target.hidden)
          .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(visible)syncType(visible.target.id);
      },{rootMargin:'-190px 0px -62% 0px',threshold:[0,.05,.2,.5]});
      sections.forEach(section=>observer.observe(section));
    }

    addEventListener('popstate',readURL);addEventListener('hashchange',readURL);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
