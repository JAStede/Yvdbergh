const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
if(menu&&links){
  const setOpen=(open)=>{
    links.classList.toggle('open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Navigatiemenu sluiten':'Navigatiemenu openen');
    menu.textContent=open?'✕':'☰';
  };
  menu.addEventListener('click',()=>setOpen(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
  document.addEventListener('click',e=>{if(!e.target.closest('.navwrap'))setOpen(false)});
}

/* Vul merk en dienst vooraf in als iemand via een merkkaart een offerte aanvraagt. */
(() => {
  const params = new URLSearchParams(window.location.search);
  const brand = params.get('merk');
  if (!brand || !['Mitsubishi','Daikin','Panasonic','Haier'].includes(brand)) return;
  const service = document.getElementById('dienst');
  const message = document.getElementById('bericht');
  if (service) service.value = 'Airco-installatie';
  if (message && !message.value.trim()) message.value = 'Ik heb interesse in een airco van ' + brand + '.';
})();

(() => {
 const slides=[...document.querySelectorAll('.hero-slide')];
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(slides.length>1&&!reduced){let i=0;setInterval(()=>{slides[i].classList.remove('is-active');i=(i+1)%slides.length;slides[i].classList.add('is-active')},6000)}
 const numbers=[...document.querySelectorAll('.stat-number[data-count]')];
 if(reduced||!('IntersectionObserver' in window))return;
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;observer.unobserve(entry.target);const el=entry.target,target=Number(el.dataset.count),suffix=el.dataset.suffix||'',start=performance.now();const tick=now=>{const p=Math.min(1,(now-start)/1350);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick)};el.textContent='0'+suffix;requestAnimationFrame(tick)})},{threshold:.35});
 numbers.forEach(el=>observer.observe(el));
})();
