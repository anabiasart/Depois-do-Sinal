// bellfeed-dinamico | v0.14
const routinePosts13={
  dante:['Discos antigos, som novo.','A melhor parte de procurar um disco é encontrar o que você não estava procurando.'],
  soren:['Uma pausa entre capítulos.','Hoje, a lista de tarefas pode esperar alguns minutos.'],
  theo:['Um pouco de ar fresco.','O parque devia contar como atividade extracurricular.'],
  ezra:['Estudo de luz e sombra.','O detalhe mais bonito costuma passar despercebido.'],
  valentim:['Antes de abrir as cortinas.','O silêncio do teatro antes de um ensaio tem algo especial.'],
  raven:['Notas de uma tarde qualquer.','Toda boa história começa com uma observação.']
};

const warmReply13={
  dante:'Você tem um talento irritante para me fazer sorrir.',
  soren:'Sua opinião sempre me faz pensar um pouco mais.',
  theo:'Quando você aparece por aqui, meu dia melhora.',
  ezra:'Que bom que você reparou. Gosto de dividir esses detalhes com você.',
  valentim:'Confesso que esperava ler seu comentário.',
  raven:'Gosto quando você aparece nas entrelinhas dos meus dias.'
};

const socialReply13={
  dante:'Tá, esse comentário merece uma resposta. Boa.',
  soren:'Obrigado pela observação. Vou guardar isso.',
  theo:'KKKK adorei que você comentou!',
  ezra:'Gostei de ler sua perspectiva.',
  valentim:'Uma participação muito bem-vinda.',
  raven:'Comentário registrado. Sem direito a manchete… por enquanto.',
  mabel:'AMIGA, adorei!',
  iris:'Isso rende uma boa teoria.',
  scarlett:'Obrigada pelo comentário.',
  cecilia:'Agradeço a participação.'
};

const publicComments13={
  dante:[['raven','Moreau sendo quase poético. Acontecimento histórico.'],['theo','Quero ouvir depois!']],
  soren:[['dante','Uma pausa? Alguém avisa a comissão.'],['cecilia','Aprovado, com moderação.']],
  theo:[['mabel','Você e suas ideias mirabolantes.'],['dante','Não inventa de organizar uma competição.']],
  ezra:[['iris','Parece cena de filme.'],['raven','Você tem um olhar interessante.']],
  valentim:[['raven','Finalmente um ensaio sem discurso de abertura.'],['theo','Boa sorte no palco!']],
  raven:[['dante','Espero que não seja sobre mim.'],['mabel','Quero ler tudo!']],
  mabel:[['iris','Tenho uma teoria.'],['theo','Isso promete.']]
};

function social13(s=state){
  let d=s.social13;
  if(!d||typeof d!=='object'||Array.isArray(d))d=s.social13={
    
  };
  for(const k of ['posts','stories','seen','made'])if(!Array.isArray(d[k]))d[k]=[];
  if(!d.replies||typeof d.replies!=='object'||Array.isArray(d.replies))d.replies={
    
  };
  if(!Number.isSafeInteger(d.serial))d.serial=0;
  if(!Number.isSafeInteger(d.highTick))d.highTick=-1;
  return d
}

function normalizeFeed(s) {
    social13(s);
}
function tick13(){return (roomData11().day-1)*3+phases12.indexOf(world12().phase)}
function addPost13(d,p){
  if(d.made.includes(p.id))return false;
  d.made.push(p.id);
  d.posts.push({
    ...p,seq:++d.serial
  });
  const routines=d.posts.filter(x=>x.kind==='routine');
  if(routines.length>90){
    const drop=new Set(routines.slice(0,routines.length-90).map(x=>x.id));
    d.posts=d.posts.filter(x=>!drop.has(x.id));
    d.made=d.made.filter(x=>!drop.has(x));
    for(const id of drop)delete d.replies[id];
    const bp=data90();
    bp.likes=bp.likes.filter(x=>!drop.has(x));
    for(const id of drop)delete bp.comments[id];
    
  }
  return true
}

function syncSocial13(){if(!state)return false;const d=social13(),day=roomData11().day,phase=world12().phase,tick=tick13();let changed=false;const migrated=!d.started;d.started=true;const eligible=people12.filter(id=>profileKnown(id)&&! (mem12(id).spaceUntil>=day));
 // Reconcile event completion from the existing save, without revealing private choices.
 for(const item of cityData10().done){const [type,k]=item.split(':');const c=type==='date'?city10[k]:groups10[k];if(!c)continue;let who=type==='date'?c.who:c.cast[0];let loc=type==='date'?k:c.loc;if(!who)continue;changed=addPost13(d,{id:'event13:'+item,who,day:migrated?null:day,phase:migrated?'':phase,loc,kind:'event',text:type==='group'?`Uma tarde de Bellmont que merece entrar para a memória: ${c.title}.`:`Uma pausa na rotina em ${city10[loc].name}. Às vezes, é bom mudar de cenário.`,likes:5,comments:publicComments13[who]||[]})||changed}
 // One new routine post & story per advancing game time; changing a clock backwards never regenerates posts.
 if(tick>d.highTick||tick===d.highTick&&!d.made.includes('routine13:'+tick)&&eligible.length){
  d.highTick=tick;
  changed=true;
  const present=eligible.filter(id=>city10[when12(id)]&&unlocked13(when12(id)));
  const pool=present.length?present:eligible;
  const who=pool.length?pool[(day+phases12.indexOf(phase))%pool.length]:null;
  if(who){
    let loc=when12(who),
    text=routinePosts13[who][(day+phases12.indexOf(phase))%2];
    let weather=weather12();
    if(weather==='Chuva')text+=' A chuva mudou o ritmo do dia.';
    if(weather==='Neve')text+=' Bellmont ficou branca hoje.';
    const id='routine13:'+tick;
    changed=addPost13(d,{
      id,who,day,phase,loc:city10[loc]?loc:null,kind:'routine',text,likes:3+(day%5),comments:publicComments13[who]||[]
    })||changed;
    d.stories.push({
      id:'story13:'+tick,who,day,tick,loc:city10[loc]?loc:null,text:routinePosts13[who][0]+' '+(city10[loc]?'Hoje em '+city10[loc].name+'.':weather+'.')
    })
  }
  d.stories=d.stories.filter(x=>x.tick+3>tick).slice(-6);
  d.seen=d.seen.filter(id=>d.stories.some(x=>x.id===id));
  
}

 return changed}

const render13=render;render=function(){if(state&&screen==='game'&&syncSocial13())persistMemoryStage();render13()};
let feedFilter13='all',storyOpen13=null,feedLimit13=12,compose13=null;
function feedPosts13(){
  const d=social13(),
  v=closet9(state);
  let old=feed90.map((p,i)=>({
    id:'npc'+i,who:p[0],day:p[1],kind:'archive',text:p[2],likes:2+i%4,comments:[],seq:-100+i
  })).filter(p=>p.day<=state.episode&&known90(p.who));
  let photos=v.posts.map((p,i)=>({
    id:'look'+i,who:'me',day:p.day13||null,phase:p.phase13||'',kind:'look',text:p.caption||'Meu look de Bellmont ♡',photo:v.photos[p.photo],likes:p.likes||0,comments:p.comments||[],seq:p.seq13||-50+i
  }));
  return [...old,...photos,...d.posts].sort((a,b)=>b.seq-a.seq)
}

function storyList13(){const d=social13(),now=Math.max(tick13(),d.highTick);return d.stories.filter(x=>x.tick<=now&&x.tick+3>now)}
function feedCommentHTML13(p){const d=social13(),old=data90().comments[p.id];let html=(p.comments||[]).map(c=>Array.isArray(c)?`<p class="bpcomment"><b>${esc(name90(c[0]))}</b> ${esc(c[1])}</p>`:`<p class="bpcomment">${esc(String(c))}</p>`).join('');if(old)html+=`<p class="bpcomment"><b>Você</b> ${esc(old)}</p>`;html+=(d.replies[p.id]||[]).map(x=>`<p class="bpcomment"><b>Você</b> ${esc(x.text)}</p>${x.reply?`<p class="bpcomment"><b>${esc(name90(p.who==='me'?'mabel':p.who))}</b> ${esc(x.reply)}</p>`:''}`).join('');return html}
// Renderiza a foto original, mantendo as camadas do look e a proporção nativa.
function feedPhoto13(photo, album = false) {
    if (!photo?.look) return '';
    const bg = ['rose','night','garden'].includes(photo.bg) ? photo.bg : 'rose';
    const art = art9(photo.look,true);
    const match = art.match(/viewBox="[^"]*?([0-9.]+)\s+([0-9.]+)"/);
    const width = Number(match?.[1]) || 434;
    const height = Number(match?.[2]) || 724;
    // O SVG conserva as máscaras de cabelo, olhos, pele e acessórios.
    return `<div class="bpfeedart feedphoto13 ${album?'feedphoto-album13':''} bg9-${bg}"
        style="--photo-width:${width}px;--photo-height:${height}px;--photo-ratio:${width}/${height}">${art}</div>`;
}

// Fotografias do feed são independentes das miniaturas do mapa.
// Registre aqui os arquivos HD já disponíveis (chaves: city:cafe, city:records, npc1...).
const feedPhotography13 = {};
const feedSchoolPhotos13 = {npc1:'music',npc2:'hall',npc3:'gym',npc4:'library'};

function feedMedia13(p) {
    if (p.photo) return '<button type="button" class="feed-open13" data-feed-open aria-label="Ampliar foto do visual">'+feedPhoto13(p.photo)+'</button>';
    const key = p.loc ? 'city:'+p.loc : p.id;
    const hd = feedPhotography13[key];
    const school = feedSchoolPhotos13[p.id];
    if (hd || school && schoolArt[school]) {
        const src = hd || mediaURL14(schoolArt[school],'image/webp');
        const alt = hd && p.loc ? city10[p.loc]?.name || 'Bellmont' : 'Registro de Bellmont';
        return `<button type="button" class="feed-open13" data-feed-open aria-label="Ampliar fotografia"><img class="feed-image13" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"></button>`;
    }
    if (p.loc && art10.city[p.loc]) {
        return `<div class="feed-location13">${img10('city',p.loc)}<div><small>LOCAL EM BELLMONT</small><b>${esc(city10[p.loc]?.name || 'Bellmont')}</b></div></div>`;
    }
    return '';
}

// Visualização ampliada sem fechar ou recriar o BellPhone.
function openFeedPhoto13(button) {
    const viewer = document.querySelector('#feedviewer13');
    const media = button.querySelector('img,.feedphoto13');
    if (!viewer || !media) return;
    const copy = media.cloneNode(true);
    copy.removeAttribute('loading');
    viewer.querySelector('.feedviewer-media13').replaceChildren(copy);
    viewer.showModal();
}
document.addEventListener('click', e => {
    const open = e.target.closest?.('[data-feed-open]');
    if (open) { e.stopImmediatePropagation(); openFeedPhoto13(open); return; }
    const viewer = document.querySelector('#feedviewer13[open]');
    if (viewer && (e.target === viewer || e.target.closest?.('[data-feed-close]'))) {
        e.stopImmediatePropagation();
        viewer.close();
    }
}, true);
document.addEventListener('keydown', e => {
    const viewer = document.querySelector('#feedviewer13[open]');
    if (viewer && e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        viewer.close();
    }
}, true);

function postHTML13(p){const d=data90(),liked=d.likes.includes(p.id);return `<article class="bppost feed13post"><div class="bpthreadhead">${face90(p.who)}<div><b>${p.who==='me'?esc(state.name):esc(name90(p.who))}</b><small>${p.kind==='archive'?'Arquivo · episódio '+p.day:p.day?'Dia '+p.day+' · '+esc(p.phase||''):'Registro anterior'}</small></div><span class="feed13meta">${({event:'MOMENTO',routine:'COTIDIANO',look:'ATELIÊ',archive:'ARQUIVO',text:'MURAL'})[p.kind]||'MURAL'}</span></div><p>${esc(p.text)}</p>${feedMedia13(p)}<div class="bpactions"><button class="bpbutton" data-act="feedlike13" data-id="${esc(p.id)}" aria-pressed="${liked}">${liked?'♥':'♡'} ${p.likes+(liked?1:0)}</button><button class="bpbutton" data-act="feedcomment13" data-id="${esc(p.id)}">Comentar</button>${p.loc&&unlocked13(p.loc)?`<button class="bpbutton" data-act="feedplace13" data-id="${p.loc}">Ver local ↗</button>`:''}</div>${feedCommentHTML13(p)}${compose13===p.id?`<div class="feedcomposer13"><textarea id="feedcomment13" maxlength="180" placeholder="Escreva um comentário"></textarea><div class="bpactions"><button class="bpbutton" data-act="feedsend13" data-id="${esc(p.id)}">Publicar</button><button class="bpbutton" data-act="feedcancel13">Cancelar</button></div></div>`:''}</article>`}
feedPanel90=function(){if(syncSocial13())persistMemoryStage();const d=social13(),stories=storyList13(),p=stories.find(x=>x.id===storyOpen13),all=feedPosts13(),filtered=all.filter(x=>feedFilter13==='all'||feedFilter13==='events'&&x.kind==='event'||feedFilter13==='mine'&&x.who==='me'||feedFilter13==='routine'&&x.kind==='routine');return `<div class="bpsection feed13"><div class="feed13hero"><div><h3>BellFeed</h3><p>O cotidiano de Bellmont · Dia ${roomData11().day}</p></div><div class="bpactions"><button class="bpbutton" data-act="feedwrite13">Publicar</button><button class="bpbutton" data-act="bp90publish">Meu visual</button></div></div><div class="stories13" aria-label="Stories temporários">${stories.map(x=>`<button class="story13" data-act="story13" data-id="${x.id}" data-seen="${d.seen.includes(x.id)}">${face90(x.who)}<span>${esc(name90(x.who))}</span></button>`).join('')||'<p class="bpmuted">Nenhum story ativo. Conheça personagens e avance o dia.</p>'}</div>${p?`<div class="storyview13"><div class="bpthreadhead">${face90(p.who)}<b>${esc(name90(p.who))}</b><button class="bpbutton" data-act="storyclose13">Fechar</button></div>${feedMedia13(p)}<h3>${esc(p.text)}</h3><p class="bpmuted">Story temporário · desaparece após três períodos do jogo.</p>${p.loc?`<button class="bpbutton" data-act="feedplace13" data-id="${p.loc}">Ver no mapa</button>`:''}</div>`:''}${compose13==='new'?`<div class="storyview13 feedcomposer13"><h3>Nova publicação</h3><textarea id="feedtext13" maxlength="240" placeholder="O que ficou de hoje?"></textarea><div class="bpactions"><button class="bpbutton" data-act="feedpost13">Publicar</button><button class="bpbutton" data-act="feedcancel13">Cancelar</button></div></div>`:''}<div class="feed13tabs">${Object.entries({all:'Para você',routine:'Cotidiano',events:'Momentos',mine:'Minhas publicações'}).map(([id,t])=>`<button class="bpbutton" data-act="feedfilter13" data-id="${id}" aria-pressed="${feedFilter13===id}">${t}</button>`).join('')}</div>${filtered.slice(0,feedLimit13).map(postHTML13).join('')||'<p class="bpmuted">Nenhuma publicação neste filtro.</p>'}${filtered.length>feedLimit13?'<button class="bpbutton" data-act="feedmore13">Ver publicações anteriores</button>':''}<dialog id="feedviewer13" class="feedviewer13" aria-label="Fotografia ampliada"><div class="feedviewer-head13"><b>Fotografia</b><button type="button" class="bpbutton" data-feed-close>Fechar ×</button></div><div class="feedviewer-media13"></div></dialog></div>`};
const pub13=publish90;publish90=function(i){const v=closet9(state),n=v.posts.length;pub13(i);if(v.posts.length>n){const d=social13();const p=v.posts.at(-1);p.day13=roomData11().day;p.phase13=world12().phase;p.seq13=++d.serial;p.comments=(p.comments||[]).map(x=>String(x).replace(/: undefined$/,'： Gostei do visual.'));persist();}};
function redrawFeed13(){
  const el=document.querySelector('.bpcontent'),
  scroll=el?.scrollTop||0;
  phone7();
  const next=document.querySelector('.bpcontent');
  if(next)next.scrollTop=scroll
}

const phone13base=phone7;
phone7=function(){
  phone13base();
  const el=document.querySelector('.bpstatus');
  if(el&&state){
    const spans=el.querySelectorAll('span');
    if(spans.length>1)spans[spans.length-1].textContent='Dia '+roomData11().day+' · '+world12().phase;
    
  }
  
};

const cover13=cover;cover=function(){return cover13().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.13 • Bellmont Vivo')};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||b.disabled||!state)return;const a=b.dataset.act,id=b.dataset.id;if(!['mappick13','mapfilter13','feedfilter13','feedlike13','feedcomment13','feedsend13','feedcancel13','feedwrite13','feedpost13','feedmore13','story13','storyclose13','feedplace13'].includes(a))return;e.stopImmediatePropagation();if(a==='mappick13')return pickMap13(id);if(a==='mapfilter13'){
    if(!['all','open','here','visited'].includes(id))return;mapFilter13=id;return cityPanel10()
  }
  if(a==='feedplace13'){
    if(!unlocked13(id))return;selectedMap13=id;mapFilter13='all';return cityPanel10()
  }
  const d=social13();const p=feedPosts13().find(x=>x.id===id);switch(a){
    case'feedfilter13':if(['all','routine','events','mine'].includes(id)){
      feedFilter13=id;feedLimit13=12;compose13=null
    }
    break;case'feedmore13':feedLimit13+=12;break;case'feedlike13':if(!p)return;{
      let likes=data90().likes;data90().likes=likes.includes(id)?likes.filter(x=>x!==id):[...likes,id]
    }
    break;case'feedcomment13':if(!p)return;compose13=id;break;case'feedcancel13':compose13=null;break;case'feedwrite13':compose13='new';break;case'feedpost13':{
      let t=document.getElementById('feedtext13')?.value.trim().slice(0,240);if(!t)return toast('Escreva algo primeiro.');if(d.posts.filter(x=>x.who==='me').length>=30)return toast('Limite de 30 publicações de texto.');let comments=[['mabel','Adorei ler isso!']];const close=people12.filter(x=>profileKnown(x)&&(state.trust[x]||0)>=10&&!(mem12(x).spaceUntil>=roomData11().day)).sort((a,b)=>(state.trust[b]||0)-(state.trust[a]||0)).slice(0,2);for(const who of close)comments.push([who,warmReply13[who]]);addPost13(d,{
        id:'mine13:'+String(d.serial+1),who:'me',day:roomData11().day,phase:world12().phase,kind:'text',text:t,likes:1,comments
      });compose13=null;feedFilter13='all';break
    }
    case'feedsend13':{
      if(!p)return;let t=document.getElementById('feedcomment13')?.value.trim().slice(0,180);if(!t)return toast('Escreva um comentário primeiro.');let arr=d.replies[id]||(d.replies[id]=[]);if(arr.length>=6)return toast('Limite de seis comentários por publicação.');arr.push({
        text:t,reply:arr.length===0&&p.who!=='me'?((state.trust[p.who]||0)>=18&&warmReply13[p.who]?warmReply13[p.who]:socialReply13[p.who])||'Obrigada por comentar.':''
      });compose13=null;break
    }
    case'story13':if(!storyList13().some(x=>x.id===id))return;storyOpen13=id;if(!d.seen.includes(id))d.seen.push(id);break;case'storyclose13':storyOpen13=null;break
  }
  persist();redrawFeed13()
},true);
