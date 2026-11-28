// episodio-01-motor | v0.14
function current(){const n=state.node,e=encounters[state.loc],f=finals[state.ending];switch(n){case 'intro0':return dialogue(null,'Meu primeiro dia em Bellmont. Um colégio novo, pessoas novas, e a sensação de que eu vou me perder pelo menos três vezes antes do almoço.');case 'intro1':return dialogue('me','Respira. Hoje é só o começo. Escolhe uma roupa, pega a mochila e tenta não criar inimigos antes da primeira aula.');case 'gate0':return dialogue(null,'Os portões de Bellmont parecem a entrada de um filme. Antes que você consiga encontrar a secretaria, alguém acena para você.');case 'gate1':return dialogue('mabel','Você é a novata! Eu sou Mabel. Tenho duas missões hoje: te mostrar o colégio e descobrir se o café da cantina é realmente comestível.', ['Aceito as duas missões.','Só se você prometer me salvar das fofocas.','Obrigada, acho que consigo me virar.'],'smile');case 'gate2':return dialogue('mabel',state.flags.mabel===0?'Excelente. Finalmente uma pessoa sensata!':state.flags.mabel===1?'Das fofocas? Eu sou a fonte. Mas vou tentar.':'Independente. Gostei! Mas pega meu número mesmo assim. ',null,'smile');case 'gate3':return dialogue('mabel','A aula acabou mais cedo por causa dos preparativos do festival. Você pode conhecer os clubes antes do último sinal. Ah, e cuidado com a Scarlett. Ela leva o festival muito a sério.',null,'smile');case 'map':return mapView();case 'enc0':return dialogue(null,e.intro);case 'enc1':return dialogue(e.who,e.line,e.choices);case 'enc2':return dialogue(e.who,e.choices[state.sceneChoice][3],null,e.choices[state.sceneChoice][1]>0?'smile':'annoyed');case 'enc3':return dialogue(null,e.extra+' Você guardou o objeto como lembrança do primeiro dia.');case 'scarlett':return dialogue('scarlett','Então você é a aluna nova. Mabel já falou de você. O festival está chegando e eu preciso de gente competente. Espero que não seja só mais uma distração.', ['Pode contar comigo.','Isso depende do que você está planejando.','Não prometo nada.']);case 'scarlett2':return dialogue('scarlett',['Ótimo. Vou cobrar essa promessa.','Gostei. Pelo menos você faz perguntas.','Sincera. Espero que seja igualmente responsável.'][state.flags.scarlett],null,'smile');case 'select':return `<div class="map"><div class="tag">Fim de tarde</div><h2>Antes de ir embora...</h2><p>Você tem tempo para mais um encontro. Quem ficou na sua cabeça?</p><div class="places">${state.visited.map(l=>{let id=encounters[l].who;return `<button class="place" data-act="route" data-id="${id}">${bg(l)}<span>${chars[id].name}<small>Afinidade ${state.aff[id]>0?'+':''}${state.aff[id]} • Confiança ${state.trust[id]}</small></span></button>`}).join('')}<button class="place" data-act="route" data-id="solo">${bg('gate')}<span>Ir para casa<small>Escolher meu próprio caminho</small></span></button></div></div>`;case 'final0':return dialogue(state.ending,f.line,f.choices);case 'final1':return dialogue(state.ending,f.choices[state.sceneChoice][3],null,f.choices[state.sceneChoice][1]>0?'shy':'annoyed');case 'solo':return dialogue('me','Não preciso decidir nada hoje. Bellmont ainda é um mistério, e eu tenho muito tempo para descobrir o que quero.');case 'ending':return `<div class="ending"><div class="tag">Episódio 01 concluído</div><h2>${state.ending==='solo'?'Meu próprio caminho':esc(f.title)}</h2><p>${state.ending==='solo'?'O seu primeiro dia foi só o começo.':`Você escolheu passar os últimos minutos do dia com ${chars[state.ending].name}. ${state.aff[state.ending]>=12?'A química entre vocês ficou difícil de ignorar.':'O encontro deixou espaço para novas possibilidades.'}`}</p><p>À noite, uma mensagem de Mabel chega: “Você não vai acreditar no que aconteceu depois que você saiu. Amanhã te conto TUDO.”</p><div class="tag">Continua no episódio 02 • Péssimas primeiras impressões</div><p class="hint">${state.visited.length}/5 encontros • ${state.items.length} lembranças • ${state.gallery.length} cena desbloqueada</p><button class="primary" data-act="episode2">Jogar episódio 02 ›</button> <button class="soft" data-act="gallery">Ver galeria</button> <button class="soft" data-act="home">Menu inicial</button></div>`;default:return mapView()}}
function render(){let root=document.getElementById('root');if(screen==='cover'){root.innerHTML=cover();return;}root.innerHTML=`<div class="app"><header class="top"><div><div class="brand">Depois do Sinal</div><div class="sub">Colégio Bellmont</div></div><nav class="nav"><button data-act="wardrobe">♙ Guarda-roupa</button><button data-act="phone">▣ Celular${state.messages.length?' ('+state.messages.length+')':''}</button><button data-act="gallery">▧ Galeria</button><button data-act="journal">☷ Diário</button><button data-act="stats">✦ Perfil</button><button data-act="cast">♡ Elenco</button><button data-act="sound">♫ Som</button><button data-act="saves">⇩ Progresso</button><button data-act="home">⌂ Menu</button></nav></header><div class="layout"><main class="main"><div class="episode"><span>${state.episode===3?'EPISÓDIO 03 / ALGUÉM DEIXOU UM BILHETE':state.episode===2?'EPISÓDIO 02 / PÉSSIMAS PRIMEIRAS IMPRESSÕES':'EPISÓDIO 01 / A GAROTA NOVA'}</span><span>${esc(state.name)} • ${state.episode===3?state.visited3.length:state.episode===2?state.visited2.length:state.visited.length}/5 encontros</span></div>${current()}<div class="foot">Bellmont • Protótipo independente • Todas as escolhas ficam salvas automaticamente</div></main>${side()}</div></div>`;}
function update() {
    if (state) {
        addOutfitComment();
        grant8(state);
        seed7();
    }
    persist();
    render();
}
function next(){
  const n=state.node;
  switch(n){
    case'intro0':state.node='intro1';
    break;
    case'intro1':state.node='gate0';
    state.loc='gate';
    break;
    case'gate0':state.node='gate1';
    break;
    case'gate2':state.node='gate3';
    break;
    case'gate3':state.node='map';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Bem-vinda a Bellmont! Não esquece de me contar quem você conhecer. 💗'
    });
    break;
    case'enc0':state.node='enc1';
    break;
    case'enc2':state.node='enc3';
    break;
    case'enc3':{
      const e=encounters[state.loc];
      if(!state.visited.includes(state.loc)){
        state.visited.push(state.loc);
        state.items.push(e.gift);
        state.messages.push({
          day94:roomData11().day,who:e.who,text:e.msg
        });
        
      }
      state.node='map';
      break;
      
    }
    case'scarlett2':state.node='select';
    break;
    case'final1':if(!state.gallery.includes(state.ending))state.gallery.push(state.ending);
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Você não vai acreditar no que aconteceu depois que você saiu. Amanhã te conto TUDO.'
    });
    state.node='ending';
    break;
    case'solo':state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Você não vai acreditar no que aconteceu depois que você saiu. Amanhã te conto TUDO.'
    });
    state.node='ending';
    break;
    
  }
  update()
}

function choose(i){if(!Number.isInteger(i)||i<0)return;const n=state.node;if(n==='gate1'&&i<3){state.flags.mabel=i;state.node='gate2';}else if(n==='scarlett'&&i<3){state.flags.scarlett=i;state.node='scarlett2';}else if(n==='enc1'||n==='final0'){const e=n==='enc1'?encounters[state.loc]:finals[state.ending],who=n==='enc1'?e.who:state.ending,c=e.choices[i];if(!c)return;state.aff[who]+=c[1];state.trust[who]+=c[2];state.log.push({who,choice:c[0],aff:c[1],trust:c[2]});state.sceneChoice=i;state.node=n==='enc1'?'enc2':'final1';toast(`${chars[who].name}: afinidade ${c[1]>=0?'+':''}${c[1]} • confiança ${c[2]>=0?'+':''}${c[2]}`);}update()}
