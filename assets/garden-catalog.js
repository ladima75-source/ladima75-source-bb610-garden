(() => {
  const start = () => {
    const controls=document.querySelector('.catalog-filter');
    if(!controls)return;
    const buttons=[...controls.querySelectorAll('[data-culture]')];
    const sections=[...document.querySelectorAll('.catalog-category')];
    document.querySelectorAll('.catalog-category .catalog-card').forEach(card=>{
      const img=card.querySelector(':scope > img');
      if(!img || img.parentElement.classList.contains('catalog-card-media')) return;
      const media=document.createElement('div');
      media.className='catalog-card-media';
      img.before(media);
      media.append(img);
      const compact=/\/(3-liter-square-pot|4-7-liter-square-pot-for-cold-storage|5-liter-square-short-pot|5-liter-drainage-collection-pot|7-liter-square-pot|7-liter-square-pot-for-cold-storage|7-liter-drainage-collection-pot|8-liter-square-pot|10-liter-square-pot|10-liter-drainage-collection-pot|15-liter-square-pot)\//.test(card.getAttribute('href')||'');
      if(compact) media.classList.add('catalog-card-media-zoom');
    });

    const normalizeImageBackground=(img)=>{
      const run=()=>{
        if(!img.naturalWidth||!img.naturalHeight||img.dataset.bgChecked==='1') return;
        img.dataset.bgChecked='1';
        try{
          const canvas=document.createElement('canvas');
          const size=40;
          canvas.width=size; canvas.height=size;
          const ctx=canvas.getContext('2d',{willReadFrequently:true});
          ctx.drawImage(img,0,0,size,size);
          const data=ctx.getImageData(0,0,size,size).data;
          let sum=0,count=0;
          for(let y=0;y<size;y++){
            for(let x=0;x<size;x++){
              if(x>2&&x<size-3&&y>2&&y<size-3) continue;
              const i=(y*size+x)*4;
              const r=data[i],g=data[i+1],b=data[i+2];
              sum+=(r+g+b)/3;
              count++;
            }
          }
          const edge=sum/count;
          if(edge<248) img.classList.add('catalog-image-bg-normalize');
        }catch(e){}
      };
      if(img.complete) run(); else img.addEventListener('load',run,{once:true});
    };
    document.querySelectorAll('.catalog-card-media>img').forEach(normalizeImageBackground);

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
