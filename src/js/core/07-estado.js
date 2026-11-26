// estado | v0.14
let state=null,screen='cover',draft=null,modalType=null;
const initial=()=>({
  name:'Alex',look:{
    hair:'castanho',eyes:'mel',skin:'clara',outfit:'uniforme'
  },aff:Object.fromEntries(routes.map(x=>[x,0])),trust:Object.fromEntries(routes.map(x=>[x,0])),visited:[],items:[],messages:[],gallery:[],log:[],flags:{
    
  },node:'intro0',loc:'bedroom',ending:null,sceneChoice:null
});

function load(){return loadSave14()}let saved=load();let storageOK=true;
function persist(){if(state)writeSave14(state)}
function toast(t){
  let n=document.createElement('div');
  n.className='toast';
  n.textContent=t;
  document.body.append(n);
  setTimeout(()=>n.remove(),2500)
}
