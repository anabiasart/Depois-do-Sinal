// polimento-e-relacionamentos | v0.14
/* v0.9.2: verified start flow, compact DOM image references, readable relationship cards and diary */
const thumbs92={"uniforme":ASSETS14[343],"cardigan":ASSETS14[344],"jaqueta":ASSETS14[345],"casual":ASSETS14[346],"festival":ASSETS14[347]};
function catalogThumb92(id){return `<img alt="${esc(signatureNames83[id])}" decoding="async" loading="lazy" width="176" height="264" src="${mediaURL14(thumbs92[id],'image/webp')}">`}
// The image files remain embedded for offline play; DOM references are short and reused.
function compact92(html){return compactMedia14(html)}
const show92=showPanel;
showPanel=function(title,content){if(['new','wardrobe'].includes(modalType))content=compact92(content);return show92(title,content)};
const draw92base=drawWard7;
drawWard7=function(){
  const old=document.querySelector('#modal .fashionpanel9');
  const scroll=old?.scrollTop||0;
  draw92base();
  const panel=document.querySelector('#modal .fashionpanel9');
  if(panel)panel.scrollTop=scroll;
  
};

// Keep portrait zoom and expression changes local: no need to rebuild the whole catalogue.
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled||!draft||!['new','wardrobe'].includes(modalType)||style83(draft.look)!=='signature')return;const a=b.dataset.act;if(!['pose83','zoom9','color9','preset9','bg9'].includes(a))return;const mirror=document.querySelector('#modal .signature83 .mirrorart9');if(!mirror)return;const id=b.dataset.id,k=b.dataset.key;if(a==='color9'&&!palettes9[k]?.some(x=>x[0]===id))return;if(a==='preset9'&&!presets9[id])return;e.stopImmediatePropagation();keepName8();if(a==='pose83')preview7=id;if(a==='zoom9')pose9=id;if(a==='color9')draft.look[k]=id;if(a==='preset9'){draft.look.outfit=id;draft.look.fashion={...draft.look.fashion,...presets9[id]}}if(a==='bg9'){photoBg9=id;mirror.className='mirrorart9 bg9-'+id}mirror.innerHTML=compact92(signatureArt83(draft.look,preview7,pose9==='face'));document.querySelectorAll(`#modal [data-act="${a}"]`).forEach(x=>{if(a!=='color9'||x.dataset.key===k)x.setAttribute('aria-pressed',String(x.dataset.id===id));if(a==='preset9'){const tag=x.querySelector('.lookimg83>span');if(tag)tag.textContent=x.dataset.id===id?'EM USO':'COLEÇÃO 01'}});if(a==='preset9'){const title=document.querySelector('.caption83 b');if(title)title.textContent=signatureNames83[id]}if(a==='bg9'||(a==='preset9'&&tab9==='challenge'))drawWard7();},true);
function metric92(id,k,mini=false){const n=Number(state[k]?.[id])||0,signed=k==='aff'||k==='trust';const cap=Math.min(100,Math.max(signed?-100:0,n));let w=signed?Math.abs(cap)/2:cap,left=signed?(cap<0?50-w:50):0;const color=cap<0?'#9d7a9c':({aff:'#be638b',trust:'#7097a7',attraction:'#a173af',jealousy:'#c69b5b'}[k]);const names={aff:'Afinidade',trust:'Confiança',attraction:'Atração',jealousy:'Ciúmes'};return `<div class="rel92"><div class="rel92head"><b>${names[k]}</b><strong>${signed&&n>0?'+':''}${n} pts</strong></div><div class="rel92track" role="img" aria-label="${names[k]}: ${n} pontos">${signed?'<em></em>':''}<i style="left:${left}%;width:${w}%;background:${color}"></i></div>${mini?'':`<small>${({aff:'Proximidade e compatibilidade.',trust:'Segurança e abertura emocional.',attraction:'Interesse romântico.',jealousy:'Tensão, não prova de amor.'})[k]}</small>`}</div>`}
const known92base=profileKnown;
profileKnown=function(id){
  return !!state&&(known92base(id)||state.log.some(x=>x.who===id)||state.messages.some(x=>x.who===id)||(state.known2||[]).includes(id))
};

const oldSide92=side;side=function(){let html=oldSide92();const tmp=document.createElement('template');tmp.innerHTML=html;tmp.content.querySelectorAll('.person').forEach(b=>{let id=b.dataset.id;const info=b.querySelector('.info');if(info)info.innerHTML=`<div class="pname"><b>${chars[id].name}</b></div>${metric92(id,'aff',true)}<div class="tiny">${stage(id)} · confiança ${state.trust[id]||0}</div>`});return tmp.innerHTML};
const showProfile92base=showProfile;showProfile=function(id,m='neutral'){showProfile92base(id,m);const p=document.querySelector('#modal .panel');if(!p||!profileKnown(id))return;const stats=p.querySelectorAll('.profilehero .statline');if(stats.length){stats[0].insertAdjacentHTML('beforebegin',`<h3>Seu vínculo com ${chars[id].name}</h3><p class="hint">Pontos acumulados, não porcentagens. O centro representa zero em afinidade e confiança.</p>${['aff','trust','attraction','jealousy'].map(k=>metric92(id,k)).join('')}`);stats.forEach(x=>x.remove())}};
const journal92base=diaryPanel7;
const impressions92={
  dante:['Dante parece gostar de testar a paciência de todo mundo. Ainda não sei se isso é defesa ou só o jeito dele.','Ele não é tão indiferente quanto tenta parecer. Talvez eu esteja começando a entender seu jeito de se importar.'],
  soren:['Soren parece ter uma agenda até para respirar. Fico imaginando como é conversar com ele quando não há uma obrigação pela frente.','Hoje percebi que, por trás de tanta disciplina, existe alguém que também precisa de espaço para ser ouvido.'],
  theo:['Theo tem um jeito de tornar as coisas mais leves. Quero conhecer a pessoa por trás de tantas brincadeiras.','É bom estar perto dele sem sentir que precisamos transformar tudo em piada.'],
  ezra:['Ezra percebe detalhes que passam despercebidos por mim. Tenho curiosidade de saber o que ele vê em Bellmont.','O silêncio com Ezra começa a parecer menos estranho e mais confortável.'],
  valentim:['Valentim sabe escolher as palavras. Ainda quero descobrir quando ele fala de verdade, sem interpretar um papel.','Acho interessante quando ele deixa a pose elegante de lado e simplesmente conversa comigo.']
};

function diaryEntries92(){
  return romance93().filter(id=>profileKnown(id)).map(id=>{
    const n=state.trust[id]||0,aff=state.aff[id]||0,log=state.log.filter(x=>x.who===id),last=log.at(-1);let text=aff<0?'Nossa convivência não tem sido das mais fáceis. Talvez eu precise de um pouco de distância para entender o que aconteceu.':impressions92[id][n>=15?1:0];if(last)text+=' Minha última escolha com '+(id==='raven'?'ela':'ele')+' foi: “'+last.choice+'”.';return {
      id,text
    }
    
  })
}

function diaryNotes92(){state.personal92=state.personal92||{};return `<p class="hint">Impressões da protagonista geradas a partir dos encontros e escolhas. Escreva também suas próprias lembranças; tudo fica salvo.</p>${diaryEntries92().map(({id,text})=>`<article class="letter92"><span class="tag">MEU DIÁRIO · ${esc(stage(id))}</span><h3>Sobre ${chars[id].name}...</h3><p>${esc(text)}</p><label for="note92-${id}">Minha anotação pessoal</label><textarea id="note92-${id}" maxlength="3000" placeholder="O que senti hoje...">${esc(state.personal92[id]||'')}</textarea><button class="soft" data-act="save92note" data-id="${id}">Guardar anotação ♡</button></article>`).join('')||'<p>Conheça alguém em Bellmont para escrever a primeira página.</p>'}`}
diaryPanel7=function(){if(diary7==='boys92'){modalType='journal';showPanel('Diário de Bellmont',`<div class="tabs7">${Object.entries({overview:'Resumo',relations:'Relações',boys92:'Sobre meus vínculos',clues:'Lembranças e pistas',history:'Histórico',notes:'Minhas notas'}).map(([id,t])=>`<button class="soft" data-act="diary7" data-id="${id}" aria-pressed="${id==='boys92'}">${t}</button>`).join('')}</div>${diaryNotes92()}`);document.querySelector('#modal .panel')?.classList.add('wide7');return}journal92base();const tabs=document.querySelector('#modal .tabs7');tabs?.insertAdjacentHTML('beforeend','<button class="soft" data-act="diary7" data-id="boys92">Sobre meus vínculos ♡</button>');if(diary7==='relations'){const p=document.querySelector('#modal .panel');p.querySelectorAll('.relation7').forEach(x=>x.remove());p.insertAdjacentHTML('beforeend',`<p class="hint">Afinidade e confiança são pontos com zero no centro; valores negativos mostram distância. As barras limitam a exibição a 100 pontos, sem alterar o progresso.</p>${romance93().map(id=>`<article class="relation92"><div class="face7">${sprite(id)}</div><div><h3>${chars[id].name}</h3><small>${stage(id)}</small>${['aff','trust','attraction','jealousy'].map(k=>metric92(id,k)).join('')}<button class="soft" data-act="profile" data-id="${id}">Ver ficha</button></div></article>`).join('')}`)}};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act="save92note"]');if(!b||!state||!romance93().includes(b.dataset.id))return;const id=b.dataset.id;state.personal92=state.personal92||{
    
  };state.personal92[id]=(document.getElementById('note92-'+id)?.value||'').slice(0,3000);persist();toast('Anotação guardada ♡')
});

const cover92base=cover;cover=function(){return cover92base().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.9.2 • Coração de Bellmont')};
