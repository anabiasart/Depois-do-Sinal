// interface-mundo-e-slots | v0.14
function climate12(root){if(!root||!state)return;const w=world12(),weather=weather12(),s=season12();root.dataset.season12=s;root.dataset.weather12=weather;root.dataset.phase12=w.phase;root.classList.toggle('low12',w.low);for(const el of root.querySelectorAll('.scene,.stage10,.roomStage11,.location10')){el.classList.add('climate12');el.querySelectorAll('.weather12').forEach(x=>x.remove());if(!w.low&&roomData11().cinema&&(!el.matches('.roomStage11')||roomData11().rain)&&(weather==='Chuva'||weather==='Neve'||s==='Outono'&&w.phase!=='Noite'||s==='Primavera'&&weather==='Céu limpo')){let kind=weather==='Chuva'?'rain':weather==='Neve'?'snow':s==='Outono'?'leaves':'petals';el.querySelectorAll('.rain11').forEach(x=>x.remove());el.insertAdjacentHTML('beforeend',`<div class="weather12 ${kind}12" aria-hidden="true"></div>`)}else if(weather!=='Chuva'||w.low)el.querySelectorAll('.rain11').forEach(x=>x.remove())}}
const panel12=showPanel;showPanel=function(t,c){panel12(t,c);if(state)climate12(document.querySelector('#modal .panel'))};
const cinemaBase12=cinema11;cinema11=function(root){if(state&&world12().low){finishTyping11();return}cinemaBase12(root)};
const renderBase12=render;render=function(){renderBase12();if(!state||screen!=='game')return;let root=document.querySelector('.app'),nav=root?.querySelector('.nav'),layout=root?.querySelector('.layout'),top=root?.querySelector('.top');if(!root||!nav||!layout)return;root.classList.add('shell12');let labels={room11:['☾','Meu quarto'],city10:['⌖','Cidade'],wardrobe:['♙','Ateliê'],phone:['▣','BellPhone'],gallery:['▧','Galeria'],journal:['☷','Diário'],stats:['✦','Meu perfil'],cast:['♡','Elenco'],sound:['♫','Som'],saves:['⇩','Progresso'],home:['⌂','Menu inicial']};let ordered=['room11','city10','phone','wardrobe','journal','gallery','cast','stats','sound','saves','home'];const rail=document.createElement('aside');rail.className='rail12';rail.innerHTML='<div class="railLabel12">BELLMONT / VIDA LIVRE</div>';rail.append(nav);layout.prepend(rail);ordered.forEach(id=>{let b=nav.querySelector(`[data-act="${id}"]`);if(!b)return;let [ico,label]=labels[id];b.innerHTML=`<span class="navIcon12">${ico}</span><span>${label}</span>${id==='phone'&&unread90()?`<em>${unread90()}</em>`:''}`;nav.append(b)});nav.insertAdjacentHTML('afterbegin','<button data-act="calendar12"><span class="navIcon12">▦</span><span>Agenda</span></button><button data-act="memory12"><span class="navIcon12">✧</span><span>Memórias</span></button>');nav.insertAdjacentHTML('beforeend','<button data-act="settings12"><span class="navIcon12">⚙</span><span>Configurações</span></button>');top.insertAdjacentHTML('beforeend',`<div class="topStatus12"><button data-act="calendar12" class="dateBadge12"><b>${esc(status12())}</b><small>Dia ${roomData11().day} · ${world12().phase}</small></button><span class="coins12">✦ ${wallet8(state).coins} BC</span><button class="soft" data-act="fullscreen12" aria-label="Tela cheia">⛶</button></div>`);climate12(root)};
function settings12(){modalType='world12';let w=world12();showPanel('Configurações',`<div class="world12"><h3>Apresentação</h3><button class="soft" data-act="low12" aria-pressed="${w.low}">Modo desempenho · ${w.low?'Ligado':'Desligado'}</button><button class="soft" data-act="fullscreen12">Tela cheia</button><p>O modo desempenho remove partículas, animações e desfoques, sem alterar a arte.</p><button class="soft" data-act="sound">Trilha e som</button><button class="soft" data-act="saves">Exportar / importar progresso</button><h3>Salvamentos independentes</h3><div class="slots12">${[1,2,3].map(i=>{let s=readSlot12(i);return `<article><b>Slot ${i}</b><p>${s?esc(s.name)+' · Episódio '+s.episode+' · Dia '+(s.room11?.day||1):'Vazio'}</p><button class="soft" data-act="slotSave12" data-i="${i}">Salvar</button><button class="soft" data-act="slotLoad12" data-i="${i}" ${s?'':'disabled'}>Carregar</button></article>`}).join('')}</div><button class="soft" data-act="history12">Histórico de escolhas</button></div>`)}
function readSlot12(i){try{return prepareSave14(JSON.parse(localStorage.getItem(key+':slot:'+i)))}catch{return null}}
function history12(){modalType='world12';showPanel('Histórico de escolhas',`<div class="world12">${state.log.slice().reverse().map(x=>`<article class="memory12"><b>${esc(name90(x.who))}</b><p>${esc(x.choice||'')}</p></article>`).join('')||'<p>Nenhuma escolha registrada.</p>'}</div>`)}
function reuse12(html){
  return compactMedia14(html)
}
const spriteBase12=sprite;
sprite=function(id,m='neutral',custom=null){
  return reuse12(spriteBase12(id,m,custom))
};
const bgBase12=bg;
bg=function(id){
  return reuse12(bgBase12(id))
};

const cover12=cover;cover=function(){return cover12().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.12 • Entre o Acaso e o Amor')};
const modal12=modal;
modal=function(t){
  if(t==='calendar12')return calendar12();
  if(t==='memory12')return memoryPanel12();
  if(t==='settings12')return settings12();
  return modal12(t)
};

document.addEventListener('click',e=>{
  let b=e.target.closest('[data-act]');if(!b||b.disabled||!state)return;let a=b.dataset.act,id=b.dataset.id,i=Number(b.dataset.i);if(!['calendar12','memory12','settings12','phase12','advance12','month12','calpick12','routine12','routineReply12','low12','fullscreen12','slotSave12','slotLoad12','history12'].includes(a))return;e.stopImmediatePropagation();switch(a){
    case'calendar12':monthOffset12=0;selectedDay12=null;calendar12();break;case'memory12':memoryPanel12();break;case'settings12':settings12();break;case'phase12':{
      let city=modalType==='city10';setPhase12(id);render();city?cityPanel10():calendar12();break
    }
    case'advance12':{
      let city=modalType==='city10',idx=phases12.indexOf(world12().phase);if(idx===2)nextDay12();else{
        setPhase12(phases12[idx+1]);render()
      }
      selectedDay12=null;monthOffset12=0;city?cityPanel10():calendar12();break
    }
    case'month12':monthOffset12=Math.max(-120,Math.min(120,monthOffset12+i));calendar12();break;case'calpick12':selectedDay12=i;calendar12();break;case'routine12':routinePanel12(id);break;case'routineReply12':finishRoutine12(i);break;case'low12':world12().low=!world12().low;persist();render();settings12();break;case'fullscreen12':try{
      const p=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();p?.catch(()=>toast('Tela cheia indisponível.'))
    }
    catch{
      toast('Tela cheia indisponível.')
    }
    break;case'slotSave12':if(![1,2,3].includes(i))return;if(readSlot12(i)&&!confirm('Substituir o conteúdo deste slot?'))return;try{
      localStorage.setItem(key+':slot:'+i,JSON.stringify(state));toast('Slot salvo.');settings12()
    }
    catch{
      toast('Armazenamento indisponível. Exporte o progresso.')
    }
    break;case'slotLoad12':{
      let s=readSlot12(i);if(!s||!confirm('Carregar este slot e substituir a sessão atual?'))return;state=normalize(s);scene10=null;activeRoutine12=null;modalType=null;document.getElementById('modal').innerHTML='';persist();render();break
    }
    case'history12':history12();break
  }
  
},true);
