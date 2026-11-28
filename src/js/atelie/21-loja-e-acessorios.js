// loja-e-acessorios | v0.14
/* v0.8.1 Estilo & Conexões — wardrobe studio */
const accessories8={
  pearl:{
    name:'Presilhas Pérola',
    desc:'Duas presilhas delicadas',
    price:0,
    day:1,
    icon:'✧'
  },
  star:{
    name:'Estrela da Íris',
    desc:'Presilha dourada de estrela',
    price:45,
    day:2,
    icon:'☆'
  },
  brooch:{
    name:'Broche Rosa de Bellmont',
    desc:'Broche floral de lapela',
    price:65,
    day:3,
    icon:'❀'
  }
  
};

let tab8='clothes';
const cleanLook8=l=>({
  hair:l?.hair||'castanho',eyes:l?.eyes||'mel',skin:l?.skin||'clara',outfit:lookArt7[l?.outfit]?l.outfit:'uniforme',accessories:[...new Set(Array.isArray(l?.accessories)?l.accessories.filter(x=>Object.hasOwn(accessories8,x)):[])]
});

function wallet8(s){
  if(!s.style8)s.style8={
    coins:100,
    owned:['pearl'],
    favorites:[],
    paid:[],
    comments:[]
  };
  const a=s.style8;
  a.owned=Array.isArray(a.owned)?a.owned:['pearl'];
  a.favorites=Array.isArray(a.favorites)?a.favorites:[];
  a.paid=Array.isArray(a.paid)?a.paid:[];
  a.comments=Array.isArray(a.comments)?a.comments:[];
  a.coins=Number.isFinite(a.coins)?Math.max(0,a.coins):100;
  return a
}

function normalizeShop(s) {
    s.look=cleanLook8(s.look);wallet8(s);
}
function grant8(s){
  const a=wallet8(s);
  const pay=(k,n)=>{
    if(!a.paid.includes(k)){
      a.paid.push(k);
      a.coins+=n
    }
    
  };
  for(const [i,vis] of [s.visited,s.visited2,s.visited3].entries())for(const l of (vis||[]))pay('visit:'+i+':'+l,8);
  for(let i=1;i<(s.episode||1);i++)pay('end:'+i,35);
  if(['ending','e2ending','e3ending','e4ending','e5ending'].includes(s.node))pay('end:'+s.episode,35);
  
}

const avatar8base=avatar;avatar=function(l={},m='neutral'){const h=avatar8base(l,m);if(!l.accessories?.length)return h;const set=lookArt7[l.outfit]||lookArt7.uniforme;const [,w,height]=set[m]||set.neutral;const scale=w/434;let x='';const classic=!['casual','festival'].includes(l.outfit);const pinX=(classic?.31:.29)*w,pinY=.16*height;const starX=(classic?.68:.68)*w,starY=.20*height;const broochX=(classic?.78:.73)*w,broochY=(classic?.66:.69)*height;
if(l.accessories.includes('pearl'))x+=`<g transform="translate(${pinX} ${pinY}) rotate(-32) scale(${scale})" stroke="#9b774c" stroke-width="1.5"><rect x="-17" y="-7" width="34" height="6" rx="3" fill="#f5d6a0"/><rect x="-15" y="4" width="30" height="5" rx="2.5" fill="#e9b77a"/>${[-12,-4,4,12].map(p=>`<circle cx="${p}" cy="-4" r="4" fill="#fff6ea"/>`).join('')}</g>`;
if(l.accessories.includes('star'))x+=`<g transform="translate(${starX} ${starY}) scale(${scale})" stroke="#94662f" stroke-width="2"><path d="M0 -15 4 -5 15 -5 7 2 10 13 0 7 -10 13 -7 2 -15 -5 -4 -5Z" fill="#f8d68a"/><circle r="3" fill="#fff6da" stroke="none"/></g>`;
if(l.accessories.includes('brooch'))x+=`<g transform="translate(${broochX} ${broochY}) scale(${scale})" stroke="#85475f" stroke-width="1.3">${[0,72,144,216,288].map(r=>`<ellipse cy="-8" rx="6.5" ry="9" fill="#efafbc" transform="rotate(${r})"/>`).join('')}<circle r="5" fill="#eac071"/></g>`;
return h.replace('</svg>',x+'</svg>')};
function context8(){return modalType==='new'?draft:state}
function keepName8(){const n=document.getElementById('name');if(n&&draft)draft.name=n.value;}
function redraw8(){keepName8();drawWard7()}
const colors8={
  hair:[['castanho','Castanho','#785047'],['preto','Preto','#24242c'],['rosa','Rosa','#c7809b'],['loiro','Loiro','#d3af78']],
  eyes:[['mel','Mel','#ad774d'],['azul','Azul','#6c98c7'],['verde','Verde','#6f9a7a'],['castanho','Castanho','#654336']],
  skin:[['clara','Claro','#f2c8b1'],['media','Médio','#cf9979'],['escura','Escuro','#92604b']]
};

function swatches8(k,title){return `<div class="color8"><h3>${title}</h3><div class="swatches8">${colors8[k].map(([id,name,c])=>`<button class="swatch8" data-act="color8" data-key="${k}" data-id="${id}" aria-pressed="${draft.look[k]===id}"><span style="background:${c}"></span>${name}</button>`).join('')}</div></div>`}
function studio8(){const a=wallet8(context8()),l=draft.look,day=context8().episode||1;let content='';const tabs={clothes:'Roupas',beauty:'Beleza',accessory:'Acessórios',favorites:'Favoritos',shop:'BellShop'};
if(tab8==='clothes')content=`<h3>Coleção Bellmont</h3><p class="hint">Cinco roupas ilustradas, disponíveis desde o início.</p><div class="grid8">${Object.entries(outfitNames7).map(([id,n])=>`<button class="outfit7 card8" data-act="outfit8" data-id="${id}" aria-pressed="${l.outfit===id}"><div>${avatar({...l,outfit:id,accessories:[]})}</div><b>${n}</b><small>${l.outfit===id?'Em uso':'Na coleção'}</small></button>`).join('')}</div>`;
if(tab8==='beauty')content=swatches8('hair','Cor do cabelo')+swatches8('eyes','Cor dos olhos')+swatches8('skin','Tom de pele')+'<p class="hint">As cores são aplicadas em máscaras localizadas. Novos cortes de cabelo serão adicionados em uma atualização futura.</p>';
if(tab8==='accessory'||tab8==='shop')content=`<h3>${tab8==='shop'?'BellShop • acessórios':'Sua coleção de acessórios'}</h3><p class="hint">${tab8==='shop'?'Modo livre: BellCoins ilimitados.':'Combine os detalhes de forma independente. Eles aparecem também nas cenas e memórias que usam o visual salvo.'}</p><div class="accgrid8">${Object.entries(accessories8).map(([id,v])=>{const owned=a.owned.includes(id),on=l.accessories.includes(id),locked=day<v.day;return `<div class="acc8"><div class="accicon8">${v.icon}</div><div><b>${v.name}</b><small>${v.desc}</small><small>${owned?'Na coleção':locked?'Disponível no episódio '+v.day:v.price+' BellCoins'}</small></div>${owned?`<button class="soft" data-act="acc8" data-id="${id}" aria-pressed="${on}">${on?'Retirar':'Usar'}</button>`:`<button class="soft" data-act="buy8" data-id="${id}" ${false?'disabled':''}>Comprar</button>`}</div>`}).join('')}</div>`;
if(tab8==='favorites')content=`<h3>Meu catálogo de looks</h3><p class="hint">Salve até oito combinações completas, incluindo cores e acessórios.</p><div class="favform8"><input id="favname8" maxlength="30" placeholder="Nome do look"><button class="primary" data-act="savefav8" ${a.favorites.length>=8?'disabled':''}>Salvar favorito</button></div><div class="accgrid8">${a.favorites.map((f,i)=>`<div class="acc8"><div class="favportrait8">${avatar(f.look)}</div><div><b>${esc(f.name)}</b><small>${outfitNames7[f.look.outfit]||'Look'}</small></div><button class="soft" data-act="usefav8" data-i="${i}">Usar</button><button class="soft" data-act="delfav8" data-i="${i}" aria-label="Excluir ${esc(f.name)}">×</button></div>`).join('')||'<p class="hint">Nenhum favorito ainda.</p>'}</div>`;
return `<div class="studiohead8"><span class="tag">Ateliê Bellmont • Coleção 01</span><span class="wallet8">✦ ∞ BellCoins</span></div><div class="ward7 studio8"><div class="mirror7"><div class="avatar" id="avatar">${avatar(l,preview7)}</div><div class="looklabel8"><b>${outfitNames7[l.outfit]}</b><span>${poses7[preview7]}</span></div><div class="pose7">${Object.entries(poses7).map(([id,n])=>`<button class="soft" data-act="pose8" data-id="${id}" aria-pressed="${id===preview7}">${n}</button>`).join('')}</div><p class="hint">A expressão da prévia não altera a narrativa.</p></div><div class="fields">${modalType==='new'?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}<div class="tabs7 tabs8">${Object.entries(tabs).map(([id,n])=>`<button class="soft" data-act="tab8" data-id="${id}" aria-pressed="${tab8===id}">${n}</button>`).join('')}</div>${content}</div></div>`;}
drawWard7=function(){draft.look=cleanLook8(draft.look);const a=wallet8(context8());draft.look.accessories=draft.look.accessories.filter(id=>a.owned.includes(id));showPanel(modalType==='new'?'Crie sua protagonista':'Ateliê Bellmont',studio8()+`<div class="studiofoot8"><span class="hint">${modalType==='new'&&saved?'Novo jogo substitui o save atual.':'Seu visual é cosmético. Compras e favoritos são salvos ao usar o ateliê.'}</span><button class="primary" data-act="${modalType==='new'?'start':'wear'}">${modalType==='new'?'Começar a história':'Salvar visual'} ♡</button></div>`);document.querySelector('#modal .panel')?.classList.add('wide7','studioPanel8')};
const modal8base=modal;
modal=function(t){
  if(t==='new'||t==='wardrobe'){
    tab8='clothes';
    if(t==='wardrobe')grant8(state)
  }
  return modal8base(t)
};


function renderWardrobeBalance() {
    if(state&&screen==='game'){
    const b=document.querySelector('.nav [data-act="wardrobe"]');
    if(b)b.textContent='♙ Ateliê • '+'∞ ✦'
  }
}

const cover8base=cover;cover=function(){return cover8base().replace(/Edição 0\.7[^<]*/,'Edição 0.8.1 • Estilo & Conexões')};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||b.disabled||!draft||!['new','wardrobe'].includes(modalType))return;const k=b.dataset.act,id=b.dataset.id,i=Number(b.dataset.i),s=context8(),a=wallet8(s);if(!['tab8','outfit8','pose8','color8','acc8','buy8','savefav8','usefav8','delfav8'].includes(k))return;keepName8();if(k==='tab8')tab8=id;if(k==='outfit8'&&lookArt7[id])draft.look.outfit=id;if(k==='pose8'&&poses7[id])preview7=id;if(k==='color8'&&colors8[b.dataset.key]?.some(c=>c[0]===id))draft.look[b.dataset.key]=id;if(k==='acc8'&&a.owned.includes(id))draft.look.accessories=draft.look.accessories.includes(id)?draft.look.accessories.filter(x=>x!==id):[...draft.look.accessories,id];if(k==='buy8'){
    const v=accessories8[id];if(v&&!a.owned.includes(id)){
      a.owned.push(id);draft.look.accessories.push(id);toast('Acessório adquirido ♡')
    }
    
  }
  if(k==='savefav8'&&a.favorites.length<8){
    const n=document.getElementById('favname8').value.trim();if(!n){
      toast('Dê um nome à combinação.');return
    }
    a.favorites.push({
      name:n.slice(0,30),look:cleanLook8(draft.look)
    });toast('Look salvo ♡')
  }
  if(k==='usefav8'&&a.favorites[i])draft.look=cleanLook8(a.favorites[i].look);if(k==='delfav8'&&a.favorites[i])a.favorites.splice(i,1);if(modalType==='wardrobe')persist();drawWard7()
});



function addOutfitComment() {
  if(state){
    const nodes=['enc2','e2answer','e3answer','e4answer','e5answer'];
    const id=state.log?.at(-1)?.who;
    const a=wallet8(state);
    const style=state.look;
    if(nodes.includes(state.node)&&routes.includes(id)&&style&&(style.outfit!=='uniforme'||style.accessories?.length)){
      const k=state.episode+':'+id;
      if(!a.comments.includes(k)){
        a.comments.push(k);
        const name=outfitNames7[style.outfit]||'seu look';
        const detail=style.accessories?.length?'Os detalhes do seu visual ficaram legais.':'Gostei do seu look de hoje.';
        const lines={
          dante:'Mudou o visual, Encrenca? Ficou bom. Não faz disso um evento.',
          soren:'Seu visual de hoje estava bastante harmonioso. Apenas uma observação.',
          theo:'Adorei seu look de hoje! Tem muito a sua cara.',
          ezra:'A combinação de cores de hoje ficou bonita com a luz de Bellmont.',
          valentim:'Uma combinação de muito bom gosto. Não passou despercebida.'
        };
        state.messages.push({
          day94:roomData11().day,who:id,text:lines[id]||detail,style8:true
        });
        
      }
      
    }
    
  }
}
