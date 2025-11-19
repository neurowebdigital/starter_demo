(function(){
  const nav=document.querySelector('[data-nav]');
  const toggle=document.querySelector('[data-toggle]');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>nav.setAttribute('aria-expanded', nav.getAttribute('aria-expanded')!=='true'));
    addEventListener('resize',()=>{ if(innerWidth>900) nav.setAttribute('aria-expanded','false'); });
    addEventListener('keydown',e=>{ if(e.key==='Escape') nav.setAttribute('aria-expanded','false'); });
  }
  const onScroll=()=>{ if(scrollY>6) nav?.classList.add('nav--shadow'); else nav?.classList.remove('nav--shadow'); };
  onScroll(); addEventListener('scroll', onScroll, {passive:true});

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(!reduce && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-up, .reveal-fade').forEach(el=>io.observe(el));
  }else{
    document.querySelectorAll('.reveal, .reveal-up, .reveal-fade').forEach(el=>el.classList.add('is-in'));
  }

  const isTouch = matchMedia('(hover: none)').matches;
  if(!reduce && !isTouch){
    const tilt = (e)=>{
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const rx = (e.clientY - cy) / r.height * -4;
      const ry = (e.clientX - cx) / r.width * 4;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    };
    const reset = (e)=>{ e.currentTarget.style.transform='translateY(-3px)'; };
    document.querySelectorAll('.card--hover').forEach(el=>{
      el.addEventListener('mousemove', tilt);
      el.addEventListener('mouseleave', reset);
    });
  }
})();
