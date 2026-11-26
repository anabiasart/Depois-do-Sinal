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
function normalize(s){s.episode=s.episode||1;s.visited2=s.visited2||[];s.attrs=s.attrs||Object.fromEntries(attrs.map(a=>[a,0]));s.attraction=s.attraction||Object.fromEntries(routes.map(id=>[id,Math.max(0,Math.round((s.aff[id]||0)/2))]));s.jealousy=s.jealousy||Object.fromEntries(routes.map(id=>[id,0]));s.known2=s.known2||[];s.replied=s.replied||{};s.gallery2=s.gallery2||[];s.flags=s.flags||{};return s}
const clamp=x=>Math.max(0,Math.min(100,x));
function stage(id){
  if(!profileKnown(id))return 'Desconhecido';
  if(state.trust[id]>=25&&state.attraction[id]>=18)return 'Sentimentos';
  if(state.aff[id]>=20&&state.trust[id]>=10)return 'Interesse';
  if(state.trust[id]>=10)return 'Amizade';
  return 'Conhecido'
}
