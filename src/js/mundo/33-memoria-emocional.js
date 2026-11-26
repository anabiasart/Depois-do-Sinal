// memoria-emocional | v0.14
const personality12={
  dante:['Irônico e reservado','Mais espontâneo','Baixa a guarda com você'],
  soren:['Formal e metódico','Mais paciente','Admite quando precisa de ajuda'],
  theo:['Brincalhão','Atento ao seu humor','Consegue mostrar seu lado vulnerável'],
  ezra:['Observador e silencioso','Compartilha pequenas descobertas','Fala com mais abertura'],
  valentim:['Cortês e teatral','Menos ensaiado','Permite-se ser sincero'],
  raven:['Investigativa e provocadora','Compartilha suas ideias','Deixa a ironia de lado']
};

const routineTalk12={
  dante:['Tô escolhendo um disco. O problema de gostar de música é que sempre aparece outro.','Quer ouvir uma faixa comigo?','Boa. Essa vai entrar na nossa lista.'],
  soren:['Não coloquei esta pausa no cronograma. Talvez seja uma evolução.','Quer escolher um livro juntos?','Gostei da escolha. Vou lembrar.'],
  theo:['Hoje eu prometi a mim mesmo que não transformaria tudo em competição.','Quer dar uma volta sem pressa?','É bom fazer algo só por fazer.'],
  ezra:['A luz daqui está diferente hoje.','Quer me ajudar a escolher um enquadramento?','Você percebe coisas que eu não percebo.'],
  valentim:['Finalmente um intervalo sem ensaio.','Quer conversar um pouco, sem roteiro?','Foi uma companhia muito agradável.'],
  raven:['Hoje não estou entrevistando ninguém. Prometo.','Quer dividir uma mesa e conversar?','Gosto desses momentos sem manchetes.']
};

const memoryAsk12={
  dante:'Pergunta aleatória: que tipo de dia você mais gosta?',
  soren:'Uma curiosidade fora do cronograma: qual clima você prefere?',
  theo:'Pesquisa importantíssima: dia de sol, chuva ou frio?',
  ezra:'Qual luz você prefere ver pela janela?',
  valentim:'Se pudesse escolher o cenário de um passeio, que clima teria?',
  raven:'Pergunta sem valor jornalístico: qual clima te deixa mais à vontade?'
};

const memoryRecall12={
  dante:'Você falou que gosta de',
  soren:'Lembrei que você prefere',
  theo:'Ei! Eu lembrei que você gosta de',
  ezra:'Fiquei pensando no que me contou sobre',
  valentim:'Guardei uma pequena informação: você gosta de',
  raven:'Uma informação que guardei, sem escrever no jornal: você gosta de'
};

function mem12(id,s=state){let w=world12(s);if(!w.mem[id]||typeof w.mem[id]!=='object')w.mem[id]={};return w.mem[id]}
function syncMemory12(){if(!state)return;const day=roomData11().day;for(let id of people12){let m=mem12(id);let log=(state.log||[]).filter(x=>x.who===id);let last=log.at(-1);if(last&&typeof last.choice==='string'&&(m.lastChoice!==last.choice||m.choiceCount!==log.length)){m.lastChoice=last.choice;m.choiceDay=day;m.choiceCount=log.length;m.lastEffect=Number(last.aff)||0}if(!last&&m.lastChoice)delete m.lastChoice;}
 for(const [i,m] of state.messages.entries()){
  if(!m.memory12||!state.replied[i])continue;
  const r=state.replied[i];
  const val={
    'Gosto de dias chuvosos.':'chuva',
    'Prefiro dias de sol.':'sol',
    'Adoro dias frios.':'frio',
    'Não tenho uma preferência.':'nenhuma'
  }
  [r.text];
  if(m.memory12==='ask'&&val&&!mem12(m.who).preference){
    Object.assign(mem12(m.who),{
      preference:val,prefDay:day
    })
  }
  if(m.memory12==='recall'&&r.text==='Prefiro conversar em outro momento.'&&mem12(m.who).lastSpaceReply!==i){
    mem12(m.who).spaceUntil=day+2;
    mem12(m.who).lastSpaceReply=i;
    
  }
  
}

}
function emotional12(id){
  let m=mem12(id),
  t=state.trust[id]||0,
  a=state.aff[id]||0;
  return m.spaceUntil>=roomData11().day?'Respeitando seu espaço':a<0?'Mais distante':personality12[id][t>=25?2:t>=10?1:0]
}

const oldPersist12=persist;persist=function(){if(state)syncMemory12();oldPersist12()};
const oldSeed12=seed90;seed90=function(){let changed=oldSeed12();syncMemory12();let w=world12(),day=roomData11().day;if(w.sentDays.includes(day))return changed;let ids=people12.filter(id=>profileKnown(id)&&(state.trust[id]||0)>=5).sort((a,b)=>(mem12(a).lastSent||0)-(mem12(b).lastSent||0)||(state.trust[b]||0)-(state.trust[a]||0));ids.sort((a,b)=>Number(!!(mem12(b).preference&&!mem12(b).recalled&&day>mem12(b).prefDay))-Number(!!(mem12(a).preference&&!mem12(a).recalled&&day>mem12(a).prefDay)));for(const id of ids){let m=mem12(id);if(m.spaceUntil>=day)continue;let text='',flag='',kind='';if(m.preference&&m.preference!=='nenhuma'&&day>m.prefDay&&!m.recalled){const match={chuva:weather12()==='Chuva',sol:weather12()==='Céu limpo',frio:season12()==='Inverno'}[m.preference];if(match||day>=m.prefDay+3){text=memoryRecall12[id]+' '+m.preference+'. '+(match?'O dia de hoje me fez lembrar de você.':'Queria saber como está seu dia.');flag='mem12:recall:'+id;kind='recall';}}
 if(!text&&!m.preference&&!state.flags['mem12:ask:'+id]){text=memoryAsk12[id];flag='mem12:ask:'+id;kind='ask'}
 if(!text&&m.lastChoice&&day>m.choiceDay&&m.choiceCount!==m.recalledChoice){
  text=(m.lastEffect<0?'Fiquei pensando na nossa conversa. Acho que podemos tentar nos entender melhor.':'Lembrei de uma coisa que você me disse: “'+m.lastChoice+'”. Foi um momento que ficou comigo.');
  flag='mem12:choice:'+id+':'+m.choiceCount;
  kind='recall';
  
}

 if(text&&push90(flag,id,text,{memory12:kind,day94:day,day90:day})){if(flag.includes(':recall:'))m.recalled=true;if(flag.includes(':choice:'))m.recalledChoice=m.choiceCount;m.lastSent=day;w.sentDays.push(day);return true}}
 return changed};
const oldReplies12=replies90;
replies90=function(id,m){
  if(m.memory12==='ask')return [['Gosto de dias chuvosos.','Vou lembrar disso.',1,2,'Empatia'],['Prefiro dias de sol.','Está anotado na memória.',1,2,'Carisma'],['Adoro dias frios.','Interessante. Vou guardar esse detalhe.',1,2,'Criatividade'],['Não tenho uma preferência.','Justo. Cada dia tem seu charme.',0,1,'Carisma']];
  if(m.memory12==='recall')return [['Você realmente se lembrou!','Presto atenção no que você diz.',2,3,'Empatia'],['Também gostei de conversar com você.','Foi bom dividir aquele momento.',1,2,'Carisma'],['Prefiro conversar em outro momento.','Claro. Respeito seu tempo.',0,0,'Empatia']];
  return oldReplies12(id,m)
};

const oldPush12=push90;push90=function(flag,who,text,extra={}){return oldPush12(flag,who,text,{...extra,day94:roomData11().day})};
const oldThread12=thread90;thread90=function(id){let html=oldThread12(id);if(people12.includes(id))html=html.replace('</small></div><span class="intimacy95">',`<br>${esc(emotional12(id))}</small></div><span class="intimacy95">`);return html};
