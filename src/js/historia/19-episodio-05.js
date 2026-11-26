// episodio-05 | v0.14
// Episode 5: a complete short branch with a mystery, an independent route and five character moments.
const roof7={
  dante:['Encontrei uma caixa de fitas atrás do piano. A letra na etiqueta parece a do bilhete.','Se alguém quer transformar música em fofoca, vai ter que passar por mim.','Eu gravava aqui porque ninguém me escutava. Mas acho que você pode ouvir.'],
  soren:['A chave do arquivo do conselho apareceu no terraço. Não deveria estar aqui.','O registro antigo menciona uma apresentação cancelada. Precisamos descobrir por quê.','Eu achava que devia seguir o roteiro de todo mundo. Você me faz questionar isso.'],
  theo:['Achei uma foto da antiga equipe, com o terraço ao fundo. Tem uma frase escrita atrás.','O pessoal acha que é pegadinha, mas alguém guardou isso por muito tempo.','Obrigado por não esperar que eu sorria o tempo todo.'],
  ezra:['Revelei a foto do bilhete. O reflexo mostra uma placa antiga do clube de fotografia.','Há um lugar no terraço que ninguém fotografa. Vamos conferir?','É estranho querer compartilhar até o silêncio com alguém.'],
  valentim:['No roteiro antigo, alguém escreveu a mesma frase do envelope.','A última cena foi cortada antes da apresentação. Talvez ela explique tudo.','Hoje não quero interpretar nada. Só conversar com você.']
};

function startRoof7(){
  if(state.node!=='e4ending')return;
  state.episode=5;
  state.e5={
    partner:null,
    decision:null,
    done:false
  };
  state.node='e5intro';
  state.loc='roof';
  state.messages.push({
    day94:roomData11().day,who:'iris',text:'A porta do terraço está aberta. Acho que encontramos uma pista de verdade.'
  });
  update()
}

const current7=current;current=function(){if(state.episode!==5){let h=current7();if(state.node==='e4ending')h=h.replace('O segredo do terraço • Em desenvolvimento','O segredo do terraço').replace('<p><button class="primary" data-act="gallery">','<p><button class="primary" data-act="startroof7">Iniciar episódio 05 ♡</button></p><p><button class="primary" data-act="gallery">');return h}let id=state.e5.partner;switch(state.node){case'e5intro':return dialogue('iris','A caixa no terraço tem o brasão antigo do colégio. Alguém deixou uma pista de propósito. Vamos descobrir o que aconteceu?');case'e5map':return `<div class="map"><div class="tag">Dia 5 • Depois do sinal</div><h2>O segredo do terraço</h2><p>Escolha alguém para investigar a caixa ou siga por conta própria.</p><div class="places">${routes.map(x=>e3tile(pairs5[x].loc,chars[x].name,'Investigar juntos','roofpick7',x)).join('')}${e3tile('roof','Investigar sozinha','Seguir minhas próprias pistas','roofpick7','solo')}</div></div>`;case'e5clue':return dialogue(id==='solo'?'me':id,id==='solo'?'Encontrei uma fotografia antiga e uma carta dentro da caixa.':roof7[id][0],null,'surprise');case'e5choice':return dialogue(id==='solo'?'me':id,id==='solo'?'A carta fala de uma apresentação cancelada. O que faço agora?':roof7[id][1],['Ler a carta com cuidado antes de falar com alguém.','Levar as pistas à comissão do festival.','Guardar a lembrança e respeitar a privacidade dos envolvidos.'],'neutral');case'e5reveal':return dialogue('cecilia','Descobrimos a verdade. A antiga comissão cancelou uma apresentação por engano. Os ex-alunos esconderam a carta para que o festival deste ano não repetisse a história. Podemos corrigir isso sem expor ninguém.',null,'smile');case'e5moment':return dialogue(id,id==='solo'?'':roof7[id][2],['Quero ficar mais um pouco com você.','Vamos voltar juntos para a comissão.'],'shy');case'e5answer':return dialogue(id==='solo'?'me':id,state.e5.romance?'Então vamos guardar este momento para nós.':'Combinado. O festival ainda precisa da gente.',null,state.e5.romance?'smile':'neutral');case'e5ending':return `<div class="ending"><div class="tag">Episódio 05 concluído</div><h2>${state.e5.romance?'Depois do último raio de sol':'Uma verdade revelada'}</h2><p>A história do terraço será lembrada no festival. Você escolheu como lidar com a verdade e com seus próprios sentimentos.</p><button class="primary" data-act="journal">Registrar no diário</button> <button class="soft" data-act="gallery">Galeria ♡</button> <button class="soft" data-act="home">Menu</button><p class="hint">Fim da versão 0.8.1 • Episódio 06 em desenvolvimento.</p></div>`;default:return '<p>Volte ao menu para continuar.</p>'}};
const next7=next;
next=function(){
  if(state.episode!==5)return next7();
  switch(state.node){
    case'e5intro':state.node='e5map';
    break;
    case'e5clue':state.node='e5choice';
    break;
    case'e5reveal':state.node=state.e5.partner==='solo'?'e5ending':'e5moment';
    if(state.e5.partner==='solo')state.e5.done=true;
    break;
    case'e5answer':state.e5.done=true;
    state.node='e5ending';
    break;
    default:return
  }
  update()
};

const choose7=choose;
choose=function(i){
  if(state.episode!==5)return choose7(i);
  const id=state.e5.partner;
  if(state.node==='e5choice'&&[0,1,2].includes(i)){
    state.e5.decision=i;
    state.attrs[['Inteligência','Ousadia','Empatia'][i]]++;
    if(!state.items.includes('Carta do antigo festival'))state.items.push('Carta do antigo festival');
    if(routes.includes(id)){
      state.trust[id]+=3;
      state.log.push({
        who:id,choice:['Ler a carta com cuidado.','Levar as pistas à comissão.','Respeitar a privacidade.'][i],aff:0,trust:3
      })
    }
    state.node='e5reveal'
  }
  else if(state.node==='e5moment'&&[0,1].includes(i)){
    state.e5.romance=i===0;
    if(i===0){
      state.aff[id]+=5;
      state.trust[id]+=3;
      state.attraction[id]=clamp(state.attraction[id]+3);
      state.e5.look={
        ...state.look
      };
      state.messages.push({
        day94:roomData11().day,who:id,text:'Obrigado pela companhia no terraço.'
      })
    }
    state.node='e5answer'
  }
  else return;
  update()
};
