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

const v3render=render;
render=function(){
  v3render();
  const b=document.querySelector('[data-act="sound"]');
  if(b)b.textContent=state?.sound?'♫ Som ligado':'♫ Som desligado'
};

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
