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
