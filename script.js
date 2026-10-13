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

/* Cookietoestemming: optionele statistieken standaard uit; geen tracking geladen. */
(() => {
 const KEY='yvdbergh_cookie_consent_v1';
 const read=()=>{try{const x=JSON.parse(localStorage.getItem(KEY)||'null');return x&&typeof x.analytics==='boolean'?x:null}catch{return null}};
 const save=analytics=>{try{localStorage.setItem(KEY,JSON.stringify({necessary:true,analytics,updated:new Date().toISOString()}))}catch{};window.dispatchEvent(new CustomEvent('cookie-consent-changed',{detail:{analytics}}));panel.hidden=true};
 const panel=document.createElement('section');
 panel.className='cookie-panel';panel.setAttribute('aria-label','Cookievoorkeuren');
 panel.innerHTML='<div class="cookie-inner"><div class="cookie-copy"><strong>Uw privacy is belangrijk</strong><p>We gebruiken noodzakelijke opslag om uw cookiekeuze te onthouden. Met uw toestemming kunnen we later anonieme bezoekersstatistieken inschakelen. Op dit moment is er nog geen analysetool actief. <a href="privacyverklaring.html">Lees de privacyverklaring</a>.</p><div class="cookie-preferences" hidden><label><input type="checkbox" checked disabled> Noodzakelijk (altijd actief)</label><label><input type="checkbox" id="cookie-analytics"> Analytische cookies (optioneel)</label></div></div><div class="cookie-actions"><button type="button" class="cookie-btn cookie-accept">Alles accepteren</button><button type="button" class="cookie-btn cookie-reject">Weigeren</button><button type="button" class="cookie-btn cookie-settings">Voorkeuren aanpassen</button><button type="button" class="cookie-btn cookie-save" hidden>Keuze opslaan</button></div></div>';
 document.body.appendChild(panel);
 const preferences=panel.querySelector('.cookie-preferences'),analytics=panel.querySelector('#cookie-analytics'),saveButton=panel.querySelector('.cookie-save');
 const show=()=>{const existing=read();analytics.checked=existing?existing.analytics:false;preferences.hidden=true;saveButton.hidden=true;panel.querySelector('.cookie-settings').hidden=false;panel.hidden=false};
 panel.querySelector('.cookie-accept').addEventListener('click',()=>save(true));
 panel.querySelector('.cookie-reject').addEventListener('click',()=>save(false));
 panel.querySelector('.cookie-settings').addEventListener('click',()=>{preferences.hidden=false;saveButton.hidden=false;panel.querySelector('.cookie-settings').hidden=true});
 saveButton.addEventListener('click',()=>save(analytics.checked));
 const bottom=document.querySelector('.footerbottom');
 if(bottom){const button=document.createElement('button');button.type='button';button.className='cookie-footer-link';button.textContent='Cookievoorkeuren';button.addEventListener('click',show);bottom.appendChild(button)}
 panel.hidden=!!read();
})();
