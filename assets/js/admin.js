/* المستشفى الإسلامي – لوحة التحكم */
// ===================== ADMIN PANEL =====================
const ADM_TABS=[['dash','نظرة عامة'],['news','الأخبار'],['depts','الأقسام'],['docs','الأطباء'],['gal','معرض الصور'],['inbox','الرسائل والطلبات']];
let admTab='dash';
const ic=n=>`<svg class="i"><use href="#i-${n}"/></svg>`;
const unread=()=>DATA.inbox.filter(m=>!m.read).length;
function admCount(k){const n={news:NEWS.length,depts:DEPTS.length,docs:DOCS.length,gal:GAL.length,inbox:unread()}[k];if(n===undefined)return '';return `<span class="cnt${k==='inbox'&&n?' hot':''}">${n}</span>`}
function fmtTime(t){try{return new Date(t).toLocaleString('ar-JO-u-nu-latn',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}catch(e){return ''}}
const thumb=src=>`<div class="ph th">${img(esc(src))}</div>`;
const delBtn=(type,id)=>`<button class="icon-btn del" type="button" data-act="del" data-type="${type}" data-id="${esc(id)}" aria-label="حذف" title="حذف">${ic('trash')}</button>`;
const editBtn=(type,id)=>`<button class="icon-btn" type="button" data-act="edit" data-type="${type}" data-id="${esc(id)}" aria-label="تعديل" title="تعديل">${ic('edit')}</button>`;
const moveBtns=(type,i,len)=>`<button class="icon-btn" type="button" data-act="move" data-type="${type}" data-id="${i}" data-dir="-1" aria-label="نقل للأمام" title="نقل للأمام" ${i===0?'disabled':''}>${ic('arrow-r')}</button><button class="icon-btn" type="button" data-act="move" data-type="${type}" data-id="${i}" data-dir="1" aria-label="نقل للخلف" title="نقل للخلف" ${i===len-1?'disabled':''}>${ic('arrow')}</button>`;

const VIEWS={
 dash(){
  const msgs=DATA.inbox.slice(0,5), ns=newsSorted().slice(0,4);
  return `<div class="adm-stats">
    <a class="adm-stat" href="news.html"><b>${NEWS.length}</b><span>خبر منشور</span></a>
    <a class="adm-stat" href="#depts"><b>${DEPTS.length}</b><span>قسم طبي</span></a>
    <a class="adm-stat" href="#docs"><b>${DOCS.length}</b><span>طبيب</span></a>
    <a class="adm-stat" href="#gal"><b>${GAL.length}</b><span>صورة في المعرض</span></a>
    <a class="adm-stat ${unread()?'hot':''}" href="#inbox"><b>${unread()}</b><span>رسالة / طلب غير مقروء</span></a>
  </div>
  <div class="adm-two">
    <div class="adm-card"><h3>آخر الرسائل والطلبات<a href="#inbox">عرض الكل</a></h3>${msgs.length?`<ul class="adm-list">${msgs.map(m=>`<li><span><span class="pill ${m.type==='job'?'job':''}">${m.type==='job'?'طلب توظيف':'رسالة'}</span> ${esc(m.fields['الاسم'])} ${m.read?'':'<span class="pill new">جديد</span>'}</span><small>${fmtTime(m.at)}</small></li>`).join('')}</ul>`:'<p class="adm-empty">لا توجد رسائل بعد. ستظهر هنا الرسائل وطلبات التوظيف المرسلة من الموقع.</p>'}</div>
    <div class="adm-card"><h3>آخر الأخبار<a href="news.html">إدارة الأخبار</a></h3>${ns.length?`<ul class="adm-list">${ns.map(n=>`<li><span>${esc(n.t)}</span><small>${fmtDate(n.iso)}</small></li>`).join('')}</ul>`:'<p class="adm-empty">لا توجد أخبار.</p>'}</div>
  </div>`;
 },
 news(){
  const ns=newsSorted();
  if(!ns.length)return '<div class="adm-card"><p class="adm-empty">لا توجد أخبار. اضغط «إضافة خبر» للبدء.</p></div>';
  return `<div class="adm-card"><table class="adm-table"><thead><tr><th style="width:80px">الصورة</th><th>العنوان</th><th class="hide-s">التاريخ</th><th></th></tr></thead><tbody>${ns.map(n=>`<tr><td>${thumb(n.img)}</td><td><div class="t">${esc(n.t)}</div><div class="sub">${esc((n.s||'').slice(0,90))}${(n.s||'').length>90?'…':''}</div></td><td class="hide-s sub">${fmtDate(n.iso)}</td><td><div class="adm-actions">${editBtn('news',n.id)}${delBtn('news',n.id)}</div></td></tr>`).join('')}</tbody></table></div>`;
 },
 depts(){
  if(!DEPTS.length)return '<div class="adm-card"><p class="adm-empty">لا توجد أقسام.</p></div>';
  return `<div class="adm-card"><table class="adm-table"><thead><tr><th style="width:80px">الصورة</th><th>القسم</th><th class="hide-s">الفئة</th><th class="hide-s">في الرئيسية</th><th></th></tr></thead><tbody>${DEPTS.map(d=>`<tr><td>${thumb(d.img)}</td><td><div class="t">${esc(d.n)}</div><div class="sub">${esc((d.d||'').slice(0,70))}${(d.d||'').length>70?'…':''}</div></td><td class="hide-s"><span class="pill">${CATS[d.c]||''}</span></td><td class="hide-s"><label class="switch"><input type="checkbox" data-act="home" data-id="${esc(d.id)}" ${d.home?'checked':''}>${d.home?'ظاهر':'مخفي'}</label></td><td><div class="adm-actions">${editBtn('depts',d.id)}${delBtn('depts',d.id)}</div></td></tr>`).join('')}</tbody></table></div>
  <p class="sub" style="color:var(--muted);font-size:13px;margin-top:10px">تظهر أول 6 أقسام مفعّل لها «في الرئيسية» في الصفحة الرئيسية.</p>`;
 },
 docs(){
  if(!DOCS.length)return '<div class="adm-card"><p class="adm-empty">لا يوجد أطباء.</p></div>';
  return `<div class="adm-grid">${DOCS.map((d,i)=>`<div class="adm-tile"><div class="ph">${img(esc(d.img),esc(d.n))}</div><div class="row"><b title="${esc(d.n)}">${esc(d.n)}</b></div><div class="acts">${moveBtns('docs',i,DOCS.length)}${editBtn('docs',d.id)}${delBtn('docs',d.id)}</div></div>`).join('')}</div>`;
 },
 gal(){
  if(!GAL.length)return '<div class="adm-card"><p class="adm-empty">المعرض فارغ.</p></div>';
  return `<div class="adm-grid">${GAL.map((g,i)=>`<div class="adm-tile wide"><div class="ph">${img(esc(g))}</div><div class="row"><b>صورة ${i+1}</b></div><div class="acts">${moveBtns('gal',i,GAL.length)}${delBtn('gal',i)}</div></div>`).join('')}</div>`;
 },
 inbox(){
  if(!DATA.inbox.length)return '<div class="adm-card"><p class="adm-empty">لا توجد رسائل بعد. أرسل نموذج «إتصل بنا» أو «الوظائف» من الموقع لتجربة ذلك.</p></div>';
  return DATA.inbox.map(m=>`<div class="msg ${m.read?'':'unread'}"><div class="msg-head"><span><span class="pill ${m.type==='job'?'job':''}">${m.type==='job'?'طلب توظيف':'رسالة تواصل'}</span> <b>${esc(m.fields['الاسم'])}</b> ${m.read?'':'<span class="pill new">جديد</span>'}</span><span class="adm-actions" style="align-items:center"><small style="color:var(--muted)">${fmtTime(m.at)}</small>${m.read?'':`<button class="btn btn-ghost btn-sm" type="button" data-act="read" data-id="${esc(m.id)}">تحديد كمقروء</button>`}${delBtn('inbox',m.id)}</span></div><dl>${Object.entries(m.fields).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)||'—'}</dd>`).join('')}</dl></div>`).join('');
 }
};
const ADD_LABEL={news:'إضافة خبر',depts:'إضافة قسم',docs:'إضافة طبيب',gal:'إضافة صورة'};

function renderAdmin(tab){
  admTab=VIEWS[tab]?tab:'dash';
  const name=ADM_TABS.find(t=>t[0]===admTab)[1];
  Q('#admNav').innerHTML=ADM_TABS.map(([k,v])=>`<a href="#${k}" ${k===admTab?'aria-current="page"':''}><span>${v}</span>${admCount(k)}</a>`).join('');
  $('#admTitle').textContent=name; $('#admCrumb').textContent=name;
  Q('#admActions').innerHTML=ADD_LABEL[admTab]?`<button class="btn btn-primary" type="button" data-act="add" data-type="${admTab}">${ic('plus')}${ADD_LABEL[admTab]}</button>`:(admTab==='inbox'&&unread()?`<button class="btn btn-ghost btn-sm" type="button" data-act="readall">تحديد الكل كمقروء</button>`:'');
  Q('#admBody').innerHTML=VIEWS[admTab]();
  document.title=name+' – لوحة التحكم';
}
function commit(msg){if(saveData()){renderAdmin(admTab);if(msg)toast(msg)}}

// ---- editor dialog
const FIELDS={
  news:[{k:'t',l:'عنوان الخبر',req:1},{k:'iso',l:'التاريخ',type:'date',req:1},{k:'s',l:'نص الخبر',type:'textarea',req:1},{k:'img',l:'الصورة',type:'image'},{k:'link',l:'رابط «اقرأ المزيد» (اختياري)',hint:'مثال: #careers أو department.html?id=er أو رابط خارجي'},{k:'cta',l:'نص الرابط',hint:'مثال: قدّم طلبك'}],
  depts:[{k:'n',l:'اسم القسم',req:1},{k:'c',l:'الفئة',type:'select',opts:CATS},{k:'d',l:'الوصف',type:'textarea',req:1},{k:'f',l:'معلومات بارزة (سطر لكل معلومة)',type:'lines'},{k:'img',l:'الصورة',type:'image'},{k:'home',l:'إظهار القسم في الصفحة الرئيسية',type:'check'}],
  docs:[{k:'n',l:'اسم الطبيب',req:1,hint:'مثال: د. أحمد محمد'},{k:'img',l:'الصورة الشخصية',type:'image'}],
  gal:[{k:'img',l:'الصورة',type:'image',req:1}]
};
function fieldHTML(f,v){
  const id='f_'+f.k, req=f.req?'required':'', hint=f.hint?`<span class="hint">${f.hint}</span>`:'';
  if(f.type==='check')return `<label class="chk"><input type="checkbox" name="${f.k}" ${v?'checked':''}>${f.l}</label>`;
  let ctl;
  if(f.type==='textarea')ctl=`<textarea id="${id}" name="${f.k}" rows="5" ${req}>${esc(v)}</textarea>`;
  else if(f.type==='lines')ctl=`<textarea id="${id}" name="${f.k}" rows="4">${esc((v||[]).join('\n'))}</textarea>`;
  else if(f.type==='select')ctl=`<select id="${id}" name="${f.k}">${Object.entries(f.opts).map(([k,t])=>`<option value="${k}" ${k===v?'selected':''}>${t}</option>`).join('')}</select>`;
  else if(f.type==='image')ctl=`<div class="img-field"><div class="ph">${img(esc(v||''))}</div><div class="ctl"><input id="${id}" name="${f.k}" value="${esc(v&&v.startsWith('data:')?'':v||'')}" placeholder="الصق رابط الصورة" dir="ltr" data-data="${v&&v.startsWith('data:')?'1':''}" ${req&&!v?'required':''}><label class="btn btn-ghost btn-sm">رفع صورة من الجهاز<input type="file" accept="image/*" hidden data-up="${f.k}"></label><span class="hint">${v&&v.startsWith('data:')?'صورة مرفوعة من الجهاز':'يُصغَّر حجم الصورة تلقائياً عند الرفع'}</span></div></div>`;
  else ctl=`<input id="${id}" name="${f.k}" type="${f.type||'text'}" value="${esc(v)}" ${req}>`;
  return `<div class="field"><label for="${id}">${f.l}</label>${ctl}${hint}</div>`;
}
function resizeImage(file,max=1400){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.82))};im.onerror=rej;im.src=r.result};r.onerror=rej;r.readAsDataURL(file)})}
function openEditor(type,item){
  const isNew=!item, vals=item||(type==='news'?{iso:new Date().toISOString().slice(0,10)}:type==='depts'?{c:'med',f:[]}:{});
  const title=(isNew?ADD_LABEL[type]:'تعديل '+({news:'الخبر',depts:'القسم',docs:'بيانات الطبيب'}[type]||''));
  const dlg=$('#admDlg'); const uploaded={};
  dlg.innerHTML=`<form method="dialog"><div class="dlg-head"><h3>${title}</h3><button class="icon-btn" value="cancel" formnovalidate aria-label="إغلاق">${ic('x')}</button></div><div class="dlg-body">${FIELDS[type].map(f=>fieldHTML(f,vals[f.k])).join('')}</div><div class="dlg-foot"><button class="btn btn-primary" value="ok">${isNew?'إضافة':'حفظ التعديلات'}</button><button class="btn btn-ghost" value="cancel" formnovalidate>إلغاء</button></div></form>`;
  dlg.querySelectorAll('[data-up]').forEach(inp=>inp.addEventListener('change',async()=>{
    const f=inp.files[0]; if(!f)return; const k=inp.dataset.up;
    try{const url=await resizeImage(f); uploaded[k]=url; const box=inp.closest('.img-field'); box.querySelector('.ph').innerHTML=img(url); const t=box.querySelector('input[name]'); t.value=''; t.required=false; box.querySelector('.hint').textContent='تم رفع: '+f.name}catch(e){toast('تعذّر قراءة الصورة')}
  }));
  dlg.querySelectorAll('.img-field input[name]').forEach(t=>t.addEventListener('change',()=>{delete uploaded[t.name];t.closest('.img-field').querySelector('.ph').innerHTML=img(esc(t.value.trim()))}));
  const form=dlg.querySelector('form');
  form.addEventListener('submit',e=>{
    if(!e.submitter||e.submitter.value!=='ok')return;
    const out=isNew?{}:item;
    FIELDS[type].forEach(f=>{const el=form.elements[f.k];
      if(f.type==='check')out[f.k]=el.checked;
      else if(f.type==='lines')out[f.k]=el.value.split('\n').map(x=>x.trim()).filter(Boolean);
      else if(f.type==='image'){const v=el.value.trim(); if(uploaded[f.k])out[f.k]=uploaded[f.k]; else if(v)out[f.k]=v; else if(isNew)out[f.k]='';}
      else out[f.k]=el.value.trim();
    });
    if(type==='gal'){if(out.img)GAL.unshift(out.img);commit('تمت إضافة الصورة');return}
    if(isNew){out.id=(type==='depts'?'d':type==='docs'?'doc':'n')+Date.now(); if(type==='news')NEWS.push(out); if(type==='depts')DEPTS.push(out); if(type==='docs')DOCS.push(out)}
    commit(isNew?'تمت الإضافة':'تم حفظ التعديلات');
  });
  dlg.showModal();
  setTimeout(()=>{const first=form.querySelector('.dlg-body input:not([type=file]),.dlg-body textarea');first&&first.focus()},30);
}

// ---- admin events
const listOf={news:NEWS,depts:DEPTS,docs:DOCS};
function handleAdm(e){
  const b=e.target.closest('[data-act]'); if(!b)return;
  const {act,type,id}=b.dataset;
  if(act==='home')return; // handled on change
  if(act==='add')return openEditor(type);
  if(act==='edit')return openEditor(type,listOf[type].find(x=>x.id===id));
  if(act==='read'){const m=DATA.inbox.find(x=>x.id===id);if(m)m.read=true;return commit()}
  if(act==='readall'){DATA.inbox.forEach(m=>m.read=true);return commit()}
  if(act==='move'){const arr=type==='docs'?DOCS:GAL,i=+id,j=i+(+b.dataset.dir);if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];return commit()}
  if(act==='del'){
    if(!b.classList.contains('armed')){document.querySelectorAll('.armed').forEach(x=>x.classList.remove('armed'));b.classList.add('armed');b.title='اضغط مرة أخرى للتأكيد';toast('اضغط زر الحذف مرة أخرى للتأكيد');setTimeout(()=>b.classList.remove('armed'),3500);return}
    if(type==='gal')GAL.splice(+id,1);
    else{const arr=type==='inbox'?DATA.inbox:listOf[type];const i=arr.findIndex(x=>x.id===id);if(i>-1)arr.splice(i,1)}
    commit('تم الحذف');
  }
}
$('#admBody').addEventListener('click',handleAdm);
$('#admActions').addEventListener('click',handleAdm);
$('#admBody').addEventListener('change',e=>{const c=e.target.closest('[data-act="home"]');if(!c)return;const d=DEPTS.find(x=>x.id===c.dataset.id);if(d){d.home=c.checked;commit(c.checked?'سيظهر القسم في الرئيسية':'أُخفي القسم من الرئيسية')}});
document.querySelector('.adm-tools').addEventListener('click',e=>{
  const t=e.target.closest('[data-tool]'); if(!t)return;
  if(t.dataset.tool==='export'){const blob=new Blob([JSON.stringify(DATA,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='islamic-hospital-content.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('تم تصدير البيانات')}
  if(t.dataset.tool==='reset'){
    if(!t.classList.contains('armed')){t.classList.add('armed');t.textContent='اضغط مرة أخرى لتأكيد الاستعادة';setTimeout(()=>{t.classList.remove('armed');t.textContent='استعادة المحتوى الأصلي'},4000);return}
    try{localStorage.removeItem(STORE)}catch(e){} location.reload();
  }
});
$('#admImport').addEventListener('change',async e=>{
  const f=e.target.files[0]; if(!f)return;
  try{const d=JSON.parse(await f.text()); if(!Array.isArray(d.depts)||!Array.isArray(d.news))throw 0; localStorage.setItem(STORE,JSON.stringify(d)); location.reload()}
  catch(err){toast('الملف غير صالح')}
  e.target.value='';
});

// ---- tabs (admin.html#news, #depts …)
function admRoute(){const d=$('#admDlg');if(d&&d.open)d.close();renderAdmin(decodeURIComponent(location.hash.slice(1))||'dash');window.scrollTo(0,0)}
addEventListener('hashchange',admRoute); admRoute();
