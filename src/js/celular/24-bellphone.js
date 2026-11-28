// bellphone | v0.14
/* v0.9 — BellPhone 2.0 */
const phoneApps90={
  home:['⌂','Início'],
  messages:['✉','Mensagens'],
  feed:['✿','BellFeed'],
  contacts:['♙','Contatos'],
  invites:['♡','Convites'],
  photos:['▧','Fotos'],
  agenda:['▦','Agenda'],
  settings:['⚙','Ajustes']
};

let app90='home',chat90=null,filter90='all';
const phoneData90={
 dante:{
  invite:'Tenho uma música nova. Quer ouvir antes de todo mundo?',
  place:'Sala de música',
  loc:'music',
  scene:'Dante tira um fone do ouvido e oferece o outro. A música começa baixinho. Pela primeira vez, ele não tenta preencher o silêncio com uma provocação.',
  question:'E aí, Encrenca? Valeu a pena ficar até mais tarde?',
  answers:[['Valeu. Quero ouvir as próximas também.','Então vou ter que escrever mais algumas.',3,3],['Gostei da música. Obrigada por compartilhar.','Era importante pra mim. Valeu por ouvir.',1,3]],
  extra:['Hoje o amplificador resolveu cooperar. Até estranhei.','Eu lembrei da nossa conversa. Não se acostuma.']
},
 soren:{
  invite:'Tenho alguns minutos livres depois da reunião. Gostaria de caminhar comigo?',
  place:'Jardim',
  loc:'garden',
  scene:'Soren fecha a agenda e guarda o celular. No jardim, ele observa as flores em vez de consultar o relógio.',
  question:'É estranho ter tempo livre. Talvez eu devesse fazer isso com mais frequência.',
  answers:[['Podemos reservar mais momentos assim.','Vou tentar não transformar isso em um compromisso formal.',3,3],['Você merece descansar, mesmo sozinho.','Uma observação bastante sensata. Obrigado.',1,3]],
  extra:['Finalmente terminei os documentos do conselho.','Sua opinião tem sido mais útil do que imagina.']
},
 theo:{
  invite:'Quer dividir um lanche depois do treino? Prometo que não vou falar só de basquete.',
  place:'Pátio',
  loc:'gate',
  scene:'Theo aparece com dois lanches e um sorriso imenso. Ele escolhe um banco tranquilo, longe da quadra.',
  question:'Posso te contar uma coisa sem fazer piada?',
  answers:[['Pode. Eu gosto de você mesmo sem as piadas.','Isso é melhor que ganhar qualquer campeonato.',3,3],['Pode confiar em mim, amigo.','É bom ter alguém assim por perto.',1,3]],
  extra:['Hoje eu quase fiz uma cesta de olhos fechados. Quase.','Tem dias que uma conversa sua ajuda mais que um treino.']
},
 ezra:{
  invite:'Encontrei um lugar bonito para fotografar. Quer me acompanhar?',
  place:'Biblioteca',
  loc:'library',
  scene:'Ezra folheia um pequeno álbum e aponta para uma foto de uma janela. A luz da tarde ilumina suas mãos.',
  question:'Você consegue perceber o que eu queria mostrar nessa foto?',
  answers:[['A beleza de um momento que ninguém nota.','Sabia que você entenderia.',3,3],['Me conta o que você estava sentindo.','Acho que consigo explicar para você.',1,3]],
  extra:['Achei um filme antigo na mochila. Vou experimentar.','Algumas coisas ficam mais bonitas quando temos com quem compartilhá-las.']
},
 valentim:{
  invite:'Um intervalo longe da plateia seria agradável. Aceita minha companhia?',
  place:'Jardim de inverno',
  loc:'garden',
  scene:'Valentim deixa de lado o roteiro da peça e sorri sem a habitual pose teatral. O jardim está quase vazio.',
  question:'Você prefere a versão de mim que todos conhecem ou esta?',
  answers:[['Esta. Você não precisa atuar comigo.','Que alívio ouvir isso.',3,3],['Prefiro conhecer as duas, sem pressa.','Uma resposta que merece ser lembrada.',1,3]],
  extra:['O ensaio foi um desastre elegantemente administrado.','Você tem uma maneira interessante de me fazer baixar a guarda.']
}

};
function data90(s=state){
  const d=s.bellphone90||(s.bellphone90={
    
  });
  for(const k of ['read','stars','likes','group','notices'])if(!Array.isArray(d[k]))d[k]=[];
  for(const k of ['invites','comments','follow'])if(!d[k]||typeof d[k]!=='object'||Array.isArray(d[k]))d[k]={
    
  };
  d.status=typeof d.status==='string'?d.status:'Depois do sinal ♡';
  d.theme=['rose','night','lavender'].includes(d.theme)?d.theme:'rose';
  d.notifications=d.notifications!==false;
  return d
}

function normalizePhone(s) {
    data90(s);
}
function known90(id){return phoneContacts7().includes(id)||romance93().includes(id)&&profileKnown(id)}
function push90(flag,who,text,extra={
  
}){
  if(state.flags[flag])return false;
  state.flags[flag]=true;
  state.messages.push({
    day94:roomData11().day,who,text,...extra,day90:roomData11().day
  });
  return true
}

function seed90(){
  if(!state)return false;
  const before=state.messages.length;
  seed7();
  const d=data90();
  for(const id of romance93()){
    if(!known90(id))continue;
    const p=phoneData90[id];
    if(state.episode>=2)push90('bp90_routine_'+id,id,p.extra[0]);
    if(state.trust[id]>=15)push90('bp90_close_'+id,id,p.extra[1]);
    if(state.episode>=2&&state.trust[id]>=8&&!d.invites[id]){
      d.invites[id]={
        status:'pending',
        day:state.episode
      };
      push90('bp90_invite_'+id,id,p.invite,{
        invite90:id
      })
    }
    
  }
  return before!==state.messages.length
}

const pending90=(m,i)=>m.invite90?data90().invites[m.invite90]?.status==='pending':pending7(m,i);
function unread90(id=null){return state.messages.reduce((n,m,i)=>n+(!data90().read.includes(i)&&!m.topic7&&(!id||m.who===id)?1:0),0)}
const face90=id=>`<div class="bpface">${id==='me'?avatar(state.look):sprite(id)}</div>`;
const name90=id=>chars[id]?.name||'Bellmont';
const button90=(act,label,attr='')=>`<button class="bpbutton" data-act="${act}" ${attr}>${label}</button>`;
const pill90=t=>`<span class="bppill">${esc(t)}</span>`;
function bubble90(t,mine=false){return `<div class="bpbubble ${mine?'bpmine':''}">${esc(t)}</div>`}
function inviteStatus90(id){
  return ({
    pending:'Pendente',accepted:'Aceito',declined:'Recusado',done:'Concluído'
  })[data90().invites[id]?.status]||'Encerrado'
}

function inviteControls90(id){const st=data90().invites[id]?.status;return `<div class="bpactions">${st==='pending'?button90('bp90invite','Aceitar ♡',`data-id="${id}" data-i="1"`)+button90('bp90invite','Recusar',`data-id="${id}" data-i="0"`):st==='accepted'?button90('bp90meet','Ir ao encontro',`data-id="${id}"`):pill90(inviteStatus90(id))}</div>`}
function replies90(id,m){
  const general=replyOptions(id).map(o=>[...o]);
  if(m.follow90)return [['Gostei de saber disso.','É bom poder conversar assim.',1,2,'Empatia'],['Você me deixou curiosa.','Te conto mais pessoalmente.',1,1,'Criatividade'],['Até depois!','Até logo.',0,0,'Carisma']];
  return general
}

const groupRounds90=[{
  who:'mabel',text:'Gente, qual vai ser o tema do nosso próximo encontro?',opts:['Café e fofoca.','Uma tarde de fotos.','Vamos ajudar no festival.'],answers:['Sabia que podia contar com você!','Ezra vai aprovar a ideia.','Responsável até demais, amiga.']
},{
  who:'iris',text:'Tenho uma teoria: a caixa do terraço esconde mais do que parece.',opts:['Vamos investigar com calma.','Isso parece uma história de filme.','Prefiro esperar as evidências.'],answers:['Concordo. Um mistério merece cuidado.','Já estou imaginando a trilha sonora.','Finalmente alguém que não confunde teoria com fato.']
},{
  who:'scarlett',text:'Precisamos escolher a decoração do festival. Opiniões?',opts:['Rosas e luzes douradas.','Lavanda e estrelas.','Algo clássico e elegante.'],answers:['Uma escolha bonita.','Surpreendentemente criativo.','Você tem bom gosto.']
}];

function group90(){if(state.episode<4)return '<h3>Grupo de Bellmont</h3><p>O grupo será criado no episódio 04.</p>';const d=data90();let h='<h3>Grupo de Bellmont</h3><p class="bpmuted">Mabel · Íris · Scarlett</p>'+state.phone7.group.map(x=>bubble90(x.text,true)+bubble90(x.who+': '+x.answer)).join('');for(let i=0;i<=d.group.length&&i<groupRounds90.length;i++){const r=groupRounds90[i];h+=bubble90(name90(r.who)+': '+r.text);if(d.group[i]!==undefined){const j=d.group[i];h+=bubble90(r.opts[j],true)+bubble90(name90(r.who)+': '+r.answers[j])}else h+='<div class="bpchoices">'+r.opts.map((x,j)=>button90('bp90group',esc(x),`data-i="${j}"`)).join('')+'</div>'}return h}
function chats90(){const ids=phoneContacts7().slice().sort((a,b)=>state.messages.findLastIndex(m=>m.who===b)-state.messages.findLastIndex(m=>m.who===a));let list=ids.filter(id=>filter90!=='unread'||unread90(id)).map(id=>`<button class="bpcontact" data-act="bp90chat" data-id="${id}" aria-pressed="${chat90===id}">${face90(id)}<span><b>${name90(id)}</b><small>${esc(state.messages.filter(m=>m.who===id).at(-1)?.text||'')}</small></span>${unread90(id)?pill90(String(unread90(id))):''}</button>`).join('');return `<div class="bpinbox"><div class="bpinboxleft"><div class="bpactions">${button90('bp90filter','Todas','data-id="all"')}${button90('bp90filter','Não lidas','data-id="unread"')}${button90('bp90filter','★','data-id="stars"')}</div>${filter90==='stars'?'<p class="bpmuted">Mensagens favoritas</p>'+data90().stars.filter(i=>state.messages[i]).map(i=>button90('bp90chat',esc(name90(state.messages[i].who)+': '+state.messages[i].text.slice(0,55)),`data-id="${state.messages[i].who}"`)).join(''):list||'<p class="bpmuted">Nenhuma conversa nesta lista.</p>'}${button90('bp90chat','♡ Grupo de Bellmont','data-id="group"')}</div><div class="bpthread">${chat90==='group'?group90():chat90&&ids.includes(chat90)?thread90(chat90):'<div class="bpempty"><span>✉</span><h3>Uma conversa começa com um oi.</h3><p>Escolha um contato para ver as mensagens.</p></div>'}</div></div>`}
function thread90(id){const d=data90();let h=`<div class="bpthreadhead">${face90(id)}<div><b>${name90(id)}</b><small>${romance93().includes(id)?stage(id):'Amizade'}</small></div></div>`;for(const [i,m] of state.messages.entries()){if(m.who!==id)continue;h+=`<div class="bpmsgmeta">${m.day90?'Dia '+m.day90:'Mensagem'} ${button90('bp90star',d.stars.includes(i)?'★':'☆',`data-i="${i}" aria-label="Favoritar mensagem"`)}</div>`+(!m.topic7?bubble90(m.text):'');if(m.invite90)h+=inviteControls90(id);else if(m.invite5){const st=state.e4.invites[id];h+=state.node==='e4pick'&&st==='pending'?`<div class="bpactions">${button90('invite5','Aceitar dupla','data-id="'+id+'" data-i="1"')}${button90('invite5','Recusar','data-id="'+id+'" data-i="0"')}</div>`:pill90(({accepted:'Dupla aceita',declined:'Recusado',closed:'Encerrado'})[st]||'Encerrado')}else if(state.replied[i])h+=bubble90(state.replied[i].text,true)+bubble90(state.replied[i].answer);else if(!m.topic7)h+=`<div class="bpchoices">${replies90(id,m).map((o,j)=>button90('bp90reply',esc(o[0]),`data-i="${i}" data-j="${j}"`)).join('')}</div>`;}h+='<div class="bptopics"><b>Puxar assunto</b><div class="bpactions">'+(chatTopics7[id]||[]).map((t,i)=>button90('bp90topic',esc(t[0]),`data-id="${id}" data-i="${i}" ${state.phone7.topics[id+':'+i+':'+state.episode]?'disabled':''}`)).join('')+'</div></div>';return h}
const feed90=[['mabel',1,'Primeiro dia e já temos assunto para uma temporada inteira. 🌸'],['dante',2,'Ensaio encerrado. O amplificador sobreviveu.'],['soren',2,'O cronograma do festival está atualizado no mural.'],['theo',2,'Treino de hoje: 3 cestas, 1 tropeço. Progresso!'],['ezra',3,'A luz na biblioteca às quatro da tarde merece uma exposição.'],['scarlett',3,'Rumores não são informações. Obrigada.'],['iris',4,'A decoração do festival está quase pronta. Estrelas em todo lugar.'],['valentim',4,'Um ensaio sem plateia às vezes é a melhor apresentação.'],['cecilia',5,'A comissão agradece a colaboração de todos.']];

function feedPanel90(){const d=data90(),v=closet9(state);let posts=feed90.map((p,i)=>({id:'npc'+i,who:p[0],day:p[1],text:p[2],likes:2+i%4})).filter(p=>p.day<=state.episode&&known90(p.who));posts.push(...v.posts.map((p,i)=>({id:'look'+i,who:'me',day:state.episode,text:p.caption||'Meu look de Bellmont ♡',photo:v.photos[p.photo],likes:p.likes||0,comments:p.comments||[]})));return `<div class="bpsection"><h3>BellFeed</h3><p class="bpmuted">O mural dos estudantes. Tudo acontece dentro do jogo.</p><div class="bpactions">${button90('bp90publish','Publicar meu visual')}${button90('bp90app','Meu álbum','data-id="photos"')}</div>${posts.reverse().map(p=>`<article class="bppost"><div class="bpthreadhead">${face90(p.who)}<div><b>${p.who==='me'?esc(state.name):name90(p.who)}</b><small>Dia ${p.day}</small></div></div><p>${esc(p.text)}</p>${p.photo?`<div class="bpfeedart bg9-${['rose','night','garden'].includes(p.photo.bg)?p.photo.bg:'rose'}">${art9(p.photo.look,true)}</div>`:''}<div class="bpactions">${button90('bp90like',(d.likes.includes(p.id)?'♥ ':'♡ ')+(p.likes+(d.likes.includes(p.id)?1:0)),`data-id="${p.id}"`)}${p.who!=='me'?button90('bp90comment','Comentar',`data-id="${p.id}"`):''}</div>${(p.comments||[]).map(c=>`<p class="bpcomment">${esc(c)}</p>`).join('')}${d.comments[p.id]?`<p class="bpcomment">Você: ${esc(d.comments[p.id])}</p>`:''}</article>`).join('')}</div>`}
phone7=function(){modalType='phone';seed90();const d=data90();if(app90==='messages'&&chat90&&chat90!=='group'){for(const [i,m] of state.messages.entries())if(m.who===chat90&&!d.read.includes(i))d.read.push(i)}let h='';const count=unread90();const pending=Object.values(d.invites).filter(x=>x.status==='pending').length;const nav=Object.entries(phoneApps90).map(([k,[icon,title]])=>`<button class="bpnavbtn" data-act="bp90app" data-id="${k}" aria-pressed="${app90===k}"><span>${icon}</span>${title}${k==='messages'&&count?`<em>${count}</em>`:k==='invites'&&pending?`<em>${pending}</em>`:''}</button>`).join('');
if(app90==='home')h=`<div class="bphome"><div class="bphero"><span>COLÉGIO BELLMONT · DIA ${state.episode}</span><h3>Seu mundo,<br>depois do sinal.</h3><p>${esc(d.status)}</p><div class="bpactions">${pill90(count+' não lidas')}${pill90(pending+' convites')}</div></div><div class="bpappgrid">${Object.entries(phoneApps90).filter(([k])=>k!=='home').map(([k,[i,t]])=>`<button data-act="bp90app" data-id="${k}"><span>${i}</span><b>${t}</b>${k==='messages'&&count?`<em>${count}</em>`:''}</button>`).join('')}<button data-act="bp90shop"><span>✦</span><b>BellShop</b></button><button data-act="sound"><span>♫</span><b>Música</b></button></div><div class="bphomefoot">${esc(state.name)} · ${wallet8(state).coins} BellCoins</div></div>`;
if(app90==='messages')h=chats90();
if(app90==='contacts')h=`<div class="bpsection"><h3>Contatos</h3>${[...romance93(),'mabel','scarlett','iris','cecilia'].map(id=>`<article class="bpcontactcard">${face90(id)}<div><b>${name90(id)}</b><small>${known90(id)?romance93().includes(id)?stage(id):'Amizade':'Ainda não conhecido'}</small></div>${known90(id)?button90('bp90chat','Conversar',`data-id="${id}"`):''}${romance93().includes(id)?button90('profile','Ficha',`data-id="${id}"`):''}</article>`).join('')}</div>`;
if(app90==='invites')h=`<div class="bpsection"><h3>Convites pessoais</h3><p class="bpmuted">Encontros opcionais, sem interromper o episódio.</p>${Object.entries(d.invites).map(([id,x])=>`<article class="bppost"><div class="bpthreadhead">${face90(id)}<div><b>${name90(id)}</b><small>${phoneData90[id].place} · ${inviteStatus90(id)}</small></div></div><p>${esc(phoneData90[id].invite)}</p>${inviteControls90(id)}</article>`).join('')||'<p>Os convites aparecem a partir do dia 2, com 8 pontos de confiança.</p>'}<h3>Duplas do festival</h3>${Object.entries(state.e4.invites||{}).map(([id,x])=>`<p>${name90(id)} · ${esc(({pending:'Pendente',accepted:'Aceito',declined:'Recusado',closed:'Encerrado'})[x]||x)}</p>`).join('')||'<p class="bpmuted">Nenhuma dupla registrada.</p>'}</div>`;
if(app90==='agenda')h=`<div class="bpsection"><h3>Agenda escolar</h3>${episodeNames7.map((n,i)=>`<article class="bppost"><b>Dia ${i+1} · ${esc(n)}</b><p>${i+1<state.episode?'Concluído':i+1===state.episode?'Episódio atual':'Aguardando'}</p></article>`).join('')}<h3>Encontros aceitos</h3>${Object.entries(d.invites).filter(([id,x])=>x.status==='accepted').map(([id,x])=>`<article class="bppost"><b>${name90(id)} · ${phoneData90[id].place}</b>${inviteControls90(id)}</article>`).join('')||'<p>Nenhum compromisso pendente.</p>'}</div>`;
if(app90==='feed')h=feedPanel90();
if(app90==='photos')h=`<div class="bpsection"><h3>Meu álbum</h3><p class="bpmuted">Fotos do ateliê e memórias da história.</p>${button90('bp90photo','Registrar visual atual')} ${button90('gallery','Memórias do Coração')}<div class="bpphotogrid">${closet9(state).photos.map((p,i)=>`<article>${feedPhoto13(p,true)}<b>Look ${i+1}</b>${button90('bp90post','Publicar',`data-i="${i}" ${closet9(state).posts.some(x=>x.photo===i)?'disabled':''}`)}</article>`).join('')}</div></div>`;
if(app90==='settings')h=`<div class="bpsection"><h3>Meu perfil</h3><div class="bpthreadhead">${face90('me')}<div><b>${esc(state.name)}</b><small>Foto acompanha o visual equipado</small></div></div><label for="bpstatus">Status</label><input id="bpstatus" maxlength="80" value="${esc(d.status)}">${button90('bp90status','Salvar status')}<h3>Tema do celular</h3><div class="bpactions">${['rose','night','lavender'].map((t,i)=>button90('bp90theme',['Rosa antigo','Noturno','Lavanda'][i],`data-id="${t}" aria-pressed="${d.theme===t}"`)).join('')}</div><h3>Notificações</h3>${button90('bp90notify',d.notifications?'Ativadas · Desativar':'Desativadas · Ativar')}</div>`;
showPanel('BellPhone 2.0',`<div class="bp90 bp-${d.theme}"><div class="bpstatus"><span>✦ BELLMONT MOBILE</span><span>Dia ${state.episode} · ◉</span></div><div class="bpshell"><nav class="bpnav">${nav}</nav><main class="bpcontent">${h}</main></div></div>`);document.querySelector('#modal .panel')?.classList.add('wide7','bppanel');persist();render();};
function openChat90(id){
  app90='messages';
  chat90=id;
  filter90='all';
  if(id!=='group'&&!phoneContacts7().includes(id)&&known90(id))push90('bp90_hello_'+id,id,'Oi! Que bom receber notícias suas.');
  phone7()
}

function publish90(i){
  const v=closet9(state);
  if(!v.photos[i]||v.posts.some(p=>p.photo===i))return;
  const top=romance93().filter(known90).sort((a,b)=>state.aff[b]-state.aff[a])[0];
  let comments=['Mabel: Que look lindo!'];
  if(top)comments.push(name90(top)+': '+({
    dante:'Tá legal. Não vou repetir.',soren:'Uma combinação muito bem escolhida.',theo:'Amei esse visual!',ezra:'As cores ficaram bonitas.',valentim:'Elegância natural.'
  }
  [top]));
  v.posts.push({
    photo:i,likes:top?3:1,comments,caption:'Meu look de Bellmont ♡'
  });
  toast('Publicado no BellFeed')
}

function meet90(id){const p=phoneData90[id];if(!p||data90().invites[id]?.status!=='accepted')return;modalType='phone';showPanel('Encontro · '+name90(id),`<div class="bpmeet"><div class="bpmeetart">${bg(p.loc==='garden'?'gate':p.loc)}<div>${sprite(id,'smile')}</div></div><p class="bpmuted">${p.place} · encontro opcional</p><p>${esc(p.scene)}</p><h3>${esc(p.question)}</h3><div class="bpchoices">${p.answers.map((a,i)=>button90('bp90dateanswer',esc(a[0]),`data-id="${id}" data-i="${i}"`)).join('')}</div>${button90('bp90app','Voltar sem concluir','data-id="invites"')}</div>`)}
const modal90base=modal;modal=function(t){if(t==='phone'){if(modalType!=='phone'){app90='home';chat90=null;filter90='all'}return phone7()}if(t==='about'){modalType=t;return showPanel('Depois do Sinal · v0.9','<p>BellPhone 2.0 · Cinco episódios, ateliê Signature, conversas, convites jogáveis, BellFeed, agenda, álbum e perfil. Tudo funciona offline.</p><p>Os diálogos são roteirizados; o mural é uma simulação local.</p>')}return modal90base(t)};
function renderPhoneStatus(changed) {
    if(state&&screen==='game'){
    const b=document.querySelector('.nav [data-act="phone"]'),
    n=unread90();
    if(b)b.textContent='▣ BellPhone'+(n?' · '+n+' novas':'');
    if(changed){
      persist();
      if(data90().notifications&&modalType!=='phone')toast('BellPhone · você recebeu mensagens ♡')
    }
    
  }
}

const cover90base=cover;cover=function(){return cover90base().replace(/Edição 0\.8\.3[^<]*/,'Edição 0.9 • BellPhone 2.0')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled||!state||!b.dataset.act.startsWith('bp90'))return;e.stopImmediatePropagation();const a=b.dataset.act,id=b.dataset.id,i=Number(b.dataset.i),j=Number(b.dataset.j),d=data90();if(a==='bp90app'&&phoneApps90[id]){app90=id;phone7();return}if(a==='bp90shop'){modal('wardrobe');return}if(a==='bp90chat'){openChat90(id);return}if(a==='bp90filter'){filter90=id;phone7();return}if(a==='bp90star'&&state.messages[i])d.stars=d.stars.includes(i)?d.stars.filter(x=>x!==i):[...d.stars,i];
if(a==='bp90reply'){
  const m=state.messages[i],
  o=m&&replies90(m.who,m)[j];
  if(!m||!o||!pending90(m,i)||m.invite90||m.invite5)return;
  state.replied[i]={
    text:o[0],
    answer:o[1],
    after94:state.messages.length,
    order94:++data94().serial,
    day94:roomData11().day
  };
  typing95(m.who,i);
  if(romance93().includes(m.who)){
    state.aff[m.who]+=o[2];
    state.trust[m.who]+=o[3];
    if(o[5])state.attraction[m.who]=(state.attraction[m.who]||0)+o[5]
  }
  state.attrs[o[4]]=(state.attrs[o[4]]||0)+1;
  if(!m.follow90&&!m.day94&&romance93().includes(m.who)&&!d.follow[m.who+':'+state.episode]&&o[2]>0&& !state.messages.some(x=>x.who===m.who&&x.text===phoneData90[m.who].extra[1])){
    d.follow[m.who+':'+state.episode]=true;
    state.messages.push({
      day94:roomData11().day,who:m.who,text:phoneData90[m.who].extra[1],follow90:true,day90:roomData11().day
    })
  }
  
}

if(a==='bp90topic'){
  topic7(id,i);
  return
}
if(a==='bp90group'&&state.episode>=4&&d.group.length<groupRounds90.length&&[0,1,2].includes(i)){
  d.group.push(i);
  typing95('group',d.group.length-1);
  
}

if(a==='bp90invite'&&d.invites[id]?.status==='pending')d.invites[id].status=i===1?'accepted':'declined';if(a==='bp90meet'){meet90(id);return}if(a==='bp90dateanswer'&&d.invites[id]?.status==='accepted'){const opt=phoneData90[id].answers[i];if(!opt)return;d.invites[id].status='done';state.aff[id]+=opt[2];state.trust[id]+=opt[3];if(id==='raven'&&i===0)state.attraction.raven+=5;state.log.push({who:id,choice:opt[0],aff:opt[2],trust:opt[3]});state.items.push('Encontro extra: '+name90(id));const n=state.messages.length;state.messages.push({day94:roomData11().day,who:id,text:opt[1],day90:roomData11().day});state.replied[n]={text:'Obrigada pelo encontro.',answer:'Até a próxima.'};persist();showPanel('Encontro concluído',`<div class="bpsection"><div class="bpdateportrait">${sprite(id,'shy')}</div><p>${esc(opt[1])}</p><p>Uma nova lembrança foi registrada no diário.</p>${button90('bp90app','Voltar aos convites','data-id="invites"')}</div>`);render();return}
if(a==='bp90like')d.likes=d.likes.includes(id)?d.likes.filter(x=>x!==id):[...d.likes,id];if(a==='bp90comment'){showPanel('Comentar publicação',`<div class="bpsection"><label for="bpcomment90">Seu comentário</label><textarea id="bpcomment90" maxlength="180" rows="3">${esc(d.comments[id]||'')}</textarea>${button90('bp90savecomment','Publicar comentário',`data-id="${id}"`)}</div>`);return}if(a==='bp90savecomment'){let t=document.getElementById('bpcomment90')?.value.trim().slice(0,180);if(t)d.comments[id]=t;else delete d.comments[id];app90='feed'}
if(a==='bp90photo'||a==='bp90publish'){
  const v=closet9(state);
  if(v.photos.length>=20){
    toast('Álbum cheio: limite de 20 fotos.');
    return
  }
  v.photos.push({
    look:JSON.parse(JSON.stringify(state.look)),bg:'rose'
  });
  if(a==='bp90publish')publish90(v.photos.length-1);
  else toast('Foto registrada ♡')
}

if(a==='bp90post'){publish90(i);app90='feed'}if(a==='bp90status'){d.status=(document.getElementById('bpstatus')?.value||'').trim().slice(0,80)}if(a==='bp90theme'&&['rose','night','lavender'].includes(id))d.theme=id;if(a==='bp90notify')d.notifications=!d.notifications;persist();phone7()},true);
