/* المستشفى الإسلامي – سكربت صفحات الموقع */
// render site content from DATA
const docHTML = d => `<div class="doc"><div class="ph">${img(esc(d.img),esc(d.n))}</div><b>${esc(d.n)}</b></div>`;
function renderSite(){
  const home=DEPTS.filter(d=>d.home).slice(0,6);
  Q('#homeDepts').innerHTML = (home.length?home:DEPTS.slice(0,6)).map(deptCard).join('');
  Q('#deptGrid').innerHTML = DEPTS.map(deptCard).join(''); filterDepts();
  Q('#footDepts').innerHTML = (home.length?home:DEPTS).slice(0,5).map(d=>`<li><a href="department.html?id=${esc(d.id)}">${esc(d.n)}</a></li>`).join('');
  document.querySelectorAll('[data-count="depts"]').forEach(e=>e.textContent=DEPTS.length);
  Q('#docRow').innerHTML = DOCS.map(docHTML).join('');
  Q('#docGrid').innerHTML = DOCS.map(docHTML).join('');
  const ns=newsSorted();
  Q('#homeNews').innerHTML = ns.slice(0,3).map(n=>`<a class="news-item" href="${esc(fixLink(n.link)||'news.html')}"><time datetime="${esc(n.iso)}">${fmtDate(n.iso)}</time><div><h3>${esc(n.t)}</h3><p>${esc(n.s)}</p></div><span class="go">${arrow}</span></a>`).join('');
  Q('#newsArticles').innerHTML = ns.map(n=>`<article class="article"><div class="ph">${img(esc(n.img))}</div><div><time datetime="${esc(n.iso)}">${fmtDate(n.iso)}</time><h2>${esc(n.t)}</h2><p>${esc(n.s)}</p>${n.link?`<a class="link-arrow" href="${esc(fixLink(n.link))}">${esc(n.cta||'اقرأ المزيد')}${arrow}</a>`:''}</div></article>`).join('') || '<p style="color:var(--muted)">لا توجد أخبار حالياً.</p>';
  let mos=[3,0,6,16,10].map(i=>GAL[i]).filter(Boolean); if(mos.length<5)mos=GAL.slice(0,5);
  Q('#homeMosaic').innerHTML = mos.map(g=>`<div class="ph">${img(esc(g))}</div>`).join('');
  Q('#galGrid').innerHTML = GAL.map((g,i)=>`<button type="button" data-i="${i}" aria-label="عرض الصورة ${i+1}">${img(esc(g),'صورة '+(i+1))}</button>`).join('');
  Q('#megaCols').innerHTML=CAT_ORDER.map(k=>{const list=DEPTS.filter(d=>d.c===k);if(!list.length)return '';return `<div class="mega-group"><h5>${CATS[k]}<span>${list.length}</span></h5><ul class="mega-links">${list.map(d=>`<li><a href="department.html?id=${esc(d.id)}" data-dept="${esc(d.id)}"><span>${esc(d.n)}</span>${arrow}</a></li>`).join('')}</ul></div>`}).join('');
}
Q('#accred').innerHTML = ACC.map(a=>img(a,'شهادة اعتماد')).join('');
Q('#insLogos').innerHTML = INS.map(a=>`<div>${img(a,'شركة تأمين')}</div>`).join('');

// department filter
let cat='all';
Q('#deptChips').innerHTML = `<button class="chip" type="button" data-c="all" aria-pressed="true">الكل</button>`+Object.entries(CATS).map(([k,v])=>`<button class="chip" type="button" data-c="${k}" aria-pressed="false">${v}</button>`).join('');
function filterDepts(){
  if(!$('#deptGrid')||!$('#deptSearch'))return;
  const q=$('#deptSearch').value.trim(); let shown=0;
  document.querySelectorAll('#deptGrid .dept-card').forEach(c=>{
    const ok=(cat==='all'||c.dataset.cat===cat)&&(!q||c.dataset.name.includes(q));
    c.style.display=ok?'':'none'; if(ok)shown++;
  });
  $('#deptEmpty').style.display=shown?'none':'block';
}
if($('#deptChips'))$('#deptChips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.c;document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));filterDepts()});
if($('#deptSearch'))$('#deptSearch').addEventListener('input',filterDepts);

// department detail
function showDept(id){
  const d=DEPTS.find(x=>x.id===id); if(!d){location.replace('departments.html');return}
  $('#dTitle').textContent=d.n; $('#dCrumb').textContent=d.n; $('#dCat').textContent=CATS[d.c]||'';
  const im=$('#dImg'); im.classList.remove('broken'); im.onerror=()=>im.classList.add('broken'); im.src=d.img; im.alt=d.n;
  $('#dDesc').textContent=d.d;
  const fs=d.f||[]; Q('#dFacts').innerHTML=fs.map(x=>`<li>${esc(x)}</li>`).join(''); $('#dFacts').style.display=fs.length?'':'none';
  Q('#dOthers').innerHTML=DEPTS.filter(x=>x.c===d.c&&x.id!==d.id).concat(DEPTS.filter(x=>x.c!==d.c)).slice(0,7).map(x=>`<li><a href="department.html?id=${esc(x.id)}"><span>${esc(x.n)}</span>${arrow}</a></li>`).join('');
  document.title=d.n+' – المستشفى الإسلامي';
}

// ===== mega menu =====
const CAT_ORDER=['med','surg','mom','diag','chronic','svc'];
const megaItems=[...document.querySelectorAll('[data-mega]')];
const desktop=()=>matchMedia('(min-width:921px)').matches;
const hoverable=()=>matchMedia('(hover:hover)').matches&&desktop();
function setMega(item,open){
  item.classList.toggle('open',open);
  item.querySelector('.caret').setAttribute('aria-expanded',open);
  $('#megaBackdrop').hidden=!(megaItems.some(i=>i.classList.contains('open'))&&desktop());
}
function closeMegas(except){megaItems.forEach(i=>{if(i!==except&&i.classList.contains('open'))setMega(i,false)})}
megaItems.forEach(item=>{
  let t;
  item.querySelector('.caret').addEventListener('click',()=>{const o=!item.classList.contains('open');closeMegas(item);setMega(item,o)});
  item.addEventListener('mouseenter',()=>{if(!hoverable())return;clearTimeout(t);t=setTimeout(()=>{closeMegas(item);setMega(item,true)},90)});
  item.addEventListener('mouseleave',()=>{if(!hoverable())return;clearTimeout(t);t=setTimeout(()=>setMega(item,false),180)});
  item.addEventListener('keydown',e=>{if(e.key==='Escape'&&item.classList.contains('open')){setMega(item,false);item.querySelector('.caret').focus()}});
  item.addEventListener('focusout',e=>{if(desktop()&&e.relatedTarget&&!item.contains(e.relatedTarget))setMega(item,false)});
});
$('#megaBackdrop').addEventListener('click',()=>closeMegas());
document.addEventListener('click',e=>{if(desktop()&&!e.target.closest('[data-mega]'))closeMegas()});
$('#megaSearch').addEventListener('submit',e=>{e.preventDefault();const q=$('#megaQ').value.trim();location.href='departments.html'+(q?'?q='+encodeURIComponent(q):'')});

// ---- page init
const PAGE=document.body.dataset.page;
const PARAMS=new URLSearchParams(location.search);
renderSite();
if(PAGE==='department'){
  const id=PARAMS.get('id'); showDept(id);
  document.querySelectorAll('[data-dept]').forEach(a=>{if(a.dataset.dept===id)a.setAttribute('aria-current','page')});
}
if(PAGE==='departments'&&PARAMS.get('q')){$('#deptSearch').value=PARAMS.get('q');filterDepts()}

// mobile menu
if($('#menuBtn'))$('#menuBtn').addEventListener('click',()=>{document.documentElement.style.setProperty('--navtop',document.querySelector('header.site').getBoundingClientRect().bottom+'px');const o=$('#mainnav').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',o)});

// doctor row scroll
document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$('#docRow').scrollBy({left:b.dataset.scroll*-360,behavior:'smooth'})));

// lightbox
let li=0; const lb=$('#lb');
if(lb){
function openLb(i){li=(i+GAL.length)%GAL.length;lb.querySelector('img').src=GAL[li];lb.querySelector('.count').textContent=(li+1)+' / '+GAL.length;lb.classList.add('on');}
if($('#galGrid'))$('#galGrid').addEventListener('click',e=>{const b=e.target.closest('button');if(b)openLb(+b.dataset.i)});
lb.querySelector('.x').onclick=()=>lb.classList.remove('on');
lb.querySelector('.prev').onclick=()=>openLb(li-1);
lb.querySelector('.nxt').onclick=()=>openLb(li+1);
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('on')});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')openLb(li+1);if(e.key==='ArrowRight')openLb(li-1)});

}

// forms – submissions are saved to the admin inbox
if($('#jobForm'))$('#jobForm').addEventListener('submit',e=>{e.preventDefault();DATA.inbox.unshift({id:'m'+Date.now(),type:'job',at:new Date().toISOString(),read:false,fields:{'الاسم':jName.value,'الهاتف':jPhone.value,'البريد الإلكتروني':jMail.value,'نوع الوظيفة':jType.value,'التخصص':jSpec.value,'السيرة الذاتية':jCv.files[0]?jCv.files[0].name:'—'}});saveData();e.target.reset();toast('شكراً لك، تم استلام طلبك.')});
if($('#contactForm'))$('#contactForm').addEventListener('submit',e=>{e.preventDefault();DATA.inbox.unshift({id:'m'+Date.now(),type:'contact',at:new Date().toISOString(),read:false,fields:{'الاسم':cName.value,'الهاتف':cPhone.value,'الموضوع':cSubj.value,'الرسالة':cMsg.value}});saveData();e.target.reset();toast('شكراً لك، سنتواصل معك قريباً.')});
