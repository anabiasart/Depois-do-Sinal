// quarto-e-decoracao | v0.14
/* v0.11 — Refúgio de Bellmont */
const roomArt11=ASSETS14[378];
Object.assign(art10.cg,{"soren": ASSETS14[379], "theo": ASSETS14[380], "ezra": ASSETS14[381], "valentim": ASSETS14[382]});
Object.assign(cgInfo10,{
  soren:['Fora do roteiro','Soren · Livraria'],theo:['Um dia sem placar','Theo · Parque'],ezra:['O que a luz guarda','Ezra · Galeria'],valentim:['Sem plateia','Valentim · Teatro']
});

const roomDecor11={
  lights:['Luzes de fada','Iluminação acolhedora',1],
  flowers:['Flores de Bellmont','Um pequeno detalhe romântico',2],
  frame:['Porta-retrato','Exibe uma CG desbloqueada',2],
  books:['Coleção de lembranças','Exibe os objetos conquistados',3]
};

function roomData11(s=state){
  let r=s.room11;
  if(!r||typeof r!=='object'||Array.isArray(r))r=s.room11={
    
  };
  r.day=Math.max(s.episode||1,Number.isSafeInteger(r.day)?r.day:1);
  if(!['morning','night'].includes(r.time))r.time='night';
  if(!Array.isArray(r.decor))r.decor=['lights'];
  if(!Array.isArray(r.entries))r.entries=[];
  if(typeof r.rain!=='boolean')r.rain=true;
  if(typeof r.cinema!=='boolean')r.cinema=true;
  if(typeof r.typing!=='boolean')r.typing=true;
  return r
}

function recoverCG11(s){
  const d=cityData10(s);
  for(const [id,c] of Object.entries(city10)){
    if(!c.who||!art10.cg[c.who]||!d.done.includes('date:'+id)||d.cg.includes(c.who))continue;
    if((s.log||[]).some(x=>x.who===c.who&&x.choice===dates10[id].opts[0][0]))d.cg.push(c.who)
  }
  
}

const normalize11base=normalize;normalize=function(s){normalize11base(s);roomData11(s);recoverCG11(s);return s};
// Reuse decoded city/room media instead of inserting repeated megabytes into HTML.
function asset11(key,data){return mediaURL14(data)}
img10=function(type,id,cl=''){let d=art10[type]?.[id];return d?`<img class="${cl}" src="${asset11(type+':'+id,d)}" alt="${esc(type==='city'?city10[id]?.kind||'Bellmont':'Ilustração de Bellmont')}" loading="${cl==='stagebg10'||cl==='cgfull10'?'eager':'lazy'}" decoding="async">`:''};
const bg11base=bg;bg=function(id){if(id!=='bedroom')return bg11base(id);return `<svg class="bg anime-bg" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="${asset11('room',roomArt11)}" width="960" height="540" preserveAspectRatio="xMidYMid slice"/></svg>`};
function roomButton11(action,label,icon,x,y){return `<button class="roomHot11" style="--x:${x}%;--y:${y}%" data-act="${action}"><span aria-hidden="true">${icon}</span>${label}</button>`}
function roomPanel11(){if(!state)return;const r=roomData11(),d=cityData10(),isNight=r.time==='night',frame=r.decor.includes('frame')&&d.cg.length?d.cg.at(-1):null;modalType='room11';showPanel('Meu refúgio • Bellmont',`<div class="room11 ${isNight?'night11':'morning11'} ${r.cinema?'motion11':''}"><div class="roomHeader11"><div><small>DEPOIS DO SINAL / MEU QUARTO</small><h3>Um lugar só meu.</h3></div><div class="roomDay11">Dia ${r.day} · ${isNight?'☾ Noite':'☀ Manhã'}<small>Episódio ${String(state.episode).padStart(2,'0')}</small></div></div><div class="roomStage11 ${r.decor.includes('lights')?'lights11':''}"><img src="${asset11('room',roomArt11)}" alt="Quarto da protagonista com escrivaninha, cama, estante e armário" decoding="async">${r.rain&&r.cinema?'<div class="rain11" aria-hidden="true"></div>':''}${r.decor.includes('flowers')?'<div class="flower11" aria-label="Flores decorativas">✿</div>':''}${frame?`<div class="roomFrame11">${img10('cg',frame)}</div>`:''}${r.decor.includes('books')?'<div class="bookStack11" aria-label="Coleção de lembranças"><i></i><i></i><i></i></div>':''}${roomButton11('roomDiary11','Diário','✎',17,66)}${roomButton11('roomPhone11','BellPhone','▣',34,50)}${roomButton11('roomGallery11','Lembranças','♡',65,22)}${roomButton11('roomRest11',isNight?'Dormir':'Anoitecer','☾',61,63)}${roomButton11('roomWard11','Armário','♙',91,47)}${roomButton11('roomDecor11','Decorar','✦',82,72)}</div><div class="roomActions11"><button class="soft" data-act="roomDiary11">Diário</button><button class="soft" data-act="roomPhone11">Celular</button><button class="soft" data-act="roomWard11">Armário</button><button class="soft" data-act="roomGallery11">Fotos e CGs</button><button class="soft" data-act="roomItems11">Presentes</button><button class="soft" data-act="roomDecor11">Decoração</button><button class="primary" data-act="roomRest11">${isNight?'Dormir e começar outro dia':'Encerrar a tarde'}</button></div><div class="roomGrid11"><section><h4>Uma página antes de dormir</h4><textarea id="roomNote11" maxlength="700" placeholder="O que ficou de hoje?">${esc(r.entries.find(x=>x.day===r.day)?.text||'')}</textarea><button class="soft" data-act="roomNoteSave11">Guardar no diário do quarto</button>${r.entries.length?`<details><summary>Páginas anteriores (${r.entries.length})</summary>${r.entries.slice().reverse().map(x=>`<p><b>Dia ${x.day}</b> — ${esc(x.text)}</p>`).join('')}</details>`:''}</section><section><h4>Atmosfera</h4><div class="roomToggles11">${[['rain','Chuva na janela'],['cinema','Efeitos cinematográficos'],['typing','Texto gradual']].map(([k,n])=>`<button class="soft" data-act="roomToggle11" data-id="${k}" aria-pressed="${r[k]}">${n} · ${r[k]?'Ligado':'Desligado'}</button>`).join('')}<button class="soft" data-act="roomSound11">♫ Trilha ambiente</button></div><p>Descansar muda o dia livre e o horário da cidade; não pula cenas da história.</p><button class="soft" data-act="city10">Explorar cidade</button><button class="soft" data-act="close">Voltar à história</button></section></div></div>`);document.querySelector('#modal .panel')?.classList.add('roomPanel11')}
function roomDecorPanel11(){const r=roomData11();modalType='room11';showPanel('Decoração do quarto',`<div class="room11"><p>Desbloqueie decoração avançando na história. Não há gasto de BellCoins.</p><div class="roomDecorGrid11">${Object.entries(roomDecor11).map(([id,[n,desc,ep]])=>`<article><b>${n}</b><p>${desc}</p><button class="soft" data-act="roomEquip11" data-id="${id}" aria-pressed="${r.decor.includes(id)}" ${state.episode<ep?'disabled':''}>${state.episode<ep?'Episódio '+ep:r.decor.includes(id)?'Retirar':'Equipar'}</button></article>`).join('')}</div><button class="primary" data-act="room11">Voltar ao quarto</button></div>`)}
function roomItemsPanel11(){modalType='room11';showPanel('Caixa de lembranças',`<div class="room11"><h3>Pequenos pedaços de Bellmont</h3>${state.items.length?`<div class="roomDecorGrid11">${state.items.map(x=>`<article>✦ ${esc(x)}</article>`).join('')}</div>`:'<p>Os presentes e objetos da história serão guardados aqui.</p>'}<button class="primary" data-act="room11">Voltar ao quarto</button></div>`)}
function roomRest11(){
  const r=roomData11();
  if(r.time==='morning'){
    r.time='night';
    cityData10().time='Noite';
    persist();
    roomPanel11();
    return
  }
  const old=r.day;
  r.day++;
  r.time='morning';
  cityData10().time='Tarde';
  persist();
  roomPanel11();
  toast('Dia '+r.day+' • Um novo começo.');
  
}

const gallery11base=gallery10;gallery10=function(){recoverCG11(state);gallery11base();const p=document.querySelector('#modal .city10>p');if(p)p.textContent='Coleção com seis momentos românticos e uma lembrança coletiva. As quatro novas artes são recortes de ilustrações conceituais e têm resolução reduzida.';document.querySelector('#modal .city10')?.insertAdjacentHTML('beforeend','<button class="soft" data-act="room11">Voltar ao quarto</button>')};
const modal11base=modal;modal=function(t){if(t==='room11')return roomPanel11();modal11base(t);if(t==='gallery'&&state){const p=document.querySelector('#modal .panel');const b=[...p?.querySelectorAll('.event9 b')||[]].find(x=>x.textContent.startsWith('Momentos da cidade'));if(b)b.textContent='Momentos da cidade · '+cityData10().cg.length+'/7 ilustrações'}};
