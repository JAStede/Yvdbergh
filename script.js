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
