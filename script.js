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
  if (message && !message.value.trim()) message.value = 'Ik ben geïnteresseerd in een airconditioner van ' + brand + '. Ik ontvang graag vrijblijvend advies en een offerte.';
})();
