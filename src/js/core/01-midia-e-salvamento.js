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
