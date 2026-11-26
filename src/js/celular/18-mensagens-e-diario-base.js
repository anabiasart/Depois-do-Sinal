// mensagens-e-diario-base | v0.14
const chatTopics7={
 dante:[['Música','Qual música você ouviria agora?','Uma que ninguém conhece. Talvez eu te mostre a minha.'],['Dia','Como foi o ensaio?','Sobrevivi. O amplificador, quase.'],['Flertar','Você sentiu minha falta?','Não exagera, Encrenca. ... Talvez um pouco.']],
 soren:[['Música','Você ainda toca piano?','Quando tenho tempo. Ultimamente, tenho tentado arranjá-lo.'],['Dia','Como foi a reunião?','Longa. Conversar com você é consideravelmente mais agradável.'],['Flertar','Você poderia reservar cinco minutos para mim.','Já reservei. Não comente com ninguém.']],
 theo:[['Esporte','Como anda o treino?','Estou melhorando! Quer assistir um dia?'],['Dia','Você está bem de verdade?','Hoje sim. Obrigado por perguntar sem esperar uma piada.'],['Flertar','Estava pensando em você.','Assim você acaba com minha concentração, Estrelinha!']],
 ezra:[['Fotografia','Qual foi sua foto favorita de hoje?','Uma de luz entrando pela janela. Gostaria de te mostrar.'],['Dia','Como você está?','Um pouco cansado. Mas gostei de receber sua mensagem.'],['Flertar','Você é difícil de esquecer.','... Eu poderia dizer a mesma coisa.']],
 valentim:[['Teatro','Como anda a peça?','O roteiro está quase pronto. Preciso de alguém que não minta sobre o final.'],['Dia','Como foi seu dia?','Melhor agora que posso conversar sem plateia.'],['Flertar','Você está me devendo um café.','Uma dívida que adoraria pagar.']],
 mabel:[['Fofoca','Qual a fofoca do dia?','Dante e Soren concordaram em alguma coisa. Estou investigando esse fenômeno.'],['Amizade','Obrigada por me acolher.','Você é oficialmente minha pessoa favorita para falar besteira.']],
 scarlett:[['Festival','Como posso ajudar?','Organização e discrição. Já é um ótimo começo.'],['Amizade','A gente podia conversar sem falar do festival.','Talvez seja uma boa mudança.']],
 iris:[['Mistérios','Alguma teoria nova?','A do terraço é minha favorita, mas prefiro evidências a horóscopos.'],['Amizade','Quer conversar no intervalo?','Sim! Tenho um caderno novo para te mostrar.']],
 cecilia:[['Conselho','Precisa de ajuda?','A lista do festival está organizada. Agradeço a oferta.'],['Amizade','Você também merece descansar.','Uma observação surpreendentemente pertinente.']]};
function seed7(){
  if(!state)return;
  normalize(state);
  const push=(key,who,text)=>{
    if(!state.flags[key]){
      state.flags[key]=true;
      state.messages.push({
        day94:roomData11().day,who,text
      })
    }
    
  };
  if(state.visited.length>=2)push('sms_mabel_ep1','mabel','Então? Me atualiza AGORA. Quero o relatório completo dos novos crushes.');
  for(const id of routes){
    if((state.trust[id]||0)>=8)push('sms_'+id+'_trust',id,trustText94(id));
    if((state.aff[id]||0)>=15)push('sms_'+id+'_aff2',id,affText94(id));
    
  }
  if(state.episode>=3)push('sms_scarlett_ep3','scarlett','Se descobrir algo sobre o bilhete, me avise.');
  if(state.episode>=4){
    push('sms_iris_ep4','iris','O festival está caótico. E talvez romântico.');
    push('sms_cecilia_ep4','cecilia','Agradeço sua ajuda com as tarefas.');
    
  }
   
}

const originalReply7=replyOptions;
replyOptions=function(who){
  let o=routes.includes(who)?originalReply7(who):[];
  const t=chatTopics7[who]||chatTopics7.mabel;
  return [...o,[t[0][1],t[0][2],1,2,'Criatividade'],['Que bom que me escreveu.', 'Também foi bom falar com você.',1,2,'Empatia'],['Agora estou ocupada, falamos depois?', 'Claro. Até depois!',0,0,'Carisma']].slice(0,6)
};

function phoneContacts7(){return [...new Set(state.messages.map(m=>m.who).filter(id=>chars[id]))]}
function pending7(m,i){return m.invite5?state.node==='e4pick'&&state.e4.invites[m.who]==='pending':state.replied[i]===undefined&&!m.topic7}
function phone7(){modalType='phone';seed7();const contacts=phoneContacts7();if(contact7!=='group'&&!contacts.includes(contact7))contact7=contacts.at(-1)||null;const count=id=>state.messages.reduce((n,m,i)=>n+(m.who===id&&pending7(m,i)?1:0),0);
 const nav=`<div class="contactlist7"><div class="tag">Conversas</div>${contacts.slice().reverse().map(id=>`<button class="contact7" data-act="contact7" data-id="${id}" aria-pressed="${id===contact7}"><div class="face7">${sprite(id)}</div><span><b>${chars[id].name}</b><small>${esc(state.messages.filter(m=>m.who===id).at(-1)?.text||'')}</small></span>${count(id)?`<em>${count(id)}</em>`:''}</button>`).join('')}<button class="contact7" data-act="contact7" data-id="group" aria-pressed="${contact7==='group'}">♡ Grupo de Bellmont</button></div>`;
 let body='';if(contact7==='group'){body=`<h3>Grupo de Bellmont</h3><p class="hint">Mabel, Íris e Scarlett • disponível a partir do episódio 4</p>${state.episode>=4?`<div class="bubble7"><b>Mabel</b><br>O festival promete. Quem já tem teorias?</div><div class="bubble7"><b>Íris</b><br>Eu tenho três, mas só uma parece possível.</div><div class="bubble7"><b>Scarlett</b><br>Por favor, mantenham o foco.</div>${state.phone7.group.map(x=>`<div class="bubble7 mine7">${esc(x.text)}</div><div class="bubble7"><b>${esc(x.who)}</b><br>${esc(x.answer)}</div>`).join('')}${!state.phone7.group.length?`<div class="replychoices">${['Vamos organizar o festival juntas.','Quero ouvir as teorias!','Primeiro precisamos de um café.'].map((s,i)=>`<button class="soft" data-act="group7" data-i="${i}">${s}</button>`).join('')}</div>`:''}`:'<p>O grupo ainda não foi criado.</p>'}`;}
 else if(contact7){const id=contact7;const entries=state.messages.map((m,i)=>[m,i]).filter(([m])=>m.who===id);body=`<div class="threadhead7"><div class="face7">${sprite(id)}</div><div><h3>${chars[id].name}</h3><small>${routes.includes(id)?stage(id):'Amizade'}</small></div></div>${entries.map(([m,i])=>`<div class="bubble7">${esc(m.text)}</div>${m.invite5?`<div class="replychoices">${state.node==='e4pick'&&state.e4.invites[id]==='pending'?`<button class="soft" data-act="invite5" data-id="${id}" data-i="1">Aceitar convite ♡</button><button class="soft" data-act="invite5" data-id="${id}" data-i="0">Recusar convite</button>`:`<span class="hint">${({accepted:'Convite aceito',declined:'Convite recusado',closed:'Convite encerrado'})[state.e4.invites[id]]||'Convite encerrado'}</span>`}</div>`:state.replied[i]?`<div class="bubble7 mine7">${esc(state.replied[i].text)}</div><div class="bubble7">${esc(state.replied[i].answer)}</div>`:m.topic7?'':`<div class="replychoices">${replyOptions(id).map((o,j)=>`<button class="soft" data-act="reply7" data-i="${i}" data-j="${j}">${esc(o[0])}</button>`).join('')}</div>`}`).join('')}<div class="topic7"><div class="tag">Puxar assunto</div>${(chatTopics7[id]||[]).map((t,i)=>`<button class="soft" data-act="topic7" data-id="${id}" data-i="${i}" ${state.phone7.topics[id+':'+i+':'+state.episode]?'disabled':''}>${esc(t[0])}</button>`).join('')}</div>`;}
 else body='<h3>Seu celular</h3><p>Conheça os alunos para desbloquear conversas.</p>';
 showPanel('Celular • Bellmont',`<div class="phone7">${nav}<div class="thread7">${body}</div></div>`);document.querySelector('#modal .panel')?.classList.add('wide7');persist();render();}
function reply7(i,j){
  const m=state.messages[i];
  if(!m||!pending7(m,i)||m.invite5)return;
  const o=replyOptions(m.who)[j];
  if(!o)return;
  state.replied[i]={
    text:o[0],
    answer:o[1],
    after94:state.messages.length,
    order94:++data94().serial,
    day94:roomData11().day
  };
  typing95(m.who,i);
  if(romance93().includes(m.who)){
    state.aff[m.who]+=o[2];
    state.trust[m.who]+=o[3];
    if(o[5])state.attraction[m.who]=(state.attraction[m.who]||0)+o[5]
  }
  state.attrs[o[4]]++;
  persist();
  phone7()
}

function topic7(id,i){
  const t=chatTopics7[id]?.[i],
  k=id+':'+i+':'+state.episode;
  if(!t||state.phone7.topics[k]||!phoneContacts7().includes(id))return;
  state.phone7.topics[k]=true;
  const n=state.messages.length;
  state.messages.push({
    day94:roomData11().day,who:id,text:'Você iniciou uma conversa sobre '+t[0].toLowerCase()+'.',topic7:true
  });
  state.replied[n]={
    text:t[1],
    answer:topicAnswer95(id,t[2]),
    after94:state.messages.length,
    order94:++data94().serial,
    day94:roomData11().day
  };
  typing95(id,n);
  if(romance93().includes(id)){
    state.aff[id]+=1;
    state.trust[id]+=1;
    if(id==='raven'&&i===2)state.attraction.raven+=2
  }
  persist();
  phone7()
}

const episodeNames7=['A garota nova','Péssimas primeiras impressões','Alguém deixou um bilhete','Duplas inconvenientes','O segredo do terraço'];

function diaryPanel7(){modalType='journal';const e=state.episode||1;let content='';const tabs={overview:'Resumo',relations:'Relações',clues:'Lembranças e pistas',history:'Histórico',notes:'Minhas notas'};const summary=['Conheça os alunos e encontre seu caminho.','Ajude os clubes e descubra os rumores.','Reúna pistas sobre o envelope anônimo.','Prepare o festival com sua dupla.','Descubra o que há por trás do terraço.'][e-1];
 if(diary7==='overview')content=`<div class="journalcover7"><span class="tag">Temporada 01 • Dia ${e}</span><h2>${episodeNames7[e-1]}</h2><p>${summary}</p><b>Objetivo atual</b><p>${esc(document.querySelector('.objective')?.textContent||summary)}</p></div><div class="progress7">${episodeNames7.map((t,i)=>`<div class="entry7"><b>${i+1}. ${t}</b><span>${i+1<e?'✓ Concluído':i+1===e?'Em andamento':'Bloqueado'}</span></div>`).join('')}</div>`;
 if(diary7==='relations')content=routes.map(id=>`<div class="relation7"><div class="face7">${sprite(id)}</div><div><b>${chars[id].name} · ${stage(id)}</b>${['aff','trust','attraction','jealousy'].map((k,i)=>`<div class="stat7"><small>${['Afinidade','Confiança','Atração','Ciúmes'][i]}: ${state[k][id]||0}</small><div class="bar"><span style="width:${clamp(state[k][id]||0)}%"></span></div></div>`).join('')}${profileKnown(id)&&state.trust[id]>=20?`<p class="hint">Segredo: ${esc(canon[id].secret)}</p>`:''}</div></div>`).join('');
 if(diary7==='clues')content=`<h3>Lembranças coletadas</h3>${state.items.map(t=>`<div class="entry7">✦ ${esc(t)}</div>`).join('')||'<p>Nenhuma ainda.</p>'}<h3>Pistas</h3>${state.clues.map(t=>`<div class="entry7">✉ ${esc(t)}</div>`).join('')||'<p>Nenhuma pista ainda.</p>'}<button class="soft" data-act="gallery">Abrir galeria ♡</button>`;
 if(diary7==='history')content=`<h3>Decisões registradas</h3>${state.log.slice().reverse().map(x=>`<div class="entry7"><b>${esc(chars[x.who]?.name||'Bellmont')}</b><p>${esc(x.choice)}</p><small>Afinidade ${x.aff??0} · Confiança ${x.trust??0}</small></div>`).join('')||'<p>Sem escolhas ainda.</p>'}<h3>Mensagens respondidas</h3>${Object.entries(state.replied).reverse().map(([i,r])=>`<div class="entry7"><b>${esc(chars[state.messages[i]?.who]?.name||'Contato')}</b><p>${esc(r.text)}</p><small>${esc(r.answer)}</small></div>`).join('')||'<p>Sem respostas ainda.</p>'}`;
 if(diary7==='notes')content=`<h3>Minhas notas • Dia ${e}</h3><p class="hint">Escreva suas teorias, impressões e lembranças. As notas ficam no save.</p><textarea id="note7" maxlength="4000" placeholder="Hoje em Bellmont...">${esc(state.notes7[e]||'')}</textarea><button class="primary" data-act="note7">Salvar anotação</button>${Object.entries(state.notes7).filter(([k,v])=>Number(k)!==e&&v).map(([k,v])=>`<div class="entry7"><b>Dia ${esc(k)}</b><p class="notetext7">${esc(v)}</p></div>`).join('')}`;
 showPanel('Diário de Bellmont',`<div class="tabs7">${Object.entries(tabs).map(([id,t])=>`<button class="soft" data-act="diary7" data-id="${id}" aria-pressed="${diary7===id}">${t}</button>`).join('')}</div>${content}`);document.querySelector('#modal .panel')?.classList.add('wide7');}
const modal7=modal;modal=function(type){if(type==='new'||type==='wardrobe'){modalType=type;draft=type==='new'?initial():{name:state.name,look:{...state.look}};preview7='neutral';return drawWard7()}if(type==='phone')return phone7();if(type==='journal')return diaryPanel7();if(type==='about'){modalType=type;return showPanel('Depois do Sinal • v0.8.1','<p>Bellmont Life • Cinco episódios, guarda-roupa ilustrado, celular com conversas e diário por abas. Funciona offline.</p><p>A personalização de cores é feita por máscaras aproximadas, com arte-base fixa.</p>')}return modal7(type)};
