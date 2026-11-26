// signature | v0.14
/* 0.8.3 - Atelier Signature: original illustrated portraits, optional experimental mix studio */
const layeredArt83=art9, layeredStudio83=studio9, layeredRating83=rating9;
const style83=l=>l?.visualMode9==='layered'?'layered':'signature';
const signatureNames83={
  uniforme:'Bellmont Classic',
  cardigan:'Sweet Blossom',
  jaqueta:'Off Duty',
  casual:'Sunday Café',
  festival:'Festival Romance'
};

const signatureDesc83={
  uniforme:'Alfaiataria vinho · laço clássico',
  cardigan:'Tricô rosado · delicadeza acadêmica',
  jaqueta:'Azul marinho · estilo esportivo',
  casual:'Tricô creme · tarde na cafeteria',
  festival:'Vinho e renda · noite especial'
};

const signatureTags83={
  uniforme:['academico'],
  cardigan:['academico','romantico'],
  jaqueta:['casual','esportivo'],
  casual:['casual','romantico'],
  festival:['romantico','elegante']
};

function signatureArt83(l,m='neutral',closeup=false){const k=lookArt7[l?.outfit]?l.outfit:'uniforme',set=lookArt7[k],actual=set[m]?m:'neutral';const [,w,h]=set[actual];let svg=animeAvatar83({...l,outfit:k,accessories:(l?.accessories||[]).filter(a=>Object.hasOwn(accessories8,a))},actual);if(closeup)svg=svg.replace(`viewBox="0 0 ${w} ${h}"`,`viewBox="${w*.10} 0 ${w*.80} ${h*.56}"`).replace('class="anime-sprite','style="overflow:hidden" class="anime-sprite');return svg}
art9=function(l,full=false,only=null){
  return only||style83(l)==='layered'?layeredArt83(l,full,only):signatureArt83(l,'neutral',full==='face')
};

avatar=function(l={},m='neutral'){return style83(l)==='layered'?layeredArt83(l,false):signatureArt83(l,m)};
rating9=function(ch,l){
  if(style83(l)==='layered')return layeredRating83(ch,l);
  return Math.min(5,(signatureTags83[l.outfit]||[]).some(t=>ch.tags.includes(t))?4+Math.min(1,(l.accessories||[]).filter(a=>Object.hasOwn(accessories8,a)).length):0)
};

function switch83(mode){
  keepName8();
  draft.look.visualMode9=mode;
  tab9=mode==='layered'?'top':'presets';
  preview7='neutral';
  pose9='full';
  drawWard7()
}

function modeBar83(l){return `<div class="edition83"><div><b>${style83(l)==='signature'?'Coleção Signature':'Laboratório de combinações'}</b><small>${style83(l)==='signature'?'Ilustrações originais • acabamento anime':'Modo experimental • peças avulsas'}</small></div><button class="soft" data-act="mode83" data-id="${style83(l)==='signature'?'layered':'signature'}">${style83(l)==='signature'?'Modo livre':'Voltar ao anime'}</button></div>`}
studio9=function(){const l=draft.look,s=current9(),w=wallet8(s),v=closet9(s),day=s.episode||1;if(style83(l)==='layered')return modeBar83(l)+layeredStudio83();let t=tab9;if(!['presets','beauty','accessory','favorites','challenge','photo'].includes(t))t='presets';let body='';const tabs={presets:'Coleção',beauty:'Beleza',accessory:'Acessórios',favorites:'Favoritos',challenge:'Desafios',photo:'Álbum & Feed'};
if(t==='presets')body=`<div class="heading83"><span>01 / COLEÇÃO PRINCIPAL</span><h3>O estilo é seu.</h3><p>Cinco looks ilustrados, cada um com cinco expressões.</p></div><div class="collection83">${Object.entries(signatureNames83).map(([id,n])=>`<button class="look83" data-act="preset9" data-id="${id}" aria-pressed="${l.outfit===id}"><div class="lookimg83">${catalogThumb92(id)}<span>${l.outfit===id?'EM USO':'COLEÇÃO 01'}</span></div><b>${n}</b><small>${signatureDesc83[id]}</small></button>`).join('')}</div>`;
if(t==='beauty')body=`<div class="heading83"><span>02 / BELEZA</span><h3>Detalhes que contam.</h3><p>As cores são localizadas na arte original. Os olhos fechados não recebem pigmento.</p></div>`+Object.entries(palettes9).map(([k,rows])=>`<h3>${({hair:'Cabelo',eyes:'Íris',skin:'Pele'})[k]}</h3><div class="swatches8">${rows.map(([id,n,c])=>`<button class="swatch8" data-act="color9" data-key="${k}" data-id="${id}" aria-pressed="${l[k]===id}"><span style="background:${c}"></span>${n}</button>`).join('')}</div>`).join('');
if(t==='accessory')body=`<div class="heading83"><span>03 / BELLSHOP</span><h3>Pequenos encantos.</h3><p>Três acessórios compatíveis com os retratos anime. As demais peças continuam no modo livre.</p></div><div class="accgrid8">${Object.entries(accessories8).map(([id,a])=>{let own=owned9(s,'accessory',id),on=l.accessories.includes(id);return `<div class="acc8"><div class="accicon8">${a.icon}</div><div><b>${a.name}</b><small>${a.desc}</small><small>${own?'Na coleção':day<a.day?'Ep. '+a.day:a.price+' BC'}</small></div><button class="soft" data-act="${own?'equip9':'buy9'}" data-key="accessory" data-id="${id}" ${!own&&(day<a.day||w.coins<a.price)?'disabled':''}>${own?(on?'Retirar':'Equipar'):'Comprar'}</button></div>`}).join('')}</div>`;
if(t==='favorites')body=`<div class="heading83"><span>04 / FAVORITOS</span><h3>Seu catálogo pessoal.</h3><p>Até 12 combinações, guardadas com suas cores e acessórios.</p></div><div class="favform8"><input id="fav9" maxlength="30" placeholder="Nome do look"><button class="primary" data-act="favorite9" ${w.favorites.length>=12?'disabled':''}>Salvar</button></div><div class="collection83">${w.favorites.map((f,i)=>`<div class="look83"><div class="lookimg83">${art9(f.look,true)}</div><b>${esc(f.name)}</b><div class="filter9"><button class="soft" data-act="use9" data-i="${i}">Vestir</button><button class="soft" data-act="delete9" data-i="${i}">Excluir</button></div></div>`).join('')||'<p>Nenhum favorito ainda.</p>'}</div>`;
if(t==='challenge')body=`<div class="heading83"><span>05 / DESAFIOS</span><h3>Vista-se para a ocasião.</h3><p>Escolha um look com o tema solicitado. A recompensa é única.</p></div>${challenge9.map(ch=>`<article class="event9"><b>${ch.title}</b><small>${ch.tags.join(' / ')} · ${ch.prize} BC</small><p>${'★'.repeat(rating9(ch,l))}${'☆'.repeat(5-rating9(ch,l))}</p><button class="soft" data-act="judge9" data-id="${ch.id}" ${day<ch.day||v.challenges.includes(ch.id)?'disabled':''}>${v.challenges.includes(ch.id)?'Concluído':day<ch.day?'Episódio '+ch.day:'Avaliar look'}</button></article>`).join('')}`;
if(t==='photo')body=`<div class="heading83"><span>06 / MEMÓRIAS</span><h3>Editorial de Bellmont.</h3><p>Registre seu look e publique no mural.</p></div><div class="filter9">${Object.entries({rose:'Rosa',night:'Noite',garden:'Jardim'}).map(([id,n])=>`<button class="soft" data-act="bg9" data-id="${id}" aria-pressed="${photoBg9===id}">${n}</button>`).join('')}</div><button class="primary" data-act="photo9" ${v.photos.length>=20?'disabled':''}>Registrar look ♡</button><div class="collection83">${v.photos.map((p,i)=>`<div class="look83"><div class="lookimg83 bg9-${p.bg}">${art9(p.look,true)}</div><b>Look ${i+1}</b><button class="soft" data-act="download9" data-i="${i}">Salvar imagem</button><button class="soft" data-act="post9" data-i="${i}" ${v.posts.some(x=>x.photo===i)?'disabled':''}>${v.posts.some(x=>x.photo===i)?'Publicado':'Publicar'}</button></div>`).join('')||'<p>Seu álbum está vazio.</p>'}</div><h3>BellFeed</h3>${v.posts.map(p=>`<article class="event9"><b>Look ${p.photo+1} · ${p.likes} curtidas</b>${p.comments.map(x=>`<p>${esc(x)}</p>`).join('')}</article>`).join('')||'<p class="hint">Nenhuma publicação ainda.</p>'}`;
return `<div class="studiohead8"><span class="tag">B / ATELIÊ BELLMONT · SIGNATURE</span><span class="wallet8">✦ ${w.coins} BellCoins</span></div>${modeBar83(l)}<div class="fashionlayout9 signature83"><div class="fashionmirror9"><div class="mirrorart9 bg9-${photoBg9}">${signatureArt83(l,preview7,pose9==='face')}</div><div class="caption83"><span>COLLECTION 01 · BELLMONT</span><b>${signatureNames83[l.outfit]||signatureNames83.uniforme}</b></div><div class="filter9"><button class="soft" data-act="zoom9" data-id="full" aria-pressed="${pose9==='full'}">Retrato</button><button class="soft" data-act="zoom9" data-id="face" aria-pressed="${pose9==='face'}">Rosto</button></div><div class="pose7">${Object.entries(poses7).map(([id,n])=>`<button class="soft" data-act="pose83" data-id="${id}" aria-pressed="${id===preview7}">${n}</button>`).join('')}</div><p class="hint">A narrativa escolhe a expressão durante os diálogos.</p></div><div class="fashionoptions9">${modalType==='new'?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}<div class="fashiontabs9">${Object.entries(tabs).map(([id,n])=>`<button class="soft" data-act="tab9" data-id="${id}" aria-pressed="${t===id}">${n}</button>`).join('')}</div><div class="fashioncatalog9">${body}</div></div></div>`};
const modal83base=modal;modal=function(t){if(t==='new'||t==='wardrobe')preview7='neutral';if(t==='about'){modalType=t;return showPanel('Depois do Sinal · v0.8.3','<p>Ateliê Signature: retratos anime originais, cinco looks ilustrados, expressões e personalização localizada. O modo livre mantém as peças vetoriais da versão anterior.</p><p>Cinco episódios jogáveis. Funciona offline.</p>')}return modal83base(t)};
const cover83base=cover;cover=function(){return cover83base().replace(/Edição 0\.8\.2[^<]*/,'Edição 0.8.3 • Ateliê Signature')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled||!draft||!['new','wardrobe'].includes(modalType))return;if(b.dataset.act==='mode83'){e.stopImmediatePropagation();switch83(b.dataset.id)}else if(b.dataset.act==='pose83'){e.stopImmediatePropagation();keepName8();preview7=b.dataset.id;drawWard7()}else if(b.dataset.act==='download9'){const p=closet9(current9()).photos[Number(b.dataset.i)];if(!p||style83(p.look)==='layered')return;e.stopImmediatePropagation();let svg=withEmbedded14(()=>signatureArt83(p.look)),vb=svg.match(/viewBox="([^"]+)"/)[1];const [x,y,w,h]=vb.split(' ').map(Number);svg=svg.replace(/(<svg[^>]*>)/,`$1<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${({rose:'#f3e0e8',night:'#39374f',garden:'#e0e8d5'})[p.bg]||'#f3e0e8'}"/>`);let u=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),a=document.createElement('a');a.href=u;a.download='bellmont-signature.svg';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}},true);
