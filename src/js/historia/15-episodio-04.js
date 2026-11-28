// episodio-04 | v0.14
// v0.5 — Corações em Conflito
const girls5={
  mabel:{
    full:'Mabel Bloom',
    age:17,
    bio:'Coleciona adesivos, fofocas e teorias românticas. Sua amiga antes de tudo.'
  },
  scarlett:{
    full:'Scarlett Sinclair',
    age:18,
    bio:'Organiza o festival. Ambiciosa, exigente e muito mais leal do que aparenta.'
  },
  iris:{
    full:'Íris Moon',
    age:17,
    bio:'Conhece as lendas de Bellmont e coleciona livros sobre constelações.'
  },
  cecilia:{
    full:'Cecília Adler',
    age:18,
    bio:'Vice-presidente do conselho. Competitiva, organizada e amiga antiga de Soren.'
  }
  
};

Object.assign(chars,{iris:{name:'Íris',style:'girl'},cecilia:{name:'Cecília',style:'girl'}});
Object.assign(animeArt,{
  "mabel": [ASSETS14[46], 494, 796], "scarlett": [ASSETS14[47], 494, 796], "iris": [ASSETS14[48], 493, 796], "cecilia": [ASSETS14[49], 494, 796]
});

const pairs5={
 dante:{
  loc:'music',
  task:'Montar o palco',
  invite:'Encrenca, preciso de alguém que não transforme um cabo de guitarra em uma arma. Topa trabalhar comigo?',
  start:'O amplificador falhou. A comissão quer cancelar nossa apresentação. Você tem alguma ideia melhor?',
  options:[['Vamos testar cada cabo antes de desistir.',6,9,'Você não desiste fácil. Isso é... bom.','Inteligência'],['Vamos improvisar uma versão acústica.',10,6,'Uma ideia absurda. E excelente.','Criatividade'],['Posso pedir ajuda à comissão.',3,5,'Tudo bem. Só não quero que sobre tudo pra você.','Empatia']],
  quiet:'Lembra quando nos conhecemos? Você não parecia ter medo de mim. Foi um alívio.',
  close:'Posso tocar uma coisa só pra você? Não é para o festival.',
  yes:'Ainda não dei um nome pra música. Talvez você já saiba qual deveria ser.',
  no:'Tudo bem. Não vou fazer drama. Pelo menos não na sua frente.',
  title:'Uma música para dois'
},
 soren:{
  loc:'hall',
  task:'Organizar a programação',
  invite:'A comissão precisa de uma dupla competente. Gostaria de colaborar comigo? E, por favor, almoce antes.',
  start:'Dois clubes reservaram o mesmo palco. Se eu alterar um horário, um deles perde o público. Como resolvemos?',
  options:[['Criar uma apresentação conjunta.',8,8,'Eficiente e diplomático. Você me surpreende.','Inteligência'],['Ouvir os dois clubes antes de decidir.',6,10,'Tem razão. Pessoas não são só horários.','Empatia'],['Delegar as tarefas e fazer uma pausa.',9,5,'Uma pausa? Conceito revolucionário. Aceito.','Ousadia']],
  quiet:'Eu me lembro de como você lidou com aquela confusão. Você não me tratou como uma máquina de resolver problemas.',
  close:'Tenho cinco minutos livres. Pela primeira vez, quero usá-los sem planejar nada. Fica?',
  yes:'Talvez eu precise reservar mais momentos assim.',
  no:'Entendo. Obrigado pelo trabalho de hoje.',
  title:'Cinco minutos sem horário'
},
 theo:{
  loc:'gym',
  task:'Preparar os jogos',
  invite:'Parceira! A comissão quer uma gincana e eu claramente preciso de supervisão adulta. Quer formar dupla?',
  start:'A gincana precisa ser divertida, até para quem não gosta de esportes. O que a gente inventa?',
  options:[['Desafios cooperativos sem eliminação.',8,9,'Isso! Ninguém fica de fora.','Empatia'],['Uma corrida de obstáculos bem absurda.',10,5,'Finalmente, alguém com visão artística!','Criatividade'],['Vamos pedir sugestões à turma.',6,7,'Você faz todo mundo se sentir importante.','Carisma']],
  quiet:'Você sabe que às vezes eu brinco só para ninguém perceber que estou nervoso, né? Com você é mais fácil parar.',
  close:'Tenho duas panquecas na mochila. Quer dividir? Prometo não contar pra nutricionista do time.',
  yes:'Se esse fosse um jogo, eu teria acabado de desbloquear meu dia favorito.',
  no:'Fechado. Guardo uma pra amanhã, se quiser.',
  title:'A melhor parte do dia'
},
 ezra:{
  loc:'library',
  task:'Criar a exposição fotográfica',
  invite:'Encontrei uma parede vazia no festival. Acho que você teria ideias para ela. Quer trabalhar comigo?',
  start:'As fotos mais bonitas nem sempre são as mais perfeitas. Qual tema você escolheria para nossa exposição?',
  options:[['Pequenas coisas que ninguém percebe.',10,9,'Era exatamente o que eu queria.','Criatividade'],['Retratos com histórias contadas pelos alunos.',7,10,'Gosto disso. Cada pessoa escolhe o que quer mostrar.','Empatia'],['Luzes e sombras de Bellmont.',7,6,'Você tem um olhar interessante.','Inteligência']],
  quiet:'Desde que você chegou, tenho reparado em coisas que antes passavam despercebidas. Não só nas fotos.',
  close:'Posso mostrar uma fotografia que ainda não revelei para ninguém?',
  yes:'É a luz do jardim naquele dia. Obrigado por ter ficado.',
  no:'Claro. Posso guardar para outra hora.',
  title:'Coisas que ninguém percebe'
},
 valentim:{
  loc:'garden',
  task:'Ensaiar o teatro',
  invite:'Minha incógnita, o teatro perdeu uma assistente. Eu poderia contar com você, sem nenhum roteiro oculto?',
  start:'A cena principal está impecável, mas não parece verdadeira. O que falta?',
  options:[['Os personagens precisam falar com sinceridade.',9,10,'Sinceridade. Uma nota que eu deveria guardar.','Empatia'],['Vamos improvisar sem o texto.',10,6,'Perigoso. Adorei.','Ousadia'],['Reescrever o conflito antes do final.',7,7,'Uma futura dramaturga, talvez.','Criatividade']],
  quiet:'Com você, eu não sinto tanta necessidade de interpretar um personagem. É uma sensação nova.',
  close:'A música ainda está tocando. Gostaria de ensaiar uma dança comigo?',
  yes:'Desta vez, não precisamos de plateia.',
  no:'Uma recusa elegante. Respeito isso.',
  title:'Sem plateia'
}

};
function normalizeEpisodeFour(s) {
    s.e4=s.e4||{
    
  };
  s.e4.partner=s.e4.partner||null;
  s.e4.invites=s.e4.invites||{
    
  };
  s.e4.memories=s.e4.memories||[];
  s.e4.memoryLooks=s.e4.memoryLooks||{
    
  };
  s.gifts5=s.gifts5||{
    tokens:2,
    history:[]
  };
  s.read5=s.read5||{
    
  };
}

function start5(){
  if(state.node!=='e3ending')return;
  normalize(state);
  state.episode=4;
  state.node='e4intro';
  state.loc='gate';
  state.messages.push({
    day94:roomData11().day,who:'mabel',text:'DUPLAS DO FESTIVAL! A reunião é agora. Não me faça apostar sozinha.'
  });
  update()
}

function invite5(){
  for(const id of routes){
    if(profileKnown(id)&&state.trust[id]>=10&&!state.e4.invites[id]){
      state.e4.invites[id]='pending';
      state.messages.push({
        day94:roomData11().day,who:id,text:pairs5[id].invite,invite5:true
      });
      
    }
    
  }
  
}

function pick5(id){
  if(state.node!=='e4pick'||!pairs5[id]&&id!=='solo')return;
  state.e4.partner=id;
  for(const who of Object.keys(state.e4.invites))if(['pending','accepted'].includes(state.e4.invites[who]))state.e4.invites[who]=who===id?'accepted':'closed';
  state.loc=id==='solo'?'library':pairs5[id].loc;
  state.node=id==='solo'?'e4solo':'e4work';
  update()
}

const known5=profileKnown;profileKnown=id=>!!state&&(known5(id)||(state.episode===4&&state.e4?.partner===id));
function scene5(id){return `<div class="scene duo5">${bg(pairs5[id].loc)}<div class="duohero">${avatar(state.e4.memoryLooks[id]||state.look,'smile')}</div><div class="duoboy">${sprite(id,['dante','soren'].includes(id)?'tender':'shy')}</div><span class="duolabel">Memórias do Coração ♡</span></div>`}
const curr5=current;current=function(){if(state.episode!==4){let h=curr5();if(state.node==='e3ending')h=h.replace('Próximo episódio: Duplas inconvenientes • Ainda não disponível','Próximo episódio: Duplas inconvenientes').replace('<p><button class="primary" data-act="gallery">','<p><button class="primary" data-act="episode4">Iniciar episódio 04 ♡</button></p><p><button class="primary" data-act="gallery">');return h}let id=state.e4.partner,p=pairs5[id];switch(state.node){case'e4intro':return dialogue('mabel','É hoje! A comissão vai distribuir as duplas do festival. Eu só espero que ninguém jogue uma cadeira em ninguém.');case'e4cecilia':return dialogue('cecilia','As tarefas estão no mural. Escolha a dupla com quem deseja trabalhar. Não é uma competição de popularidade.');case'e4iris':return dialogue('iris','Minha previsão: alguém vai acabar descobrindo que um encontro pode acontecer sem ser planejado. Mas escolha por você, não pelas estrelas.');case'e4pick':return `<div class="map"><div class="tag">Dia 4 • Comissão do festival</div><h2>Duplas inconvenientes</h2><p>Escolha livremente sua dupla. Os convites pessoais são desbloqueados pela confiança; trabalhar com alguém não obriga a iniciar um romance.</p><div class="places">${routes.map(x=>e3tile(pairs5[x].loc,chars[x].name,pairs5[x].task+(state.e4.invites[x]==='accepted'?' • Convite aceito':state.e4.invites[x]==='pending'?' • Convidou você':''),'pick5',x)).join('')}${e3tile('library','Trabalhar com Íris','Meu próprio caminho','pick5','solo')}</div></div>`;case'e4work':return dialogue(id,p.start,p.options);case'e4answer':return dialogue(id,p.options[state.e4.choice][3],null,'smile');case'e4remember':{let log=state.log.filter(x=>x.who===id&&x.choice&&x.choice!==p.options[state.e4.choice][0]).at(-1);return dialogue(id,state.trust[id]>=15?p.quiet+(log?` Eu lembro daquela vez que você disse: “${log.choice}”` :''):'Acho que podemos fazer uma boa equipe. Ainda estou conhecendo você.');}case'e4final':return dialogue(id,p.close,['Aceitar o convite.','Prefiro encerrar por hoje.'],'shy');case'e4finalanswer':return dialogue(id,state.e4.accepted?p.yes:p.no,null,state.e4.accepted?'smile':'neutral');case'e4solo':return dialogue('iris','Trabalhamos juntas na decoração. Você não precisa de romance para ter uma história incrível. Mas eu ainda quero ouvir as fofocas da Mabel.');case'e4ending':return `<div class="ending"><div class="tag">Episódio 04 concluído</div><h2>${state.e4.accepted?p.title:'No meu próprio ritmo'}</h2>${state.e4.accepted?scene5(id):''}<p>Os preparativos para o festival terminaram. O próximo dia promete revelar mais sobre Bellmont.</p><p><button class="primary" data-act="gallery">Memórias do Coração ♡</button> <button class="soft" data-act="home">Menu inicial</button></p><div class="tag">Próximo: O segredo do terraço • Em desenvolvimento</div></div>`;default:return '<p>Estado de episódio desconhecido. Volte ao menu.</p>'}};
const next5=next;
next=function(){
  if(state.episode!==4)return next5();
  switch(state.node){
    case'e4intro':state.node='e4cecilia';
    state.loc='hall';
    break;
    case'e4cecilia':state.node='e4iris';
    state.loc='library';
    break;
    case'e4iris':state.node='e4pick';
    invite5();
    break;
    case'e4answer':state.node='e4remember';
    break;
    case'e4remember':state.node='e4final';
    break;
    case'e4finalanswer':case'e4solo':state.node='e4ending';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Festival quase pronto. Me conta TUDO amanhã.'
    });
    break;
    default:return
  }
  update()
};

const choose5=choose;
choose=function(i){
  if(state.episode!==4)return choose5(i);
  let id=state.e4.partner,
  p=pairs5[id];
  if(state.node==='e4work'&&p?.options[i]){
    state.e4.choice=i;
    applyChoice(id,p.options[i]);
    state.node='e4answer'
  }
  else if(state.node==='e4final'&&[0,1].includes(i)){
    state.e4.accepted=i===0;
    if(i===0){
      applyChoice(id,['Aceitar o convite.',7,7,'','Empatia']);
      if(!state.e4.memories.includes(id)){
        state.e4.memories.push(id);
        state.e4.memoryLooks[id]={
          ...state.look
        }
        
      }
      state.messages.push({
        day94:roomData11().day,who:id,text:p.yes
      })
    }
    state.node='e4finalanswer'
  }
  else return;
  update()
};

const giftNames=routes.map(id=>canon[id].gift);function giftPanel(){modalType='gifts5';showPanel('Presentes de Bellmont',`<p>Você tem ${state.gifts5.tokens} vale(s)-presente gratuitos. Entregue no máximo um presente por personagem. Consulte as fichas para descobrir as preferências.</p>${routes.filter(profileKnown).map(id=>`<div class="ep2card"><b>${chars[id].name}</b>${state.gifts5.history.some(x=>x.id===id)?'<p>Presente já entregue.</p>':`<div class="replychoices">${giftNames.map((g,i)=>`<button class="soft" data-act="gift5" data-id="${id}" data-i="${i}" ${state.gifts5.tokens<=0?'disabled':''}>${esc(g)}</button>`).join('')}</div>`}</div>`).join('')||'<p>Conheça os personagens antes de presentear.</p>'}<p class="hint">Presentes são gestos de amizade, não garantias de romance.</p>`)}
function give5(id,i){
  if(!routes.includes(id)||!profileKnown(id)||!giftNames[i]||state.gifts5.tokens<=0||state.gifts5.history.some(x=>x.id===id))return;
  let match=giftNames[i]===canon[id].gift;
  state.gifts5.tokens--;
  state.gifts5.history.push({
    id,gift:giftNames[i],match
  });
  state.aff[id]+=match?7:2;
  state.trust[id]+=match?5:1;
  state.messages.push({
    day94:roomData11().day,who:id,text:match?'Você lembrou do que eu gosto. Obrigado, de verdade.':'Obrigado por ter pensado em mim.'
  });
  persist();
  render();
  giftPanel();
  toast(match?'Presente perfeito ♡':'Presente entregue')
}

const modal5=modal;modal=function(type){if(type==='gifts5')return giftPanel();if(type==='girls5'){modalType=type;showPanel('Amigas e rivais',`<div class="girlsgrid">${Object.entries(girls5).map(([id,g])=>`<div class="girlcard"><div class="girlart">${sprite(id)}</div><b>${g.full} • ${g.age}</b><p>${g.bio}</p></div>`).join('')}</div>`);return}if(type==='phone'){modalType=type;let unread=state.messages.length;showPanel('Celular • Bellmont',`<div class="phone">${state.messages.length?state.messages.map((m,i)=>`<div class="msg"><b>${esc(chars[m.who]?.name||'Bellmont')}</b>${esc(m.text)}${m.invite5?`<div class="replychoices">${state.e4.invites[m.who]==='pending'?`<button class="soft" data-act="invite5" data-id="${m.who}" data-i="1">Topo trabalhar com você ♡</button><button class="soft" data-act="invite5" data-id="${m.who}" data-i="0">Prefiro escolher sem convite</button>`:`<span class="sent">${({accepted:'Convite aceito',declined:'Convite recusado',closed:'Convite encerrado'})[state.e4.invites[m.who]]||'Convite encerrado'}</span>`}</div>`:routes.includes(m.who)?state.replied[i]!==undefined?`<div class="sent">Você: ${esc(state.replied[i].text)}<br>${chars[m.who].name}: ${esc(state.replied[i].answer)}</div>`:`<div class="replychoices">${replyOptions(m.who).map((o,j)=>`<button class="soft" data-act="reply" data-i="${i}" data-j="${j}">${esc(o[0])}</button>`).join('')}</div>`:''}</div>`).reverse().join(''):'<div class="empty">Nenhuma mensagem ainda.</div>'}</div>`);state.read5.count=unread;persist();render();return}if(type==='gallery'){modal5(type);let g=document.querySelector('#modal .gallery');if(g)g.insertAdjacentHTML('beforeend',routes.map(id=>`<div class="cg">${state.e4.memories.includes(id)?scene5(id):'<div class="lock">♡</div>'}<b>${state.e4.memories.includes(id)?pairs5[id].title:'Episódio 04 • '+chars[id].name}</b>${state.e4.memories.includes(id)?`<p class="memquote">“${esc(pairs5[id].yes)}”</p>`:''}</div>`).join(''));return}if(type==='about'){modalType=type;showPanel('Depois do Sinal • v0.6.1','<p>Quatro episódios, cinco rotas, quatro personagens secundárias em anime, convites, presentes e memórias do coração. Funciona offline.</p><p>Cinco expressões ilustradas para cada pretendente e a protagonista, mais duas poses especiais para Dante e Soren. As memórias são composições de sprites e fundos. A personalização de cores ainda é aproximada.</p>');return}modal5(type);if(type==='cast'){let p=document.querySelector('#modal .panel');p?.insertAdjacentHTML('beforeend','<p><button class="primary" data-act="girls5">Conheça as garotas de Bellmont ♡</button></p>')}};
const render5=render;render=function(){render5();if(screen!=='game'||!state)return;const nav=document.querySelector('.nav');nav?.insertAdjacentHTML('afterbegin','<button data-act="gifts5">♧ Presentes</button>');const phone=document.querySelector('[data-act="phone"]');if(phone){let n=Math.max(0,state.messages.length-(state.read5.count||0));phone.textContent='▣ Celular'+(n?' • '+n+' novas':'')}if(state.episode===4){const ep=document.querySelector('.episode');if(ep)ep.innerHTML=`<span>EPISÓDIO 04 / DUPLAS INCONVENIENTES</span><span>${esc(state.name)} • ${state.e4.partner?state.e4.partner==='solo'?'Íris':chars[state.e4.partner].name:'Festival'}</span>`;const ob=document.querySelector('.objective');if(ob)ob.textContent=state.node==='e4pick'?'Escolha uma dupla e confira os convites no celular.':state.node==='e4ending'?'Episódio concluído.':'Prepare o festival e decida como reagir.'}};
document.addEventListener('click',e=>{
  let b=e.target.closest('[data-act]');if(!b||b.disabled)return;let a=b.dataset.act,id=b.dataset.id,i=Number(b.dataset.i);if(a==='girls5'){
    modal('girls5');return
  }
  if(!state)return;if(a==='episode4')start5();if(a==='pick5')pick5(id);if(a==='gifts5')modal('gifts5');if(a==='gift5')give5(id,i);if(a==='invite5'&&state.e4.invites[id]==='pending'&&state.node==='e4pick'){
    if(i===1)for(const other of Object.keys(state.e4.invites))if(other!==id&&state.e4.invites[other]==='accepted')state.e4.invites[other]='pending';state.e4.invites[id]=i===1?'accepted':'declined';persist();modal('phone');toast(i===1?'Convite aceito. Escolha sua dupla no mural.':'Tudo bem, você ainda pode escolher livremente.')
  }
  
});
