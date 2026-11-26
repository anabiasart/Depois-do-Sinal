// mensagens-noturnas | v0.14
/* v0.9.5 • BellPhone: depois da meia-noite */
const media95={
  "dante":{
    "voice":"Encrenca... gravei isso depois do ensaio. O dia foi uma bagunça, mas conversar com você foi a parte boa.",
    "caption":"A sala de música depois do ensaio.",
    "loc":"music",
    "nick":"Encrenca",
    "night":"Ainda acordada? O ensaio acabou e o silêncio ficou estranho.",
    "close":"Às vezes componho melhor quando ninguém está esperando nada de mim.",
    "audio":ASSETS14[349],
    "photo":ASSETS14[350]
  },
  "soren":{
    "voice":"Terminei o cronograma. Achei que seria bom ouvir sua opinião amanhã. Obrigado por me fazer lembrar de descansar.",
    "caption":"Uma mesa tranquila na biblioteca.",
    "loc":"library",
    "nick":"Senhorita Caos",
    "night":"Ainda está acordada? Estou tentando não revisar o cronograma pela quarta vez.",
    "close":"É estranho perceber que não preciso resolver tudo sozinho.",
    "audio":ASSETS14[351],
    "photo":ASSETS14[352]
  },
  "theo":{
    "voice":"Ei! Sobrevivi ao treino! Passei só pra desejar uma boa noite. E sim, amanhã eu vou lembrar do chocolate.",
    "caption":"A quadra antes do treino.",
    "loc":"gym",
    "nick":"Estrelinha",
    "night":"Não consigo dormir. Minha cabeça está reprisando o tombo de hoje, socorro.",
    "close":"Às vezes cansa ser a pessoa que sempre faz todo mundo rir.",
    "audio":ASSETS14[353],
    "photo":ASSETS14[354]
  },
  "ezra":{
    "voice":"A luz mudou no fim da tarde. Queria que você tivesse visto. Guardei uma imagem para te mostrar.",
    "caption":"A luz do jardim no fim da tarde.",
    "loc":"garden",
    "nick":"Musa",
    "night":"A janela está aberta. Tem uma luz bonita do outro lado da rua. Você está acordada?",
    "close":"Gosto de quando podemos ficar em silêncio sem precisar preencher o espaço.",
    "audio":ASSETS14[355],
    "photo":ASSETS14[356]
  },
  "valentim":{
    "voice":"Uma pequena pausa antes do próximo ensaio. Sua companhia seria muito bem-vinda. Espero que tenha uma boa noite.",
    "caption":"O colégio antes de o festival começar.",
    "loc":"gate",
    "nick":"Minha incógnita",
    "night":"O ensaio terminou. Sem plateia, finalmente. Ainda posso roubar cinco minutos da sua noite?",
    "close":"Com você, não sinto que preciso ensaiar cada frase.",
    "audio":ASSETS14[357],
    "photo":ASSETS14[358]
  },
  "raven":{
    "voice":"Oi. Fechei o caderno por hoje. Nenhuma entrevista, nenhuma manchete. Só queria saber como você está.",
    "caption":"Um canto tranquilo de Bellmont, longe das manchetes.",
    "loc":"hall",
    "nick":"Minha cúmplice",
    "night":"Ainda acordada? Estou escrevendo uma coisa que não pretendo mostrar ao jornal.",
    "close":"É mais fácil escrever sobre os outros do que admitir o que eu sinto.",
    "audio":ASSETS14[359],
    "photo":ASSETS14[360]
  }
  
};

const typingMap95=new Map();
function typing95(id,i){
  const owner=state;
  const entry={
    i,
    owner
  };
  typingMap95.set(id,entry);
  setTimeout(()=>{
    if(typingMap95.get(id)!==entry)return;typingMap95.delete(id);if(state===owner&&modalType==='phone'&&app90==='messages'&&chat90===id&&document.querySelector('.thread94'))phone7()
  },850+(id==='soren'?450:0));
  
}

function isTyping95(id,i){let x=typingMap95.get(id);return !!x&&x.owner===state&&(i===undefined||x.i===i)}
function dots95(label){return `<div class="typing95" role="status"><span>${esc(label)} ${label.includes(' e ')?'estão digitando':'está digitando'}</span><i></i><i></i><i></i></div>`}
function intimacy95(id){
  if(!media95[id])return 0;
  let t=state.trust[id]||0,
  a=state.aff[id]||0,
  r=state.attraction[id]||0;
  return t>=25&&r>=18?3:t>=14&&a>=15?2:t>=8?1:0
}

function topicAnswer95(id,t){let n=intimacy95(id);if(n>=3)return `${media95[id].nick}, ${t.charAt(0).toLowerCase()+t.slice(1)}`;if(n===2)return t+' Gosto de falar com você.';return t}
const oldSeed95=seed90;
seed90=function(){
  let changed=oldSeed95();
  for(const id of romance93()){
    if(!media95[id]||!known90(id))continue;
    let a=media95[id],
    n=intimacy95(id);
    if(state.episode>=2&&n>=1){
      changed=push90('voice95:'+id,id,'Mensagem de voz',{
        media95:'voice',text:a.voice
      })||changed;
      
    }
    if(state.episode>=2&&n>=1)changed=push90('photo95:'+id,id,a.caption,{
      media95:'photo'
    })||changed;
    if(state.episode>=3&&n>=2)changed=push90('night95:'+id,id,a.night,{
      night95:true,clock95:'23:18'
    })||changed;
    if(state.episode>=4&&n>=3)changed=push90('close95:'+id,id,topicAnswer95(id,a.close),{
      night95:true,clock95:'23:42'
    })||changed;
    
  }
  return changed
};

const oldReplies95=replies90;
replies90=function(id,m){
  const a=media95[id];
  if(!a)return oldReplies95(id,m);
  if(m.night95)return [['Estou acordada. Pode me contar o que está pensando.',a.close,2,4,'Empatia'],['Gosto quando você me procura assim.',topicAnswer95(id,'Também gosto. A noite fica menos silenciosa.'),3,2,'Carisma',3],['Está tarde, vamos descansar e conversar amanhã?','Tem razão. Boa noite, durma bem.',0,2,'Empatia']];
  if(m.media95==='voice')return [['Adorei ouvir sua voz.','Então talvez eu mande outro áudio algum dia.',3,2,'Carisma',2],['Obrigada por dividir um pouco do seu dia.','Foi bom poder contar.',1,3,'Empatia'],['Até amanhã!','Até amanhã.',0,1,'Carisma']];
  if(m.media95==='photo')return [['Que lugar lindo!','Também achei. Fico feliz que tenha gostado.',1,2,'Criatividade'],['Vamos lá juntos algum dia?','Gostaria disso. Podemos combinar.',3,2,'Carisma',2],['Obrigada pela foto.','De nada!',0,1,'Empatia']];
  return oldReplies95(id,m).map(o=>{
    let x=[...o];if(intimacy95(id)>=3&&x[2]>=2)x[1]=topicAnswer95(id,x[1]);return x
  })
};

const oldEvents95=events94;events94=function(id){return oldEvents95(id).filter(e=>e.kind!=='answer'||!isTyping95(id,e.i))};
const oldBubble95=bubble94;bubble94=function(e){let h=oldBubble95(e),m=e.m;if(!m)return h;let a=media95[m.who];if(!a)return h;let extra='';if(m.night95)extra+='<div class="night95">☾ '+esc(m.clock95||'23:18')+' · Conversa noturna</div>';if(m.media95==='voice')extra+=`<div class="media95"><b>♫ Áudio de ${name90(m.who)}</b><audio controls preload="none" src="${mediaURL14(a.audio,'audio/mpeg')}"></audio><details><summary>Transcrição</summary><p>${esc(a.voice)}</p></details><small>Voz sintetizada</small></div>`;if(m.media95==='photo')extra+=`<div class="media95"><button class="photo95" data-act="photo95" data-id="${m.who}" aria-label="Ampliar fotografia"><img loading="lazy" src="${mediaURL14(a.photo,'image/webp')}" alt="${esc(a.caption)}"></button><small>Toque para ampliar</small></div>`;if(m.media95==='voice')h=h.replace(esc(e.text||''),'Mensagem de voz');return extra?h.replace('</div>',extra+'</div>'):h};
const oldThread95=thread90;thread90=function(id){let h=oldThread95(id),n=intimacy95(id);if(media95[id])h=h.replace('<span class="pending94">',`<span class="intimacy95">${['Conhecendo','À vontade','Cumplicidade','Carinho especial'][n]}</span><span class="pending94">`);if(isTyping95(id))h=h.replace('<div class="composer94">',dots95(name90(id))+'<div class="composer94 busy95" inert>');return h};
const groupExtra95=[
{
  who:'theo',
  lines:[['theo','Gente, quem pegou o último chocolate da cantina?'],['dante','É uma investigação policial agora?'],['raven','Posso abrir uma matéria. Crime contra a sobremesa.']],
  opts:['Eu apoio a investigação.','Dividimos outro chocolate.','Vocês são impossíveis.'],
  answers:[[['raven','Finalmente alguém leva o jornal a sério.'],['theo','Recrutada!']], [['theo','Você é a melhor!'],['dante','Pronto, caso encerrado.']], [['dante','E você ainda está aqui.'],['raven','Isso diz muito sobre nós.']]]
},
{
  who:'soren',
  lines:[['soren','O cronograma do festival está pronto. Por favor, não inventem mais atividades.'],['valentim','Uma dança improvisada não conta como atividade.'],['mabel','EU APOIO.'],['ezra','Eu posso fotografar.']],
  opts:['Uma dança seria linda.','Vamos respeitar o cronograma.','Que tal uma pausa para fotos?'],
  answers:[[['valentim','Enfim, alguém com visão artística.'],['soren','Cinco minutos. Não mais.']], [['soren','Agradeço a sensatez.'],['mabel','Vocês não têm espírito de caos.']], [['ezra','Gostei. A luz está boa agora.'],['soren','Uma pausa é aceitável.']]]
},
{who:'raven',lines:[['raven','Pergunta para a edição do festival: qual foi a melhor parte de Bellmont até agora?'],['iris','Os mistérios, obviamente.'],['scarlett','As pessoas que realmente ajudaram.']],opts:['As amizades que fiz.','Os momentos inesperados.','Ainda estou descobrindo.'],answers:[[['mabel','Vou guardar isso!'],['raven','Boa resposta. Sem ironia.']], [['theo','Os melhores momentos não têm roteiro.'],['raven','Essa vai para meu caderno.']], [['raven','Então nossa história ainda está em andamento.'],['ezra','Como deve ser.']]]}];
function groupData95(){const d=data94();if(!Array.isArray(d.group95))d.group95=[];return d.group95}
group90=function(){if(state.episode<4)return '<h3>Grupo de Bellmont</h3><p>O grupo será criado no episódio 04.</p>';const d=data94(),g=groupData95();let h='<h3>Grupo de Bellmont</h3><p class="bpmuted">Mabel, Íris, Scarlett, Dante, Soren, Theo, Ezra, Valentim e Raven</p>'+state.phone7.group.map(x=>bubble90(x.text,true)+bubble90(x.who+': '+x.answer)).join('');for(let i=0;i<=d.group.length&&i<groupRounds90.length;i++){let r=groupRounds90[i];h+=bubble90(name90(r.who)+': '+r.text);if(d.group[i]!==undefined){h+=bubble90(r.opts[d.group[i]],true);if(isTyping95('group',i))return h+dots95(name90(r.who));h+=bubble90(name90(r.who)+': '+r.answers[d.group[i]])}else return h+'<div class="bpchoices">'+r.opts.map((x,j)=>button90('bp90group',esc(x),`data-i="${j}"`)).join('')+'</div>'}h+='<div class="day94">Grupo · Festival</div>';for(let i=0;i<=g.length&&i<groupExtra95.length;i++){let r=groupExtra95[i];h+=r.lines.map(([who,t])=>bubble90(name90(who)+': '+t)).join('');if(g[i]!==undefined){h+=bubble90(r.opts[g[i]],true);if(isTyping95('group',100+i))return h+dots95(r.answers[g[i]].map(([who])=>name90(who)).join(' e '));h+=r.answers[g[i]].map(([who,t])=>bubble90(name90(who)+': '+t)).join('')}else h+='<div class="bpchoices">'+r.opts.map((t,j)=>button90('group95',esc(t),`data-i="${j}"`)).join('')+'</div>'}return h};
document.addEventListener('click',e=>{let b=e.target.closest('[data-act]');if(!b||b.disabled||!state)return;let a=b.dataset.act;if(a==='photo95'){e.stopImmediatePropagation();let p=media95[b.dataset.id];if(p)showPanel('Foto recebida',`<div class="photoLarge95"><img src="${mediaURL14(p.photo,'image/webp')}" alt="${esc(p.caption)}"><p>${esc(p.caption)}</p>${button90('bp90app','Voltar à conversa','data-id="messages"')}</div>`);return}if(a==='group95'){e.stopImmediatePropagation();let g=groupData95(),i=Number(b.dataset.i);if(chat90!=='group'||state.episode<4||data94().group.length<groupRounds90.length||g.length>=groupExtra95.length||![0,1,2].includes(i))return;g.push(i);typing95('group',100+g.length-1);persist();phone7();}},true);
const cover95base=cover;cover=function(){return cover95base().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.9.5 • Depois da meia-noite')};
