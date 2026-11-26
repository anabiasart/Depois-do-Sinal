// encontros-e-galeria | v0.14
/* v0.10 - Além dos Portões, optional narrative engine */
const art10={
  "city": {
    "cafe": ASSETS14[361],
     "books": ASSETS14[362],
     "records": ASSETS14[363],
     "art": ASSETS14[364],
     "park": ASSETS14[365],
     "mall": ASSETS14[366],
     "fair": ASSETS14[367],
     "theatre": ASSETS14[368]
  },
   "cg": {
    "dante": ASSETS14[369],
     "raven": ASSETS14[370],
     "group": ASSETS14[371]
  },
   "raven": {
    "neutral": [ASSETS14[372], 512, 512],
     "smile": [ASSETS14[373], 512, 512],
     "annoyed": [ASSETS14[374], 512, 512],
     "shy": [ASSETS14[375], 512, 512],
     "surprise": [ASSETS14[376], 512, 512],
     "sad": [ASSETS14[377], 512, 512]
  }
  
};

const city10={
 records:{name:'Vinyl Moon',kind:'Loja de discos',who:'dante',time:'Tarde',day:2,school:'music',title:'Lado B'},
 books:{name:'Velvet Pages',kind:'Livraria',who:'soren',time:'Tarde',day:2,school:'library',title:'Fora do roteiro'},
 park:{name:'Parque do Lago',kind:'Parque',who:'theo',time:'Tarde',day:2,school:'garden',title:'Um dia sem placar'},
 art:{name:'Galeria Orion',kind:'Galeria de arte',who:'ezra',time:'Tarde',day:3,school:'library',title:'O que a luz guarda'},
 theatre:{name:'Grand Bellmont',kind:'Teatro',who:'valentim',time:'Noite',day:3,school:'hall',title:'Sem plateia'},
 cafe:{name:'The Letter',kind:'Cafeteria',who:'raven',time:'Tarde',day:2,school:'cafe',title:'Entre duas xícaras'},
 mall:{name:'Bellmont Mall',kind:'Shopping',time:'Tarde',day:2,school:'hall',title:'Uma pausa para compras'},
 fair:{name:'Luna Park',kind:'Parque de diversões',time:'Noite',day:4,school:'garden',title:'Sob as luzes'}
};
const dates10={
 records:{
  lines:[['dante','neutral','Não acredito que você aceitou vir. A maioria das pessoas só quer ouvir o que está na moda.'],['dante','smile','Achei esse disco num canto esquecido. Tem uma faixa que parece a nossa primeira conversa: começa mal e termina surpreendentemente bem.'],['dante','shy','Quer dividir os fones? Se não gostar, a culpa é da música. Definitivamente.']],
  opts:[['Quero ouvir junto com você.','Então chega mais. Não precisa dizer nada agora.',5,5,5],['Me ensina a escolher um disco.','Tá, mas aviso que minha aula tem opiniões fortes.',3,5,0],['Prefiro explorar sozinha.','Beleza. Me mostra o que encontrar depois.',0,2,0]]
},
 books:{
  lines:[['soren','neutral','Eu vinha comprar um livro para a comissão. Pela primeira vez em semanas, não tenho uma lista.'],['soren','smile','Encontrei um romance antigo. A personagem principal abandona todos os planos para procurar algo que não sabe nomear.'],['soren','shy','Talvez eu esteja começando a entender a lógica dela. Quer escolher um livro comigo?']],
  opts:[['Só se a próxima página for nossa.','Uma proposta ousada. Aceito, se não houver prazo de entrega.',5,5,5],['Vamos escolher livros um para o outro.','Excelente. Quero conhecer seus gostos.',3,5,0],['Hoje quero ler sozinha.','Claro. Um pouco de silêncio também é valioso.',0,2,0]]
},
 park:{
  lines:[['theo','smile','Sem treino, sem prova, sem ninguém contando pontos! O parque é oficialmente uma zona livre de obrigações.'],['theo','neutral','Trouxe chocolate, mas não trouxe guarda-chuva. A previsão pode me humilhar a qualquer momento.'],['theo','shy','Sabe, eu gosto quando estou com você e não preciso fazer todo mundo rir.']],
  opts:[['Gosto de você mesmo quando está quieto.','Você não tem ideia do quanto eu precisava ouvir isso.',5,5,5],['Vamos sentar e dividir o chocolate.','Isso é a definição de amizade perfeita.',3,5,0],['Vou dar uma volta sozinha.','Combinado. Te vejo perto do lago!',0,2,0]]
},
 art:{
  lines:[['ezra','neutral','Essa exposição é sobre coisas pequenas. Uma janela, um reflexo, uma sombra.'],['ezra','smile','A maioria das pessoas passa direto. Você ficou olhando justamente a minha fotografia favorita.'],['ezra','shy','Posso te contar por que eu gosto tanto dela? Queria guardar uma lembrança daqui com você.']],
  opts:[['Quero guardar esse momento com você.','Então vou lembrar não só da luz, mas da sua presença.',5,5,5],['Quero ouvir sua interpretação.','Gosto de dividir essas coisas com uma amiga.',3,5,0],['Prefiro ver as obras no meu ritmo.','Tudo bem. A arte não exige pressa.',0,2,0]]
},
 theatre:{
  lines:[['valentim','smile','O teatro está vazio. Finalmente um lugar onde ninguém espera que eu interprete um papel.'],['valentim','neutral','Sempre achei curioso como uma peça pode dizer a verdade através de uma história inventada.'],['valentim','shy','Hoje eu não ensaiei nada. Você aceitaria ficar mais um pouco comigo?']],
  opts:[['Com você, não com o personagem.','Essa é a coisa mais bonita que ouvi hoje.',5,5,5],['Vamos conversar sobre a peça.','Uma boa conversa vale uma estreia inteira.',3,5,0],['Preciso ir, mas obrigada pelo convite.','Foi um prazer ter sua companhia.',0,2,0]]
},
 cafe:{
  lines:[['raven','neutral','Duas xícaras, nenhum gravador. Considere isto uma rara exceção ao meu expediente.'],['raven','smile','O pessoal do jornal acha que estou escrevendo uma matéria. Tecnicamente, uma cafeteria é um local de pesquisa.'],['raven','shy','Na verdade, eu queria te ver. Sem ter uma desculpa perfeitamente convincente.']],
  opts:[['Também queria ficar a sós com você.','Ótimo. Finalmente uma história que não precisa de testemunhas.',5,5,5],['Gosto da nossa amizade. Vamos conversar.','É bom ter alguém com quem posso ser eu mesma.',3,5,0],['Hoje preciso de um tempo só meu.','Justo. Guardo seu lugar para outra ocasião.',0,2,0]]
}

};
const groups10={
 editorial:{
  title:'A manchete do intervalo',
  loc:'cafe',
  day:2,
  cast:['dante','soren','raven'],
  lines:[['raven','smile','Entrevista coletiva. Qual foi o maior problema do festival até agora?'],['dante','annoyed','O cronograma. Tem mais páginas que um álbum duplo.'],['soren','annoyed','O problema é a ausência de pontualidade de determinados músicos.'],['raven','surprise','Excelente. Já temos a manchete: cronograma ameaça amizade inexistente.']],
  opts:[['Raven, deixa a manchete para depois.','raven','smile','Está bem. Por você, uma trégua editorial.',[['raven',3,3],['soren',1,2]]],['Dante tem razão, precisa de uma pausa.','dante','smile','Finalmente uma pessoa sensata.',[['dante',4,2],['raven',1,1]]],['Vamos respeitar o planejamento de Soren.','soren','smile','Obrigado. Podemos reorganizar a programação juntos.',[['soren',4,3],['dante',-1,0]]]]
},
 shopping:{
  title:'Operação presente',
  loc:'mall',
  day:2,
  cast:['mabel','theo','ezra'],
  lines:[['mabel','smile','Missão: encontrar um presente para a comissão do festival. Orçamento pequeno, expectativas absurdas.'],['theo','smile','Chocolate resolve todos os problemas.'],['ezra','neutral','Exceto os que envolvem calor. E embalagens bonitas.'],['mabel','surprise','Vamos deixar a novata decidir antes que isso vire uma tese.']],
  opts:[['Um álbum de fotos do grupo.','ezra','smile','Gostei. Memórias são um bom presente.',[['ezra',4,3],['theo',1,1]]],['Uma cesta com doces.','theo','smile','Minha visão de mundo foi validada!',[['theo',4,3],['ezra',1,1]]],['Vamos fazer um cartão todos juntos.','mabel','smile','Sim! Quero assinaturas dramáticas.',[['theo',2,2],['ezra',2,2]]]]
},
 lights:{
  title:'Caos sob as luzes',
  loc:'fair',
  day:4,
  cast:['valentim','raven','theo'],
  lines:[['valentim','smile','Uma roda-gigante. Uma vista inesquecível. Uma oportunidade de fazer uma entrada memorável.'],['raven','annoyed','Ou de descobrir quem tem medo de altura. Material jornalístico excelente.'],['theo','surprise','Eu não tenho medo. Só respeito a gravidade muito profundamente.'],['valentim','smile','Então, qual será nossa primeira aventura?']],
  opts:[['A roda-gigante, sem pressão para ninguém.','valentim','smile','Uma excelente escolha. Vamos apreciar a vista.',[['valentim',4,3],['raven',1,2]]],['Vamos nos jogos e tentar ganhar um prêmio.','theo','smile','Agora sim! Meu momento chegou.',[['theo',4,3],['valentim',1,1]]],['Raven, vamos fotografar as luzes.','raven','shy','Uma pauta que eu adoraria dividir com você.',[['raven',4,3],['theo',1,1]]]]
}

};
function cityData10(s=state){
  let x=s.city10;
  if(!x||typeof x!=='object'||Array.isArray(x))x=s.city10={
    
  };
  for(const k of ['visits','done','cg'])if(!Array.isArray(x[k]))x[k]=[];
  if(!['Tarde','Noite'].includes(x.time))x.time='Tarde';
  return x
}

const norm10=normalize;normalize=function(s){norm10(s);cityData10(s);return s};
// Preserve the original standing pose; the five extra expressions use transparent, individually cropped anime assets.
moodNames.sad='Melancólica';
for(const [m,v] of Object.entries(art10.raven))if(m!=='neutral'){
  if(!expressionArt.raven)expressionArt.raven={
    neutral:animeArt.raven
  };
  expressionArt.raven[m]=v
}

const sprite10=sprite;
sprite=function(id,m='neutral',custom=null){
  let h=sprite10(id,m,custom);
  if(id==='raven'&&!custom&&m!=='neutral')h=h.replace('viewBox="0 0 512 512"','viewBox="0 0 512 512" preserveAspectRatio="xMidYMax meet"');
  return h
};

const ravenProfile10=showProfile;showProfile=function(id,m='neutral'){ravenProfile10(id,m);if(id!=='raven')return;const art=document.querySelector('#modal .profileart');if(art)art.innerHTML=sprite(id,m);document.querySelector('#modal .panel')?.insertAdjacentHTML('beforeend',`<div class="expression-panel"><h3>Expressões de Raven</h3><div class="moods">${Object.entries({neutral:'Normal',smile:'Sorriso',annoyed:'Irritada',shy:'Corada',surprise:'Surpresa',sad:'Melancólica'}).map(([k,v])=>`<button class="soft" data-act="ravenMood10" data-id="${k}" aria-pressed="${m===k}">${v}</button>`).join('')}</div></div>`)};
function img10(type,id,cl=''){const d=art10[type]?.[id];return d?`<img class="${cl}" src="${mediaURL14(d,'image/webp')}" alt="${esc(type==='city'?city10[id]?.kind||'Bellmont':'Ilustração de Bellmont')}" loading="lazy" decoding="async">`:''}
function canDate10(id){const c=city10[id];return !!(c?.who&&state.episode>=c.day&&profileKnown(c.who)&&cityData10().time===c.time)}
function canGroup10(id){const g=groups10[id];return g&&state.episode>=g.day&&cityData10().time===city10[g.loc].time}
function cityPanel10(){if(!state)return;modalType='city10';const d=cityData10();showPanel('Bellmont · Além dos Portões',`<div class="city10"><div class="cityhero10"><div class="tag">CAPÍTULO EXTRA • CIDADE EXPLORÁVEL</div><h3>O mundo depois da aula.</h3><p>Visite locais, descubra encontros e volte ao colégio quando quiser. Nenhuma visita consome energia ou altera o episódio principal.</p><div class="citytime10"><span>Horário da exploração</span>${['Tarde','Noite'].map(t=>`<button class="soft" data-act="time10" data-id="${t}" aria-pressed="${d.time===t}">${t==='Tarde'?'☀':'☾'} ${t}</button>`).join('')}<span>${d.visits.length}/8 locais visitados</span></div></div><div class="citygrid10">${Object.entries(city10).map(([k,c])=>`<button class="citycard10" data-act="visit10" data-id="${k}" ${state.episode<c.day?'disabled':''}>${img10('city',k)}<div><small>${c.kind} • ${c.time}</small><b>${c.name}</b><span>${state.episode<c.day?'Desbloqueia no episódio '+c.day:d.done.includes('date:'+k)?'♡ Encontro concluído':c.who?name90(c.who)+' · '+(canDate10(k)?'Encontro disponível':'Explore o local'):d.visits.includes(k)?'Visitado':'Explore o local'}</span></div></button>`).join('')}</div><h3>Momentos em grupo</h3><div class="grouplist10">${Object.entries(groups10).map(([k,g])=>`<button class="soft" data-act="group10" data-id="${k}" ${!canGroup10(k)||d.done.includes('group:'+k)?'disabled':''}>${g.title} · ${d.done.includes('group:'+k)?'Concluído':state.episode<g.day?'Ep. '+g.day:city10[g.loc].time}</button>`).join('')}</div><button class="soft" data-act="cg10">♡ Galeria de momentos</button></div>`);document.querySelector('#modal .panel')?.classList.add('citypanel10')}
function visit10(k){const c=city10[k];if(!c||state.episode<c.day)return;const d=cityData10();if(!d.visits.includes(k)){d.visits.push(k);persist()}modalType='city10';showPanel(c.name,`<div class="city10"><div class="location10">${img10('city',k)}<div><span>${c.kind} · ${c.time}</span><h3>${c.name}</h3></div></div><p>${({records:'Prateleiras de vinil e música baixinha. Um lugar perfeito para descobrir algo inesperado.',books:'Estantes antigas, livros usados e um silêncio acolhedor.',park:'A luz dança sobre o lago. O caminho é livre para uma caminhada.',art:'Quadros e fotografias iluminam as paredes da galeria.',theatre:'O palco espera a próxima apresentação. As cortinas parecem guardar segredos.',cafe:'Cheiro de café e chuva na janela. Uma pequena pausa no mundo.',mall:'Vitrines, presentes e uma pausa para conversar com amigos.',fair:'Luzes coloridas e música. A roda-gigante domina o horizonte.'})[k]}</p>${c.who?`<div class="datecard10"><div class="dateportrait10">${sprite(c.who)}</div><div><h3>${name90(c.who)}</h3><p>${d.done.includes('date:'+k)?'Vocês já viveram este encontro. A lembrança está no histórico.':!profileKnown(c.who)?'Conheça o personagem no colégio antes de marcar um encontro.':d.time!==c.time?'O encontro acontece à '+c.time.toLowerCase()+'.':'Um encontro opcional, com escolhas de amizade ou romance.'}</p><button class="primary" data-act="date10" data-id="${k}" ${!canDate10(k)||d.done.includes('date:'+k)?'disabled':''}>${d.done.includes('date:'+k)?'Concluído':'Encontrar '+name90(c.who)}</button></div></div>`:''}${Object.entries(groups10).filter(([id,g])=>g.loc===k).map(([id,g])=>`<p><button class="primary" data-act="group10" data-id="${id}" ${!canGroup10(id)||d.done.includes('group:'+id)?'disabled':''}>${g.title}</button></p>`).join('')}${k==='mall'?'<button class="soft" data-act="wardrobe">Visitar o Ateliê</button>':''}<button class="soft" data-act="city10">‹ Voltar à cidade</button></div>`);document.querySelector('#modal .panel')?.classList.add('citypanel10')}
let scene10=null;
function startScene10(type,id){
  const d=cityData10();
  if(d.done.includes(type+':'+id))return;
  if(type==='date'&&!canDate10(id)||type==='group'&&!canGroup10(id))return;
  scene10={
    type,
    id,
    step:0
  };
  drawScene10()
}

function drawScene10(){if(!scene10)return;const {type,id,step}=scene10,group=type==='group',ev=group?groups10[id]:dates10[id],loc=group?ev.loc:id,c=city10[loc],line=ev.lines[Math.min(step,ev.lines.length-1)],cast=group?ev.cast:[c.who,'me'];modalType='scene10';const art=cast.map((who,i)=>`<div class="actor10 ${line[0]===who?'speaking10':'listening10'}" style="--slot:${(i+.5)/cast.length*100}%"><div class="actorart10">${who==='me'?avatar(state.look,'neutral'):sprite(who,line[0]===who?line[1]:'neutral')}</div><span>${who==='me'?esc(state.name):name90(who)}</span></div>`).join('');showPanel(group?ev.title:c.title,`<div class="sceneview10"><div class="stage10">${img10('city',loc,'stagebg10')}${art}</div><div class="sceneTalk10"><div class="tag">${esc(c.name)} · ${step+1}/${ev.lines.length}</div><b>${name90(line[0])}</b><p>${esc(line[2])}</p>${step<ev.lines.length-1?'<button class="primary" data-act="next10">Continuar ›</button>':`<div class="bpchoices">${ev.opts.map((o,i)=>`<button class="choice" data-act="choice10" data-i="${i}" ${!group&&i===0&&(state.trust[c.who]||0)<8?'disabled':''}>${esc(o[0])}${!group&&i===0&&(state.trust[c.who]||0)<8?' · confiança 8 necessária':''}</button>`).join('')}</div>`}<button class="soft" data-act="visit10" data-id="${loc}">Sair sem concluir</button></div></div>`);document.querySelector('#modal .panel')?.classList.add('citypanel10')}
function finish10(i){if(!scene10)return;const {type,id,step}=scene10,g=type==='group',ev=g?groups10[id]:dates10[id],loc=g?ev.loc:id,c=city10[loc],d=cityData10(),o=ev.opts[i];if(!o||step!==ev.lines.length-1||d.done.includes(type+':'+id))return;if(!g&&i===0&&(state.trust[c.who]||0)<8)return;const effects=g?o[4]:[[c.who,o[2],o[3],o[4]]];for(const [who,a,t,r=0] of effects){state.aff[who]=(state.aff[who]||0)+a;state.trust[who]=(state.trust[who]||0)+t;state.attraction[who]=(state.attraction[who]||0)+r;state.log.push({who,choice:o[0],aff:a,trust:t})}d.done.push(type+':'+id);state.items.push(g?ev.title:c.title);const who=g?o[1]:c.who,reply=g?o[3]:o[1],mood=g?o[2]:i===0?'shy':'smile';let unlocked=null;if(!g&&i===0&&art10.cg[who]&&!d.cg.includes(who)){d.cg.push(who);unlocked=who}if(g&&id==='editorial'&&!d.cg.includes('group')){d.cg.push('group');unlocked='group'}if(!g)push90('city10:'+id,who,i===0?'Gostei muito de hoje. Queria guardar esse momento com você.':i===1?'Foi bom passar um tempo com você hoje.':'Espero que tenha aproveitado seu passeio.');wallet8(state).coins+=g?15:20;scene10=null;persist();render();modalType='city10';showPanel('Uma lembrança de Bellmont',`<div class="city10"><div class="result10">${unlocked?img10('cg',unlocked,'cgfull10'):`<div class="resultportrait10">${sprite(who,mood)}</div>`}<h3>${esc(g?ev.title:c.title)}</h3><p><b>${name90(who)}:</b> ${esc(reply)}</p><p>${effects.map(([p,a,t])=>`${name90(p)}: afinidade ${a>=0?'+':''}${a} · confiança +${t}`).join(' / ')} · +${g?15:20} BC</p>${unlocked?'<p>♡ Ilustração desbloqueada na galeria.</p>':''}</div><button class="primary" data-act="city10">Voltar à cidade</button><button class="soft" data-act="cg10">Ver galeria</button></div>`);}
const cgInfo10={
  dante:['Lado B','Dante · Loja de discos'],
  raven:['Entre duas xícaras','Raven · Cafeteria'],
  group:['Depois do sinal','Grupo · Cafeteria']
};

function gallery10(){const d=cityData10();modalType='cg10';showPanel('Galeria · Momentos da cidade',`<div class="city10"><p>Ilustrações especiais desbloqueadas por escolhas. As quatro demais rotas já têm encontros próprios; suas CGs ilustradas serão acrescentadas em outra coleção.</p><div class="cggrid10">${Object.entries(cgInfo10).map(([k,[t,sub]])=>`<button class="cgcard10" data-act="viewcg10" data-id="${k}" ${!d.cg.includes(k)?'disabled':''}>${d.cg.includes(k)?img10('cg',k):'<div class="cglocked10">♡</div>'}<b>${t}</b><small>${sub} · ${d.cg.includes(k)?'Desbloqueada':'Bloqueada'}</small></button>`).join('')}</div><h3>Encontros registrados</h3>${d.done.length?d.done.map(s=>{let [type,id]=s.split(':');return `<p class="hint">✓ ${esc(type==='date'?city10[id]?.title||id:groups10[id]?.title||id)}</p>`}).join(''):'<p class="hint">Explore a cidade para criar lembranças.</p>'}<button class="soft" data-act="city10">Voltar à cidade</button><button class="soft" data-act="gallery">Galeria original</button></div>`);document.querySelector('#modal .panel')?.classList.add('citypanel10')}
const modal10=modal;modal=function(t){if(t==='city10')return cityPanel10();if(t==='cg10')return gallery10();modal10(t);if(t==='gallery'&&state){document.querySelector('#modal .panel')?.insertAdjacentHTML('beforeend',`<div class="event9"><b>Momentos da cidade · ${cityData10().cg.length}/3 ilustrações</b><p>Encontros e lembranças de Além dos Portões.</p><button class="soft" data-act="cg10">Abrir coleção ♡</button></div>`);}};
const render10=render;render=function(){render10();if(!state||screen!=='game')return;const nav=document.querySelector('.nav');if(nav&&!nav.querySelector('[data-act="city10"]'))nav.insertAdjacentHTML('afterbegin','<button data-act="city10">⌖ Cidade</button>')};
const cover10=cover;cover=function(){return cover10().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.10 • Além dos Portões')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||!state||b.disabled)return;const a=b.dataset.act,id=b.dataset.id;if(!['city10','time10','visit10','date10','group10','next10','choice10','cg10','viewcg10','ravenMood10'].includes(a))return;e.stopImmediatePropagation();switch(a){case'city10':scene10=null;cityPanel10();break;case'time10':if(['Tarde','Noite'].includes(id)){cityData10().time=id;persist();cityPanel10()}break;case'visit10':scene10=null;visit10(id);break;case'date10':startScene10('date',id);break;case'group10':startScene10('group',id);break;case'next10':if(scene10){scene10.step++;drawScene10()}break;case'choice10':finish10(Number(b.dataset.i));break;case'cg10':gallery10();break;case'viewcg10':if(cityData10().cg.includes(id)&&cgInfo10[id])showPanel(cgInfo10[id][0],`<div class="city10"><div class="cgzoom10">${img10('cg',id)}</div><button class="soft" data-act="cg10">‹ Voltar à galeria</button></div>`);break;case'ravenMood10':if(['neutral','smile','annoyed','shy','surprise','sad'].includes(id))showProfile('raven',id);break}},true);
