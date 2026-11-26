// direcao-de-cena | v0.14
// v0.6.1 — editorial direction for the four existing episodes.
function expressionButtons(id,mood){return `<div class="moods">${Object.keys(expressionArt[id]).map(m=>`<button data-act="${id==='heroine'?'heroMood':'mood'}" data-id="${m}" aria-pressed="${m===mood}">${moodNames[m]}</button>`).join('')}</div>`;}
const sceneDialogue61=dialogue;
const editorial61={
 enc1:{dante:'neutral',soren:'annoyed',theo:'surprise',ezra:'shy',valentim:'smile'},
 enc2:{
  dante:['smile','shy','annoyed'],
  soren:['neutral','annoyed','smile'],
  theo:['smile','shy','annoyed'],
  ezra:['smile','shy','neutral'],
  valentim:['smile','surprise','neutral']
},
 final0:{dante:'smile',soren:'neutral',theo:'smile',ezra:'neutral',valentim:'smile'},
 final1:{dante:['tender','shy'],soren:['vulnerable','tender'],theo:['surprise','shy'],ezra:['shy','smile'],valentim:['shy','smile']},
 e2meet:{dante:'annoyed',soren:'annoyed',theo:'annoyed',ezra:'annoyed',valentim:'smile'},
 e2answer:{
  dante:['surprise','smile','smile'],
  soren:['smile','vulnerable','neutral'],
  theo:['smile','shy','smile'],
  ezra:['shy','smile','neutral'],
  valentim:['smile','shy','smile']
},
 e3meet:{dante:'annoyed',soren:'neutral',theo:'surprise',ezra:'neutral',valentim:'neutral'},
 e3answer:{dante:['smile','vulnerable','annoyed','surprise'],soren:['smile','vulnerable','annoyed','smile']},
 e4work:{dante:'annoyed',soren:'neutral',theo:'smile',ezra:'neutral',valentim:'neutral'},
 e4answer:{
  dante:['smile','surprise','vulnerable'],
  soren:['surprise','vulnerable','smile'],
  theo:['smile','smile','shy'],
  ezra:['surprise','smile','shy'],
  valentim:['shy','smile','smile']
}

};
function directedMood61(who,mood){const n=state.node, i=n==='e4answer'?state.e4.choice:state.sceneChoice; if(who==='me')return ({intro1:'surprise',solo:'smile',e2intro:'surprise',e2solo:'smile',e3deduce:'annoyed',e3solo:'smile'})[n]||mood;
 if(!expressionArt[who])return mood;
 const val=editorial61[n]?.[who];if(Array.isArray(val)&&val[i])return val[i];if(typeof val==='string')return val;
 if(n==='e3answer')return state.good3?'smile':'annoyed';
 if(n==='e3extraanswer')return state.sceneChoice===0?'smile':'neutral';
 if(n==='e4remember')return state.trust[who]>=15?(['dante','soren'].includes(who)?'vulnerable':'shy'):'neutral';
 if(n==='e4final')return ['dante','soren'].includes(who)?'tender':'shy';
 if(n==='e4finalanswer')return state.e4.accepted?(['dante','soren'].includes(who)?'tender':'shy'):'neutral';
 if(['e2finalanswer','e3finalanswer'].includes(n)&&state.sceneChoice===0&&['dante','soren'].includes(who))return 'tender';
 return mood;
}
dialogue=function(who,text,choices=null,mood='neutral',loc=state.loc){
  return sceneDialogue61(who,text,choices,directedMood61(who,mood),loc)
};

// The heroine has a preview studio without affecting narrative state.
const modal61=modal;modal=function(type){modal61(type);if(type==='stats'){document.querySelector('#modal .panel')?.insertAdjacentHTML('beforeend',`<div class="expression-panel"><div class="tag">Expressões da protagonista</div>${expressionButtons('heroine','neutral')}</div>`);}};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act="heroMood"]');if(!b||!state||!expressionArt.heroine[b.dataset.id])return;const panel=document.querySelector('#modal .panel');if(!panel)return;panel.querySelector('.avatar').innerHTML=avatar(state.look,b.dataset.id);panel.querySelectorAll('[data-act="heroMood"]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
});
