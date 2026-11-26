// episodio-02 | v0.14
const ep2={
 music:{
  who:'dante',
  intro:'Um cartaz rasgado está no chão. Dante tenta consertar o amplificador, enquanto o conselho exige que o clube pare de ensaiar.',
  line:'Aparentemente, fazer música é um crime contra a paz de Bellmont. Veio me dar sermão também?',
  choices:[['Não. Vim ajudar você a provar que o clube merece existir.',9,8,'Isso foi… inesperado. Pega a outra ponta do cabo.','Empatia'],['Se o ensaio incomoda, vamos negociar outro horário.',5,7,'Uma solução sensata. Que tragédia, eu vou ter que concordar.','Inteligência'],['Vamos fazer um show no pátio. Quero ver proibirem isso.',11,2,'Você é uma péssima influência, Encrenca. Gostei.','Ousadia']],
  reward:'Demo sem título',
  msg:'Gravei uma versão melhor. Talvez você possa ouvir depois.'
},
 hall:{
  who:'soren',
  intro:'O mural do festival está coberto por uma acusação anônima de favorecimento. Soren tenta apagar a confusão antes que a diretora veja.',
  line:'Alguém decidiu que espalhar rumores era uma atividade extracurricular. Você viu quem colocou o bilhete?',
  choices:[['Não, mas posso ajudar a investigar sem acusar ninguém.',8,9,'Obrigada pela sensatez. É raro por aqui.','Inteligência'],['Você não precisa resolver tudo sozinho.',9,8,'Eu sei. Ou deveria saber. Fique, por favor.','Empatia'],['Vamos escrever uma resposta pública bem-humorada.',2,3,'Criativo. Mas talvez não seja o momento.','Criatividade']],
  reward:'Bilhete do mural',
  msg:'O conselho conseguiu resolver a questão. Sua ajuda foi importante.'
},
 gym:{
  who:'theo',
  intro:'Theo está sozinho na quadra, tentando acertar uma cesta. O sorriso habitual desaparece quando a bola bate no aro.',
  line:'Não conta pra ninguém, tá? Hoje eu tô com a pontaria de uma batata.',
  choices:[['Uma batata com muito potencial. Quer treinar comigo?',10,7,'Hahaha. Você sabe como motivar um atleta.','Carisma'],['Você não precisa fazer piada se estiver chateado.',8,10,'É… acho que eu precisava ouvir isso.','Empatia'],['Me mostra como arremessar. Aposto que sou pior.',7,5,'Desafio aceito, Estrelinha!','Ousadia']],
  reward:'Foto do treino',
  msg:'A batata marcou três cestas seguidas. Evolução histórica.'
},
 library:{
  who:'ezra',
  intro:'Ezra está organizando fotografias para a exposição do festival. Uma foto foi marcada como inadequada, sem explicação.',
  line:'Querem tirar essa foto da exposição. Disseram que ninguém vai entender.',
  choices:[['Talvez a foto não precise ser entendida. Só sentida.',10,8,'É exatamente o que eu queria dizer. Obrigado.','Criatividade'],['Que tal escrevermos uma legenda juntos?',7,9,'Acho que gostaria disso.','Inteligência'],['Você pode escolher o que quer mostrar, não eles.',8,6,'Vou tentar lembrar disso quando falar com o comitê.','Ousadia']],
  reward:'Negativo fotográfico',
  msg:'A legenda ficou pronta. Quero que você seja a primeira a ver.'
},
 garden:{
  who:'valentim',
  intro:'Valentim ensaia uma cena para o festival. Ao perceber sua presença, fecha rapidamente o caderno de roteiro.',
  line:'Minha cara incógnita. Preciso de uma parceira de cena. Prometo uma atuação apenas moderadamente dramática.',
  choices:[['Só se eu puder improvisar.',10,6,'Finalmente alguém que não segue o roteiro.','Criatividade'],['Claro. Mas você pode ser você mesmo comigo.',8,10,'Essa proposta é mais ousada do que parece.','Empatia'],['Qual é o cachê? Meu talento não é de graça.',8,4,'Um café e minha eterna gratidão. Fechado?','Carisma']],
  reward:'Página de roteiro',
  msg:'Minha parceira de cena foi promovida a favorita. Não espalhe.'
}

};
const ep2Final={
  dante:{
    loc:'music',
    title:'Entre acordes',
    line:'Fica mais um pouco? Eu queria tocar uma música que ainda não mostrei pra ninguém.',
    yes:'Então escuta. E não faz aquela cara de quem vai chorar, tá?',
    no:'Tudo bem. Outro dia, se você quiser.'
  },
  soren:{
    loc:'library',
    title:'Uma pausa nas regras',
    line:'Terminei o trabalho. Pensei que talvez pudéssemos ficar aqui sem falar de obrigações.',
    yes:'Curioso. Eu não tinha planejado gostar tanto desse momento.',
    no:'Compreendo. Obrigado por ter vindo.'
  },
  theo:{
    loc:'gym',
    title:'A última cesta',
    line:'Quer ficar comigo até apagarem as luzes da quadra? Sem competição, só nós.',
    yes:'Então hoje foi um dia muito melhor do que eu esperava.',
    no:'Tranquilo. Amanhã a gente se vê.'
  },
  ezra:{
    loc:'roof',
    title:'O mundo em silêncio',
    line:'Achei um lugar onde dá pra ver o céu inteiro. Quer subir comigo?',
    yes:'Não precisa dizer nada. Só fica aqui.',
    no:'Claro. O céu vai estar lá amanhã.'
  },
  valentim:{
    loc:'garden',
    title:'Sem roteiro',
    line:'Pela primeira vez hoje, eu gostaria de conversar sem interpretar ninguém. Aceita?',
    yes:'Obrigado. É um alívio não precisar encenar.',
    no:'Uma recusa sincera vale mais que um sim por educação.'
  }
  
};

const oldKnown=profileKnown;
profileKnown=id=>!!state&&(oldKnown(id)||state.visited2?.some(l=>ep2[l]?.who===id)||((state.node==='e2meet'||state.node==='e2answer')&&ep2[state.loc]?.who===id));

const oldChoose=choose;choose=function(i){if(!state)return;normalize(state);if(state.episode===2){if(state.node==='e2mabel'&&i>=0&&i<3){state.attrs[attrs[[4,2,1][i]]]++;state.flags.e2mabel=i;state.node='e2map';update();return}if(state.node==='e2meet'){const e=ep2[state.loc],c=e?.choices[i];if(!c)return;applyChoice(e.who,c);state.sceneChoice=i;state.node='e2answer';update();return}if(state.node==='e2final'&&[0,1].includes(i)){let who=state.ending2;state.sceneChoice=i;if(i===0){applyChoice(who,['Aceitei o convite.',7,8,'','Empatia']);if(!state.gallery2.includes(who))state.gallery2.push(who);routes.filter(x=>x!==who&&state.aff[x]>=15).forEach(x=>state.jealousy[x]=clamp(state.jealousy[x]+3));}else{state.trust[who]+=2;state.attrs.Ousadia++;}state.node='e2finalanswer';update();return}}if(['enc1','final0'].includes(state.node)){const e=state.node==='enc1'?encounters[state.loc]:finals[state.ending],who=state.node==='enc1'?e.who:state.ending,c=e?.choices[i];if(c){state.attraction[who]=clamp(state.attraction[who]+Math.max(0,Math.ceil(c[1]/2)));state.attrs[attrs[(i+(state.node==='final0'?1:0))%attrs.length]]++;}}oldChoose(i)};
function applyChoice(who,c){state.aff[who]+=c[1];state.trust[who]+=c[2];state.attraction[who]=clamp(state.attraction[who]+Math.max(0,Math.ceil(c[1]/2)));state.attrs[c[4]||'Carisma']++;state.log.push({who,choice:c[0],aff:c[1],trust:c[2]});toast(`${chars[who].name} • Afinidade ${c[1]>=0?'+':''}${c[1]} • Confiança +${c[2]}`)}
function startEpisode2(){
  if(!state||state.node!=='ending')return;
  normalize(state);
  state.episode=2;
  state.node='e2intro';
  state.loc='bedroom';
  update()
}

function visit2(id){if(state.node!=='e2map'||!ep2[id]||state.visited2.includes(id))return;state.loc=id;state.node='e2introMeet';update()}
function route2(id){
  if(state.node==='e2map'&&id==='finish'&&state.visited2.length>=3){
    state.node='e2select';
    update();
    return
  }
  if(state.node!=='e2select')return;
  if(id!=='solo'&&!state.visited2.some(l=>ep2[l].who===id))return;
  state.ending2=id;
  state.loc=id==='solo'?'gate':ep2Final[id].loc;
  state.node=id==='solo'?'e2solo':'e2final';
  update()
}

const oldNext=next;
next=function(){
  if(state.episode!==2)return oldNext();
  switch(state.node){
    case'e2intro':state.node='e2mabel';
    state.loc='hall';
    break;
    case'e2introMeet':state.node='e2meet';
    break;
    case'e2answer':{
      let e=ep2[state.loc];
      if(!state.visited2.includes(state.loc)){
        state.visited2.push(state.loc);
        state.items.push(e.reward);
        state.messages.push({
          day94:roomData11().day,who:e.who,text:e.msg
        });
        
      }
      state.node='e2map';
      break
    }
    case'e2finalanswer':case'e2solo':state.node='e2ending';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Alguém deixou um envelope no mural. Amanhã a gente investiga!'
    });
    break;
    default:return
  }
  update()
};

const oldCurrent=current;current=function(){if(state.episode!==2)return oldCurrent();const e=ep2[state.loc],f=ep2Final[state.ending2];switch(state.node){case'e2intro':return dialogue('me','Segundo dia. Mabel mandou onze mensagens antes das sete da manhã. Aparentemente, alguém espalhou um rumor sobre o festival de Bellmont.');case'e2mabel':return dialogue('mabel','Tem um bilhete anônimo no mural! Dizem que os clubes estão brigando pelos horários do festival. Qual é o nosso plano?',['Investigar as fofocas.','Verificar os fatos primeiro.','Ajudar os clubes a resolver a confusão.'],'smile');case'e2map':return `<div class="map"><div class="tag">Festival • Segundo dia</div><h2>Rumores em Bellmont</h2><p>Ajude pelo menos três clubes. Suas escolhas desenvolvem os atributos da protagonista e os relacionamentos.</p><div class="places">${Object.entries(ep2).map(([l,x])=>`<button class="place" data-act="visit2" data-id="${l}" ${state.visited2.includes(l)?'disabled':''}>${bg(l)}<span>${locs[l][0]}<small>${state.visited2.includes(l)?'✓ Concluído':chars[x.who].name+' precisa de ajuda'}</small></span></button>`).join('')}<button class="place" data-act="route2" data-id="finish" ${state.visited2.length<3?'disabled':''}>${bg('gate')}<span>Último sinal<small>${state.visited2.length}/3 clubes necessários</small></span></button></div></div>`;case'e2introMeet':return dialogue(null,e.intro);case'e2meet':return dialogue(e.who,e.line,e.choices);case'e2answer':return dialogue(e.who,e.choices[state.sceneChoice][3],null,'smile');case'e2select':return `<div class="map"><div class="tag">Fim de tarde</div><h2>Com quem você quer ficar?</h2><p>Escolha livremente. Afinidade não obriga ninguém a se apaixonar.</p><div class="places">${state.visited2.map(l=>`<button class="place" data-act="route2" data-id="${ep2[l].who}">${bg(l)}<span>${chars[ep2[l].who].name}<small>${stage(ep2[l].who)}</small></span></button>`).join('')}<button class="place" data-act="route2" data-id="solo">${bg('gate')}<span>Ir para casa<small>Meu próprio caminho</small></span></button></div></div>`;case'e2final':return dialogue(state.ending2,f.line,['Quero ficar com você.','Obrigada pelo convite, mas hoje prefiro ir embora.']);case'e2finalanswer':return dialogue(state.ending2,state.sceneChoice===0?f.yes:f.no,null,state.sceneChoice===0?'shy':'neutral');case'e2solo':return dialogue('me','Ajudei os clubes e fiz novas amizades. Não preciso escolher um romance para que o meu dia tenha valido a pena.');case'e2ending':return `<div class="ending"><div class="tag">Episódio 02 concluído</div><h2>${state.ending2==='solo'?'O meu próprio ritmo':state.gallery2.includes(state.ending2)?f.title:'Até outro dia'}</h2><p>O festival começa a ganhar forma. Mas o envelope anônimo no mural promete complicar tudo no próximo episódio.</p><div class="tag">Continua • Episódio 03: Alguém deixou um bilhete</div><p>${state.visited2.length} clubes visitados • ${state.gallery.length+state.gallery2.length} memórias</p><button class="primary" data-act="episode3">Jogar episódio 03 ›</button> <button class="soft" data-act="gallery">Galeria</button> <button class="soft" data-act="home">Menu inicial</button></div>`;default:return oldCurrent()}};
const oldSide=side;side=function(){if(state.episode!==2)return oldSide();return oldSide().replace('Acompanhe a história e escolha como reagir.',state.node==='e2map'?`Ajude pelo menos três clubes. ${state.visited2.length}/5 concluídos.`:state.node==='e2ending'?'Episódio concluído.':'Acompanhe a história e escolha como reagir.')};
function statBar(t,v){return `<div class="statline"><div class="pname"><span>${t}</span><span>${v}</span></div><div class="bar"><span style="width:${clamp(v)}%"></span></div></div>`}

showProfile=function(id,mood='neutral'){if(!routes.includes(id))return;activeProfile=id;modalType='profile';const c=canon[id],v=visualProfiles[id],known=profileKnown(id);let facts=[['Idade',c.age+' anos'],['Altura',c.height],['Aniversário',c.birth],['Signo',c.sign],['Comida',c.food],['Música',c.music],['Lugar favorito',c.place],['Presente ideal',c.gift],['Linguagem do amor',c.love],['Detesta',c.dislike],['Rota',c.route],['Apelido',c.nick]];showPanel(c.full,`<div class="profilehero"><div class="profileart" style="--cast:${v.color}">${sprite(id,mood)}</div><div><div class="tag">${c.club}</div><h3>${v.title}</h3><p>${known?c.bio:'Conheça este personagem para desbloquear a ficha.'}</p><p class="profilequote">“${c.quote}”</p>${known?`<div class="moodlabel">${stage(id)}</div><div class="profilefacts">${facts.map(([k,val])=>`<div><span>${k}</span><b>${val}</b></div>`).join('')}</div>${statBar('Afinidade',state.aff[id])}${statBar('Confiança',state.trust[id])}${statBar('Atração',state.attraction[id])}${statBar('Ciúmes',state.jealousy[id])}<div class="ep2card"><b>Segredo</b><p>${state.trust[id]>=20?c.secret:'Bloqueado • alcance 20 de confiança.'}</p><b>Vulnerabilidade</b><p>${state.trust[id]>=25?c.flaw:'Bloqueada • alcance 25 de confiança.'}</p></div>`:''}</div></div><div class="expression-panel"><div class="tag">Estúdio de expressões</div>${expressionButtons(id,mood)}</div><button class="soft" data-act="cast">‹ Voltar ao elenco</button>`)};
const oldModal=modal;modal=function(type){if(type==='stats'){modalType=type;showPanel('Meu perfil',`<div class="ward"><div class="avatar">${avatar(state.look)}</div><div><h3>${esc(state.name)}</h3><p>Suas decisões moldam sua personalidade. Novas opções serão abertas nos episódios futuros.</p>${attrs.map(a=>statBar(a,state.attrs[a])).join('')}</div></div>`);return}if(type==='phone'){modalType=type;showPanel('Seu celular',`<div class="phone">${state.messages.length?state.messages.map((m,i)=>`<div class="msg"><b>${chars[m.who].name}</b>${esc(m.text)}${routes.includes(m.who)?state.replied[i]!==undefined?`<div class="sent">Você: ${esc(state.replied[i].text)}<br>${chars[m.who].name}: ${esc(state.replied[i].answer)}</div>`:`<div class="replychoices">${replyOptions(m.who).map((o,j)=>`<button class="soft" data-act="reply" data-i="${i}" data-j="${j}">${esc(o[0])}</button>`).join('')}</div>`:''}</div>`).join(''):'<div class="empty">Nenhuma mensagem ainda.</div>'}</div>`);return}if(type==='gallery'){oldModal(type);let g=document.querySelector('#modal .gallery');if(g)g.insertAdjacentHTML('beforeend',routes.map(id=>`<div class="cg">${state.gallery2.includes(id)?`<div class="pic">${bg(ep2Final[id].loc)}<div class="cgperson">${sprite(id)}</div></div>`:'<div class="lock">♡</div>'}<b>${state.gallery2.includes(id)?ep2Final[id].title:'Episódio 02 • '+chars[id].name}</b></div>`).join(''));return}oldModal(type)};
function replyOptions(who){
  const special={
    dante:['Manda a música quando quiser.','Talvez eu mande. Não se acostuma.'],
    soren:['Obrigada por lembrar de mim.','Não foi um incômodo.'],
    theo:['KKKK, você é impossível.','Impossivelmente incrível, você quis dizer.'],
    ezra:['Quero ver suas fotos.','Vou guardar as melhores pra você.'],
    valentim:['Você me deve um café.','Uma promessa é uma promessa.']
  }
  [who];
  return [[special[0],special[1],2,2,'Carisma'],['Obrigada pela mensagem.','Até amanhã!',1,2,'Empatia'],['A gente conversa pessoalmente.','Combinado.',0,1,'Ousadia']]
}

function replyMessage(i,j){
  const m=state.messages[i];
  if(!m||!routes.includes(m.who)||state.replied[i]!==undefined)return;
  const o=replyOptions(m.who)[j];
  if(!o)return;
  state.replied[i]={
    text:o[0],
    answer:o[1]
  };
  state.aff[m.who]+=o[2];
  state.trust[m.who]+=o[3];
  state.attrs[o[4]]++;
  persist();
  modal('phone');
  render()
}

// The static anime sprite is accompanied by a readable emotion cue during dialogue.
const oldDialogue=dialogue;
