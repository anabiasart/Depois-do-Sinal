// calendario-clima-rotina | v0.14
/* v0.12 — Entre o Acaso e o Amor. Additive migration: existing saves remain valid. */
const people12=['dante','soren','theo','ezra','valentim','raven'];
const phases12=['Manhã','Tarde','Noite'];
const epoch12=Date.UTC(2026,2,20),dayMs12=86400000;
const schedule12={
  dante:['Colégio · sala de aula','records','Ensaio em casa'],
  soren:['Conselho estudantil','books','Estudando em casa'],
  theo:['Colégio · quadra','park','Treino e descanso'],
  ezra:['Biblioteca','art','Editando fotografias'],
  valentim:['Colégio · auditório','Ensaio teatral','theatre'],
  raven:['Jornal escolar','cafe','Escrevendo em casa']
};

const away12={
  dante:['Clube de música','Ensaio fechado','Descanso'],
  soren:['Reunião do conselho','Compromisso familiar','Estudando em casa'],
  theo:['Treino','Treino do time','Descanso'],
  ezra:['Arquivo de fotografia','Projeto fotográfico','Editando fotografias'],
  valentim:['Ensaio','Compromisso de teatro','Ensaio fechado'],
  raven:['Redação','Entrevista externa','Escrevendo em casa']
};

const weekdays12=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const datesFmt12=new Intl.DateTimeFormat('pt-BR',{day:'numeric',month:'long',timeZone:'UTC'});
function world12(s=state){
  let w=s.world12;
  if(!w||typeof w!=='object'||Array.isArray(w))w=s.world12={
    
  };
  const r=roomData11(s);
  if(!phases12.includes(w.phase))w.phase=cityData10(s).time==='Noite'?'Noite':r.time==='morning'?'Manhã':'Tarde';
  if(!w.mem||typeof w.mem!=='object')w.mem={
    
  };
  if(!Array.isArray(w.routineDone))w.routineDone=[];
  if(!Array.isArray(w.weatherDone))w.weatherDone=[];
  if(!Array.isArray(w.sentDays))w.sentDays=[];
  if(typeof w.low!=='boolean')w.low=false;
  return w
}

const norm12=normalize;normalize=function(s){norm12(s);world12(s);return s};
function date12(day=roomData11().day){return new Date(epoch12+(day-1)*dayMs12)}
function season12(day=roomData11().day){
  let m=date12(day).getUTCMonth();
  return m>=2&&m<=4?'Primavera':m>=5&&m<=7?'Verão':m>=8&&m<=10?'Outono':'Inverno'
}

function weather12(day=roomData11().day){let s=season12(day),n=(day*17+Math.floor(day/7)*11)%10;return s==='Inverno'?(n<4?'Neve':n<7?'Nublado':'Céu limpo'):s==='Outono'?(n<4?'Chuva':n<8?'Nublado':'Céu limpo'):s==='Verão'?(n<2?'Chuva':n<4?'Nublado':'Céu limpo'):(n<4?'Chuva':n<6?'Nublado':'Céu limpo')}
function when12(id,day=roomData11().day,phase=world12().phase){
  let k=phases12.indexOf(phase),
  i=people12.indexOf(id);
  return (day+i*2)%7===0?away12[id][k]:schedule12[id][k]
}

function place12(x){return city10[x]?.name||x}
function status12(day=roomData11().day){return `${weekdays12[date12(day).getUTCDay()]}, ${datesFmt12.format(date12(day))} · ${season12(day)} · ${weather12(day)}`}
function setPhase12(p){
  if(!phases12.includes(p))return;
  world12().phase=p;
  cityData10().time=p==='Noite'?'Noite':'Tarde';
  roomData11().time=p==='Noite'?'night':'morning';
  persist()
}

function nextDay12(){roomData11().day++;setPhase12('Manhã');render();toast('Novo dia em Bellmont.');}
const oldRest12=roomRest11;
roomRest11=function(){
  if(world12().phase!=='Noite'){
    setPhase12('Noite');
    roomPanel11()
  }
  else{
    nextDay12();
    roomPanel11()
  }
  
};

const oldDate12=canDate10;
canDate10=function(id){
  let c=city10[id];
  return !!(c?.who&&world12().phase===c.time&&when12(c.who)===id&&oldDate12(id))
};

const oldGroup12=canGroup10;canGroup10=function(id){return world12().phase===city10[groups10[id]?.loc]?.time&&oldGroup12(id)};
