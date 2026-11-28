// cinematica | v0.14
// Lightweight compositor effects, no per-frame canvas or animated image decoding.
let typing11=null;
function finishTyping11(){
  if(!typing11)return;
  let q=typing11;
  typing11=null;
  cancelAnimationFrame(q.raf);
  if(q.el.isConnected){
    q.el.textContent=q.text;
    q.button.remove()
  }
  
}

function animateText11(el){if(!el||!state||!roomData11().typing||matchMedia('(prefers-reduced-motion: reduce)').matches)return;finishTyping11();const text=el.textContent;if(!text||text.length<10)return;const button=document.createElement('button');button.className='soft typeSkip11';button.textContent='Mostrar texto';button.setAttribute('aria-label','Mostrar diálogo completo');button.addEventListener('click',finishTyping11);el.after(button);el.textContent='';const q={el,text,button,raf:0};typing11=q;let start=performance.now(),last=-1;function frame(t){if(typing11!==q||!el.isConnected){if(typing11===q)typing11=null;return}let n=Math.min(text.length,Math.floor((t-start)/12)+1);if(n!==last){el.textContent=text.slice(0,n);last=n}if(n>=text.length)finishTyping11();else q.raf=requestAnimationFrame(frame)}q.raf=requestAnimationFrame(frame)}
function cinema11(root){if(!root||!state)return;let r=roomData11();root.classList.toggle('cinema11',r.cinema);const stage=root.querySelector('.scene,.stage10');if(r.cinema&&stage){stage.classList.add('film11');if(r.rain&&(state.loc==='bedroom'&&!root.querySelector('.stage10')||cityData10().time==='Noite'&&root.querySelector('.stage10'))&&!stage.querySelector('.rain11'))stage.insertAdjacentHTML('beforeend','<div class="rain11" aria-hidden="true"></div>')}animateText11(root.querySelector('.dialog p,.sceneTalk10 p'))}
function renderRoomNavigation() {
    if(!state||screen!=='game')return;const nav=document.querySelector('.nav');if(nav&&!nav.querySelector('[data-act="room11"]'))nav.insertAdjacentHTML('afterbegin','<button data-act="room11">☾ Quarto</button>');cinema11(document.querySelector('.main'))
}
const panel11base=showPanel;
showPanel=function(title,content){
  finishTyping11();
  panel11base(title,content);
  if(modalType==='scene10')cinema11(document.querySelector('#modal .panel'))
};

const cover11base=cover;cover=function(){return cover11base().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.11 • Refúgio de Bellmont')};
// Opening an existing app from the room does not change narrative state.
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||b.disabled||!state)return;let a=b.dataset.act;if(!['room11','roomDiary11','roomPhone11','roomGallery11','roomWard11','roomDecor11','roomItems11','roomRest11','roomNoteSave11','roomToggle11','roomSound11','roomEquip11'].includes(a))return;e.stopImmediatePropagation();let r=roomData11();switch(a){
    case'room11':roomPanel11();break;case'roomDiary11':modal('journal');break;case'roomPhone11':modal('phone');break;case'roomGallery11':gallery10();break;case'roomWard11':modal('wardrobe');break;case'roomDecor11':roomDecorPanel11();break;case'roomItems11':roomItemsPanel11();break;case'roomRest11':roomRest11();break;case'roomNoteSave11':{
      let text=document.querySelector('#roomNote11')?.value.trim();if(!text)return;const item=r.entries.find(x=>x.day===r.day);if(item)item.text=text;else r.entries.push({
        day:r.day,text
      });persist();roomPanel11();toast('Página guardada.');break
    }
    case'roomToggle11':if(['rain','cinema','typing'].includes(b.dataset.id)){
      r[b.dataset.id]=!r[b.dataset.id];persist();roomPanel11()
    }
    break;case'roomSound11':modal('sound');break;case'roomEquip11':{
      let id=b.dataset.id;if(!roomDecor11[id]||state.episode<roomDecor11[id][2])return;r.decor=r.decor.includes(id)?r.decor.filter(x=>x!==id):[...r.decor,id];persist();roomDecorPanel11();break
    }
    
  }
  
},true);
