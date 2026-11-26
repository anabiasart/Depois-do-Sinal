// conversas | v0.14
/* v0.9.4 - organized BellPhone conversations */
function data94(){const d=data90();if(!Number.isFinite(d.serial))d.serial=0;if(!Array.isArray(d.archived94))d.archived94=[];return d}
function trustText94(id){
  return ({
    dante:'Tô escolhendo umas músicas pro ensaio. Que tipo de música você gosta?',soren:'Estou organizando a programação. Você prefere planejar tudo ou improvisar?',theo:'Preciso de uma opinião importante: chocolate ou sorvete?',ezra:'Estou pensando numa exposição. Você gosta de fotografias de pessoas ou de paisagens?',valentim:'Uma pergunta: você prefere teatro ou cinema?',raven:'Estou escolhendo o tema da próxima matéria. Você prefere investigar os clubes ou ouvir os alunos?'
  })[id]||'Como foi seu dia?'
}

function affText94(id){
  return ({
    dante:'O ensaio acabou. Tem dias em que só quero ficar longe de todo mundo. Hoje não foi um deles.',soren:'Consegui terminar minhas tarefas cedo. Foi bom conversar com você outro dia.',theo:'Hoje lembrei daquela nossa conversa e comecei a rir sozinho.',ezra:'Vi uma coisa bonita no caminho. Pensei em te contar.',valentim:'Nossa conversa de outro dia foi uma surpresa agradável.',raven:'É raro eu encontrar alguém com quem possa conversar sem ficar pensando na próxima pergunta.'
  })[id]||'Gostei da nossa conversa.'
}

const canReply94=(m,i)=>!m.topic7&&!m.invite90&&!m.invite5&&!state.replied[i]&&!data94().archived94.includes(i);
let chosen94=null,search94='',scroll94=null;
function events94(id){
  let events=[];
  state.messages.forEach((m,i)=>{
    if(m.who!==id)return;const day=m.day94||m.day90||null;const r=state.replied[i];if(!m.topic7)events.push({
      i,m,kind:'in',pos:i,sub:0,day,text:m.text
    });if(r){
      let timed=Number.isFinite(r.after94);const pos=timed?r.after94-.5:i+.25,sub=timed?(r.order94||0)*2:0;events.push({
        i,kind:'out',pos,sub,day:r.day94||day,text:r.text,quote:!m.topic7&&timed&&r.after94>i+1?m.text:''
      });events.push({
        i,kind:'answer',pos,sub:sub+1,day:r.day94||day,text:r.answer
      })
    }
    
  });
  return events.sort((a,b)=>a.pos-b.pos||a.sub-b.sub)
}

function last94(id){return events94(id).at(-1)}
function pendingList94(id){return state.messages.map((m,i)=>({m,i})).filter(({m,i})=>m.who===id&&canReply94(m,i))}
function bubble94(e){const mine=e.kind==='out',d=data94(),m=e.m;let controls='';if(m?.invite90)controls=inviteControls90(m.invite90);else if(m?.invite5){const st=state.e4.invites[m.who];controls=state.node==='e4pick'&&st==='pending'?`<div class="bpactions">${button90('invite5','Aceitar dupla','data-id="'+m.who+'" data-i="1"')}${button90('invite5','Recusar','data-id="'+m.who+'" data-i="0"')}</div>`:pill90(({accepted:'Dupla aceita',declined:'Recusado',closed:'Encerrado'})[st]||'Encerrado')}
return `<div class="message94 ${mine?'own94':''}"><div class="bpbubble ${mine?'bpmine':''}">${e.quote?`<div class="quote94">${esc(e.quote)}</div>`:''}${esc(e.text||'')}${m&&d.stars.includes(e.i)?'<span class="starflag94"> ★</span>':''}</div>${m?`<div class="msgtools94">${button90('bp90star',d.stars.includes(e.i)?'★':'☆',`data-i="${e.i}" aria-label="Favoritar mensagem"`)}${canReply94(m,e.i)?button90('select94','Responder',`data-i="${e.i}"`):''}</div>`:''}${controls}</div>`}
thread90=function(id){const list=events94(id),pending=pendingList94(id),selected=pending.find(x=>x.i===chosen94)||pending[0];let prev=Symbol(),hist='';for(const e of list){if(e.day!==prev){hist+=`<div class="day94">${e.day?'Dia '+e.day:'Histórico anterior'}</div>`;prev=e.day}hist+=bubble94(e)}const topics=(chatTopics7[id]||[]).map((t,i)=>button90('bp90topic',esc(t[0]),`data-id="${id}" data-i="${i}" ${state.phone7.topics[id+':'+i+':'+state.episode]?'disabled':''}`)).join('');return `<div class="thread94"><div class="bpthreadhead">${face90(id)}<div><b>${name90(id)}</b><small>${romance93().includes(id)?stage(id):'Amizade'}</small></div><span class="pending94">${pending.length?pending.length+' para responder':'Em dia'}</span></div><div class="history94" tabindex="0" aria-label="Histórico da conversa">${hist||'<p class="bpmuted">Ainda não há mensagens.</p>'}</div><div class="composer94">${selected?`<div class="composerhead94"><b>Responder a ${name90(id)}</b><span>${pending.findIndex(x=>x.i===selected.i)+1} de ${pending.length}</span></div><div class="quote94">${esc(selected.m.text)}</div><div class="bpchoices">${replies90(id,selected.m).map((o,j)=>button90('bp90reply',esc(o[0]),`data-i="${selected.i}" data-j="${j}"`)).join('')}</div><div class="bpactions">${pending.length>1?button90('next94','Outra mensagem',`data-i="${selected.i}"`):''}${button90('skip94','Deixar sem resposta',`data-i="${selected.i}"`)}</div>`:'<p class="bpmuted">Nenhuma mensagem aguardando resposta.</p>'}${topics?`<details class="topics94"><summary>Puxar assunto</summary><div class="bpactions">${topics}</div></details>`:''}</div></div>`}
chats90=function(){const d=data94(),all=phoneContacts7().slice().sort((a,b)=>{const A=last94(a),B=last94(b);return (B?.pos??-1)-(A?.pos??-1)||(B?.sub??0)-(A?.sub??0)});const ids=all.filter(id=>filter90!=='unread'||unread90(id));const search=search94.toLocaleLowerCase('pt-BR');const list=ids.map(id=>{const x=last94(id),n=unread90(id),q=pendingList94(id).length;return `<button class="bpcontact contact94" data-act="bp90chat" data-id="${id}" data-search="${esc(name90(id).toLocaleLowerCase('pt-BR'))}" aria-pressed="${chat90===id}" ${search&&!name90(id).toLocaleLowerCase('pt-BR').includes(search)?'hidden':''}>${face90(id)}<span><b>${name90(id)}</b><small>${esc((x?.kind==='out'?'Você: ':'')+(x?.text||''))}</small>${q?`<small class="waiting94">${q} para responder</small>`:''}</span>${n?pill90(String(n)):''}</button>`}).join('');return `<div class="bpinbox inbox94"><div class="bpinboxleft"><h3>Conversas</h3><input id="search94" placeholder="Buscar contato" aria-label="Buscar contato" value="${esc(search94)}"><div class="bpactions filters94">${[['all','Todas'],['unread','Não lidas'],['stars','Favoritas']].map(([k,n])=>button90('bp90filter',n,`data-id="${k}" aria-pressed="${filter90===k}"`)).join('')}</div><div class="contacts94">${filter90==='stars'?d.stars.filter(i=>state.messages[i]).map(i=>{let m=state.messages[i];return `<button class="bpcontact" data-act="bp90chat" data-id="${m.who}"><span><b>${name90(m.who)} ★</b><small>${esc(m.text)}</small></span></button>`}).join('')||'<p class="bpmuted">Nenhuma favorita.</p>':list||'<p class="bpmuted">Nenhuma conversa nesta lista.</p>'}${state.episode>=4?button90('bp90chat','♡ Grupo de Bellmont','data-id="group"'):''}</div></div><div class="bpthread">${chat90==='group'?`<div class="thread94 group94"><div class="history94">${group90()}</div></div>`:chat90&&all.includes(chat90)?thread90(chat90):'<div class="bpempty"><span>✉</span><h3>Suas conversas, em ordem.</h3><p>Escolha um contato. As mensagens e as respostas ficam no mesmo histórico.</p></div>'}</div></div>`}
const replies94base=replies90;
replies90=function(id,m){
  if(m.follow90)return replies94base(id,m);
  const txt=(m.text||'').toLowerCase();
  const pick=(a,b,c)=>[[a[0],a[1],2,2,'Carisma'],[b[0],b[1],1,3,'Empatia'],[c[0],c[1],0,1,'Ousadia']];
  if(txt.includes('chocolate ou sorvete'))return pick(['Chocolate, sem dúvida.','Resposta de quem entende das coisas!'],['Sorvete!','Anotado. Agora fiquei com vontade também.'],['Os dois. Por que escolher?','Finalmente uma decisão inteligente.']);
  if(txt.includes('teatro ou cinema'))return pick(['Teatro, gosto de ver tudo ao vivo.','Então talvez eu tenha uma peça para recomendar.'],['Cinema, adoro boas histórias.','Temos isso em comum.'],['Depende da companhia.','Uma resposta interessante.']);
  if(txt.includes('que tipo de música'))return pick(['Rock alternativo.','Bom gosto. Posso te mostrar umas bandas.'],['Gosto de um pouco de tudo.','Justo. Música boa não tem regra.'],['Me mostra a sua favorita.','Vou pensar numa que vale a pena.']);
  if(txt.includes('planejar tudo ou improvisar'))return pick(['Planejar ajuda bastante.','Finalmente alguém que me entende.'],['Um pouco dos dois.','Talvez eu devesse tentar isso.'],['Improvisar é mais divertido.','Previsivelmente imprevisível.']);
  if(txt.includes('pessoas ou de paisagens'))return pick(['Pessoas, cada rosto conta uma história.','Gosto desse jeito de pensar.'],['Paisagens, adoro a luz natural.','Temos muito a conversar sobre luz.'],['As duas, depende do momento.','Faz sentido.']);
  if(txt.includes('investigar os clubes ou ouvir os alunos'))return pick(['Ouvir os alunos.','Boa escolha. As pessoas sempre têm histórias.'],['Investigar os clubes.','Vamos precisar de um bom caderno.'],['Que tal os dois?','Ambiciosa. Gostei.']);
  if(txt.includes('salva meu número'))return pick(['Salvei! Boa sorte com a matéria.','Obrigada. Vou precisar.'],['Pode me chamar quando quiser.','Vou lembrar disso.'],['Até mais, jornalista.','Até, novata.']);
  if(txt.includes('obrigad')||txt.includes('companhia')||txt.includes('presente'))return pick(['Eu que agradeço!','Foi bom falar com você.'],['Gostei muito de hoje.','Também gostei da nossa conversa.'],['Até mais!','Até a próxima.']);
  if(m.style8||txt.includes('visual')||txt.includes('look'))return pick(['Obrigada! Fico feliz que tenha reparado.','Difícil não reparar.'],['Quis experimentar algo diferente.','Funcionou muito bem.'],['Gostei de mudar um pouco.','É bom variar.']);
  if(id==='mabel')return pick(['Tenho tanta coisa para te contar!','Sabia! Quero todos os detalhes.'],['Vamos conversar com calma depois.','Combinado, amiga.'],['KKKK você não perde uma.','Jamais! É meu talento.']);
  if(['iris','scarlett','cecilia'].includes(id))return pick(['Pode contar comigo.','Obrigada. Vou lembrar disso.'],['Me conta mais quando nos encontrarmos.','Combinado.'],['Vou acompanhar as novidades.','Até depois.']);
  if(id==='raven')return replies94base(id,m);
  return pick(['Gostei de receber sua mensagem.','Também gostei de conversar com você.'],['Me conta mais quando nos encontrarmos.','Combinado.'],['A gente se fala depois.','Até mais.'])
};

const phone94base=phone7;
phone7=function(){
  phone94base();
  if(app90==='messages'){
    const h=document.querySelector('.history94');
    if(h){
      h.scrollTop=h.scrollHeight;
      requestAnimationFrame(()=>{
        if(h.isConnected)h.scrollTop=h.scrollHeight
      })
    }
    
  }
  
};

document.addEventListener('input',e=>{
  if(e.target.id!=='search94')return;search94=e.target.value;let q=search94.toLocaleLowerCase('pt-BR');document.querySelectorAll('.contact94').forEach(b=>b.hidden=!b.dataset.search.includes(q))
});

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||!state||b.disabled)return;const a=b.dataset.act;if(!['select94','next94','skip94'].includes(a))return;e.stopImmediatePropagation();let i=Number(b.dataset.i),m=state.messages[i];if(!m||m.who!==chat90||!canReply94(m,i))return;if(a==='select94')chosen94=i;if(a==='next94'){
    const p=pendingList94(chat90);chosen94=p[(p.findIndex(x=>x.i===i)+1)%p.length]?.i
  }
  if(a==='skip94'){
    data94().archived94.push(i);chosen94=null;persist()
  }
  phone7()
},true);

const cover94base=cover;cover=function(){return cover94base().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.9.4 • Conversas de Bellmont')};
