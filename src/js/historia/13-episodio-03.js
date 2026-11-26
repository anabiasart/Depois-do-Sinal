// episodio-03 | v0.14
const schoolArt={
  "gate":ASSETS14[40],
  "hall":ASSETS14[41],
  "library":ASSETS14[42],
  "music":ASSETS14[43],
  "gym":ASSETS14[44],
  "garden":ASSETS14[45]
};

const v3bg=bg;bg=function(id){if(!schoolArt[id])return v3bg(id);return `<svg class="bg anime-bg" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="${mediaURL14(schoolArt[id],'image/webp')}" width="960" height="540" preserveAspectRatio="xMidYMid slice"/></svg>`};
const v3normalize=normalize;
normalize=function(s){
  v3normalize(s);
  s.visited3=s.visited3||[];
  s.clues=s.clues||[];
  s.extras3=s.extras3||[];
  s.gallery3=s.gallery3||[];
  s.deduction=s.deduction??null;
  s.sound=s.sound??false;
  return s
};

const ep3={
 hall:{
  who:'soren',
  clue:'Lista de horários corrigida',
  line:'Este envelope foi entregue antes da aula. O horário escrito nele não corresponde à versão oficial do festival. Você reparou?',
  choices:[['Vamos comparar as duas listas.',7,7,'Boa. Você percebeu a mesma inconsistência que eu.','Inteligência'],['Você parece cansado. Eu posso ajudar.',5,9,'Seria... agradável dividir a responsabilidade.','Empatia'],['Talvez o bilhete seja uma piada.',-2,1,'Prefiro não presumir isso antes de investigar.','Ousadia']],
  special:['Cruzar as assinaturas e os horários. ',9,9,'Uma análise impecável. Você deveria considerar o conselho.','Inteligência'],
  msg:'A lista que encontramos está segura comigo. Obrigado pela ajuda.'
},
 music:{
  who:'dante',
  clue:'Rascunho com tinta azul',
  line:'Encontrei um pedaço de papel perto do amplificador. A mesma tinta azul do envelope. Antes que pergunte: não fui eu.',
  choices:[['Se fosse você, teria assinado com uma provocação.',8,5,'Finalmente alguém que entende meu estilo.','Ousadia'],['Não vou acusar ninguém sem provas.',6,8,'...É. Obrigado por isso.','Empatia'],['Você é suspeito até segunda ordem.',-3,1,'Então vou precisar de um advogado.','Carisma']],
  special:['O rascunho parece parte de uma letra de música.',9,7,'Você entende de composição? Essa é nova.','Criatividade'],
  msg:'Se ouvir uma guitarra amanhã, pode entrar. Só bate na porta.'
},
 gym:{
  who:'theo',
  clue:'Relato do treino',
  line:'Eu vi uma pessoa correndo com papéis perto do ginásio. Mas antes de sair apontando dedos, talvez seja melhor perguntar o que aconteceu.',
  choices:[['Você consegue lembrar de algum detalhe?',5,7,'Uma pasta verde! Isso eu lembro.','Inteligência'],['Vamos procurar juntos. Dupla de detetives.',8,6,'Fechado. Preciso de um chapéu ridículo?','Carisma'],['Relaxa, você já ajudou bastante.',4,6,'Você é legal demais, sabia?','Empatia']],
  special:['Vamos reconstruir o trajeto no mapa.',9,7,'Você leva essa brincadeira a sério. Adorei.','Inteligência'],
  msg:'Parceira detetive, nossa investigação merece panquecas.'
},
 library:{
  who:'ezra',
  clue:'Foto do mural às 07:40',
  line:'Fotografei o mural antes de alguém encontrar o envelope. Olha o canto da imagem: a pessoa estava organizando os avisos, não escondendo nada.',
  choices:[['Você percebe detalhes incríveis.',8,7,'Não tantos quanto você imagina. Mas obrigado.','Empatia'],['Podemos ampliar a foto e comparar.',6,7,'Sim. Você tem um bom olho.','Inteligência'],['Me deixa ver suas outras fotos?',4,4,'Talvez em outra ocasião.','Criatividade']],
  special:['A composição mostra que o papel já estava no mural.',10,8,'Exatamente. Eu sabia que você perceberia.','Criatividade'],
  msg:'Revelei outra foto. A luz no jardim ficou bonita hoje.'
},
 garden:{
  who:'valentim',
  clue:'Convite do ensaio de teatro',
  line:'Curioso. O texto do bilhete parece uma fala de ensaio. O clube de teatro ia anunciar uma surpresa, mas o roteiro desapareceu.',
  choices:[['Então não é uma declaração anônima?',6,5,'Uma pena, não acha?','Carisma'],['Você sabe mais do que está contando?',5,7,'Sei distinguir uma cena de um boato.','Ousadia'],['Vamos preservar a surpresa até entender tudo.',5,8,'Discrição. Uma qualidade rara por aqui.','Empatia']],
  special:['Reconheço a estrutura de uma fala teatral.',10,8,'Temos uma futura roteirista entre nós?','Criatividade'],
  msg:'Ainda lhe devo um convite. Sem roteiro desta vez.'
}

};
const encounters3={
  roof:{
    who:'ezra',
    title:'Cinco minutos de silêncio',
    line:'Eu venho aqui quando o colégio fica barulhento demais. Quer ficar um pouco?',
    yes:'Não precisa preencher todo silêncio. Esse está bom.',
    no:'Tudo bem. O terraço continua aqui.',
    attr:'Empatia'
  },
  cafe:{
    who:'theo',
    title:'O desastre da cantina',
    line:'Comprei dois sucos por engano. O universo está me mandando dividir um com você.',
    yes:'Excelente. Uma tragédia evitada graças à ciência.',
    no:'Vou aceitar meu destino de beber dois sucos.',
    attr:'Carisma'
  },
  gate:{
    who:'mabel',
    title:'O plantão das fofocas',
    line:'Scarlett está tentando impedir que a fofoca do bilhete vire uma declaração de guerra. Você acha que devemos ajudar?',
    yes:'Perfeito! Operação: impedir o caos. O que é uma novidade pra mim.',
    no:'Justo. Nem toda fofoca merece audiência.',
    attr:'Empatia'
  }
  
};

const finals3={
  dante:{
    loc:'music',
    title:'A música sem nome',
    line:'Tem uma música que escrevi hoje. Ainda não tem nome. Quer ouvir?',
    yes:'Não conta pra ninguém. Principalmente que eu fiquei nervoso.',
    no:'Outro dia. A música não vai fugir.'
  },
  soren:{
    loc:'library',
    title:'Entre páginas',
    line:'Você me ajudou sem esperar nada em troca. Gostaria de ficar aqui mais alguns minutos?',
    yes:'Então, pela primeira vez, podemos ignorar o relógio.',
    no:'Compreendo. Até amanhã.'
  },
  theo:{
    loc:'gym',
    title:'Um último arremesso',
    line:'Quer tentar uma cesta antes de ir? Prometo não rir se errar. Muito.',
    yes:'Olha só! Meu dia ficou oficialmente melhor.',
    no:'Tudo bem! Te vejo na próxima aula.'
  },
  ezra:{
    loc:'garden',
    title:'Luz de fim de tarde',
    line:'A luz está perfeita. Posso tirar uma foto sua? Só se você quiser.',
    yes:'Obrigado. Vou guardar essa com cuidado.',
    no:'Claro. Podemos só aproveitar a vista.'
  },
  valentim:{
    loc:'garden',
    title:'Fora do personagem',
    line:'Hoje eu não quero representar ninguém. Você aceitaria uma caminhada?',
    yes:'É bom conversar sem precisar ensaiar cada palavra.',
    no:'Uma resposta honesta. É o que eu mais respeito.'
  }
  
};

function start3(){
  if(!state||state.node!=='e2ending')return;
  normalize(state);
  state.episode=3;
  state.node='e3intro';
  state.loc='gate';
  update()
}

function e3Choices(e){let c=e.choices.slice();if(state.attrs[e.special[4]]>=3)c.push(e.special);return c}
function e3tile(loc,title,sub,act,id,disabled=false){return `<button class="place" data-act="${act}" data-id="${id}" ${disabled?'disabled':''}>${bg(loc)}<span>${title}<small>${sub}</small></span></button>`}
function e3map(){let phase=state.visited3.length<2?'Manhã':state.visited3.length<4?'Intervalo':'Fim de tarde';let bonus=Object.entries(encounters3).filter(([k])=>k==='gate'||(k==='cafe'&&state.visited3.length>=1)||(k==='roof'&&state.visited3.length>=2));return `<div class="map"><div class="tag">Dia 3 • Festival de Bellmont</div><h2>O mistério do envelope</h2><div class="daybar"><span class="daypill">◷ ${phase}</span><span class="daypill">✉ ${state.clues.length}/3 pistas necessárias</span></div><p>Visite os clubes e descubra a origem do bilhete. Os encontros extras surgem conforme o dia avança.</p><div class="clues">${state.clues.map(c=>`<span>✓ ${esc(c)}</span>`).join('')}</div><div class="places">${Object.entries(ep3).map(([l,e])=>e3tile(l,locs[l][0],state.visited3.includes(l)?'✓ Pista encontrada':chars[e.who].name+' • Investigar','visit3',l,state.visited3.includes(l))).join('')}${e3tile('hall','Reunir as pistas','Mínimo de três pistas','deduce3','solve',state.clues.length<3)}</div><div class="bonus"><b>✦ Encontros espontâneos</b><p class="hint">Opcionais, sem custo de energia.</p><div class="places">${bonus.map(([l,e])=>e3tile(l,e.title,state.extras3.includes(l)?'✓ Concluído':chars[e.who].name+' • Evento extra','extra3',l,state.extras3.includes(l))).join('')}</div></div></div>`}
const v3current=current;current=function(){if(state.episode!==3)return v3current();const e=ep3[state.loc],x=encounters3[state.loc],f=finals3[state.ending3];switch(state.node){case'e3intro':return dialogue('mabel','O envelope do mural virou assunto do colégio inteiro! A frase é: “Depois do sinal, a verdade vai aparecer.” Dramático demais, até para Bellmont.',null,'smile');case'e3scarlett':return dialogue('scarlett','Os clubes estão desconfiando uns dos outros. Precisamos descobrir de onde veio esse bilhete antes que a comissão cancele os ensaios.', ['Vou investigar com calma.','Deixa comigo. Adoro um mistério.','Primeiro, vamos impedir novas fofocas.']);case'e3map':return e3map();case'e3meet':return dialogue(e.who,e.line,e3Choices(e));case'e3answer':return dialogue(e.who,state.answer3,null,state.good3?'smile':'annoyed');case'e3extra':return dialogue(x.who,x.line,['Aceitar o convite.','Agradecer e continuar investigando.']);case'e3extraanswer':return dialogue(x.who,state.sceneChoice===0?x.yes:x.no,null,'smile');case'e3deduce':return dialogue('me','As pistas não mostram uma ameaça real. O que faz mais sentido?',['Era um anúncio de ensaio que perdeu o contexto.','Dante sabotou o festival.','Uma declaração de amor secreta.']);case'e3reveal':return dialogue('scarlett',state.deduction===0?'Você acertou. O clube de teatro tinha preparado uma cena-surpresa. Uma folha do roteiro foi parar no mural. O mistério está resolvido.':'O responsável pelo teatro confirmou: a folha era parte de uma cena-surpresa, não uma ameaça. Ainda bem que conferimos antes de espalhar outra fofoca.',null,'smile');case'e3select':return `<div class="map"><div class="tag">Último sinal</div><h2>Com quem passar o fim da tarde?</h2><p>Você pode escolher alguém com quem conversou hoje, ou voltar para casa.</p><div class="places">${state.visited3.map(l=>{let id=ep3[l].who;return e3tile(l,chars[id].name,stage(id),'route3',id)}).join('')}${e3tile('gate','Voltar para casa','Meu próprio caminho','route3','solo')}</div></div>`;case'e3final':return dialogue(state.ending3,f.line,['Aceitar.','Prefiro deixar para outra ocasião.']);case'e3finalanswer':return dialogue(state.ending3,state.sceneChoice===0?f.yes:f.no,null,state.sceneChoice===0?'shy':'neutral');case'e3solo':return dialogue('me','O mistério terminou. E, por hoje, uma tarde tranquila é exatamente o que eu quero.');case'e3ending':return `<div class="ending"><div class="tag">Episódio 03 concluído • Um dia em Bellmont</div><h2>${state.ending3==='solo'?'No meu ritmo':state.gallery3.includes(state.ending3)?f.title:'Até amanhã'}</h2>${state.gallery3.includes(state.ending3)?`<div class="scene" style="height:290px;margin:18px auto;max-width:540px;border-radius:14px">${bg(f.loc)}<div class="sprite">${sprite(state.ending3).replace('<svg ','<svg style="height:100%;width:auto" ')}</div></div>`:''}<p>${state.clues.length} pistas encontradas • ${state.extras3.length} encontros extras • ${state.deduction===0?'Mistério solucionado por você':'Mistério esclarecido pela comissão'}</p><p>Amanhã, Bellmont anuncia as duplas para o festival. Mabel já começou a fazer apostas.</p><div class="tag">Próximo episódio: Duplas inconvenientes • Ainda não disponível</div><p><button class="primary" data-act="gallery">Ver memórias</button> <button class="soft" data-act="home">Menu inicial</button></p></div>`;default:return e3map()}};
const v3choose=choose;
choose=function(i){
  if(state.episode!==3)return v3choose(i);
  if(!Number.isInteger(i)||i<0)return;
  switch(state.node){
    case'e3scarlett':if(i>2)return;
    state.attrs[['Inteligência','Ousadia','Empatia'][i]]++;
    state.node='e3map';
    break;
    case'e3meet':{
      const e=ep3[state.loc],
      c=e3Choices(e)[i];
      if(!c)return;
      applyChoice(e.who,c);
      state.good3=c[1]>0;
      state.answer3=c[3];
      state.node='e3answer';
      break
    }
    case'e3extra':{
      if(i>1)return;
      const e=encounters3[state.loc];
      state.sceneChoice=i;
      if(i===0){
        if(routes.includes(e.who))applyChoice(e.who,['Aceitar o encontro.',5,5,'',e.attr]);
        else state.attrs[e.attr]++;
        
      }
      state.node='e3extraanswer';
      break
    }
    case'e3deduce':if(i>2)return;
    state.deduction=i;
    if(i===0)state.attrs.Inteligência+=2;
    state.node='e3reveal';
    break;
    case'e3final':if(i>1)return;
    state.sceneChoice=i;
    if(i===0){
      applyChoice(state.ending3,['Aceitar o convite.',7,7,'','Empatia']);
      if(!state.gallery3.includes(state.ending3))state.gallery3.push(state.ending3);
      routes.filter(x=>x!==state.ending3&&state.aff[x]>=15).forEach(x=>state.jealousy[x]=clamp(state.jealousy[x]+2))
    }
    state.node='e3finalanswer';
    break;
    default:return
  }
  update()
};

const v3next=next;
next=function(){
  if(state.episode!==3)return v3next();
  switch(state.node){
    case'e3intro':state.node='e3scarlett';
    state.loc='hall';
    break;
    case'e3answer':{
      let l=state.loc,
      e=ep3[l];
      if(!state.visited3.includes(l)){
        state.visited3.push(l);
        state.clues.push(e.clue);
        state.items.push(e.clue);
        state.messages.push({
          day94:roomData11().day,who:e.who,text:e.msg
        })
      }
      state.node='e3map';
      break
    }
    case'e3extraanswer':if(!state.extras3.includes(state.loc))state.extras3.push(state.loc);
    state.node='e3map';
    break;
    case'e3reveal':state.node='e3select';
    break;
    case'e3finalanswer':case'e3solo':state.node='e3ending';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Amanhã saem as duplas do festival!! Tô fazendo uma lista de teorias.'
    });
    break;
    default:return
  }
  update()
};

const v3known=profileKnown;
profileKnown=id=>!!state&&(v3known(id)||state.visited3?.some(l=>ep3[l].who===id)||((state.node==='e3meet'||state.node==='e3answer')&&ep3[state.loc]?.who===id));

const v3side=side;side=function(){let h=v3side();if(state.episode!==3)return h;return h.replace('Acompanhe a história e escolha como reagir.',state.node==='e3map'?`${state.clues.length}/3 pistas necessárias. Explore os clubes ou encontros espontâneos.`:state.node==='e3ending'?'Episódio concluído.':'Investigue o bilhete e decida como reagir.')};
const v3modal=modal;modal=function(type){if(type==='gallery'){v3modal(type);const g=document.querySelector('#modal .gallery');if(g)g.insertAdjacentHTML('beforeend',routes.map(id=>`<div class="cg">${state.gallery3.includes(id)?`<div class="pic">${bg(finals3[id].loc)}<div class="cgperson">${sprite(id)}</div></div>`:'<div class="lock">♡</div>'}<b>${state.gallery3.includes(id)?finals3[id].title:'Episódio 03 • '+chars[id].name}<small class="memory-label">Memória de cena</small></b></div>`).join(''));return}if(type==='about'){modalType=type;showPanel('Depois do Sinal • v0.4','<p>Três episódios, cinco rotas e exploração de Bellmont. Seis cenários anime originais, encontros opcionais, investigação, opções de personalidade e música sintetizada. Funciona offline.</p><p>Os retratos masculinos foram preservados. As personagens femininas e os três fundos restantes continuam vetoriais. As memórias são composições de sprites e cenários, não CGs exclusivas.</p>');return}if(type==='stats'){v3modal(type);const panel=document.querySelector('#modal .panel');if(panel)panel.innerHTML=panel.innerHTML.replace('Novas opções serão abertas nos episódios futuros.','No episódio 03, certos atributos a partir de 3 liberam respostas especiais.');return}if(type==='saves'){modalType=type;showPanel('Seu progresso',`<p>Exporte seu progresso para conservar uma cópia ou transferir entre versões. Importar substitui o jogo atual.</p><div class="savelinks"><button class="primary" data-act="export4">Exportar salvamento</button><label>Importar arquivo JSON<input type="file" accept=".json,application/json" id="import4"></label></div><p class="hint">O armazenamento local depende do navegador e do endereço do arquivo.</p>`);return}v3modal(type)};
