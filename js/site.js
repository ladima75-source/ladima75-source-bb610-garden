document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('[data-menu-button]');
  const panel=document.querySelector('[data-mobile-nav]');
  if(btn&&panel){
    btn.addEventListener('click',()=>{
      const open=panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',String(open));
    });
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      panel.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
    }));
  }
  document.querySelectorAll('[data-brand-logo]').forEach(img=>{
    const holder=img.closest('.brand,.footer-brand');
    const fallback=()=>{
      img.style.visibility='hidden';
      holder&&holder.classList.add('is-missing');
    };
    img.addEventListener('error',fallback);
    if(img.complete&&img.naturalWidth===0)fallback();
  });
});
