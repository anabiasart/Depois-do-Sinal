// agenda-e-encontros-cotidianos | v0.14
let monthOffset12=0,selectedDay12=null;
function calendar12(){modalType='world12';let day=roomData11().day,d=date12(),month=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+monthOffset12,1)),n=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth()+1,0)).getUTCDate(),first=month.getUTCDay(),pick=selectedDay12??day;const grid=weekdays12.map(x=>`<span>${x}</span>`).join('')+Array.from({length:first},()=>'<span></span>').join('')+Array.from({length:n},(_,i)=>{let j=Math.round((Date.UTC(month.getUTCFullYear(),month.getUTCMonth(),i+1)-epoch12)/dayMs12)+1;return `<button class="soft day12 ${j===day?'today12':''}" data-act="calpick12" data-i="${j}" ${j<1?'disabled':''} aria-pressed="${j===pick}">${i+1}</button>`}).join('');showPanel('Agenda de Bellmont',`<div class="world12"><div class="worldhero12"><small>CALENDÁRIO / VIDA LIVRE</small><h3>${esc(status12(day))}</h3><p>Dia ${day} · ${world12().phase}. O tempo livre não pula episódios nem altera escolhas.</p>${phaseButtons12()}<button class="primary" data-act="advance12">Avançar horário ›</button></div><div class="calLayout12"><section><div class="calTitle12"><button class="soft" data-act="month12" data-i="-1">‹</button><b>${new Intl.DateTimeFormat('pt-BR',{month:'long',year:'numeric',timeZone:'UTC'}).format(month)}</b><button class="soft" data-act="month12" data-i="1">›</button></div><div class="calGrid12">${grid}</div><p class="hint">Selecione uma data para consultar a programação, sem viajar no tempo.</p></section><section><h3>${esc(status12(pick))}</h3>${routineRows12(pick)}</section></div><button class="primary" data-act="living16">Vida em Bellmont</button> <button class="soft" data-act="city10">Explorar cidade</button> <button class="soft" data-act="room11">Meu quarto</button></div>`);document.querySelector('#modal .panel')?.classList.add('worldPanel12')}
function phaseButtons12(){return `<div class="phase12">${phases12.map(p=>`<button class="soft" data-act="phase12" data-id="${p}" aria-pressed="${world12().phase===p}">${p}</button>`).join('')}</div>`}
function routineRows12(day=roomData11().day){return `<div class="routine12">${people12.map(id=>`<article><div class="routineFace12">${sprite(id)}</div><div><b>${name90(id)}</b><small>${phases12.map(p=>`${p}: ${place12(when12(id,day,p))}`).join(' · ')}</small>${day===roomData11().day&&profileKnown(id)?`<small>${emotional12(id)}</small>`:''}</div></article>`).join('')}</div>`}
const cityBase12=cityPanel10;cityPanel10=function(){cityBase12();let p=document.querySelector('#modal .city10'),time=p?.querySelector('.citytime10');if(!p||!time)return;time.innerHTML=`<span>Dia ${roomData11().day} · ${esc(status12())}</span>${phaseButtons12()}<button class="soft" data-act="advance12">Avançar horário ›</button><button class="soft" data-act="calendar12">Agenda</button>`;p.querySelectorAll('.citycard10').forEach(b=>{let id=b.dataset.id,c=city10[id];if(!c?.who||state.episode<c.day)return;let span=b.querySelector('div>span');if(span)span.textContent=cityData10().done.includes('date:'+id)?'♡ Encontro concluído':when12(c.who)===id?name90(c.who)+' · '+(profileKnown(c.who)?'Por aqui':'Ainda não conhece'):'Agora: '+place12(when12(c.who));});p.insertAdjacentHTML('beforeend',`<details class="routineDetails12"><summary>Rotina dos personagens hoje</summary>${routineRows12()}</details>`)};
const visitBase12=visit10;visit10=function(k){visitBase12(k);let c=city10[k];if(!c?.who)return;let p=document.querySelector('#modal .city10');if(!p)return;const id=c.who,here=when12(id)===k,done=world12().routineDone.includes(roomData11().day+':'+id);p.insertAdjacentHTML('beforeend',`<article class="routineExtra12"><b>${here?name90(id)+' está por aqui':name90(id)+' está em outro lugar'}</b><p>${here?'Uma pausa na rotina, independente dos encontros principais.':'Agora: '+esc(place12(when12(id)))+'. Consulte a agenda para saber quando encontrar.'}</p>${here&&profileKnown(id)?`<button class="soft" data-act="routine12" data-id="${k}" ${done?'disabled':''}>${done?'Já conversaram hoje':'Conversar um pouco'}</button>`:''}<button class="soft" data-act="calendar12">Consultar agenda</button></article>`)};
let activeRoutine12=null;
function routinePanel12(k){const id=city10[k]?.who,key=roomData11().day+':'+id;if(!id||!profileKnown(id)||when12(id)!==k||world12().routineDone.includes(key))return;activeRoutine12=k;modalType='routine12';let t=routineTalk12[id];let climateLine=weather12()==='Chuva'?' A chuva mudou os planos; podemos ficar em um lugar coberto.':weather12()==='Neve'?' Está nevando. Melhor procurar um canto quente.':season12()==='Outono'?' As folhas estão mudando de cor.':weather12()==='Céu limpo'?' O dia está bonito hoje.':'';showPanel('Um momento inesperado',`<div class="world12"><div class="stage10 climate12">${img10('city',k,'stagebg10')}<div class="actor10 speaking10" style="--slot:50%"><div class="actorart10">${sprite(id,'smile')}</div><span>${name90(id)}</span></div></div><div class="sceneTalk10"><b>${name90(id)}</b><p>${esc(t[0]+climateLine)} ${esc(t[1])}</p><button class="choice" data-act="routineReply12" data-i="0">Quero, vamos aproveitar um pouco.</button><button class="choice" data-act="routineReply12" data-i="1">Hoje não consigo, mas foi bom te encontrar.</button></div><button class="soft" data-act="visit10" data-id="${k}">Voltar</button></div>`)}
function finishRoutine12(i){let k=activeRoutine12,id=city10[k]?.who,key=roomData11().day+':'+id;if(!id||when12(id)!==k||world12().routineDone.includes(key)||![0,1].includes(i))return;world12().routineDone.push(key);let m=mem12(id);m.lastRoutine=roomData11().day;state.aff[id]=(state.aff[id]||0)+(i===0?2:0);state.trust[id]=(state.trust[id]||0)+1;state.log.push({who:id,choice:i===0?'Aceitei passar um tempo em '+city10[k].name:'Preferi conversar em outro momento',aff:i===0?2:0,trust:1});if(i===1)m.spaceUntil=roomData11().day+1;activeRoutine12=null;persist();render();modalType='world12';showPanel(name90(id),`<div class="world12"><p>${esc(i===0?routineTalk12[id][2]:'Tudo bem. A gente se encontra outra hora.')}</p><button class="primary" data-act="visit10" data-id="${k}">Voltar ao local</button></div>`)}
const profile12=showProfile;showProfile=function(id,m='neutral'){profile12(id,m);if(!people12.includes(id)||!profileKnown(id))return;let q=mem12(id);document.querySelector('#modal .panel')?.insertAdjacentHTML('beforeend',`<div class="memory12"><small>MEMÓRIA EMOCIONAL</small><h3>${esc(emotional12(id))}</h3><p>Agora: ${esc(place12(when12(id)))}</p>${q.preference?`<p>Guardou sua preferência: ${esc(q.preference==='nenhuma'?'sem preferência':q.preference)}.</p>`:''}${q.lastChoice?`<p>Última lembrança: “${esc(q.lastChoice)}”.</p>`:''}<button class="soft" data-act="calendar12">Ver rotina</button></div>`)};
function memoryPanel12(){modalType='world12';syncMemory12();showPanel('Memórias que ficam',`<div class="world12"><p>Os personagens lembram de escolhas e preferências que você realmente compartilhou. Respeitar limites não reduz afinidade.</p><div class="memoryGrid12">${people12.filter(profileKnown).map(id=>{let m=mem12(id);return `<article class="memory12"><div class="routineFace12">${sprite(id)}</div><h3>${name90(id)}</h3><b>${esc(emotional12(id))}</b><p>${m.preference?'Preferência lembrada: '+esc(m.preference):'Ainda descobrindo seus gostos.'}</p><p>${m.lastChoice?'“'+esc(m.lastChoice)+'”':'Nenhuma lembrança registrada.'}</p><button class="soft" data-act="profile" data-id="${id}">Ver ficha</button></article>`}).join('')||'<p>Conheça os personagens para começar.</p>'}</div></div>`)}
/* Living Bellmont v0.16 — deterministic daily social encounters, independent of chapter progression. */
const livingEvents16 = [
  {pair:['dante','soren'],title:'Ensaio ou regulamento?',text:'Dante precisa de uma sala para ensaiar. Soren tenta conciliar os horários do festival.',choices:['Propor um horário compartilhado','Incentivar Dante a negociar sozinho','Apenas observar'],trait:'cooperação'},
  {pair:['theo','ezra'],title:'Um retrato fora da quadra',text:'Theo quer uma foto do time, mas Ezra prefere registrar os bastidores.',choices:['Sugerir uma foto coletiva e outra espontânea','Deixar que resolvam a diferença','Apenas observar'],trait:'criatividade'},
  {pair:['valentim','dante'],title:'A trilha do espetáculo',text:'Valentim e Dante discordam sobre a música de uma cena do festival.',choices:['Ajudar a encontrar um meio-termo','Defender a liberdade artística','Apenas observar'],trait:'cooperação'},
  {pair:['soren','ezra'],title:'O mural de Bellmont',text:'Soren quer organizar o mural; Ezra quer deixar espaço para trabalhos espontâneos.',choices:['Reservar espaço para os dois projetos','Sugerir uma exposição livre','Apenas observar'],trait:'criatividade'}
];
function livingData16(s=state){
  if(!object14(s.living16))s.living16={};
  const d=s.living16;
  if(!object14(d.bonds))d.bonds={};
  if(!object14(d.reputation))d.reputation={};
  for(const k of ['cooperação','criatividade','autonomia'])if(!Number.isFinite(d.reputation[k]))d.reputation[k]=0;
  if(!object14(d.resolved))d.resolved={};
  return d;
}
function livingEvent16(day,phase){
  if(!Number.isSafeInteger(day)||day<1||phase!=='Tarde')return null;
  return livingEvents16[(day-1)%livingEvents16.length];
}
function livingBond16(day,pair,d){
  const key=pair.slice().sort().join(':');
  const baseline=Array.from({length:7},(_,i)=>((Math.max(1,day)-1+i)%5===0?1:0)).reduce((a,b)=>a+b,0);
  return Math.max(-20,Math.min(20,baseline+(Number.isFinite(d.bonds[key])?d.bonds[key]:0)));
}
const livingScenes16=[
  {loc:'music',lines:['Preciso ensaiar. Não dá para fazer isso no corredor.','E eu preciso garantir que todos tenham acesso às salas.'],outcomes:['Soren reserva dois horários e Dante aceita dividir a sala.','Dante promete apresentar sua própria proposta.','Os dois retomam a discussão e procuram uma solução sem você.']},
  {loc:'gym',lines:['Uma foto do time seria uma lembrança incrível.','Prefiro fotografar o que acontece quando ninguém está posando.'],outcomes:['Os dois combinam uma foto coletiva e um registro espontâneo.','Theo e Ezra resolvem experimentar ideias diferentes.','Eles seguem conversando sobre o projeto.']},
  {loc:'hall',lines:['A cena precisa de uma música que acompanhe o ritmo do texto.','Se eu seguir cada marcação, a música perde a personalidade.'],outcomes:['Os dois ensaiam uma versão que combina as propostas.','Dante apresenta uma composição livre ao diretor.','Valentim e Dante decidem retomar o ensaio depois.']},
  {loc:'library',lines:['O mural precisa de alguma organização.','E também precisa de espaço para coisas que não estavam previstas.'],outcomes:['Eles dividem o mural em duas seções.','Ezra propõe uma exposição sem tema obrigatório.','Os dois continuam planejando o mural.']}
];
function livingMood16(id,day,d){
  const n=people12.indexOf(id);
  const influence=livingEvents16.filter(e=>e.pair.includes(id)).reduce((sum,e)=>sum+livingBond16(day,e.pair,d),0);
  const moods=[['neutral','Concentrado'],['smile','Animado'],['annoyed','Impaciente'],['sad','Preocupado']];
  return moods[((day+n+Math.round(influence/3))%4+4)%4];
}
function livingScene16(e,day,d,resolved){
  const scene=livingScenes16[livingEvents16.indexOf(e)];
  const choice=d.resolved[String(day)];
  const prior=day-livingEvents16.length;
  const previous=d.resolved[String(prior)];
  const actors=e.pair.map((id,i)=>{const mood=livingMood16(id,day,d);return '<div class="actor10 '+(i===0?'speaking10':'')+'" style="--slot:'+(i===0?'29%':'72%')+'"><div class="actorart10">'+sprite(id,mood[0])+'</div><span>'+esc(name90(id))+' · '+esc(mood[1])+'</span></div>'}).join('');
  return '<div class="stage10 climate12"><div style="position:absolute;inset:0;overflow:hidden">'+bg(scene.loc)+'</div>'+actors+'</div><div class="sceneTalk10">'+(Number.isInteger(previous)&&scene.outcomes[previous]?'<p><small>Último encontro: '+esc(scene.outcomes[previous])+'</small></p>':'')+scene.lines.map((line,i)=>'<p><b>'+esc(name90(e.pair[i]))+':</b> '+esc(line)+'</p>').join('')+(resolved&&scene.outcomes[choice]?'<p><b>Desfecho:</b> '+esc(scene.outcomes[choice])+'</p>':'')+'</div>';
}
function livingPanel16(){
  if(!state)return;
  modalType='living16';
  const d=livingData16(),day=roomData11().day,phase=world12().phase,e=livingEvent16(day,phase),key=String(day);
  const visible=e&&e.pair.every(profileKnown);
  const resolved=Object.prototype.hasOwnProperty.call(d.resolved,key);
  showPanel('Vida em Bellmont',`<div class="world12"><div class="worldhero12"><small>LIVING BELLMONT / EXPERIMENTAL</small><h3>O mundo não espera por você.</h3><p>Dia ${day} · ${esc(phase)}</p></div><h3>Reputação escolar</h3><div class="memoryGrid12">${Object.entries(d.reputation).filter(([k])=>['cooperação','criatividade','autonomia'].includes(k)).map(([k,v])=>`<article class="memory12"><b>${esc(k)}</b><p>${v} pontos</p></article>`).join('')}</div><h3>Acontecimento de hoje</h3>${visible?`<article class="memory12"><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p>${livingScene16(e,day,d,resolved)}${resolved?'<p>Você já acompanhou este acontecimento.</p>':e.choices.map((t,i)=>`<button class="choice" data-act="livingChoice16" data-i="${i}">${esc(t)}</button>`).join('')}</article>`:'<p>Conheça mais personagens e volte durante a tarde para descobrir acontecimentos.</p>'}<h3>Vínculos entre personagens</h3>${livingEvents16.filter(x=>x.pair.every(profileKnown)).map(x=>`<article class="memory12"><b>${x.pair.map(name90).map(esc).join(' e ')}</b><p>Proximidade: ${livingBond16(day,x.pair,d)} · ${livingBond16(day,x.pair,d)>=5?'Parceria fortalecida':livingBond16(day,x.pair,d)<0?'Relação tensa':'Convivência'}</p></article>`).join('')||'<p>Os vínculos aparecem conforme você conhece o elenco.</p>'}<button class="soft" data-act="calendar12">Voltar à agenda</button></div>`);
  document.querySelector('#modal .panel')?.classList.add('worldPanel12');
}
function livingChoice16(i){
  if(!state||![0,1,2].includes(i))return;
  const day=roomData11().day,e=livingEvent16(day,world12().phase),d=livingData16(),key=String(day);
  if(!e||!e.pair.every(profileKnown)||Object.prototype.hasOwnProperty.call(d.resolved,key))return;
  d.resolved[key]=i;
  if(i!==2){
    const trait=i===0?e.trait:'autonomia',bond=e.pair.slice().sort().join(':');
    d.reputation[trait]=Math.min(100,d.reputation[trait]+1);
    d.bonds[bond]=Math.max(-20,Math.min(20,(Number.isFinite(d.bonds[bond])?d.bonds[bond]:0)+(i===0?2:-1)));
  }
  persist();livingPanel16();
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');
  if(!b||b.disabled||!state)return;
  if(b.dataset.act==='living16')livingPanel16();
  if(b.dataset.act==='livingChoice16')livingChoice16(Number(b.dataset.i));
});
