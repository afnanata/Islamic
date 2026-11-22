/* المستشفى الإسلامي – البيانات المشتركة بين صفحات الموقع ولوحة التحكم */
const B = 'https://islamic-hospital.org/Admin_Site/Articles/Images/';
const CATS = {diag:'التشخيص', surg:'الجراحة والإجراءات', mom:'الأم والطفل', chronic:'العلاج المتخصص', med:'التخصصات الطبية', svc:'الخدمات المساندة'};
const DEPTS0 = [
 {id:'er',n:'الطوارئ',c:'svc',img:'ad026caa-2ca0-4bb5-b433-c469d468dd4e.jpg',d:'أكبر قسم طوارئ في القطاع الخاص، يستقبل الحالات على مدار الساعة طوال أيام الأسبوع.',f:['40 سريراً','3 سيارات إسعاف','على مدار 24 ساعة']},
 {id:'ops',n:'العمليات',c:'surg',img:'129b2e1d-7a1b-4c00-946c-145a96928016.jpg',d:'مجمّع عمليات متكامل لمختلف التخصصات الجراحية، مع وحدات إفاقة وجراحة اليوم الواحد.',f:['10 غرف عمليات','3 غرف عمليات نسائية','18 سرير إفاقة','17 سريراً لجراحة اليوم الواحد']},
 {id:'clinics',n:'العيادات الخارجية',c:'svc',img:'decf396d-c2ef-4370-ade3-28ac01a6fe26.jpg',d:'عيادات تخصصية تغطي معظم التخصصات الطبية والجراحية.',f:['أكثر من 54 عيادة تخصصية','نحو 86 طبيباً']},
 {id:'cardio',n:'القلب',c:'med',img:'2cf3c7f3-3f3c-4df9-bad3-2c4bb8f61bba.jpg',d:'تشخيص أمراض القلب وعلاجها، وصاحب أول عملية قلب مفتوح في القطاع الخاص.',f:['أول عملية قلب مفتوح في القطاع الخاص (1983)','أول إغلاق لثقب في الحاجز بالقسطرة (2001)']},
 {id:'lab',n:'المختبر',c:'diag',img:'5ecff5d7-2cbd-4421-bd12-eafc45bf28d3.jpg',d:'مختبرات طبية تجري طيفاً واسعاً من الفحوصات الروتينية والتخصصية.',f:['نحو 1,200 نوع من الفحوصات','قرابة مليون فحص سنوياً']},
 {id:'radiology',n:'الأشعة',c:'diag',img:'934f09c0-3bb2-4350-a9c0-efc8866d73b9.jpg',d:'خدمات التصوير الطبي، ومنها الماموغرام الرقمي للكشف المبكر عن أورام الثدي.',f:['ماموغرام رقمي']},
 {id:'ivf',n:'وحدة أطفال الأنابيب',c:'mom',img:'7318fba8-2a6a-4ede-a15d-83799af20b62.jpg',d:'علاج العقم والإخصاب المساعد.',f:['نسب نجاح تصل إلى 60%']},
 {id:'neonatal',n:'الخداج وحديثو الولادة',c:'mom',img:'4a58989f-5ec4-4dc7-ae10-5ee10ad73d1f.jpg',d:'رعاية متخصصة للمواليد الخدّج وحديثي الولادة.',f:['17 حاضنة','95% رضا المرضى']},
 {id:'obgyn',n:'النسائية والتوليد',c:'mom',img:'7e302701-23d7-4b51-b985-5eba4f634cdb.jpg',d:'متابعة الحمل والولادة وأمراض النساء.',f:[]},
 {id:'dialysis',n:'غسيل الكلى',c:'chronic',img:'623c89fb-9a4f-4a33-a2b4-72e3285abe1f.jpg',d:'جلسات غسيل كلى منتظمة لمرضى الفشل الكلوي.',f:['17 جهاز غسيل','نحو 800 جلسة شهرياً']},
 {id:'chemo',n:'العلاج الكيماوي',c:'chronic',img:'657cc552-ea62-458b-bb15-66fe9ccc8254.jpg',d:'ضمن وحدة أمراض الدم والأورام: خزعات نخاع العظم، ونقل مكونات الدم، والعلاج الكيماوي.',f:[]},
 {id:'litho',n:'تفتيت الحصى',c:'surg',img:'50f0b21d-f36b-465e-a30c-486a5b0203c2.jpg',d:'تفتيت حصى الكلى والمسالك البولية.',f:[]},
 {id:'laser',n:'الليزر وتصحيح النظر',c:'surg',img:'6ef997eb-5142-4bab-a3bf-a895e2ea9e36.jpg',d:'إجراءات تصحيح النظر بالليزر.',f:[]},
 {id:'uro',n:'المسالك البولية',c:'med',img:'b2af5463-92fb-4aa0-9ea1-e90cae522acd.jpg',d:'تشخيص أمراض الجهاز البولي وعلاجها.',f:['أول عملية زراعة كلى في القطاع الخاص (1983)']},
 {id:'neuro',n:'الأعصاب',c:'med',img:'7289c1bd-8d23-4a4d-baf7-7028779284de.jpg',d:'تشخيص أمراض الجهاز العصبي وعلاجها.',f:[]},
 {id:'internal',n:'الباطنية',c:'med',img:'909e750b-8035-4e57-9578-a681d45050b4.jpg',d:'رعاية الأمراض الباطنية والمزمنة للبالغين.',f:[]},
 {id:'chest',n:'الأمراض الصدرية',c:'med',img:'dc579a73-b4ec-48e1-9b6e-88bcad75dd5b.jpg',d:'تشخيص أمراض الجهاز التنفسي وعلاجها.',f:[]},
 {id:'ent',n:'الأنف والأذن والحنجرة',c:'med',img:'ea5961d1-8d81-4d1f-a552-a8fa313d8e52.jpg',d:'تشخيص وعلاج أمراض الأنف والأذن والحنجرة.',f:[]},
 {id:'dental',n:'الأسنان',c:'med',img:'b28e7ec9-ef63-4b71-976a-afcd417806f7.jpg',d:'علاج الأسنان وتجميلها.',f:[]},
 {id:'psych',n:'الطب النفسي',c:'med',img:'10f99864-0384-4e39-b43d-31fabeca7e1a.jpg',d:'الرعاية النفسية للبالغين.',f:[]},
 {id:'pharmacy',n:'الصيدلية',c:'svc',img:'a6cbce13-5186-4b29-bfdb-8fb8c9a5fcb4.jpg',d:'صرف الأدوية للمرضى المنوّمين والمراجعين.',f:[]},
 {id:'physio',n:'العلاج الطبيعي',c:'svc',img:'4672d76f-2d9c-4e9d-afef-af8a89200b5b.jpg',d:'إعادة التأهيل والعلاج الطبيعي.',f:[]}
];
const rawImg = d => B+'2/0/'+d.img;

const DOCS0 = [['د. علي ابو صيني','14e4a421-83b6-4af3-a93c-c66e34287801.jpg'],['د. هشام حمد','699a477d-337a-4cf3-9551-e674411ed8d8.jpg'],['د. حسن المعايطة','5f0a74b8-e94a-4646-9902-2cd4e443795a.jpg'],['د. صهيب العوايشة','d8a8386b-119c-4f09-9fad-37a78b22fd37.jpg'],['د. غادة عبد الحافظ','cb76a9b0-57b9-4844-b5e6-ee155c8f6d3d.jpg'],['د. وفاء السكجي','b6ccb268-b0ef-403e-b0ff-c5acba480e23'],['د. شذى الجلاد','18441cb0-2b79-4e14-beeb-912931bfce7c.jpg'],['د. عيسى الخطاطبة','0d304c9d-73ea-4c70-8f3c-3bff6385891b.jpg'],['د. سماح الجبور','c7e75c72-1090-4ae4-9bea-8171bef6d0ac.jpg'],['د. أروى الرقب','92d8ebb2-bcdd-4d36-9556-535396a3d5e1.jpg'],['د. أميرة العمري','c929d5e7-b272-4db9-9341-ff6714a6b6c9.jpg'],['د. رقية الطرمان','88b58653-8753-47fd-9e46-f0979e489bb2.jpg'],['د. فادية التركماني','158dace8-da40-4f92-8023-3749a0895d44.jpg'],['د. أيمن عودة','473556c6-100f-4b32-890d-43f498f474be.jpg'],['د. زكريا القاقا','6b130290-88a0-4862-a04e-502b46d3eac2.jpg'],['د. شادي الخرابشة','f9026626-1f10-4b24-ba41-b96b0c06035b.jpg'],['د. محمد الحوراني','30193cf3-4795-4ce7-9f3a-baffdff0d002.jpg'],['د. تغريد الشيخ','53ca17e9-f3b1-4779-983c-1c84f1825071.jpg'],['د. ابراهيم رمزون','76a9c858-f922-41a6-8847-6f01e44de64f.jpg'],['د. حمزة فراج','972d35a0-87e9-45dd-a324-91f13a527eda.jpg'],['د. هناء حطاب','79cb8f70-a125-4989-b69b-74ddba1daf44.jpg'],['د. علاء الفروخ','7a771701-18a3-4b8c-8092-80e954f5166c.jpg'],['د. أسامة ابو عطا','9739a758-c0a3-42d6-8174-145931efea2d.jpg'],['د. محمد فؤاد الموسى','14ac18da-1a50-48eb-abe7-14b23082efbd.jpg'],['د. نهلة نجم','0cb89807-1ca6-411c-8dcb-5d868d2eb606.jpg'],['د. سفيان الرعود','d2f96f81-b566-457d-bd60-e104fd90423e.jpg'],['د. معن الشوابكة','c24240de-0fde-48a4-8837-64663605dbf8.jpg'],['سلطان السريحين','89a35854-1134-49dd-9157-32cb9df64726.jpg']];

const GAL0 = ['18/Gal/b161c261-2b1f-416e-8972-364b9c7fe093','18/Gal/83166377-77f6-437d-96d2-730c6749698d','18/Gal/0d0c88ab-2421-4dac-8558-d59810aa5d89','19/Gal/cfcb073b-6ff0-40de-9db3-ff0c0974887a','19/Gal/253c4cd0-13ac-4264-9313-17b65a26f964','19/Gal/bc17e30f-d906-4b22-8140-acbd57c0b47d','19/Gal/bfe605c1-a46e-4631-8227-3bed1bde3aeb','19/Gal/6d09122e-1885-40f2-a68d-a822999ded0c','19/Gal/8bd1301b-4f92-40a0-bae1-3581e8078183','19/Gal/5c85502b-b8b7-4277-b62d-7fc4300cfcb7','19/Gal/332f377f-50ef-46d3-8ad7-26f8643a864b','19/Gal/019fc4d2-064b-47c4-be07-547b8571bc18','19/Gal/22f6e73b-827e-46fc-9b40-ae75d31aa1c1','19/Gal/32075f34-6208-4e0f-8823-ebf516e9178a','19/Gal/825b037d-36cc-456e-be2e-0017e4663460','20/Gal/2c82f0de-39cb-45e9-930f-978c02b223d7','20/Gal/3237faaa-85c9-4e9a-bfcd-14839baca6f1','20/Gal/9978f7fd-cd53-414e-8487-eed8f6aab7ee','20/Gal/6731b0d4-f876-4edb-aade-5e729106105f','20/Gal/72239420-2d89-4c7f-b7c7-6569fe56dfed','20/Gal/06ddbbb4-eafc-497a-8249-90f6534c84ee','20/Gal/ffe72cda-8074-4e58-9abe-962173fbffeb','20/Gal/8041b48c-5b01-499e-9b06-4690d2e609c5','20/Gal/41081523-c580-4dab-a141-4dd2a7155ca4'].map(p=>B+'4/'+p+'.jpg');

const ACC = ['155828a3-e742-48ca-8374-b35117a797b7','c0a0d400-b2f1-4f23-b820-331c25839b15','d1fac260-a540-4e0a-80a4-39d74bbd4b91','f92ab95c-0fc8-44c1-a754-371379de9c7a','1f566307-dfcc-4b23-a975-51f1996be460'].map(u=>B+'-1/31/Gal/'+u+'.png');
const INS = ['0a482877-2f1f-4d65-b6bf-efb86849cb92','0c7d291b-82ba-4779-a914-d5c2cda1c61a','37676a82-73ef-4607-96ba-38bad5c9e83f','1c0163f4-53e8-486c-a9d9-425170aada5d','7bf9eef1-185e-4b29-bfb8-5addd72aac36','71ab60f8-e7c7-4f80-990d-ff9e835321ba','42950e77-dea8-401d-adc2-eb90f78eb44d','43b627c5-5ce5-4397-b012-6b4afd593bd9','5c27eb4d-4288-47ff-aea1-f7c8228a856e','33904aaa-6a29-4f67-8aca-5a492d891b75','85bd0b32-366a-40e4-b473-bf6bcb654247','de4221ca-09fd-4666-a7a0-1c22c90aa1df'].map(u=>B+'8/30/Gal/'+u+'.png');

const NEWS0 = [
 {date:'27 آب 2025',iso:'2025-08-27',t:'تقديم طلبات التوظيف',s:'باب التقديم مفتوح عبر نموذج طلب التوظيف الإلكتروني للكوادر الطبية والإدارية.',img:rawImg(DEPTS0[2]),link:'careers.html',cta:'قدّم طلبك'},
 {date:'9 تشرين الثاني 2023',iso:'2023-11-09',t:'وحدة أمراض الدم والأورام',s:'تقدّم الوحدة خزعات نخاع العظم، ونقل مكونات الدم، والعلاج الكيماوي.',img:rawImg(DEPTS0.find(d=>d.id==='chemo')),link:'department.html?id=chemo',cta:'عن القسم'},
 {date:'26 تشرين الأول 2023',iso:'2023-10-26',t:'جهاز الماموغرام الرقمي',s:'تصوير رقمي للثدي يساعد على الكشف المبكر عن الأورام، حين تكون فرص الشفاء أعلى بكثير.',img:rawImg(DEPTS0.find(d=>d.id==='radiology')),link:'department.html?id=radiology',cta:'عن قسم الأشعة'}
];

const STORE='ih-site-data-v1';
const HOME_IDS=['er','cardio','ivf','lab','dialysis','neonatal'];
const DEFAULTS=()=>({
  depts:DEPTS0.map(d=>({...d,img:rawImg(d),f:[...d.f],home:HOME_IDS.includes(d.id)})),
  docs:DOCS0.map(([n,f],i)=>({id:'doc'+i,n,img:B+'3/0/'+f})),
  gal:[...GAL0],
  news:NEWS0.map((n,i)=>({id:'n'+i,t:n.t,s:n.s,iso:n.iso,img:n.img,link:n.link,cta:n.cta})),
  inbox:[]
});
let DATA=null;
try{DATA=JSON.parse(localStorage.getItem(STORE))}catch(e){}
if(!DATA||!Array.isArray(DATA.depts))DATA=DEFAULTS();
DATA.inbox=DATA.inbox||[];
const DEPTS=DATA.depts, DOCS=DATA.docs, GAL=DATA.gal, NEWS=DATA.news;
function saveData(){try{localStorage.setItem(STORE,JSON.stringify(DATA));return true}catch(e){toast('تعذّر الحفظ: مساحة التخزين في المتصفح ممتلئة');return false}}
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=iso=>{if(!iso)return '';try{return new Date(iso+'T12:00:00').toLocaleDateString('ar-JO-u-nu-latn',{day:'numeric',month:'long',year:'numeric'})}catch(e){return iso}};
const newsSorted=()=>NEWS.slice().sort((a,b)=>(b.iso||'').localeCompare(a.iso||''));


const $ = s => document.querySelector(s);
const img = (src,alt='') => `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.classList.add('broken')">`;
const arrow = '<svg class="i"><use href="#i-arrow"/></svg>';

function deptCard(d){return `<a class="dept-card" href="department.html?id=${esc(d.id)}" data-cat="${d.c}" data-name="${esc(d.n)}"><div class="ph">${img(esc(d.img),esc(d.n))}</div><div class="meta"><h3>${esc(d.n)}</h3><span class="tag">${CATS[d.c]||''}</span></div><p>${esc(d.d)}</p></a>`}

// converts links saved in the older single-page format (#careers, #dept/er) to page URLs
function fixLink(l){if(!l)return l;let m=l.match(/^#dept\/(.+)$/);if(m)return 'department.html?id='+m[1];m=l.match(/^#(home|about|news|departments|gallery|careers|contact)(?:\/(.+))?$/);if(m)return (m[1]==='home'?'index':m[1])+'.html'+(m[2]?'#'+m[2]:'');return l}
const Q=s=>document.querySelector(s)||{};
function toast(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),3000)}
