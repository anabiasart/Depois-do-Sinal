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
