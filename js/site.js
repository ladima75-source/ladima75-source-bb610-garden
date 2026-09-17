(()=>{const link=document.createElement('link');link.rel='stylesheet';link.href='css/garden-logo-approved.css?v=20260917-3';document.head.appendChild(link);})();
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
  document.querySelectorAll('[data-brand-blocker]').forEach(el=>{el.hidden=true;});
  document.querySelectorAll('[data-brand-logo]').forEach(img=>{
    const holder=img.closest('.brand,.footer-brand');
    const fallback=()=>{
      img.style.visibility='hidden';
      holder&&holder.classList.add('is-missing');
    };
    img.addEventListener('error',fallback);
    if(img.complete&&img.naturalWidth===0)fallback();
  });
  const headerLogo=document.querySelector('.site-header [data-brand-logo]');
  if(headerLogo){
    headerLogo.onload=()=>{
      headerLogo.style.visibility='visible';
      headerLogo.closest('.brand')?.classList.remove('is-missing');
    };
    headerLogo.src='assets/brand/bb610-garden-approved.webp?v=20260917-3';
  }
});
