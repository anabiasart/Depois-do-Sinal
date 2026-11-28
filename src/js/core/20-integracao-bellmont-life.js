// integracao-bellmont-life | v0.14
function renderEpisodeFiveDetails() {
    if(screen!=='game'||!state)return;const n=state.messages.filter((m,i)=>pending7(m,i)).length;const b=document.querySelector('.nav [data-act="phone"]');if(b)b.textContent='▣ Celular'+(n?' • '+n+' pendentes':'');if(state.episode===5){document.querySelector('.episode').innerHTML='<span>EPISÓDIO 05 / O SEGREDO DO TERRAÇO</span><span>'+esc(state.name)+' • Dia 5</span>';const o=document.querySelector('.objective');if(o)o.textContent=state.node==='e5ending'?'Episódio concluído.':'Investigue a caixa e descubra a história do antigo festival.'}
}

// Capture only new actions so the existing narrative listeners remain intact.
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const a=b.dataset.act,id=b.dataset.id,i=Number(b.dataset.i);if(a==='pose7'||a==='outfit7'){
    if(!draft)return;const name=document.getElementById('name');if(name)draft.name=name.value;if(a==='pose7')preview7=id;else draft.look.outfit=id;drawWard7();return
  }
  if(!state)return;if(a==='contact7'){
    contact7=id;phone7()
  }
  if(a==='reply7')reply7(i,Number(b.dataset.j));if(a==='topic7')topic7(id,i);if(a==='group7'&&state.episode>=4&&!state.phone7.group.length&&[0,1,2].includes(i)){
    state.phone7.group.push({
      text:['Vamos organizar o festival juntas.','Quero ouvir as teorias!','Primeiro precisamos de um café.'][i],who:['Scarlett','Íris','Mabel'][i],answer:['Finalmente alguém sensata.','Então prepare seu caderno!','Essa é a minha pessoa.'][i]
    });persist();phone7()
  }
  if(a==='diary7'){
    diary7=id;diaryPanel7()
  }
  if(a==='note7'){
    state.notes7[state.episode]=document.getElementById('note7').value.slice(0,4000);persist();toast('Anotação salva ♡')
  }
  if(a==='startroof7')startRoof7();if(a==='roofpick7'&&state.node==='e5map'&&(routes.includes(id)||id==='solo')){
    state.e5.partner=id;state.loc='roof';state.node='e5clue';update()
  }
  
});

document.addEventListener('change',e=>{
  if(e.target.dataset.look&&draft&&['new','wardrobe'].includes(modalType)){
    const name=document.getElementById('name');if(name)draft.name=name.value;{
      const el=document.getElementById('avatar');if(el)el.innerHTML=avatar(draft.look,preview7)
    };document.querySelectorAll('.outfit7').forEach(b=>{
      b.firstElementChild.innerHTML=avatar({
        ...draft.look,outfit:b.dataset.id
      })
    })
  }
  
});
