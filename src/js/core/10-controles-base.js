// controles-base | v0.14
function fields(l,withName=false){return `<div class="ward"><div class="avatar" id="avatar">${avatar(l)}</div><div class="fields">${withName?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}${[['hair','Cabelo',[['castanho','Castanho'],['preto','Preto'],['rosa','Rosa'],['loiro','Loiro']]],['eyes','Olhos',[['mel','Mel'],['azul','Azul'],['verde','Verde'],['castanho','Castanho']]],['skin','Tom de pele',[['clara','Claro'],['media','Médio'],['escura','Escuro']]],['outfit','Look',[['uniforme','Uniforme clássico'],['cardigan','Cardigan rosado'],['jaqueta','Jaqueta azul']]]].map(([key,title,opts])=>`<label for="${key}">${title}</label><select id="${key}" data-look="${key}">${opts.map(([v,t])=>`<option value="${v}" ${l[key]===v?'selected':''}>${t}</option>`).join('')}</select>`).join('')}</div></div>`}
let activeProfile=null;
function profileKnown(id){
  return !!state&&(state.visited.some(l=>encounters[l].who===id)||(state.loc&&encounters[state.loc]?.who===id&&['enc1','enc2','enc3'].includes(state.node)))
}

function showProfile(id,mood='neutral'){if(!routes.includes(id))return;activeProfile=id;modalType='profile';const c=chars[id],v=visualProfiles[id],known=profileKnown(id);document.getElementById('modal').innerHTML=`<div class="overlay"><section class="panel" role="dialog" aria-modal="true" aria-label="Ficha de ${c.name}"><div class="panelhead"><h2>${c.name} <small style="color:${v.color}">${v.icon}</small></h2><button class="close" data-act="close" aria-label="Fechar">×</button></div><div class="profilehero"><div class="profileart" style="--cast:${v.color}">${sprite(id,mood)}</div><div><div class="tag">${v.club}</div><h3>${v.title}</h3><p>${known?v.detail:'Conheça este personagem durante o primeiro episódio para desbloquear sua ficha.'}</p>${known?`<p class="profilequote">“${v.quote}”</p><p class="hint">Afinidade: ${state.aff[id]} · Confiança: ${state.trust[id]}</p>`:''}<div class="moods">${[['neutral','Normal'],['smile','Sorriso'],['annoyed','Irritado'],['shy','Tímido'],['surprise','Surpreso']].map(([m,t])=>`<button data-act="mood" data-id="${m}" aria-pressed="${m===mood}">${t}</button>`).join('')}</div></div></div><button class="soft" data-act="cast" style="margin-top:18px">‹ Voltar ao elenco</button></section></div>`}
function modal(type){modalType=type;let title='',content='';if(type==='new'||type==='wardrobe'){if(type==='new')draft=initial();else draft={name:state.name,look:{...state.look}};title=type==='new'?'Crie sua protagonista':'Guarda-roupa';content=`<p>${type==='new'?'Personalize a sua personagem antes do primeiro dia.':'Mude seu visual quando quiser.'}</p>${fields(draft.look,type==='new')}<p class="hint">A aparência é cosmética. A base anime é fixa; as variações de cor usam filtros aproximados. Nesta versão, a protagonista também muda de expressão durante as cenas.</p>${type==='new'&&saved?'<p class="hint">Iniciar uma nova história substituirá o progresso anterior.</p>':''}<button class="primary" data-act="${type==='new'?'start':'wear'}">${type==='new'?'Começar a história':'Salvar visual'}</button>`;}else if(type==='cast'){title='Os corações de Bellmont';content=`<p>Cinco personalidades, cinco maneiras de complicar o seu primeiro dia.</p><div class="castgrid">${routes.map(id=>{const v=visualProfiles[id];return `<button class="castcard" data-act="profile" data-id="${id}" style="--cast:${v.color}"><div class="castart">${sprite(id)}</div><span class="casttext"><b>${chars[id].name}</b><small>${profileKnown(id)?'✦ Ficha descoberta':v.club+' · Ficha bloqueada'}</small></span></button>`}).join('')}</div>`;}else if(type==='phone'){title='Seu celular';content=`<div class="phone">${state.messages.length?state.messages.map(m=>`<div class="msg"><b>${chars[m.who].name}</b>${esc(m.text)}</div>`).join(''):'<div class="empty">Nenhuma mensagem ainda.</div>'}</div>`;}else if(type==='gallery'){title='Galeria de memórias';content=`<p>As cenas finais são desbloqueadas ao escolher um encontro.</p><div class="gallery">${routes.map(id=>`<div class="cg">${state.gallery.includes(id)?`<div class="pic">${bg(finals[id].loc)}<div class="cgperson">${sprite(id,'smile').replace('<svg ','<svg style="height:100%;width:auto" ')}</div></div>`:'<div class="lock">♡</div>'}<b>${state.gallery.includes(id)?finals[id].title:'Cena bloqueada • '+chars[id].name}</b></div>`).join('')}</div>`;}else if(type==='journal'){title='Diário de Bellmont';content=`<h3>Lembranças</h3>${state.items.length?state.items.map(x=>`<div class="msg">✦ ${esc(x)}</div>`).join(''):'<p class="hint">Nenhuma lembrança encontrada.</p>'}<h3>Escolhas registradas</h3>${state.log.length?state.log.map(x=>`<div class="msg"><b>${chars[x.who].name} • ${x.aff>=0?'+':''}${x.aff} afinidade</b>${esc(x.choice)}</div>`).join(''):'<p class="hint">As escolhas aparecem aqui.</p>'}`;}else{title='Sobre Depois do Sinal';content='<p>Visual novel escolar independente. Quatro episódios jogáveis e agora com expressões dinâmicas em anime para protagonista e pretendentes.</p><p>Explore Bellmont, conheça os cinco pretendentes e decida como terminar o dia. O progresso é salvo no armazenamento local do navegador, quando disponível. Não há servidor, compras ou limite de energia.</p><p>Edição 0.3: retratos anime originais dos cinco pretendentes, fichas expandidas, celular interativo, atributos e segundo episódio. A protagonista, personagens secundárias e cenários continuam com arte vetorial. Os retratos anime têm uma pose fixa.</p>';}document.getElementById('modal').innerHTML=`<div class="overlay"><section class="panel" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="panelhead"><h2>${title}</h2><button class="close" data-act="close" aria-label="Fechar">×</button></div>${content}</section></div>`;}
function close(){modalType=null;document.getElementById('modal').innerHTML='';draft=null}
document.addEventListener('change',e=>{
  if(e.target.dataset.look&&draft){
    draft.look[e.target.dataset.look]=e.target.value;{
      const el=document.getElementById('avatar');if(el)el.innerHTML=avatar(draft.look)
    }
    
  }
  
});

document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modalType)close()});
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const a=b.dataset.act,id=b.dataset.id;switch(a){
    case'cast':case'new':case'wardrobe':case'phone':case'gallery':case'journal':case'about':case'stats':modal(a);break;case'profile':showProfile(id);break;case'mood':showProfile(activeProfile,id);break;case'close':close();break;case'start':if(!draft)break;draft.name=(document.getElementById('name')?.value.trim()||draft.name?.trim()||'Alex').slice(0,24);state=draft;normalize(state);close();screen='game';update();break;case'wear':state.look={
      ...draft.look
    };close();update();toast('Visual atualizado');break;case'continue':state=load()||saved;if(state){
      normalize(state);screen='game';render()
    }
    break;case'home':persist();close();screen='cover';render();break;case'episode2':startEpisode2();break;case'visit2':visit2(id);break;case'route2':route2(id);break;case'reply':replyMessage(Number(b.dataset.i),Number(b.dataset.j));break;case'next':next();break;case'choose':choose(Number(b.dataset.i));break;case'visit':if(state.node==='map'&&encounters[id]&&!state.visited.includes(id)){
      state.loc=id;state.node='enc0';update()
    }
    break;case'finish':if(state.visited.length>=3){
      state.loc='cafe';state.node='scarlett';update()
    }
    break;case'route':if(state.node==='select'&&(id==='solo'||state.visited.some(l=>encounters[l].who===id))){
      state.ending=id;state.loc=id==='solo'?'gate':finals[id].loc;state.node=id==='solo'?'solo':'final0';update()
    }
    break;
  }
  
});
