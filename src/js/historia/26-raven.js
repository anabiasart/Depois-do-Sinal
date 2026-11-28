// raven | v0.14
/* Raven Ashford — sixth romance, independent side story */
function romance93(){return chars.raven?[...routes,'raven']:routes.slice()}
chars.raven={name:'Raven',style:'girl',label:'A investigadora',note:'Jornalismo, sinceridade e um sorriso cheio de ironia.'};
animeArt.raven=[ASSETS14[348],660,990];
visualProfiles.raven={
  title:'A garota que lê nas entrelinhas',
  color:'#85466d',
  icon:'✒',
  club:'Jornal escolar',
  quote:'Não preciso de uma manchete para saber quando alguém é interessante.'
};

chatTopics7.raven=[['Jornal','Qual história você está investigando?','Uma sobre o arquivo antigo de Bellmont. Preciso de uma parceira que questione tudo.'],['Dia','Como foi seu dia?','Dois cafés e uma entrevista desastrosa. Agora melhorou.'],['Flertar','Você é sempre tão interessante ou é só comigo?','Isso foi um flerte? Porque funcionou.'],['Livros','Me recomenda um livro?','Um bom mistério. Depois quero ouvir sua teoria.']];

phoneData90.raven={
  invite:'A cafeteria está vazia depois da aula. Quer ler minha matéria antes de eu publicar?',
  place:'Cafeteria',
  loc:'cafe',
  scene:'Raven coloca dois cafés sobre a mesa e fecha o caderno. Pela primeira vez, não está entrevistando ninguém. Ela sorri e conta que é bissexual, com a naturalidade de quem divide uma parte da própria vida.',
  question:'Gosto de estar com você. Não como fonte de uma matéria. Só… você. Quer repetir isso outro dia?',
  answers:[['Quero. E desta vez podemos chamar de encontro.','Fechado. Sem aspas, sem manchete. Só nós duas.',5,4],['Quero, como amigas.','Combinado. Uma amizade de verdade também é uma boa história.',1,4],['Prefiro ir devagar.','Sem pressa. Você pode escolher o ritmo.',0,3]],
  extra:['Achei um bilhete estranho no jornal. Bellmont nunca decepciona.','Você me faz esquecer de olhar o relógio. Isso é novidade.']
};

feed90.push(['raven',1,'Uma regra do jornal: questionar tudo. Inclusive o café da cantina.']);
impressions92.raven=['Raven parece enxergar além das versões oficiais das coisas. Gosto de como ela não finge ser outra pessoa.','Com Raven, não preciso inventar uma resposta perfeita. Ela me escuta de verdade. Talvez eu esteja começando a gostar dela de um jeito diferente.'];

function normalizeRaven(s) {
    for(const k of ['aff','trust','attraction','jealousy']){
    s[k]=s[k]||{
      
    };
    if(!Number.isFinite(s[k].raven))s[k].raven=0
  }
  if(!s.raven93)s.raven93={
    step:0,
    romance:false
  };
}

const known93base=profileKnown;profileKnown=function(id){return id==='raven'?!!state&&(state.raven93?.step||0)>0:known93base(id)};
const replies93base=replies90;
replies90=function(id,m){
  if(id!=='raven')return replies93base(id,m);
  return [['Quero saber mais.','Sabia que você era curiosa. Gosto disso.',2,2,'Inteligência'],['Adoro conversar com você.','Confissão registrada. E é recíproca.',3,2,'Carisma',3],['Obrigada por confiar em mim.','Você facilita as coisas.',1,3,'Empatia'],['Conversamos depois?','Claro. Até mais!',0,1,'Ousadia']]
};

function ravenCard93(){return `<button class="castcard" data-act="profile" data-id="raven" style="--cast:#85466d"><div class="castart">${sprite('raven')}</div><span class="casttext"><b>Raven</b><small>${profileKnown('raven')?'✦ Ficha descoberta':'Jornal escolar · Nova rota'}</small></span></button>`}
const modal93base=modal;
modal=function(t){
  modal93base(t);
  if(t==='cast'){
    const g=document.querySelector('#modal .castgrid');
    if(g)g.insertAdjacentHTML('beforeend',ravenCard93());
    const p=document.querySelector('#modal .panel > p');
    if(p&&p.textContent.includes('Cinco personalidades'))p.textContent='Seis personalidades, seis possibilidades para o seu coração.'
  }
  
};

const side93base=side;side=function(){const h=side93base();return h.replace('<hr>',`<button class="person" data-act="profile" data-id="raven"><div class="portrait">${sprite('raven')}</div><div class="info"><div class="pname"><b>Raven</b></div>${metric92('raven','aff',true)}<div class="tiny">${stage('raven')} · confiança ${state.trust.raven||0}</div></div></button><hr>`)};
function ravenAvailable93(){
  if(!state)return false;
  const n=state.raven93?.step||0;
  return n===0||n===1&&state.episode>=3||n===2&&state.episode>=5&&(state.trust.raven||0)>=10
}

const profile93base=showProfile;showProfile=function(id,m='neutral'){if(id!=='raven')return profile93base(id,m);modalType='profile';let known=profileKnown(id);showPanel('Raven Ashford',`<div class="profilehero"><div class="profileart" style="--cast:#85466d">${sprite(id)}</div><div><span class="tag">Jornal escolar · 18 anos</span><h3>A garota que lê nas entrelinhas</h3><p>Independente, curiosa e irônica. Escreve matérias para o jornal, adora mistérios e não tem paciência para poses de superioridade.</p><p class="profilequote">“Não preciso de uma manchete para saber quando alguém é interessante.”</p><div class="profilefacts"><div><span>Aniversário</span><b>26 de outubro</b></div><div><span>Altura</span><b>1,70 m</b></div><div><span>Orientação</span><b>Bissexual</b></div><div><span>Estilo</span><b>Alternativo</b></div><div><span>Presente favorito</span><b>Caderno de anotações</b></div><div><span>Rota</span><b>Cumplicidade que vira romance</b></div></div>${known?`<h3>Seu vínculo com Raven</h3><p>${stage(id)}</p>${['aff','trust','attraction','jealousy'].map(k=>metric92(id,k)).join('')}${state.raven93.romance?'<p>♡ Interesse mútuo declarado</p>':''}`:'<p>Conheça Raven no jornal escolar para desbloquear os seus vínculos.</p>'}${state&&screen==='game'&&ravenAvailable93()?`<button class="primary" data-act="ravenmeet93">${known?'Encontrar Raven':'Conhecer Raven'} ♡</button>`:''}${known?'<button class="soft" data-act="ravenchat93">Conversar pelo BellPhone</button>':''}</div></div>`)};
const ravenScenes93=[
{
  loc:'library',
  title:'A matéria que ninguém pediu',
  text:'Raven fecha o caderno quando você se aproxima. “A novata. Já ouvi três versões sobre você. Prefiro a sua. Quer me ajudar com uma matéria sobre Bellmont?”',
  opts:[['Só se eu puder fazer perguntas também.','Gostei. Você não é de aceitar qualquer versão.',7,6,2],['Claro, podemos ser amigas.','Uma aliada no jornal. Isso vai ser útil.',4,7,0],['Hoje não, mas podemos conversar depois.','Sem problemas. Não vou publicar sua agenda.',0,2,0]]
},
{
  loc:'roof',
  title:'O que não vai para o jornal',
  text:'Raven mostra uma fotografia antiga e confessa que tem medo de ser lembrada apenas pelas coisas que escreve. “Às vezes eu queria alguém que me conhecesse fora das manchetes.”',
  opts:[['Quero conhecer você, não a jornalista.','Você tem uma habilidade perigosa de me deixar sem resposta.',8,7,5],['Você pode contar comigo como amiga.','Uma amiga que escuta. Não se encontra todo dia.',3,7,0],['Não precisa me contar tudo agora.','Obrigada por respeitar meu espaço.',1,5,0]]
},
{loc:'garden',title:'Entre duas linhas',text:'Raven segura um bilhete dobrado. “Eu sou boa com palavras, mas com você é diferente. Gosto de você. Se for recíproco, quero descobrir onde isso pode dar. Se não, tudo bem.”',opts:[['Eu também gosto de você. Quero tentar.','Então temos nossa própria história. Sem prazo de entrega.',9,6,8],['Você é importante para mim como amiga.','Obrigada por ser sincera. Nossa amizade importa.',3,5,0],['Ainda preciso de tempo.','Eu respeito isso. Sem pressão.',1,4,0]]}];
function ravenMeet93(){if(!ravenAvailable93())return;const idx=state.raven93.step,c=ravenScenes93[idx];modalType='raven93';showPanel(c.title,`<div class="bpmeet"><div class="bpmeetart">${bg(c.loc==='garden'?'gate':c.loc)}<div>${sprite('raven')}</div></div><p>${esc(c.text)}</p><div class="bpchoices">${c.opts.map((o,i)=>button90('ravensay93',esc(o[0]),`data-i="${i}"`)).join('')}</div><button class="soft" data-act="close">Voltar à história</button></div>`)}
function renderRavenInvitation() {
    if(!state||screen!=='game')return;const node=state.node;if(ravenAvailable93()&&['map','e2map','e3map','e4pick','e5pick','ending','e2ending','e3ending','e4ending','e5ending'].includes(node)){const main=document.querySelector('.main');main?.insertAdjacentHTML('beforeend',`<div class="event9"><b>✒ ${state.raven93.step?'Um encontro com Raven':'Jornal escolar · Conheça Raven'}</b><p>Evento opcional. Seu episódio continua de onde parou.</p><button class="soft" data-act="ravenmeet93">Encontrar Raven ♡</button></div>`)}
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||!state||b.disabled)return;const a=b.dataset.act;if(!['ravenmeet93','ravensay93','ravenchat93'].includes(a))return;e.stopImmediatePropagation();if(a==='ravenchat93'){modalType='phone';openChat90('raven');return}if(a==='ravenmeet93'){ravenMeet93();return}if(!ravenAvailable93())return;const step=state.raven93.step,idx=Number(b.dataset.i),o=ravenScenes93[step].opts[idx];if(!o)return;state.aff.raven+=o[2];state.trust.raven+=o[3];state.attraction.raven+=o[4];state.raven93.step++;if(step===2&&idx===0)state.raven93.romance=true;state.log.push({who:'raven',choice:o[0],aff:o[2],trust:o[3]});state.items.push(ravenScenes93[step].title);state.messages.push({day94:roomData11().day,who:'raven',text:step===0?'Aqui é a Raven. Salva meu número. A matéria não vai se escrever sozinha.':step===1?'Obrigada por me ouvir hoje. Foi importante.':idx===0?'Gostei de começar nossa história. ♡':'Obrigada por conversar comigo com sinceridade.',day90:roomData11().day});persist();render();modalType='raven93';showPanel(ravenScenes93[step].title,`<div class="bpsection"><div class="bpdateportrait">${sprite('raven')}</div><p>${esc(o[1])}</p><p class="hint">Afinidade +${o[2]} · confiança +${o[3]} · atração +${o[4]}</p><button class="primary" data-act="close">Voltar à história</button></div>`);},true);
const cover93base=cover;cover=function(){return cover93base().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.9.3 • Entrelinhas de Raven')};
