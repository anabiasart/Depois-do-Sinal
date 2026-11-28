// GERADO: edite src/js e execute npm run build.
// midia-e-salvamento | v0.14
/* v0.14 — shared media and save service. Assets are immutable and remain offline. */
const mediaPool14=new Map();let exporting14=false,decoded14=0,writeCount14=0,skippedWrites14=0,saveWarning14='',recovered14=false;
function mediaURL14(data,mime='image/webp'){
 if(!data)return '';if(data.startsWith('blob:')||data.startsWith('data:'))return data;
 if(exporting14)return 'data:'+mime+';base64,'+data;
 let entry=mediaPool14.get(data);if(entry)return entry;
 try{
  const bin=atob(data),
  bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  entry=URL.createObjectURL(new Blob([bytes],{
    type:mime
  }));
  mediaPool14.set(data,entry);
  decoded14+=bytes.length;
  return entry;
  
}
catch{
  return 'data:'+mime+';base64,'+data
}

}
function compactMedia14(html){if(exporting14||typeof html!=='string'||!html.includes(';base64,'))return html;return html.replace(/data:(image\/(?:webp|png|jpeg)|audio\/mpeg);base64,([A-Za-z0-9+/=]{100,})/g,(_,mime,data)=>mediaURL14(data,mime))}
function withEmbedded14(fn){const old=exporting14;exporting14=true;try{return fn()}finally{exporting14=old}}
function object14(x){return x!==null&&typeof x==='object'&&!Array.isArray(x)}
function validSave14(s){
  return object14(s)&&typeof s.name==='string'&&typeof s.node==='string'&&object14(s.look)&&object14(s.aff)&&object14(s.trust)&&Array.isArray(s.visited)&&Array.isArray(s.messages)&&s.messages.every(x=>object14(x)&&typeof x.who==='string'&&typeof x.text==='string')&&['dante','soren','theo','ezra','valentim'].every(id=>Number.isFinite(s.aff[id])&&Number.isFinite(s.trust[id]))&&(s.episode===undefined||Number.isInteger(s.episode)&&s.episode>=1&&s.episode<=5)
}

function parseSave14(raw){try{const s=JSON.parse(raw);return validSave14(s)?s:null}catch{return null}}
function loadSave14(){
  try{
    let raw=localStorage.getItem(key),
    s=parseSave14(raw);
    if(s)return s;
    let b=parseSave14(localStorage.getItem(key+':backup14'));
    if(b){
      recovered14=true;
      return b
    }
    if(raw)saveWarning14='Salvamento ilegível. Importe uma cópia JSON.';
    return null
  }
  catch{
    saveWarning14='Armazenamento local indisponível. Use exportação JSON.';
    return null
  }
  
}

function writeSave14(s){saved=s;try{const raw=JSON.stringify(s),old=localStorage.getItem(key);if(raw===old){skippedWrites14++;storageOK=true;return true}if(parseSave14(old)){try{localStorage.setItem(key+':backup14',old)}catch{/* Keep the active save even when backup quota is exhausted. */}}localStorage.setItem(key,raw);writeCount14++;storageOK=true;saveWarning14='';return true}catch{storageOK=false;saveWarning14='Não foi possível gravar no navegador. Exporte seu progresso.';return false}}
function prepareSave14(s){
  if(!validSave14(s))throw Error('Formato inválido');
  const clean=JSON.parse(JSON.stringify(s));
  for(const k of ['items','gallery','log','visited2','visited3','known2','gallery2','clues'])if(clean[k]!==undefined&&!Array.isArray(clean[k]))throw Error('Campo inválido: '+k);
  for(const k of ['flags','attrs','attraction','jealousy','replied','e4','e5','style8','fashion9','bellphone90','city10','room11','world12','social13','raven93'])if(clean[k]!==undefined&&!object14(clean[k]))throw Error('Campo inválido: '+k);
  for(const k of ['items','gallery','log'])if(!Array.isArray(clean[k]))clean[k]=[];
  clean.name=clean.name.slice(0,24)||'Alex';
  normalize(clean);
  return clean
}

function commitSave14(s){
  const previous=state;
  try{
    state=s;
    current()
  }
  finally{
    state=previous
  }
  finishTyping11();
  typingMap95.clear();
  stopSound();
  state=s;
  scene10=null;
  activeRoutine12=null;
  close();
  screen='game';
  update();
  if(state.sound)playSound()
}

// inicializacao | v0.14
'use strict';

// personagens-e-locais | v0.14
const chars={
  dante:{
    name:'Dante',
    hair:'#29232e',
    shade:'#15141d',
    eyes:'#b67a40',
    skin:'#e9b7a0',
    coat:'#34303d',
    shirt:'#f6eee9',
    accent:'#9d3b54',
    style:'messy',
    label:'O problema',
    note:'Guitarra, ironia e zero vocação para obedecer.'
  },
  soren:{
    name:'Soren',
    hair:'#d7dbe4',
    shade:'#a2aaba',
    eyes:'#6096b3',
    skin:'#f5d6c9',
    coat:'#29394e',
    shirt:'#fff7ef',
    accent:'#8d647b',
    style:'sweep',
    label:'O impecável',
    note:'Presidente do conselho estudantil.'
  },
  theo:{
    name:'Theo',
    hair:'#d5a353',
    shade:'#a77736',
    eyes:'#718d53',
    skin:'#efbfa4',
    coat:'#627c79',
    shirt:'#faf2e6',
    accent:'#cf9261',
    style:'fluffy',
    label:'O sol',
    note:'Esportista, brincalhão e especialista em desastres.'
  },
  ezra:{
    name:'Ezra',
    hair:'#625069',
    shade:'#41334b',
    eyes:'#777c95',
    skin:'#e4c1b3',
    coat:'#60536c',
    shirt:'#f6e9e2',
    accent:'#b18aa8',
    style:'long',
    label:'O observador',
    note:'Fotógrafo do jornal, poucas palavras.'
  },
  valentim:{
    name:'Valentim',
    hair:'#a6553c',
    shade:'#73342c',
    eyes:'#b08b47',
    skin:'#f1c5aa',
    coat:'#e2d5c5',
    shirt:'#fff8ed',
    accent:'#6c3f53',
    style:'sweep',
    label:'O príncipe',
    note:'Um sobrenome famoso e um sorriso ensaiado.'
  },
  mabel:{
    name:'Mabel',
    hair:'#c17e88',
    shade:'#8a5264',
    eyes:'#718d73',
    skin:'#f0c3ac',
    coat:'#a984a6',
    shirt:'#fff4e9',
    accent:'#a64a78',
    style:'girl',
    label:'Sua nova amiga',
    note:'Sabe tudo. Não pergunte como.'
  },
  scarlett:{
    name:'Scarlett',
    hair:'#60403b',
    shade:'#3e2a2b',
    eyes:'#a48a56',
    skin:'#dca68a',
    coat:'#8b435c',
    shirt:'#fff4e9',
    accent:'#dfb284',
    style:'girl',
    label:'A estrela',
    note:'Organizadora do festival.'
  }
  
};

const routes=['dante','soren','theo','ezra','valentim'];
const locs={
  bedroom:['Seu quarto','Manhã'],
  gate:['Portão de Bellmont','Entrada'],
  hall:['Corredor principal','Conselho estudantil'],
  music:['Sala de música','Clube de música'],
  gym:['Ginásio','Quadra'],
  library:['Biblioteca','Jornal escolar'],
  garden:['Jardim','Pátio externo'],
  roof:['Terraço','Fim de tarde'],
  cafe:['Cafeteria','Intervalo']
};

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let spriteSerial=0;
const visualProfiles={
 dante:{
  title:'O problema que você deveria evitar',
  color:'#a23d55',
  icon:'♬',
  club:'Clube de música',
  detail:'Guitarrista. Usa o uniforme do jeito que quer, o que explica parte das visitas à diretoria.',
  quote:'Você sempre fala tanto ou está tentando me impressionar?'
},
 soren:{
  title:'O garoto que nunca perde o controle',
  color:'#597895',
  icon:'♜',
  club:'Conselho estudantil',
  detail:'Presidente do conselho. Tem uma agenda impecável e uma tolerância muito limitada para atrasos.',
  quote:'Você tem um talento peculiar para complicar a minha rotina.'
},
 theo:{
  title:'O sorriso mais perigoso de Bellmont',
  color:'#c48b43',
  icon:'✦',
  club:'Esportes',
  detail:'Joga na quadra e transforma qualquer situação em uma piada, até quando deveria falar sério.',
  quote:'Se perguntarem, foi você que me chamou para sair.'
},
 ezra:{
  title:'O silêncio que diz demais',
  color:'#79618f',
  icon:'◉',
  club:'Jornal escolar',
  detail:'Fotografa para o jornal. Percebe detalhes que passam despercebidos pelos outros.',
  quote:'Não se mexe. A luz ficou bonita em você.'
},
 valentim:{
  title:'O príncipe que ninguém conhece',
  color:'#a36b45',
  icon:'♛',
  club:'Comissão do festival',
  detail:'Conhece quase todo mundo e tem um sobrenome que abre portas. O resto ainda é um mistério.',
  quote:'Você é a primeira pessoa daqui que não parece impressionada comigo.'
}

};
const animeArt={
  "dante":[ASSETS14[0],439,724],
  "soren":[ASSETS14[1],432,724],
  "theo":[ASSETS14[2],430,724],
  "ezra":[ASSETS14[3],433,724],
  "valentim":[ASSETS14[4],438,724]
};

// sprites-e-cenarios | v0.14
function sprite(id,mood='neutral',custom=null){
 if(!custom&&expressionArt[id]){return sheetSprite(expressionArt[id],mood,chars[id].name,'anime-sprite mood-sprite');}
 if(!custom&&animeArt[id]){const [data,w,h]=animeArt[id];return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="anime-sprite" role="img" aria-label="${chars[id].name}"><image href="${mediaURL14(data,'image/webp')}" width="${w}" height="${h}"/></svg>`;}
 const c=custom||chars[id];if(!c)return '';const u='art'+(++spriteSerial),g=n=>`url(#${u}${n})`,girl=c.style==='girl';
 const style=id==='valentim'?'waves':c.style,tilt={dante:-3,soren:0,theo:4,ezra:-2,valentim:2}[id]||0;
 const hair={
  messy:'M79 123 Q61 106 72 77 L58 82 78 57 70 40 102 43 119 21 140 36 169 17 184 38 214 33 221 55 244 76 231 82 239 109 221 143 212 98 198 115 180 74 169 118 151 91 136 126 126 83 108 111 101 94 85 142Z',
  sweep:'M77 139 Q58 92 76 65 Q87 21 153 20 Q209 18 229 64 Q243 90 225 136 L215 101 Q204 78 187 61 Q154 101 113 104 L124 83 Q100 106 92 130 L86 147Z',
  fluffy:'M79 133 Q57 108 75 83 Q59 65 82 53 Q77 32 109 35 Q122 12 145 30 Q174 10 194 32 Q222 26 228 55 Q251 66 233 93 L225 131 213 99 Q198 113 182 91 Q165 116 150 91 Q133 117 118 90 L101 127 91 104Z',
  long:'M74 175 Q50 100 69 59 Q90 13 150 21 Q215 15 239 67 Q250 123 225 177 L211 181 216 100 Q198 95 190 68 L171 128 153 89 135 127 121 76 102 114 90 181Z',
  waves:'M78 141 Q60 108 74 75 Q66 44 104 35 Q125 9 153 28 Q189 11 211 40 Q240 45 238 80 Q247 109 222 142 L215 95 Q198 93 185 63 Q173 93 142 103 L155 75 Q131 108 101 115 L91 145Z',
  girl:'M73 182 Q51 108 70 62 Q89 15 150 19 Q217 18 237 66 Q253 115 230 191 L216 208 217 102 Q179 99 149 66 Q122 104 96 108 L91 204Z'
}
[style];

 const happy=mood==='smile',mad=mood==='annoyed',shy=mood==='shy',surprise=mood==='surprise';
 const eyeY=id==='soren'?132:130,eyeH=girl?13:id==='theo'?11:id==='dante'?8:9;
 const eye=(x,flip)=>`<g transform="translate(${x} ${eyeY}) scale(${flip} 1)"><path d="M-20 1 Q-6 ${-eyeH-6} 16 -4 Q8 ${eyeH+2} -9 ${eyeH-1}Z" fill="#fff5ee"/><ellipse cx="-1" cy="-1" rx="8.8" ry="${eyeH+1}" fill="${g('iris')}"/><ellipse cx="-1" cy="-1" rx="4" ry="6.5" fill="#261e32"/><ellipse cx="-4" cy="-5" rx="3" ry="2.5" fill="#fff"/><circle cx="3" cy="4" r="1.3" fill="#fff9ed"/><path d="M-21 1 Q-6 ${-eyeH-6} 16 -4" fill="none" stroke="#342537" stroke-width="${girl?3.5:2.7}" stroke-linecap="round"/><path d="M-13 ${eyeH-2} Q0 ${eyeH+4} 12 3" fill="none" stroke="#9c6a78" stroke-width="1" opacity=".55"/></g>`;
 const brow=mad?'M102 113 Q118 112 137 123 M163 123 Q181 112 198 113':surprise?'M101 107 Q117 98 137 109 M163 109 Q183 98 198 107':happy?'M102 112 Q119 103 136 112 M164 112 Q182 103 198 111':'M102 114 Q120 107 137 113 M163 113 Q181 107 198 114';

 const mouth=surprise?'<ellipse cx="151" cy="171" rx="6" ry="5" fill="#a35d68"/>':happy?`<path d="M134 166 Q150 173 169 164 Q157 186 141 176Z" fill="#8c4d60"/><path d="M137 168 Q151 174 166 166 L161 172 Q150 177 141 172Z" fill="#fff4e8"/>`:mad?'<path d="M137 171 Q151 163 165 169" fill="none" stroke="#8f4e60" stroke-width="2"/>':`<path d="M137 169 Q153 ${id==='dante'||id==='valentim'?175:171} 166 166" stroke="#925768" stroke-width="1.9" fill="none" stroke-linecap="round"/>`;
 const jacket=id==='dante'?`<path d="M121 215L89 226 66 281 107 307 91 353 113 384 129 265M179 215L212 226 234 281 193 307 209 353 187 384 171 265" fill="${g('jacket')}" stroke="#83717e" stroke-width="1.7"/><path d="M100 303l-18 77m112-68l28 67" stroke="#b1a0aa" stroke-width="3"/><path d="M114 218 Q151 259 185 219" stroke="#e0d1cd" stroke-width="2" fill="none"/><circle cx="151" cy="257" r="4" fill="#d6c8cc"/>`:id==='theo'?`<path d="M110 217L91 232 111 296 126 262M190 217L209 232 189 296 174 262" fill="#f4e8da"/><path d="M38 280L80 291M34 291L76 302M262 280L220 291M266 291L224 302" stroke="#e5cfc0" stroke-width="5"/><text x="211" y="327" text-anchor="middle" font-family="Georgia" font-size="27" font-style="italic" fill="#f7edda">B</text>`:`<path d="M120 215L88 232 80 274 110 272 92 294 119 352M180 215L212 232 220 274 190 272 208 294 181 352" fill="${g('jacket')}" stroke="#e9cfce" stroke-opacity=".6" stroke-width="1.5"/><path d="M204 313h34v4h-34" stroke="${c.accent}" stroke-width="2"/>${id==='soren'?'<path d="M212 320l11-7 11 7v12l-11 9-11-9Z" fill="#bca579"/><path d="M218 323h10m-5-4v14" stroke="#34465a" stroke-width="1.5"/>':id==='valentim'?'<path d="M211 314l14-10 7 10Z" fill="#8e4d57"/><circle cx="198" cy="270" r="3" fill="#b38b46"/>':''}`;
 const accessory=id==='dante'?'<path d="M82 145q-13 8-5 17q8 5 12-6" fill="none" stroke="#e2d8e1" stroke-width="3"/><circle cx="218" cy="144" r="3" fill="#eee4e8"/>':id==='ezra'?'<g stroke="#504357" stroke-width="2.2" fill="#e9e5f2" fill-opacity=".12"><rect x="99" y="118" width="42" height="29" rx="10"/><rect x="159" y="118" width="42" height="29" rx="10"/><path d="M141 129q9-5 18 0" fill="none"/></g><path d="M107 218Q151 256 202 218" stroke="#322b43" stroke-width="8" fill="none"/><rect x="126" y="263" width="50" height="33" rx="5" fill="#332c40" stroke="#9c899e"/><circle cx="152" cy="280" r="11" fill="#606780" stroke="#a79aaf" stroke-width="3"/>':id==='theo'?'<g fill="#ac725b" opacity=".7"><circle cx="108" cy="149" r="1.5"/><circle cx="117" cy="151" r="1.5"/><circle cx="124" cy="148" r="1"/><circle cx="192" cy="149" r="1.5"/><circle cx="183" cy="151" r="1.5"/><circle cx="176" cy="148" r="1"/></g>':id==='mabel'?'<path d="M89 85l-22-12 2 23 20-4 20 12-3-22Z" fill="#f3d4de" stroke="#9d6681" stroke-width="1.4"/>':id==='scarlett'?'<path d="M211 69l-18-9m22 16l-18-9" stroke="#e5c08b" stroke-width="3" stroke-linecap="round"/>':'';
 return `<svg viewBox="0 0 300 445" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(c.name)}"><defs><linearGradient id="${u}hair" x1="0" y1="0" x2=".75" y2="1"><stop stop-color="${c.hair}"/><stop offset=".48" stop-color="${c.hair}"/><stop offset="1" stop-color="${c.shade}"/></linearGradient><linearGradient id="${u}skin" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="${c.skin}"/><stop offset=".72" stop-color="${c.skin}"/><stop offset="1" stop-color="#b77c76"/></linearGradient><linearGradient id="${u}jacket" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="${c.coat}"/><stop offset="1" stop-color="${c.shade}"/></linearGradient><linearGradient id="${u}iris" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#3d344a"/><stop offset=".58" stop-color="${c.eyes}"/><stop offset="1" stop-color="${c.eyes}"/></linearGradient><radialGradient id="${u}blush"><stop stop-color="#df8797" stop-opacity=".55"/><stop offset="1" stop-color="#df8797" stop-opacity="0"/></radialGradient></defs>
 ${girl||style==='long'?`<path d="M76 57Q150 0 221 58L249 282Q210 307 155 264Q103 307 52 282Z" fill="${g('hair')}" stroke="${c.shade}" stroke-width="2"/><path d="M70 141q-3 94-9 130m164-130q4 94 15 130" stroke="${c.hair}" stroke-width="4" fill="none" opacity=".5"/>`:''}
 <path d="M125 185L121 216 90 229 150 282 210 229 179 216 175 185Z" fill="${g('skin')}" stroke="#76535d" stroke-width="1.5"/><path d="M125 192Q150 220 177 195L179 216Q152 232 122 218Z" fill="#a66a72" opacity=".35"/>
 <path d="M119 213L150 235 181 213 230 236 221 445H79L70 236Z" fill="${c.shirt}" stroke="#685462" stroke-width="1.5"/><path d="M118 214L98 228 128 265 150 235 172 265 202 228 182 214 150 235Z" fill="#fff7ee" stroke="#c8b1b7" stroke-width="1.3"/>
 ${id==='dante'||id==='theo'?'':girl?`<path d="M150 239l-27-13-2 25 29-6 29 6-2-25Z" fill="${c.accent}"/><path d="M145 245l-13 36 15-7 3-25 3 25 15 7-13-36" fill="${c.accent}"/>`:`<path d="M150 235l-12 16 8 14-9 104 13 17 13-17-9-104 8-14Z" fill="${c.accent}"/><path d="M143 282l13 8m-15 11l16 9m-18 11l18 10" stroke="#fff" stroke-opacity=".17" stroke-width="3"/>`}
 <path d="M117 215L73 228Q42 238 33 275L12 445H110L113 332 128 265Z M183 215L227 228Q258 238 267 275L288 445H190L187 332 172 265Z" fill="${g('jacket')}" stroke="#443344" stroke-width="2"/><path d="M61 289L48 405M239 289L252 405M45 411l28 5m182-5l-28 5" stroke="#2d2538" stroke-opacity=".5" stroke-width="2.5" fill="none"/><path d="M38 274Q50 247 73 239M262 274Q250 247 227 239" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3"/>${jacket}
 <g transform="rotate(${tilt} 150 190)"><path d="M89 117Q69 106 76 139Q80 157 94 152M211 117Q231 106 224 139Q220 157 206 152" fill="${c.skin}" stroke="#926672" stroke-width="1.5"/><path d="M84 125q-7 4 2 14m130-14q7 4-2 14" stroke="#b07c80" fill="none" stroke-width="1.3"/>
 <path d="M89 79Q109 39 150 39Q191 39 211 79L215 124Q212 159 193 182Q171 201 150 207Q129 201 107 182Q88 159 85 124Z" fill="${g('skin')}" stroke="#805766" stroke-width="1.65"/><path d="M91 115Q97 88 114 83Q150 98 200 75L213 111Q195 105 184 104Q147 117 113 109Z" fill="#996273" opacity=".14"/>
 <path d="${brow}" stroke="${c.shade}" stroke-width="2.6" fill="none" stroke-linecap="round"/>${eye(121,1)}${eye(179,-1)}<path d="M151 136l-5 17 8 2" stroke="#a16b74" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="151" cy="160" rx="5" ry="1.4" fill="#fff" opacity=".2"/>${mouth}<path d="M144 181q7 3 13 0" fill="none" stroke="#b27e83" stroke-width="1.1" opacity=".55"/>
 ${(happy||shy)?`<ellipse cx="109" cy="151" rx="18" ry="9" fill="${g('blush')}"/><ellipse cx="191" cy="151" rx="18" ry="9" fill="${g('blush')}"/>`:''}
 <path d="${hair}" fill="${g('hair')}" stroke="${c.shade}" stroke-width="1.9" stroke-linejoin="round"/>
 <g fill="none" stroke-linecap="round"><path d="M91 71Q114 34 148 43M134 42Q177 27 207 65M207 64Q224 84 219 106" stroke="#fff" stroke-opacity=".22" stroke-width="3.8"/><path d="M82 98Q93 57 128 51M153 43Q181 42 196 58M104 90Q116 67 135 60" stroke="${c.shade}" stroke-opacity=".53" stroke-width="1.4"/><path d="M111 48Q139 33 165 37" stroke="#fff" stroke-opacity=".13" stroke-width="7"/></g>${accessory}</g></svg>`;
}
function bg(id){const colors={bedroom:['#e8cedc','#f3ded5'],gate:['#a9c8d5','#f8e5bc'],hall:['#e2ccd4','#f6e9d9'],music:['#b9a5c6','#e7c9bb'],gym:['#b5ced7','#e8dcc6'],library:['#c8abb1','#e9cfb1'],garden:['#b6cdd3','#f5d9c0'],roof:['#9eaecf','#f6b5a1'],cafe:['#c9a9b0','#f1d5b7']}[id]||['#e0c4d7','#f0d8cb'];let a='';if(['gate','garden','roof'].includes(id)){a+=`<path d="M0 255L150 180 280 240 430 165 580 230 740 135 1000 240V430H0Z" fill="#a5a9af" opacity=".45"/><circle cx="770" cy="100" r="53" fill="#fff0c8" opacity=".8"/>`;if(id==='gate'){a+=`<path d="M180 130H820V340H180Z" fill="#d2a5a5" stroke="#9b7984" stroke-width="3"/><path d="M160 130L500 35 840 130Z" fill="#80677e"/><path d="M440 125h120v215H440Z" fill="#f4d7bf"/><path d="M470 220h60v120h-60Z" fill="#866b80"/><text x="500" y="186" text-anchor="middle" font-family="Georgia" font-size="22" fill="#79596d">BELLMONT</text>`;for(let i=0;i<6;i++)if(i!==2&&i!==3)a+=`<rect x="${215+i*105}" y="155" width="59" height="103" rx="4" fill="#abc4ce" stroke="#f1d6c1" stroke-width="8"/><path d="M${244+i*105} 155v103" stroke="#f1d6c1" stroke-width="4"/>`;}a+=`<path d="M0 322H1000V550H0Z" fill="${id==='roof'?'#a99aa8':'#9cac93'}"/><path d="M445 321H555L820 550H170Z" fill="#d7c4bb"/>`;if(id==='roof'){a+=`<path d="M0 300H1000V340H0Z" fill="#c5a6b0"/><path d="M0 240H1000 M0 290H1000" stroke="#725d78" stroke-width="7"/>`;for(let i=0;i<15;i++)a+=`<path d="M${i*74} 240v100" stroke="#725d78" stroke-width="4"/>`;}else{for(const x of [60,155,855,950]){a+=`<path d="M${x} 350l7 -190" stroke="#786c71" stroke-width="13"/>`;for(let j=0;j<7;j++)a+=`<circle cx="${x+Math.cos(j*2.4)*40}" cy="${156+Math.sin(j*2.4)*45}" r="${33+j%3*8}" fill="${['#b7aaac','#d9a7b8','#e7bac8'][j%3]}" opacity=".94"/>`;}if(id==='garden')a+=`<ellipse cx="500" cy="395" rx="135" ry="35" fill="#a18899"/><ellipse cx="500" cy="385" rx="128" ry="29" fill="#b8d5d9"/><path d="M490 385v-85h20v85" fill="#cfb9b8"/><path d="M500 299Q440 318 455 370M500 299Q560 318 545 370" fill="none" stroke="#edf6f5" stroke-width="3"/>`;}}else{a+=`<path d="M0 0H1000L730 105H270Z" fill="#f7e6de"/><path d="M0 550L270 312H730L1000 550Z" fill="#bca5ae"/><path d="M0 0L270 105V312L0 550Z" fill="#c8adb9"/><path d="M1000 0L730 105V312L1000 550Z" fill="#d6bcc0"/><path d="M270 105H730V312H270Z" fill="#e8d4cb"/><path d="M0 550L500 312 1000 550M250 550L500 312 750 550M0 457H1000M0 390H1000" fill="none" stroke="#f3ded3" stroke-opacity=".4" stroke-width="2"/>`;if(id==='hall'){for(let i=0;i<5;i++){let x=15+i*49; a+=`<path d="M${x} ${35+i*15}L${x+43} ${50+i*15}V${460-i*31}L${x} ${492-i*31}Z" fill="#aa97b1" stroke="#806f8e" stroke-width="2"/><path d="M${x+9} ${100+i*13}h21m-21 7h21m-21 7h21" stroke="#e9d9e7" stroke-width="2"/>`;}a+=`<rect x="439" y="150" width="122" height="162" fill="#937a91" stroke="#f8e7db" stroke-width="7"/><rect x="462" y="165" width="76" height="66" fill="#b8d0d5"/>`;}else if(id==='library'){for(let k=0;k<3;k++){let x=45+k*310;a+=`<rect x="${x}" y="90" width="270" height="260" fill="#987d80" stroke="#745c69" stroke-width="7"/>`;for(let r=0;r<3;r++){for(let j=0;j<12;j++){let h=34+(j*17+r*11)%34;a+=`<rect x="${x+10+j*21}" y="${168+r*82-h}" width="16" height="${h}" fill="${['#c69d9b','#8199a3','#e4bd8f','#a38ca9','#bc818b'][j%5]}"/>`;}a+=`<path d="M${x} ${170+r*82}h270" stroke="#624d60" stroke-width="6"/>`;}}}else if(id==='gym'){a+=`<rect x="355" y="112" width="290" height="110" fill="#a9c6cf" stroke="#f6e7d7" stroke-width="10"/><path d="M500 112v110M355 167h290" stroke="#f6e7d7" stroke-width="4"/><path d="M400 235h200v12H400Z" fill="#9c7b81"/><ellipse cx="500" cy="445" rx="200" ry="62" fill="none" stroke="#f7e6d9" stroke-width="4"/>`;}else{a+=`<rect x="350" y="119" width="300" height="155" rx="4" fill="#b7d0db" stroke="#f9eadf" stroke-width="10"/><path d="M500 119v155M350 196h300" stroke="#f9eadf" stroke-width="6"/><path d="M350 119L650 274" stroke="#fff" opacity=".25" stroke-width="18"/>`;if(id==='bedroom')a+=`<rect x="20" y="248" width="290" height="150" rx="18" fill="#a5829b"/><rect x="20" y="290" width="320" height="120" rx="20" fill="#f4d9df"/><rect x="40" y="279" width="115" height="44" rx="15" fill="#fff2eb"/><path d="M680 315h270v25H680Z M705 340v100M925 340v100" stroke="#96788c" stroke-width="12" fill="#96788c"/>`;if(id==='music'){a+=`<rect x="25" y="280" width="180" height="100" rx="8" fill="#62536b"/><rect x="40" y="294" width="150" height="64" fill="#85788d"/><path d="M800 290l40 -150 12 4 -35 151q35 47 -2 79t-50 -15q-20 -35 35 -69Z" fill="#9f4b65" stroke="#653b54" stroke-width="4"/><circle cx="805" cy="335" r="13" fill="#f1c9b5"/>`; }if(id==='cafe')a+=`<path d="M30 270h330v32H30Z M55 302v145M330 302v145" stroke="#987c82" stroke-width="12" fill="#b38e8b"/><ellipse cx="805" cy="338" rx="130" ry="35" fill="#e4c3ae"/><path d="M805 373v120" stroke="#987c82" stroke-width="15"/>`;}}return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" preserveAspectRatio="xMidYMid slice" class="bg"><defs><linearGradient id="sky${id}" x2="0" y2="1"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs><rect width="1000" height="550" fill="url(#sky${id})"/>${a}<rect width="1000" height="550" fill="#f4c9c6" opacity=".05"/></svg>`}

// episodio-01-encontros | v0.14
const encounters={
  music:{
    who:'dante',
    intro:'A porta está entreaberta. Uma guitarra interrompe o silêncio. O garoto para de tocar quando percebe você.',
    line:'Você sempre invade lugares assim ou hoje é uma ocasião especial?',
    choices:[['Depende. Você sempre dá concertos particulares?',9,6,'Só para pessoas que sabem bater na porta. Mas admito que essa foi boa.'],['Desculpa, ouvi a música. Você toca muito bem.',5,7,'Valeu. Não espalha. Tenho uma reputação a preservar.'],['Nossa, que simpatia. Já estou indo.',-5,1,'A saída está atrás de você.'],],
    extra:'Dante guarda uma palheta vermelha no bolso, mas uma segunda cai ao chão.',
    gift:'Palheta vermelha',
    msg:'A música era minha. E não, você não ouviu isso de mim.',
    flag:'dante'
  },
  hall:{
    who:'soren',
    intro:'Você encontra um rapaz organizando uma pilha de fichas. Ele ergue os olhos quando você se aproxima.',
    line:'Você deve ser a nova aluna. Atrasada, por sinal. Seu formulário está incompleto.',
    choices:[['Você pode me ajudar a terminar?',7,8,'Posso. Pelo menos alguém aqui sabe pedir ajuda.'],['É o seu passatempo fiscalizar horários?',-4,0,'Não. Meu passatempo é evitar que outros desperdicem o meu tempo.'],['Já terminei. Só faltava sua assinatura.',9,5,'Interessante. Uma pessoa preparada. Que mudança agradável.']],
    extra:'Ele entrega um mapa dobrado, com anotações perfeitamente alinhadas.',
    gift:'Mapa anotado',
    msg:'A biblioteca fecha às 17h. Não perca a hora novamente.',
    flag:'soren'
  },
  gym:{
    who:'theo',
    intro:'Uma bola rola até seus pés. Um rapaz de cabelo dourado corre atrás dela, quase tropeçando no próprio cadarço.',
    line:'Por favor, diga que você não viu isso. Minha carreira esportiva depende da sua discrição.',
    choices:[['Vi tudo. Aceito chocolate em troca de silêncio.',10,5,'Negócio fechado. Gostei de você.'],['Está tudo bem? Você se machucou?',6,8,'Só meu orgulho. Ele sobrevive, infelizmente.'],['Você devia aprender a amarrar os tênis.',-3,1,'Justo. Vou incluir isso no próximo treino.']],
    extra:'Theo desenha uma carinha feliz em um adesivo do time e entrega para você.',
    gift:'Adesivo do time',
    msg:'A testemunha do meu tombo ainda está viva? 🍫',
    flag:'theo'
  },
  library:{
    who:'ezra',
    intro:'Entre as estantes, um clique discreto. O fotógrafo abaixa a câmera, apontada para a janela ao seu lado.',
    line:'Desculpa. A luz estava interessante. Não fotografei você, se é o que está pensando.',
    choices:[['Posso ver a foto?',9,7,'Pode. A maioria das pessoas nem pergunta.'],['Eu também gosto de observar a luz.',7,8,'Então talvez você entenda por que gosto daqui.'],['É melhor não fotografar estranhos mesmo.',-4,2,'Concordo. Por isso não fotografei.']],
    extra:'Ezra separa uma foto antiga do jardim e a deixa sobre a mesa.',
    gift:'Fotografia do jardim',
    msg:'Revelei a foto. Acho que você iria gostar.',
    flag:'ezra'
  },
  garden:{
    who:'valentim',
    intro:'Uma flor de cerejeira pousa sobre o banco. Um rapaz com um livro fechado no colo observa você procurar seu caminho.',
    line:'Perdida? Posso oferecer uma visita guiada. Ou uma desculpa convincente para matar aula.',
    choices:[['A visita guiada. A desculpa fica para outra ocasião.',7,6,'Prudente. Vou tentar não estragar sua primeira impressão.'],['Depende. Qual é a sua comissão?',10,4,'Finalmente, alguém que negocia. Um café talvez?'],['Obrigada, prefiro descobrir sozinha.',1,3,'Uma escolha respeitável. Até a próxima, então.']],
    extra:'Valentim oferece um marcador de livro que estava usando.',
    gift:'Marcador dourado',
    msg:'Espero que Bellmont esteja à altura das suas expectativas.',
    flag:'valentim'
  }
  
};

const finals={
  dante:{
    line:'Você voltou. Não me diga que gostou tanto assim da minha companhia.',
    choices:[['Talvez eu queira ouvir a próxima música.',8,5,'Então senta. Mas só porque você pediu.'],['Vim devolver a palheta. Não se ache.',6,4,'Você pode ficar com ela. Se quiser.']],
    title:'Uma música só nossa',
    loc:'music'
  },
  soren:{
    line:'Você encontrou tudo? Fiquei com a impressão de que teria mais perguntas.',
    choices:[['Uma só: você sempre se cobra tanto?',8,7,'Isso... não costuma ser assunto de primeiro dia. Mas obrigado por perguntar.'],['Queria agradecer pela ajuda.',6,5,'Não foi um incômodo. De verdade.']],
    title:'Além das regras',
    loc:'hall'
  },
  theo:{
    line:'Ei! Consegui seu chocolate. Promessas são promessas.',
    choices:[['Vamos dividir?',9,5,'Nossa. Estou sendo subornado de volta.'],['Você lembra mesmo das coisas, hein?',6,6,'Quando importa, sim.']],
    title:'Chocolate compartilhado',
    loc:'gym'
  },
  ezra:{
    line:'O sol está quase se pondo. A luz muda completamente daqui a pouco.',
    choices:[['Quer observar comigo?',9,7,'Quero. Não precisamos falar nada.'],['Você vai me mostrar como fotografar?',7,5,'Se você prometer não rir das primeiras tentativas.']],
    title:'A última luz',
    loc:'roof'
  },
  valentim:{
    line:'Já estava achando que precisaria inventar outro motivo para ver você.',
    choices:[['Não precisa inventar. Pode só me chamar.',9,7,'Essa é uma ideia perigosamente simples.'],['Achei que você me devia um café.',7,4,'E eu pretendo pagar minhas dívidas.']],
    title:'Um convite inesperado',
    loc:'garden'
  }
  
};

// expressoes | v0.14
const key='bellmont_depois_do_sinal_v1';const protagonistArt=[ASSETS14[5],720,960];
const expressionArt={
  "dante":{
    "neutral":[ASSETS14[6],434,724],
    "smile":[ASSETS14[7],435,724],
    "annoyed":[ASSETS14[8],434,724],
    "shy":[ASSETS14[9],435,724],
    "surprise":[ASSETS14[10],434,724],
    "tender":[ASSETS14[11],543,724],
    "vulnerable":[ASSETS14[12],543,724]
  },
  "soren":{
    "neutral":[ASSETS14[13],434,724],
    "smile":[ASSETS14[14],435,724],
    "annoyed":[ASSETS14[15],434,724],
    "shy":[ASSETS14[16],435,724],
    "surprise":[ASSETS14[17],434,724],
    "tender":[ASSETS14[18],543,724],
    "vulnerable":[ASSETS14[19],543,724]
  },
  "theo":{
    "neutral":[ASSETS14[20],434,724],
    "smile":[ASSETS14[21],435,724],
    "annoyed":[ASSETS14[22],434,724],
    "shy":[ASSETS14[23],435,724],
    "surprise":[ASSETS14[24],434,724]
  },
  "ezra":{
    "neutral":[ASSETS14[25],434,724],
    "smile":[ASSETS14[26],435,724],
    "annoyed":[ASSETS14[27],434,724],
    "shy":[ASSETS14[28],435,724],
    "surprise":[ASSETS14[29],434,724]
  },
  "valentim":{
    "neutral":[ASSETS14[30],434,724],
    "smile":[ASSETS14[31],435,724],
    "annoyed":[ASSETS14[32],434,724],
    "shy":[ASSETS14[33],435,724],
    "surprise":[ASSETS14[34],434,724]
  },
  "heroine":{
    "neutral":[ASSETS14[35],434,724],
    "smile":[ASSETS14[36],435,724],
    "annoyed":[ASSETS14[37],434,724],
    "shy":[ASSETS14[38],435,724],
    "surprise":[ASSETS14[39],434,724]
  }
  
};

const moodAlias={happy:'smile',mad:'annoyed',surprised:'surprise'};
const moodNames={
  neutral:'Normal',
  smile:'Sorriso',
  annoyed:'Contrariado(a)',
  shy:'Corado(a)',
  surprise:'Surpresa',
  tender:'Carinho',
  vulnerable:'Vulnerabilidade'
};

function sheetSprite(entry,mood='neutral',label='Personagem',classes='anime-sprite'){mood=moodAlias[mood]||mood;const actual=entry[mood]?mood:'neutral';const [data,w,h]=entry[actual];return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="${classes}" data-mood="${actual}" role="img" aria-label="${esc(label)} — ${moodNames[actual]}"><image href="${mediaURL14(data,'image/webp')}" width="${w}" height="${h}"/></svg>`;}

let state = null;
let screen = 'cover';
let draft = null;
let modalType = null;

const initial = () => ({
    name: 'Alex',
    look: {
        hair: 'castanho',
        eyes: 'mel',
        skin: 'clara',
        outfit: 'uniforme'
    },
    aff: Object.fromEntries(routes.map(id => [id, 0])),
    trust: Object.fromEntries(routes.map(id => [id, 0])),
    visited: [],
    items: [],
    messages: [],
    gallery: [],
    log: [],
    flags: {},
    node: 'intro0',
    loc: 'bedroom',
    ending: null,
    sceneChoice: null
});

function load() {
    return loadSave14();
}

let saved = load();
let storageOK = true;

// Feed updates may save without re-running story and social synchronization.
function persistMemoryStage() {
    if (!state) return;
    syncMemory12();
    writeSave14(state);
}

function persist() {
    if (!state) return;
    syncStory42();
    syncSocial13();
    persistMemoryStage();
}

function toast(message) {
    const notification = document.createElement('div');
    notification.className = 'toast';
    notification.textContent = message;
    document.body.append(notification);
    setTimeout(() => notification.remove(), 2500);
}

// interface-base | v0.14
function avatar(look,mood='neutral'){const outfitClass={uniforme:'',cardigan:' outfit-cardigan',jaqueta:' outfit-jaqueta'}[look.outfit]||'';const hairClass={castanho:'',preto:' hair-preto',rosa:' hair-rosa',loiro:' hair-loiro'}[look.hair]||'';const eyeClass={mel:'',azul:' eyes-azul',verde:' eyes-verde',castanho:' eyes-castanho'}[look.eyes]||'';const skinClass={clara:'',media:' skin-media',escura:' skin-escura'}[look.skin]||'';if(expressionArt.heroine){return sheetSprite(expressionArt.heroine,mood,'Protagonista',`anime-sprite protagonist-sprite${outfitClass}${hairClass}${eyeClass}${skinClass}`);}const [data,w,h]=protagonistArt;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="anime-sprite protagonist-sprite${outfitClass}${hairClass}${eyeClass}${skinClass}" role="img" aria-label="Protagonista"><image href="${mediaURL14(data,'image/webp')}" width="${w}" height="${h}"/></svg>`}
function side(){return `<aside class="side"><h3>♡ Relacionamentos</h3>${routes.map(id=>`<button class="person" data-act="profile" data-id="${id}"><div class="portrait">${sprite(id)}</div><div class="info"><div class="pname"><span>${chars[id].name}</span><span>${state.aff[id]>0?'+':''}${state.aff[id]}</span></div><div class="bar"><span style="width:${Math.max(0,Math.min(100,50+state.aff[id]*2))}%"></span></div><div class="tiny">Confiança: ${state.trust[id]}</div></div></button>`).join('')}<hr><h3>Objetivo atual</h3><div class="objective">${state.node==='map'?`Conheça os alunos de Bellmont. Encontros: ${state.visited.length}/5. Depois de 3 encontros, você pode encerrar o dia.`:state.node==='ending'?'Episódio concluído.':'Acompanhe a história e escolha como reagir.'}</div><hr><div class="tiny">${storageOK?'● Progresso salvo neste navegador':'⚠ Salvamento indisponível neste navegador'}</div></aside>`}
function cover(){return `<div class="cover"><div class="covercopy"><div class="tag">Bellmont • Temporada 01</div><h1>Depois do <i>Sinal</i></h1><p>Algumas histórias começam quando a aula termina. Cinco episódios, seis opções de romance e nenhuma garantia de que o seu coração vai se comportar.</p><div class="coverbuttons"><button class="primary" data-act="new">Novo jogo ♡</button><button class="soft" data-act="continue" ${saved?'':'disabled'}>Continuar</button><button class="soft" data-act="cast">Conheça o elenco ♡</button><button class="soft" data-act="about">Sobre o jogo</button></div><p class="tiny">Episódio 01 • A garota nova • Edição 0.7 • Expressões em Cena</p></div><div class="coverart">${['dante','soren','theo','ezra','valentim'].map(x=>`<div class="hero">${sprite(x,({dante:'neutral',soren:'neutral',theo:'smile',ezra:'shy',valentim:'smile'})[x]).replace('<svg ','<svg style="height:100%;width:auto" ')}</div>`).join('')}</div></div>`}
function dialogue(who,text,choices=null,mood='neutral',loc=state.loc){const c=chars[who],me=who==='me',outdoor=['gate','garden','roof'].includes(loc);return `<div class="scene">${bg(loc)}<span class="loc">✦ ${locs[loc][0]}</span><span class="timechip">${locs[loc][1]}</span>${outdoor?`<div class="petals">${Array.from({length:9},(_,i)=>`<i style="--x:${(i*31+7)%100}%;--t:${7+i%4}s;--d:${-i*1.4}s"></i>`).join('')}</div>`:''}${c||me?`<div class="sprite ${me?'protagonist':''}">${(me?avatar(state.look,mood):sprite(who,mood)).replace('<svg ','<svg style="height:100%;width:auto" ')}</div>`:''}</div><div class="dialog" style="--speaker:${visualProfiles[who]?.color||'#a8416f'}"><span class="speaker">${esc(c?c.name:me?state.name:'Narradora')}</span><p>${esc(text)}</p>${choices?`<div class="choices">${choices.map((v,i)=>`<button class="choice" data-act="choose" data-i="${i}">${esc(Array.isArray(v)?v[0]:v)}</button>`).join('')}</div>`:`<div class="nextrow"><button class="primary" data-act="next">Continuar ›</button></div>`}</div>`}
function mapView(){return `<div class="map"><div class="tag">Intervalo • Explore Bellmont</div><h2>Onde você vai?</h2><p class="hint">Os alunos estão espalhados pelo colégio. Cada encontro oferece novas escolhas.</p><div class="places">${Object.entries(encounters).map(([id,e])=>`<button class="place ${state.visited.includes(id)?'done':''}" data-act="visit" data-id="${id}" ${state.visited.includes(id)?'disabled':''}>${bg(id)}<span>${locs[id][0]}<small>${state.visited.includes(id)?'✓ Encontro concluído':chars[e.who].name+' está por aqui'}</small></span></button>`).join('')}<button class="place" data-act="finish" ${state.visited.length<3?'disabled':''}>${bg('cafe')}<span>Último sinal<small>${state.visited.length<3?'Conheça pelo menos 3 alunos':'Encerrar o dia e escolher um encontro'}</small></span></button></div></div>`}

// episodio-01-motor | v0.14
function current(){const n=state.node,e=encounters[state.loc],f=finals[state.ending];switch(n){case 'intro0':return dialogue(null,'Meu primeiro dia em Bellmont. Um colégio novo, pessoas novas, e a sensação de que eu vou me perder pelo menos três vezes antes do almoço.');case 'intro1':return dialogue('me','Respira. Hoje é só o começo. Escolhe uma roupa, pega a mochila e tenta não criar inimigos antes da primeira aula.');case 'gate0':return dialogue(null,'Os portões de Bellmont parecem a entrada de um filme. Antes que você consiga encontrar a secretaria, alguém acena para você.');case 'gate1':return dialogue('mabel','Você é a novata! Eu sou Mabel. Tenho duas missões hoje: te mostrar o colégio e descobrir se o café da cantina é realmente comestível.', ['Aceito as duas missões.','Só se você prometer me salvar das fofocas.','Obrigada, acho que consigo me virar.'],'smile');case 'gate2':return dialogue('mabel',state.flags.mabel===0?'Excelente. Finalmente uma pessoa sensata!':state.flags.mabel===1?'Das fofocas? Eu sou a fonte. Mas vou tentar.':'Independente. Gostei! Mas pega meu número mesmo assim. ',null,'smile');case 'gate3':return dialogue('mabel','A aula acabou mais cedo por causa dos preparativos do festival. Você pode conhecer os clubes antes do último sinal. Ah, e cuidado com a Scarlett. Ela leva o festival muito a sério.',null,'smile');case 'map':return mapView();case 'enc0':return dialogue(null,e.intro);case 'enc1':return dialogue(e.who,e.line,e.choices);case 'enc2':return dialogue(e.who,e.choices[state.sceneChoice][3],null,e.choices[state.sceneChoice][1]>0?'smile':'annoyed');case 'enc3':return dialogue(null,e.extra+' Você guardou o objeto como lembrança do primeiro dia.');case 'scarlett':return dialogue('scarlett','Então você é a aluna nova. Mabel já falou de você. O festival está chegando e eu preciso de gente competente. Espero que não seja só mais uma distração.', ['Pode contar comigo.','Isso depende do que você está planejando.','Não prometo nada.']);case 'scarlett2':return dialogue('scarlett',['Ótimo. Vou cobrar essa promessa.','Gostei. Pelo menos você faz perguntas.','Sincera. Espero que seja igualmente responsável.'][state.flags.scarlett],null,'smile');case 'select':return `<div class="map"><div class="tag">Fim de tarde</div><h2>Antes de ir embora...</h2><p>Você tem tempo para mais um encontro. Quem ficou na sua cabeça?</p><div class="places">${state.visited.map(l=>{let id=encounters[l].who;return `<button class="place" data-act="route" data-id="${id}">${bg(l)}<span>${chars[id].name}<small>Afinidade ${state.aff[id]>0?'+':''}${state.aff[id]} • Confiança ${state.trust[id]}</small></span></button>`}).join('')}<button class="place" data-act="route" data-id="solo">${bg('gate')}<span>Ir para casa<small>Escolher meu próprio caminho</small></span></button></div></div>`;case 'final0':return dialogue(state.ending,f.line,f.choices);case 'final1':return dialogue(state.ending,f.choices[state.sceneChoice][3],null,f.choices[state.sceneChoice][1]>0?'shy':'annoyed');case 'solo':return dialogue('me','Não preciso decidir nada hoje. Bellmont ainda é um mistério, e eu tenho muito tempo para descobrir o que quero.');case 'ending':return `<div class="ending"><div class="tag">Episódio 01 concluído</div><h2>${state.ending==='solo'?'Meu próprio caminho':esc(f.title)}</h2><p>${state.ending==='solo'?'O seu primeiro dia foi só o começo.':`Você escolheu passar os últimos minutos do dia com ${chars[state.ending].name}. ${state.aff[state.ending]>=12?'A química entre vocês ficou difícil de ignorar.':'O encontro deixou espaço para novas possibilidades.'}`}</p><p>À noite, uma mensagem de Mabel chega: “Você não vai acreditar no que aconteceu depois que você saiu. Amanhã te conto TUDO.”</p><div class="tag">Continua no episódio 02 • Péssimas primeiras impressões</div><p class="hint">${state.visited.length}/5 encontros • ${state.items.length} lembranças • ${state.gallery.length} cena desbloqueada</p><button class="primary" data-act="episode2">Jogar episódio 02 ›</button> <button class="soft" data-act="gallery">Ver galeria</button> <button class="soft" data-act="home">Menu inicial</button></div>`;default:return mapView()}}
function renderBaseScreen(){let root=document.getElementById('root');if(screen==='cover'){root.innerHTML=cover();return;}root.innerHTML=`<div class="app"><header class="top"><div><div class="brand">Depois do Sinal</div><div class="sub">Colégio Bellmont</div></div><nav class="nav"><button data-act="wardrobe">♙ Guarda-roupa</button><button data-act="phone">▣ Celular${state.messages.length?' ('+state.messages.length+')':''}</button><button data-act="gallery">▧ Galeria</button><button data-act="journal">☷ Diário</button><button data-act="stats">✦ Perfil</button><button data-act="cast">♡ Elenco</button><button data-act="sound">♫ Som</button><button data-act="saves">⇩ Progresso</button><button data-act="home">⌂ Menu</button></nav></header><div class="layout"><main class="main"><div class="episode"><span>${state.episode===3?'EPISÓDIO 03 / ALGUÉM DEIXOU UM BILHETE':state.episode===2?'EPISÓDIO 02 / PÉSSIMAS PRIMEIRAS IMPRESSÕES':'EPISÓDIO 01 / A GAROTA NOVA'}</span><span>${esc(state.name)} • ${state.episode===3?state.visited3.length:state.episode===2?state.visited2.length:state.visited.length}/5 encontros</span></div>${current()}<div class="foot">Bellmont • Protótipo independente • Todas as escolhas ficam salvas automaticamente</div></main>${side()}</div></div>`;}
// The order is intentional: synchronize before drawing, then enhance the new DOM.
function render() {
    if (state && screen === 'game' && syncSocial13()) {
        persistMemoryStage();
    }
    finishTyping11();

    let newMessages = false;
    if (state && screen === 'game') {
        newMessages = seed90();
        grant8(state);
    }

    renderBaseScreen();
    renderSoundStatus();
    renderEpisodeFourDetails();
    renderEpisodeFiveDetails();
    renderWardrobeBalance();
    renderPhoneStatus(newMessages);
    renderRavenInvitation();
    renderCityNavigation();
    renderRoomNavigation();
    renderWorldLayout();
    renderSaveWarning();
    renderStoryFocus();
    renderBellmontIdentity();
}

function update() {
    if (state) {
        addOutfitComment();
        grant8(state);
        seed7();
    }
    persist();
    render();
}
function next(){
  const n=state.node;
  switch(n){
    case'intro0':state.node='intro1';
    break;
    case'intro1':state.node='gate0';
    state.loc='gate';
    break;
    case'gate0':state.node='gate1';
    break;
    case'gate2':state.node='gate3';
    break;
    case'gate3':state.node='map';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Bem-vinda a Bellmont! Não esquece de me contar quem você conhecer. 💗'
    });
    break;
    case'enc0':state.node='enc1';
    break;
    case'enc2':state.node='enc3';
    break;
    case'enc3':{
      const e=encounters[state.loc];
      if(!state.visited.includes(state.loc)){
        state.visited.push(state.loc);
        state.items.push(e.gift);
        state.messages.push({
          day94:roomData11().day,who:e.who,text:e.msg
        });
        
      }
      state.node='map';
      break;
      
    }
    case'scarlett2':state.node='select';
    break;
    case'final1':if(!state.gallery.includes(state.ending))state.gallery.push(state.ending);
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Você não vai acreditar no que aconteceu depois que você saiu. Amanhã te conto TUDO.'
    });
    state.node='ending';
    break;
    case'solo':state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Você não vai acreditar no que aconteceu depois que você saiu. Amanhã te conto TUDO.'
    });
    state.node='ending';
    break;
    
  }
  update()
}

function choose(i){if(!Number.isInteger(i)||i<0)return;const n=state.node;if(n==='gate1'&&i<3){state.flags.mabel=i;state.node='gate2';}else if(n==='scarlett'&&i<3){state.flags.scarlett=i;state.node='scarlett2';}else if(n==='enc1'||n==='final0'){const e=n==='enc1'?encounters[state.loc]:finals[state.ending],who=n==='enc1'?e.who:state.ending,c=e.choices[i];if(!c)return;state.aff[who]+=c[1];state.trust[who]+=c[2];state.log.push({who,choice:c[0],aff:c[1],trust:c[2]});state.sceneChoice=i;state.node=n==='enc1'?'enc2':'final1';toast(`${chars[who].name}: afinidade ${c[1]>=0?'+':''}${c[1]} • confiança ${c[2]>=0?'+':''}${c[2]}`);}update()}

// controles-base | v0.14
function fields(l,withName=false){return `<div class="ward"><div class="avatar" id="avatar">${avatar(l)}</div><div class="fields">${withName?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}${[['hair','Cabelo',[['castanho','Castanho'],['preto','Preto'],['rosa','Rosa'],['loiro','Loiro']]],['eyes','Olhos',[['mel','Mel'],['azul','Azul'],['verde','Verde'],['castanho','Castanho']]],['skin','Tom de pele',[['clara','Claro'],['media','Médio'],['escura','Escuro']]],['outfit','Look',[['uniforme','Uniforme clássico'],['cardigan','Cardigan rosado'],['jaqueta','Jaqueta azul']]]].map(([key,title,opts])=>`<label for="${key}">${title}</label><select id="${key}" data-look="${key}">${opts.map(([v,t])=>`<option value="${v}" ${l[key]===v?'selected':''}>${t}</option>`).join('')}</select>`).join('')}</div></div>`}
let activeProfile=null;
function profileKnown(id){
  return !!state&&(state.visited.some(l=>encounters[l].who===id)||(state.loc&&encounters[state.loc]?.who===id&&['enc1','enc2','enc3'].includes(state.node)))
}

function showProfile(id,mood='neutral'){if(!routes.includes(id))return;activeProfile=id;modalType='profile';const c=chars[id],v=visualProfiles[id],known=profileKnown(id);document.getElementById('modal').innerHTML=`<div class="overlay"><section class="panel" role="dialog" aria-modal="true" aria-label="Ficha de ${c.name}"><div class="panelhead"><h2>${c.name} <small style="color:${v.color}">${v.icon}</small></h2><button class="close" data-act="close" aria-label="Fechar">×</button></div><div class="profilehero"><div class="profileart" style="--cast:${v.color}">${sprite(id,mood)}</div><div><div class="tag">${v.club}</div><h3>${v.title}</h3><p>${known?v.detail:'Conheça este personagem durante o primeiro episódio para desbloquear sua ficha.'}</p>${known?`<p class="profilequote">“${v.quote}”</p><p class="hint">Afinidade: ${state.aff[id]} · Confiança: ${state.trust[id]}</p>`:''}<div class="moods">${[['neutral','Normal'],['smile','Sorriso'],['annoyed','Irritado'],['shy','Tímido'],['surprise','Surpreso']].map(([m,t])=>`<button data-act="mood" data-id="${m}" aria-pressed="${m===mood}">${t}</button>`).join('')}</div></div></div><button class="soft" data-act="cast" style="margin-top:18px">‹ Voltar ao elenco</button></section></div>`}
function modal(type){modalType=type;let title='',content='';if(type==='new'||type==='wardrobe'){if(type==='new')draft=initial();else draft={name:state.name,look:{...state.look}};title=type==='new'?'Crie sua protagonista':'Guarda-roupa';content=`<p>${type==='new'?'Personalize a sua personagem antes do primeiro dia.':'Mude seu visual quando quiser.'}</p>${fields(draft.look,type==='new')}<p class="hint">A aparência é cosmética. A base anime é fixa; as variações de cor usam filtros aproximados. Nesta versão, a protagonista também muda de expressão durante as cenas.</p>${type==='new'&&saved?'<p class="hint">Iniciar uma nova história substituirá o progresso anterior.</p>':''}<button class="primary" data-act="${type==='new'?'start':'wear'}">${type==='new'?'Começar a história':'Salvar visual'}</button>`;}else if(type==='cast'){title='Os corações de Bellmont';content=`<p>Cinco personalidades, cinco maneiras de complicar o seu primeiro dia.</p><div class="castgrid">${routes.map(id=>{const v=visualProfiles[id];return `<button class="castcard" data-act="profile" data-id="${id}" style="--cast:${v.color}"><div class="castart">${sprite(id)}</div><span class="casttext"><b>${chars[id].name}</b><small>${profileKnown(id)?'✦ Ficha descoberta':v.club+' · Ficha bloqueada'}</small></span></button>`}).join('')}</div>`;}else if(type==='phone'){title='Seu celular';content=`<div class="phone">${state.messages.length?state.messages.map(m=>`<div class="msg"><b>${chars[m.who].name}</b>${esc(m.text)}</div>`).join(''):'<div class="empty">Nenhuma mensagem ainda.</div>'}</div>`;}else if(type==='gallery'){title='Galeria de memórias';content=`<p>As cenas finais são desbloqueadas ao escolher um encontro.</p><div class="gallery">${routes.map(id=>`<div class="cg">${state.gallery.includes(id)?`<div class="pic">${bg(finals[id].loc)}<div class="cgperson">${sprite(id,'smile').replace('<svg ','<svg style="height:100%;width:auto" ')}</div></div>`:'<div class="lock">♡</div>'}<b>${state.gallery.includes(id)?finals[id].title:'Cena bloqueada • '+chars[id].name}</b></div>`).join('')}</div>`;}else if(type==='journal'){title='Diário de Bellmont';content=`<h3>Lembranças</h3>${state.items.length?state.items.map(x=>`<div class="msg">✦ ${esc(x)}</div>`).join(''):'<p class="hint">Nenhuma lembrança encontrada.</p>'}<h3>Escolhas registradas</h3>${state.log.length?state.log.map(x=>`<div class="msg"><b>${chars[x.who].name} • ${x.aff>=0?'+':''}${x.aff} afinidade</b>${esc(x.choice)}</div>`).join(''):'<p class="hint">As escolhas aparecem aqui.</p>'}`;}else{title='Sobre Depois do Sinal';content='<p>Visual novel escolar independente. Quatro episódios jogáveis e agora com expressões dinâmicas em anime para protagonista e pretendentes.</p><p>Explore Bellmont, conheça os cinco pretendentes e decida como terminar o dia. O progresso é salvo no armazenamento local do navegador, quando disponível. Não há servidor, compras ou limite de energia.</p><p>Edição 0.3: retratos anime originais dos cinco pretendentes, fichas expandidas, celular interativo, atributos e segundo episódio. A protagonista, personagens secundárias e cenários continuam com arte vetorial. Os retratos anime têm uma pose fixa.</p>';}showPanel(title,content);}
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

// perfis-e-atributos | v0.14
const canon={
 dante:{
  full:'Dante Moreau',
  age:18,
  height:'1,83 m',
  birth:'9 de novembro',
  sign:'Escorpião',
  club:'Clube de música',
  food:'Lámen apimentado',
  music:'Rock alternativo',
  place:'Sala de música',
  gift:'Palheta personalizada',
  love:'Atos de serviço',
  dislike:'Falsidade e controle',
  route:'Rivais que se apaixonam',
  nick:'Encrenca',
  secret:'Publica composições anônimas na internet.',
  flaw:'Afasta pessoas antes de ser abandonado.',
  bio:'Inteligente, provocador e incapaz de admitir que se importa. Tem um senso de justiça que contrasta com a sua fama de encrenqueiro.',
  quote:'Não confunda minha falta de paciência com falta de interesse.'
},
 soren:{
  full:'Soren Laurent',
  age:18,
  height:'1,86 m',
  birth:'12 de janeiro',
  sign:'Capricórnio',
  club:'Conselho estudantil',
  food:'Cheesecake de frutas vermelhas',
  music:'Clássica',
  place:'Biblioteca',
  gift:'Partitura rara',
  love:'Tempo de qualidade',
  dislike:'Impontualidade e manipulação',
  route:'Romance lento',
  nick:'Senhorita Caos',
  secret:'Quer estudar música, contrariando os planos da família.',
  flaw:'Confunde perfeição com valor pessoal.',
  bio:'Disciplinado, reservado e competente. Planeja tudo e raramente demonstra emoções em público.',
  quote:'Você é a única variável que eu não consigo prever.'
},
 theo:{
  full:'Theo Bennett',
  age:17,
  height:'1,79 m',
  birth:'5 de agosto',
  sign:'Leão',
  club:'Basquete',
  food:'Panquecas com chocolate',
  music:'Indie pop',
  place:'Quadra esportiva',
  gift:'Chaveiro feito à mão',
  love:'Palavras de afirmação',
  dislike:'Exclusão e injustiça',
  route:'Amizade que vira amor',
  nick:'Estrelinha',
  secret:'Tem medo de decepcionar quem gosta dele.',
  flaw:'Esconde os próprios problemas para não incomodar.',
  bio:'Espontâneo, divertido e carinhoso. Usa humor para transformar qualquer situação séria.',
  quote:'Se eu conseguir fazer você sorrir, meu dia já valeu a pena.'
},
 ezra:{
  full:'Ezra Nightingale',
  age:17,
  height:'1,81 m',
  birth:'3 de março',
  sign:'Peixes',
  club:'Fotografia',
  food:'Bolo de limão',
  music:'Dream pop',
  place:'Terraço',
  gift:'Filme fotográfico',
  love:'Presentes significativos',
  dislike:'Multidões e superficialidade',
  route:'Conexão silenciosa',
  nick:'Musa',
  secret:'Cria um álbum chamado Coisas que ninguém percebe.',
  flaw:'Espera que as pessoas compreendam o que ele não verbaliza.',
  bio:'Introspectivo, observador e sensível. Tem uma câmera analógica e um humor surpreendentemente ácido.',
  quote:'Existem coisas que uma fotografia consegue dizer melhor do que eu.'
},
 valentim:{
  full:'Valentim Beaumont',
  age:18,
  height:'1,87 m',
  birth:'14 de outubro',
  sign:'Libra',
  club:'Teatro',
  food:'Macarons',
  music:'Jazz',
  place:'Jardim de inverno',
  gift:'Carta escrita à mão',
  love:'Gestos de carinho',
  dislike:'Interesse por status',
  route:'Romance de fachada',
  nick:'Minha incógnita',
  secret:'Escreve peças de teatro sob um pseudônimo.',
  flaw:'Tem dificuldade em distinguir sinceridade de conveniência.',
  bio:'Sofisticado, magnético e consciente do próprio charme. Sua personalidade pública é quase uma atuação permanente.',
  quote:'Normalmente sou eu quem deixa as pessoas nervosas. Isso é novo.'
}

};
const attrs=['Ousadia','Empatia','Inteligência','Criatividade','Carisma'];
function normalizeBaseState(s){s.episode=s.episode||1;s.visited2=s.visited2||[];s.attrs=s.attrs||Object.fromEntries(attrs.map(a=>[a,0]));s.attraction=s.attraction||Object.fromEntries(routes.map(id=>[id,Math.max(0,Math.round((s.aff[id]||0)/2))]));s.jealousy=s.jealousy||Object.fromEntries(routes.map(id=>[id,0]));s.known2=s.known2||[];s.replied=s.replied||{};s.gallery2=s.gallery2||[];s.flags=s.flags||{};return s}

// Save migrations run in the original order; old appearance must survive wardrobe cleanup.
function normalize(save) {
    const originalLook = save.look;
    normalizeBaseState(save);
    normalizeEpisodeThree(save);
    normalizeEpisodeFour(save);
    normalizeWardrobeAndEpisodeFive(save);
    normalizeShop(save);
    normalizeFashion(save, originalLook);
    normalizePhone(save);
    normalizeRaven(save);
    normalizeCity(save);
    normalizeRoom(save);
    normalizeCalendar(save);
    normalizeFeed(save);
    normalizeStoryMemory(save);
    return save;
}
const clamp=x=>Math.max(0,Math.min(100,x));
function stage(id){
  if(!profileKnown(id))return 'Desconhecido';
  if(state.trust[id]>=25&&state.attraction[id]>=18)return 'Sentimentos';
  if(state.aff[id]>=20&&state.trust[id]>=10)return 'Interesse';
  if(state.trust[id]>=10)return 'Amizade';
  return 'Conhecido'
}

// Controle central de janelas. O conteúdo continua compatível com os sistemas antigos.
let modalOpener = null;

function showPanel(title, content) {
    const root = document.getElementById('modal');
    const previous = root.querySelector('.panel');
    const page = [modalType, title, modalType === 'phone' ? app90 + ':' + chat90 : ''].join('|');
    const same = previous?.dataset.page === page;
    const scroll = same ? previous.scrollTop : 0;
    const contentScroll = same ? previous.querySelector('.bpcontent')?.scrollTop || 0 : 0;
    const oldNav = modalType === 'phone' ? previous?.querySelector('.bpnav') : null;
    const navScroll = oldNav?.scrollLeft || 0;
    const navTop = oldNav?.scrollTop || 0;
    if (!previous) modalOpener = document.activeElement;

    root.innerHTML = `<div class="overlay"><section class="panel" role="dialog"
        aria-modal="true" aria-labelledby="modalTitle" tabindex="-1">
        <header class="panelhead">
            <button type="button" class="modal-back" aria-label="Voltar">‹ <span>Voltar</span></button>
            <h2 id="modalTitle">${esc(title)}</h2>
            <button type="button" class="close" data-act="close" aria-label="Fechar janela">Fechar <span aria-hidden="true">×</span></button>
        </header>${content}</section></div>`;

    const panel = root.querySelector('.panel');
    panel.dataset.page = page;
    panel.dataset.kind = modalType || '';
    panel.querySelector('.modal-back').onclick = () => backModal(title);
    if (!same) panel.focus({preventScroll: true});
    if (same || oldNav) requestAnimationFrame(() => {
        if (!panel.isConnected) return;
        if (same) {
            panel.scrollTop = scroll;
            const content = panel.querySelector('.bpcontent');
            if (content) content.scrollTop = contentScroll;
        }
        const nav = panel.querySelector('.bpnav');
        if (nav) {
            nav.scrollLeft = navScroll;
            nav.scrollTop = navTop;
        }
    });
}

function backModal(title) {
    if (modalType === 'profile') return modal('cast');
    if (modalType === 'phone') {
        if (app90 === 'feed' && storyOpen13) {
            storyOpen13 = null;
            return phone7();
        }
        if (app90 === 'messages' && chat90 !== null) {
            chat90 = null;
            return phone7();
        }
        if (app90 !== 'home') {
            app90 = 'home';
            return phone7();
        }
    }
    if (modalType === 'cg10') return title === 'Galeria · Momentos da cidade' ? cityPanel10() : gallery10();
    if (modalType === 'city10' && title !== 'Cidade de Bellmont') return cityPanel10();
    if (modalType === 'room11' && ['Decoração do quarto', 'Caixa de lembranças'].includes(title)) return roomPanel11();
    close();
}

// Foco de teclado: impede que Tab navegue para trás da janela.
document.addEventListener('keydown', e => {
    const panel = document.querySelector('#modal .panel');
    if (!panel || e.key !== 'Tab') return;
    const items = [...panel.querySelectorAll('button:not([disabled]), input:not([disabled]), select, textarea, a[href], summary, [tabindex="0"]')]
        .filter(el => el.getClientRects().length && !el.closest('[hidden]'));
    if (!items.length) { e.preventDefault(); panel.focus(); return; }
    const first = items[0], last = items.at(-1), active = document.activeElement;
    if (!panel.contains(active) || active === panel || (e.shiftKey ? active === first : active === last)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
    }
});

// episodio-02 | v0.14
const ep2={
 music:{
  who:'dante',
  intro:'Um cartaz rasgado está no chão. Dante tenta consertar o amplificador, enquanto o conselho exige que o clube pare de ensaiar.',
  line:'Aparentemente, fazer música é um crime contra a paz de Bellmont. Veio me dar sermão também?',
  choices:[['Não. Vim ajudar você a provar que o clube merece existir.',9,8,'Isso foi… inesperado. Pega a outra ponta do cabo.','Empatia'],['Se o ensaio incomoda, vamos negociar outro horário.',5,7,'Uma solução sensata. Que tragédia, eu vou ter que concordar.','Inteligência'],['Vamos fazer um show no pátio. Quero ver proibirem isso.',11,2,'Você é uma péssima influência, Encrenca. Gostei.','Ousadia']],
  reward:'Demo sem título',
  msg:'Gravei uma versão melhor. Talvez você possa ouvir depois.'
},
 hall:{
  who:'soren',
  intro:'O mural do festival está coberto por uma acusação anônima de favorecimento. Soren tenta apagar a confusão antes que a diretora veja.',
  line:'Alguém decidiu que espalhar rumores era uma atividade extracurricular. Você viu quem colocou o bilhete?',
  choices:[['Não, mas posso ajudar a investigar sem acusar ninguém.',8,9,'Obrigada pela sensatez. É raro por aqui.','Inteligência'],['Você não precisa resolver tudo sozinho.',9,8,'Eu sei. Ou deveria saber. Fique, por favor.','Empatia'],['Vamos escrever uma resposta pública bem-humorada.',2,3,'Criativo. Mas talvez não seja o momento.','Criatividade']],
  reward:'Bilhete do mural',
  msg:'O conselho conseguiu resolver a questão. Sua ajuda foi importante.'
},
 gym:{
  who:'theo',
  intro:'Theo está sozinho na quadra, tentando acertar uma cesta. O sorriso habitual desaparece quando a bola bate no aro.',
  line:'Não conta pra ninguém, tá? Hoje eu tô com a pontaria de uma batata.',
  choices:[['Uma batata com muito potencial. Quer treinar comigo?',10,7,'Hahaha. Você sabe como motivar um atleta.','Carisma'],['Você não precisa fazer piada se estiver chateado.',8,10,'É… acho que eu precisava ouvir isso.','Empatia'],['Me mostra como arremessar. Aposto que sou pior.',7,5,'Desafio aceito, Estrelinha!','Ousadia']],
  reward:'Foto do treino',
  msg:'A batata marcou três cestas seguidas. Evolução histórica.'
},
 library:{
  who:'ezra',
  intro:'Ezra está organizando fotografias para a exposição do festival. Uma foto foi marcada como inadequada, sem explicação.',
  line:'Querem tirar essa foto da exposição. Disseram que ninguém vai entender.',
  choices:[['Talvez a foto não precise ser entendida. Só sentida.',10,8,'É exatamente o que eu queria dizer. Obrigado.','Criatividade'],['Que tal escrevermos uma legenda juntos?',7,9,'Acho que gostaria disso.','Inteligência'],['Você pode escolher o que quer mostrar, não eles.',8,6,'Vou tentar lembrar disso quando falar com o comitê.','Ousadia']],
  reward:'Negativo fotográfico',
  msg:'A legenda ficou pronta. Quero que você seja a primeira a ver.'
},
 garden:{
  who:'valentim',
  intro:'Valentim ensaia uma cena para o festival. Ao perceber sua presença, fecha rapidamente o caderno de roteiro.',
  line:'Minha cara incógnita. Preciso de uma parceira de cena. Prometo uma atuação apenas moderadamente dramática.',
  choices:[['Só se eu puder improvisar.',10,6,'Finalmente alguém que não segue o roteiro.','Criatividade'],['Claro. Mas você pode ser você mesmo comigo.',8,10,'Essa proposta é mais ousada do que parece.','Empatia'],['Qual é o cachê? Meu talento não é de graça.',8,4,'Um café e minha eterna gratidão. Fechado?','Carisma']],
  reward:'Página de roteiro',
  msg:'Minha parceira de cena foi promovida a favorita. Não espalhe.'
}

};
const ep2Final={
  dante:{
    loc:'music',
    title:'Entre acordes',
    line:'Fica mais um pouco? Eu queria tocar uma música que ainda não mostrei pra ninguém.',
    yes:'Então escuta. E não faz aquela cara de quem vai chorar, tá?',
    no:'Tudo bem. Outro dia, se você quiser.'
  },
  soren:{
    loc:'library',
    title:'Uma pausa nas regras',
    line:'Terminei o trabalho. Pensei que talvez pudéssemos ficar aqui sem falar de obrigações.',
    yes:'Curioso. Eu não tinha planejado gostar tanto desse momento.',
    no:'Compreendo. Obrigado por ter vindo.'
  },
  theo:{
    loc:'gym',
    title:'A última cesta',
    line:'Quer ficar comigo até apagarem as luzes da quadra? Sem competição, só nós.',
    yes:'Então hoje foi um dia muito melhor do que eu esperava.',
    no:'Tranquilo. Amanhã a gente se vê.'
  },
  ezra:{
    loc:'roof',
    title:'O mundo em silêncio',
    line:'Achei um lugar onde dá pra ver o céu inteiro. Quer subir comigo?',
    yes:'Não precisa dizer nada. Só fica aqui.',
    no:'Claro. O céu vai estar lá amanhã.'
  },
  valentim:{
    loc:'garden',
    title:'Sem roteiro',
    line:'Pela primeira vez hoje, eu gostaria de conversar sem interpretar ninguém. Aceita?',
    yes:'Obrigado. É um alívio não precisar encenar.',
    no:'Uma recusa sincera vale mais que um sim por educação.'
  }
  
};

const oldKnown=profileKnown;
profileKnown=id=>!!state&&(oldKnown(id)||state.visited2?.some(l=>ep2[l]?.who===id)||((state.node==='e2meet'||state.node==='e2answer')&&ep2[state.loc]?.who===id));

const oldChoose=choose;choose=function(i){if(!state)return;normalize(state);if(state.episode===2){if(state.node==='e2mabel'&&i>=0&&i<3){state.attrs[attrs[[4,2,1][i]]]++;state.flags.e2mabel=i;state.node='e2map';update();return}if(state.node==='e2meet'){const e=ep2[state.loc],c=e?.choices[i];if(!c)return;applyChoice(e.who,c);state.sceneChoice=i;state.node='e2answer';update();return}if(state.node==='e2final'&&[0,1].includes(i)){let who=state.ending2;state.sceneChoice=i;if(i===0){applyChoice(who,['Aceitei o convite.',7,8,'','Empatia']);if(!state.gallery2.includes(who))state.gallery2.push(who);routes.filter(x=>x!==who&&state.aff[x]>=15).forEach(x=>state.jealousy[x]=clamp(state.jealousy[x]+3));}else{state.trust[who]+=2;state.attrs.Ousadia++;}state.node='e2finalanswer';update();return}}if(['enc1','final0'].includes(state.node)){const e=state.node==='enc1'?encounters[state.loc]:finals[state.ending],who=state.node==='enc1'?e.who:state.ending,c=e?.choices[i];if(c){state.attraction[who]=clamp(state.attraction[who]+Math.max(0,Math.ceil(c[1]/2)));state.attrs[attrs[(i+(state.node==='final0'?1:0))%attrs.length]]++;}}oldChoose(i)};
function applyChoice(who,c){state.aff[who]+=c[1];state.trust[who]+=c[2];state.attraction[who]=clamp(state.attraction[who]+Math.max(0,Math.ceil(c[1]/2)));state.attrs[c[4]||'Carisma']++;state.log.push({who,choice:c[0],aff:c[1],trust:c[2]});toast(`${chars[who].name} • Afinidade ${c[1]>=0?'+':''}${c[1]} • Confiança +${c[2]}`)}
function startEpisode2(){
  if(!state||state.node!=='ending')return;
  normalize(state);
  state.episode=2;
  state.node='e2intro';
  state.loc='bedroom';
  update()
}

function visit2(id){if(state.node!=='e2map'||!ep2[id]||state.visited2.includes(id))return;state.loc=id;state.node='e2introMeet';update()}
function route2(id){
  if(state.node==='e2map'&&id==='finish'&&state.visited2.length>=3){
    state.node='e2select';
    update();
    return
  }
  if(state.node!=='e2select')return;
  if(id!=='solo'&&!state.visited2.some(l=>ep2[l].who===id))return;
  state.ending2=id;
  state.loc=id==='solo'?'gate':ep2Final[id].loc;
  state.node=id==='solo'?'e2solo':'e2final';
  update()
}

const oldNext=next;
next=function(){
  if(state.episode!==2)return oldNext();
  switch(state.node){
    case'e2intro':state.node='e2mabel';
    state.loc='hall';
    break;
    case'e2introMeet':state.node='e2meet';
    break;
    case'e2answer':{
      let e=ep2[state.loc];
      if(!state.visited2.includes(state.loc)){
        state.visited2.push(state.loc);
        state.items.push(e.reward);
        state.messages.push({
          day94:roomData11().day,who:e.who,text:e.msg
        });
        
      }
      state.node='e2map';
      break
    }
    case'e2finalanswer':case'e2solo':state.node='e2ending';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Alguém deixou um envelope no mural. Amanhã a gente investiga!'
    });
    break;
    default:return
  }
  update()
};

const oldCurrent=current;current=function(){if(state.episode!==2)return oldCurrent();const e=ep2[state.loc],f=ep2Final[state.ending2];switch(state.node){case'e2intro':return dialogue('me','Segundo dia. Mabel mandou onze mensagens antes das sete da manhã. Aparentemente, alguém espalhou um rumor sobre o festival de Bellmont.');case'e2mabel':return dialogue('mabel','Tem um bilhete anônimo no mural! Dizem que os clubes estão brigando pelos horários do festival. Qual é o nosso plano?',['Investigar as fofocas.','Verificar os fatos primeiro.','Ajudar os clubes a resolver a confusão.'],'smile');case'e2map':return `<div class="map"><div class="tag">Festival • Segundo dia</div><h2>Rumores em Bellmont</h2><p>Ajude pelo menos três clubes. Suas escolhas desenvolvem os atributos da protagonista e os relacionamentos.</p><div class="places">${Object.entries(ep2).map(([l,x])=>`<button class="place" data-act="visit2" data-id="${l}" ${state.visited2.includes(l)?'disabled':''}>${bg(l)}<span>${locs[l][0]}<small>${state.visited2.includes(l)?'✓ Concluído':chars[x.who].name+' precisa de ajuda'}</small></span></button>`).join('')}<button class="place" data-act="route2" data-id="finish" ${state.visited2.length<3?'disabled':''}>${bg('gate')}<span>Último sinal<small>${state.visited2.length}/3 clubes necessários</small></span></button></div></div>`;case'e2introMeet':return dialogue(null,e.intro);case'e2meet':return dialogue(e.who,e.line,e.choices);case'e2answer':return dialogue(e.who,e.choices[state.sceneChoice][3],null,'smile');case'e2select':return `<div class="map"><div class="tag">Fim de tarde</div><h2>Com quem você quer ficar?</h2><p>Escolha livremente. Afinidade não obriga ninguém a se apaixonar.</p><div class="places">${state.visited2.map(l=>`<button class="place" data-act="route2" data-id="${ep2[l].who}">${bg(l)}<span>${chars[ep2[l].who].name}<small>${stage(ep2[l].who)}</small></span></button>`).join('')}<button class="place" data-act="route2" data-id="solo">${bg('gate')}<span>Ir para casa<small>Meu próprio caminho</small></span></button></div></div>`;case'e2final':return dialogue(state.ending2,f.line,['Quero ficar com você.','Obrigada pelo convite, mas hoje prefiro ir embora.']);case'e2finalanswer':return dialogue(state.ending2,state.sceneChoice===0?f.yes:f.no,null,state.sceneChoice===0?'shy':'neutral');case'e2solo':return dialogue('me','Ajudei os clubes e fiz novas amizades. Não preciso escolher um romance para que o meu dia tenha valido a pena.');case'e2ending':return `<div class="ending"><div class="tag">Episódio 02 concluído</div><h2>${state.ending2==='solo'?'O meu próprio ritmo':state.gallery2.includes(state.ending2)?f.title:'Até outro dia'}</h2><p>O festival começa a ganhar forma. Mas o envelope anônimo no mural promete complicar tudo no próximo episódio.</p><div class="tag">Continua • Episódio 03: Alguém deixou um bilhete</div><p>${state.visited2.length} clubes visitados • ${state.gallery.length+state.gallery2.length} memórias</p><button class="primary" data-act="episode3">Jogar episódio 03 ›</button> <button class="soft" data-act="gallery">Galeria</button> <button class="soft" data-act="home">Menu inicial</button></div>`;default:return oldCurrent()}};
const oldSide=side;side=function(){if(state.episode!==2)return oldSide();return oldSide().replace('Acompanhe a história e escolha como reagir.',state.node==='e2map'?`Ajude pelo menos três clubes. ${state.visited2.length}/5 concluídos.`:state.node==='e2ending'?'Episódio concluído.':'Acompanhe a história e escolha como reagir.')};
function statBar(t,v){return `<div class="statline"><div class="pname"><span>${t}</span><span>${v}</span></div><div class="bar"><span style="width:${clamp(v)}%"></span></div></div>`}

showProfile=function(id,mood='neutral'){if(!routes.includes(id))return;activeProfile=id;modalType='profile';const c=canon[id],v=visualProfiles[id],known=profileKnown(id);let facts=[['Idade',c.age+' anos'],['Altura',c.height],['Aniversário',c.birth],['Signo',c.sign],['Comida',c.food],['Música',c.music],['Lugar favorito',c.place],['Presente ideal',c.gift],['Linguagem do amor',c.love],['Detesta',c.dislike],['Rota',c.route],['Apelido',c.nick]];showPanel(c.full,`<div class="profilehero"><div class="profileart" style="--cast:${v.color}">${sprite(id,mood)}</div><div><div class="tag">${c.club}</div><h3>${v.title}</h3><p>${known?c.bio:'Conheça este personagem para desbloquear a ficha.'}</p><p class="profilequote">“${c.quote}”</p>${known?`<div class="moodlabel">${stage(id)}</div><div class="profilefacts">${facts.map(([k,val])=>`<div><span>${k}</span><b>${val}</b></div>`).join('')}</div>${statBar('Afinidade',state.aff[id])}${statBar('Confiança',state.trust[id])}${statBar('Atração',state.attraction[id])}${statBar('Ciúmes',state.jealousy[id])}<div class="ep2card"><b>Segredo</b><p>${state.trust[id]>=20?c.secret:'Bloqueado • alcance 20 de confiança.'}</p><b>Vulnerabilidade</b><p>${state.trust[id]>=25?c.flaw:'Bloqueada • alcance 25 de confiança.'}</p></div>`:''}</div></div><div class="expression-panel"><div class="tag">Estúdio de expressões</div>${expressionButtons(id,mood)}</div><button class="soft" data-act="cast">‹ Voltar ao elenco</button>`)};
const oldModal=modal;modal=function(type){if(type==='stats'){modalType=type;showPanel('Meu perfil',`<div class="ward"><div class="avatar">${avatar(state.look)}</div><div><h3>${esc(state.name)}</h3><p>Suas decisões moldam sua personalidade. Novas opções serão abertas nos episódios futuros.</p>${attrs.map(a=>statBar(a,state.attrs[a])).join('')}</div></div>`);return}if(type==='phone'){modalType=type;showPanel('Seu celular',`<div class="phone">${state.messages.length?state.messages.map((m,i)=>`<div class="msg"><b>${chars[m.who].name}</b>${esc(m.text)}${routes.includes(m.who)?state.replied[i]!==undefined?`<div class="sent">Você: ${esc(state.replied[i].text)}<br>${chars[m.who].name}: ${esc(state.replied[i].answer)}</div>`:`<div class="replychoices">${replyOptions(m.who).map((o,j)=>`<button class="soft" data-act="reply" data-i="${i}" data-j="${j}">${esc(o[0])}</button>`).join('')}</div>`:''}</div>`).join(''):'<div class="empty">Nenhuma mensagem ainda.</div>'}</div>`);return}if(type==='gallery'){oldModal(type);let g=document.querySelector('#modal .gallery');if(g)g.insertAdjacentHTML('beforeend',routes.map(id=>`<div class="cg">${state.gallery2.includes(id)?`<div class="pic">${bg(ep2Final[id].loc)}<div class="cgperson">${sprite(id)}</div></div>`:'<div class="lock">♡</div>'}<b>${state.gallery2.includes(id)?ep2Final[id].title:'Episódio 02 • '+chars[id].name}</b></div>`).join(''));return}oldModal(type)};
function replyOptions(who){
  const special={
    dante:['Manda a música quando quiser.','Talvez eu mande. Não se acostuma.'],
    soren:['Obrigada por lembrar de mim.','Não foi um incômodo.'],
    theo:['KKKK, você é impossível.','Impossivelmente incrível, você quis dizer.'],
    ezra:['Quero ver suas fotos.','Vou guardar as melhores pra você.'],
    valentim:['Você me deve um café.','Uma promessa é uma promessa.']
  }
  [who];
  return [[special[0],special[1],2,2,'Carisma'],['Obrigada pela mensagem.','Até amanhã!',1,2,'Empatia'],['A gente conversa pessoalmente.','Combinado.',0,1,'Ousadia']]
}

function replyMessage(i,j){
  const m=state.messages[i];
  if(!m||!routes.includes(m.who)||state.replied[i]!==undefined)return;
  const o=replyOptions(m.who)[j];
  if(!o)return;
  state.replied[i]={
    text:o[0],
    answer:o[1]
  };
  state.aff[m.who]+=o[2];
  state.trust[m.who]+=o[3];
  state.attrs[o[4]]++;
  persist();
  modal('phone');
  render()
}

// The static anime sprite is accompanied by a readable emotion cue during dialogue.
const oldDialogue=dialogue;

// episodio-03 | v0.14
const schoolArt={
  "gate":ASSETS14[40],
  "hall":ASSETS14[41],
  "library":ASSETS14[42],
  "music":ASSETS14[43],
  "gym":ASSETS14[44],
  "garden":ASSETS14[45]
};

const v3bg=bg;bg=function(id){if(!schoolArt[id])return v3bg(id);return `<svg class="bg anime-bg" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="${mediaURL14(schoolArt[id],'image/webp')}" width="960" height="540" preserveAspectRatio="xMidYMid slice"/></svg>`};
function normalizeEpisodeThree(s) {
    s.visited3=s.visited3||[];
  s.clues=s.clues||[];
  s.extras3=s.extras3||[];
  s.gallery3=s.gallery3||[];
  s.deduction=s.deduction??null;
  s.sound=s.sound??false;
}

const ep3={
 hall:{
  who:'soren',
  clue:'Lista de horários corrigida',
  line:'Este envelope foi entregue antes da aula. O horário escrito nele não corresponde à versão oficial do festival. Você reparou?',
  choices:[['Vamos comparar as duas listas.',7,7,'Boa. Você percebeu a mesma inconsistência que eu.','Inteligência'],['Você parece cansado. Eu posso ajudar.',5,9,'Seria... agradável dividir a responsabilidade.','Empatia'],['Talvez o bilhete seja uma piada.',-2,1,'Prefiro não presumir isso antes de investigar.','Ousadia']],
  special:['Cruzar as assinaturas e os horários. ',9,9,'Uma análise impecável. Você deveria considerar o conselho.','Inteligência'],
  msg:'A lista que encontramos está segura comigo. Obrigado pela ajuda.'
},
 music:{
  who:'dante',
  clue:'Rascunho com tinta azul',
  line:'Encontrei um pedaço de papel perto do amplificador. A mesma tinta azul do envelope. Antes que pergunte: não fui eu.',
  choices:[['Se fosse você, teria assinado com uma provocação.',8,5,'Finalmente alguém que entende meu estilo.','Ousadia'],['Não vou acusar ninguém sem provas.',6,8,'...É. Obrigado por isso.','Empatia'],['Você é suspeito até segunda ordem.',-3,1,'Então vou precisar de um advogado.','Carisma']],
  special:['O rascunho parece parte de uma letra de música.',9,7,'Você entende de composição? Essa é nova.','Criatividade'],
  msg:'Se ouvir uma guitarra amanhã, pode entrar. Só bate na porta.'
},
 gym:{
  who:'theo',
  clue:'Relato do treino',
  line:'Eu vi uma pessoa correndo com papéis perto do ginásio. Mas antes de sair apontando dedos, talvez seja melhor perguntar o que aconteceu.',
  choices:[['Você consegue lembrar de algum detalhe?',5,7,'Uma pasta verde! Isso eu lembro.','Inteligência'],['Vamos procurar juntos. Dupla de detetives.',8,6,'Fechado. Preciso de um chapéu ridículo?','Carisma'],['Relaxa, você já ajudou bastante.',4,6,'Você é legal demais, sabia?','Empatia']],
  special:['Vamos reconstruir o trajeto no mapa.',9,7,'Você leva essa brincadeira a sério. Adorei.','Inteligência'],
  msg:'Parceira detetive, nossa investigação merece panquecas.'
},
 library:{
  who:'ezra',
  clue:'Foto do mural às 07:40',
  line:'Fotografei o mural antes de alguém encontrar o envelope. Olha o canto da imagem: a pessoa estava organizando os avisos, não escondendo nada.',
  choices:[['Você percebe detalhes incríveis.',8,7,'Não tantos quanto você imagina. Mas obrigado.','Empatia'],['Podemos ampliar a foto e comparar.',6,7,'Sim. Você tem um bom olho.','Inteligência'],['Me deixa ver suas outras fotos?',4,4,'Talvez em outra ocasião.','Criatividade']],
  special:['A composição mostra que o papel já estava no mural.',10,8,'Exatamente. Eu sabia que você perceberia.','Criatividade'],
  msg:'Revelei outra foto. A luz no jardim ficou bonita hoje.'
},
 garden:{
  who:'valentim',
  clue:'Convite do ensaio de teatro',
  line:'Curioso. O texto do bilhete parece uma fala de ensaio. O clube de teatro ia anunciar uma surpresa, mas o roteiro desapareceu.',
  choices:[['Então não é uma declaração anônima?',6,5,'Uma pena, não acha?','Carisma'],['Você sabe mais do que está contando?',5,7,'Sei distinguir uma cena de um boato.','Ousadia'],['Vamos preservar a surpresa até entender tudo.',5,8,'Discrição. Uma qualidade rara por aqui.','Empatia']],
  special:['Reconheço a estrutura de uma fala teatral.',10,8,'Temos uma futura roteirista entre nós?','Criatividade'],
  msg:'Ainda lhe devo um convite. Sem roteiro desta vez.'
}

};
const encounters3={
  roof:{
    who:'ezra',
    title:'Cinco minutos de silêncio',
    line:'Eu venho aqui quando o colégio fica barulhento demais. Quer ficar um pouco?',
    yes:'Não precisa preencher todo silêncio. Esse está bom.',
    no:'Tudo bem. O terraço continua aqui.',
    attr:'Empatia'
  },
  cafe:{
    who:'theo',
    title:'O desastre da cantina',
    line:'Comprei dois sucos por engano. O universo está me mandando dividir um com você.',
    yes:'Excelente. Uma tragédia evitada graças à ciência.',
    no:'Vou aceitar meu destino de beber dois sucos.',
    attr:'Carisma'
  },
  gate:{
    who:'mabel',
    title:'O plantão das fofocas',
    line:'Scarlett está tentando impedir que a fofoca do bilhete vire uma declaração de guerra. Você acha que devemos ajudar?',
    yes:'Perfeito! Operação: impedir o caos. O que é uma novidade pra mim.',
    no:'Justo. Nem toda fofoca merece audiência.',
    attr:'Empatia'
  }
  
};

const finals3={
  dante:{
    loc:'music',
    title:'A música sem nome',
    line:'Tem uma música que escrevi hoje. Ainda não tem nome. Quer ouvir?',
    yes:'Não conta pra ninguém. Principalmente que eu fiquei nervoso.',
    no:'Outro dia. A música não vai fugir.'
  },
  soren:{
    loc:'library',
    title:'Entre páginas',
    line:'Você me ajudou sem esperar nada em troca. Gostaria de ficar aqui mais alguns minutos?',
    yes:'Então, pela primeira vez, podemos ignorar o relógio.',
    no:'Compreendo. Até amanhã.'
  },
  theo:{
    loc:'gym',
    title:'Um último arremesso',
    line:'Quer tentar uma cesta antes de ir? Prometo não rir se errar. Muito.',
    yes:'Olha só! Meu dia ficou oficialmente melhor.',
    no:'Tudo bem! Te vejo na próxima aula.'
  },
  ezra:{
    loc:'garden',
    title:'Luz de fim de tarde',
    line:'A luz está perfeita. Posso tirar uma foto sua? Só se você quiser.',
    yes:'Obrigado. Vou guardar essa com cuidado.',
    no:'Claro. Podemos só aproveitar a vista.'
  },
  valentim:{
    loc:'garden',
    title:'Fora do personagem',
    line:'Hoje eu não quero representar ninguém. Você aceitaria uma caminhada?',
    yes:'É bom conversar sem precisar ensaiar cada palavra.',
    no:'Uma resposta honesta. É o que eu mais respeito.'
  }
  
};

function start3(){
  if(!state||state.node!=='e2ending')return;
  normalize(state);
  state.episode=3;
  state.node='e3intro';
  state.loc='gate';
  update()
}

function e3Choices(e){let c=e.choices.slice();if(state.attrs[e.special[4]]>=3)c.push(e.special);return c}
function e3tile(loc,title,sub,act,id,disabled=false){return `<button class="place" data-act="${act}" data-id="${id}" ${disabled?'disabled':''}>${bg(loc)}<span>${title}<small>${sub}</small></span></button>`}
function e3map(){let phase=state.visited3.length<2?'Manhã':state.visited3.length<4?'Intervalo':'Fim de tarde';let bonus=Object.entries(encounters3).filter(([k])=>k==='gate'||(k==='cafe'&&state.visited3.length>=1)||(k==='roof'&&state.visited3.length>=2));return `<div class="map"><div class="tag">Dia 3 • Festival de Bellmont</div><h2>O mistério do envelope</h2><div class="daybar"><span class="daypill">◷ ${phase}</span><span class="daypill">✉ ${state.clues.length}/3 pistas necessárias</span></div><p>Visite os clubes e descubra a origem do bilhete. Os encontros extras surgem conforme o dia avança.</p><div class="clues">${state.clues.map(c=>`<span>✓ ${esc(c)}</span>`).join('')}</div><div class="places">${Object.entries(ep3).map(([l,e])=>e3tile(l,locs[l][0],state.visited3.includes(l)?'✓ Pista encontrada':chars[e.who].name+' • Investigar','visit3',l,state.visited3.includes(l))).join('')}${e3tile('hall','Reunir as pistas','Mínimo de três pistas','deduce3','solve',state.clues.length<3)}</div><div class="bonus"><b>✦ Encontros espontâneos</b><p class="hint">Opcionais, sem custo de energia.</p><div class="places">${bonus.map(([l,e])=>e3tile(l,e.title,state.extras3.includes(l)?'✓ Concluído':chars[e.who].name+' • Evento extra','extra3',l,state.extras3.includes(l))).join('')}</div></div></div>`}
const v3current=current;current=function(){if(state.episode!==3)return v3current();const e=ep3[state.loc],x=encounters3[state.loc],f=finals3[state.ending3];switch(state.node){case'e3intro':return dialogue('mabel','O envelope do mural virou assunto do colégio inteiro! A frase é: “Depois do sinal, a verdade vai aparecer.” Dramático demais, até para Bellmont.',null,'smile');case'e3scarlett':return dialogue('scarlett','Os clubes estão desconfiando uns dos outros. Precisamos descobrir de onde veio esse bilhete antes que a comissão cancele os ensaios.', ['Vou investigar com calma.','Deixa comigo. Adoro um mistério.','Primeiro, vamos impedir novas fofocas.']);case'e3map':return e3map();case'e3meet':return dialogue(e.who,e.line,e3Choices(e));case'e3answer':return dialogue(e.who,state.answer3,null,state.good3?'smile':'annoyed');case'e3extra':return dialogue(x.who,x.line,['Aceitar o convite.','Agradecer e continuar investigando.']);case'e3extraanswer':return dialogue(x.who,state.sceneChoice===0?x.yes:x.no,null,'smile');case'e3deduce':return dialogue('me','As pistas não mostram uma ameaça real. O que faz mais sentido?',['Era um anúncio de ensaio que perdeu o contexto.','Dante sabotou o festival.','Uma declaração de amor secreta.']);case'e3reveal':return dialogue('scarlett',state.deduction===0?'Você acertou. O clube de teatro tinha preparado uma cena-surpresa. Uma folha do roteiro foi parar no mural. O mistério está resolvido.':'O responsável pelo teatro confirmou: a folha era parte de uma cena-surpresa, não uma ameaça. Ainda bem que conferimos antes de espalhar outra fofoca.',null,'smile');case'e3select':return `<div class="map"><div class="tag">Último sinal</div><h2>Com quem passar o fim da tarde?</h2><p>Você pode escolher alguém com quem conversou hoje, ou voltar para casa.</p><div class="places">${state.visited3.map(l=>{let id=ep3[l].who;return e3tile(l,chars[id].name,stage(id),'route3',id)}).join('')}${e3tile('gate','Voltar para casa','Meu próprio caminho','route3','solo')}</div></div>`;case'e3final':return dialogue(state.ending3,f.line,['Aceitar.','Prefiro deixar para outra ocasião.']);case'e3finalanswer':return dialogue(state.ending3,state.sceneChoice===0?f.yes:f.no,null,state.sceneChoice===0?'shy':'neutral');case'e3solo':return dialogue('me','O mistério terminou. E, por hoje, uma tarde tranquila é exatamente o que eu quero.');case'e3ending':return `<div class="ending"><div class="tag">Episódio 03 concluído • Um dia em Bellmont</div><h2>${state.ending3==='solo'?'No meu ritmo':state.gallery3.includes(state.ending3)?f.title:'Até amanhã'}</h2>${state.gallery3.includes(state.ending3)?`<div class="scene" style="height:290px;margin:18px auto;max-width:540px;border-radius:14px">${bg(f.loc)}<div class="sprite">${sprite(state.ending3).replace('<svg ','<svg style="height:100%;width:auto" ')}</div></div>`:''}<p>${state.clues.length} pistas encontradas • ${state.extras3.length} encontros extras • ${state.deduction===0?'Mistério solucionado por você':'Mistério esclarecido pela comissão'}</p><p>Amanhã, Bellmont anuncia as duplas para o festival. Mabel já começou a fazer apostas.</p><div class="tag">Próximo episódio: Duplas inconvenientes • Ainda não disponível</div><p><button class="primary" data-act="gallery">Ver memórias</button> <button class="soft" data-act="home">Menu inicial</button></p></div>`;default:return e3map()}};
const v3choose=choose;
choose=function(i){
  if(state.episode!==3)return v3choose(i);
  if(!Number.isInteger(i)||i<0)return;
  switch(state.node){
    case'e3scarlett':if(i>2)return;
    state.attrs[['Inteligência','Ousadia','Empatia'][i]]++;
    state.node='e3map';
    break;
    case'e3meet':{
      const e=ep3[state.loc],
      c=e3Choices(e)[i];
      if(!c)return;
      applyChoice(e.who,c);
      state.good3=c[1]>0;
      state.answer3=c[3];
      state.node='e3answer';
      break
    }
    case'e3extra':{
      if(i>1)return;
      const e=encounters3[state.loc];
      state.sceneChoice=i;
      if(i===0){
        if(routes.includes(e.who))applyChoice(e.who,['Aceitar o encontro.',5,5,'',e.attr]);
        else state.attrs[e.attr]++;
        
      }
      state.node='e3extraanswer';
      break
    }
    case'e3deduce':if(i>2)return;
    state.deduction=i;
    if(i===0)state.attrs.Inteligência+=2;
    state.node='e3reveal';
    break;
    case'e3final':if(i>1)return;
    state.sceneChoice=i;
    if(i===0){
      applyChoice(state.ending3,['Aceitar o convite.',7,7,'','Empatia']);
      if(!state.gallery3.includes(state.ending3))state.gallery3.push(state.ending3);
      routes.filter(x=>x!==state.ending3&&state.aff[x]>=15).forEach(x=>state.jealousy[x]=clamp(state.jealousy[x]+2))
    }
    state.node='e3finalanswer';
    break;
    default:return
  }
  update()
};

const v3next=next;
next=function(){
  if(state.episode!==3)return v3next();
  switch(state.node){
    case'e3intro':state.node='e3scarlett';
    state.loc='hall';
    break;
    case'e3answer':{
      let l=state.loc,
      e=ep3[l];
      if(!state.visited3.includes(l)){
        state.visited3.push(l);
        state.clues.push(e.clue);
        state.items.push(e.clue);
        state.messages.push({
          day94:roomData11().day,who:e.who,text:e.msg
        })
      }
      state.node='e3map';
      break
    }
    case'e3extraanswer':if(!state.extras3.includes(state.loc))state.extras3.push(state.loc);
    state.node='e3map';
    break;
    case'e3reveal':state.node='e3select';
    break;
    case'e3finalanswer':case'e3solo':state.node='e3ending';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Amanhã saem as duplas do festival!! Tô fazendo uma lista de teorias.'
    });
    break;
    default:return
  }
  update()
};

const v3known=profileKnown;
profileKnown=id=>!!state&&(v3known(id)||state.visited3?.some(l=>ep3[l].who===id)||((state.node==='e3meet'||state.node==='e3answer')&&ep3[state.loc]?.who===id));

const v3side=side;side=function(){let h=v3side();if(state.episode!==3)return h;return h.replace('Acompanhe a história e escolha como reagir.',state.node==='e3map'?`${state.clues.length}/3 pistas necessárias. Explore os clubes ou encontros espontâneos.`:state.node==='e3ending'?'Episódio concluído.':'Investigue o bilhete e decida como reagir.')};
const v3modal=modal;modal=function(type){if(type==='gallery'){v3modal(type);const g=document.querySelector('#modal .gallery');if(g)g.insertAdjacentHTML('beforeend',routes.map(id=>`<div class="cg">${state.gallery3.includes(id)?`<div class="pic">${bg(finals3[id].loc)}<div class="cgperson">${sprite(id)}</div></div>`:'<div class="lock">♡</div>'}<b>${state.gallery3.includes(id)?finals3[id].title:'Episódio 03 • '+chars[id].name}<small class="memory-label">Memória de cena</small></b></div>`).join(''));return}if(type==='about'){modalType=type;showPanel('Depois do Sinal • v0.4','<p>Três episódios, cinco rotas e exploração de Bellmont. Seis cenários anime originais, encontros opcionais, investigação, opções de personalidade e música sintetizada. Funciona offline.</p><p>Os retratos masculinos foram preservados. As personagens femininas e os três fundos restantes continuam vetoriais. As memórias são composições de sprites e cenários, não CGs exclusivas.</p>');return}if(type==='stats'){v3modal(type);const panel=document.querySelector('#modal .panel');if(panel)panel.innerHTML=panel.innerHTML.replace('Novas opções serão abertas nos episódios futuros.','No episódio 03, certos atributos a partir de 3 liberam respostas especiais.');return}if(type==='saves'){modalType=type;showPanel('Seu progresso',`<p>Exporte seu progresso para conservar uma cópia ou transferir entre versões. Importar substitui o jogo atual.</p><div class="savelinks"><button class="primary" data-act="export4">Exportar salvamento</button><label>Importar arquivo JSON<input type="file" accept=".json,application/json" id="import4"></label></div><p class="hint">O armazenamento local depende do navegador e do endereço do arquivo.</p>`);return}v3modal(type)};

// som-e-importacao | v0.14
let audioCtx=null,audioTimer=null,audioStep=0;
const melodies={
  dante:[220,261.63,329.63,293.66,220,196,246.94,329.63],
  soren:[261.63,329.63,392,523.25,440,392,329.63,293.66],
  theo:[293.66,369.99,440,587.33,493.88,440,369.99,329.63],
  ezra:[220,293.66,349.23,440,392,349.23,293.66,261.63],
  valentim:[196,246.94,293.66,369.99,329.63,293.66,246.94,220],
  default:[261.63,329.63,392,440,392,329.63,293.66,196]
};

function stopSound(){
  if(audioTimer){
    clearInterval(audioTimer);
    audioTimer=null
  }
  if(audioCtx&&audioCtx.state==='running')audioCtx.suspend().catch(()=>{
    
  })
}

function playSound(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)throw Error();
    audioCtx=audioCtx||new AC();
    audioCtx.resume().catch(()=>{
      
    });
    if(audioTimer)return;
    const note=()=>{
      let who=state?.episode===3?(ep3[state.loc]?.who||encounters3[state.loc]?.who||state.ending3):state?.episode===2?(ep2[state.loc]?.who||state.ending2):encounters[state?.loc]?.who;
      const m=melodies[who]||melodies.default;
      let t=audioCtx.currentTime,
      o=audioCtx.createOscillator(),
      g=audioCtx.createGain();
      o.type='sine';
      o.frequency.value=m[audioStep++%m.length];
      g.gain.setValueAtTime(0.0001,t);
      g.gain.exponentialRampToValueAtTime(0.035,t+.05);
      g.gain.exponentialRampToValueAtTime(.0001,t+.95);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(t);
      o.stop(t+1)
    };
    note();
    audioTimer=setInterval(note,820)
  }
  catch{
    toast('Áudio indisponível neste navegador.')
  }
  
}

function toggleSound(){
  if(!state)return;
  state.sound=!state.sound;
  if(state.sound)playSound();
  else stopSound();
  persist();
  toast(state.sound?'Música ambiente ativada':'Música desativada');
  render()
}

function renderSoundStatus() {
    const b=document.querySelector('[data-act="sound"]');
  if(b)b.textContent=state?.sound?'♫ Som ligado':'♫ Som desligado'
}

document.addEventListener('click',e=>{let b=e.target.closest('[data-act]');if(!b||b.disabled||!state)return;let a=b.dataset.act,id=b.dataset.id;switch(a){case'episode3':start3();break;case'visit3':if(state.node==='e3map'&&ep3[id]&&!state.visited3.includes(id)){state.loc=id;state.node='e3meet';update()}break;case'extra3':if(state.node==='e3map'&&encounters3[id]&&!state.extras3.includes(id)&&(id==='gate'||(id==='cafe'&&state.visited3.length>=1)||(id==='roof'&&state.visited3.length>=2))){state.loc=id;state.node='e3extra';update()}break;case'deduce3':if(state.node==='e3map'&&state.clues.length>=3){state.loc='hall';state.node='e3deduce';update()}break;case'route3':if(state.node==='e3select'&&(id==='solo'||state.visited3.some(l=>ep3[l].who===id))){state.ending3=id;state.loc=id==='solo'?'gate':finals3[id].loc;state.node=id==='solo'?'e3solo':'e3final';update()}break;case'sound':toggleSound();break;case'saves':modal('saves');break;case'export4':{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='bellmont-salvamento.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);break}case'home':stopSound();break;case'continue':case'start':if(state.sound)playSound();else stopSound();break;}});
document.addEventListener('change',async e=>{
  if(e.target.id!=='import4'||!e.target.files?.[0])return;const file=e.target.files[0];try{
    if(file.size>8*1024*1024)throw Error('Arquivo muito grande');const incoming=prepareSave14(JSON.parse(await file.text()));if(state||saved){
      if(!confirm('Importar este progresso? O salvamento atual ficará na cópia de recuperação.'))return;
    }
    commitSave14(incoming);toast('Salvamento importado')
  }
  catch(err){
    toast('Arquivo de salvamento inválido ou incompatível. O progresso atual foi mantido.');console.warn('Importação rejeitada:',err.message)
  }
  finally{
    e.target.value=''
  }
  
});

// episodio-04 | v0.14
// v0.5 — Corações em Conflito
const girls5={
  mabel:{
    full:'Mabel Bloom',
    age:17,
    bio:'Coleciona adesivos, fofocas e teorias românticas. Sua amiga antes de tudo.'
  },
  scarlett:{
    full:'Scarlett Sinclair',
    age:18,
    bio:'Organiza o festival. Ambiciosa, exigente e muito mais leal do que aparenta.'
  },
  iris:{
    full:'Íris Moon',
    age:17,
    bio:'Conhece as lendas de Bellmont e coleciona livros sobre constelações.'
  },
  cecilia:{
    full:'Cecília Adler',
    age:18,
    bio:'Vice-presidente do conselho. Competitiva, organizada e amiga antiga de Soren.'
  }
  
};

Object.assign(chars,{iris:{name:'Íris',style:'girl'},cecilia:{name:'Cecília',style:'girl'}});
Object.assign(animeArt,{
  "mabel": [ASSETS14[46], 494, 796], "scarlett": [ASSETS14[47], 494, 796], "iris": [ASSETS14[48], 493, 796], "cecilia": [ASSETS14[49], 494, 796]
});

const pairs5={
 dante:{
  loc:'music',
  task:'Montar o palco',
  invite:'Encrenca, preciso de alguém que não transforme um cabo de guitarra em uma arma. Topa trabalhar comigo?',
  start:'O amplificador falhou. A comissão quer cancelar nossa apresentação. Você tem alguma ideia melhor?',
  options:[['Vamos testar cada cabo antes de desistir.',6,9,'Você não desiste fácil. Isso é... bom.','Inteligência'],['Vamos improvisar uma versão acústica.',10,6,'Uma ideia absurda. E excelente.','Criatividade'],['Posso pedir ajuda à comissão.',3,5,'Tudo bem. Só não quero que sobre tudo pra você.','Empatia']],
  quiet:'Lembra quando nos conhecemos? Você não parecia ter medo de mim. Foi um alívio.',
  close:'Posso tocar uma coisa só pra você? Não é para o festival.',
  yes:'Ainda não dei um nome pra música. Talvez você já saiba qual deveria ser.',
  no:'Tudo bem. Não vou fazer drama. Pelo menos não na sua frente.',
  title:'Uma música para dois'
},
 soren:{
  loc:'hall',
  task:'Organizar a programação',
  invite:'A comissão precisa de uma dupla competente. Gostaria de colaborar comigo? E, por favor, almoce antes.',
  start:'Dois clubes reservaram o mesmo palco. Se eu alterar um horário, um deles perde o público. Como resolvemos?',
  options:[['Criar uma apresentação conjunta.',8,8,'Eficiente e diplomático. Você me surpreende.','Inteligência'],['Ouvir os dois clubes antes de decidir.',6,10,'Tem razão. Pessoas não são só horários.','Empatia'],['Delegar as tarefas e fazer uma pausa.',9,5,'Uma pausa? Conceito revolucionário. Aceito.','Ousadia']],
  quiet:'Eu me lembro de como você lidou com aquela confusão. Você não me tratou como uma máquina de resolver problemas.',
  close:'Tenho cinco minutos livres. Pela primeira vez, quero usá-los sem planejar nada. Fica?',
  yes:'Talvez eu precise reservar mais momentos assim.',
  no:'Entendo. Obrigado pelo trabalho de hoje.',
  title:'Cinco minutos sem horário'
},
 theo:{
  loc:'gym',
  task:'Preparar os jogos',
  invite:'Parceira! A comissão quer uma gincana e eu claramente preciso de supervisão adulta. Quer formar dupla?',
  start:'A gincana precisa ser divertida, até para quem não gosta de esportes. O que a gente inventa?',
  options:[['Desafios cooperativos sem eliminação.',8,9,'Isso! Ninguém fica de fora.','Empatia'],['Uma corrida de obstáculos bem absurda.',10,5,'Finalmente, alguém com visão artística!','Criatividade'],['Vamos pedir sugestões à turma.',6,7,'Você faz todo mundo se sentir importante.','Carisma']],
  quiet:'Você sabe que às vezes eu brinco só para ninguém perceber que estou nervoso, né? Com você é mais fácil parar.',
  close:'Tenho duas panquecas na mochila. Quer dividir? Prometo não contar pra nutricionista do time.',
  yes:'Se esse fosse um jogo, eu teria acabado de desbloquear meu dia favorito.',
  no:'Fechado. Guardo uma pra amanhã, se quiser.',
  title:'A melhor parte do dia'
},
 ezra:{
  loc:'library',
  task:'Criar a exposição fotográfica',
  invite:'Encontrei uma parede vazia no festival. Acho que você teria ideias para ela. Quer trabalhar comigo?',
  start:'As fotos mais bonitas nem sempre são as mais perfeitas. Qual tema você escolheria para nossa exposição?',
  options:[['Pequenas coisas que ninguém percebe.',10,9,'Era exatamente o que eu queria.','Criatividade'],['Retratos com histórias contadas pelos alunos.',7,10,'Gosto disso. Cada pessoa escolhe o que quer mostrar.','Empatia'],['Luzes e sombras de Bellmont.',7,6,'Você tem um olhar interessante.','Inteligência']],
  quiet:'Desde que você chegou, tenho reparado em coisas que antes passavam despercebidas. Não só nas fotos.',
  close:'Posso mostrar uma fotografia que ainda não revelei para ninguém?',
  yes:'É a luz do jardim naquele dia. Obrigado por ter ficado.',
  no:'Claro. Posso guardar para outra hora.',
  title:'Coisas que ninguém percebe'
},
 valentim:{
  loc:'garden',
  task:'Ensaiar o teatro',
  invite:'Minha incógnita, o teatro perdeu uma assistente. Eu poderia contar com você, sem nenhum roteiro oculto?',
  start:'A cena principal está impecável, mas não parece verdadeira. O que falta?',
  options:[['Os personagens precisam falar com sinceridade.',9,10,'Sinceridade. Uma nota que eu deveria guardar.','Empatia'],['Vamos improvisar sem o texto.',10,6,'Perigoso. Adorei.','Ousadia'],['Reescrever o conflito antes do final.',7,7,'Uma futura dramaturga, talvez.','Criatividade']],
  quiet:'Com você, eu não sinto tanta necessidade de interpretar um personagem. É uma sensação nova.',
  close:'A música ainda está tocando. Gostaria de ensaiar uma dança comigo?',
  yes:'Desta vez, não precisamos de plateia.',
  no:'Uma recusa elegante. Respeito isso.',
  title:'Sem plateia'
}

};
function normalizeEpisodeFour(s) {
    s.e4=s.e4||{
    
  };
  s.e4.partner=s.e4.partner||null;
  s.e4.invites=s.e4.invites||{
    
  };
  s.e4.memories=s.e4.memories||[];
  s.e4.memoryLooks=s.e4.memoryLooks||{
    
  };
  s.gifts5=s.gifts5||{
    tokens:2,
    history:[]
  };
  s.read5=s.read5||{
    
  };
}

function start5(){
  if(state.node!=='e3ending')return;
  normalize(state);
  state.episode=4;
  state.node='e4intro';
  state.loc='gate';
  state.messages.push({
    day94:roomData11().day,who:'mabel',text:'DUPLAS DO FESTIVAL! A reunião é agora. Não me faça apostar sozinha.'
  });
  update()
}

function invite5(){
  for(const id of routes){
    if(profileKnown(id)&&state.trust[id]>=10&&!state.e4.invites[id]){
      state.e4.invites[id]='pending';
      state.messages.push({
        day94:roomData11().day,who:id,text:pairs5[id].invite,invite5:true
      });
      
    }
    
  }
  
}

function pick5(id){
  if(state.node!=='e4pick'||!pairs5[id]&&id!=='solo')return;
  state.e4.partner=id;
  for(const who of Object.keys(state.e4.invites))if(['pending','accepted'].includes(state.e4.invites[who]))state.e4.invites[who]=who===id?'accepted':'closed';
  state.loc=id==='solo'?'library':pairs5[id].loc;
  state.node=id==='solo'?'e4solo':'e4work';
  update()
}

const known5=profileKnown;profileKnown=id=>!!state&&(known5(id)||(state.episode===4&&state.e4?.partner===id));
function scene5(id){return `<div class="scene duo5">${bg(pairs5[id].loc)}<div class="duohero">${avatar(state.e4.memoryLooks[id]||state.look,'smile')}</div><div class="duoboy">${sprite(id,['dante','soren'].includes(id)?'tender':'shy')}</div><span class="duolabel">Memórias do Coração ♡</span></div>`}
const curr5=current;current=function(){if(state.episode!==4){let h=curr5();if(state.node==='e3ending')h=h.replace('Próximo episódio: Duplas inconvenientes • Ainda não disponível','Próximo episódio: Duplas inconvenientes').replace('<p><button class="primary" data-act="gallery">','<p><button class="primary" data-act="episode4">Iniciar episódio 04 ♡</button></p><p><button class="primary" data-act="gallery">');return h}let id=state.e4.partner,p=pairs5[id];switch(state.node){case'e4intro':return dialogue('mabel','É hoje! A comissão vai distribuir as duplas do festival. Eu só espero que ninguém jogue uma cadeira em ninguém.');case'e4cecilia':return dialogue('cecilia','As tarefas estão no mural. Escolha a dupla com quem deseja trabalhar. Não é uma competição de popularidade.');case'e4iris':return dialogue('iris','Minha previsão: alguém vai acabar descobrindo que um encontro pode acontecer sem ser planejado. Mas escolha por você, não pelas estrelas.');case'e4pick':return `<div class="map"><div class="tag">Dia 4 • Comissão do festival</div><h2>Duplas inconvenientes</h2><p>Escolha livremente sua dupla. Os convites pessoais são desbloqueados pela confiança; trabalhar com alguém não obriga a iniciar um romance.</p><div class="places">${routes.map(x=>e3tile(pairs5[x].loc,chars[x].name,pairs5[x].task+(state.e4.invites[x]==='accepted'?' • Convite aceito':state.e4.invites[x]==='pending'?' • Convidou você':''),'pick5',x)).join('')}${e3tile('library','Trabalhar com Íris','Meu próprio caminho','pick5','solo')}</div></div>`;case'e4work':return dialogue(id,p.start,p.options);case'e4answer':return dialogue(id,p.options[state.e4.choice][3],null,'smile');case'e4remember':{let log=state.log.filter(x=>x.who===id&&x.choice&&x.choice!==p.options[state.e4.choice][0]).at(-1);return dialogue(id,state.trust[id]>=15?p.quiet+(log?` Eu lembro daquela vez que você disse: “${log.choice}”` :''):'Acho que podemos fazer uma boa equipe. Ainda estou conhecendo você.');}case'e4final':return dialogue(id,p.close,['Aceitar o convite.','Prefiro encerrar por hoje.'],'shy');case'e4finalanswer':return dialogue(id,state.e4.accepted?p.yes:p.no,null,state.e4.accepted?'smile':'neutral');case'e4solo':return dialogue('iris','Trabalhamos juntas na decoração. Você não precisa de romance para ter uma história incrível. Mas eu ainda quero ouvir as fofocas da Mabel.');case'e4ending':return `<div class="ending"><div class="tag">Episódio 04 concluído</div><h2>${state.e4.accepted?p.title:'No meu próprio ritmo'}</h2>${state.e4.accepted?scene5(id):''}<p>Os preparativos para o festival terminaram. O próximo dia promete revelar mais sobre Bellmont.</p><p><button class="primary" data-act="gallery">Memórias do Coração ♡</button> <button class="soft" data-act="home">Menu inicial</button></p><div class="tag">Próximo: O segredo do terraço • Em desenvolvimento</div></div>`;default:return '<p>Estado de episódio desconhecido. Volte ao menu.</p>'}};
const next5=next;
next=function(){
  if(state.episode!==4)return next5();
  switch(state.node){
    case'e4intro':state.node='e4cecilia';
    state.loc='hall';
    break;
    case'e4cecilia':state.node='e4iris';
    state.loc='library';
    break;
    case'e4iris':state.node='e4pick';
    invite5();
    break;
    case'e4answer':state.node='e4remember';
    break;
    case'e4remember':state.node='e4final';
    break;
    case'e4finalanswer':case'e4solo':state.node='e4ending';
    state.messages.push({
      day94:roomData11().day,who:'mabel',text:'Festival quase pronto. Me conta TUDO amanhã.'
    });
    break;
    default:return
  }
  update()
};

const choose5=choose;
choose=function(i){
  if(state.episode!==4)return choose5(i);
  let id=state.e4.partner,
  p=pairs5[id];
  if(state.node==='e4work'&&p?.options[i]){
    state.e4.choice=i;
    applyChoice(id,p.options[i]);
    state.node='e4answer'
  }
  else if(state.node==='e4final'&&[0,1].includes(i)){
    state.e4.accepted=i===0;
    if(i===0){
      applyChoice(id,['Aceitar o convite.',7,7,'','Empatia']);
      if(!state.e4.memories.includes(id)){
        state.e4.memories.push(id);
        state.e4.memoryLooks[id]={
          ...state.look
        }
        
      }
      state.messages.push({
        day94:roomData11().day,who:id,text:p.yes
      })
    }
    state.node='e4finalanswer'
  }
  else return;
  update()
};

const giftNames=routes.map(id=>canon[id].gift);function giftPanel(){modalType='gifts5';showPanel('Presentes de Bellmont',`<p>Você tem ${state.gifts5.tokens} vale(s)-presente gratuitos. Entregue no máximo um presente por personagem. Consulte as fichas para descobrir as preferências.</p>${routes.filter(profileKnown).map(id=>`<div class="ep2card"><b>${chars[id].name}</b>${state.gifts5.history.some(x=>x.id===id)?'<p>Presente já entregue.</p>':`<div class="replychoices">${giftNames.map((g,i)=>`<button class="soft" data-act="gift5" data-id="${id}" data-i="${i}" ${state.gifts5.tokens<=0?'disabled':''}>${esc(g)}</button>`).join('')}</div>`}</div>`).join('')||'<p>Conheça os personagens antes de presentear.</p>'}<p class="hint">Presentes são gestos de amizade, não garantias de romance.</p>`)}
function give5(id,i){
  if(!routes.includes(id)||!profileKnown(id)||!giftNames[i]||state.gifts5.tokens<=0||state.gifts5.history.some(x=>x.id===id))return;
  let match=giftNames[i]===canon[id].gift;
  state.gifts5.tokens--;
  state.gifts5.history.push({
    id,gift:giftNames[i],match
  });
  state.aff[id]+=match?7:2;
  state.trust[id]+=match?5:1;
  state.messages.push({
    day94:roomData11().day,who:id,text:match?'Você lembrou do que eu gosto. Obrigado, de verdade.':'Obrigado por ter pensado em mim.'
  });
  persist();
  render();
  giftPanel();
  toast(match?'Presente perfeito ♡':'Presente entregue')
}

const modal5=modal;modal=function(type){if(type==='gifts5')return giftPanel();if(type==='girls5'){modalType=type;showPanel('Amigas e rivais',`<div class="girlsgrid">${Object.entries(girls5).map(([id,g])=>`<div class="girlcard"><div class="girlart">${sprite(id)}</div><b>${g.full} • ${g.age}</b><p>${g.bio}</p></div>`).join('')}</div>`);return}if(type==='phone'){modalType=type;let unread=state.messages.length;showPanel('Celular • Bellmont',`<div class="phone">${state.messages.length?state.messages.map((m,i)=>`<div class="msg"><b>${esc(chars[m.who]?.name||'Bellmont')}</b>${esc(m.text)}${m.invite5?`<div class="replychoices">${state.e4.invites[m.who]==='pending'?`<button class="soft" data-act="invite5" data-id="${m.who}" data-i="1">Topo trabalhar com você ♡</button><button class="soft" data-act="invite5" data-id="${m.who}" data-i="0">Prefiro escolher sem convite</button>`:`<span class="sent">${({accepted:'Convite aceito',declined:'Convite recusado',closed:'Convite encerrado'})[state.e4.invites[m.who]]||'Convite encerrado'}</span>`}</div>`:routes.includes(m.who)?state.replied[i]!==undefined?`<div class="sent">Você: ${esc(state.replied[i].text)}<br>${chars[m.who].name}: ${esc(state.replied[i].answer)}</div>`:`<div class="replychoices">${replyOptions(m.who).map((o,j)=>`<button class="soft" data-act="reply" data-i="${i}" data-j="${j}">${esc(o[0])}</button>`).join('')}</div>`:''}</div>`).reverse().join(''):'<div class="empty">Nenhuma mensagem ainda.</div>'}</div>`);state.read5.count=unread;persist();render();return}if(type==='gallery'){modal5(type);let g=document.querySelector('#modal .gallery');if(g)g.insertAdjacentHTML('beforeend',routes.map(id=>`<div class="cg">${state.e4.memories.includes(id)?scene5(id):'<div class="lock">♡</div>'}<b>${state.e4.memories.includes(id)?pairs5[id].title:'Episódio 04 • '+chars[id].name}</b>${state.e4.memories.includes(id)?`<p class="memquote">“${esc(pairs5[id].yes)}”</p>`:''}</div>`).join(''));return}if(type==='about'){modalType=type;showPanel('Depois do Sinal • v0.6.1','<p>Quatro episódios, cinco rotas, quatro personagens secundárias em anime, convites, presentes e memórias do coração. Funciona offline.</p><p>Cinco expressões ilustradas para cada pretendente e a protagonista, mais duas poses especiais para Dante e Soren. As memórias são composições de sprites e fundos. A personalização de cores ainda é aproximada.</p>');return}modal5(type);if(type==='cast'){let p=document.querySelector('#modal .panel');p?.insertAdjacentHTML('beforeend','<p><button class="primary" data-act="girls5">Conheça as garotas de Bellmont ♡</button></p>')}};
function renderEpisodeFourDetails() {
    if(screen!=='game'||!state)return;const nav=document.querySelector('.nav');nav?.insertAdjacentHTML('afterbegin','<button data-act="gifts5">♧ Presentes</button>');const phone=document.querySelector('[data-act="phone"]');if(phone){let n=Math.max(0,state.messages.length-(state.read5.count||0));phone.textContent='▣ Celular'+(n?' • '+n+' novas':'')}if(state.episode===4){const ep=document.querySelector('.episode');if(ep)ep.innerHTML=`<span>EPISÓDIO 04 / DUPLAS INCONVENIENTES</span><span>${esc(state.name)} • ${state.e4.partner?state.e4.partner==='solo'?'Íris':chars[state.e4.partner].name:'Festival'}</span>`;const ob=document.querySelector('.objective');if(ob)ob.textContent=state.node==='e4pick'?'Escolha uma dupla e confira os convites no celular.':state.node==='e4ending'?'Episódio concluído.':'Prepare o festival e decida como reagir.'}
}
document.addEventListener('click',e=>{
  let b=e.target.closest('[data-act]');if(!b||b.disabled)return;let a=b.dataset.act,id=b.dataset.id,i=Number(b.dataset.i);if(a==='girls5'){
    modal('girls5');return
  }
  if(!state)return;if(a==='episode4')start5();if(a==='pick5')pick5(id);if(a==='gifts5')modal('gifts5');if(a==='gift5')give5(id,i);if(a==='invite5'&&state.e4.invites[id]==='pending'&&state.node==='e4pick'){
    if(i===1)for(const other of Object.keys(state.e4.invites))if(other!==id&&state.e4.invites[other]==='accepted')state.e4.invites[other]='pending';state.e4.invites[id]=i===1?'accepted':'declined';persist();modal('phone');toast(i===1?'Convite aceito. Escolha sua dupla no mural.':'Tudo bem, você ainda pode escolher livremente.')
  }
  
});

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

// guarda-roupa-base | v0.14
/* Bellmont Life v0.7 */
const lookArt7={
  "uniforme":{
    "neutral":[ASSETS14[50],434,724,{
      "preto":ASSETS14[51],"loiro":ASSETS14[52],"rosa":ASSETS14[53],"ruivo":ASSETS14[54],"lilas":ASSETS14[55]
    },{
      "azul":ASSETS14[56],"verde":ASSETS14[57],"castanho":ASSETS14[58],"violeta":ASSETS14[59]
    },{
      "media":ASSETS14[60],"escura":ASSETS14[61]
    }],
    "smile":[ASSETS14[62],435,724,{
      "preto":ASSETS14[63],"loiro":ASSETS14[64],"rosa":ASSETS14[65],"ruivo":ASSETS14[66],"lilas":ASSETS14[67]
    },{
      
    },{
      "media":ASSETS14[68],"escura":ASSETS14[69]
    }],
    "annoyed":[ASSETS14[70],434,724,{
      "preto":ASSETS14[71],"loiro":ASSETS14[72],"rosa":ASSETS14[73],"ruivo":ASSETS14[74],"lilas":ASSETS14[75]
    },{
      "azul":ASSETS14[76],"verde":ASSETS14[77],"castanho":ASSETS14[78],"violeta":ASSETS14[79]
    },{
      "media":ASSETS14[80],"escura":ASSETS14[81]
    }],
    "shy":[ASSETS14[82],435,724,{
      "preto":ASSETS14[83],"loiro":ASSETS14[84],"rosa":ASSETS14[85],"ruivo":ASSETS14[86],"lilas":ASSETS14[87]
    },{
      "azul":ASSETS14[88],"verde":ASSETS14[89],"castanho":ASSETS14[90],"violeta":ASSETS14[91]
    },{
      "media":ASSETS14[92],"escura":ASSETS14[93]
    }],
    "surprise":[ASSETS14[94],434,724,{
      "preto":ASSETS14[95],"loiro":ASSETS14[96],"rosa":ASSETS14[97],"ruivo":ASSETS14[98],"lilas":ASSETS14[99]
    },{
      "azul":ASSETS14[100],"verde":ASSETS14[101],"castanho":ASSETS14[102],"violeta":ASSETS14[103]
    },{
      "media":ASSETS14[104],"escura":ASSETS14[105]
    }]
  },
  "cardigan":{
    "neutral":[ASSETS14[106],434,724,{
      "preto":ASSETS14[107],"loiro":ASSETS14[108],"rosa":ASSETS14[109],"ruivo":ASSETS14[110],"lilas":ASSETS14[111]
    },{
      "azul":ASSETS14[112],"verde":ASSETS14[113],"castanho":ASSETS14[114],"violeta":ASSETS14[115]
    },{
      "media":ASSETS14[116],"escura":ASSETS14[117]
    }],
    "smile":[ASSETS14[118],435,724,{
      "preto":ASSETS14[119],"loiro":ASSETS14[120],"rosa":ASSETS14[121],"ruivo":ASSETS14[122],"lilas":ASSETS14[123]
    },{
      
    },{
      "media":ASSETS14[124],"escura":ASSETS14[125]
    }],
    "annoyed":[ASSETS14[126],434,724,{
      "preto":ASSETS14[127],"loiro":ASSETS14[128],"rosa":ASSETS14[129],"ruivo":ASSETS14[130],"lilas":ASSETS14[131]
    },{
      "azul":ASSETS14[132],"verde":ASSETS14[133],"castanho":ASSETS14[134],"violeta":ASSETS14[135]
    },{
      "media":ASSETS14[136],"escura":ASSETS14[137]
    }],
    "shy":[ASSETS14[138],435,724,{
      "preto":ASSETS14[139],"loiro":ASSETS14[140],"rosa":ASSETS14[141],"ruivo":ASSETS14[142],"lilas":ASSETS14[143]
    },{
      "azul":ASSETS14[144],"verde":ASSETS14[145],"castanho":ASSETS14[146],"violeta":ASSETS14[147]
    },{
      "media":ASSETS14[148],"escura":ASSETS14[149]
    }],
    "surprise":[ASSETS14[150],434,724,{
      "preto":ASSETS14[151],"loiro":ASSETS14[152],"rosa":ASSETS14[153],"ruivo":ASSETS14[154],"lilas":ASSETS14[155]
    },{
      "azul":ASSETS14[156],"verde":ASSETS14[157],"castanho":ASSETS14[158],"violeta":ASSETS14[159]
    },{
      "media":ASSETS14[160],"escura":ASSETS14[161]
    }]
  },
  "jaqueta":{
    "neutral":[ASSETS14[162],434,724,{
      "preto":ASSETS14[163],"loiro":ASSETS14[164],"rosa":ASSETS14[165],"ruivo":ASSETS14[166],"lilas":ASSETS14[167]
    },{
      "azul":ASSETS14[168],"verde":ASSETS14[169],"castanho":ASSETS14[170],"violeta":ASSETS14[171]
    },{
      "media":ASSETS14[172],"escura":ASSETS14[173]
    }],
    "smile":[ASSETS14[174],435,724,{
      "preto":ASSETS14[175],"loiro":ASSETS14[176],"rosa":ASSETS14[177],"ruivo":ASSETS14[178],"lilas":ASSETS14[179]
    },{
      
    },{
      "media":ASSETS14[180],"escura":ASSETS14[181]
    }],
    "annoyed":[ASSETS14[182],434,724,{
      "preto":ASSETS14[183],"loiro":ASSETS14[184],"rosa":ASSETS14[185],"ruivo":ASSETS14[186],"lilas":ASSETS14[187]
    },{
      "azul":ASSETS14[188],"verde":ASSETS14[189],"castanho":ASSETS14[190],"violeta":ASSETS14[191]
    },{
      "media":ASSETS14[192],"escura":ASSETS14[193]
    }],
    "shy":[ASSETS14[194],435,724,{
      "preto":ASSETS14[195],"loiro":ASSETS14[196],"rosa":ASSETS14[197],"ruivo":ASSETS14[198],"lilas":ASSETS14[199]
    },{
      "azul":ASSETS14[200],"verde":ASSETS14[201],"castanho":ASSETS14[202],"violeta":ASSETS14[203]
    },{
      "media":ASSETS14[204],"escura":ASSETS14[205]
    }],
    "surprise":[ASSETS14[206],434,724,{
      "preto":ASSETS14[207],"loiro":ASSETS14[208],"rosa":ASSETS14[209],"ruivo":ASSETS14[210],"lilas":ASSETS14[211]
    },{
      "azul":ASSETS14[212],"verde":ASSETS14[213],"castanho":ASSETS14[214],"violeta":ASSETS14[215]
    },{
      "media":ASSETS14[216],"escura":ASSETS14[217]
    }]
  },
  "casual":{
    "neutral":[ASSETS14[218],370,740,{
      "preto":ASSETS14[219],"loiro":ASSETS14[220],"rosa":ASSETS14[221],"ruivo":ASSETS14[222],"lilas":ASSETS14[223]
    },{
      "azul":ASSETS14[224],"verde":ASSETS14[225],"castanho":ASSETS14[226],"violeta":ASSETS14[227]
    },{
      "media":ASSETS14[228],"escura":ASSETS14[229]
    }],
    "smile":[ASSETS14[230],370,740,{
      "preto":ASSETS14[231],"loiro":ASSETS14[232],"rosa":ASSETS14[233],"ruivo":ASSETS14[234],"lilas":ASSETS14[235]
    },{
      
    },{
      "media":ASSETS14[236],"escura":ASSETS14[237]
    }],
    "annoyed":[ASSETS14[238],370,740,{
      "preto":ASSETS14[239],"loiro":ASSETS14[240],"rosa":ASSETS14[241],"ruivo":ASSETS14[242],"lilas":ASSETS14[243]
    },{
      "azul":ASSETS14[244],"verde":ASSETS14[245],"castanho":ASSETS14[246],"violeta":ASSETS14[247]
    },{
      "media":ASSETS14[248],"escura":ASSETS14[249]
    }],
    "shy":[ASSETS14[250],370,740,{
      "preto":ASSETS14[251],"loiro":ASSETS14[252],"rosa":ASSETS14[253],"ruivo":ASSETS14[254],"lilas":ASSETS14[255]
    },{
      "azul":ASSETS14[256],"verde":ASSETS14[257],"castanho":ASSETS14[258],"violeta":ASSETS14[259]
    },{
      "media":ASSETS14[260],"escura":ASSETS14[261]
    }],
    "surprise":[ASSETS14[262],370,740,{
      "preto":ASSETS14[263],"loiro":ASSETS14[264],"rosa":ASSETS14[265],"ruivo":ASSETS14[266],"lilas":ASSETS14[267]
    },{
      "azul":ASSETS14[268],"verde":ASSETS14[269],"castanho":ASSETS14[270],"violeta":ASSETS14[271]
    },{
      "media":ASSETS14[272],"escura":ASSETS14[273]
    }]
  },
  "festival":{
    "neutral":[ASSETS14[274],370,740,{
      "preto":ASSETS14[275],"loiro":ASSETS14[276],"rosa":ASSETS14[277],"ruivo":ASSETS14[278],"lilas":ASSETS14[279]
    },{
      "azul":ASSETS14[280],"verde":ASSETS14[281],"castanho":ASSETS14[282],"violeta":ASSETS14[283]
    },{
      "media":ASSETS14[284],"escura":ASSETS14[285]
    }],
    "smile":[ASSETS14[286],370,740,{
      "preto":ASSETS14[287],"loiro":ASSETS14[288],"rosa":ASSETS14[289],"ruivo":ASSETS14[290],"lilas":ASSETS14[291]
    },{
      
    },{
      "media":ASSETS14[292],"escura":ASSETS14[293]
    }],
    "annoyed":[ASSETS14[294],370,740,{
      "preto":ASSETS14[295],"loiro":ASSETS14[296],"rosa":ASSETS14[297],"ruivo":ASSETS14[298],"lilas":ASSETS14[299]
    },{
      "azul":ASSETS14[300],"verde":ASSETS14[301],"castanho":ASSETS14[302],"violeta":ASSETS14[303]
    },{
      "media":ASSETS14[304],"escura":ASSETS14[305]
    }],
    "shy":[ASSETS14[306],370,740,{
      "preto":ASSETS14[307],"loiro":ASSETS14[308],"rosa":ASSETS14[309],"ruivo":ASSETS14[310],"lilas":ASSETS14[311]
    },{
      "azul":ASSETS14[312],"verde":ASSETS14[313],"castanho":ASSETS14[314],"violeta":ASSETS14[315]
    },{
      "media":ASSETS14[316],"escura":ASSETS14[317]
    }],
    "surprise":[ASSETS14[318],370,740,{
      "preto":ASSETS14[319],"loiro":ASSETS14[320],"rosa":ASSETS14[321],"ruivo":ASSETS14[322],"lilas":ASSETS14[323]
    },{
      "azul":ASSETS14[324],"verde":ASSETS14[325],"castanho":ASSETS14[326],"violeta":ASSETS14[327]
    },{
      "media":ASSETS14[328],"escura":ASSETS14[329]
    }]
  }
  
};

const outfitNames7={
  uniforme:'Uniforme clássico',
  cardigan:'Cardigan rosado',
  jaqueta:'Jaqueta Bellmont',
  casual:'Casual creme',
  festival:'Festival vinho'
};

const poses7={neutral:'Suave',smile:'Sorridente',annoyed:'Determinada',shy:'Tímida',surprise:'Surpresa'};
avatar=function(look={},mood='neutral'){
 const set=lookArt7[look.outfit]||lookArt7.uniforme;
const m=set[mood]?mood:'neutral';
const [base,w,h,hair,eyes,skin]=set[m];
const images=[base,hair[look.hair],skin[look.skin],eyes[look.eyes]].filter(Boolean);

 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="anime-sprite protagonist-sprite" role="img" aria-label="Protagonista, ${poses7[m]}">${images.map(d=>`<image href="${mediaURL14(d,'image/webp')}" width="${w}" height="${h}"/>`).join('')}</svg>`;
};
function normalizeWardrobeAndEpisodeFive(s) {
    s.look={
    hair:'castanho',
    eyes:'mel',
    skin:'clara',
    outfit:'uniforme',
    ...s.look
  };
  s.phone7=s.phone7||{
    read:[],
    topics:{
      
    },
    group:[]
  };
  s.phone7.read=s.phone7.read||[];
  s.phone7.topics=s.phone7.topics||{
    
  };
  s.phone7.group=s.phone7.group||[];
  s.notes7=s.notes7||{
    
  };
  s.e5=s.e5||{
    partner:null,
    decision:null,
    done:false
  };
}

let preview7='neutral',contact7=null,diary7='overview';
function wardrobe7(l,withName){return `<div class="ward7"><div class="mirror7"><div class="avatar" id="avatar">${avatar(l,preview7)}</div><div class="pose7">${Object.entries(poses7).map(([k,v])=>`<button class="soft" data-act="pose7" data-id="${k}" aria-pressed="${k===preview7}">${v}</button>`).join('')}</div><p class="hint">Experimente as expressões. A narrativa escolhe a pose durante o jogo.</p></div><div class="fields">${withName?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}<h3>Seu guarda-roupa</h3><div class="outfits7">${Object.entries(outfitNames7).map(([k,v])=>`<button class="outfit7" data-act="outfit7" data-id="${k}" aria-pressed="${l.outfit===k}"><div>${avatar({...l,outfit:k})}</div><span>${v}</span></button>`).join('')}</div>${[['hair','Cabelo',[['castanho','Castanho'],['preto','Preto'],['rosa','Rosa'],['loiro','Loiro']]],['eyes','Olhos',[['mel','Mel'],['azul','Azul'],['verde','Verde'],['castanho','Castanho']]],['skin','Tom de pele',[['clara','Claro'],['media','Médio'],['escura','Escuro']]]].map(([k,t,o])=>`<label for="${k}">${t}</label><select id="${k}" data-look="${k}">${o.map(([v,n])=>`<option value="${v}" ${l[k]===v?'selected':''}>${n}</option>`).join('')}</select>`).join('')}</div></div>`}
function drawWard7(){let title=modalType==='new'?'Crie sua protagonista':'Guarda-roupa';showPanel(title,`${wardrobe7(draft.look,modalType==='new')}<p class="hint">As cores são ajustadas em regiões da ilustração. A roupa é cosmética e não altera afinidade.</p>${modalType==='new'&&saved?'<p class="hint">Iniciar uma nova história substituirá o progresso anterior. Exporte o progresso antes se desejar preservá-lo.</p>':''}<button class="primary" data-act="${modalType==='new'?'start':'wear'}">${modalType==='new'?'Começar a história':'Salvar visual'}</button>`);document.querySelector('#modal .panel')?.classList.add('wide7');}

// mensagens-e-diario-base | v0.14
const chatTopics7={
 dante:[['Música','Qual música você ouviria agora?','Uma que ninguém conhece. Talvez eu te mostre a minha.'],['Dia','Como foi o ensaio?','Sobrevivi. O amplificador, quase.'],['Flertar','Você sentiu minha falta?','Não exagera, Encrenca. ... Talvez um pouco.']],
 soren:[['Música','Você ainda toca piano?','Quando tenho tempo. Ultimamente, tenho tentado arranjá-lo.'],['Dia','Como foi a reunião?','Longa. Conversar com você é consideravelmente mais agradável.'],['Flertar','Você poderia reservar cinco minutos para mim.','Já reservei. Não comente com ninguém.']],
 theo:[['Esporte','Como anda o treino?','Estou melhorando! Quer assistir um dia?'],['Dia','Você está bem de verdade?','Hoje sim. Obrigado por perguntar sem esperar uma piada.'],['Flertar','Estava pensando em você.','Assim você acaba com minha concentração, Estrelinha!']],
 ezra:[['Fotografia','Qual foi sua foto favorita de hoje?','Uma de luz entrando pela janela. Gostaria de te mostrar.'],['Dia','Como você está?','Um pouco cansado. Mas gostei de receber sua mensagem.'],['Flertar','Você é difícil de esquecer.','... Eu poderia dizer a mesma coisa.']],
 valentim:[['Teatro','Como anda a peça?','O roteiro está quase pronto. Preciso de alguém que não minta sobre o final.'],['Dia','Como foi seu dia?','Melhor agora que posso conversar sem plateia.'],['Flertar','Você está me devendo um café.','Uma dívida que adoraria pagar.']],
 mabel:[['Fofoca','Qual a fofoca do dia?','Dante e Soren concordaram em alguma coisa. Estou investigando esse fenômeno.'],['Amizade','Obrigada por me acolher.','Você é oficialmente minha pessoa favorita para falar besteira.']],
 scarlett:[['Festival','Como posso ajudar?','Organização e discrição. Já é um ótimo começo.'],['Amizade','A gente podia conversar sem falar do festival.','Talvez seja uma boa mudança.']],
 iris:[['Mistérios','Alguma teoria nova?','A do terraço é minha favorita, mas prefiro evidências a horóscopos.'],['Amizade','Quer conversar no intervalo?','Sim! Tenho um caderno novo para te mostrar.']],
 cecilia:[['Conselho','Precisa de ajuda?','A lista do festival está organizada. Agradeço a oferta.'],['Amizade','Você também merece descansar.','Uma observação surpreendentemente pertinente.']]};
function seed7(){
  if(!state)return;
  normalize(state);
  const push=(key,who,text)=>{
    if(!state.flags[key]){
      state.flags[key]=true;
      state.messages.push({
        day94:roomData11().day,who,text
      })
    }
    
  };
  if(state.visited.length>=2)push('sms_mabel_ep1','mabel','Então? Me atualiza AGORA. Quero o relatório completo dos novos crushes.');
  for(const id of routes){
    if((state.trust[id]||0)>=8)push('sms_'+id+'_trust',id,trustText94(id));
    if((state.aff[id]||0)>=15)push('sms_'+id+'_aff2',id,affText94(id));
    
  }
  if(state.episode>=3)push('sms_scarlett_ep3','scarlett','Se descobrir algo sobre o bilhete, me avise.');
  if(state.episode>=4){
    push('sms_iris_ep4','iris','O festival está caótico. E talvez romântico.');
    push('sms_cecilia_ep4','cecilia','Agradeço sua ajuda com as tarefas.');
    
  }
   
}

const originalReply7=replyOptions;
replyOptions=function(who){
  let o=routes.includes(who)?originalReply7(who):[];
  const t=chatTopics7[who]||chatTopics7.mabel;
  return [...o,[t[0][1],t[0][2],1,2,'Criatividade'],['Que bom que me escreveu.', 'Também foi bom falar com você.',1,2,'Empatia'],['Agora estou ocupada, falamos depois?', 'Claro. Até depois!',0,0,'Carisma']].slice(0,6)
};

function phoneContacts7(){return [...new Set(state.messages.map(m=>m.who).filter(id=>chars[id]))]}
function pending7(m,i){return m.invite5?state.node==='e4pick'&&state.e4.invites[m.who]==='pending':state.replied[i]===undefined&&!m.topic7}
function phone7(){modalType='phone';seed7();const contacts=phoneContacts7();if(contact7!=='group'&&!contacts.includes(contact7))contact7=contacts.at(-1)||null;const count=id=>state.messages.reduce((n,m,i)=>n+(m.who===id&&pending7(m,i)?1:0),0);
 const nav=`<div class="contactlist7"><div class="tag">Conversas</div>${contacts.slice().reverse().map(id=>`<button class="contact7" data-act="contact7" data-id="${id}" aria-pressed="${id===contact7}"><div class="face7">${sprite(id)}</div><span><b>${chars[id].name}</b><small>${esc(state.messages.filter(m=>m.who===id).at(-1)?.text||'')}</small></span>${count(id)?`<em>${count(id)}</em>`:''}</button>`).join('')}<button class="contact7" data-act="contact7" data-id="group" aria-pressed="${contact7==='group'}">♡ Grupo de Bellmont</button></div>`;
 let body='';if(contact7==='group'){body=`<h3>Grupo de Bellmont</h3><p class="hint">Mabel, Íris e Scarlett • disponível a partir do episódio 4</p>${state.episode>=4?`<div class="bubble7"><b>Mabel</b><br>O festival promete. Quem já tem teorias?</div><div class="bubble7"><b>Íris</b><br>Eu tenho três, mas só uma parece possível.</div><div class="bubble7"><b>Scarlett</b><br>Por favor, mantenham o foco.</div>${state.phone7.group.map(x=>`<div class="bubble7 mine7">${esc(x.text)}</div><div class="bubble7"><b>${esc(x.who)}</b><br>${esc(x.answer)}</div>`).join('')}${!state.phone7.group.length?`<div class="replychoices">${['Vamos organizar o festival juntas.','Quero ouvir as teorias!','Primeiro precisamos de um café.'].map((s,i)=>`<button class="soft" data-act="group7" data-i="${i}">${s}</button>`).join('')}</div>`:''}`:'<p>O grupo ainda não foi criado.</p>'}`;}
 else if(contact7){const id=contact7;const entries=state.messages.map((m,i)=>[m,i]).filter(([m])=>m.who===id);body=`<div class="threadhead7"><div class="face7">${sprite(id)}</div><div><h3>${chars[id].name}</h3><small>${routes.includes(id)?stage(id):'Amizade'}</small></div></div>${entries.map(([m,i])=>`<div class="bubble7">${esc(m.text)}</div>${m.invite5?`<div class="replychoices">${state.node==='e4pick'&&state.e4.invites[id]==='pending'?`<button class="soft" data-act="invite5" data-id="${id}" data-i="1">Aceitar convite ♡</button><button class="soft" data-act="invite5" data-id="${id}" data-i="0">Recusar convite</button>`:`<span class="hint">${({accepted:'Convite aceito',declined:'Convite recusado',closed:'Convite encerrado'})[state.e4.invites[id]]||'Convite encerrado'}</span>`}</div>`:state.replied[i]?`<div class="bubble7 mine7">${esc(state.replied[i].text)}</div><div class="bubble7">${esc(state.replied[i].answer)}</div>`:m.topic7?'':`<div class="replychoices">${replyOptions(id).map((o,j)=>`<button class="soft" data-act="reply7" data-i="${i}" data-j="${j}">${esc(o[0])}</button>`).join('')}</div>`}`).join('')}<div class="topic7"><div class="tag">Puxar assunto</div>${(chatTopics7[id]||[]).map((t,i)=>`<button class="soft" data-act="topic7" data-id="${id}" data-i="${i}" ${state.phone7.topics[id+':'+i+':'+state.episode]?'disabled':''}>${esc(t[0])}</button>`).join('')}</div>`;}
 else body='<h3>Seu celular</h3><p>Conheça os alunos para desbloquear conversas.</p>';
 showPanel('Celular • Bellmont',`<div class="phone7">${nav}<div class="thread7">${body}</div></div>`);document.querySelector('#modal .panel')?.classList.add('wide7');persist();render();}
function reply7(i,j){
  const m=state.messages[i];
  if(!m||!pending7(m,i)||m.invite5)return;
  const o=replyOptions(m.who)[j];
  if(!o)return;
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
  state.attrs[o[4]]++;
  persist();
  phone7()
}

function topic7(id,i){
  const t=chatTopics7[id]?.[i],
  k=id+':'+i+':'+state.episode;
  if(!t||state.phone7.topics[k]||!phoneContacts7().includes(id))return;
  state.phone7.topics[k]=true;
  const n=state.messages.length;
  state.messages.push({
    day94:roomData11().day,who:id,text:'Você iniciou uma conversa sobre '+t[0].toLowerCase()+'.',topic7:true
  });
  state.replied[n]={
    text:t[1],
    answer:topicAnswer95(id,t[2]),
    after94:state.messages.length,
    order94:++data94().serial,
    day94:roomData11().day
  };
  typing95(id,n);
  if(romance93().includes(id)){
    state.aff[id]+=1;
    state.trust[id]+=1;
    if(id==='raven'&&i===2)state.attraction.raven+=2
  }
  persist();
  phone7()
}

const episodeNames7=['A garota nova','Péssimas primeiras impressões','Alguém deixou um bilhete','Duplas inconvenientes','O segredo do terraço'];

function diaryPanel7(){modalType='journal';const e=state.episode||1;let content='';const tabs={overview:'Resumo',relations:'Relações',clues:'Lembranças e pistas',history:'Histórico',notes:'Minhas notas'};const summary=['Conheça os alunos e encontre seu caminho.','Ajude os clubes e descubra os rumores.','Reúna pistas sobre o envelope anônimo.','Prepare o festival com sua dupla.','Descubra o que há por trás do terraço.'][e-1];
 if(diary7==='overview')content=`<div class="journalcover7"><span class="tag">Temporada 01 • Dia ${e}</span><h2>${episodeNames7[e-1]}</h2><p>${summary}</p><b>Objetivo atual</b><p>${esc(document.querySelector('.objective')?.textContent||summary)}</p></div><div class="progress7">${episodeNames7.map((t,i)=>`<div class="entry7"><b>${i+1}. ${t}</b><span>${i+1<e?'✓ Concluído':i+1===e?'Em andamento':'Bloqueado'}</span></div>`).join('')}</div>`;
 if(diary7==='relations')content=routes.map(id=>`<div class="relation7"><div class="face7">${sprite(id)}</div><div><b>${chars[id].name} · ${stage(id)}</b>${['aff','trust','attraction','jealousy'].map((k,i)=>`<div class="stat7"><small>${['Afinidade','Confiança','Atração','Ciúmes'][i]}: ${state[k][id]||0}</small><div class="bar"><span style="width:${clamp(state[k][id]||0)}%"></span></div></div>`).join('')}${profileKnown(id)&&state.trust[id]>=20?`<p class="hint">Segredo: ${esc(canon[id].secret)}</p>`:''}</div></div>`).join('');
 if(diary7==='clues')content=`<h3>Lembranças coletadas</h3>${state.items.map(t=>`<div class="entry7">✦ ${esc(t)}</div>`).join('')||'<p>Nenhuma ainda.</p>'}<h3>Pistas</h3>${state.clues.map(t=>`<div class="entry7">✉ ${esc(t)}</div>`).join('')||'<p>Nenhuma pista ainda.</p>'}<button class="soft" data-act="gallery">Abrir galeria ♡</button>`;
 if(diary7==='history')content=`<h3>Decisões registradas</h3>${state.log.slice().reverse().map(x=>`<div class="entry7"><b>${esc(chars[x.who]?.name||'Bellmont')}</b><p>${esc(x.choice)}</p><small>Afinidade ${x.aff??0} · Confiança ${x.trust??0}</small></div>`).join('')||'<p>Sem escolhas ainda.</p>'}<h3>Mensagens respondidas</h3>${Object.entries(state.replied).reverse().map(([i,r])=>`<div class="entry7"><b>${esc(chars[state.messages[i]?.who]?.name||'Contato')}</b><p>${esc(r.text)}</p><small>${esc(r.answer)}</small></div>`).join('')||'<p>Sem respostas ainda.</p>'}`;
 if(diary7==='notes')content=`<h3>Minhas notas • Dia ${e}</h3><p class="hint">Escreva suas teorias, impressões e lembranças. As notas ficam no save.</p><textarea id="note7" maxlength="4000" placeholder="Hoje em Bellmont...">${esc(state.notes7[e]||'')}</textarea><button class="primary" data-act="note7">Salvar anotação</button>${Object.entries(state.notes7).filter(([k,v])=>Number(k)!==e&&v).map(([k,v])=>`<div class="entry7"><b>Dia ${esc(k)}</b><p class="notetext7">${esc(v)}</p></div>`).join('')}`;
 showPanel('Diário de Bellmont',`<div class="tabs7">${Object.entries(tabs).map(([id,t])=>`<button class="soft" data-act="diary7" data-id="${id}" aria-pressed="${diary7===id}">${t}</button>`).join('')}</div>${content}`);document.querySelector('#modal .panel')?.classList.add('wide7');}
const modal7=modal;modal=function(type){if(type==='new'||type==='wardrobe'){modalType=type;draft=type==='new'?initial():{name:state.name,look:{...state.look}};preview7='neutral';return drawWard7()}if(type==='phone')return phone7();if(type==='journal')return diaryPanel7();if(type==='about'){modalType=type;return showPanel('Depois do Sinal • v0.8.1','<p>Bellmont Life • Cinco episódios, guarda-roupa ilustrado, celular com conversas e diário por abas. Funciona offline.</p><p>A personalização de cores é feita por máscaras aproximadas, com arte-base fixa.</p>')}return modal7(type)};

// episodio-05 | v0.14
// Episode 5: a complete short branch with a mystery, an independent route and five character moments.
const roof7={
  dante:['Encontrei uma caixa de fitas atrás do piano. A letra na etiqueta parece a do bilhete.','Se alguém quer transformar música em fofoca, vai ter que passar por mim.','Eu gravava aqui porque ninguém me escutava. Mas acho que você pode ouvir.'],
  soren:['A chave do arquivo do conselho apareceu no terraço. Não deveria estar aqui.','O registro antigo menciona uma apresentação cancelada. Precisamos descobrir por quê.','Eu achava que devia seguir o roteiro de todo mundo. Você me faz questionar isso.'],
  theo:['Achei uma foto da antiga equipe, com o terraço ao fundo. Tem uma frase escrita atrás.','O pessoal acha que é pegadinha, mas alguém guardou isso por muito tempo.','Obrigado por não esperar que eu sorria o tempo todo.'],
  ezra:['Revelei a foto do bilhete. O reflexo mostra uma placa antiga do clube de fotografia.','Há um lugar no terraço que ninguém fotografa. Vamos conferir?','É estranho querer compartilhar até o silêncio com alguém.'],
  valentim:['No roteiro antigo, alguém escreveu a mesma frase do envelope.','A última cena foi cortada antes da apresentação. Talvez ela explique tudo.','Hoje não quero interpretar nada. Só conversar com você.']
};

function startRoof7(){
  if(state.node!=='e4ending')return;
  state.episode=5;
  state.e5={
    partner:null,
    decision:null,
    done:false
  };
  state.node='e5intro';
  state.loc='roof';
  state.messages.push({
    day94:roomData11().day,who:'iris',text:'A porta do terraço está aberta. Acho que encontramos uma pista de verdade.'
  });
  update()
}

const current7=current;current=function(){if(state.episode!==5){let h=current7();if(state.node==='e4ending')h=h.replace('O segredo do terraço • Em desenvolvimento','O segredo do terraço').replace('<p><button class="primary" data-act="gallery">','<p><button class="primary" data-act="startroof7">Iniciar episódio 05 ♡</button></p><p><button class="primary" data-act="gallery">');return h}let id=state.e5.partner;switch(state.node){case'e5intro':return dialogue('iris','A caixa no terraço tem o brasão antigo do colégio. Alguém deixou uma pista de propósito. Vamos descobrir o que aconteceu?');case'e5map':return `<div class="map"><div class="tag">Dia 5 • Depois do sinal</div><h2>O segredo do terraço</h2><p>Escolha alguém para investigar a caixa ou siga por conta própria.</p><div class="places">${routes.map(x=>e3tile(pairs5[x].loc,chars[x].name,'Investigar juntos','roofpick7',x)).join('')}${e3tile('roof','Investigar sozinha','Seguir minhas próprias pistas','roofpick7','solo')}</div></div>`;case'e5clue':return dialogue(id==='solo'?'me':id,id==='solo'?'Encontrei uma fotografia antiga e uma carta dentro da caixa.':roof7[id][0],null,'surprise');case'e5choice':return dialogue(id==='solo'?'me':id,id==='solo'?'A carta fala de uma apresentação cancelada. O que faço agora?':roof7[id][1],['Ler a carta com cuidado antes de falar com alguém.','Levar as pistas à comissão do festival.','Guardar a lembrança e respeitar a privacidade dos envolvidos.'],'neutral');case'e5reveal':return dialogue('cecilia','Descobrimos a verdade. A antiga comissão cancelou uma apresentação por engano. Os ex-alunos esconderam a carta para que o festival deste ano não repetisse a história. Podemos corrigir isso sem expor ninguém.',null,'smile');case'e5moment':return dialogue(id,id==='solo'?'':roof7[id][2],['Quero ficar mais um pouco com você.','Vamos voltar juntos para a comissão.'],'shy');case'e5answer':return dialogue(id==='solo'?'me':id,state.e5.romance?'Então vamos guardar este momento para nós.':'Combinado. O festival ainda precisa da gente.',null,state.e5.romance?'smile':'neutral');case'e5ending':return `<div class="ending"><div class="tag">Episódio 05 concluído</div><h2>${state.e5.romance?'Depois do último raio de sol':'Uma verdade revelada'}</h2><p>A história do terraço será lembrada no festival. Você escolheu como lidar com a verdade e com seus próprios sentimentos.</p><button class="primary" data-act="journal">Registrar no diário</button> <button class="soft" data-act="gallery">Galeria ♡</button> <button class="soft" data-act="home">Menu</button><p class="hint">Fim da versão 0.8.1 • Episódio 06 em desenvolvimento.</p></div>`;default:return '<p>Volte ao menu para continuar.</p>'}};
const next7=next;
next=function(){
  if(state.episode!==5)return next7();
  switch(state.node){
    case'e5intro':state.node='e5map';
    break;
    case'e5clue':state.node='e5choice';
    break;
    case'e5reveal':state.node=state.e5.partner==='solo'?'e5ending':'e5moment';
    if(state.e5.partner==='solo')state.e5.done=true;
    break;
    case'e5answer':state.e5.done=true;
    state.node='e5ending';
    break;
    default:return
  }
  update()
};

const choose7=choose;
choose=function(i){
  if(state.episode!==5)return choose7(i);
  const id=state.e5.partner;
  if(state.node==='e5choice'&&[0,1,2].includes(i)){
    state.e5.decision=i;
    state.attrs[['Inteligência','Ousadia','Empatia'][i]]++;
    if(!state.items.includes('Carta do antigo festival'))state.items.push('Carta do antigo festival');
    if(routes.includes(id)){
      state.trust[id]+=3;
      state.log.push({
        who:id,choice:['Ler a carta com cuidado.','Levar as pistas à comissão.','Respeitar a privacidade.'][i],aff:0,trust:3
      })
    }
    state.node='e5reveal'
  }
  else if(state.node==='e5moment'&&[0,1].includes(i)){
    state.e5.romance=i===0;
    if(i===0){
      state.aff[id]+=5;
      state.trust[id]+=3;
      state.attraction[id]=clamp(state.attraction[id]+3);
      state.e5.look={
        ...state.look
      };
      state.messages.push({
        day94:roomData11().day,who:id,text:'Obrigado pela companhia no terraço.'
      })
    }
    state.node='e5answer'
  }
  else return;
  update()
};

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
if(tab8==='accessory'||tab8==='shop')content=`<h3>${tab8==='shop'?'BellShop • acessórios':'Sua coleção de acessórios'}</h3><p class="hint">${tab8==='shop'?'Ganhe 8 BellCoins por encontro principal e 35 por episódio concluído. Sem dinheiro real.':'Combine os detalhes de forma independente. Eles aparecem também nas cenas e memórias que usam o visual salvo.'}</p><div class="accgrid8">${Object.entries(accessories8).map(([id,v])=>{const owned=a.owned.includes(id),on=l.accessories.includes(id),locked=day<v.day;return `<div class="acc8"><div class="accicon8">${v.icon}</div><div><b>${v.name}</b><small>${v.desc}</small><small>${owned?'Na coleção':locked?'Disponível no episódio '+v.day:v.price+' BellCoins'}</small></div>${owned?`<button class="soft" data-act="acc8" data-id="${id}" aria-pressed="${on}">${on?'Retirar':'Usar'}</button>`:`<button class="soft" data-act="buy8" data-id="${id}" ${locked||a.coins<v.price?'disabled':''}>${locked?'Bloqueado':'Comprar'}</button>`}</div>`}).join('')}</div>`;
if(tab8==='favorites')content=`<h3>Meu catálogo de looks</h3><p class="hint">Salve até oito combinações completas, incluindo cores e acessórios.</p><div class="favform8"><input id="favname8" maxlength="30" placeholder="Nome do look"><button class="primary" data-act="savefav8" ${a.favorites.length>=8?'disabled':''}>Salvar favorito</button></div><div class="accgrid8">${a.favorites.map((f,i)=>`<div class="acc8"><div class="favportrait8">${avatar(f.look)}</div><div><b>${esc(f.name)}</b><small>${outfitNames7[f.look.outfit]||'Look'}</small></div><button class="soft" data-act="usefav8" data-i="${i}">Usar</button><button class="soft" data-act="delfav8" data-i="${i}" aria-label="Excluir ${esc(f.name)}">×</button></div>`).join('')||'<p class="hint">Nenhum favorito ainda.</p>'}</div>`;
return `<div class="studiohead8"><span class="tag">Ateliê Bellmont • Coleção 01</span><span class="wallet8">✦ ${a.coins} BellCoins</span></div><div class="ward7 studio8"><div class="mirror7"><div class="avatar" id="avatar">${avatar(l,preview7)}</div><div class="looklabel8"><b>${outfitNames7[l.outfit]}</b><span>${poses7[preview7]}</span></div><div class="pose7">${Object.entries(poses7).map(([id,n])=>`<button class="soft" data-act="pose8" data-id="${id}" aria-pressed="${id===preview7}">${n}</button>`).join('')}</div><p class="hint">A expressão da prévia não altera a narrativa.</p></div><div class="fields">${modalType==='new'?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}<div class="tabs7 tabs8">${Object.entries(tabs).map(([id,n])=>`<button class="soft" data-act="tab8" data-id="${id}" aria-pressed="${tab8===id}">${n}</button>`).join('')}</div>${content}</div></div>`;}
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
    if(b)b.textContent='♙ Ateliê • '+wallet8(state).coins+' ✦'
  }
}

const cover8base=cover;cover=function(){return cover8base().replace(/Edição 0\.7[^<]*/,'Edição 0.8.1 • Estilo & Conexões')};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||b.disabled||!draft||!['new','wardrobe'].includes(modalType))return;const k=b.dataset.act,id=b.dataset.id,i=Number(b.dataset.i),s=context8(),a=wallet8(s);if(!['tab8','outfit8','pose8','color8','acc8','buy8','savefav8','usefav8','delfav8'].includes(k))return;keepName8();if(k==='tab8')tab8=id;if(k==='outfit8'&&lookArt7[id])draft.look.outfit=id;if(k==='pose8'&&poses7[id])preview7=id;if(k==='color8'&&colors8[b.dataset.key]?.some(c=>c[0]===id))draft.look[b.dataset.key]=id;if(k==='acc8'&&a.owned.includes(id))draft.look.accessories=draft.look.accessories.includes(id)?draft.look.accessories.filter(x=>x!==id):[...draft.look.accessories,id];if(k==='buy8'){
    const v=accessories8[id];if(v&&!a.owned.includes(id)&&a.coins>=v.price&&(s.episode||1)>=v.day){
      a.coins-=v.price;a.owned.push(id);draft.look.accessories.push(id);toast('Acessório adquirido ♡')
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

// catalogo-e-moda | v0.14
/* Ateliê 3.0 — layered fashion engine */
const fashionArt={
  "base":ASSETS14[330],
  "eyes":{
    "azul":ASSETS14[331],
    "verde":ASSETS14[332],
    "castanho":ASSETS14[333],
    "violeta":ASSETS14[334],
    "mel":ASSETS14[335]
  },
  "hair":{
    "preto":ASSETS14[336],
    "loiro":ASSETS14[337],
    "rosa":ASSETS14[338],
    "ruivo":ASSETS14[339],
    "lilas":ASSETS14[340]
  },
  "skin":{
    "media":ASSETS14[341],
    "escura":ASSETS14[342]
  }
  
};

const catalog9={
 top:[['tee','Camiseta creme',0,1,'casual','#eee0d6'],['blouse','Blusa acadêmica',0,1,'academico','#f9e9df'],['rose','Blusa Sweet Blossom',0,1,'romantico','#d6a0ad'],['black','Blusa Midnight',35,1,'gotico','#38303d'],['lavender','Blusa Lavender',35,2,'romantico','#aa99c8'],['sport','Camiseta Off Duty',25,1,'esportivo','#6b918e']],
 bottom:[['pleats','Saia Bellmont',0,1,'academico','#714054'],['jeans','Jeans azul',0,1,'casual','#59738e'],['cream','Saia de linho',0,1,'romantico','#e5c9ad'],['goth','Saia Midnight',35,1,'gotico','#332c3d'],['shorts','Short esportivo',25,1,'esportivo','#596f70'],['long','Saia Moonlight',50,3,'elegante','#8877a5']],
 dress:[['none','Sem vestido',0,1,'','#eee'],['wine','Festival Romance',0,1,'romantico','#963f55'],['moon','Moonlight',65,3,'elegante','#73708e'],['blossom','Cherry Blossom',55,2,'romantico','#e2a7b7'],['noir','Noir',55,2,'gotico','#322c3b']],
 coat:[['none','Sem casaco',0,1,'','#eee'],['blazer','Blazer Bellmont',0,1,'academico','#84435c'],['cardigan','Cardigan rosa',0,1,'romantico','#cd9ba8'],['jacket','Jaqueta esportiva',0,1,'esportivo','#364567'],['creamcoat','Cardigan creme',0,1,'casual','#ddc3a5'],['leather','Jaqueta Midnight',50,2,'gotico','#37323c']],
 shoes:[['flats','Sapatilhas creme',0,1,'romantico','#ead6bd'],['loafers','Mocassins',0,1,'academico','#593f42'],['sneakers','Tênis branco',0,1,'esportivo','#efebe8'],['boots','Botas Midnight',45,2,'gotico','#39313e'],['heels','Sapatos Moonlight',40,3,'elegante','#9b7894']],
 socks:[['none','Sem meias',0,1,'','#eee'],['white','Meias brancas',0,1,'academico','#f4e9e4'],['black','Meias escuras',20,1,'gotico','#413847'],['lace','Meias delicadas',25,2,'romantico','#e6cbd9']],
 hairstyle:[['bun','Coque romântico',0,1,'elegante','#785047'],['long','Ondas longas',0,1,'romantico','#785047'],['pony','Rabo de cavalo lateral',0,1,'esportivo','#785047'],['braid','Trança lateral',35,2,'casual','#785047']],
 makeup:[['natural','Natural',0,1,'','#d7a59b'],['rose','Blush rosado',0,1,'romantico','#e296a3'],['wine','Batom vinho',25,1,'gotico','#a04e63'],['glow','Brilho pérola',30,2,'elegante','#ebc9b7']],
 accessory:[['ribbon','Laço vinho',0,1,'romantico','#963b52'],['pearl','Presilhas pérola',0,1,'elegante','#ead6b3'],['star','Estrela da Íris',45,2,'romantico','#e4bb6b'],['brooch','Rosa de Bellmont',65,3,'academico','#d8a0ae'],['necklace','Colar dourado',25,1,'elegante','#d8b46e'],['earrings','Brincos de pérola',25,1,'elegante','#f0dcc3'],['bag','Bolsa de passeio',40,2,'casual','#ba8d81'],['glasses','Óculos finos',30,1,'academico','#795b5e']]
};
const catnames9={
  top:'Blusas',
  bottom:'Saias e calças',
  dress:'Vestidos',
  coat:'Casacos',
  shoes:'Sapatos',
  socks:'Meias',
  hairstyle:'Penteados',
  makeup:'Maquiagem',
  accessory:'Acessórios'
};

const palettes9={
  hair:[...colors8.hair,['ruivo','Ruivo','#ad684c'],['lilas','Lilás','#a18cbb']],
  eyes:[...colors8.eyes,['violeta','Violeta','#9f70b4']],
  skin:colors8.skin
};

const presets9={
  uniforme:{
    top:'blouse',
    bottom:'pleats',
    dress:'none',
    coat:'blazer',
    shoes:'loafers',
    socks:'white'
  },
  cardigan:{
    top:'rose',
    bottom:'pleats',
    dress:'none',
    coat:'cardigan',
    shoes:'flats',
    socks:'white'
  },
  jaqueta:{
    top:'tee',
    bottom:'jeans',
    dress:'none',
    coat:'jacket',
    shoes:'sneakers',
    socks:'none'
  },
  casual:{
    top:'tee',
    bottom:'cream',
    dress:'none',
    coat:'creamcoat',
    shoes:'flats',
    socks:'none'
  },
  festival:{
    top:'blouse',
    bottom:'cream',
    dress:'wine',
    coat:'none',
    shoes:'flats',
    socks:'none'
  }
  
};

const row9=(k,id)=>catalog9[k]?.find(r=>r[0]===id);
function look9(l={
  
}){
  let p=presets9[l.outfit]||presets9.uniforme;
  let f={
    ...p,
    hairstyle:'bun',
    makeup:'natural',
    ...l.fashion
  };
  for(const k of Object.keys(f))if(!row9(k,f[k]))delete f[k];
  return {
    ...l,
    hair:palettes9.hair.some(x=>x[0]===l.hair)?l.hair:'castanho',
    eyes:palettes9.eyes.some(x=>x[0]===l.eyes)?l.eyes:'mel',
    skin:palettes9.skin.some(x=>x[0]===l.skin)?l.skin:'clara',
    outfit:l.outfit||'uniforme',
    accessories:[...new Set((l.accessories||[]).filter(x=>row9('accessory',x)))],
    fashion:{
      ...p,
      hairstyle:'bun',
      makeup:'natural',
      ...f
    }
    
  }
  
}

function closet9(s){
  const w=wallet8(s);
  const v=s.fashion9||(s.fashion9={
    owned:[],photos:[],posts:[],challenges:[]
  });
  for(const k of ['owned','photos','posts','challenges'])if(!Array.isArray(v[k]))v[k]=[];
  for(const id of w.owned)if(row9('accessory',id)&&!v.owned.includes('accessory:'+id))v.owned.push('accessory:'+id);
  return v
}

function normalizeFashion(s, originalLook) {
    s.look=look9({...s.look,...originalLook});closet9(s);
}
const id9=(k,id)=>k+':'+id;
function owned9(s,k,id){const r=row9(k,id);return !!r&&(r[2]===0||closet9(s).owned.includes(id9(k,id)))}
const haircolor9={castanho:'#62443c',preto:'#292931',rosa:'#bc7897',loiro:'#bb935b',ruivo:'#945134',lilas:'#88719f'};
const shade9=(c,n)=>'#'+c.slice(1).match(/../g).map(v=>Math.max(0,Math.min(255,parseInt(v,16)+n)).toString(16).padStart(2,'0')).join('');
let uid9=0;
function art9(l,full=false,only=null){l=look9(l);const f=l.fashion;const u='f9_'+(++uid9);let defs='',out='';const stroke='#59404a';const hair=haircolor9[l.hair]||haircolor9.castanho;function grad(c){const id=u+'_'+(defs.length);defs+=`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2=".28"><stop stop-color="${shade9(c,-25)}"/><stop offset=".43" stop-color="${shade9(c,12)}"/><stop offset=".72" stop-color="${c}"/><stop offset="1" stop-color="${shade9(c,-32)}"/></linearGradient>`;return `url(#${id})`}
const path=(d,c,st=stroke,sw=2.7)=>`<path d="${d}" fill="${c}" stroke="${st}" stroke-width="${sw}" stroke-linejoin="round"/>`;
const line=(d,c=stroke,sw=2,op=.65)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round"/>`;
const img=d=>d?`<image href="${mediaURL14(d,'image/webp')}" width="1024" height="1536"/>`:'';
const show=k=>!only||only===k;const c=k=>row9(k,f[k])?.[5]||'#dddddd';
if(show('hairstyle')&&f.hairstyle!=='bun'){let g=grad(hair);if(f.hairstyle==='long'){out+=path('M431 105 Q376 118 368 251 Q347 390 315 499 Q303 590 362 655 Q345 575 407 541 Q443 486 460 338 L559 336 Q589 482 633 543 Q679 574 652 662 Q720 603 690 493 Q651 384 646 244 Q645 132 586 100Z',g);for(let i=0;i<4;i++){out+=line(`M${390+i*12} 190 Q${347+i*13} 390 ${350+i*15} 500 Q${327+i*17} 566 ${364+i*11} 594`,shade9(hair,38),3,.6);out+=line(`M${610+i*8} 190 Q${645+i*8} 390 ${656+i*7} 500 Q${689-i*6} 568 ${655+i*5} 605`,shade9(hair,38),3,.6)}}else if(f.hairstyle==='pony'){out+=path('M574 65 Q698 55 701 186 Q728 290 663 385 Q686 297 645 247 Q619 205 602 155 L566 121Z',g);out+=line('M614 89 Q700 132 670 285',shade9(hair,45),5)}else{out+=path('M573 110 Q668 178 652 309 Q652 397 611 475 L594 528 581 477 Q607 365 598 261Z',g);for(let y=250;y<480;y+=30)out+=line(`M607 ${y} Q646 ${y+14} 605 ${y+33}`,shade9(hair,42),5)}}
if(!only)out+=img(fashionArt.base)+img(fashionArt.hair[l.hair])+img(fashionArt.skin[l.skin])+img(fashionArt.eyes[l.eyes]);
if(show('socks')&&f.socks!=='none'){
  let g=grad(c('socks'));
  out+=path('M393 1090 Q432 1104 470 1090 L449 1385 Q445 1411 454 1448 Q435 1477 395 1457 L405 1385 Q404 1250 393 1090Z',g)+path('M553 1090 Q591 1104 625 1090 Q616 1250 609 1385 L622 1457 Q580 1477 565 1448 Q574 1411 568 1385Z',g);
  out+=line('M396 1102 Q432 1115 469 1102 M553 1102 Q591 1115 622 1102','#fff',4,.6)
}

if(show('bottom')&&(f.dress==='none'||only==='bottom')){let color=c('bottom'),g=grad(color);if(['jeans','shorts'].includes(f.bottom)){let end=f.bottom==='shorts'?855:1408;out+=path(`M403 635 Q510 658 620 635 Q654 720 648 837 L${f.bottom==='shorts'?640:618} ${end} Q585 ${end+12} ${f.bottom==='shorts'?524:565} ${end} L512 755 L${f.bottom==='shorts'?499:454} ${end} Q420 ${end+12} ${f.bottom==='shorts'?380:398} ${end} L376 837 Q370 720 403 635Z`,g);out+=line('M405 651 Q512 675 617 651 M512 655 L512 746 M408 667 Q412 725 461 728 M616 667 Q612 725 562 728',shade9(color,-38),4);out+=`<circle cx="512" cy="660" r="5" fill="#d9b879"/>`}else{let end=f.bottom==='long'?1130:920;let wide=f.bottom==='long'?200:184;out+=path(`M403 635 Q510 655 620 635 Q${512+wide-35} 755 ${512+wide} ${end} Q512 ${end+32} ${512-wide} ${end} Q${512-wide+35} 755 403 635Z`,g);out+=path('M402 635 Q511 650 621 635 L628 665 Q511 680 395 665Z',shade9(color,-19));for(let i=-3;i<=3;i++)out+=line(`M${512+i*29} 674 Q${512+i*38} 790 ${512+i*(wide/3.5)} ${end+8}`,shade9(color,-36),f.bottom==='pleats'||f.bottom==='goth'?5:2,.62);out+=line(`M${512-wide+6} ${end-13} Q512 ${end+19} ${512+wide-6} ${end-13}`,shade9(color,48),3,.75)}}
if(show('top')&&(f.dress==='none'||only==='top')){let color=c('top'),g=grad(color);out+=path('M455 337 Q478 374 512 376 Q546 374 569 337 L608 345 Q637 344 652 384 L661 426 610 446 Q610 490 592 511 Q576 548 589 581 L621 638 Q512 677 403 638 L435 581 Q448 548 431 511 Q414 490 414 446 L363 426 372 384 Q387 344 416 345Z',g);out+=line('M454 342 Q512 405 570 342 M413 444 Q427 410 420 374 M612 444 Q598 410 604 374 M437 510 Q512 537 587 510 M434 585 Q510 615 590 585',shade9(color,-35),3,.55);if(f.top==='blouse'){out+=path('M455 338 L511 380 475 416 432 358Z','#fff5ee')+path('M569 338 L512 380 548 416 592 358Z','#fff5ee');out+=line('M512 392 L512 646','#c9a8a0',3);for(let y=427;y<635;y+=48)out+=`<circle cx="512" cy="${y}" r="5" fill="#d3af80"/>`;out+=path('M510 389 Q483 370 465 382 L471 423 510 405 550 423 557 382 Q535 370 510 389Z','#963d55')+path('M501 399 L480 443 501 436 512 410 525 436 545 443 522 399Z','#963d55')}if(f.top==='rose'||f.top==='lavender')out+=line('M453 343 Q512 396 571 343','#fff2ec',5,.95);if(f.top==='sport')out+=line('M373 405 L413 422 M612 422 L652 405','#fff',8,.85)}
if(show('dress')&&f.dress!=='none'){let color=c('dress'),g=grad(color);out+=path('M454 337 L484 367 Q512 389 540 367 L570 337 608 345 Q636 345 651 384 L661 426 610 446 Q610 485 589 526 Q576 563 594 603 L623 642 Q680 761 721 1018 Q512 1072 303 1018 Q344 761 401 642 L430 603 Q448 563 435 526 Q414 485 414 446 L363 426 373 384 Q389 345 416 345Z',g);out+=path('M401 631 Q512 650 623 631 L635 663 Q512 683 389 663Z',shade9(color,-29));for(let i=-3;i<=3;i++)out+=line(`M${512+i*29} 675 Q${512+i*44} 850 ${512+i*62} 1029`,shade9(color,-33),3,.65);out+=line('M456 341 Q512 398 568 341 M312 1007 Q512 1058 712 1007',shade9(color,65),5,.85);if(f.dress==='wine'||f.dress==='blossom'){for(let y=430;y<=600;y+=34){out+=`<circle cx="512" cy="${y}" r="4.5" fill="#f0cba9"/>`;}out+=path('M510 646 Q472 613 451 642 L468 680 510 657 551 680 573 642 Q550 613 510 646Z',shade9(color,-17))}}
if(show('coat')&&f.coat!=='none'){let color=c('coat'),g=grad(color);out+=path('M453 337 L417 343 Q389 343 375 375 L353 462 331 554 302 636 258 755 306 775 353 674 389 592 414 518 439 566 431 600 396 672 Q450 694 488 669 L487 451 472 402Z',g)+path('M571 337 L607 343 Q635 343 649 375 L671 462 693 554 722 636 766 755 718 775 671 674 635 592 610 518 585 566 593 600 628 672 Q574 694 536 669 L537 451 552 402Z',g);out+=line('M357 465 L393 477 M667 465 L631 477 M270 742 L316 762 M754 742 L708 762 M437 571 L461 575 M587 571 L563 575',shade9(color,-39),4);if(f.coat==='blazer'||f.coat==='leather'){out+=path('M453 337 L431 362 456 426 441 445 487 508 487 451Z',shade9(color,14))+path('M571 337 L593 362 568 426 583 445 537 508 537 451Z',shade9(color,14));out+=line('M453 339 L431 362 456 426 441 445 487 508 M571 339 L593 362 568 426 583 445 537 508',f.coat==='blazer'?'#d4ae78':'#9a8793',4,.95);if(f.coat==='blazer')out+=`<g transform="translate(570 485)"><path d="M-15 -13H15V5Q0 25 -15 5Z" fill="#684054" stroke="#d8b575" stroke-width="2"/><text y="9" font-size="22" text-anchor="middle" font-family="Georgia" fill="#e9c68c">B</text></g>`}else{out+=line('M454 346 Q480 410 489 665 M570 346 Q544 410 535 665',shade9(color,43),8,.9);for(let y=480;y<655;y+=46)out+=`<circle cx="476" cy="${y}" r="5" fill="#e1bd91"/>`;if(f.coat==='jacket')out+=line('M379 380 L349 497 305 638 271 739 M645 380 L675 497 719 638 753 739','#e6d9ce',7,.9)}}
if(show('shoes')&&f.shoes!=='flats'){let color=c('shoes'),g=grad(color);if(f.shoes==='boots'){out+=path('M398 1260 Q427 1277 457 1260 L450 1400 Q465 1450 460 1485 Q436 1530 396 1507 Q377 1495 391 1457 L405 1390Z',g)+path('M566 1260 Q596 1277 622 1260 L610 1390 626 1457 Q640 1495 620 1507 Q580 1530 557 1485 Q552 1450 567 1400Z',g);for(let y=1290;y<1390;y+=23)out+=line(`M410 ${y} L446 ${y+12} M446 ${y} L410 ${y+12} M575 ${y} L612 ${y+12} M612 ${y} L575 ${y+12}`,'#c9b9b7',2)}else{out+=path('M403 1430 Q429 1444 451 1428 L461 1479 Q462 1510 425 1517 Q384 1512 388 1475Z',g)+path('M570 1428 Q592 1444 616 1430 L631 1475 Q635 1512 594 1517 Q557 1510 558 1479Z',g);out+=line('M392 1487 Q425 1516 455 1487 M563 1487 Q595 1516 627 1487',f.shoes==='sneakers'?'#aaa2a2':shade9(color,-34),5);out+=line('M406 1450 Q427 1463 449 1450 M571 1450 Q593 1463 614 1450',shade9(color,48),7)}}
if(show('makeup')&&!only){if(f.makeup==='rose'||f.makeup==='glow')out+=`<ellipse cx="465" cy="235" rx="13" ry="5" fill="#e4939c" opacity=".22"/><ellipse cx="560" cy="235" rx="13" ry="5" fill="#e4939c" opacity=".22"/>`;if(f.makeup==='wine')out+=path('M499 259 Q506 257 513 260 Q520 257 529 259 Q515 270 499 259Z','#a25c68','none',0);if(f.makeup==='glow')out+=`<circle cx="460" cy="231" r="1.5" fill="#fff9e9"/><circle cx="565" cy="231" r="1.5" fill="#fff9e9"/>`}
if(show('accessory'))for(const a of l.accessories){if(a==='ribbon')out+=path('M454 64 Q411 24 394 44 L401 89 Q429 81 454 69 Q482 95 502 85 L507 43 Q480 42 454 64Z','#973b53')+path('M444 69 L413 123 435 115 453 80 474 117 493 122 464 69Z','#973b53');if(a==='pearl')out+=`<g transform="translate(435 155) rotate(-45)"><rect width="32" height="5" rx="2" fill="#cfad72"/>${[3,11,19,27].map(x=>`<circle cx="${x}" cy="2" r="4" fill="#fff2df" stroke="#bf9a75" stroke-width=".8"/>`).join('')}</g>`;if(a==='star')out+=path('M585 153 L590 165 604 165 594 174 597 188 585 180 573 188 576 174 566 165 580 165Z','#efc877','#9c734a',1.8);if(a==='brooch')out+=`<g transform="translate(577 487)">${[0,72,144,216,288].map(r=>`<ellipse cy="-8" rx="6" ry="10" transform="rotate(${r})" fill="#e5a5b5" stroke="#ae687e"/>`).join('')}<circle r="5" fill="#e3bc76"/></g>`;if(a==='necklace')out+=line('M475 334 Q512 373 549 334','#ba9555',2.5,.95)+`<circle cx="512" cy="355" r="6" fill="#d8af66" stroke="#947344"/>`;if(a==='earrings')out+=`<circle cx="451" cy="247" r="5" fill="#fff4e0" stroke="#c8a36c"/><circle cx="576" cy="247" r="5" fill="#fff4e0" stroke="#c8a36c"/>`;if(a==='glasses')out+=`<g fill="none" stroke="#886a67" stroke-width="2.5"><rect x="451" y="193" width="47" height="35" rx="13"/><rect x="529" y="193" width="47" height="35" rx="13"/><path d="M498 207 Q514 198 529 207 M451 205L441 199 M576 205L585 199"/></g>`;if(a==='bag')out+=line('M600 369 Q682 564 662 744','#725250',9,.95)+path('M603 735 Q656 719 702 743 L716 844 Q656 866 593 844Z',grad('#bb9186'))+path('M603 735 Q655 725 702 743 L707 785 Q655 806 599 785Z','#ac8077')+`<rect x="648" y="777" width="17" height="12" rx="3" fill="#e6c58b"/>`}
let box=full==='face'?'390 0 245 370':full?'205 0 614 1536':'300 0 424 810';
if(only)box=({
  top:'345 325 334 355',bottom:'285 620 454 820',dress:'285 325 454 770',coat:'240 325 544 470',shoes:'365 1250 290 285',socks:'365 1065 290 430',hairstyle:'300 0 430 660',accessory:'205 0 614 900',makeup:'400 160 224 155'
})[only]||box;

return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" class="anime-sprite protagonist-sprite fashion9" role="img" aria-label="Protagonista personalizada"><defs>${defs}</defs>${out}</svg>`}
avatar=function(l={},m='neutral'){return art9(l,false)};
let tab9='top',pose9='full',filter9='all',photoBg9='rose';
function current9(){return modalType==='new'?draft:state}
function redraw9(){keepName8();drawWard7()}
function equip9(k,id){
  if(k==='accessory'){
    draft.look.accessories=draft.look.accessories.includes(id)?draft.look.accessories.filter(a=>a!==id):[...draft.look.accessories,id]
  }
  else {
    draft.look.fashion[k]=id;
    if(k==='top'||k==='bottom')draft.look.fashion.dress='none'
  }
   
}

const challenge9=[{
  id:'study',title:'Primeiro dia de aula',tags:['academico'],day:1,prize:30
},{
  id:'cafe',title:'Um café depois do sinal',tags:['casual','romantico'],day:2,prize:40
},{
  id:'night',title:'Festival de Bellmont',tags:['elegante','romantico'],day:4,prize:60
}];

function rating9(ch,l){
  let tags=Object.entries(l.fashion).filter(([k,v])=>!(l.fashion.dress!=='none'&&['top','bottom'].includes(k))).map(([k,v])=>row9(k,v)?.[4]);
  tags.push(...l.accessories.map(a=>row9('accessory',a)?.[4]));
  return Math.min(5,tags.filter(x=>ch.tags.includes(x)).length)
}

function photos9(){return closet9(current9()).photos}
function thumb9(k,id){let l=look9(draft.look);l.fashion={...l.fashion,[k]:id};if(k==='accessory')l.accessories=[id];if(id==='none'||k==='makeup')return `<span class="miniicon9" style="background:${row9(k,id)[5]}">${id==='none'?'∅':'✧'}</span>`;return art9(l,true,k)}
function studio9(){const s=current9(),v=closet9(s),w=wallet8(s),l=draft.look,day=s.episode||1;let body='';const tabs={...catnames9,beauty:'Beleza',presets:'Coleções',shop:'BellShop',favorites:'Favoritos',challenge:'Desafios',photo:'Fotos & Feed'};
if(catalog9[tab9]||tab9==='shop'){const groups=tab9==='shop'?Object.keys(catalog9):[tab9];body=`<div class="filter9"><button class="soft" data-act="filter9" data-id="all" aria-pressed="${filter9==='all'}">Todos</button><button class="soft" data-act="filter9" data-id="owned" aria-pressed="${filter9==='owned'}">Minha coleção</button><button class="soft" data-act="filter9" data-id="shop" aria-pressed="${filter9==='shop'}">À venda</button></div>`+groups.map(k=>{let rows=catalog9[k].filter(r=>filter9==='all'||(filter9==='owned')===owned9(s,k,r[0]));return rows.length?`<h3>${catnames9[k]}</h3><div class="pieces9">${rows.map(r=>{const [id,n,price,unlock,tag]=r,own=owned9(s,k,id),on=k==='accessory'?l.accessories.includes(id):l.fashion[k]===id;return `<button class="piece9" data-act="${own?'equip9':'buy9'}" data-key="${k}" data-id="${id}" aria-pressed="${on}" ${!own&&(day<unlock||w.coins<price)?'disabled':''}><div class="pieceart9">${thumb9(k,id)}</div><b>${n}</b><small>${on?'✓ Em uso':own?'Na coleção':day<unlock?'Ep. '+unlock:price+' BC'}</small></button>`}).join('')}</div>`:''}).join('')||'<p>Nenhuma peça nesta seleção.</p>'}
if(tab9==='beauty')body=Object.entries(palettes9).map(([k,rows])=>`<h3>${({hair:'Cor do cabelo',eyes:'Cor dos olhos',skin:'Tom de pele'})[k]}</h3><div class="swatches8">${rows.map(([id,n,c])=>`<button class="swatch8" data-act="color9" data-key="${k}" data-id="${id}" aria-pressed="${l[k]===id}"><span style="background:${c}"></span>${n}</button>`).join('')}</div>`).join('')+'<p class="hint">As íris usam a textura original recolorida; as pupilas e o brilho são preservados.</p>';
if(tab9==='presets')body=`<h3>Coleções prontas</h3><div class="pieces9">${Object.keys(presets9).map(k=>`<button class="piece9" data-act="preset9" data-id="${k}"><div class="pieceart9 full9">${art9({...l,outfit:k,fashion:{...presets9[k],hairstyle:l.fashion.hairstyle,makeup:l.fashion.makeup}},true)}</div><b>${outfitNames7[k]}</b><small>Vestir combinação</small></button>`).join('')}</div>`;
if(tab9==='favorites')body=`<h3>Looks favoritos</h3><div class="favform8"><input id="fav9" maxlength="30" placeholder="Nome do look"><button class="primary" data-act="favorite9" ${w.favorites.length>=12?'disabled':''}>Salvar</button></div><div class="pieces9">${w.favorites.map((r,i)=>`<div class="piece9"><div class="pieceart9 full9">${art9(r.look,true)}</div><b>${esc(r.name)}</b><button class="soft" data-act="use9" data-i="${i}">Vestir</button><button class="soft" data-act="delete9" data-i="${i}">Excluir</button></div>`).join('')||'<p>Nenhum favorito ainda.</p>'}</div>`;
if(tab9==='challenge')body=`<h3>Desafios de moda</h3><p class="hint">Combine peças com as etiquetas pedidas. Três pontos ou mais ganham o prêmio uma única vez.</p>${challenge9.map(ch=>`<article class="event9"><b>${ch.title}</b><small>${ch.tags.join(' / ')} • prêmio ${ch.prize} BC</small><p>${'★'.repeat(rating9(ch,l))}${'☆'.repeat(5-rating9(ch,l))}</p><button class="soft" data-act="judge9" data-id="${ch.id}" ${day<ch.day||v.challenges.includes(ch.id)?'disabled':''}>${v.challenges.includes(ch.id)?'Concluído':day<ch.day?'Episódio '+ch.day:'Avaliar look'}</button></article>`).join('')}`;
if(tab9==='photo')body=`<h3>Sessão de fotos</h3><p>Escolha o fundo e registre seu look. A foto preserva as peças e as cores escolhidas.</p><div class="filter9">${Object.entries({rose:'Rosa',night:'Noite',garden:'Jardim'}).map(([id,n])=>`<button class="soft" data-act="bg9" data-id="${id}" aria-pressed="${photoBg9===id}">${n}</button>`).join('')}</div><button class="primary" data-act="photo9" ${v.photos.length>=20?'disabled':''}>♡ Registrar look</button><h3>Álbum</h3><div class="pieces9">${v.photos.map((p,i)=>`<div class="piece9"><div class="pieceart9 full9 bg9-${p.bg}">${art9(p.look,true)}</div><b>Look ${i+1}</b><button class="soft" data-act="download9" data-i="${i}">Salvar imagem</button><button class="soft" data-act="post9" data-i="${i}" ${v.posts.some(x=>x.photo===i)?'disabled':''}>${v.posts.some(x=>x.photo===i)?'Publicado':'Publicar no BellFeed'}</button></div>`).join('')||'<p>Seu álbum está vazio.</p>'}</div><h3>BellFeed • mural de moda</h3>${v.posts.map(p=>`<article class="event9"><b>Look ${p.photo+1} • ${p.likes} curtidas</b>${p.comments.map(t=>`<p>${esc(t)}</p>`).join('')}</article>`).join('')||'<p class="hint">Nenhuma publicação ainda.</p>'}`;
return `<div class="studiohead8"><span class="tag">ATELIÊ BELLMONT 3.0 • FASHION STUDIO</span><span class="wallet8">✦ ${w.coins} BellCoins</span></div><div class="fashionlayout9"><div class="fashionmirror9"><div class="mirrorart9 bg9-${photoBg9} ${pose9==='face'?'face9':''}">${art9(l,pose9==='full'?true:'face')}</div><div class="filter9"><button class="soft" data-act="zoom9" data-id="full" aria-pressed="${pose9==='full'}">Corpo inteiro</button><button class="soft" data-act="zoom9" data-id="face" aria-pressed="${pose9==='face'}">Rosto</button><button class="soft" data-act="reset9">Restaurar</button></div><small>Peças em camadas • pose fixa</small></div><div class="fashionoptions9">${modalType==='new'?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}<div class="fashiontabs9">${Object.entries(tabs).map(([k,n])=>`<button class="soft" data-act="tab9" data-id="${k}" aria-pressed="${tab9===k}">${n}</button>`).join('')}</div><div class="fashioncatalog9">${body}</div></div></div>`}
drawWard7=function(){draft.look=look9(draft.look);const s=current9();closet9(s);showPanel(modalType==='new'?'Crie sua protagonista':'Ateliê Bellmont • Fashion Studio',studio9()+`<div class="studiofoot8"><span class="hint">${modalType==='new'&&saved?'Novo jogo substitui o save atual.':'O visual equipado aparece nas cenas. Compras e favoritos são salvos.'}</span><button class="primary" data-act="${modalType==='new'?'start':'wear'}">${modalType==='new'?'Começar a história':'Salvar visual'} ♡</button></div>`);document.querySelector('#modal .panel')?.classList.add('wide7','fashionpanel9')};
const oldModal9=modal;modal=function(t){if(t==='new'||t==='wardrobe'){tab9='top';filter9='all';pose9='full';return oldModal9(t)}if(t==='about'){modalType=t;return showPanel('Depois do Sinal • v0.8.2','<p>Fashion Studio • Cinco episódios, ateliê de peças independentes, BellCoins, desafios de moda, álbum e mural. Funciona offline.</p><p>Arte-base anime com roupas vetoriais em camadas e pose fixa.</p>')}return oldModal9(t)};
const cover9base=cover;cover=function(){return cover9base().replace(/Edição 0\.8\.1[^<]*/,'Edição 0.8.2 • Fashion Studio')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled||!draft||!['new','wardrobe'].includes(modalType))return;const a=b.dataset.act;if(!['tab9','filter9','equip9','buy9','color9','preset9','favorite9','use9','delete9','judge9','bg9','photo9','post9','download9','zoom9','reset9'].includes(a))return;keepName8();const k=b.dataset.key,id=b.dataset.id,i=Number(b.dataset.i),s=current9(),w=wallet8(s),v=closet9(s);if(a==='tab9'){tab9=id;filter9='all'}if(a==='filter9')filter9=id;if(a==='zoom9')pose9=id;if(a==='bg9')photoBg9=id;if(a==='color9'&&palettes9[k]?.some(x=>x[0]===id))draft.look[k]=id;if(a==='equip9'&&owned9(s,k,id))equip9(k,id);if(a==='buy9'){let r=row9(k,id);if(r&&!owned9(s,k,id)&&w.coins>=r[2]&&(s.episode||1)>=r[3]){w.coins-=r[2];v.owned.push(id9(k,id));if(k==='accessory'&&accessories8[id]&&!w.owned.includes(id))w.owned.push(id);equip9(k,id);toast('Peça adquirida ♡')}}if(a==='preset9'&&presets9[id]){draft.look.outfit=id;draft.look.fashion={...draft.look.fashion,...presets9[id]}}if(a==='reset9')draft.look=look9({outfit:'uniforme',hair:'castanho',eyes:'mel',skin:'clara',accessories:[]});if(a==='favorite9'&&w.favorites.length<12){let n=(document.querySelector('#fav9')?.value||'').trim();if(!n){toast('Dê um nome ao look.');return}w.favorites.push({name:n,look:JSON.parse(JSON.stringify(draft.look))});toast('Look favorito salvo')}if(a==='use9'&&w.favorites[i])draft.look=look9(JSON.parse(JSON.stringify(w.favorites[i].look)));if(a==='delete9'&&w.favorites[i])w.favorites.splice(i,1);if(a==='judge9'){const ch=challenge9.find(x=>x.id===id);if(ch&&!v.challenges.includes(id)&&(s.episode||1)>=ch.day){if(rating9(ch,draft.look)>=3){v.challenges.push(id);w.coins+=ch.prize;toast('Desafio vencido! +'+ch.prize+' BC')}else toast('Combine mais peças do tema.')}}if(a==='photo9'&&v.photos.length<20){v.photos.push({look:JSON.parse(JSON.stringify(draft.look)),bg:photoBg9});toast('Foto registrada ♡')}if(a==='post9'&&v.photos[i]&&!v.posts.some(p=>p.photo===i)){let top=[...routes].sort((a,b)=>(s.aff?.[b]||0)-(s.aff?.[a]||0))[0];let known=(s.aff?.[top]||0)>0;const comments=['Mabel: Esse look merece um ensaio inteiro!'];if(known)comments.push(chars[top].name+': '+({dante:'Tá legal. Não vou repetir.',soren:'Uma combinação bem escolhida.',theo:'Amei o visual!',ezra:'As cores ficaram bonitas.',valentim:'Elegância natural.',raven:'Esse look daria uma ótima capa. ♡'}[top]));v.posts.push({photo:i,likes:known?3:1,comments});toast('Look publicado no mural')}if(a==='download9'&&v.photos[i]){let p=v.photos[i];let svg=withEmbedded14(()=>art9(p.look,true)).replace('</defs>','</defs><rect x="205" width="614" height="1536" fill="'+({rose:'#f3e0e8',night:'#39374f',garden:'#e0e8d5'}[p.bg]||'#f3e0e8')+'"/>');const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const el=document.createElement('a');el.href=url;el.download='bellmont-look-'+(i+1)+'.svg';el.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return}if(modalType==='wardrobe')persist();drawWard7()});


const animeAvatar83=function(l={},m='neutral'){const h=avatar8base(l,m);if(!l.accessories?.length)return h;const set=lookArt7[l.outfit]||lookArt7.uniforme;const [,w,height]=set[m]||set.neutral;const scale=w/434;let x='';const classic=!['casual','festival'].includes(l.outfit);const pinX=(classic?.31:.29)*w,pinY=.16*height;const starX=(classic?.68:.68)*w,starY=.20*height;const broochX=(classic?.78:.73)*w,broochY=(classic?.66:.69)*height;
if(l.accessories.includes('pearl'))x+=`<g transform="translate(${pinX} ${pinY}) rotate(-32) scale(${scale})" stroke="#9b774c" stroke-width="1.5"><rect x="-17" y="-7" width="34" height="6" rx="3" fill="#f5d6a0"/><rect x="-15" y="4" width="30" height="5" rx="2.5" fill="#e9b77a"/>${[-12,-4,4,12].map(p=>`<circle cx="${p}" cy="-4" r="4" fill="#fff6ea"/>`).join('')}</g>`;
if(l.accessories.includes('star'))x+=`<g transform="translate(${starX} ${starY}) scale(${scale})" stroke="#94662f" stroke-width="2"><path d="M0 -15 4 -5 15 -5 7 2 10 13 0 7 -10 13 -7 2 -15 -5 -4 -5Z" fill="#f8d68a"/><circle r="3" fill="#fff6da" stroke="none"/></g>`;
if(l.accessories.includes('brooch'))x+=`<g transform="translate(${broochX} ${broochY}) scale(${scale})" stroke="#85475f" stroke-width="1.3">${[0,72,144,216,288].map(r=>`<ellipse cy="-8" rx="6.5" ry="9" fill="#efafbc" transform="rotate(${r})"/>`).join('')}<circle r="5" fill="#eac071"/></g>`;
return h.replace('</svg>',x+'</svg>')};

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

// conversas | v0.14
/* v0.9.4 - organized BellPhone conversations */
function data94(){const d=data90();if(!Number.isFinite(d.serial))d.serial=0;if(!Array.isArray(d.archived94))d.archived94=[];return d}
function trustText94(id){
  return ({
    dante:'Tô escolhendo umas músicas pro ensaio. Que tipo de música você gosta?',soren:'Estou organizando a programação. Você prefere planejar tudo ou improvisar?',theo:'Preciso de uma opinião importante: chocolate ou sorvete?',ezra:'Estou pensando numa exposição. Você gosta de fotografias de pessoas ou de paisagens?',valentim:'Uma pergunta: você prefere teatro ou cinema?',raven:'Estou escolhendo o tema da próxima matéria. Você prefere investigar os clubes ou ouvir os alunos?'
  })[id]||'Como foi seu dia?'
}

function affText94(id){
  return ({
    dante:'O ensaio acabou. Tem dias em que só quero ficar longe de todo mundo. Hoje não foi um deles.',soren:'Consegui terminar minhas tarefas cedo. Foi bom conversar com você outro dia.',theo:'Hoje lembrei daquela nossa conversa e comecei a rir sozinho.',ezra:'Vi uma coisa bonita no caminho. Pensei em te contar.',valentim:'Nossa conversa de outro dia foi uma surpresa agradável.',raven:'É raro eu encontrar alguém com quem possa conversar sem ficar pensando na próxima pergunta.'
  })[id]||'Gostei da nossa conversa.'
}

const canReply94=(m,i)=>!m.topic7&&!m.invite90&&!m.invite5&&!state.replied[i]&&!data94().archived94.includes(i);
let chosen94=null,search94='',scroll94=null;
function events94(id){
  let events=[];
  state.messages.forEach((m,i)=>{
    if(m.who!==id)return;const day=m.day94||m.day90||null;const r=state.replied[i];if(!m.topic7)events.push({
      i,m,kind:'in',pos:i,sub:0,day,text:m.text
    });if(r){
      let timed=Number.isFinite(r.after94);const pos=timed?r.after94-.5:i+.25,sub=timed?(r.order94||0)*2:0;events.push({
        i,kind:'out',pos,sub,day:r.day94||day,text:r.text,quote:!m.topic7&&timed&&r.after94>i+1?m.text:''
      });events.push({
        i,kind:'answer',pos,sub:sub+1,day:r.day94||day,text:r.answer
      })
    }
    
  });
  return events.sort((a,b)=>a.pos-b.pos||a.sub-b.sub)
}

function last94(id){return events94(id).at(-1)}
function pendingList94(id){return state.messages.map((m,i)=>({m,i})).filter(({m,i})=>m.who===id&&canReply94(m,i))}
function bubble94(e){const mine=e.kind==='out',d=data94(),m=e.m;let controls='';if(m?.invite90)controls=inviteControls90(m.invite90);else if(m?.invite5){const st=state.e4.invites[m.who];controls=state.node==='e4pick'&&st==='pending'?`<div class="bpactions">${button90('invite5','Aceitar dupla','data-id="'+m.who+'" data-i="1"')}${button90('invite5','Recusar','data-id="'+m.who+'" data-i="0"')}</div>`:pill90(({accepted:'Dupla aceita',declined:'Recusado',closed:'Encerrado'})[st]||'Encerrado')}
return `<div class="message94 ${mine?'own94':''}"><div class="bpbubble ${mine?'bpmine':''}">${e.quote?`<div class="quote94">${esc(e.quote)}</div>`:''}${esc(e.text||'')}${m&&d.stars.includes(e.i)?'<span class="starflag94"> ★</span>':''}</div>${m?`<div class="msgtools94">${button90('bp90star',d.stars.includes(e.i)?'★':'☆',`data-i="${e.i}" aria-label="Favoritar mensagem"`)}${canReply94(m,e.i)?button90('select94','Responder',`data-i="${e.i}"`):''}</div>`:''}${controls}</div>`}
thread90=function(id){const list=events94(id),pending=pendingList94(id),selected=pending.find(x=>x.i===chosen94)||pending[0];let prev=Symbol(),hist='';for(const e of list){if(e.day!==prev){hist+=`<div class="day94">${e.day?'Dia '+e.day:'Histórico anterior'}</div>`;prev=e.day}hist+=bubble94(e)}const topics=(chatTopics7[id]||[]).map((t,i)=>button90('bp90topic',esc(t[0]),`data-id="${id}" data-i="${i}" ${state.phone7.topics[id+':'+i+':'+state.episode]?'disabled':''}`)).join('');return `<div class="thread94"><div class="bpthreadhead">${face90(id)}<div><b>${name90(id)}</b><small>${romance93().includes(id)?stage(id):'Amizade'}</small></div><span class="pending94">${pending.length?pending.length+' para responder':'Em dia'}</span></div><div class="history94" tabindex="0" aria-label="Histórico da conversa">${hist||'<p class="bpmuted">Ainda não há mensagens.</p>'}</div><div class="composer94">${selected?`<div class="composerhead94"><b>Responder a ${name90(id)}</b><span>${pending.findIndex(x=>x.i===selected.i)+1} de ${pending.length}</span></div><div class="quote94">${esc(selected.m.text)}</div><div class="bpchoices">${replies90(id,selected.m).map((o,j)=>button90('bp90reply',esc(o[0]),`data-i="${selected.i}" data-j="${j}"`)).join('')}</div><div class="bpactions">${pending.length>1?button90('next94','Outra mensagem',`data-i="${selected.i}"`):''}${button90('skip94','Deixar sem resposta',`data-i="${selected.i}"`)}</div>`:'<p class="bpmuted">Nenhuma mensagem aguardando resposta.</p>'}${topics?`<details class="topics94"><summary>Puxar assunto</summary><div class="bpactions">${topics}</div></details>`:''}</div></div>`}
chats90=function(){const d=data94(),all=phoneContacts7().slice().sort((a,b)=>{const A=last94(a),B=last94(b);return (B?.pos??-1)-(A?.pos??-1)||(B?.sub??0)-(A?.sub??0)});const ids=all.filter(id=>filter90!=='unread'||unread90(id));const search=search94.toLocaleLowerCase('pt-BR');const list=ids.map(id=>{const x=last94(id),n=unread90(id),q=pendingList94(id).length;return `<button class="bpcontact contact94" data-act="bp90chat" data-id="${id}" data-search="${esc(name90(id).toLocaleLowerCase('pt-BR'))}" aria-pressed="${chat90===id}" ${search&&!name90(id).toLocaleLowerCase('pt-BR').includes(search)?'hidden':''}>${face90(id)}<span><b>${name90(id)}</b><small>${esc((x?.kind==='out'?'Você: ':'')+(x?.text||''))}</small>${q?`<small class="waiting94">${q} para responder</small>`:''}</span>${n?pill90(String(n)):''}</button>`}).join('');return `<div class="bpinbox inbox94"><div class="bpinboxleft"><h3>Conversas</h3><input id="search94" placeholder="Buscar contato" aria-label="Buscar contato" value="${esc(search94)}"><div class="bpactions filters94">${[['all','Todas'],['unread','Não lidas'],['stars','Favoritas']].map(([k,n])=>button90('bp90filter',n,`data-id="${k}" aria-pressed="${filter90===k}"`)).join('')}</div><div class="contacts94">${filter90==='stars'?d.stars.filter(i=>state.messages[i]).map(i=>{let m=state.messages[i];return `<button class="bpcontact" data-act="bp90chat" data-id="${m.who}"><span><b>${name90(m.who)} ★</b><small>${esc(m.text)}</small></span></button>`}).join('')||'<p class="bpmuted">Nenhuma favorita.</p>':list||'<p class="bpmuted">Nenhuma conversa nesta lista.</p>'}${state.episode>=4?button90('bp90chat','♡ Grupo de Bellmont','data-id="group"'):''}</div></div><div class="bpthread">${chat90==='group'?`<div class="thread94 group94"><div class="history94">${group90()}</div></div>`:chat90&&all.includes(chat90)?thread90(chat90):'<div class="bpempty"><span>✉</span><h3>Suas conversas, em ordem.</h3><p>Escolha um contato. As mensagens e as respostas ficam no mesmo histórico.</p></div>'}</div></div>`}
const replies94base=replies90;
replies90=function(id,m){
  if(m.follow90)return replies94base(id,m);
  const txt=(m.text||'').toLowerCase();
  const pick=(a,b,c)=>[[a[0],a[1],2,2,'Carisma'],[b[0],b[1],1,3,'Empatia'],[c[0],c[1],0,1,'Ousadia']];
  if(txt.includes('chocolate ou sorvete'))return pick(['Chocolate, sem dúvida.','Resposta de quem entende das coisas!'],['Sorvete!','Anotado. Agora fiquei com vontade também.'],['Os dois. Por que escolher?','Finalmente uma decisão inteligente.']);
  if(txt.includes('teatro ou cinema'))return pick(['Teatro, gosto de ver tudo ao vivo.','Então talvez eu tenha uma peça para recomendar.'],['Cinema, adoro boas histórias.','Temos isso em comum.'],['Depende da companhia.','Uma resposta interessante.']);
  if(txt.includes('que tipo de música'))return pick(['Rock alternativo.','Bom gosto. Posso te mostrar umas bandas.'],['Gosto de um pouco de tudo.','Justo. Música boa não tem regra.'],['Me mostra a sua favorita.','Vou pensar numa que vale a pena.']);
  if(txt.includes('planejar tudo ou improvisar'))return pick(['Planejar ajuda bastante.','Finalmente alguém que me entende.'],['Um pouco dos dois.','Talvez eu devesse tentar isso.'],['Improvisar é mais divertido.','Previsivelmente imprevisível.']);
  if(txt.includes('pessoas ou de paisagens'))return pick(['Pessoas, cada rosto conta uma história.','Gosto desse jeito de pensar.'],['Paisagens, adoro a luz natural.','Temos muito a conversar sobre luz.'],['As duas, depende do momento.','Faz sentido.']);
  if(txt.includes('investigar os clubes ou ouvir os alunos'))return pick(['Ouvir os alunos.','Boa escolha. As pessoas sempre têm histórias.'],['Investigar os clubes.','Vamos precisar de um bom caderno.'],['Que tal os dois?','Ambiciosa. Gostei.']);
  if(txt.includes('salva meu número'))return pick(['Salvei! Boa sorte com a matéria.','Obrigada. Vou precisar.'],['Pode me chamar quando quiser.','Vou lembrar disso.'],['Até mais, jornalista.','Até, novata.']);
  if(txt.includes('obrigad')||txt.includes('companhia')||txt.includes('presente'))return pick(['Eu que agradeço!','Foi bom falar com você.'],['Gostei muito de hoje.','Também gostei da nossa conversa.'],['Até mais!','Até a próxima.']);
  if(m.style8||txt.includes('visual')||txt.includes('look'))return pick(['Obrigada! Fico feliz que tenha reparado.','Difícil não reparar.'],['Quis experimentar algo diferente.','Funcionou muito bem.'],['Gostei de mudar um pouco.','É bom variar.']);
  if(id==='mabel')return pick(['Tenho tanta coisa para te contar!','Sabia! Quero todos os detalhes.'],['Vamos conversar com calma depois.','Combinado, amiga.'],['KKKK você não perde uma.','Jamais! É meu talento.']);
  if(['iris','scarlett','cecilia'].includes(id))return pick(['Pode contar comigo.','Obrigada. Vou lembrar disso.'],['Me conta mais quando nos encontrarmos.','Combinado.'],['Vou acompanhar as novidades.','Até depois.']);
  if(id==='raven')return replies94base(id,m);
  return pick(['Gostei de receber sua mensagem.','Também gostei de conversar com você.'],['Me conta mais quando nos encontrarmos.','Combinado.'],['A gente se fala depois.','Até mais.'])
};

const phone94base=phone7;
phone7=function(){
  phone94base();
  if(app90==='messages'){
    const h=document.querySelector('.history94');
    if(h){
      h.scrollTop=h.scrollHeight;
      requestAnimationFrame(()=>{
        if(h.isConnected)h.scrollTop=h.scrollHeight
      })
    }
    
  }
  
};

document.addEventListener('input',e=>{
  if(e.target.id!=='search94')return;search94=e.target.value;let q=search94.toLocaleLowerCase('pt-BR');document.querySelectorAll('.contact94').forEach(b=>b.hidden=!b.dataset.search.includes(q))
});

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||!state||b.disabled)return;const a=b.dataset.act;if(!['select94','next94','skip94'].includes(a))return;e.stopImmediatePropagation();let i=Number(b.dataset.i),m=state.messages[i];if(!m||m.who!==chat90||!canReply94(m,i))return;if(a==='select94')chosen94=i;if(a==='next94'){
    const p=pendingList94(chat90);chosen94=p[(p.findIndex(x=>x.i===i)+1)%p.length]?.i
  }
  if(a==='skip94'){
    data94().archived94.push(i);chosen94=null;persist()
  }
  phone7()
},true);

const cover94base=cover;cover=function(){return cover94base().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.9.4 • Conversas de Bellmont')};

// mensagens-noturnas | v0.14
/* v0.9.5 • BellPhone: depois da meia-noite */
const media95={
  "dante":{
    "voice":"Encrenca... gravei isso depois do ensaio. O dia foi uma bagunça, mas conversar com você foi a parte boa.",
    "caption":"A sala de música depois do ensaio.",
    "loc":"music",
    "nick":"Encrenca",
    "night":"Ainda acordada? O ensaio acabou e o silêncio ficou estranho.",
    "close":"Às vezes componho melhor quando ninguém está esperando nada de mim.",
    "audio":ASSETS14[349],
    "photo":ASSETS14[350]
  },
  "soren":{
    "voice":"Terminei o cronograma. Achei que seria bom ouvir sua opinião amanhã. Obrigado por me fazer lembrar de descansar.",
    "caption":"Uma mesa tranquila na biblioteca.",
    "loc":"library",
    "nick":"Senhorita Caos",
    "night":"Ainda está acordada? Estou tentando não revisar o cronograma pela quarta vez.",
    "close":"É estranho perceber que não preciso resolver tudo sozinho.",
    "audio":ASSETS14[351],
    "photo":ASSETS14[352]
  },
  "theo":{
    "voice":"Ei! Sobrevivi ao treino! Passei só pra desejar uma boa noite. E sim, amanhã eu vou lembrar do chocolate.",
    "caption":"A quadra antes do treino.",
    "loc":"gym",
    "nick":"Estrelinha",
    "night":"Não consigo dormir. Minha cabeça está reprisando o tombo de hoje, socorro.",
    "close":"Às vezes cansa ser a pessoa que sempre faz todo mundo rir.",
    "audio":ASSETS14[353],
    "photo":ASSETS14[354]
  },
  "ezra":{
    "voice":"A luz mudou no fim da tarde. Queria que você tivesse visto. Guardei uma imagem para te mostrar.",
    "caption":"A luz do jardim no fim da tarde.",
    "loc":"garden",
    "nick":"Musa",
    "night":"A janela está aberta. Tem uma luz bonita do outro lado da rua. Você está acordada?",
    "close":"Gosto de quando podemos ficar em silêncio sem precisar preencher o espaço.",
    "audio":ASSETS14[355],
    "photo":ASSETS14[356]
  },
  "valentim":{
    "voice":"Uma pequena pausa antes do próximo ensaio. Sua companhia seria muito bem-vinda. Espero que tenha uma boa noite.",
    "caption":"O colégio antes de o festival começar.",
    "loc":"gate",
    "nick":"Minha incógnita",
    "night":"O ensaio terminou. Sem plateia, finalmente. Ainda posso roubar cinco minutos da sua noite?",
    "close":"Com você, não sinto que preciso ensaiar cada frase.",
    "audio":ASSETS14[357],
    "photo":ASSETS14[358]
  },
  "raven":{
    "voice":"Oi. Fechei o caderno por hoje. Nenhuma entrevista, nenhuma manchete. Só queria saber como você está.",
    "caption":"Um canto tranquilo de Bellmont, longe das manchetes.",
    "loc":"hall",
    "nick":"Minha cúmplice",
    "night":"Ainda acordada? Estou escrevendo uma coisa que não pretendo mostrar ao jornal.",
    "close":"É mais fácil escrever sobre os outros do que admitir o que eu sinto.",
    "audio":ASSETS14[359],
    "photo":ASSETS14[360]
  }
  
};

const typingMap95=new Map();
function typing95(id,i){
  const owner=state;
  const entry={
    i,
    owner
  };
  typingMap95.set(id,entry);
  setTimeout(()=>{
    if(typingMap95.get(id)!==entry)return;typingMap95.delete(id);if(state===owner&&modalType==='phone'&&app90==='messages'&&chat90===id&&document.querySelector('.thread94'))phone7()
  },850+(id==='soren'?450:0));
  
}

function isTyping95(id,i){let x=typingMap95.get(id);return !!x&&x.owner===state&&(i===undefined||x.i===i)}
function dots95(label){return `<div class="typing95" role="status"><span>${esc(label)} ${label.includes(' e ')?'estão digitando':'está digitando'}</span><i></i><i></i><i></i></div>`}
function intimacy95(id){
  if(!media95[id])return 0;
  let t=state.trust[id]||0,
  a=state.aff[id]||0,
  r=state.attraction[id]||0;
  return t>=25&&r>=18?3:t>=14&&a>=15?2:t>=8?1:0
}

function topicAnswer95(id,t){let n=intimacy95(id);if(n>=3)return `${media95[id].nick}, ${t.charAt(0).toLowerCase()+t.slice(1)}`;if(n===2)return t+' Gosto de falar com você.';return t}
const oldSeed95=seed90;
seed90=function(){
  let changed=oldSeed95();
  for(const id of romance93()){
    if(!media95[id]||!known90(id))continue;
    let a=media95[id],
    n=intimacy95(id);
    if(state.episode>=2&&n>=1){
      changed=push90('voice95:'+id,id,'Mensagem de voz',{
        media95:'voice',text:a.voice
      })||changed;
      
    }
    if(state.episode>=2&&n>=1)changed=push90('photo95:'+id,id,a.caption,{
      media95:'photo'
    })||changed;
    if(state.episode>=3&&n>=2)changed=push90('night95:'+id,id,a.night,{
      night95:true,clock95:'23:18'
    })||changed;
    if(state.episode>=4&&n>=3)changed=push90('close95:'+id,id,topicAnswer95(id,a.close),{
      night95:true,clock95:'23:42'
    })||changed;
    
  }
  return changed
};

const oldReplies95=replies90;
replies90=function(id,m){
  const a=media95[id];
  if(!a)return oldReplies95(id,m);
  if(m.night95)return [['Estou acordada. Pode me contar o que está pensando.',a.close,2,4,'Empatia'],['Gosto quando você me procura assim.',topicAnswer95(id,'Também gosto. A noite fica menos silenciosa.'),3,2,'Carisma',3],['Está tarde, vamos descansar e conversar amanhã?','Tem razão. Boa noite, durma bem.',0,2,'Empatia']];
  if(m.media95==='voice')return [['Adorei ouvir sua voz.','Então talvez eu mande outro áudio algum dia.',3,2,'Carisma',2],['Obrigada por dividir um pouco do seu dia.','Foi bom poder contar.',1,3,'Empatia'],['Até amanhã!','Até amanhã.',0,1,'Carisma']];
  if(m.media95==='photo')return [['Que lugar lindo!','Também achei. Fico feliz que tenha gostado.',1,2,'Criatividade'],['Vamos lá juntos algum dia?','Gostaria disso. Podemos combinar.',3,2,'Carisma',2],['Obrigada pela foto.','De nada!',0,1,'Empatia']];
  return oldReplies95(id,m).map(o=>{
    let x=[...o];if(intimacy95(id)>=3&&x[2]>=2)x[1]=topicAnswer95(id,x[1]);return x
  })
};

const oldEvents95=events94;events94=function(id){return oldEvents95(id).filter(e=>e.kind!=='answer'||!isTyping95(id,e.i))};
const oldBubble95=bubble94;bubble94=function(e){let h=oldBubble95(e),m=e.m;if(!m)return h;let a=media95[m.who];if(!a)return h;let extra='';if(m.night95)extra+='<div class="night95">☾ '+esc(m.clock95||'23:18')+' · Conversa noturna</div>';if(m.media95==='voice')extra+=`<div class="media95"><b>♫ Áudio de ${name90(m.who)}</b><audio controls preload="none" src="${mediaURL14(a.audio,'audio/mpeg')}"></audio><details><summary>Transcrição</summary><p>${esc(a.voice)}</p></details><small>Voz sintetizada</small></div>`;if(m.media95==='photo')extra+=`<div class="media95"><button class="photo95" data-act="photo95" data-id="${m.who}" aria-label="Ampliar fotografia"><img loading="lazy" src="${mediaURL14(a.photo,'image/webp')}" alt="${esc(a.caption)}"></button><small>Toque para ampliar</small></div>`;if(m.media95==='voice')h=h.replace(esc(e.text||''),'Mensagem de voz');return extra?h.replace('</div>',extra+'</div>'):h};
const oldThread95=thread90;thread90=function(id){let h=oldThread95(id),n=intimacy95(id);if(media95[id])h=h.replace('<span class="pending94">',`<span class="intimacy95">${['Conhecendo','À vontade','Cumplicidade','Carinho especial'][n]}</span><span class="pending94">`);if(isTyping95(id))h=h.replace('<div class="composer94">',dots95(name90(id))+'<div class="composer94 busy95" inert>');return h};
const groupExtra95=[
{
  who:'theo',
  lines:[['theo','Gente, quem pegou o último chocolate da cantina?'],['dante','É uma investigação policial agora?'],['raven','Posso abrir uma matéria. Crime contra a sobremesa.']],
  opts:['Eu apoio a investigação.','Dividimos outro chocolate.','Vocês são impossíveis.'],
  answers:[[['raven','Finalmente alguém leva o jornal a sério.'],['theo','Recrutada!']], [['theo','Você é a melhor!'],['dante','Pronto, caso encerrado.']], [['dante','E você ainda está aqui.'],['raven','Isso diz muito sobre nós.']]]
},
{
  who:'soren',
  lines:[['soren','O cronograma do festival está pronto. Por favor, não inventem mais atividades.'],['valentim','Uma dança improvisada não conta como atividade.'],['mabel','EU APOIO.'],['ezra','Eu posso fotografar.']],
  opts:['Uma dança seria linda.','Vamos respeitar o cronograma.','Que tal uma pausa para fotos?'],
  answers:[[['valentim','Enfim, alguém com visão artística.'],['soren','Cinco minutos. Não mais.']], [['soren','Agradeço a sensatez.'],['mabel','Vocês não têm espírito de caos.']], [['ezra','Gostei. A luz está boa agora.'],['soren','Uma pausa é aceitável.']]]
},
{who:'raven',lines:[['raven','Pergunta para a edição do festival: qual foi a melhor parte de Bellmont até agora?'],['iris','Os mistérios, obviamente.'],['scarlett','As pessoas que realmente ajudaram.']],opts:['As amizades que fiz.','Os momentos inesperados.','Ainda estou descobrindo.'],answers:[[['mabel','Vou guardar isso!'],['raven','Boa resposta. Sem ironia.']], [['theo','Os melhores momentos não têm roteiro.'],['raven','Essa vai para meu caderno.']], [['raven','Então nossa história ainda está em andamento.'],['ezra','Como deve ser.']]]}];
function groupData95(){const d=data94();if(!Array.isArray(d.group95))d.group95=[];return d.group95}
group90=function(){if(state.episode<4)return '<h3>Grupo de Bellmont</h3><p>O grupo será criado no episódio 04.</p>';const d=data94(),g=groupData95();let h='<h3>Grupo de Bellmont</h3><p class="bpmuted">Mabel, Íris, Scarlett, Dante, Soren, Theo, Ezra, Valentim e Raven</p>'+state.phone7.group.map(x=>bubble90(x.text,true)+bubble90(x.who+': '+x.answer)).join('');for(let i=0;i<=d.group.length&&i<groupRounds90.length;i++){let r=groupRounds90[i];h+=bubble90(name90(r.who)+': '+r.text);if(d.group[i]!==undefined){h+=bubble90(r.opts[d.group[i]],true);if(isTyping95('group',i))return h+dots95(name90(r.who));h+=bubble90(name90(r.who)+': '+r.answers[d.group[i]])}else return h+'<div class="bpchoices">'+r.opts.map((x,j)=>button90('bp90group',esc(x),`data-i="${j}"`)).join('')+'</div>'}h+='<div class="day94">Grupo · Festival</div>';for(let i=0;i<=g.length&&i<groupExtra95.length;i++){let r=groupExtra95[i];h+=r.lines.map(([who,t])=>bubble90(name90(who)+': '+t)).join('');if(g[i]!==undefined){h+=bubble90(r.opts[g[i]],true);if(isTyping95('group',100+i))return h+dots95(r.answers[g[i]].map(([who])=>name90(who)).join(' e '));h+=r.answers[g[i]].map(([who,t])=>bubble90(name90(who)+': '+t)).join('')}else h+='<div class="bpchoices">'+r.opts.map((t,j)=>button90('group95',esc(t),`data-i="${j}"`)).join('')+'</div>'}return h};
document.addEventListener('click',e=>{let b=e.target.closest('[data-act]');if(!b||b.disabled||!state)return;let a=b.dataset.act;if(a==='photo95'){e.stopImmediatePropagation();let p=media95[b.dataset.id];if(p)showPanel('Foto recebida',`<div class="photoLarge95"><img src="${mediaURL14(p.photo,'image/webp')}" alt="${esc(p.caption)}"><p>${esc(p.caption)}</p>${button90('bp90app','Voltar à conversa','data-id="messages"')}</div>`);return}if(a==='group95'){e.stopImmediatePropagation();let g=groupData95(),i=Number(b.dataset.i);if(chat90!=='group'||state.episode<4||data94().group.length<groupRounds90.length||g.length>=groupExtra95.length||![0,1,2].includes(i))return;g.push(i);typing95('group',100+g.length-1);persist();phone7();}},true);
const cover95base=cover;cover=function(){return cover95base().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.9.5 • Depois da meia-noite')};

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

function normalizeCity(s) {
    cityData10(s);
}
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
function renderCityNavigation() {
    if(!state||screen!=='game')return;const nav=document.querySelector('.nav');if(nav&&!nav.querySelector('[data-act="city10"]'))nav.insertAdjacentHTML('afterbegin','<button data-act="city10">⌖ Cidade</button>')
}
const cover10=cover;cover=function(){return cover10().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.10 • Além dos Portões')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||!state||b.disabled)return;const a=b.dataset.act,id=b.dataset.id;if(!['city10','time10','visit10','date10','group10','next10','choice10','cg10','viewcg10','ravenMood10'].includes(a))return;e.stopImmediatePropagation();switch(a){case'city10':scene10=null;cityPanel10();break;case'time10':if(['Tarde','Noite'].includes(id)){cityData10().time=id;persist();cityPanel10()}break;case'visit10':scene10=null;visit10(id);break;case'date10':startScene10('date',id);break;case'group10':startScene10('group',id);break;case'next10':if(scene10){scene10.step++;drawScene10()}break;case'choice10':finish10(Number(b.dataset.i));break;case'cg10':gallery10();break;case'viewcg10':if(cityData10().cg.includes(id)&&cgInfo10[id])showPanel(cgInfo10[id][0],`<div class="city10"><div class="cgzoom10">${img10('cg',id)}</div><button class="soft" data-act="cg10">‹ Voltar à galeria</button></div>`);break;case'ravenMood10':if(['neutral','smile','annoyed','shy','surprise','sad'].includes(id))showProfile('raven',id);break}},true);

// quarto-e-decoracao | v0.14
/* v0.11 — Refúgio de Bellmont */
const roomArt11=ASSETS14[378];
Object.assign(art10.cg,{"soren": ASSETS14[379], "theo": ASSETS14[380], "ezra": ASSETS14[381], "valentim": ASSETS14[382]});
Object.assign(cgInfo10,{
  soren:['Fora do roteiro','Soren · Livraria'],theo:['Um dia sem placar','Theo · Parque'],ezra:['O que a luz guarda','Ezra · Galeria'],valentim:['Sem plateia','Valentim · Teatro']
});

const roomDecor11={
  lights:['Luzes de fada','Iluminação acolhedora',1],
  flowers:['Flores de Bellmont','Um pequeno detalhe romântico',2],
  frame:['Porta-retrato','Exibe uma CG desbloqueada',2],
  books:['Coleção de lembranças','Exibe os objetos conquistados',3]
};

function roomData11(s=state){
  let r=s.room11;
  if(!r||typeof r!=='object'||Array.isArray(r))r=s.room11={
    
  };
  r.day=Math.max(s.episode||1,Number.isSafeInteger(r.day)?r.day:1);
  if(!['morning','night'].includes(r.time))r.time='night';
  if(!Array.isArray(r.decor))r.decor=['lights'];
  if(!Array.isArray(r.entries))r.entries=[];
  if(typeof r.rain!=='boolean')r.rain=true;
  if(typeof r.cinema!=='boolean')r.cinema=true;
  if(typeof r.typing!=='boolean')r.typing=true;
  return r
}

function recoverCG11(s){
  const d=cityData10(s);
  for(const [id,c] of Object.entries(city10)){
    if(!c.who||!art10.cg[c.who]||!d.done.includes('date:'+id)||d.cg.includes(c.who))continue;
    if((s.log||[]).some(x=>x.who===c.who&&x.choice===dates10[id].opts[0][0]))d.cg.push(c.who)
  }
  
}

function normalizeRoom(s) {
    roomData11(s);recoverCG11(s);
}
// Reuse decoded city/room media instead of inserting repeated megabytes into HTML.
function asset11(key,data){return mediaURL14(data)}
img10=function(type,id,cl=''){let d=art10[type]?.[id];return d?`<img class="${cl}" src="${asset11(type+':'+id,d)}" alt="${esc(type==='city'?city10[id]?.kind||'Bellmont':'Ilustração de Bellmont')}" loading="${cl==='stagebg10'||cl==='cgfull10'?'eager':'lazy'}" decoding="async">`:''};
const bg11base=bg;bg=function(id){if(id!=='bedroom')return bg11base(id);return `<svg class="bg anime-bg" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="${asset11('room',roomArt11)}" width="960" height="540" preserveAspectRatio="xMidYMid slice"/></svg>`};
function roomButton11(action,label,icon,x,y){return `<button class="roomHot11" style="--x:${x}%;--y:${y}%" data-act="${action}"><span aria-hidden="true">${icon}</span>${label}</button>`}
function roomPanel11(){if(!state)return;const r=roomData11(),d=cityData10(),isNight=r.time==='night',frame=r.decor.includes('frame')&&d.cg.length?d.cg.at(-1):null;modalType='room11';showPanel('Meu refúgio • Bellmont',`<div class="room11 ${isNight?'night11':'morning11'} ${r.cinema?'motion11':''}"><div class="roomHeader11"><div><small>DEPOIS DO SINAL / MEU QUARTO</small><h3>Um lugar só meu.</h3></div><div class="roomDay11">Dia ${r.day} · ${isNight?'☾ Noite':'☀ Manhã'}<small>Episódio ${String(state.episode).padStart(2,'0')}</small></div></div><div class="roomStage11 ${r.decor.includes('lights')?'lights11':''}"><img src="${asset11('room',roomArt11)}" alt="Quarto da protagonista com escrivaninha, cama, estante e armário" decoding="async">${r.rain&&r.cinema?'<div class="rain11" aria-hidden="true"></div>':''}${r.decor.includes('flowers')?'<div class="flower11" aria-label="Flores decorativas">✿</div>':''}${frame?`<div class="roomFrame11">${img10('cg',frame)}</div>`:''}${r.decor.includes('books')?'<div class="bookStack11" aria-label="Coleção de lembranças"><i></i><i></i><i></i></div>':''}${roomButton11('roomDiary11','Diário','✎',17,66)}${roomButton11('roomPhone11','BellPhone','▣',34,50)}${roomButton11('roomGallery11','Lembranças','♡',65,22)}${roomButton11('roomRest11',isNight?'Dormir':'Anoitecer','☾',61,63)}${roomButton11('roomWard11','Armário','♙',91,47)}${roomButton11('roomDecor11','Decorar','✦',82,72)}</div><div class="roomActions11"><button class="soft" data-act="roomDiary11">Diário</button><button class="soft" data-act="roomPhone11">Celular</button><button class="soft" data-act="roomWard11">Armário</button><button class="soft" data-act="roomGallery11">Fotos e CGs</button><button class="soft" data-act="roomItems11">Presentes</button><button class="soft" data-act="roomDecor11">Decoração</button><button class="primary" data-act="roomRest11">${isNight?'Dormir e começar outro dia':'Encerrar a tarde'}</button></div><div class="roomGrid11"><section><h4>Uma página antes de dormir</h4><textarea id="roomNote11" maxlength="700" placeholder="O que ficou de hoje?">${esc(r.entries.find(x=>x.day===r.day)?.text||'')}</textarea><button class="soft" data-act="roomNoteSave11">Guardar no diário do quarto</button>${r.entries.length?`<details><summary>Páginas anteriores (${r.entries.length})</summary>${r.entries.slice().reverse().map(x=>`<p><b>Dia ${x.day}</b> — ${esc(x.text)}</p>`).join('')}</details>`:''}</section><section><h4>Atmosfera</h4><div class="roomToggles11">${[['rain','Chuva na janela'],['cinema','Efeitos cinematográficos'],['typing','Texto gradual']].map(([k,n])=>`<button class="soft" data-act="roomToggle11" data-id="${k}" aria-pressed="${r[k]}">${n} · ${r[k]?'Ligado':'Desligado'}</button>`).join('')}<button class="soft" data-act="roomSound11">♫ Trilha ambiente</button></div><p>Descansar muda o dia livre e o horário da cidade; não pula cenas da história.</p><button class="soft" data-act="city10">Explorar cidade</button><button class="soft" data-act="close">Voltar à história</button></section></div></div>`);document.querySelector('#modal .panel')?.classList.add('roomPanel11')}
function roomDecorPanel11(){const r=roomData11();modalType='room11';showPanel('Decoração do quarto',`<div class="room11"><p>Desbloqueie decoração avançando na história. Não há gasto de BellCoins.</p><div class="roomDecorGrid11">${Object.entries(roomDecor11).map(([id,[n,desc,ep]])=>`<article><b>${n}</b><p>${desc}</p><button class="soft" data-act="roomEquip11" data-id="${id}" aria-pressed="${r.decor.includes(id)}" ${state.episode<ep?'disabled':''}>${state.episode<ep?'Episódio '+ep:r.decor.includes(id)?'Retirar':'Equipar'}</button></article>`).join('')}</div><button class="primary" data-act="room11">Voltar ao quarto</button></div>`)}
function roomItemsPanel11(){modalType='room11';showPanel('Caixa de lembranças',`<div class="room11"><h3>Pequenos pedaços de Bellmont</h3>${state.items.length?`<div class="roomDecorGrid11">${state.items.map(x=>`<article>✦ ${esc(x)}</article>`).join('')}</div>`:'<p>Os presentes e objetos da história serão guardados aqui.</p>'}<button class="primary" data-act="room11">Voltar ao quarto</button></div>`)}
function roomRest11(){
  const r=roomData11();
  if(r.time==='morning'){
    r.time='night';
    cityData10().time='Noite';
    persist();
    roomPanel11();
    return
  }
  const old=r.day;
  r.day++;
  r.time='morning';
  cityData10().time='Tarde';
  persist();
  roomPanel11();
  toast('Dia '+r.day+' • Um novo começo.');
  
}

const gallery11base=gallery10;gallery10=function(){recoverCG11(state);gallery11base();const p=document.querySelector('#modal .city10>p');if(p)p.textContent='Coleção com seis momentos românticos e uma lembrança coletiva. As quatro novas artes são recortes de ilustrações conceituais e têm resolução reduzida.';document.querySelector('#modal .city10')?.insertAdjacentHTML('beforeend','<button class="soft" data-act="room11">Voltar ao quarto</button>')};
const modal11base=modal;modal=function(t){if(t==='room11')return roomPanel11();modal11base(t);if(t==='gallery'&&state){const p=document.querySelector('#modal .panel');const b=[...p?.querySelectorAll('.event9 b')||[]].find(x=>x.textContent.startsWith('Momentos da cidade'));if(b)b.textContent='Momentos da cidade · '+cityData10().cg.length+'/7 ilustrações'}};

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

const people12 = ['dante', 'soren', 'theo', 'ezra', 'valentim', 'raven'];
const phases12 = ['Manhã', 'Tarde', 'Noite'];
const epoch12 = Date.UTC(2026, 2, 20);
const dayMs12 = 86400000;

const schedule12 = {
    dante: ['Colégio · sala de aula', 'records', 'Ensaio em casa'],
    soren: ['Conselho estudantil', 'books', 'Estudando em casa'],
    theo: ['Colégio · quadra', 'park', 'Treino e descanso'],
    ezra: ['Biblioteca', 'art', 'Editando fotografias'],
    valentim: ['Colégio · auditório', 'Ensaio teatral', 'theatre'],
    raven: ['Jornal escolar', 'cafe', 'Escrevendo em casa']
};

const away12 = {
    dante: ['Clube de música', 'Ensaio fechado', 'Descanso'],
    soren: ['Reunião do conselho', 'Compromisso familiar', 'Estudando em casa'],
    theo: ['Treino', 'Treino do time', 'Descanso'],
    ezra: ['Arquivo de fotografia', 'Projeto fotográfico', 'Editando fotografias'],
    valentim: ['Ensaio', 'Compromisso de teatro', 'Ensaio fechado'],
    raven: ['Redação', 'Entrevista externa', 'Escrevendo em casa']
};

const weekdays12 = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const datesFmt12 = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
});

function world12(save = state) {
    let world = save.world12;
    if (!world || typeof world !== 'object' || Array.isArray(world)) {
        world = save.world12 = {};
    }

    const room = roomData11(save);
    if (!phases12.includes(world.phase)) {
        if (cityData10(save).time === 'Noite') world.phase = 'Noite';
        else world.phase = room.time === 'morning' ? 'Manhã' : 'Tarde';
    }

    if (!world.mem || typeof world.mem !== 'object') world.mem = {};
    for (const key of ['routineDone', 'weatherDone', 'sentDays']) {
        if (!Array.isArray(world[key])) world[key] = [];
    }
    if (typeof world.low !== 'boolean') world.low = false;

    return world;
}

function normalizeCalendar(save) {
    world12(save);
}

function date12(day = roomData11().day) {
    return new Date(epoch12 + (day - 1) * dayMs12);
}

function season12(day = roomData11().day) {
    const month = date12(day).getUTCMonth();
    if (month >= 2 && month <= 4) return 'Primavera';
    if (month >= 5 && month <= 7) return 'Verão';
    if (month >= 8 && month <= 10) return 'Outono';
    return 'Inverno';
}

function weather12(day = roomData11().day) {
    const season = season12(day);
    const pattern = (day * 17 + Math.floor(day / 7) * 11) % 10;

    switch (season) {
        case 'Inverno':
            if (pattern < 4) return 'Neve';
            return pattern < 7 ? 'Nublado' : 'Céu limpo';
        case 'Outono':
            if (pattern < 4) return 'Chuva';
            return pattern < 8 ? 'Nublado' : 'Céu limpo';
        case 'Verão':
            if (pattern < 2) return 'Chuva';
            return pattern < 4 ? 'Nublado' : 'Céu limpo';
        default:
            if (pattern < 4) return 'Chuva';
            return pattern < 6 ? 'Nublado' : 'Céu limpo';
    }
}

function when12(id, day = roomData11().day, phase = world12().phase) {
    const phaseIndex = phases12.indexOf(phase);
    const characterIndex = people12.indexOf(id);
    const hasOtherPlans = (day + characterIndex * 2) % 7 === 0;
    const schedule = hasOtherPlans ? away12[id] : schedule12[id];
    return schedule[phaseIndex];
}

function place12(location) {
    return city10[location]?.name || location;
}

function status12(day = roomData11().day) {
    const date = date12(day);
    const weekday = weekdays12[date.getUTCDay()];
    return `${weekday}, ${datesFmt12.format(date)} · ${season12(day)} · ${weather12(day)}`;
}

function setPhase12(phase) {
    if (!phases12.includes(phase)) return;
    world12().phase = phase;
    cityData10().time = phase === 'Noite' ? 'Noite' : 'Tarde';
    roomData11().time = phase === 'Noite' ? 'night' : 'morning';
    persist();
}

function nextDay12() {
    roomData11().day++;
    setPhase12('Manhã');
    render();
    toast('Novo dia em Bellmont.');
}

roomRest11 = function () {
    if (world12().phase === 'Noite') {
        nextDay12();
    } else {
        setPhase12('Noite');
    }
    roomPanel11();
};

const oldDate12 = canDate10;
canDate10 = function (id) {
    const location = city10[id];
    return !!(
        location?.who &&
        world12().phase === location.time &&
        when12(location.who) === id &&
        oldDate12(id)
    );
};

const oldGroup12 = canGroup10;
canGroup10 = function (id) {
    const location = city10[groups10[id]?.loc];
    return world12().phase === location?.time && oldGroup12(id);
};

// memoria-emocional | v0.14
const personality12={
  dante:['Irônico e reservado','Mais espontâneo','Baixa a guarda com você'],
  soren:['Formal e metódico','Mais paciente','Admite quando precisa de ajuda'],
  theo:['Brincalhão','Atento ao seu humor','Consegue mostrar seu lado vulnerável'],
  ezra:['Observador e silencioso','Compartilha pequenas descobertas','Fala com mais abertura'],
  valentim:['Cortês e teatral','Menos ensaiado','Permite-se ser sincero'],
  raven:['Investigativa e provocadora','Compartilha suas ideias','Deixa a ironia de lado']
};

const routineTalk12={
  dante:['Tô escolhendo um disco. O problema de gostar de música é que sempre aparece outro.','Quer ouvir uma faixa comigo?','Boa. Essa vai entrar na nossa lista.'],
  soren:['Não coloquei esta pausa no cronograma. Talvez seja uma evolução.','Quer escolher um livro juntos?','Gostei da escolha. Vou lembrar.'],
  theo:['Hoje eu prometi a mim mesmo que não transformaria tudo em competição.','Quer dar uma volta sem pressa?','É bom fazer algo só por fazer.'],
  ezra:['A luz daqui está diferente hoje.','Quer me ajudar a escolher um enquadramento?','Você percebe coisas que eu não percebo.'],
  valentim:['Finalmente um intervalo sem ensaio.','Quer conversar um pouco, sem roteiro?','Foi uma companhia muito agradável.'],
  raven:['Hoje não estou entrevistando ninguém. Prometo.','Quer dividir uma mesa e conversar?','Gosto desses momentos sem manchetes.']
};

const memoryAsk12={
  dante:'Pergunta aleatória: que tipo de dia você mais gosta?',
  soren:'Uma curiosidade fora do cronograma: qual clima você prefere?',
  theo:'Pesquisa importantíssima: dia de sol, chuva ou frio?',
  ezra:'Qual luz você prefere ver pela janela?',
  valentim:'Se pudesse escolher o cenário de um passeio, que clima teria?',
  raven:'Pergunta sem valor jornalístico: qual clima te deixa mais à vontade?'
};

const memoryRecall12={
  dante:'Você falou que gosta de',
  soren:'Lembrei que você prefere',
  theo:'Ei! Eu lembrei que você gosta de',
  ezra:'Fiquei pensando no que me contou sobre',
  valentim:'Guardei uma pequena informação: você gosta de',
  raven:'Uma informação que guardei, sem escrever no jornal: você gosta de'
};

function mem12(id,s=state){let w=world12(s);if(!w.mem[id]||typeof w.mem[id]!=='object')w.mem[id]={};return w.mem[id]}
function syncMemory12(){if(!state)return;const day=roomData11().day;for(let id of people12){let m=mem12(id);let log=(state.log||[]).filter(x=>x.who===id);let last=log.at(-1);if(last&&typeof last.choice==='string'&&(m.lastChoice!==last.choice||m.choiceCount!==log.length)){m.lastChoice=last.choice;m.choiceDay=day;m.choiceCount=log.length;m.lastEffect=Number(last.aff)||0}if(!last&&m.lastChoice)delete m.lastChoice;}
 for(const [i,m] of state.messages.entries()){
  if(!m.memory12||!state.replied[i])continue;
  const r=state.replied[i];
  const val={
    'Gosto de dias chuvosos.':'chuva',
    'Prefiro dias de sol.':'sol',
    'Adoro dias frios.':'frio',
    'Não tenho uma preferência.':'nenhuma'
  }
  [r.text];
  if(m.memory12==='ask'&&val&&!mem12(m.who).preference){
    Object.assign(mem12(m.who),{
      preference:val,prefDay:day
    })
  }
  if(m.memory12==='recall'&&r.text==='Prefiro conversar em outro momento.'&&mem12(m.who).lastSpaceReply!==i){
    mem12(m.who).spaceUntil=day+2;
    mem12(m.who).lastSpaceReply=i;
    
  }
  
}

}
function emotional12(id){
  let m=mem12(id),
  t=state.trust[id]||0,
  a=state.aff[id]||0;
  return m.spaceUntil>=roomData11().day?'Respeitando seu espaço':a<0?'Mais distante':personality12[id][t>=25?2:t>=10?1:0]
}


const oldSeed12=seed90;seed90=function(){let changed=oldSeed12();syncMemory12();let w=world12(),day=roomData11().day;if(w.sentDays.includes(day))return changed;let ids=people12.filter(id=>profileKnown(id)&&(state.trust[id]||0)>=5).sort((a,b)=>(mem12(a).lastSent||0)-(mem12(b).lastSent||0)||(state.trust[b]||0)-(state.trust[a]||0));ids.sort((a,b)=>Number(!!(mem12(b).preference&&!mem12(b).recalled&&day>mem12(b).prefDay))-Number(!!(mem12(a).preference&&!mem12(a).recalled&&day>mem12(a).prefDay)));for(const id of ids){let m=mem12(id);if(m.spaceUntil>=day)continue;let text='',flag='',kind='';if(m.preference&&m.preference!=='nenhuma'&&day>m.prefDay&&!m.recalled){const match={chuva:weather12()==='Chuva',sol:weather12()==='Céu limpo',frio:season12()==='Inverno'}[m.preference];if(match||day>=m.prefDay+3){text=memoryRecall12[id]+' '+m.preference+'. '+(match?'O dia de hoje me fez lembrar de você.':'Queria saber como está seu dia.');flag='mem12:recall:'+id;kind='recall';}}
 if(!text&&!m.preference&&!state.flags['mem12:ask:'+id]){text=memoryAsk12[id];flag='mem12:ask:'+id;kind='ask'}
 if(!text&&m.lastChoice&&day>m.choiceDay&&m.choiceCount!==m.recalledChoice){
  text=(m.lastEffect<0?'Fiquei pensando na nossa conversa. Acho que podemos tentar nos entender melhor.':'Lembrei de uma coisa que você me disse: “'+m.lastChoice+'”. Foi um momento que ficou comigo.');
  flag='mem12:choice:'+id+':'+m.choiceCount;
  kind='recall';
  
}

 if(text&&push90(flag,id,text,{memory12:kind,day94:day,day90:day})){if(flag.includes(':recall:'))m.recalled=true;if(flag.includes(':choice:'))m.recalledChoice=m.choiceCount;m.lastSent=day;w.sentDays.push(day);return true}}
 return changed};
const oldReplies12=replies90;
replies90=function(id,m){
  if(m.memory12==='ask')return [['Gosto de dias chuvosos.','Vou lembrar disso.',1,2,'Empatia'],['Prefiro dias de sol.','Está anotado na memória.',1,2,'Carisma'],['Adoro dias frios.','Interessante. Vou guardar esse detalhe.',1,2,'Criatividade'],['Não tenho uma preferência.','Justo. Cada dia tem seu charme.',0,1,'Carisma']];
  if(m.memory12==='recall')return [['Você realmente se lembrou!','Presto atenção no que você diz.',2,3,'Empatia'],['Também gostei de conversar com você.','Foi bom dividir aquele momento.',1,2,'Carisma'],['Prefiro conversar em outro momento.','Claro. Respeito seu tempo.',0,0,'Empatia']];
  return oldReplies12(id,m)
};

const oldPush12=push90;push90=function(flag,who,text,extra={}){return oldPush12(flag,who,text,{...extra,day94:roomData11().day})};
const oldThread12=thread90;thread90=function(id){let html=oldThread12(id);if(people12.includes(id))html=html.replace('</small></div><span class="intimacy95">',`<br>${esc(emotional12(id))}</small></div><span class="intimacy95">`);return html};

// agenda-e-encontros-cotidianos | v0.14
let monthOffset12=0,selectedDay12=null;
function calendar12(){modalType='world12';let day=roomData11().day,d=date12(),month=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+monthOffset12,1)),n=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth()+1,0)).getUTCDate(),first=month.getUTCDay(),pick=selectedDay12??day;const grid=weekdays12.map(x=>`<span>${x}</span>`).join('')+Array.from({length:first},()=>'<span></span>').join('')+Array.from({length:n},(_,i)=>{let j=Math.round((Date.UTC(month.getUTCFullYear(),month.getUTCMonth(),i+1)-epoch12)/dayMs12)+1;return `<button class="soft day12 ${j===day?'today12':''}" data-act="calpick12" data-i="${j}" ${j<1?'disabled':''} aria-pressed="${j===pick}">${i+1}</button>`}).join('');showPanel('Agenda de Bellmont',`<div class="world12"><div class="worldhero12"><small>CALENDÁRIO / VIDA LIVRE</small><h3>${esc(status12(day))}</h3><p>Dia ${day} · ${world12().phase}. O tempo livre não pula episódios nem altera escolhas.</p>${phaseButtons12()}<button class="primary" data-act="advance12">Avançar horário ›</button></div><div class="calLayout12"><section><div class="calTitle12"><button class="soft" data-act="month12" data-i="-1">‹</button><b>${new Intl.DateTimeFormat('pt-BR',{month:'long',year:'numeric',timeZone:'UTC'}).format(month)}</b><button class="soft" data-act="month12" data-i="1">›</button></div><div class="calGrid12">${grid}</div><p class="hint">Selecione uma data para consultar a programação, sem viajar no tempo.</p></section><section><h3>${esc(status12(pick))}</h3>${routineRows12(pick)}</section></div><button class="primary" data-act="living16">Vida em Bellmont</button> <button class="soft" data-act="city10">Explorar cidade</button> <button class="soft" data-act="room11">Meu quarto</button></div>`);document.querySelector('#modal .panel')?.classList.add('worldPanel12')}
function phaseButtons12(){return `<div class="phase12">${phases12.map(p=>`<button class="soft" data-act="phase12" data-id="${p}" aria-pressed="${world12().phase===p}">${p}</button>`).join('')}</div>`}
function routineRows12(day=roomData11().day){return `<div class="routine12">${people12.map(id=>`<article><div class="routineFace12">${sprite(id)}</div><div><b>${name90(id)}</b><small>${phases12.map(p=>`${p}: ${place12(when12(id,day,p))}`).join(' · ')}</small>${day===roomData11().day&&profileKnown(id)?`<small>${emotional12(id)}</small>`:''}</div></article>`).join('')}</div>`}
const cityBase12=cityPanel10;cityPanel10=function(){cityBase12();let p=document.querySelector('#modal .city10'),time=p?.querySelector('.citytime10');if(!p||!time)return;time.innerHTML=`<span>Dia ${roomData11().day} · ${esc(status12())}</span>${phaseButtons12()}<button class="soft" data-act="advance12">Avançar horário ›</button><button class="soft" data-act="calendar12">Agenda</button>`;p.querySelectorAll('.citycard10').forEach(b=>{let id=b.dataset.id,c=city10[id];if(!c?.who||state.episode<c.day)return;let span=b.querySelector('div>span');if(span)span.textContent=cityData10().done.includes('date:'+id)?'♡ Encontro concluído':when12(c.who)===id?name90(c.who)+' · '+(profileKnown(c.who)?'Por aqui':'Ainda não conhece'):'Agora: '+place12(when12(c.who));});p.insertAdjacentHTML('beforeend',`<details class="routineDetails12"><summary>Rotina dos personagens hoje</summary>${routineRows12()}</details>`)};
const visitBase12=visit10;visit10=function(k){visitBase12(k);let c=city10[k];if(!c?.who)return;let p=document.querySelector('#modal .city10');if(!p)return;const id=c.who,here=when12(id)===k,done=world12().routineDone.includes(roomData11().day+':'+id);p.insertAdjacentHTML('beforeend',`<article class="routineExtra12"><b>${here?name90(id)+' está por aqui':name90(id)+' está em outro lugar'}</b><p>${here?'Uma pausa na rotina, independente dos encontros principais.':'Agora: '+esc(place12(when12(id)))+'. Consulte a agenda para saber quando encontrar.'}</p>${here&&profileKnown(id)?`<button class="soft" data-act="routine12" data-id="${k}" ${done?'disabled':''}>${done?'Já conversaram hoje':'Conversar um pouco'}</button>`:''}<button class="soft" data-act="calendar12">Consultar agenda</button></article>`)};
let activeRoutine12=null;
function routinePanel12(k){const id=city10[k]?.who,key=roomData11().day+':'+id;if(!id||!profileKnown(id)||when12(id)!==k||world12().routineDone.includes(key))return;activeRoutine12=k;modalType='routine12';let t=routineTalk12[id];let climateLine=weather12()==='Chuva'?' A chuva mudou os planos; podemos ficar em um lugar coberto.':weather12()==='Neve'?' Está nevando. Melhor procurar um canto quente.':season12()==='Outono'?' As folhas estão mudando de cor.':weather12()==='Céu limpo'?' O dia está bonito hoje.':'';showPanel('Um momento inesperado',`<div class="world12"><div class="stage10 climate12">${img10('city',k,'stagebg10')}<div class="actor10 speaking10" style="--slot:50%"><div class="actorart10">${sprite(id,'smile')}</div><span>${name90(id)}</span></div></div><div class="sceneTalk10"><b>${name90(id)}</b><p>${esc(t[0]+climateLine)} ${esc(t[1])}</p><button class="choice" data-act="routineReply12" data-i="0">Quero, vamos aproveitar um pouco.</button><button class="choice" data-act="routineReply12" data-i="1">Hoje não consigo, mas foi bom te encontrar.</button></div><button class="soft" data-act="visit10" data-id="${k}">Voltar</button></div>`)}
function finishRoutine12(i){let k=activeRoutine12,id=city10[k]?.who,key=roomData11().day+':'+id;if(!id||when12(id)!==k||world12().routineDone.includes(key)||![0,1].includes(i))return;world12().routineDone.push(key);let m=mem12(id);m.lastRoutine=roomData11().day;state.aff[id]=(state.aff[id]||0)+(i===0?2:0);state.trust[id]=(state.trust[id]||0)+1;state.log.push({who:id,choice:i===0?'Aceitei passar um tempo em '+city10[k].name:'Preferi conversar em outro momento',aff:i===0?2:0,trust:1});if(i===1)m.spaceUntil=roomData11().day+1;activeRoutine12=null;persist();render();modalType='world12';showPanel(name90(id),`<div class="world12"><p>${esc(i===0?routineTalk12[id][2]:'Tudo bem. A gente se encontra outra hora.')}</p><button class="primary" data-act="visit10" data-id="${k}">Voltar ao local</button></div>`)}
const profile12=showProfile;showProfile=function(id,m='neutral'){profile12(id,m);if(!people12.includes(id)||!profileKnown(id))return;let q=mem12(id);document.querySelector('#modal .panel')?.insertAdjacentHTML('beforeend',`<div class="memory12"><small>MEMÓRIA EMOCIONAL</small><h3>${esc(emotional12(id))}</h3><p>Agora: ${esc(place12(when12(id)))}</p>${q.preference?`<p>Guardou sua preferência: ${esc(q.preference==='nenhuma'?'sem preferência':q.preference)}.</p>`:''}${q.lastChoice?`<p>Última lembrança: “${esc(q.lastChoice)}”.</p>`:''}<button class="soft" data-act="calendar12">Ver rotina</button></div>`)};
function memoryPanel12(){modalType='world12';syncMemory12();showPanel('Memórias que ficam',`<div class="world12"><p>Os personagens lembram de escolhas e preferências que você realmente compartilhou. Respeitar limites não reduz afinidade.</p><div class="memoryGrid12">${people12.filter(profileKnown).map(id=>{let m=mem12(id);return `<article class="memory12"><div class="routineFace12">${sprite(id)}</div><h3>${name90(id)}</h3><b>${esc(emotional12(id))}</b><p>${m.preference?'Preferência lembrada: '+esc(m.preference):'Ainda descobrindo seus gostos.'}</p><p>${m.lastChoice?'“'+esc(m.lastChoice)+'”':'Nenhuma lembrança registrada.'}</p><button class="soft" data-act="profile" data-id="${id}">Ver ficha</button></article>`}).join('')||'<p>Conheça os personagens para começar.</p>'}</div></div>`)}

const socialEvents = [
    {
        id: 'rehearsal',
        pair:['dante','soren'],
        title:'Ensaio ou regulamento?',
        text:'Dante precisa de uma sala para ensaiar. Soren tenta conciliar os horários do festival.',
        choices:['Propor um horário compartilhado','Incentivar Dante a negociar sozinho','Apenas observar'],
        trait:'cooperação',
        loc:'music',
        lines:['Preciso ensaiar. Não dá para fazer isso no corredor.','E eu preciso garantir que todos tenham acesso às salas.'],
        outcomes:['Soren reserva dois horários e Dante aceita dividir a sala.','Dante promete apresentar sua própria proposta.','Os dois retomam a discussão e procuram uma solução sem você.']
    },
    {
        id: 'team-photo',
        pair:['theo','ezra'],
        title:'Um retrato fora da quadra',
        text:'Theo quer uma foto do time, mas Ezra prefere registrar os bastidores.',
        choices:['Sugerir uma foto coletiva e outra espontânea','Deixar que resolvam a diferença','Apenas observar'],
        trait:'criatividade',
        loc:'gym',
        lines:['Uma foto do time seria uma lembrança incrível.','Prefiro fotografar o que acontece quando ninguém está posando.'],
        outcomes:['Os dois combinam uma foto coletiva e um registro espontâneo.','Theo e Ezra resolvem experimentar ideias diferentes.','Eles seguem conversando sobre o projeto.']
    },
    {
        id: 'soundtrack',
        pair:['valentim','dante'],
        title:'A trilha do espetáculo',
        text:'Valentim e Dante discordam sobre a música de uma cena do festival.',
        choices:['Ajudar a encontrar um meio-termo','Defender a liberdade artística','Apenas observar'],
        trait:'cooperação',
        loc:'hall',
        lines:['A cena precisa de uma música que acompanhe o ritmo do texto.','Se eu seguir cada marcação, a música perde a personalidade.'],
        outcomes:['Os dois ensaiam uma versão que combina as propostas.','Dante apresenta uma composição livre ao diretor.','Valentim e Dante decidem retomar o ensaio depois.']
    },
    {
        id: 'noticeboard',
        pair:['soren','ezra'],
        title:'O mural de Bellmont',
        text:'Soren quer organizar o mural; Ezra quer deixar espaço para trabalhos espontâneos.',
        choices:['Reservar espaço para os dois projetos','Sugerir uma exposição livre','Apenas observar'],
        trait:'criatividade',
        loc:'library',
        lines:['O mural precisa de alguma organização.','E também precisa de espaço para coisas que não estavam previstas.'],
        outcomes:['Eles dividem o mural em duas seções.','Ezra propõe uma exposição sem tema obrigatório.','Os dois continuam planejando o mural.']
    }
];

// Social rules do not depend on the DOM or browser storage.
const schoolReputationTraits = ['cooperação', 'criatividade', 'autonomia'];

function isSocialRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getSocialState(save) {
    // Keep the original save key so older progress is not lost.
    if (!isSocialRecord(save.living16)) save.living16 = {};
    const social = save.living16;
    for (const key of ['bonds', 'reputation', 'resolved']) {
        if (!isSocialRecord(social[key])) social[key] = {};
    }
    for (const trait of schoolReputationTraits) {
        if (!Number.isFinite(social.reputation[trait])) social.reputation[trait] = 0;
    }
    return social;
}

function getDailySocialEvent(day, phase) {
    if (!Number.isSafeInteger(day) || day < 1 || phase !== 'Tarde') return null;
    return socialEvents[(day - 1) % socialEvents.length];
}

function socialPairKey(pair) {
    return [...pair].sort().join(':');
}

function limitSocialBond(value) {
    return Math.max(-20, Math.min(20, value));
}

function getSocialBond(day, pair, social) {
    const key = socialPairKey(pair);
    let baseline = 0;
    for (let offset = 0; offset < 7; offset++) {
        if ((Math.max(1, day) - 1 + offset) % 5 === 0) baseline++;
    }
    const adjustment = social.bonds[key];
    return limitSocialBond(baseline + (Number.isFinite(adjustment) ? adjustment : 0));
}

function getSocialMood(id, day, social, cast) {
    const influence = socialEvents
        .filter(event => event.pair.includes(id))
        .reduce((sum, event) => sum + getSocialBond(day, event.pair, social), 0);
    const moods = [
        ['neutral', 'Concentrado'],
        ['smile', 'Animado'],
        ['annoyed', 'Impaciente'],
        ['sad', 'Preocupado']
    ];
    const index = day + cast.indexOf(id) + Math.round(influence / 3);
    return moods[((index % moods.length) + moods.length) % moods.length];
}

function hasResolvedSocialEvent(social, day) {
    return Object.prototype.hasOwnProperty.call(social.resolved, String(day));
}

function resolveSocialEvent(social, day, phase, choice, knowsCharacter) {
    const event = getDailySocialEvent(day, phase);
    if (!event || ![0, 1, 2].includes(choice)) return false;
    if (!event.pair.every(knowsCharacter) || hasResolvedSocialEvent(social, day)) return false;
    social.resolved[String(day)] = choice;
    if (choice === 2) return true;

    const trait = choice === 0 ? event.trait : 'autonomia';
    social.reputation[trait] = Math.min(100, social.reputation[trait] + 1);
    const key = socialPairKey(event.pair);
    const previous = Number.isFinite(social.bonds[key]) ? social.bonds[key] : 0;
    social.bonds[key] = limitSocialBond(previous + (choice === 0 ? 2 : -1));
    return true;
}

function renderSocialScene(event, day, social) {
    const choice = social.resolved[String(day)];
    const previous = social.resolved[String(day - socialEvents.length)];
    const actors = event.pair.map((id, index) => {
        const [expression, label] = getSocialMood(id, day, social, people12);
        const slot = index === 0 ? '29%' : '72%';
        return `
            <div class="actor10 ${index === 0 ? 'speaking10' : ''}" style="--slot:${slot}">
                <div class="actorart10">${sprite(id, expression)}</div>
                <span>${esc(name90(id))} · ${esc(label)}</span>
            </div>`;
    }).join('');

    return `
        <div class="stage10 climate12">
            <div style="position:absolute;inset:0;overflow:hidden">${bg(event.loc)}</div>
            ${actors}
        </div>
        <div class="sceneTalk10">
            ${Number.isInteger(previous) && event.outcomes[previous]
                ? `<p><small>Último encontro: ${esc(event.outcomes[previous])}</small></p>`
                : ''}
            ${event.lines.map((line, index) =>
                `<p><b>${esc(name90(event.pair[index]))}:</b> ${esc(line)}</p>`).join('')}
            ${hasResolvedSocialEvent(social, day) && event.outcomes[choice]
                ? `<p><b>Desfecho:</b> ${esc(event.outcomes[choice])}</p>`
                : ''}
        </div>`;
}

function renderDailySocialEvent(event, day, social) {
    if (!event || !event.pair.every(profileKnown)) {
        return '<p>Conheça mais personagens e volte durante a tarde para descobrir acontecimentos.</p>';
    }
    const choices = hasResolvedSocialEvent(social, day)
        ? '<p>Você já acompanhou este acontecimento.</p>'
        : event.choices.map((text, index) =>
            `<button class="choice" data-act="livingChoice16" data-i="${index}">${esc(text)}</button>`).join('');
    return `
        <article class="memory12">
            <h3>${esc(event.title)}</h3>
            <p>${esc(event.text)}</p>
            ${renderSocialScene(event, day, social)}
            ${choices}
        </article>`;
}

function renderSchoolReputation(social) {
    return schoolReputationTraits.map(trait => `
        <article class="memory12">
            <b>${esc(trait)}</b>
            <p>${social.reputation[trait]} pontos</p>
        </article>`).join('');
}

function renderSocialBonds(day, social) {
    return socialEvents.filter(event => event.pair.every(profileKnown)).map(event => {
        const bond = getSocialBond(day, event.pair, social);
        const label = bond >= 5 ? 'Parceria fortalecida' : bond < 0 ? 'Relação tensa' : 'Convivência';
        return `<article class="memory12">
            <b>${event.pair.map(name90).map(esc).join(' e ')}</b>
            <p>Proximidade: ${bond} · ${label}</p>
        </article>`;
    }).join('') || '<p>Os vínculos aparecem conforme você conhece o elenco.</p>';
}

function showLivingBellmont() {
    if (!state) return;
    modalType = 'living16';
    const social = getSocialState(state);
    const day = roomData11().day;
    const phase = world12().phase;
    const event = getDailySocialEvent(day, phase);
    showPanel('Vida em Bellmont', `
        <div class="world12">
            <div class="worldhero12">
                <small>LIVING BELLMONT / EXPERIMENTAL</small>
                <h3>O mundo não espera por você.</h3>
                <p>Dia ${day} · ${esc(phase)}</p>
            </div>
            <h3>Reputação escolar</h3>
            <div class="memoryGrid12">${renderSchoolReputation(social)}</div>
            <h3>Acontecimento de hoje</h3>
            ${renderDailySocialEvent(event, day, social)}
            <h3>Vínculos entre personagens</h3>
            ${renderSocialBonds(day, social)}
            <button class="soft" data-act="calendar12">Voltar à agenda</button>
        </div>`);
    document.querySelector('#modal .panel')?.classList.add('worldPanel12');
}

// Adapter between the legacy game and the social rules.
function handleSocialChoice(choice) {
    if (!state) return;
    const social = getSocialState(state);
    const changed = resolveSocialEvent(
        social, roomData11().day, world12().phase, choice, profileKnown
    );
    if (!changed) return;
    persist();
    showLivingBellmont();
}

document.addEventListener('click', event => {
    const button = event.target.closest('[data-act]');
    if (!button || button.disabled || !state) return;
    switch (button.dataset.act) {
        case 'living16':
            showLivingBellmont();
            break;
        case 'livingChoice16':
            handleSocialChoice(Number(button.dataset.i));
            break;
    }
});

// interface-mundo-e-slots | v0.14
// CLIMA E EFEITOS VISUAIS
function climate12(root) {
    if (!root || !state) return;
    const w = world12();
    const weather = weather12();
    const s = season12();
    root.dataset.season12 = s;
    root.dataset.weather12 = weather;
    root.dataset.phase12 = w.phase;
    root.classList.toggle('low12', w.low);
    for (const el of root.querySelectorAll(
        '.scene,.stage10,.roomStage11,.location10'
    )) {
        el.classList.add('climate12');
        el.querySelectorAll('.weather12')
            .forEach(x => x.remove());
        if (
            !w.low &&
            roomData11().cinema &&
            (
                !el.matches('.roomStage11') ||
                roomData11().rain
            ) &&
            (
                weather === 'Chuva' ||
                weather === 'Neve' ||
                s === 'Outono' && w.phase !== 'Noite' ||
                s === 'Primavera' && weather === 'Céu limpo'
            )
        ) {
            let kind =
                weather === 'Chuva' ? 'rain' :
                weather === 'Neve' ? 'snow' :
                s === 'Outono' ? 'leaves' :
                'petals';
            el.querySelectorAll('.rain11')
                .forEach(x => x.remove());
            el.insertAdjacentHTML(
                'beforeend',
                `<div class="weather12 ${kind}12"
                    aria-hidden="true">
                </div>`
            );
        } else if (weather !== 'Chuva' || w.low) {
            el.querySelectorAll('.rain11')
                .forEach(x => x.remove());
        }
    }
}
// MODAIS
const panel12 = showPanel;
showPanel = function (t, c) {
    panel12(t, c);
    if (state) {
        climate12(
            document.querySelector('#modal .panel')
        );
    }
};
// MODO CINEMATOGRÁFICO
const cinemaBase12 = cinema11;
cinema11 = function (root) {
    if (state && world12().low) {
        finishTyping11();
        return;
    }
    cinemaBase12(root);
};
// INTERFACE E MENU PRINCIPAL
function renderWorldLayout() {
    if (!state || screen !== 'game') return;
    const root = document.querySelector('.app');
    const nav = root?.querySelector('.nav');
    const layout = root?.querySelector('.layout');
    const top = root?.querySelector('.top');
    if (!root || !nav || !layout || !top) return;
    root.classList.add('shell12');
    // NOMES DOS BOTÕES
    // Altere os textos aqui.
    // Não altere os identificadores.
    const labels = {
        room11: 'Meu quarto',
        city10: 'Cidade',
        phone: 'BellPhone',
        wardrobe: 'Ateliê',
        gallery: 'Galeria',
        journal: 'Diário',
        stats: 'Meu perfil',
        cast: 'Elenco',
        sound: 'Som',
        saves: 'Progresso',
        home: 'Menu inicial',
        gifts5: 'Presentes'
    };
    // ORDEM DOS BOTÕES
    const ordered = [
        'room11',
        'city10',
        'phone',
        'wardrobe',
        'journal',
        'gallery',
        'cast',
        'stats',
        'sound',
        'saves',
        'home'
    ];
    // CRIAÇÃO DO MENU LATERAL
    const rail = document.createElement('aside');
    rail.className = 'rail12';
    rail.innerHTML = `
        <div class="railLabel12">
            BELLMONT / VIDA LIVRE
        </div>
    `;
    rail.append(nav);
    layout.prepend(rail);
    // Remove o ícone do botão Presentes
    const giftButton = nav.querySelector(
        '[data-act="gifts5"]'
    );
    if (giftButton) {
        giftButton.textContent = labels.gifts5;
    }
    // RENDERIZAÇÃO DOS BOTÕES SEM ÍCONES
    ordered.forEach(id => {
        const button = nav.querySelector(
            `[data-act="${id}"]`
        );
        if (!button) return;
        button.textContent =
            labels[id] ?? button.textContent;
        // Contador de mensagens do BellPhone
        if (id === 'phone') {
            const count = unread90();
            if (count > 0) {
                const badge = document.createElement('em');
                badge.textContent = String(count);
                button.append(badge);
            }
        }
        nav.append(button);
    });
    // BOTÕES ADICIONAIS
    nav.insertAdjacentHTML(
        'afterbegin',
        `
        <button data-act="calendar12">
            Agenda
        </button>
        <button data-act="memory12">
            Memórias
        </button>
        `
    );
    nav.insertAdjacentHTML(
        'beforeend',
        `
        <button data-act="settings12">
            Configurações
        </button>
        `
    );
    // BARRA SUPERIOR
    top.insertAdjacentHTML(
        'beforeend',
        `
        <div class="topStatus12">
            <button
                data-act="calendar12"
                class="dateBadge12">
                <b>${esc(status12())}</b>
                <small>
                    Dia ${roomData11().day}
                    · ${world12().phase}
                </small>
            </button>
            <span class="coins12">
                ✦ ${wallet8(state).coins} BC
            </span>
            <button
                class="soft"
                data-act="fullscreen12"
                aria-label="Tela cheia">
                ⛶
            </button>
        </div>
        `
    );
    climate12(root);
}
// CONFIGURAÇÕES DO JOGO
function settings12() {
    modalType = 'world12';
    let w = world12();
    showPanel(
        'Configurações',
        `
        <div class="world12">
            <h3>Apresentação</h3>
            <button
                class="soft"
                data-act="low12"
                aria-pressed="${w.low}">
                Modo desempenho ·
                ${w.low ? 'Ligado' : 'Desligado'}
            </button>
            <button
                class="soft"
                data-act="fullscreen12">
                Tela cheia
            </button>
            <p>
                O modo desempenho remove partículas,
                animações e desfoques, sem alterar a arte.
            </p>
            <button
                class="soft"
                data-act="sound">
                Trilha e som
            </button>
            <button
                class="soft"
                data-act="saves">
                Exportar / importar progresso
            </button>
            <h3>Salvamentos independentes</h3>
            <div class="slots12">
                ${[1, 2, 3].map(i => {
                    let s = readSlot12(i);
                    return `
                        <article>
                            <b>Slot ${i}</b>
                            <p>
                                ${
                                    s
                                    ? esc(s.name) +
                                      ' · Episódio ' +
                                      s.episode +
                                      ' · Dia ' +
                                      (s.room11?.day || 1)
                                    : 'Vazio'
                                }
                            </p>
                            <button
                                class="soft"
                                data-act="slotSave12"
                                data-i="${i}">
                                Salvar
                            </button>
                            <button
                                class="soft"
                                data-act="slotLoad12"
                                data-i="${i}"
                                ${s ? '' : 'disabled'}>
                                Carregar
                            </button>
                        </article>
                    `;
                }).join('')}
            </div>
            <button
                class="soft"
                data-act="history12">
                Histórico de escolhas
            </button>
        </div>
        `
    );
}
// LEITURA DOS SALVAMENTOS
function readSlot12(i) {
    try {
        return prepareSave14(
            JSON.parse(
                localStorage.getItem(
                    key + ':slot:' + i
                )
            )
        );
    } catch {
        return null;
    }
}
// HISTÓRICO DE ESCOLHAS
function history12() {
    modalType = 'world12';
    showPanel(
        'Histórico de escolhas',
        `
        <div class="world12">
            ${
                state.log
                    .slice()
                    .reverse()
                    .map(x => `
                        <article class="memory12">
                            <b>
                                ${esc(name90(x.who))}
                            </b>
                            <p>
                                ${esc(x.choice || '')}
                            </p>
                        </article>
                    `)
                    .join('')
                || '<p>Nenhuma escolha registrada.</p>'
            }
        </div>
        `
    );
}
// REUTILIZAÇÃO DE RECURSOS
function reuse12(html) {
    return compactMedia14(html);
}
const spriteBase12 = sprite;
sprite = function (
    id,
    m = 'neutral',
    custom = null
) {
    return reuse12(
        spriteBase12(id, m, custom)
    );
};
const bgBase12 = bg;
bg = function (id) {
    return reuse12(
        bgBase12(id)
    );
};
// CAPA DO JOGO
const cover12 = cover;
cover = function () {
    return cover12().replace(
        /Edição 0\.[0-9.]+[^<]*/,
        'Edição 0.12 • Entre o Acaso e o Amor'
    );
};
// ABERTURA DAS MODAIS
const modal12 = modal;
modal = function (t) {
    if (t === 'calendar12') {
        return calendar12();
    }
    if (t === 'memory12') {
        return memoryPanel12();
    }
    if (t === 'settings12') {
        return settings12();
    }
    return modal12(t);
};
// EVENTOS E AÇÕES DOS BOTÕES
document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled || !state) return;
    const a = b.dataset.act;
    const id = b.dataset.id;
    const i = Number(b.dataset.i);
    const actions = [
        'calendar12',
        'memory12',
        'settings12',
        'phase12',
        'advance12',
        'month12',
        'calpick12',
        'routine12',
        'routineReply12',
        'low12',
        'fullscreen12',
        'slotSave12',
        'slotLoad12',
        'history12'
    ];
    if (!actions.includes(a)) return;
    e.stopImmediatePropagation();
    switch (a) {
        // Agenda
        case 'calendar12':
            monthOffset12 = 0;
            selectedDay12 = null;
            calendar12();
            break;
        // Memórias
        case 'memory12':
            memoryPanel12();
            break;
        // Configurações
        case 'settings12':
            settings12();
            break;
        // Alteração de período
        case 'phase12': {
            const city = modalType === 'city10';
            setPhase12(id);
            render();
            city
                ? cityPanel10()
                : calendar12();
            break;
        }
        // Avançar horário ou dia
        case 'advance12': {
            const city = modalType === 'city10';
            const idx = phases12.indexOf(
                world12().phase
            );
            if (idx === 2) {
                nextDay12();
            } else {
                setPhase12(phases12[idx + 1]);
                render();
            }
            selectedDay12 = null;
            monthOffset12 = 0;
            city
                ? cityPanel10()
                : calendar12();
            break;
        }
        // Alterar mês
        case 'month12':
            monthOffset12 = Math.max(
                -120,
                Math.min(
                    120,
                    monthOffset12 + i
                )
            );
            calendar12();
            break;
        // Selecionar dia
        case 'calpick12':
            selectedDay12 = i;
            calendar12();
            break;
        // Rotinas
        case 'routine12':
            routinePanel12(id);
            break;
        // Respostas de rotina
        case 'routineReply12':
            finishRoutine12(i);
            break;
        // Modo desempenho
        case 'low12':
            world12().low = !world12().low;
            persist();
            render();
            settings12();
            break;
        // Tela cheia
        case 'fullscreen12':
            try {
                const p = document.fullscreenElement
                    ? document.exitFullscreen()
                    : document.documentElement
                        .requestFullscreen();
                p?.catch(() =>
                    toast('Tela cheia indisponível.')
                );
            } catch {
                toast('Tela cheia indisponível.');
            }
            break;
        // Salvar slot
        case 'slotSave12':
            if (![1, 2, 3].includes(i)) return;
            if (
                readSlot12(i) &&
                !confirm('Substituir o conteúdo deste slot?')
            ) return;
            try {
                localStorage.setItem(
                    key + ':slot:' + i,
                    JSON.stringify(state)
                );
                toast('Slot salvo.');
                settings12();
            } catch {
                toast(
                    'Armazenamento indisponível. Exporte o progresso.'
                );
            }
            break;
        // Carregar slot
        case 'slotLoad12': {
            const s = readSlot12(i);
            if (
                !s ||
                !confirm(
                    'Carregar este slot e substituir a sessão atual?'
                )
            ) return;
            state = normalize(s);
            scene10 = null;
            activeRoutine12 = null;
            modalType = null;
            document.getElementById('modal')
                .innerHTML = '';
            persist();
            render();
            break;
        }
        // Histórico de escolhas
        case 'history12':
            history12();
            break;
    }
}, true);

// mapa-interativo | v0.14
/* v0.13 — Bellmont vivo */
const mapArt13="<svg viewBox=\"0 0 1000 610\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Mapa ilustrado dos bairros de Bellmont\"><defs><linearGradient id=\"ground13\" x2=\"0\" y2=\"1\"><stop stop-color=\"#e8dbc8\"/><stop offset=\"1\" stop-color=\"#c9c9b0\"/></linearGradient><linearGradient id=\"water13\" x2=\"1\" y2=\"1\"><stop stop-color=\"#a8c4c5\"/><stop offset=\"1\" stop-color=\"#658e9a\"/></linearGradient><pattern id=\"stone13\" width=\"23\" height=\"14\" patternUnits=\"userSpaceOnUse\"><path d=\"M0 7H23M12 0V7M4 7V14\" stroke=\"#ae9e8e\" stroke-opacity=\".18\" fill=\"none\"/></pattern><filter id=\"shade13\" x=\"-25%\" y=\"-25%\" width=\"150%\" height=\"160%\"><feDropShadow dx=\"2\" dy=\"4\" stdDeviation=\"2\" flood-color=\"#3e3440\" flood-opacity=\".22\"/></filter></defs><rect width=\"1000\" height=\"610\" rx=\"14\" fill=\"url(#ground13)\"/><rect width=\"1000\" height=\"610\" fill=\"url(#stone13)\" opacity=\".5\"/><path d=\"M900 -30 Q815 115 889 228 T868 405 Q817 495 916 640H1020V-30Z\" fill=\"url(#water13)\" stroke=\"#e7e1c9\" stroke-width=\"8\"/><path d=\"M953 20Q889 127 948 242T934 430Q895 523 964 604\" fill=\"none\" stroke=\"#d5e4df\" stroke-width=\"2\" stroke-dasharray=\"14 11\" opacity=\".6\"/><path d=\"M688 382 Q792 361 826 429 Q856 522 766 568 Q672 580 653 494 Q634 430 688 382Z\" fill=\"#96ac8d\" stroke=\"#f3e3c7\" stroke-width=\"5\"/><ellipse cx=\"748\" cy=\"478\" rx=\"52\" ry=\"35\" fill=\"url(#water13)\" stroke=\"#d4e0c5\" stroke-width=\"4\"/><path d=\"M680 484Q746 395 805 475Q750 556 680 484Z\" fill=\"none\" stroke=\"#ebd9b9\" stroke-width=\"7\"/><g fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M35 220H837M35 355H855M280 38V575M520 38V575M655 42V355M40 550H649M90 92H832\" stroke=\"#ad9c8d\" stroke-width=\"25\"/><path d=\"M35 220H837M35 355H855M280 38V575M520 38V575M655 42V355M40 550H649M90 92H832\" stroke=\"#f7ead6\" stroke-width=\"18\"/><path d=\"M35 220H837M35 355H855M280 38V575M520 38V575M655 42V355M40 550H649M90 92H832\" stroke=\"#c5ae98\" stroke-width=\"1\" stroke-dasharray=\"5 6\"/></g><g fill=\"#6d5860\" font-family=\"Georgia,serif\" font-size=\"12\" letter-spacing=\"2\"><text x=\"40\" y=\"30\">QUARTIER DES ARTS</text><text x=\"304\" y=\"245\">RUA DAS MAGNÓLIAS</text><text x=\"307\" y=\"380\">AVENIDA BELLMONT</text><text x=\"684\" y=\"325\">MARGEM DO LAGO</text><text x=\"936\" y=\"380\" transform=\"rotate(-90 936 380)\">RIO DE BELLMONT</text></g><g filter=\"url(#shade13)\"><rect x=\"47\" y=\"126\" width=\"34\" height=\"30\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M44 128L64.0 109L84 128V137.4H44Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M64.0 110V136.8\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"60.26\" y=\"141.0\" width=\"7.48\" height=\"7.800000000000001\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"51.08\" y=\"141.0\" width=\"4.42\" height=\"5.1000000000000005\" rx=\"1\"/><rect x=\"72.5\" y=\"141.0\" width=\"4.42\" height=\"5.1000000000000005\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"96\" y=\"126\" width=\"40\" height=\"29\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M93 128L116.0 109L139 128V136.82H93Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M116.0 110V136.24\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"111.6\" y=\"140.3\" width=\"8.8\" height=\"7.54\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"100.8\" y=\"140.3\" width=\"5.2\" height=\"4.930000000000001\" rx=\"1\"/><rect x=\"126.0\" y=\"140.3\" width=\"5.2\" height=\"4.930000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"190\" y=\"126\" width=\"43\" height=\"29\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M187 128L211.5 109L236 128V136.82H187Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M211.5 110V136.24\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"206.77\" y=\"140.3\" width=\"9.46\" height=\"7.54\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"195.16\" y=\"140.3\" width=\"5.59\" height=\"4.930000000000001\" rx=\"1\"/><rect x=\"222.25\" y=\"140.3\" width=\"5.59\" height=\"4.930000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"316\" y=\"125\" width=\"32\" height=\"27\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M313 127L332.0 108L351 127V134.66H313Z\" fill=\"#b0918e\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M332.0 109V134.12\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"328.48\" y=\"137.9\" width=\"7.04\" height=\"7.0200000000000005\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"319.84\" y=\"137.9\" width=\"4.16\" height=\"4.590000000000001\" rx=\"1\"/><rect x=\"340.0\" y=\"137.9\" width=\"4.16\" height=\"4.590000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"367\" y=\"125\" width=\"43\" height=\"29\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M364 127L388.5 108L413 127V135.82H364Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M388.5 109V135.24\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"383.77\" y=\"139.3\" width=\"9.46\" height=\"7.54\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"372.16\" y=\"139.3\" width=\"5.59\" height=\"4.930000000000001\" rx=\"1\"/><rect x=\"399.25\" y=\"139.3\" width=\"5.59\" height=\"4.930000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"455\" y=\"126\" width=\"30\" height=\"32\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M452 128L470.0 109L488 128V138.56H452Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M470.0 110V137.92000000000002\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"466.7\" y=\"142.4\" width=\"6.6\" height=\"8.32\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"458.6\" y=\"142.4\" width=\"3.9000000000000004\" height=\"5.44\" rx=\"1\"/><rect x=\"477.5\" y=\"142.4\" width=\"3.9000000000000004\" height=\"5.44\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"548\" y=\"126\" width=\"43\" height=\"36\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M545 128L569.5 109L594 128V140.88H545Z\" fill=\"#b0918e\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M569.5 110V140.16\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"564.77\" y=\"145.2\" width=\"9.46\" height=\"9.36\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"553.16\" y=\"145.2\" width=\"5.59\" height=\"6.12\" rx=\"1\"/><rect x=\"580.25\" y=\"145.2\" width=\"5.59\" height=\"6.12\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"704\" y=\"126\" width=\"30\" height=\"30\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M701 128L719.0 109L737 128V137.4H701Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M719.0 110V136.8\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"715.7\" y=\"141.0\" width=\"6.6\" height=\"7.800000000000001\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"707.6\" y=\"141.0\" width=\"3.9000000000000004\" height=\"5.1000000000000005\" rx=\"1\"/><rect x=\"726.5\" y=\"141.0\" width=\"3.9000000000000004\" height=\"5.1000000000000005\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"774\" y=\"126\" width=\"31\" height=\"30\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M771 128L789.5 109L808 128V137.4H771Z\" fill=\"#87918b\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M789.5 110V136.8\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"786.09\" y=\"141.0\" width=\"6.82\" height=\"7.800000000000001\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"777.72\" y=\"141.0\" width=\"4.03\" height=\"5.1000000000000005\" rx=\"1\"/><rect x=\"797.25\" y=\"141.0\" width=\"4.03\" height=\"5.1000000000000005\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"45\" y=\"266\" width=\"41\" height=\"32\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M42 268L65.5 249L89 268V278.56H42Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M65.5 250V277.92\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"60.99\" y=\"282.4\" width=\"9.02\" height=\"8.32\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"49.92\" y=\"282.4\" width=\"5.33\" height=\"5.44\" rx=\"1\"/><rect x=\"75.75\" y=\"282.4\" width=\"5.33\" height=\"5.44\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"95\" y=\"266\" width=\"42\" height=\"30\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M92 268L116.0 249L140 268V277.4H92Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M116.0 250V276.8\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"111.38\" y=\"281.0\" width=\"9.24\" height=\"7.800000000000001\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"100.04\" y=\"281.0\" width=\"5.46\" height=\"5.1000000000000005\" rx=\"1\"/><rect x=\"126.5\" y=\"281.0\" width=\"5.46\" height=\"5.1000000000000005\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"190\" y=\"266\" width=\"43\" height=\"29\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M187 268L211.5 249L236 268V276.82H187Z\" fill=\"#87918b\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M211.5 250V276.24\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"206.77\" y=\"280.3\" width=\"9.46\" height=\"7.54\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"195.16\" y=\"280.3\" width=\"5.59\" height=\"4.930000000000001\" rx=\"1\"/><rect x=\"222.25\" y=\"280.3\" width=\"5.59\" height=\"4.930000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"315\" y=\"266\" width=\"44\" height=\"34\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M312 268L337.0 249L362 268V279.72H312Z\" fill=\"#b0918e\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M337.0 250V279.04\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"332.16\" y=\"283.8\" width=\"9.68\" height=\"8.84\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"320.28\" y=\"283.8\" width=\"5.720000000000001\" height=\"5.78\" rx=\"1\"/><rect x=\"348.0\" y=\"283.8\" width=\"5.720000000000001\" height=\"5.78\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"460\" y=\"266\" width=\"36\" height=\"36\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M457 268L478.0 249L499 268V280.88H457Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M478.0 250V280.16\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"474.04\" y=\"285.2\" width=\"7.92\" height=\"9.36\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"464.32\" y=\"285.2\" width=\"4.68\" height=\"6.12\" rx=\"1\"/><rect x=\"487.0\" y=\"285.2\" width=\"4.68\" height=\"6.12\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"550\" y=\"266\" width=\"44\" height=\"32\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M547 268L572.0 249L597 268V278.56H547Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M572.0 250V277.92\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"567.16\" y=\"282.4\" width=\"9.68\" height=\"8.32\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"555.28\" y=\"282.4\" width=\"5.720000000000001\" height=\"5.44\" rx=\"1\"/><rect x=\"583.0\" y=\"282.4\" width=\"5.720000000000001\" height=\"5.44\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"710\" y=\"264\" width=\"40\" height=\"27\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M707 266L730.0 247L753 266V273.66H707Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M730.0 248V273.12\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"725.6\" y=\"276.9\" width=\"8.8\" height=\"7.0200000000000005\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"714.8\" y=\"276.9\" width=\"5.2\" height=\"4.590000000000001\" rx=\"1\"/><rect x=\"740.0\" y=\"276.9\" width=\"5.2\" height=\"4.590000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"775\" y=\"264\" width=\"43\" height=\"35\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M772 266L796.5 247L821 266V278.3H772Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M796.5 248V277.6\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"791.77\" y=\"282.5\" width=\"9.46\" height=\"9.1\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"780.16\" y=\"282.5\" width=\"5.59\" height=\"5.95\" rx=\"1\"/><rect x=\"807.25\" y=\"282.5\" width=\"5.59\" height=\"5.95\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"42\" y=\"406\" width=\"41\" height=\"33\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M39 408L62.5 389L86 408V419.14H39Z\" fill=\"#b0918e\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M62.5 390V418.48\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"57.99\" y=\"423.1\" width=\"9.02\" height=\"8.58\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"46.92\" y=\"423.1\" width=\"5.33\" height=\"5.61\" rx=\"1\"/><rect x=\"72.75\" y=\"423.1\" width=\"5.33\" height=\"5.61\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"92\" y=\"406\" width=\"39\" height=\"37\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M89 408L111.5 389L134 408V421.46H89Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M111.5 390V420.72\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"107.21000000000001\" y=\"425.9\" width=\"8.58\" height=\"9.620000000000001\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"96.68\" y=\"425.9\" width=\"5.07\" height=\"6.29\" rx=\"1\"/><rect x=\"121.25\" y=\"425.9\" width=\"5.07\" height=\"6.29\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"190\" y=\"406\" width=\"37\" height=\"36\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M187 408L208.5 389L230 408V420.88H187Z\" fill=\"#87918b\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M208.5 390V420.16\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"204.43\" y=\"425.2\" width=\"8.14\" height=\"9.36\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"194.44\" y=\"425.2\" width=\"4.8100000000000005\" height=\"6.12\" rx=\"1\"/><rect x=\"217.75\" y=\"425.2\" width=\"4.8100000000000005\" height=\"6.12\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"315\" y=\"406\" width=\"38\" height=\"28\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M312 408L334.0 389L356 408V416.24H312Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M334.0 390V415.68\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"329.82\" y=\"419.6\" width=\"8.36\" height=\"7.28\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"319.56\" y=\"419.6\" width=\"4.94\" height=\"4.760000000000001\" rx=\"1\"/><rect x=\"343.5\" y=\"419.6\" width=\"4.94\" height=\"4.760000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"455\" y=\"406\" width=\"33\" height=\"28\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M452 408L471.5 389L491 408V416.24H452Z\" fill=\"#b0918e\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M471.5 390V415.68\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"467.87\" y=\"419.6\" width=\"7.26\" height=\"7.28\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"458.96\" y=\"419.6\" width=\"4.29\" height=\"4.760000000000001\" rx=\"1\"/><rect x=\"479.75\" y=\"419.6\" width=\"4.29\" height=\"4.760000000000001\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"550\" y=\"406\" width=\"35\" height=\"30\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M547 408L567.5 389L588 408V417.4H547Z\" fill=\"#ad8c7d\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M567.5 390V416.8\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"563.65\" y=\"421.0\" width=\"7.7\" height=\"7.800000000000001\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"554.2\" y=\"421.0\" width=\"4.55\" height=\"5.1000000000000005\" rx=\"1\"/><rect x=\"576.25\" y=\"421.0\" width=\"4.55\" height=\"5.1000000000000005\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"580\" y=\"492\" width=\"37\" height=\"30\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M577 494L598.5 475L620 494V503.4H577Z\" fill=\"#b0918e\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M598.5 476V502.8\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"594.43\" y=\"507.0\" width=\"8.14\" height=\"7.800000000000001\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"584.44\" y=\"507.0\" width=\"4.8100000000000005\" height=\"5.1000000000000005\" rx=\"1\"/><rect x=\"607.75\" y=\"507.0\" width=\"4.8100000000000005\" height=\"5.1000000000000005\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"320\" y=\"491\" width=\"34\" height=\"32\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M317 493L337.0 474L357 493V503.56H317Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M337.0 475V502.92\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"333.26\" y=\"507.4\" width=\"7.48\" height=\"8.32\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"324.08\" y=\"507.4\" width=\"4.42\" height=\"5.44\" rx=\"1\"/><rect x=\"345.5\" y=\"507.4\" width=\"4.42\" height=\"5.44\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"55\" y=\"496\" width=\"39\" height=\"33\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M52 498L74.5 479L97 498V509.14H52Z\" fill=\"#b0918e\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M74.5 480V508.48\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"70.21000000000001\" y=\"513.1\" width=\"8.58\" height=\"8.58\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"59.68\" y=\"513.1\" width=\"5.07\" height=\"5.61\" rx=\"1\"/><rect x=\"84.25\" y=\"513.1\" width=\"5.07\" height=\"5.61\" rx=\"1\"/></g></g><g filter=\"url(#shade13)\"><rect x=\"190\" y=\"496\" width=\"33\" height=\"35\" rx=\"2\" fill=\"#baa28c\" stroke=\"#88766d\"/><path d=\"M187 498L206.5 479L226 498V510.3H187Z\" fill=\"#8b7c91\" stroke=\"#80616a\" stroke-width=\"1.4\"/><path d=\"M206.5 480V509.6\" stroke=\"#ebd4c2\" stroke-opacity=\".55\"/><rect x=\"202.87\" y=\"514.5\" width=\"7.26\" height=\"9.1\" rx=\"1\" fill=\"#76646c\"/><g fill=\"#f2e1b0\" stroke=\"#806f6b\" stroke-width=\".7\"><rect x=\"193.96\" y=\"514.5\" width=\"4.29\" height=\"5.95\" rx=\"1\"/><rect x=\"214.75\" y=\"514.5\" width=\"4.29\" height=\"5.95\" rx=\"1\"/></g></g><g><ellipse cx=\"47\" cy=\"70\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"45\" cy=\"65\" r=\"8\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"42\" cy=\"62\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"92\" cy=\"70\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"90\" cy=\"65\" r=\"8\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"87\" cy=\"62\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"137\" cy=\"70\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"135\" cy=\"65\" r=\"10\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"132\" cy=\"62\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"182\" cy=\"70\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"180\" cy=\"65\" r=\"10\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"177\" cy=\"62\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"227\" cy=\"70\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"225\" cy=\"65\" r=\"12\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"222\" cy=\"62\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"272\" cy=\"70\" rx=\"7\" ry=\"4.8999999999999995\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"270\" cy=\"65\" r=\"7\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"267\" cy=\"62\" r=\"3.15\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"317\" cy=\"70\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"315\" cy=\"65\" r=\"8\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"312\" cy=\"62\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"362\" cy=\"70\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"360\" cy=\"65\" r=\"12\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"357\" cy=\"62\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"407\" cy=\"70\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"405\" cy=\"65\" r=\"12\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"402\" cy=\"62\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"452\" cy=\"70\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"450\" cy=\"65\" r=\"8\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"447\" cy=\"62\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"497\" cy=\"70\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"495\" cy=\"65\" r=\"12\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"492\" cy=\"62\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"542\" cy=\"70\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"540\" cy=\"65\" r=\"9\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"537\" cy=\"62\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"587\" cy=\"70\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"585\" cy=\"65\" r=\"12\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"582\" cy=\"62\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"632\" cy=\"70\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"630\" cy=\"65\" r=\"11\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"627\" cy=\"62\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"677\" cy=\"70\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"675\" cy=\"65\" r=\"12\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"672\" cy=\"62\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"722\" cy=\"70\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"720\" cy=\"65\" r=\"12\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"717\" cy=\"62\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"767\" cy=\"70\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"765\" cy=\"65\" r=\"8\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"762\" cy=\"62\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"812\" cy=\"70\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"810\" cy=\"65\" r=\"11\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"807\" cy=\"62\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"44\" cy=\"340\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"42\" cy=\"335\" r=\"9\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"39\" cy=\"332\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"92\" cy=\"340\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"90\" cy=\"335\" r=\"8\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"87\" cy=\"332\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"140\" cy=\"340\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"138\" cy=\"335\" r=\"8\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"135\" cy=\"332\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"188\" cy=\"340\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"186\" cy=\"335\" r=\"12\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"183\" cy=\"332\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"236\" cy=\"340\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"234\" cy=\"335\" r=\"8\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"231\" cy=\"332\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"284\" cy=\"340\" rx=\"7\" ry=\"4.8999999999999995\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"282\" cy=\"335\" r=\"7\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"279\" cy=\"332\" r=\"3.15\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"332\" cy=\"340\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"330\" cy=\"335\" r=\"12\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"327\" cy=\"332\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"380\" cy=\"340\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"378\" cy=\"335\" r=\"10\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"375\" cy=\"332\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"428\" cy=\"340\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"426\" cy=\"335\" r=\"12\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"423\" cy=\"332\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"476\" cy=\"340\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"474\" cy=\"335\" r=\"11\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"471\" cy=\"332\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"524\" cy=\"340\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"522\" cy=\"335\" r=\"8\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"519\" cy=\"332\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"572\" cy=\"340\" rx=\"7\" ry=\"4.8999999999999995\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"570\" cy=\"335\" r=\"7\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"567\" cy=\"332\" r=\"3.15\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"620\" cy=\"340\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"618\" cy=\"335\" r=\"9\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"615\" cy=\"332\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"668\" cy=\"340\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"666\" cy=\"335\" r=\"11\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"663\" cy=\"332\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"716\" cy=\"340\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"714\" cy=\"335\" r=\"10\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"711\" cy=\"332\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"764\" cy=\"340\" rx=\"7\" ry=\"4.8999999999999995\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"762\" cy=\"335\" r=\"7\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"759\" cy=\"332\" r=\"3.15\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"812\" cy=\"340\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"810\" cy=\"335\" r=\"9\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"807\" cy=\"332\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"46\" cy=\"573\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"44\" cy=\"568\" r=\"8\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"41\" cy=\"565\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"88\" cy=\"573\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"86\" cy=\"568\" r=\"11\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"83\" cy=\"565\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"130\" cy=\"573\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"128\" cy=\"568\" r=\"8\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"125\" cy=\"565\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"172\" cy=\"573\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"170\" cy=\"568\" r=\"9\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"167\" cy=\"565\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"214\" cy=\"573\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"212\" cy=\"568\" r=\"10\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"209\" cy=\"565\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"256\" cy=\"573\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"254\" cy=\"568\" r=\"12\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"251\" cy=\"565\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"298\" cy=\"573\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"296\" cy=\"568\" r=\"9\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"293\" cy=\"565\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"340\" cy=\"573\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"338\" cy=\"568\" r=\"12\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"335\" cy=\"565\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"382\" cy=\"573\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"380\" cy=\"568\" r=\"9\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"377\" cy=\"565\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"424\" cy=\"573\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"422\" cy=\"568\" r=\"11\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"419\" cy=\"565\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"466\" cy=\"573\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"464\" cy=\"568\" r=\"9\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"461\" cy=\"565\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"508\" cy=\"573\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"506\" cy=\"568\" r=\"11\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"503\" cy=\"565\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"550\" cy=\"573\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"548\" cy=\"568\" r=\"10\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"545\" cy=\"565\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"592\" cy=\"573\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"590\" cy=\"568\" r=\"12\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"587\" cy=\"565\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"634\" cy=\"573\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"632\" cy=\"568\" r=\"10\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"629\" cy=\"565\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"682\" cy=\"412\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"680\" cy=\"407\" r=\"9\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"677\" cy=\"404\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"704\" cy=\"404\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"702\" cy=\"399\" r=\"10\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"699\" cy=\"396\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"793\" cy=\"419\" rx=\"7\" ry=\"4.8999999999999995\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"791\" cy=\"414\" r=\"7\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"788\" cy=\"411\" r=\"3.15\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"807\" cy=\"454\" rx=\"11\" ry=\"7.699999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"805\" cy=\"449\" r=\"11\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"802\" cy=\"446\" r=\"4.95\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"814\" cy=\"505\" rx=\"12\" ry=\"8.399999999999999\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"812\" cy=\"500\" r=\"12\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"809\" cy=\"497\" r=\"5.4\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"795\" cy=\"547\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"793\" cy=\"542\" r=\"8\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"790\" cy=\"539\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"691\" cy=\"540\" rx=\"10\" ry=\"7.0\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"689\" cy=\"535\" r=\"10\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"686\" cy=\"532\" r=\"4.5\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"667\" cy=\"513\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"665\" cy=\"508\" r=\"9\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"662\" cy=\"505\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"672\" cy=\"455\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"670\" cy=\"450\" r=\"9\" fill=\"#c49ca5\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"667\" cy=\"447\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"843\" cy=\"155\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"841\" cy=\"150\" r=\"8\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"838\" cy=\"147\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"838\" cy=\"294\" rx=\"7\" ry=\"4.8999999999999995\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"836\" cy=\"289\" r=\"7\" fill=\"#788f77\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"833\" cy=\"286\" r=\"3.15\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"842\" cy=\"375\" rx=\"9\" ry=\"6.3\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"840\" cy=\"370\" r=\"9\" fill=\"#a1a990\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"837\" cy=\"367\" r=\"4.05\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g><ellipse cx=\"860\" cy=\"560\" rx=\"8\" ry=\"5.6\" fill=\"#796b64\" opacity=\".17\"/><circle cx=\"858\" cy=\"555\" r=\"8\" fill=\"#b98a9a\" stroke=\"#7d8272\" stroke-width=\".7\"/><circle cx=\"855\" cy=\"552\" r=\"3.6\" fill=\"#f1d5c9\" opacity=\".24\"/></g><g filter=\"url(#shade13)\"><path d=\"M391 68V30H415V14H442V30H466V68Z\" fill=\"#b99885\" stroke=\"#8a6a70\" stroke-width=\"2\"/><path d=\"M386 34L428 4L471 34Z\" fill=\"#86616f\"/><path d=\"M420 68V47Q428 35 436 47V68\" fill=\"#6d5261\"/><g fill=\"#f3d9a8\"><rect x=\"398\" y=\"40\" width=\"10\" height=\"13\" rx=\"4\"/><rect x=\"449\" y=\"40\" width=\"10\" height=\"13\" rx=\"4\"/></g></g><g filter=\"url(#shade13)\"><circle cx=\"758\" cy=\"169\" r=\"29\" fill=\"none\" stroke=\"#8a6075\" stroke-width=\"4\"/><path d=\"M758 140V198M729 169H787M738 149L778 189M738 189L778 149M758 169L743 205M758 169L773 205\" stroke=\"#92707c\" stroke-width=\"2\"/><circle cx=\"758\" cy=\"169\" r=\"5\" fill=\"#d2a67d\"/></g><g fill=\"#775a6a\" font-family=\"Georgia,serif\"><text x=\"428\" y=\"82\" text-anchor=\"middle\" font-size=\"11\">Academia Bellmont</text><text x=\"748\" y=\"481\" text-anchor=\"middle\" font-size=\"11\" fill=\"#e7eee4\">Lago</text></g><g transform=\"translate(965 50)\" fill=\"#705766\" stroke=\"#705766\"><path d=\"M0 -25L8 5L0 0L-8 5Z\"/><path d=\"M0 25V0M-20 0H20\" fill=\"none\" stroke-width=\"1\"/><text x=\"0\" y=\"-30\" text-anchor=\"middle\" font-size=\"10\" stroke=\"none\">N</text></g><rect x=\"5\" y=\"5\" width=\"990\" height=\"600\" rx=\"12\" fill=\"none\" stroke=\"#9b7e7d\" stroke-width=\"2\" opacity=\".5\"/></svg>";
const places13={
  records:[17,30,'♫'],
  books:[41,30,'▤'],
  art:[59,30,'✦'],
  fair:[76,30,'✺'],
  cafe:[17,51,'☕'],
  mall:[42,51,'♙'],
  theatre:[58,78,'♜'],
  park:[75,78,'❧']
};

let selectedMap13='cafe',mapFilter13='all';
const canDate13base=canDate10,canGroup13base=canGroup10;
canDate10=function(id){
  return canDate13base(id)&&world12().phase===city10[id].time
};
canGroup10=function(id){
  return canGroup13base(id)&&world12().phase===city10[groups10[id].loc].time
};

function unlocked13(k){return !!city10[k]&&state.episode>=city10[k].day}
function here13(k){return people12.filter(id=>profileKnown(id)&&when12(id)===k)}
function mapMatches13(k){
  return mapFilter13==='all'||mapFilter13==='open'&&unlocked13(k)||mapFilter13==='here'&&unlocked13(k)&&here13(k).length>0||mapFilter13==='visited'&&cityData10().visits.includes(k)
}

function mapDetail13(k){const c=city10[k],d=cityData10(),open=unlocked13(k),present=here13(k),done=d.done.includes('date:'+k);return `${img10('city',k)}<div class="mapdetailbody13"><small class="mapkicker13">${esc(c.kind)} · ${esc(c.time)}</small><h4>${esc(c.name)}</h4><p>${open?(present.length?'Por aqui agora: '+present.map(name90).join(', '):'Nenhum conhecido por aqui neste horário.'):'Desbloqueia no episódio '+c.day}</p>${open&&c.who?`<p>${done?'Encontro já concluído.':canDate10(k)?'♡ Encontro narrativo disponível.':'Encontro especial à '+c.time.toLowerCase()+'.'}</p>`:''}<p>${d.visits.includes(k)?'✓ Local visitado':'Ainda não visitado'}</p><button class="primary" data-act="visit10" data-id="${k}" ${open?'':'disabled'}>${open?'Visitar local ›':'Local bloqueado'}</button></div>`}
cityPanel10=function(){if(!state)return;modalType='city10';const d=cityData10(),w=world12(),season=season12();let visible=Object.keys(places13).filter(mapMatches13);if(visible.length&&!visible.includes(selectedMap13))selectedMap13=visible[0];let k=selectedMap13;showPanel('Cidade de Bellmont',`<div class="map13"><div class="maphead13"><div><span class="mapkicker13">BELLMONT / ATLAS DA CIDADE</span><h3>O mundo depois da aula.</h3><p>${esc(status12())} · Dia ${roomData11().day} · ${w.phase}</p></div><div>${d.visits.length}/8 locais visitados<br><button class="soft" data-act="calendar12">Agenda</button></div></div><div class="mapcontrols13">${phaseButtons12()}<button class="soft" data-act="advance12">Avançar horário ›</button></div><div class="mapcontrols13" aria-label="Filtrar mapa">${Object.entries({all:'Todos',open:'Desbloqueados',here:'Personagens presentes',visited:'Visitados'}).map(([id,t])=>`<button class="soft" data-act="mapfilter13" data-id="${id}" aria-pressed="${mapFilter13===id}">${t}</button>`).join('')}</div><div class="maplayout13"><div class="mapscroll13"><div class="mapstage13 ${w.phase==='Noite'?'night13':''} ${season==='Inverno'?'winter13':season==='Outono'?'autumn13':''}">${mapArt13}${Object.entries(places13).map(([id,[x,y,icon]])=>`<button class="pin13" data-act="mappick13" data-id="${id}" style="--x:${x}%;--y:${y}%" aria-pressed="${id===k}" data-here="${unlocked13(id)&&here13(id).length>0}" data-locked="${!unlocked13(id)}" ${visible.includes(id)?'':'hidden'}><span>${!unlocked13(id)?'⌑':icon}</span>${esc(city10[id].name)}</button>`).join('')}</div></div><aside class="mapdetail13">${visible.length?mapDetail13(k):'<div class="mapdetailbody13"><h4>Nenhum local</h4><p>Altere o filtro ou o horário.</p></div>'}</aside></div><div class="maplegend13"><span>● Verde: personagem presente</span><span>⌑ Bloqueado por episódio</span><span>Selecione um ponto para ver detalhes.</span></div><details><summary>Lista acessível de locais</summary><div class="maplist13">${visible.map(id=>`<button class="soft" data-act="mappick13" data-id="${id}">${esc(city10[id].name)} · ${unlocked13(id)?'Disponível':'Ep. '+city10[id].day}</button>`).join('')||'<p>Nenhum local neste filtro.</p>'}</div></details><h3 style="font-size:22px;margin-top:19px">Momentos em grupo</h3><div class="mapgroups13">${Object.entries(groups10).map(([id,g])=>`<button class="soft" data-act="group10" data-id="${id}" ${!canGroup10(id)||d.done.includes('group:'+id)?'disabled':''}>${esc(g.title)} · ${d.done.includes('group:'+id)?'Concluído':state.episode<g.day?'Ep. '+g.day:city10[g.loc].time}</button>`).join('')}</div><div class="mapcontrols13"><button class="soft" data-act="cg10">♡ Galeria de momentos</button><button class="soft" data-act="room11">Meu quarto</button><button class="soft" data-act="close">Voltar à história</button></div></div>`);document.querySelector('#modal .panel')?.classList.add('citypanel10','mapPanel13')};
function pickMap13(id){
  if(!city10[id]||!mapMatches13(id))return;
  selectedMap13=id;
  const root=document.querySelector('.map13');
  if(!root)return;
  root.querySelectorAll('.pin13').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===id)));
  root.querySelector('.mapdetail13').innerHTML=mapDetail13(id)
}

// bellfeed-dinamico | v0.14
const routinePosts13={
  dante:['Discos antigos, som novo.','A melhor parte de procurar um disco é encontrar o que você não estava procurando.'],
  soren:['Uma pausa entre capítulos.','Hoje, a lista de tarefas pode esperar alguns minutos.'],
  theo:['Um pouco de ar fresco.','O parque devia contar como atividade extracurricular.'],
  ezra:['Estudo de luz e sombra.','O detalhe mais bonito costuma passar despercebido.'],
  valentim:['Antes de abrir as cortinas.','O silêncio do teatro antes de um ensaio tem algo especial.'],
  raven:['Notas de uma tarde qualquer.','Toda boa história começa com uma observação.']
};

const warmReply13={
  dante:'Você tem um talento irritante para me fazer sorrir.',
  soren:'Sua opinião sempre me faz pensar um pouco mais.',
  theo:'Quando você aparece por aqui, meu dia melhora.',
  ezra:'Que bom que você reparou. Gosto de dividir esses detalhes com você.',
  valentim:'Confesso que esperava ler seu comentário.',
  raven:'Gosto quando você aparece nas entrelinhas dos meus dias.'
};

const socialReply13={
  dante:'Tá, esse comentário merece uma resposta. Boa.',
  soren:'Obrigado pela observação. Vou guardar isso.',
  theo:'KKKK adorei que você comentou!',
  ezra:'Gostei de ler sua perspectiva.',
  valentim:'Uma participação muito bem-vinda.',
  raven:'Comentário registrado. Sem direito a manchete… por enquanto.',
  mabel:'AMIGA, adorei!',
  iris:'Isso rende uma boa teoria.',
  scarlett:'Obrigada pelo comentário.',
  cecilia:'Agradeço a participação.'
};

const publicComments13={
  dante:[['raven','Moreau sendo quase poético. Acontecimento histórico.'],['theo','Quero ouvir depois!']],
  soren:[['dante','Uma pausa? Alguém avisa a comissão.'],['cecilia','Aprovado, com moderação.']],
  theo:[['mabel','Você e suas ideias mirabolantes.'],['dante','Não inventa de organizar uma competição.']],
  ezra:[['iris','Parece cena de filme.'],['raven','Você tem um olhar interessante.']],
  valentim:[['raven','Finalmente um ensaio sem discurso de abertura.'],['theo','Boa sorte no palco!']],
  raven:[['dante','Espero que não seja sobre mim.'],['mabel','Quero ler tudo!']],
  mabel:[['iris','Tenho uma teoria.'],['theo','Isso promete.']]
};

function social13(s=state){
  let d=s.social13;
  if(!d||typeof d!=='object'||Array.isArray(d))d=s.social13={
    
  };
  for(const k of ['posts','stories','seen','made'])if(!Array.isArray(d[k]))d[k]=[];
  if(!d.replies||typeof d.replies!=='object'||Array.isArray(d.replies))d.replies={
    
  };
  if(!Number.isSafeInteger(d.serial))d.serial=0;
  if(!Number.isSafeInteger(d.highTick))d.highTick=-1;
  return d
}

function normalizeFeed(s) {
    social13(s);
}
function tick13(){return (roomData11().day-1)*3+phases12.indexOf(world12().phase)}
function addPost13(d,p){
  if(d.made.includes(p.id))return false;
  d.made.push(p.id);
  d.posts.push({
    ...p,seq:++d.serial
  });
  const routines=d.posts.filter(x=>x.kind==='routine');
  if(routines.length>90){
    const drop=new Set(routines.slice(0,routines.length-90).map(x=>x.id));
    d.posts=d.posts.filter(x=>!drop.has(x.id));
    d.made=d.made.filter(x=>!drop.has(x));
    for(const id of drop)delete d.replies[id];
    const bp=data90();
    bp.likes=bp.likes.filter(x=>!drop.has(x));
    for(const id of drop)delete bp.comments[id];
    
  }
  return true
}

function syncSocial13(){if(!state)return false;const d=social13(),day=roomData11().day,phase=world12().phase,tick=tick13();let changed=false;const migrated=!d.started;d.started=true;const eligible=people12.filter(id=>profileKnown(id)&&! (mem12(id).spaceUntil>=day));
 // Reconcile event completion from the existing save, without revealing private choices.
 for(const item of cityData10().done){const [type,k]=item.split(':');const c=type==='date'?city10[k]:groups10[k];if(!c)continue;let who=type==='date'?c.who:c.cast[0];let loc=type==='date'?k:c.loc;if(!who)continue;changed=addPost13(d,{id:'event13:'+item,who,day:migrated?null:day,phase:migrated?'':phase,loc,kind:'event',text:type==='group'?`Uma tarde de Bellmont que merece entrar para a memória: ${c.title}.`:`Uma pausa na rotina em ${city10[loc].name}. Às vezes, é bom mudar de cenário.`,likes:5,comments:publicComments13[who]||[]})||changed}
 // One new routine post & story per advancing game time; changing a clock backwards never regenerates posts.
 if(tick>d.highTick||tick===d.highTick&&!d.made.includes('routine13:'+tick)&&eligible.length){
  d.highTick=tick;
  changed=true;
  const present=eligible.filter(id=>city10[when12(id)]&&unlocked13(when12(id)));
  const pool=present.length?present:eligible;
  const who=pool.length?pool[(day+phases12.indexOf(phase))%pool.length]:null;
  if(who){
    let loc=when12(who),
    text=routinePosts13[who][(day+phases12.indexOf(phase))%2];
    let weather=weather12();
    if(weather==='Chuva')text+=' A chuva mudou o ritmo do dia.';
    if(weather==='Neve')text+=' Bellmont ficou branca hoje.';
    const id='routine13:'+tick;
    changed=addPost13(d,{
      id,who,day,phase,loc:city10[loc]?loc:null,kind:'routine',text,likes:3+(day%5),comments:publicComments13[who]||[]
    })||changed;
    d.stories.push({
      id:'story13:'+tick,who,day,tick,loc:city10[loc]?loc:null,text:routinePosts13[who][0]+' '+(city10[loc]?'Hoje em '+city10[loc].name+'.':weather+'.')
    })
  }
  d.stories=d.stories.filter(x=>x.tick+3>tick).slice(-6);
  d.seen=d.seen.filter(id=>d.stories.some(x=>x.id===id));
  
}

 return changed}


let feedFilter13='all',storyOpen13=null,feedLimit13=12,compose13=null;
function feedPosts13(){
  const d=social13(),
  v=closet9(state);
  let old=feed90.map((p,i)=>({
    id:'npc'+i,who:p[0],day:p[1],kind:'archive',text:p[2],likes:2+i%4,comments:[],seq:-100+i
  })).filter(p=>p.day<=state.episode&&known90(p.who));
  let photos=v.posts.map((p,i)=>({
    id:'look'+i,who:'me',day:p.day13||null,phase:p.phase13||'',kind:'look',text:p.caption||'Meu look de Bellmont ♡',photo:v.photos[p.photo],likes:p.likes||0,comments:p.comments||[],seq:p.seq13||-50+i
  }));
  return [...old,...photos,...d.posts].sort((a,b)=>b.seq-a.seq)
}

function storyList13(){const d=social13(),now=Math.max(tick13(),d.highTick);return d.stories.filter(x=>x.tick<=now&&x.tick+3>now)}
function feedCommentHTML13(p){const d=social13(),old=data90().comments[p.id];let html=(p.comments||[]).map(c=>Array.isArray(c)?`<p class="bpcomment"><b>${esc(name90(c[0]))}</b> ${esc(c[1])}</p>`:`<p class="bpcomment">${esc(String(c))}</p>`).join('');if(old)html+=`<p class="bpcomment"><b>Você</b> ${esc(old)}</p>`;html+=(d.replies[p.id]||[]).map(x=>`<p class="bpcomment"><b>Você</b> ${esc(x.text)}</p>${x.reply?`<p class="bpcomment"><b>${esc(name90(p.who==='me'?'mabel':p.who))}</b> ${esc(x.reply)}</p>`:''}`).join('');return html}
// Renderiza a foto original, mantendo as camadas do look e a proporção nativa.
function feedPhoto13(photo, album = false) {
    if (!photo?.look) return '';
    const bg = ['rose','night','garden'].includes(photo.bg) ? photo.bg : 'rose';
    const art = art9(photo.look,true);
    const match = art.match(/viewBox="[^"]*?([0-9.]+)\s+([0-9.]+)"/);
    const width = Number(match?.[1]) || 434;
    const height = Number(match?.[2]) || 724;
    // O SVG conserva as máscaras de cabelo, olhos, pele e acessórios.
    return `<div class="bpfeedart feedphoto13 ${album?'feedphoto-album13':''} bg9-${bg}"
        style="--photo-width:${width}px;--photo-height:${height}px;--photo-ratio:${width}/${height}">${art}</div>`;
}

// Fotografias do feed são independentes das miniaturas do mapa.
// Registre aqui os arquivos HD já disponíveis (chaves: city:cafe, city:records, npc1...).
const feedPhotography13 = {};
const feedSchoolPhotos13 = {npc1:'music',npc2:'hall',npc3:'gym',npc4:'library'};

function feedMedia13(p) {
    if (p.photo) return '<button type="button" class="feed-open13" data-feed-open aria-label="Ampliar foto do visual">'+feedPhoto13(p.photo)+'</button>';
    const key = p.loc ? 'city:'+p.loc : p.id;
    const hd = feedPhotography13[key];
    const school = feedSchoolPhotos13[p.id];
    if (hd || school && schoolArt[school]) {
        const src = hd || mediaURL14(schoolArt[school],'image/webp');
        const alt = hd && p.loc ? city10[p.loc]?.name || 'Bellmont' : 'Registro de Bellmont';
        return `<button type="button" class="feed-open13" data-feed-open aria-label="Ampliar fotografia"><img class="feed-image13" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"></button>`;
    }
    if (p.loc && art10.city[p.loc]) {
        return `<div class="feed-location13">${img10('city',p.loc)}<div><small>LOCAL EM BELLMONT</small><b>${esc(city10[p.loc]?.name || 'Bellmont')}</b></div></div>`;
    }
    return '';
}

// Visualização ampliada sem fechar ou recriar o BellPhone.
function openFeedPhoto13(button) {
    const viewer = document.querySelector('#feedviewer13');
    const media = button.querySelector('img,.feedphoto13');
    if (!viewer || !media) return;
    const copy = media.cloneNode(true);
    copy.removeAttribute('loading');
    viewer.querySelector('.feedviewer-media13').replaceChildren(copy);
    viewer.showModal();
}
document.addEventListener('click', e => {
    const open = e.target.closest?.('[data-feed-open]');
    if (open) { e.stopImmediatePropagation(); openFeedPhoto13(open); return; }
    const viewer = document.querySelector('#feedviewer13[open]');
    if (viewer && (e.target === viewer || e.target.closest?.('[data-feed-close]'))) {
        e.stopImmediatePropagation();
        viewer.close();
    }
}, true);
document.addEventListener('keydown', e => {
    const viewer = document.querySelector('#feedviewer13[open]');
    if (viewer && e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        viewer.close();
    }
}, true);

function postHTML13(p){const d=data90(),liked=d.likes.includes(p.id);return `<article class="bppost feed13post"><div class="bpthreadhead">${face90(p.who)}<div><b>${p.who==='me'?esc(state.name):esc(name90(p.who))}</b><small>${p.kind==='archive'?'Arquivo · episódio '+p.day:p.day?'Dia '+p.day+' · '+esc(p.phase||''):'Registro anterior'}</small></div><span class="feed13meta">${({event:'MOMENTO',routine:'COTIDIANO',look:'ATELIÊ',archive:'ARQUIVO',text:'MURAL'})[p.kind]||'MURAL'}</span></div><p>${esc(p.text)}</p>${feedMedia13(p)}<div class="bpactions"><button class="bpbutton" data-act="feedlike13" data-id="${esc(p.id)}" aria-pressed="${liked}">${liked?'♥':'♡'} ${p.likes+(liked?1:0)}</button><button class="bpbutton" data-act="feedcomment13" data-id="${esc(p.id)}">Comentar</button>${p.loc&&unlocked13(p.loc)?`<button class="bpbutton" data-act="feedplace13" data-id="${p.loc}">Ver local ↗</button>`:''}</div>${feedCommentHTML13(p)}${compose13===p.id?`<div class="feedcomposer13"><textarea id="feedcomment13" maxlength="180" placeholder="Escreva um comentário"></textarea><div class="bpactions"><button class="bpbutton" data-act="feedsend13" data-id="${esc(p.id)}">Publicar</button><button class="bpbutton" data-act="feedcancel13">Cancelar</button></div></div>`:''}</article>`}
feedPanel90=function(){if(syncSocial13())persistMemoryStage();const d=social13(),stories=storyList13(),p=stories.find(x=>x.id===storyOpen13),all=feedPosts13(),filtered=all.filter(x=>feedFilter13==='all'||feedFilter13==='events'&&x.kind==='event'||feedFilter13==='mine'&&x.who==='me'||feedFilter13==='routine'&&x.kind==='routine');return `<div class="bpsection feed13"><div class="feed13hero"><div><h3>BellFeed</h3><p>O cotidiano de Bellmont · Dia ${roomData11().day}</p></div><div class="bpactions"><button class="bpbutton" data-act="feedwrite13">Publicar</button><button class="bpbutton" data-act="bp90publish">Meu visual</button></div></div><div class="stories13" aria-label="Stories temporários">${stories.map(x=>`<button class="story13" data-act="story13" data-id="${x.id}" data-seen="${d.seen.includes(x.id)}">${face90(x.who)}<span>${esc(name90(x.who))}</span></button>`).join('')||'<p class="bpmuted">Nenhum story ativo. Conheça personagens e avance o dia.</p>'}</div>${p?`<div class="storyview13"><div class="bpthreadhead">${face90(p.who)}<b>${esc(name90(p.who))}</b><button class="bpbutton" data-act="storyclose13">Fechar</button></div>${feedMedia13(p)}<h3>${esc(p.text)}</h3><p class="bpmuted">Story temporário · desaparece após três períodos do jogo.</p>${p.loc?`<button class="bpbutton" data-act="feedplace13" data-id="${p.loc}">Ver no mapa</button>`:''}</div>`:''}${compose13==='new'?`<div class="storyview13 feedcomposer13"><h3>Nova publicação</h3><textarea id="feedtext13" maxlength="240" placeholder="O que ficou de hoje?"></textarea><div class="bpactions"><button class="bpbutton" data-act="feedpost13">Publicar</button><button class="bpbutton" data-act="feedcancel13">Cancelar</button></div></div>`:''}<div class="feed13tabs">${Object.entries({all:'Para você',routine:'Cotidiano',events:'Momentos',mine:'Minhas publicações'}).map(([id,t])=>`<button class="bpbutton" data-act="feedfilter13" data-id="${id}" aria-pressed="${feedFilter13===id}">${t}</button>`).join('')}</div>${filtered.slice(0,feedLimit13).map(postHTML13).join('')||'<p class="bpmuted">Nenhuma publicação neste filtro.</p>'}${filtered.length>feedLimit13?'<button class="bpbutton" data-act="feedmore13">Ver publicações anteriores</button>':''}<dialog id="feedviewer13" class="feedviewer13" aria-label="Fotografia ampliada"><div class="feedviewer-head13"><b>Fotografia</b><button type="button" class="bpbutton" data-feed-close>Fechar ×</button></div><div class="feedviewer-media13"></div></dialog></div>`};
const pub13=publish90;publish90=function(i){const v=closet9(state),n=v.posts.length;pub13(i);if(v.posts.length>n){const d=social13();const p=v.posts.at(-1);p.day13=roomData11().day;p.phase13=world12().phase;p.seq13=++d.serial;p.comments=(p.comments||[]).map(x=>String(x).replace(/: undefined$/,'： Gostei do visual.'));persist();}};
function redrawFeed13(){
  const el=document.querySelector('.bpcontent'),
  scroll=el?.scrollTop||0;
  phone7();
  const next=document.querySelector('.bpcontent');
  if(next)next.scrollTop=scroll
}

const phone13base=phone7;
phone7=function(){
  phone13base();
  const el=document.querySelector('.bpstatus');
  if(el&&state){
    const spans=el.querySelectorAll('span');
    if(spans.length>1)spans[spans.length-1].textContent='Dia '+roomData11().day+' · '+world12().phase;
    
  }
  
};

const cover13=cover;cover=function(){return cover13().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.13 • Bellmont Vivo')};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b||b.disabled||!state)return;const a=b.dataset.act,id=b.dataset.id;if(!['mappick13','mapfilter13','feedfilter13','feedlike13','feedcomment13','feedsend13','feedcancel13','feedwrite13','feedpost13','feedmore13','story13','storyclose13','feedplace13'].includes(a))return;e.stopImmediatePropagation();if(a==='mappick13')return pickMap13(id);if(a==='mapfilter13'){
    if(!['all','open','here','visited'].includes(id))return;mapFilter13=id;return cityPanel10()
  }
  if(a==='feedplace13'){
    if(!unlocked13(id))return;selectedMap13=id;mapFilter13='all';return cityPanel10()
  }
  const d=social13();const p=feedPosts13().find(x=>x.id===id);switch(a){
    case'feedfilter13':if(['all','routine','events','mine'].includes(id)){
      feedFilter13=id;feedLimit13=12;compose13=null
    }
    break;case'feedmore13':feedLimit13+=12;break;case'feedlike13':if(!p)return;{
      let likes=data90().likes;data90().likes=likes.includes(id)?likes.filter(x=>x!==id):[...likes,id]
    }
    break;case'feedcomment13':if(!p)return;compose13=id;break;case'feedcancel13':compose13=null;break;case'feedwrite13':compose13='new';break;case'feedpost13':{
      let t=document.getElementById('feedtext13')?.value.trim().slice(0,240);if(!t)return toast('Escreva algo primeiro.');if(d.posts.filter(x=>x.who==='me').length>=30)return toast('Limite de 30 publicações de texto.');let comments=[['mabel','Adorei ler isso!']];const close=people12.filter(x=>profileKnown(x)&&(state.trust[x]||0)>=10&&!(mem12(x).spaceUntil>=roomData11().day)).sort((a,b)=>(state.trust[b]||0)-(state.trust[a]||0)).slice(0,2);for(const who of close)comments.push([who,warmReply13[who]]);addPost13(d,{
        id:'mine13:'+String(d.serial+1),who:'me',day:roomData11().day,phase:world12().phase,kind:'text',text:t,likes:1,comments
      });compose13=null;feedFilter13='all';break
    }
    case'feedsend13':{
      if(!p)return;let t=document.getElementById('feedcomment13')?.value.trim().slice(0,180);if(!t)return toast('Escreva um comentário primeiro.');let arr=d.replies[id]||(d.replies[id]=[]);if(arr.length>=6)return toast('Limite de seis comentários por publicação.');arr.push({
        text:t,reply:arr.length===0&&p.who!=='me'?((state.trust[p.who]||0)>=18&&warmReply13[p.who]?warmReply13[p.who]:socialReply13[p.who])||'Obrigada por comentar.':''
      });compose13=null;break
    }
    case'story13':if(!storyList13().some(x=>x.id===id))return;storyOpen13=id;if(!d.seen.includes(id))d.seen.push(id);break;case'storyclose13':storyOpen13=null;break
  }
  persist();redrawFeed13()
},true);

// integracao-estabilidade | v0.14
/* v0.14 — integrate common services once, after all existing feature modules. */
const panelBase14=showPanel;showPanel=function(title,content){return panelBase14(title,compactMedia14(content))};
const coverBase14=cover;cover=function(){let h=coverBase14().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.14 • Edição de estabilidade');return h.replace('<button class="soft" data-act="about">Sobre o jogo</button>','<button class="soft" data-act="about">Sobre o jogo</button><button class="soft" data-act="import14">Importar progresso</button>')};
function renderSaveWarning() {
    const root=document.getElementById('root');
  if(saveWarning14&&root&&!root.querySelector('.savewarn14')){
    const n=document.createElement('div');
    n.className='savewarn14';
    n.textContent=saveWarning14;
    root.append(n)
  }
}

const closeBase14=close;close=function(){finishTyping11();closeBase14()};
const settingsBase14=settings12;settings12=function(){settingsBase14();document.querySelector('#modal .world12')?.insertAdjacentHTML('beforeend',`<h3>Recuperação de progresso</h3><p>${esc(saveWarning14||'Uma cópia do último salvamento válido é mantida no navegador, quando há espaço disponível.')}</p><button class="soft" data-act="backup14">Restaurar cópia anterior</button><p class="hint">Os arquivos JSON continuam compatíveis com as versões anteriores. Exporte antes de mudar de arquivo ou navegador.</p>`)};
// Stop invalid imports and continue from safe, validated data. All gameplay handlers remain unchanged.
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const a=b.dataset.act;if(a==='import14'){e.stopImmediatePropagation();modalType='saves';showPanel('Importar progresso','<p>Escolha seu arquivo JSON exportado de outra versão de Depois do Sinal.</p><label>Salvamento JSON <input type="file" accept=".json,application/json" id="import4"></label>');return}if(a==='backup14'){e.stopImmediatePropagation();try{const s=prepareSave14(JSON.parse(localStorage.getItem(key+':backup14')));if(confirm('Restaurar a cópia anterior?')){commitSave14(s);toast('Cópia recuperada')}}catch{toast('Nenhuma cópia válida disponível.')}return}if(a==='continue'){e.stopImmediatePropagation();try{const s=prepareSave14((!storageOK&&saved)||load()||saved);commitSave14(s);if(recovered14){toast('Progresso recuperado da cópia anterior.');recovered14=false}}catch{toast('Não foi possível abrir o progresso. Importe uma cópia JSON.')}return}},true);

// Experiência de jogo: criação inicial, foco narrativo e atalhos.
let creatorStep = 'appearance';
let storyFocus = true;

const creatorTabs = {
    appearance: 'Aparência',
    outfit: 'Primeiro look'
};

function creatorPalette(key, title) {
    return `<fieldset class="creator-palette"><legend>${title}</legend>
        <div class="creator-swatches">${palettes9[key].map(([id, name, color]) =>
            `<button type="button" data-act="creatorColor" data-key="${key}" data-id="${id}"
                aria-pressed="${draft.look[key] === id}"><i style="background:${color}"></i>${esc(name)}</button>`
        ).join('')}</div></fieldset>`;
}

function creatorOptions() {
    if (creatorStep === 'appearance') return [
        creatorPalette('hair', 'Cabelo'),
        creatorPalette('eyes', 'Olhos'),
        creatorPalette('skin', 'Tom de pele')
    ].join('');
    return `<div class="creator-looks">${Object.entries(signatureNames83).map(([id, name]) =>
        `<button type="button" data-act="creatorOutfit" data-id="${id}" aria-pressed="${draft.look.outfit === id}">
            ${catalogThumb92(id)}<b>${esc(name)}</b></button>`
    ).join('')}</div>`;
}

function creatorPreview() {
    return compactMedia14(signatureArt83(draft.look, 'neutral'));
}

function drawCreator() {
    draft.look = look9({...draft.look, visualMode9: 'signature'});
    closet9(draft);
    showPanel('Sua história começa aqui', `
        <div class="creator">
            <div class="creator-preview">
                <span class="creator-kicker">BELLMONT / NOVA ESTUDANTE</span>
                <div class="creator-art">${creatorPreview()}</div>
                <b class="creator-lookname">${esc(signatureNames83[draft.look.outfit] || '')}</b>
            </div>
            <div class="creator-form">
                <span class="creator-kicker">PERSONALIZE SUA PROTAGONISTA</span>
                <h3>Quem é você?</h3>
                <label for="name">Seu nome</label>
                <input id="name" maxlength="24" value="${esc(draft.name)}" autocomplete="off">
                <div class="creator-tabs">${Object.entries(creatorTabs).map(([id, label]) =>
                    `<button type="button" data-act="creatorTab" data-id="${id}" aria-pressed="${creatorStep === id}">${label}</button>`
                ).join('')}</div>
                <div class="creator-options">${creatorOptions()}</div>
                <p class="hint">Você poderá mudar seu visual e acessar todos os recursos do ateliê durante a história.</p>
                ${saved ? '<p class="creator-warning">Uma nova partida substituirá o progresso ativo. Exporte ou guarde uma cópia antes de começar.</p>' : ''}
                <div class="creator-actions">
                    <button class="soft" data-act="creatorReset">Restaurar visual</button>
                    <button class="primary" data-act="creatorStart">Começar a história ›</button>
                </div>
            </div>
        </div>`);
    document.querySelector('#modal .panel')?.classList.add('creator-panel');
}

const fullAtelier = drawWard7;
drawWard7 = function () {
    if (modalType === 'new') return drawCreator();
    return fullAtelier();
};

const openBeforeCreator = modal;
modal = function (type) {
    if (type === 'new') creatorStep = 'appearance';
    return openBeforeCreator(type);
};

function refreshCreator() {
    const panel = document.querySelector('.creator-panel');
    if (!panel) return;
    panel.querySelector('.creator-art').innerHTML = creatorPreview();
    panel.querySelector('.creator-lookname').textContent = signatureNames83[draft.look.outfit] || '';
    panel.querySelector('.creator-options').innerHTML = creatorOptions();
    panel.querySelectorAll('[data-act="creatorTab"]').forEach(b =>
        b.setAttribute('aria-pressed', String(b.dataset.id === creatorStep)));
}

// Reaproveita a navegação narrativa e os botões existentes, sem duplicar o motor.
function renderStoryFocus() {
    const app = document.querySelector('.shell12');
    if (!app || screen !== 'game') return;
    app.classList.toggle('story-focus', storyFocus);
    const ep = app.querySelector('.episode');
    if (ep) ep.insertAdjacentHTML('beforeend', `<button class="story-toggle" data-act="storyFocus"
        aria-pressed="${storyFocus}">${storyFocus ? 'Ver vínculos' : 'Focar na história'}</button>`);
    const next = app.querySelector('.dialog [data-act="next"]');
    if (next) next.textContent = 'Continuar ›';
}

document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const {act, id, key} = b.dataset;
    if (act === 'next' && !modalType && typing11 && b.closest('.main .dialog')) {
        e.stopImmediatePropagation();
        finishTyping11();
        return;
    }
    if (act === 'storyFocus') {
        storyFocus = !storyFocus;
        const app = document.querySelector('.shell12');
        app?.classList.toggle('story-focus', storyFocus);
        b.textContent = storyFocus ? 'Ver vínculos' : 'Focar na história';
        b.setAttribute('aria-pressed', String(storyFocus));
        return;
    }
    if (modalType !== 'new' || !draft || !act.startsWith('creator')) return;
    e.stopImmediatePropagation();
    keepName8();
    if (act === 'creatorTab' && creatorTabs[id]) creatorStep = id;
    if (act === 'creatorColor' && palettes9[key]?.some(x => x[0] === id)) draft.look[key] = id;
    if (act === 'creatorOutfit' && presets9[id]) {
        draft.look.outfit = id;
        draft.look.fashion = {...draft.look.fashion, ...presets9[id]};
    }
    if (act === 'creatorReset') draft.look = look9(initial().look);
    if (act === 'creatorStart') {
        if (saved && !confirm('Começar uma nova história e substituir o progresso ativo?')) return;
        // O fluxo original de início continua responsável por normalizar e salvar.
        const start = document.createElement('button');
        start.hidden = true;
        start.dataset.act = 'start';
        document.querySelector('.creator-actions').append(start);
        start.click();
        start.remove();
        return;
    }
    refreshCreator();
}, true);

const closeBeforeExperience = close;
close = function () {
    const opener = modalOpener;
    modalOpener = null;
    closeBeforeExperience();
    if (opener?.isConnected) opener.focus({preventScroll: true});
};

document.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.repeat || e.altKey || e.ctrlKey || e.metaKey ||
        modalType || screen !== 'game' || !state || ![' ', 'Enter'].includes(e.key)) return;
    if (e.target.closest?.('button,input,textarea,select,a,summary,[contenteditable]')) return;
    const next = document.querySelector('.main .dialog [data-act="next"]');
    if (!next || next.disabled) return;
    e.preventDefault();
    if (typing11) finishTyping11();
    else next.click();
});

// Continuidade narrativa: cenas, fatos lembrados e caixa de entrada por capítulo.
function story42(s = state) {
    const d = s.story42;
    if (!d || typeof d !== 'object' || Array.isArray(d)) s.story42 = {};
    const x = s.story42;
    for (const k of ['scenes', 'facts', 'memories']) {
        if (!x[k] || typeof x[k] !== 'object' || Array.isArray(x[k])) x[k] = {};
    }
    return x;
}

function syncStory42(s = state) {
    if (!s) return;
    const d = story42(s), chapter = s.episode || 1;
    // Nunca removemos mensagens do vetor: respostas e favoritos usam seus índices.
    for (const m of s.messages || []) {
        if (!Number.isInteger(m.chapter42)) m.chapter42 = chapter;
    }
    for (const log of s.log || []) {
        if (!Number.isInteger(log.chapter42)) log.chapter42 = chapter;
    }
    const memories = {};
    function add(who, event) {
        if (!who || typeof event.text !== 'string') return;
        (memories[who] ||= []).push(event);
    }
    for (const log of s.log || []) add(log.who, {
        kind: 'choice', chapter: log.chapter42, text: log.choice
    });
    for (const [i, r] of Object.entries(s.replied || {})) {
        const m = s.messages[i];
        if (m && r && typeof r.text === 'string') add(m.who, {
            kind: 'reply', chapter: m.chapter42, text: r.text,
            context: m.text, answer: r.answer
        });
    }
    for (const id of Object.keys(memories)) memories[id] = memories[id].slice(-12);
    d.memories = memories;
}

function normalizeStoryMemory(s) {
    syncStory42(s);
}

// Fatos específicos: cada escolha tem uma resposta própria e um retorno futuro.
const characterFacts42 = {
    dante: {
        question: 'O que você ouve quando ninguém está por perto?',
        options: [
            ['Rock. Gosto de guitarras sem muita cerimônia.', 'Então escuta o refrão, não a gravação inteira. Ainda estou mexendo nela.', 'rock'],
            ['Música tranquila. Gosto de prestar atenção na letra.', 'É. A letra é a parte que eu mais demoro para terminar.', 'letra'],
            ['Prefiro ficar em silêncio às vezes.', 'Boa. Nem todo intervalo precisa de uma trilha sonora.', 'silêncio']
        ],
        intro: [
            ['dante', 'Antes de sair, um favor. Se alguém do conselho perguntar, não estava tocando acima do volume permitido.'],
            ['me', 'Não tenho nem um dia de aula e já estou sendo recrutada para guardar segredos.'],
            ['dante', 'Não é um segredo. É uma diferença de opinião entre mim e o regulamento.']
        ],
        recall: {
            rock: 'Deixei a guitarra um pouco mais alta no ensaio. Lembrei que você gosta de rock. Se for demais, me avisa.',
            letra: 'Reescrevi a segunda estrofe. Você disse que presta atenção nas letras; queria sua opinião quando estiver pronta.',
            silêncio: 'Hoje reservei dez minutos sem amplificador. Você tinha razão: silêncio também faz parte da música.'
        },
        later: 'Não preciso ganhar uma discussão com o conselho. Só quero que a música exista sem alguém decidindo por mim o que ela significa.'
    },
    soren: {
        question: 'Quando você chega a um lugar novo, prefere ter um plano ou descobrir tudo aos poucos?',
        options: [
            ['Prefiro ter um plano. Assim fico mais tranquila.', 'Então marquei os lugares essenciais no mapa. Não precisa decorar tudo hoje.', 'plano'],
            ['Gosto de descobrir as coisas aos poucos.', 'Nesse caso, deixei alguns espaços em branco. Talvez seja melhor que eu não estrague a descoberta.', 'descoberta'],
            ['Depende do dia. Nem tudo precisa ser controlado.', 'Uma observação razoável. Vou tentar lembrar quando o cronograma desandar.', 'flexibilidade']
        ],
        intro: [
            ['soren', 'Espere. A secretaria esqueceu de incluir uma informação importante. A sala do conselho fica aberta durante o intervalo.'],
            ['me', 'Você passa o intervalo trabalhando?'],
            ['soren', 'Não sempre. Mas quando algo dá errado, costuma parar na minha mesa. E hoje há muitas coisas dando errado.']
        ],
        recall: {
            plano: 'Fiz uma lista curta do que precisamos resolver. Você comentou que ter um plano te deixa mais tranquila.',
            descoberta: 'Não preparei um roteiro completo desta vez. Você gosta de descobrir as coisas aos poucos; deixei espaço para isso.',
            flexibilidade: 'Uma tarefa atrasou. Em vez de refazer o cronograma inteiro, deixei uma margem. Lembrei da nossa conversa.'
        },
        later: 'O mais difícil é admitir que uma decisão pode estar errada, mesmo quando todas as planilhas dizem que deveria funcionar.'
    },
    theo: {
        question: 'O que você faz quando um dia não está indo muito bem?',
        options: [
            ['Uma caminhada ajuda a clarear minha cabeça.', 'Então já sei um bom caminho perto da quadra. Sem cronômetro, prometo.', 'caminhada'],
            ['Gosto de conversar com alguém em quem confio.', 'Isso é mais difícil do que parece, né? Se quiser, eu escuto.', 'conversa'],
            ['Prefiro ficar um tempo sozinha.', 'Justíssimo. Posso aprender a não preencher todo silêncio com uma piada.', 'espaço']
        ],
        intro: [
            ['theo', 'Aquele tombo foi uma estratégia para parecer acessível. Está funcionando?'],
            ['me', 'Você quase caiu de novo tentando provar isso.'],
            ['theo', 'Tá, essa parte não estava no plano. Às vezes eu me esforço demais para parecer que tudo é fácil.']
        ],
        recall: {
            caminhada: 'Depois do treino vou fazer aquele caminho sem cronômetro. Se quiser companhia, me procura.',
            conversa: 'Você disse que conversar ajuda nos dias ruins. Hoje eu precisava disso também. Sem piada, dessa vez.',
            espaço: 'O treino foi barulhento demais. Vou ficar um pouco quieto. Você me fez perceber que não tem problema precisar disso.'
        },
        later: 'O treinador quer que eu seja exemplo para o time. Eu queria que alguém lembrasse que exemplo também erra arremesso.'
    },
    ezra: {
        question: 'Se pudesse guardar uma imagem de hoje, o que escolheria?',
        options: [
            ['A luz entrando pela janela.', 'Eu também. Ela muda a cada minuto, mas parece que ninguém percebe.', 'luz'],
            ['As pessoas que conheci.', 'É uma boa maneira de contar uma história, desde que elas queiram fazer parte dela.', 'pessoas'],
            ['Algum detalhe que quase passou despercebido.', 'Esse é o meu tipo favorito de fotografia. O que não pede atenção.', 'detalhes']
        ],
        intro: [
            ['ezra', 'Posso perguntar uma coisa? Você costuma reparar no que está em volta quando chega a um lugar novo?'],
            ['me', 'Hoje eu estava mais ocupada tentando não errar o corredor.'],
            ['ezra', 'Entendo. Às vezes uma foto me ajuda a lembrar de um lugar antes que ele vire rotina.']
        ],
        recall: {
            luz: 'A janela da biblioteca estava com aquela luz que você escolheria guardar. Tirei uma foto antes que mudasse.',
            pessoas: 'Pedi autorização para fotografar dois alunos preparando o festival. Lembrei que você gosta das histórias das pessoas.',
            detalhes: 'Achei um detalhe quase invisível no mural. Acho que você também teria reparado.'
        },
        later: 'Uma fotografia pode ser verdadeira e ainda assim esconder quase tudo que aconteceu fora do enquadramento.'
    },
    valentim: {
        question: 'O que você mais gosta em uma boa história?',
        options: [
            ['Personagens que parecem pessoas de verdade.', 'Então vou precisar cortar algumas falas bonitas que não parecem humanas.', 'pessoas reais'],
            ['Um mistério que muda de significado no final.', 'Uma leitora perigosa. Vou precisar esconder melhor as pistas.', 'mistério'],
            ['Momentos simples, sem grandes discursos.', 'Uma afronta ao meu estilo, mas talvez seja exatamente o que falta.', 'simplicidade']
        ],
        intro: [
            ['valentim', 'O jardim é meu camarim improvisado. As árvores são uma plateia excelente: nunca pedem autógrafos.'],
            ['me', 'E você precisa de uma plateia o tempo todo?'],
            ['valentim', 'Pergunta inconvenientemente boa. Às vezes é mais fácil interpretar um papel do que explicar o que estou sentindo.']
        ],
        recall: {
            'pessoas reais': 'Cortei uma fala do roteiro porque ninguém falaria daquele jeito na vida real. Você teria reclamado, com razão.',
            'mistério': 'Encontrei uma anotação no roteiro que muda o sentido da cena final. Pensei que você gostaria de vê-la.',
            simplicidade: 'Hoje ensaiei uma cena sem nenhuma grande declaração. Descobri que uma pausa pode dizer bastante.'
        },
        later: 'No teatro, uma pessoa pode dizer a verdade interpretando uma mentira. Fora do palco, prefiro não depender desse truque.'
    }
};

function factChoice42(id) {
    const c = characterFacts42[id];
    return {who: id, text: c.question, choices: c.options.map(([text, answer, fact]) =>
        ({text, answer, fact, key: 'preference'}))};
}

function recall42(id) {
    const fact = story42().facts[id]?.preference;
    const c = characterFacts42[id];
    return c?.recall[fact] || c?.later || '';
}

// Cada reencontro tem um propósito diferente; lembrar não é repetir a mesma fala.
const chapterDialogue42 = {
    dante: {
        e3:'Achei o papel depois que desliguei o amplificador. O ensaio já tinha terminado; quem estava no corredor não podia estar ouvindo a banda.',
        e4:'Essa parte da montagem não precisa de duas pessoas, mas ensaiar com alguém ouvindo muda completamente o resultado. Você me ajuda a testar?',
        e5:'Passei dias achando que o festival era só uma disputa por espaço. Agora consigo entender por que aquela turma antiga insistiu em deixar uma lembrança.'
    },
    soren: {
        e3:'A lista oficial ficou comigo desde ontem. Se alguém alterou um horário no mural, preciso saber se a alteração veio da secretaria ou de uma cópia.',
        e4:'Consegui delegar duas tarefas antes de você chegar. Não é uma grande conquista para qualquer outra pessoa, mas para mim é um começo.',
        e5:'Não vou colocar nomes de ex-alunos no relatório sem autorização. O conselho precisa aprender com o erro, não transformar a história deles em espetáculo.'
    },
    theo: {
        e3:'Eu estava recolhendo as bolas perto da saída quando vi a pessoa com os papéis. Lembro da pasta, não do rosto. Não quero inventar o resto.',
        e4:'Hoje não tem placar. Separei as caixas por tamanho e reservei uma pausa para a gente comer alguma coisa antes de continuar.',
        e5:'Aquela turma também devia estar contando os dias para subir ao palco. Fico pensando em como seria treinar tanto e, no último minuto, ficar sem jogo.'
    },
    ezra: {
        e3:'Quando fiz a foto, nem sabia que o envelope existia. Por isso ela pode ajudar: não escolhi o enquadramento tentando provar uma hipótese.',
        e4:'Reservei um canto da exposição para o que não aparece nos retratos oficiais. As mãos pintadas de tinta, os materiais esquecidos, os bastidores.',
        e5:'Podemos registrar a caixa como parte da história da escola. Mas a fotografia antiga pertence às pessoas que estão nela; não vou publicar sem perguntar.'
    },
    valentim: {
        e3:'Uma fala fora do roteiro muda de sentido. Antes de discutir a intenção de quem colocou o bilhete no mural, vamos descobrir de qual cena saiu.',
        e4:'Passei a manhã cortando falas que soavam impressionantes, mas não diziam nada. Você pode me interromper se eu voltar a fazer isso fora do palco.',
        e5:'Uma apresentação cancelada é uma história que ninguém chegou a ouvir. Talvez o festival possa devolver esse espaço sem tentar reescrever o passado.'
    }
};
const callback42 = {
    dante: {rock:'Quer testar a passagem mais pesada do ensaio?',letra:'Trouxe a letra impressa; marquei a parte que ainda não funciona.',silêncio:'Desliguei o amplificador. Temos alguns minutos sem barulho.'},
    soren: {plano:'Deixei as tarefas em três etapas. Podemos revisar juntas.',descoberta:'Escolha por onde começamos; não determinei a ordem.',flexibilidade:'Reservei uma margem para mudarmos de ideia sem refazer tudo.'},
    theo: {caminhada:'Quando terminar aqui, vou dar uma volta. Sem transformar em treino.',conversa:'Depois dessa montagem, quero ouvir como foi seu dia de verdade.',espaço:'Se precisar de uma pausa sem companhia, não precisa inventar desculpa.'},
    ezra: {luz:'Guardei a mesa perto da janela para observarmos a luz.',pessoas:'Separei algumas fotos de bastidores autorizadas pelos alunos.',detalhes:'Tem uma pequena fotografia que quase ficou de fora da exposição.'},
    valentim: {'pessoas reais':'Troquei um monólogo por uma conversa que parece de verdade.','mistério':'Deixei uma pista sutil na primeira cena. Quero ver se você percebe.','simplicidade':'Hoje o ensaio termina com uma pausa, sem discurso final.'}
};
const messageRecall42 = {
    dante: {rock:'Achei uma gravação que tem a guitarra do jeito que você gosta. Vou levar para o próximo ensaio.',letra:'Terminei a estrofe que mencionei. Posso te mostrar a letra quando nos encontrarmos?',silêncio:'Vou ensaiar mais cedo amanhã. Deixei o intervalo livre, sem barulho.'},
    soren: {plano:'O cronograma do festival já está disponível. Marquei as três tarefas essenciais para facilitar a leitura.',descoberta:'Há uma atividade nova no festival que ainda não anunciei. Vou deixar você descobrir quando chegar.',flexibilidade:'O cronograma mudou, mas deixei um horário livre. Não é necessário reorganizar tudo.'},
    theo: {caminhada:'Encontrei um caminho atrás do ginásio que não parece uma pista de corrida. Acho que combina com você.',conversa:'Hoje o treino foi puxado. Se estiver livre depois, queria conversar sem fingir que foi tudo engraçado.',espaço:'Não precisa responder agora. Só queria te avisar que o treino terminou e está tudo bem.'},
    ezra: {luz:'A luz entrou pela janela às quatro. Guardei uma foto antes que mudasse.',pessoas:'Consegui autorização para registrar os bastidores. As histórias dos alunos vão aparecer na exposição.',detalhes:'Achei uma anotação minúscula numa foto do festival. Você foi a primeira pessoa em quem pensei.'},
    valentim: {'pessoas reais':'O diretor aprovou a cena nova. Menos frases de efeito, mais conversa de verdade.','mistério':'A última página do roteiro mudou de sentido depois que encontrei uma anotação. Você vai gostar de conferir.','simplicidade':'Conseguimos ensaiar uma cena inteira sem uma grande declaração. Um pequeno milagre.'}
};

const chapterScenes42 = {
    intro0: [
        ['me', 'O uniforme estava dobrado sobre a cadeira havia dois dias. Na noite anterior eu revisei o mapa do colégio tantas vezes que já sabia onde ficava a biblioteca, mas ainda não sabia onde eu me encaixava.'],
        [null, 'Você abre a janela. Lá fora, o ônibus da manhã passa pela rua. Pela primeira vez, ninguém na sua antiga escola sabe onde você estará depois do sinal.'],
        ['me', 'Não quero passar o ano inteiro tentando ser alguém que pareça interessante. Talvez hoje eu possa simplesmente conhecer as pessoas e ver o que acontece.']
    ],
    gate0: [
        [null, 'Perto do portão, dois alunos carregam placas de madeira. Uma delas anuncia o Festival de Bellmont. Outra tem uma data riscada a caneta, como se o programa ainda estivesse sendo decidido.'],
        ['me', 'Primeiro dia e já parece que entrei no meio de uma história. Espero descobrir o começo.']
    ],
    gate3: [
        ['mabel', 'O festival divide o colégio inteiro. Tem gente que vive para o palco, gente que só quer a nota de participação e gente que tenta colocar tudo numa planilha.'],
        ['me', 'Deixa eu adivinhar: você é a pessoa que sabe de tudo antes de todo mundo.'],
        ['mabel', 'Eu prefiro chamar de serviço de utilidade pública. Mas, sério, se alguém te tratar mal, não precisa fingir que gostou para fazer amizade.']
    ],
    scarlett: [
        [null, 'O último aviso do dia aparece no mural. Entre os papéis de inscrição dos clubes, você nota um espaço reservado para uma apresentação que ainda não tem título.'],
        ['me', 'Passei o dia conhecendo pessoas que parecem pertencer a este lugar de formas completamente diferentes. Talvez não seja obrigatório escolher o meu lugar tão depressa.']
    ],
    ending: [
        ['me', 'Em casa, tiro os sapatos e coloco sobre a mesa as pequenas lembranças de hoje. Não são troféus. São detalhes que talvez eu não entendesse se tivesse passado o dia tentando impressionar todo mundo.'],
        [null, 'O celular vibra. Você decide que pode ler as mensagens depois. Amanhã haverá tempo para retomar as conversas.']
    ],
    e2intro: [
        ['me', 'O caminho até Bellmont já parece um pouco mais familiar. Mesmo assim, há uma coisa diferente no portão: os cartazes do festival foram reorganizados durante a noite.'],
        [null, 'Dois horários foram riscados. Um grupo discute perto da entrada, e uma professora pede que parem de fotografar o mural antes que a situação piore.'],
        ['me', 'Ontem eu estava preocupada em decorar nomes. Hoje parece que vou precisar aprender como essas pessoas lidam quando as coisas não saem como esperavam.']
    ],
    e2mabel: [
        ['mabel', 'Antes que você acredite em tudo que eu falar: vi os cartazes, mas não vi quem mudou os horários. Tem diferença, tá?'],
        ['me', 'Uma jornalista investigativa em treinamento.'],
        ['mabel', 'Não conta pra Raven. Ela vai exigir fontes e eu só tenho duas testemunhas que discordam uma da outra.']
    ],
    e2ending: [
        [null, 'No fim da tarde, os clubes voltam aos ensaios. O mural está menos caótico, mas o espaço da apresentação sem título continua vazio.'],
        ['me', 'Consertar o horário resolveu parte do problema. Não explicou por que alguém parecia tão interessado em impedir aquela apresentação.']
    ],
    e3intro: [
        [null, 'A fita que prende o envelope ao mural é de uma cor diferente das usadas pela comissão. Há alunos formando uma roda, cada um repetindo uma versão mais exagerada do que ouviu.'],
        ['me', 'Se eu perguntar a cinco pessoas, provavelmente vou receber seis histórias. Melhor começar pelo que consigo verificar.']
    ],
    e3scarlett: [
        ['scarlett', 'Pedi que ninguém tire os avisos do mural. Se alguém tiver uma informação concreta, quero ouvi-la sem uma plateia em volta.'],
        ['me', 'Você acha que alguém fez isso para atrapalhar o festival?'],
        ['scarlett', 'Não sei. E é justamente por isso que não vou escolher um culpado antes de ouvir os clubes.']
    ],
    e3deduce: [
        ['me', 'Espalho as anotações sobre a mesa. Uma pista isolada pode significar quase qualquer coisa. Juntas, elas precisam explicar a mesma sequência de acontecimentos.'],
        [null, 'Você risca as hipóteses que dependem apenas de boatos. O problema não é encontrar a história mais emocionante; é encontrar a que não exige inventar uma parte para funcionar.']
    ],
    e3ending: [
        ['me', 'O caso está resolvido, mas o alívio não é completo. A folha do roteiro trouxe uma frase antiga de Bellmont, e ninguém explicou por que ela importava tanto.'],
        [null, 'Antes de sair, você vê a comissão recolher os cartazes e guardar o roteiro. O festival vai continuar. A pergunta é o que mais ficou fora daquela cena.']
    ],
    e4intro: [
        ['me', 'Os preparativos transformaram o corredor em um labirinto de caixas, tecidos e instrumentos. Ontem todos procuravam um culpado. Hoje precisam trabalhar juntos.'],
        ['mabel', 'Tenho uma regra para as duplas: não escolhe alguém só porque seria bonito ver vocês juntos num pôster. Vai ter trabalho de verdade.'],
        ['me', 'Então você finalmente está admitindo que não é tudo sobre romance?'],
        ['mabel', 'Eu disse que tem trabalho. Não exagere na interpretação.']
    ],
    e4pick: [
        [null, 'Cada tarefa tem um pequeno cartão: cenário, música, registro fotográfico, logística ou ensaio. Nenhum deles pode ser resolvido por uma pessoa sozinha sem esforço extra.'],
        ['me', 'Posso escolher alguém por quem tenho interesse, alguém com quem trabalho bem ou uma parceria que ainda não conheço. Nenhuma dessas escolhas precisa definir o resto da minha vida.']
    ],
    e4ending: [
        [null, 'As últimas caixas são guardadas e as luzes do palco se apagam. No canto de uma caixa de material, a comissão encontra um símbolo antigo do colégio.'],
        ['me', 'O mesmo brasão está desenhado em uma das cópias do roteiro. Talvez o festival deste ano esteja recuperando algo que a escola preferiu esquecer.']
    ],
    e5intro: [
        [null, 'A porta do terraço range. O lugar está vazio, exceto por uma caixa antiga protegida da chuva sob uma cobertura. Há uma fotografia desbotada presa à tampa.'],
        ['me', 'Passei os últimos dias aprendendo que nem todo segredo é um convite para investigar. Alguns são lembranças que alguém ainda não sabe como contar.']
    ],
    e5choice: [
        [null, 'A fotografia mostra um grupo de alunos diante de um palco ainda incompleto. Atrás dela há uma data, um nome de apresentação e uma breve anotação sobre o cancelamento.'],
        ['me', 'A carta não parece acusar uma pessoa. Ela descreve o que aconteceu e pede que a próxima comissão não repita o mesmo erro. Talvez a verdade seja menos confortável do que um culpado fácil.']
    ],
    e5ending: [
        [null, 'No fim do dia, uma nova folha é colocada no mural. Desta vez, ninguém precisa adivinhar o que a mensagem significa: a apresentação será lembrada com autorização e cuidado.'],
        ['me', 'Bellmont não se tornou um lugar perfeito. Ainda existem horários impossíveis, conversas difíceis e pessoas que nem sempre dizem o que sentem. Mas agora eu conheço um pouco da história por trás de tudo isso.'],
        ['me', 'E, pela primeira vez desde que cheguei, não estou pensando apenas em encontrar meu lugar. Estou pensando no que quero fazer com ele.']
    ]
};

function extraScene42() {
    if (!state) return null;
    const n = state.node;
    let rows = chapterScenes42[n];
    const id = (n === 'enc3' ? encounters[state.loc]?.who :
        n === 'e2meet' ? ep2[state.loc]?.who :
        n === 'e3meet' ? ep3[state.loc]?.who :
        n === 'e4remember' ? state.e4?.partner :
        n === 'e5moment' ? state.e5?.partner : null);
    const c = characterFacts42[id];
    if (c && n === 'enc3') rows = [...c.intro, factChoice42(id)];
    if (c && n === 'e2meet') rows = [
        ...(story42().facts[id]?.preference ? [[id, recall42(id)]] : []),
        [id, c.later]
    ];
    if (c && n === 'e3meet') rows = [
        [id, chapterDialogue42[id].e3]
    ];
    if (c && n === 'e4remember') rows = [
        [id, chapterDialogue42[id].e4],
        ...(callback42[id][story42().facts[id]?.preference] ? [[id, callback42[id][story42().facts[id].preference]]] : [])
    ];
    if (c && n === 'e4remember') {
        const reply = (story42().memories[id] || []).findLast(e =>
            e.kind === 'reply' && e.chapter < state.episode &&
            Object.values(messageRecall42[id]).includes(e.context));
        if (reply) rows.push([id, reply.text === 'Prefiro conversar pessoalmente quando der.'
            ? 'Você preferiu falar pessoalmente em vez de continuar pelo celular. Estou aqui agora, se quiser retomar o assunto.'
            : 'Separei aquilo que combinamos pelo celular. Podemos conferir depois que o trabalho terminar.']);
    }
    if (c && n === 'e5moment') rows = [
        [id, chapterDialogue42[id].e5]
    ];
    if (!rows?.length) return null;
    const key = [state.episode, n, id || 'common'].join(':');
    const scenes = story42().scenes;
    let p = scenes[key];
    if (!p || !Number.isInteger(p.index) || p.index < 0 || (p.answer !== null && typeof p.answer !== 'string')) p = scenes[key] = {index: 0, answer: null};
    if (p.index >= rows.length) return null;
    const row = rows[p.index];
    return {key, p, row: Array.isArray(row) ? {who: row[0], text: row[1]} : row, length: rows.length};
}

const currentBefore42 = current;
current = function () {
    const scene = extraScene42();
    if (!scene) {
        if (state.node === 'e2intro') return dialogue('me','Segundo dia em Bellmont. Mabel comentou sobre os cartazes do festival. Preciso entender o que mudou antes de me envolver na confusão.');
        if (state.node === 'final0' && state.ending === 'theo' &&
            !state.log.some(x => x.who === 'theo' && String(x.choice || '').toLowerCase().includes('chocolate'))) {
            return dialogue('theo','Ei! Trouxe chocolate para depois do treino. Quer dividir comigo?',finals.theo.choices,'smile');
        }
        return currentBefore42();
    }
    const {p, row} = scene;
    return dialogue(row.who, p.answer || row.text, p.answer ? null : row.choices?.map(x => x.text) || null);
};
const nextBefore42 = next;
next = function () {
    const scene = extraScene42();
    if (!scene) return nextBefore42();
    if (scene.row.choices && !scene.p.answer) return;
    scene.p.index++;
    scene.p.answer = null;
    // A cena nova substitui a antiga lembrança genérica do capítulo 4.
    if (state.node === 'e4remember' && scene.p.index >= scene.length) return nextBefore42();
    update();
};
const chooseBefore42 = choose;
choose = function (i) {
    const scene = extraScene42();
    if (!scene) return chooseBefore42(i);
    const choice = scene.row.choices?.[i];
    if (!choice || scene.p.answer) return;
    const id = scene.row.who;
    (story42().facts[id] ||= {})[choice.key] = choice.fact;
    state.log.push({who:id, choice:choice.text, aff:0, trust:1, chapter42:state.episode});
    state.trust[id] = (state.trust[id] || 0) + 1;
    scene.p.answer = choice.answer;
    update();
};

// BellPhone: mensagens antigas permanecem no arquivo, não na caixa de entrada.
function liveMessage42(m) {
    return m && (m.chapter42 || state.episode) === state.episode;
}
const eventsBefore42 = events94;
events94 = id => eventsBefore42(id).filter(e => liveMessage42(state.messages[e.i]));
const pendingBefore42 = pendingList94;
pendingList94 = id => pendingBefore42(id).filter(({m}) => liveMessage42(m));
unread90 = function (id = null) {
    const d = data90();
    return state.messages.reduce((n, m, i) =>
        n + Number(liveMessage42(m) && !m.topic7 && !d.read.includes(i) && (!id || m.who === id)), 0);
};

// Conserva a tela de convites, mas deixa de criar uma avalanche de notificações.
const pushBefore42 = push90;
push90 = function (flag, who, text, extra = {}) {
    if (state.messages.some(m => m.who === who && m.text === (extra.text || text))) {
        state.flags[flag] = true;
        return false;
    }
    return pushBefore42(flag, who, text, {...extra, chapter42: state.episode});
};

// As mensagens de afinidade antigas eram disparadas em todo update().
// Os acontecimentos da história ainda enviam suas mensagens diretamente.
seed7 = function () {};

const chapterMessageNodes42 = {2:'e2map', 3:'e3map', 4:'e4pick', 5:'e5map'};
seed90 = function () {
    if (!state) return false;
    syncStory42();
    const ep = state.episode;
    if (chapterMessageNodes42[ep] !== state.node) return false;
    const eligible = people12.filter(id => profileKnown(id) && (state.trust[id] || 0) >= 8);
    eligible.sort((a,b) => (state.trust[b] || 0) - (state.trust[a] || 0));
    let changed = false;
    const who = eligible.find(id => messageRecall42[id]?.[story42().facts[id]?.preference] && !state.flags['chapter42:person:' + id]);
    if (who && !state.flags['chapter42:recall:' + ep]) {
        const fact = story42().facts[who].preference;
        const text = messageRecall42[who][fact];
        state.flags['chapter42:person:' + who] = true;
        changed = push90('chapter42:recall:' + ep, who, text, {storyRecall42:true}) || changed;
    }
    const d = data90();
    if (!state.flags['chapter42:invite:' + ep] && !Object.values(d.invites).some(x => ['pending','accepted'].includes(x.status))) {
        const id = eligible.find(x => phoneData90[x] && !d.invites[x]);
        if (id) {
            d.invites[id] = {status:'pending', day:ep};
            changed = push90('chapter42:invite:' + ep, id, phoneData90[id].invite, {invite90:id}) || changed;
        }
    }
    return changed;
};

// Respostas específicas para os recados de cada encontro principal.
const storyReplies42 = {
    dante: [
        ['A música era sua? Gostei do refrão.','Só não deixa isso virar assunto do corredor. Ainda está incompleta.'],
        ['Quero ouvir a versão nova quando terminar.','Fechado. Vou levar a gravação para o ensaio.'],
        ['Pode deixar. Da próxima vez bato na porta.','Finalmente alguém que respeita o ritual.']
    ],
    soren: [
        ['Obrigada pelo aviso. Vou guardar o mapa.','Se precisar localizar outra sala, passe no conselho.'],
        ['Fico feliz que a questão dos horários tenha sido resolvida.','Agora podemos retomar os ensaios sem mais alterações no mural.'],
        ['Vou deixar a lista com você até reunirmos as pistas.','Certo. Não vou divulgar as anotações antes de confirmar os fatos.']
    ],
    theo: [
        ['Viva e guardando o segredo do ginásio.','Meu orgulho agradece. Até o próximo treino!'],
        ['Três cestas! Já é um começo e tanto.','A próxima meta é quatro. Sem pressão desnecessária.'],
        ['A investigação acabou. Panquecas parecem uma boa recompensa.','Quando tiver tempo, combinamos. Sem mistério dessa vez.']
    ],
    ezra: [
        ['Obrigada por me mostrar a fotografia.','Vou guardar uma cópia para a próxima vez que nos encontrarmos.'],
        ['Quero ver como ficou a legenda.','Deixei a versão final junto às fotos da exposição.'],
        ['Imagino como a luz do jardim deve ter ficado.','Foi um daqueles instantes que acabam antes de a gente perceber.']
    ],
    valentim: [
        ['Estou conhecendo Bellmont aos poucos.','É uma escola que fica mais interessante depois das primeiras impressões.'],
        ['Prometo guardar o segredo da promoção.','Uma colega discreta vale mais que uma plateia inteira.'],
        ['Sem roteiro? Agora fiquei curiosa.','Desta vez vou deixar a conversa acontecer por conta própria.']
    ]
};
const recallReplies42 = {
    dante:['Quero conferir no próximo ensaio.','Vou preparar o material e te aviso quando estiver pronto.'],
    soren:['Obrigada por considerar o que eu te contei.','Foi útil pensar nisso ao reorganizar as tarefas.'],
    theo:['Fico feliz que você tenha lembrado.','Pode deixar, vou respeitar o que combinamos.'],
    ezra:['Quero ver quando nos encontrarmos.','Vou guardar esse registro para te mostrar pessoalmente.'],
    valentim:['Quero saber como ficou a cena.','Vou deixar o roteiro separado para você.']
};
const repliesBefore42 = replies90;
replies90 = function(id,m) {
    let pair;
    if (m.storyRecall42) pair = recallReplies42[id];
    else {
        const sources = [encounters,ep2,ep3];
        const i = sources.findIndex(src => Object.values(src).some(e=>e.who===id && e.msg===m.text));
        if(i>=0) pair = storyReplies42[id]?.[i];
    }
    if (!pair) return repliesBefore42(id,m);
    return [
        [pair[0],pair[1],1,2,'Empatia'],
        ['Prefiro conversar pessoalmente quando der.','Combinado. Não precisa responder agora.',0,1,'Carisma']
    ];
};

// Não repete os mesmos tópicos roteirizados em cada capítulo.
const topicBefore42 = topic7;
function topicUsed42(id,i) {
    return Object.keys(state.phone7?.topics || {}).some(k => k.startsWith(id + ':' + i + ':') && state.phone7.topics[k]);
}
topic7 = function (id,i) {
    if (topicUsed42(id,i)) return toast('Vocês já conversaram sobre isso.');
    return topicBefore42(id,i);
};
const threadBefore42 = thread90;
thread90 = function (id) {
    return threadBefore42(id).replace(/<button[^>]*data-act="bp90topic"[^>]*>/g, tag => {
        const i = Number(tag.match(/data-i="(\d+)"/)?.[1]);
        return topicUsed42(id,i) && !/\bdisabled\b/.test(tag) ? tag.replace('>', ' disabled>') : tag;
    });
};

// Lista atual e arquivo: não há reindexação nem cópias do vetor de mensagens.
chats90 = function () {
    const d = data90();
    const archive = filter90 === 'archive';
    const button = button90('bp90filter', archive ? 'Voltar às conversas' : 'Arquivo',
        'data-id="' + (archive ? 'all' : 'archive') + '"');
    if (archive) {
        const rows = state.messages.map((m,i)=>({m,i,r:state.replied[i]}))
            .filter(({m,i,r})=>!liveMessage42(m) && (r || d.stars.includes(i) || m.invite90 || m.invite5))
            .reverse().map(({m,r})=>`<article class="bppost"><b>${esc(name90(m.who))} · Capítulo ${m.chapter42}</b><p>${esc(m.text)}</p>
                ${r ? '<p>Você: '+esc(r.text)+'</p><p>'+esc(r.answer||'')+'</p>' : ''}</article>`).join('');
        return `<div class="bpsection"><h3>Arquivo de conversas</h3><p>Respostas, favoritas e convites anteriores ficam aqui, sem gerar notificações.</p>${button}${rows || '<p>Nenhuma conversa arquivada.</p>'}</div>`;
    }
    const active = [...new Set(state.messages.filter(liveMessage42).map(m=>m.who).filter(id=>chars[id]))];
    const list = active.filter(id => filter90 !== 'unread' || unread90(id))
        .sort((a,b)=>(last94(b)?.pos ?? -1)-(last94(a)?.pos ?? -1));
    const q = search94.toLocaleLowerCase('pt-BR');
    const contact = (id,text,unread=0) => `<button class="bpcontact contact94" data-act="bp90chat" data-id="${id}"
        data-search="${esc(name90(id).toLocaleLowerCase('pt-BR'))}" aria-pressed="${chat90===id}"
        ${q&&!name90(id).toLocaleLowerCase('pt-BR').includes(q)?'hidden':''}>
        ${face90(id)}<span><b>${esc(name90(id))}</b><small>${esc(text)}</small></span>
        ${unread?pill90(String(unread)):''}</button>`;
    const cards = filter90==='stars'
        ? d.stars.filter(i=>liveMessage42(state.messages[i])).map(i=>contact(state.messages[i].who,state.messages[i].text)).join('')
        : list.map(id=>{const e=last94(id);return contact(id,(e?.kind==='out'?'Você: ':'')+(e?.text||''),unread90(id));}).join('');
    const body = chat90==='group' && state.episode>=4
        ? '<div class="thread94 group94"><div class="history94">'+group90()+'</div></div>'
        : chat90 && (active.includes(chat90)||known90(chat90)) ? thread90(chat90)
        : '<div class="bpempty"><h3>Um novo capítulo.</h3><p>As mensagens atuais aparecem aqui. Consulte o arquivo para rever conversas importantes.</p></div>';
    return `<div class="bpinbox inbox94"><div class="bpinboxleft">
        <h3>Conversas · Capítulo ${state.episode}</h3>
        <input id="search94" placeholder="Buscar contato" aria-label="Buscar contato" value="${esc(search94)}">
        <div class="bpactions filters94">${[['all','Todas'],['unread','Não lidas'],['stars','Favoritas']].map(([k,n])=>button90('bp90filter',n,`data-id="${k}" aria-pressed="${filter90===k}"`)).join('')}${button}</div>
        <div class="contacts94">${cards||'<p class="bpmuted">Nenhuma mensagem neste filtro.</p>'}
        ${state.episode>=4?button90('bp90chat','Grupo de Bellmont','data-id="group"'):''}</div>
        </div><div class="bpthread">${body}</div></div>`;
};

// Preferências reais também aparecem na ficha, sem revelar memórias de outros personagens.
const memoryBefore42 = showProfile;
showProfile = function (id, mood = 'neutral') {
    memoryBefore42(id,mood);
    if (!state || !profileKnown(id)) return;
    const fact = story42().facts[id]?.preference;
    const list = story42().memories[id] || [];
    if (!fact && !list.length) return;
    const panel = document.querySelector('#modal .panel');
    panel?.insertAdjacentHTML('beforeend', `<section class="memory12"><h3>O que ficou entre vocês</h3>
        ${fact ? '<p>Preferência lembrada: '+esc(fact)+'</p>' : ''}
        ${list.slice(-3).map(e=>'<p><small>Capítulo '+e.chapter+'</small> · '+esc(e.text)+'</p>').join('')}</section>`);
};

// Identidade visual de Bellmont: capa e navegação, sem alterar a história.
function bellmontCrest43() {
    return '<svg class="bell-crest" viewBox="0 0 70 80" aria-hidden="true"><path d="M35 4 59 13 56 47Q51 62 35 72 19 62 14 47L11 13Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M35 9 54 16 51 45Q47 58 35 66 23 58 19 45L16 16Z" fill="none" stroke="currentColor" stroke-width=".8"/><path d="M8 36Q1 58 22 69M62 36Q69 58 48 69" fill="none" stroke="currentColor"/><text x="35" y="47" text-anchor="middle" fill="currentColor" font-family="Georgia,serif" font-size="36">B</text></svg>';
}

function bellmontTitle43() {
    return '<span>Depois do</span><i>Sinal</i>';
}

// A capa não precisa de um SVG intermediário para retratos rasterizados.
function coverPortrait43(id, mood) {
    const entry = expressionArt[id]?.[mood] || expressionArt[id]?.neutral || animeArt[id];
    if (!entry) return sprite(id,mood);
    const [data,w,h] = entry;
    return `<img class="bell-portrait" src="${mediaURL14(data,'image/webp')}"
        width="${w}" height="${h}" style="--portrait-w:${w}px;--portrait-h:${h}px"
        alt="" decoding="async">`;
}

cover = function () {
    const cast = ['dante','soren','theo','ezra','valentim'];
    const moods = ['neutral','neutral','smile','shy','smile'];
    return `<section class="bell-cover">
        <div class="bell-cover-visual" aria-hidden="true">
            <div class="bell-cover-bg">${bg('gate')}</div>
            <div class="bell-cast">${cast.map((id,i)=>`<div class="bell-hero bell-hero-${id}">${coverPortrait43(id,moods[i])}</div>`).join('')}</div>
        </div>
        <div class="bell-cover-copy">
            <div class="bell-cover-brand">${bellmontCrest43()}<span>COLÉGIO BELLMONT</span></div>
            <h1 class="bell-title">${bellmontTitle43()}</h1>
            <div class="bell-ornament" aria-hidden="true">✦</div>
            <p class="bell-cover-line">Algumas histórias começam<br>quando a aula termina.</p>
            <nav class="bell-cover-actions" aria-label="Menu inicial">
                <button class="primary" data-act="new">Novo jogo ♡</button>
                <button class="soft" data-act="continue" ${saved?'':'disabled'}>Continuar</button>
                <button class="soft" data-act="cast">Conheça o elenco</button>
                <button class="soft" data-act="about">Sobre o jogo</button>
                <button class="soft" data-act="import14">Importar progresso</button>
            </nav>
            <small class="bell-version">TEMPORADA 01 · EDIÇÃO 0.14</small>
        </div>
    </section>`;
};

const bellNav43 = {
    calendar12:['Agenda','M3 5h18v16H3z M7 3v4 M17 3v4 M3 10h18'],
    phone:['BellPhone','M7 3h10v18H7z M11 17h2'],
    journal:['Diário','M12 5v15 M12 5Q7 2 3 5v14q5-3 9 1 4-4 9-1V5q-4-3-9 0'],
    city10:['Cidade','M3 21V9l5-5 5 5v12 M13 21V6l4-3 4 3v15 M6 13h3 M16 10h2 M16 14h2'],
    wardrobe:['Ateliê','M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h5a3 3 0 0 0 3-3c0-4-4-7-9-7 M7 8h.1 M11 6h.1 M16 7h.1 M6 12h.1'],
    gallery:['Galeria','M3 4h18v16H3z M3 16l5-5 4 4 3-3 6 6 M16 8h.1'],
    cast:['Elenco','M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M3 20v-3a6 6 0 0 1 12 0v3 M16 5a3 3 0 0 1 0 6 M17 14q4 0 4 4v2'],
    stats:['Meu perfil','M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M4 21v-2a8 8 0 0 1 16 0v2'],
    settings12:['Configurações','M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6'],
    room11:['Meu quarto','M3 12l9-8 9 8 M5 10v11h14V10 M10 21v-6h4v6'],
    memory12:['Memórias','M12 21 3.5 12.5a5 5 0 0 1 8.5-5 5 5 0 0 1 8.5 5Z'],
    gifts5:['Presentes','M3 8h18v4H3z M5 12v9h14v-9 M12 8v13 M12 8C3 8 4 1 8 4l4 4c9 0 8-7 4-4z'],
    sound:['Som','M3 9h4l5-4v14l-5-4H3z M15 9q4 3 0 6 M18 6q7 6 0 12'],
    saves:['Progresso','M4 3h14l2 2v16H4z M8 3v6h8V3 M8 21v-8h8v8'],
    home:['Menu inicial','M9 4H4v16h5 M13 8l4 4-4 4 M8 12h13']
};

const bellGroups43 = [
    ['Vida em Bellmont',['calendar12','phone','journal','city10','wardrobe']],
    ['Coleção',['gallery','cast','stats','settings12']],
    ['Mais opções',['room11','memory12','gifts5','sound','saves','home']]
];
let bellMore43 = false;

function arrangeBellNav43(app) {
    const rail = app.querySelector('.rail12');
    const nav = rail?.querySelector('.nav');
    if (!nav) return;
    const buttons = [...nav.querySelectorAll('button[data-act]')];
    const byId = new Map(buttons.map(b=>[b.dataset.act,b]));
    rail.querySelector('.railLabel12')?.remove();
    rail.insertAdjacentHTML('afterbegin',`<div class="bell-rail-brand">${bellmontCrest43()}<small>COLÉGIO BELLMONT</small><div class="bell-title">${bellmontTitle43()}</div><div class="bell-ornament" aria-hidden="true">✦</div></div>`);
    nav.setAttribute('aria-label','Navegação do jogo');
    nav.replaceChildren();
    for (const [name,ids] of bellGroups43) {
        const more = name === 'Mais opções';
        const group = document.createElement(more?'details':'div');
        group.className = more?'bell-nav-more':'bell-nav-group';
        if (more) {
            group.open = bellMore43;
            group.innerHTML = '<summary>Mais opções <span aria-hidden="true">⌄</span></summary>';
            group.addEventListener('toggle',()=>{if(group.isConnected)bellMore43=group.open;});
        } else group.setAttribute('aria-label',name);
        for (const id of ids) {
            const b = byId.get(id);
            if (!b) continue;
            const badge = b.querySelector('em');
            const [label,path] = bellNav43[id];
            b.innerHTML = `<svg class="bell-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg><span>${label}</span>`;
            if (badge) b.append(badge);
            group.append(b);
            byId.delete(id);
        }
        if (more) byId.forEach(b=>group.append(b));
        nav.append(group);
    }
}

function renderBellmontIdentity() {
    const app = document.querySelector('.shell12');
    if (!app || screen !== 'game') return;
    app.classList.add('bell-editorial');
    arrangeBellNav43(app);
    const heading = app.querySelector('.main > .map h2');
    if (heading?.textContent === 'Onde você vai?') heading.textContent = 'Onde você quer ir?';
}

// executar | v0.14
render();
